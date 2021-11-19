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

const endpoint = "/master/attractions"
const backUrl = "/master/attractions"

function AttractionForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    attraction_name: "",
    attraction_category_id: "",
    attraction_address: "",
    country_id: "",
    state_province: "",
    city_id: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    email_address: "",
    phone: "",
    fax: "",
    description: "",
  })
  const translationFields = [
    {
      label: "Attraction Name",
      name: "attraction_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ]

  const validationRules = {
    attraction_name: {
      required: true,
      min: 1,
      max: 64,
    },
    attraction_category_id: {
      required: false,
    },
    address: {
      minLength: 1,
      maxLength: 512,
    },
    country: {
      required: true,
    },
    state_province: {
      required: false,
    },
    city: {
      required: true,
    },
    zip_code: {
      required: false,
      minLength: 1,
      maxLength: 16,
    },
    // destination and zone
    latitude: {
      required: false,
      minLength: 1,
      maxLength: 16,
    },
    longitude: {
      required: false,
      minLength: 1,
      maxLength: 16,
    },
    email_address: {
      required: false,
      minLength: 1,
      maxLength: 256,
    },
    phone: {
      required: false,
      minLength: 1,
      maxLength: 32,
    },
    fax: {
      required: false,
      minLength: 1,
      maxLength: 32,
    },
    description: {
      required: false,
      minLength: 1,
      maxLength: 4000,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Attraction"
    if (!formId) {
      docTitle = "Create Attraction"
    } else if (isView) {
      docTitle = "Attraction Details"
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
            text: "Attractions",
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
      if (!form.model) {
        form.model = null
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
          label={"Attraction Name"}
          labelRequired="label-required"
          value={form.attraction_name}
          name="attraction_name"
          onChange={(e) => setForm({...form, attraction_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputSelectAjax
          label="Attraction Category"
          value={form.attraction_category_id}
          name="attraction_category_id"
          cl="3"
          cr="6"
          endpoint="/master/attraction-categories"
          column="attraction_category_name"
          onChange={(e) =>
            setForm({...form, attraction_category_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputControl
          label={"Address"}
          value={form.attraction_address}
          name="attraction_address"
          onChange={(e) => setForm({...form, attraction_address: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="64"
        />

        <FormInputSelectAjax
          label="Country"
          labelRequired="label-required"
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
          label="State/ Province"
          value={form.state_province}
          name="state_id"
          cl="3"
          cr="6"
          endpoint="/master/state-provinces"
          filter={form.country_id}
          column="state_province_name"
          onChange={(e) =>
            setForm({...form, state_province: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputSelectAjax
          label="City"
          value={form.city_id}
          labelRequired="label-required"
          name="destination_city_id"
          cl="3"
          cr="6"
          endpoint="/master/cities"
          filter={form.country_id}
          column="city_name"
          onChange={(e) =>
            setForm({...form, city_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputControl
          label={"Zip Code"}
          value={form.zip_code}
          name="zip_code"
          onChange={(e) => setForm({...form, zip_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Latitude"}
          value={form.latitude}
          name="latitude"
          onChange={(e) => setForm({...form, latitude: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Longitude"}
          value={form.longitude}
          name="longitude"
          onChange={(e) => setForm({...form, longitude: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Email Address"}
          value={form.email_address}
          name="email_address"
          onChange={(e) => setForm({...form, email_address: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Phone"}
          value={form.phone}
          name="phone"
          onChange={(e) => setForm({...form, phone: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Fax"}
          value={form.fax}
          name="fax"
          onChange={(e) => setForm({...form, fax: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
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
    </FormBuilder>
  )
}

export default withRouter(AttractionForm)
