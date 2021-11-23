import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"

const endpoint = "/master/attractions"
const backUrl = "/master/attractions"

function AttractionForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  let formId = props.match.params.id
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [form, setForm] = useState({
    attraction_name: "",
    attraction_category_attraction: [],
    attraction_address: "",
    country_id: "",
    state_province: "",
    city_id: "",
    zip_code: "",
    destination_id: "",
    zone_id: "",
    latitude: "",
    longitude: "",
    email: "",
    phone: "",
    fax_number: "",
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
      minlength: 1,
      maxlength: 64,
    },
    attraction_category_attraction: {
      required: false,
    },
    address_line: {
      minlength: 1,
      maxlength: 512,
    },
    country_id: {
      required: true,
    },
    state_province: {
      required: false,
    },
    city_id: {
      required: true,
    },
    zip_code: {
      required: false,
      minlength: 1,
      maxlength: 16,
    },
    destination_id: {
      required: false,
    },
    zone_id: {
      required: false,
    },
    latitude: {
      required: false,
      minlength: 1,
      maxlength: 16,
    },
    longitude: {
      required: false,
      minlength: 1,
      maxlength: 16,
    },
    email: {
      required: false,
      minlength: 1,
      maxlength: 256,
    },
    phone: {
      required: false,
      minlength: 1,
      maxlength: 32,
    },
    fax_number: {
      required: false,
      minlength: 1,
      maxlength: 32,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
  }

  const validationMessages = {
    attraction_name: {
      required: "Attraction Name is required",
      minlength: "Attraction Name must be at least 1 characters",
      maxlength: "Attraction Name cannot be more than 64 characters",
    },
    attraction_category_attraction: {
      required: "Attraction Category is required",
    },
    address_line: {
      minlength: "Address must be at least 1 characters",
      maxlength: "Address cannot be more than 512 characters",
    },
    country_id: {
      required: "Country is required",
    },
    state_province: {
      required: "State/Province is required",
    },
    city_id: {
      required: "City is required",
    },
    zip_code: {
      required: "Zip Code is required",
      minlength: "Zip Code must be at least 1 characters",
      maxlength: "Zip Code cannot be more than 16 characters",
    },
    destination_id: {
      required: "Destination is required",
    },
    zone_id: {
      required: "Zone is required",
    },
    latitude: {
      required: "Latitude is required",
      minlength: "Latitude must be at least 1 characters",
      maxlength: "Latitude cannot be more than 16 characters",
    },
    longitude: {
      required: "Longitude is required",
      minlength: "Longitude must be at least 1 characters",
      maxlength: "Longitude cannot be more than 16 characters",
    },
    email: {
      required: "Email Address is required",
      minlength: "Email Address must be at least 1 characters",
      maxlength: "Email Address cannot be more than 256 characters",
    },
    phone: {
      required: "Phone is required",
      minlength: "Phone must be at least 1 characters",
      maxlength: "Phone cannot be more than 32 characters",
    },
    fax_number: {
      required: "Fax Number is required",
      minlength: "Fax must be at least 1 characters",
      maxlength: "Fax cannot be more than 32 characters",
    },
    description: {
      required: "Description is required",
      minlength: "Description must be at least 1 characters",
      maxlength: "Description cannot be more than 4000 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Attraction"
    if (!formId) {
      docTitle = "Create Attraction"
    } else if (isView) {
      docTitle = "View Attraction"
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
        if (res.data.country) {
          // TODO: fix dropdown edit
          setCountryData([{...res.data.country, text: res.data.country.country_name}])
        }

      } catch (e) {
        console.error(e);
      }

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
      form.latitude = parseFloat(form.latitude)
      form.longitude = parseFloat(form.longitude);

      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }
    } catch (e) {
      dispatch(
        setAlert({
          message: `Failed to ${formId ? "update" : "save"} this record.`,
        }),
      )
    } finally {
      setLoading(false)
      props.history.push(backUrl)
      dispatch(
        setAlert({
          message: `Record ${form.attraction_name} has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
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
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Attraction Name"
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
          value={form.attraction_category_attraction.map((item) => item.attraction_category_id)}
          name="attraction_category_attraction"
          cl="3"
          cr="6"
          data={categoryData}
          endpoint="/master/attraction-categories"
          column="attraction_category_name"
          onChange={(e, values) => setForm(form => ({...form, attraction_category_attraction: values.map(v => ({attraction_category_id: v.id}))}))}
          disabled={isView || loading}
          type="selectmultiple"
        />

        <FormInputControl
          label={"Address"}
          value={form.address_line}
          name="address_line"
          onChange={(e) => setForm({...form, address_line: e.target.value})}
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
          data={countryData}
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
          name="city_id"
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

        <FormInputSelectAjax
          label="Destination"
          value={form.destination_id}
          name="destination_id"
          cl="3"
          cr="6"
          endpoint="/master/destinations"
          filter={form.destination_id}
          column="destination_name"
          onChange={(e) =>
            setForm({...form, destination_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputSelectAjax
          label="Zone"
          value={form.zone_id}
          name="zone_id"
          cl="3"
          cr="6"
          endpoint="/master/zones"
          filter={form.zone_id}
          column="zone_name"
          onChange={(e) =>
            setForm({...form, zone_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputControl
          label={"Latitude"}
          value={form.latitude}
          name="latitude"
          onChange={(e) => setForm({...form, latitude: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="16"
        />

        <FormInputControl
          label={"Longitude"}
          value={form.longitude}
          name="longitude"
          onChange={(e) => setForm({...form, longitude: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="16"
        />

        <FormInputControl
          label={"Email Address"}
          value={form.email}
          name="email"
          onChange={(e) => setForm({...form, email: e.target.value})}
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
          value={form.fax_number}
          name="fax_number"
          onChange={(e) => setForm({...form, fax_number: e.target.value})}
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
