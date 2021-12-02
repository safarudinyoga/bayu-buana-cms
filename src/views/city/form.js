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

const endpoint = "/master/cities"
const backUrl = "/master/cities"

function CityForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [countryData, setCountryData] = useState([])
  const [stateProvinceData, setStateProvinceData] = useState([])
  const [form, setForm] = useState({
    city_code: "",
    city_name: "",
    country_id: null,
    state_province_id: null
  })
  const translationFields = [
    {
      label: "City Name",
      name: "city_name",
      type: "text",
    },
  ]

  const validationRules = {
    city_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
    },
    city_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    country_id: {
      required: true
    },
    state_province_id: {
      required: false
    }
  }

  let validationMessages = {
    city_code: {
      required: "City Code is required",
      minlength: "City Code must be at least 3 characters",
      maxlength: "City Code cannot be more than 3 characters",
    },
    city_name: {
      required: "City Name is required",
      minlength: "City Name must be at least 1 characters",
      maxlength: "City Name cannot be more than 64 characters",
    },
    country_id: {
      required: "Country is required"
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit City"
    if (!formId) {
      docTitle = "Create City"
    } else if (isView) {
      docTitle = "View City"
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
            text: "Cities",
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
          setCountryData([{...res.data.country, text: res.data.country.country_name}])
        }
        if (res.data.state_province) {
          setStateProvinceData([{...res.data.state_province, text: res.data.state_province.state_province_name}])
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
      if (!form.country_id) {
        form.country_id = null
      }
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
          message: `Record ${form.city_code} - ${form.city_name
            } has been successfully ${formId ? "updated" : "saved"}.`,
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
          label="City Name"
          labelRequired="label-required"
          value={form.city_name}
          name="city_name"
          onChange={(e) => setForm({...form, city_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputSelectAjax
          label="Country"
          labelRequired="label-required"
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
        />

        <FormInputSelectAjax
          label="State/ Province"
          value={form.state_province_id}
          name="state_id"
          endpoint="/master/state-provinces"
          filter={form.country_id}
          column="state_province_name"
          data={stateProvinceData}
          onChange={(e) =>
            setForm({...form, state_province_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="City Code"
          labelRequired="label-required"
          value={form.city_code}
          name="city_code"
          cl="12"
          cr="12"
          onChange={(e) => setForm({...form, city_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="City code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(CityForm)
