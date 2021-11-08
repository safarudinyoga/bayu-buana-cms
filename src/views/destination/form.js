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

const endpoint = "/master/destinations"
const backUrl = "/master/destinations"

function DestinationForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    destination_name: "",
    country_id: "",
    destination_city_id: "",
    description: "",
    destination_code: "",
  })
  const translationFields = [
    {
      label: "Destination Name",
      name: "destination_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ]

  const validationRules = {
    destination_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    country: {
      required: true,
    },
    city: {
      required: true,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
    destination_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Destination"
    if (!formId) {
      docTitle = "Create Destination"
    } else if (isView) {
      docTitle = "Destination Details"
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
            text: "Destinations",
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
          label="Destination Name"
          labelRequired="label-required"
          value={form.destination_name}
          name="destination_name"
          onChange={(e) => setForm({...form, destination_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputSelectAjax
          label="Country"
          value={form.country_id}
          name="country_id"
          cl="3"
          cr="6"
          endpoint="/master/countries"
          column="country_name"
          onChange={(e) =>
            setForm({...form, country_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputSelectAjax
          label="City"
          value={form.country_id}
          name="destination_city_id"
          cl="3"
          cr="6"
          endpoint="/master/cities"
          filter={form.country_id}
          column="city_name"
          onChange={(e) =>
            setForm({...form, destination_city_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

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
          value={form.destination_code}
          name="destination_code"
          onChange={(e) => setForm({...form, destination_code: e.target.value})}
          cl="5"
          cr="6"
          disabled={isView || loading}
          type="number"
          label="Destination Code"
          labelRequired="label-required"
          minLength="3"
          maxLength="3"
          hint="Destination code maximum 3 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(DestinationForm)
