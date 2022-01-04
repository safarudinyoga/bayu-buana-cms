import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/currencies"
const backUrl = "/master/currencies"

function CurrencyForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    currency_code: "",
    numeric_code: "",
    currency_name: "",
    currency_symbol: "",
    position: "Before",
    minor_unit_name: "",
    minor_unit: "",
    standard_precision: "",
    price_precision: "",
  })
  const translationFields = [
    {
      label: "Currency Name",
      name: "currency_name",
      type: "text",
      maxLength: 64,
    },
    {
      label: "Minor Unit Name",
      name: "minor_unit_name",
      type: "text",
      maxLength: 64,
    },
  ]

  const validationRules = {
    currency_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
      checkCode: true,
    },
    numeric_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
      checkNumeric: true,
    },
    currency_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
      checkName: true,
    },
    currency_symbol: {
      required: true,
      minlength: 1,
      maxlength: 64,
      checkSymbol: true,
    },
    position: {},
    minor_unit_name: {
      minlength: 1,
      maxlength: 64,
    },
    minor_unit: {
      min: 1,
      max: 99,
    },
    standard_precision: {
      min: 0,
      max: 99,
    },
    price_precision: {
      min: 0,
      max: 99,
    },
  }

  const validationMessages = {
    currency_code: {
      required: "Currency Code is required",
    },
    currency_name: {
      required: "Currency Name is required",
    },
    currency_symbol: {
      required: "Currency Symbol is required",
    },
    numeric_code: {
      required: "Numeric Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Currency"
    if (!formId) {
      docTitle = "Create Currency"
    } else if (isView) {
      docTitle = "View Currency"
    }

    dispatch(
      setUIParams({
        title: isView ? "Currency Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Currencies",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    console.log(formId)
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

        if (res.data) {
          let currentCode = res.data.currency_code
          let currentNumeric = res.data.numeric_code
          let currentName = res.data.currency_name
          let currentSymbol = res.data.currency_symbol

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/currencies?filters=["currency_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName === element.value){
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
            "Currency Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/currencies?filters=["currency_code","=","${element.value}"]`,
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
            "Currency Code already exists",
          )
          $.validator.addMethod(
            "checkNumeric",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/currencies?filters=["numeric_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentNumeric === element.value){
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
            "Numeric Code already exists",
          )
          $.validator.addMethod(
            "checkSymbol",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/currencies?filters=["currency_symbol","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentSymbol === element.value){
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
            "Currency Symbol already exists",
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
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/currencies?filters=["currency_name","=","${element.value}"]`,
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
        "Currency Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/currencies?filters=["currency_code","=","${element.value}"]`,
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
        "Currency Code already exists",
      )
      $.validator.addMethod(
        "checkNumeric",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/currencies?filters=["numeric_code","=","${element.value}"]`,
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
        "Numeric Code already exists",
      )
      $.validator.addMethod(
        "checkSymbol",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/currencies?filters=["currency_symbol","=","${element.value}"]`,
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
        "Currency Symbol already exists",
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
      if (!form.minor_unit_name) {
        form.minor_unit_name = null
      }
      if (!form.minor_unit) {
        form.minor_unit = null
      }
      if (!form.standard_precision) {
        form.standard_precision = null
      }
      if (!form.price_precision) {
        form.price_precision = null
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
          message: `Record ${form.currency_code} - ${form.currency_name} has been successfully ${formId ? "updated" : "saved"}.`,
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
          label="Currency Name"
          required={true}
          value={form.currency_name}
          name="currency_name"
          onChange={(e) => setForm({...form, currency_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputControl
          label="Currency Symbol"
          required={true}
          value={form.currency_symbol}
          name="currency_symbol"
          onChange={(e) =>
            setForm({...form, currency_symbol: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputWrapper label="Position">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="position"
              id="csp-1"
              value="Before"
              disabled={isView || loading}
              checked={form.position === "Before"}
              onChange={(e) => setForm({...form, position: e.target.value})}
            />
            <label className="form-check-label" htmlFor="csp-1">
              Before
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="position"
              id="csp-2"
              value="After"
              disabled={isView || loading}
              checked={form.position === "After"}
              onChange={(e) => setForm({...form, position: e.target.value})}
            />
            <label className="form-check-label" htmlFor="csp-2">
              After
            </label>
          </div>
        </FormInputWrapper>
        <FormInputControl
          label="Minor Unit Name"
          value={form.minor_unit_name}
          name="minor_unit_name"
          onChange={(e) =>
            setForm({...form, minor_unit_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputControl
          label="Minor Unit"
          value={form.minor_unit}
          name="minor_unit"
          onChange={(e) => setForm({...form, minor_unit: parseInt(e.target.value)})}
          disabled={isView || loading}
          type="number"
          min="1"
          max="99"
        />
        <FormInputControl
          label="Standard Precision"
          value={form.standard_precision}
          name="standard_precision"
          onChange={(e) =>
            setForm({...form, standard_precision: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
        />
        <FormInputControl
          label="Price Precision"
          value={form.price_precision}
          name="price_precision"
          onChange={(e) =>
            setForm({...form, price_precision: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Currency Code"
          required={true}
          value={form.currency_code}
          name="currency_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, currency_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Currency code maximum 3 characters"
        />
        <FormInputControl
          label="Numeric Code"
          required={true}
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

export default withRouter(CurrencyForm)
