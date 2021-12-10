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
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/destinations"
const backUrl = "/master/destinations"

function DestinationForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [countryData, setCountryData] = useState([])
  const [cityData, setCityData] = useState([])
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
      checkName: formId == null,
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
      checkCode: formId == null,
    },
  }

  const validationMessages = {
    destination_name: {
      required: "Destinantion Name is required",
    },
    destination_code: {
      required: "Destinantion Code is required",
    },
    country: {
      required: "Country is required",
    },
    city: {
      required: "City is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Destination"
    if (!formId) {
      docTitle = "Create Destination"
    } else if (isView) {
      docTitle = "View Destination"
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
        if (res.data.city) {
          setCityData([{...res.data.city, text: res.data.city.city_name}])
        }

        if (res.data.country) {
          setCountryData([{...res.data.country, text: res.data.country.country_name}])
        }
      } catch (e) { }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/destinations?filters=["destination_name","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Destination Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/destinations?filters=["destination_code","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Destination Code already exists",
      )
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
          message: `Record ${form.destination_code} - ${form.destination_name} has been successfully ${formId ? "updated" : "saved"}..`,
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
          label="Destination Name"
          labelRequired="label-required"
          value={form.destination_name}
          name="destination_name"
          onChange={(e) => setForm({...form, destination_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputSelectAjax
          label="Country"
          value={form.country_id}
          name="country_id"
          endpoint="/master/countries"
          column="country_name"
          data={countryData}
          onChange={(e) =>
            setForm({...form, country_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          placeholder="Country"
        />

        <FormInputSelectAjax
          label="City"
          value={form.destination_city_id}
          name="destination_city_id"
          endpoint="/master/cities"
          filter={form.country_id}
          column="city_name"
          data={cityData}
          onChange={(e) =>
            setForm({...form, destination_city_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          placeholder="City"
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
          cl={{md:"12"}}
          cr="12"
          disabled={isView || loading}
          type="number"
          label="Destination Code"
          labelRequired="label-required"
          minLength="1"
          maxLength="36"
          hint="Destination code maximum 3 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(DestinationForm)
