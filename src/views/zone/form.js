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
  const [destinationData, setDestinationData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    zone_name: "",
    destination_id: "",
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
      maxlength: 256,
    },
    destination: {
      required: true,
    },
    description: {
      minlength: 1,
      maxlength: 4000,
    },
    zone_code: {
      required: true,
      minlength: 1,
      maxlength: 16,
    },
  }

  const validationMessage = {
    zone_name: {
      required: "Zone Name is required",
    },
    destination: {
      required: "Destination is required",
    }, 
    zone_code: {
      required: "Zone Code is required",
    }
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Zone"
    if (!formId) {
      docTitle = "Create Zone"
    } else if (isView) {
      docTitle = "View Zone"
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
        if (res.data.destination) {
          setDestinationData([{...res.data.destination, text: res.data.destination.destination_name}])
        }
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
      validationMessages={validationMessage}
    >
      <FormHorizontal>
        <FormInputControl
          label="Zone Name"
          labelRequired="label-required"
          value={form.zone_name}
          name="zone_name"
          onChange={(e) => setForm({...form, zone_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputSelectAjax
          label="Destination"
          value={form.destination_id}
          name="destination"
          cl="3"
          cr="6"
          endpoint="/master/destinations"
          column="destination_name"
          data={destinationData}
          onChange={(e) =>
            setForm({...form, destination_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        >
        </FormInputSelectAjax>

        <FormInputControl
          value={form.description}
          name="description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          label="Description"
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
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
          label="Zone Code"
          labelRequired="label-required"
          minLength="1"
          maxLength="16"
          hint="Zone code maximum 16 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(ZoneForm)
