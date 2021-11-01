import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/occupancy-types"
const backUrl = "/master/occupancy-types"

function OccupancyTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    occupancy_type_name: "",
    occupancy_type_code:"",
    is_default: false,
    occupancy:1,
  })
  const translationFields = [
    {
      label: "Occupancy Type Name",
      name: "occupancy_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    occupancy_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    is_default: {},
    occupancy: {
      required: true,
      min: 1,
      max: 4,
    },
    occupancy_type_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Occupancy Type"
    if (!formId) {
      docTitle = "Create Occupancy Type"
    } else if (isView) {
      docTitle = "Occupancy Type Details"
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
            text: "Occupancy Types",
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
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
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
      if (!form.occupancy_type_name) {
        form.occupancy_type_name = null
      }
      if (!form.occupancy_type_code) {
        form.occupancy_type_code = null
      }
      if (!form.occupancy) {
        form.occupancy = null
      }
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
          label="Occupancy Type Name"
          value={form.occupancy_type_name}
          name="occupancy_type_name"
          cl="7"
          cr="5"
          onChange={(e) =>
            setForm({ ...form, occupancy_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputWrapper
          label="Is Default"
          cl="7"
          cr="5"
          hint="Set is default"
        >
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ha-1"
              value={true}
              disabled={isView || loading}
              checked={form.is_default}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_default: true,
                })
              }
            />
            <label className="form-check-label" htmlFor="ha-1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ha-2"
              value={false}
              disabled={isView || loading}
              checked={!form.is_default}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_default: false,
                })
              }
            />
            <label className="form-check-label" htmlFor="ha-2">
              No
            </label>
          </div>
        </FormInputWrapper>
        <FormInputControl
          label="Occupancy"
          labelRequired="label-required"
          value={form.occupancy}
          name="occupancy"
          cl="7"
          cr="5"
          onChange={(e) => setForm({ ...form, occupancy: +e.target.value })}
          disabled={isView || loading}
          type="number"
          min="1"
          max="4"
          hint="Occupation maximum 4 characters"
        />
      </FormHorizontal>
      <FormHorizontal>
        <FormInputControl
          label="Occupancy Type Code"
          labelRequired="label-required"
          value={form.occupancy_type_code}
          name="occupancy_type_code"
          cl="5"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, occupancy_type_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Rating type code maximum 2 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(OccupancyTypeForm)
