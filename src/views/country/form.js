import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import $ from "jquery"
import {useDispatch} from "react-redux"
import { setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/countries"
const backUrl = "/master/countries"

function CountryForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [timeZoneData, setTimeZoneData] = useState([])
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
    timezone_id: ""
  })
  const translationFields = [
    {
      label: "Country Name",
      name: "country_name",
      type: "text",
      maxLength: 64,
    },
    {
      label: "Nationality",
      name: "nationality",
      type: "text",
      maxLength: 64,
    },
  ]

  const validationRules = {
    country_code: {
      required: true,
      minlength: 2,
      maxlength: 2,
      checkCode: true,
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
      checkName: true,
    },
    nationality: {
      required: false,
      minlength: 1,
      maxlength: 64,
    },
    region_id: {
      required: true
    }
  }

  const validationMessages = {
    country_code: {
      required: "Country Code is required",
      minlength: "Country Code must be at least 2 characters",
      maxlength: "Country Code cannot be more than 2 characters",
    },
    country_name: {
      required: "Country Name is required",
      minlength: "Country Name must be at least 1 characters",
      maxlength: "Country Name cannot be more than 64 characters",
    },
    nationality: {
      minlength: "Nationality must be at least 1 characters",
      maxlength: "Nationality cannot be more than 64 characters",
    },
    region_id: {
      required: "Region is required"
    }
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Country"
    let breadcrumbTitle = "Edit Country"
    if (!formId) {
      docTitle = "Create Country"
      breadcrumbTitle = "Create Country"
    } else if (isView) {
      docTitle = "Country Details"
      breadcrumbTitle = "View Country"
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
            text: breadcrumbTitle,
          },
        ],
      }),
    )

    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

        if (res.data.timezone) {
          setTimeZoneData([{...res.data.timezone, text: res.data.timezone.zone_name}])
        }

        if (res.data.currency) {
          setCurrencyData([{...res.data.currency, text: res.data.currency.currency_name}])
        }

        if (res.data.region) {
          setRegionData([{...res.data.region, text: res.data.region.region_name}])
        }

        if (res.data.language) {
          setLanguageData([{...res.data.language, text: res.data.language.language_name}])
        }

        if(res.data){
          let currentCode = res.data.country_code
          let currentCountry = res.data.country_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/countries?filters=["country_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode === element.value){
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })
    
              return req
            },
            "Code already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/countries?filters=["country_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCountry.toUpperCase() === element.value.toUpperCase()){
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })
      
              return req
            },
            "Country Name already exists",
          )
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
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/countries?filters=["country_code","=","${element.value}"]`,
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
        "Code already exists",
      )

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/countries?filters=["country_name","=","${element.value}"]`,
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
        "Country Name already exists",
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
          message: `Record ${form.country_code} - ${
            form.country_name
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
          label="Country Name"
          labelRequired="label-required"
          value={form.country_name}
          name="country_name"
          onChange={(e) => setForm({...form, country_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        {
          !loading &&
        <FormInputSelectAjax
          label="Time Zone"
          value={form.timezone_id}
          name="timezone_id"
          endpoint="/master/timezones"
          column="zone_name"
          data={timeZoneData}
          onChange={(e) =>
            setForm({...form, timezone_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        }
        {
          !loading &&
        <FormInputSelectAjax
          label="Currency"
          value={form.currency_id}
          name="currency_id"
          endpoint="/master/currencies"
          column="currency_name"
          data={currencyData}
          onChange={(e) =>
            setForm({...form, currency_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        }
        <FormInputControl
          label="Nationality"
          value={form.nationality}
          name="nationality"
          onChange={(e) => setForm({...form, nationality: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        {
          !loading &&
        <FormInputSelectAjax
          label="Region"
          labelRequired="label-required"
          value={form.region_id}
          name="region_id"
          endpoint="/master/regions"
          column="region_name"
          data={regionData}
          onChange={(e) =>
            setForm({...form, region_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        }
        {
          !loading &&
        <FormInputSelectAjax
          label="Default Language"
          value={form.language_id}
          name="language_id"
          endpoint="/master/languages"
          column="language_name"
          data={languageData}
          onChange={(e) =>
            setForm({...form, language_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
          hint="Please Select Lenguages"
        />
        }
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Country Code"
          labelRequired="label-required"
          value={form.country_code}
          name="country_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, country_code: e.target.value})}
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
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, country_alpha_3_code: e.target.value})}
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
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, country_access_code: e.target.value})}
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
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, numeric_code: e.target.value})}
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
