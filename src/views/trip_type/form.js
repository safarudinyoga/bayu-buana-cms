import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/trip-types"
const backUrl = "/master/trip-types"

function TripTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    trip_type_code: "",
    trip_type_name: "",
    is_default: false,
  })
  const translationFields = [
    {
      label: "Trip Type Name",
      name: "trip_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    trip_type_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
    },
    trip_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    is_default: {},
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Trip Type"
    if (!formId) {
      docTitle = "Create Trip Type"
    } else if (isView) {
      docTitle = "View Trip Type"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Trip Types",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
      } catch (e) { }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    let translated = formBuilder.getTranslations()
    setLoading(true)
    let api = new Api()
    try {
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }
    } catch (e) {
    } finally {
      setLoading(false)
      props.history.push(backUrl)
    }
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      translations={translations}
      translationFields={translationFields}
      alertMessage={"Incomplete data"}
      isValid={false}
      rules={validationRules}
    >
      <FormHorizontal>
        <FormInputControl
          label="Trip Type Name"
          labelRequired="label-required"
          value={form.trip_type_name}
          name="trip_type_name"
          onChange={(e) => setForm({...form, trip_type_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="256"
        />

        <FormInputWrapper
          label="Is Default"
          hint="Set is default"
        >
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="tt-1"
              value={true}
              checked={form.is_default}
              onChange={(e) => setForm({...form, is_default: true})}
            />
            <label className="form-check-label" htmlFor="tt-1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="tt-2"
              value={false}
              checked={!form.is_default}
              onChange={(e) => setForm({...form, is_default: false})}
            />
            <label className="form-check-label" htmlFor="tt-2">
              No
            </label>
          </div>
        </FormInputWrapper>
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Trip Type Code"
          labelRequired="label-required"
          value={form.trip_type_code}
          name="trip_type_code"
          cl="12"
          cr="12"
          onChange={(e) => setForm({...form, trip_type_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Trip Type Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(TripTypeForm)
