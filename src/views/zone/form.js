import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/zones"
const backUrl = "/master/zones"

function ZoneForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    zone_name: "",
    destination: "",
    description: "",
    zone_code: "",
  })
  const translationFields = [
    {
      label: "Zone Name",
      name: "zone_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ]

  const validationRules = {
    zone_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    destination: {
      required: false,
      minlength: 1,
      maxlength: 64,
    },
    description: {
      required: true,
      minlength: 1,
      maxlength: 400,
    },
    zone_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Zone"
    if (!formId) {
      docTitle = "Create Zone"
    } else if (isView) {
      docTitle = "Zone Details"
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
            text: "Zones",
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
          label="Zone Name *"
          value={form.zone_name}
          name="zone_name"
          onChange={(e) => setForm({...form, zone_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputSelectAjax
          label="Destination"
          value={form.destination}
          name="destination"
          cl="3"
          cr="6"
          endpoint="/master/destination"
          column="destination_name"
          onChange={(e) =>
            setForm({...form, destination: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        >
          <option value="">None</option>
          <option value="51d5cb0c-c29e-4682-af20-4b95bc5c6ee3">
            Destination 1
          </option>
          <option value="51d5cb0c-c29e-4682-af20-4b95bc5c6ee4">
            Destination 2
          </option>
        </FormInputSelectAjax>

        <FormInputControl
          value={form.description}
          name="description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          label="Description"
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="64"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          value={form.zone_code}
          name="zone_code"
          onChange={(e) => setForm({...form, zone_code: e.target.value})}
          cl="4"
          cr="6"
          disabled={isView || loading}
          type="number"
          label="Zone Code *"
          minLength="3"
          maxLength="3"
          hint="Zone code maximum 3 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(ZoneForm)
