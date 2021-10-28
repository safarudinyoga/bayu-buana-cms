import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/countries"
const backUrl = "/master/countries"

function CountryForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [timezoneData, setTimezoneData] = useState([])
  const [currencyData, setCurrencyData] = useState([])
  const [regionData, setRegionData] = useState([])
  const [languageData, setLanguageData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    country_access_code: "",
    country_alpha_3_code: "",
    country_code: "",
    country_name: "",
    country_native_name: "",
    currency_id: "",
    language_id: "",
    nationality: "",
    numeric_code: "",
    region_id: "",
    timezone_id: "",
  })
  const translationFields = [
    {
      label: "Country Name",
      name: "country_name",
      type: "text",
    },
  ]

  const validationRules = {
    country_code: {
      required: true,
      minlength: 2,
      maxlength: 2,
    },
    country_alpha_3_code: {
      required: false,
      minlength: 3,
      maxlength: 3,
    },
    country_access_code: {
      required: false,
      minlength: 3,
      maxlength: 3,
    },
    numeric_code: {
      required: false,
      minlength: 3,
      maxlength: 3,
    },
    country_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    nationality: {
      required: false,
      minlength: 1,
      maxlength: 64,
    },
    region_id: {
      required: true,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Country"
    if (!formId) {
      docTitle = "Create Country"
    } else if (isView) {
      docTitle = "Country Details"
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
            text: "Countries",
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
        if (res.data.timezone) {
          setTimezoneData([
            { ...res.data.timezone, text: res.data.timezone.timezone_name },
          ])
        }
        if (res.data.currency) {
          setCurrencyData([
            { ...res.data.currency, text: res.data.currency.currency_name },
          ])
        }
        if (res.data.region) {
          setRegionData([
            { ...res.data.region, text: res.data.region.region_name },
          ])
        }
        if (res.data.language) {
          setLanguageData([
            { ...res.data.language, text: res.data.language.language_name },
          ])
        }
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
      if (!form.country_alpha_3_code) {
        form.country_alpha_3_code = null
      }
      if (!form.numeric_code) {
        form.numeric_code = null
      }
      if (!form.timezone_id) {
        form.timezone_id = null
      }
      if (!form.currency_id) {
        form.currency_id = null
      }
      if (!form.nationality) {
        form.nationality = null
      }
      if (!form.language_id) {
        form.language_id = null
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
          label="Country Name *"
          value={form.country_name}
          name="country_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, country_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputSelectAjax
          label="Time Zone"
          value={form.timezone_id}
          name="timezone_id"
          cl="3"
          cr="6"
          endpoint="/master/timezones"
          column="zone_name"
          data={timezoneData}
          onChange={(e) =>
            setForm({ ...form, timezone_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        <FormInputSelectAjax
          label="Currency"
          value={form.currency_id}
          name="currency_id"
          cl="3"
          cr="6"
          endpoint="/master/currencies"
          column="currency_name"
          data={currencyData}
          onChange={(e) =>
            setForm({ ...form, currency_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        <FormInputControl
          label="Nationality"
          value={form.nationality}
          name="nationality"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputSelectAjax
          label="Region *"
          value={form.region_id}
          name="region_id"
          cl="3"
          cr="6"
          endpoint="/master/regions"
          column="region_name"
          data={regionData}
          onChange={(e) =>
            setForm({ ...form, region_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        <FormInputSelectAjax
          label="Default Language"
          value={form.language_id}
          name="language_id"
          cl="3"
          cr="6"
          endpoint="/master/languages"
          column="language_name"
          data={languageData}
          onChange={(e) =>
            setForm({ ...form, language_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Country Code *"
          value={form.country_code}
          name="country_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, country_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="2"
          maxLength="2"
          hint="Country code maximum 2 characters"
        />
        <FormInputControl
          label="Country Alpha 3 Code"
          value={form.country_alpha_3_code}
          name="country_alpha_3_code"
          cl="4"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, country_alpha_3_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Country Alpha 3 Code maximum 3 characters"
        />
        <FormInputControl
          label="Country Access Code"
          value={form.country_access_code}
          name="country_access_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, country_access_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Country Access Code maximum 3 characters"
        />
        <FormInputControl
          label="Numeric Code"
          value={form.numeric_code}
          name="numeric_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, numeric_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Numeric code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(CountryForm)
