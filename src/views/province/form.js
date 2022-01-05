import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"


const endpoint = "/master/state-provinces"
const backUrl = "/master/provinces"

function ProvinceForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [subdivisionData, setSubdivisionData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    country_id: "",
    state_province_category_id: "",
    state_province_code: "",
    state_province_name: ""
  })
  const translationFields = [
    {
      label: "State / Province Name",
      name: "state_province_name",
      type: "text",
    },
  ]

  const validationRules = {
    state_province_code: {
      required: true,
      minlength: 1,
      maxlength: 8,
      checkCode: true,
    },
    state_province_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    }
  }

  const validationMessages = {
    state_province_name: {
      required: "State Province Name is required",
    },
    state_province_code: {
      required: "State Province Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit State Province"
    if (!formId) {
      docTitle = "Create State Province"
    } else if (isView) {
      docTitle = "View State Province"
    }

    dispatch(
      setUIParams({
        title: isView ? "State Province Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "States/ Provinces",
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
        if (res.data.state_province_category) {
          setSubdivisionData([{...res.data.state_province_category, text: res.data.state_province_category.state_province_category_name}])
        }
        if (res.data.country) {
          setCountryData([{...res.data.country, text: res.data.country.country_name}])
        }

        if (res.data) {
          let currentCode = res.data.state_province_code
          let currentName = res.data.state_province_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/state-provinces?filters=["state_province_name","=","${element.value}"]`,
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
            "State Province Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/state-provinces?filters=["state_province_code","=","${element.value}"]`,
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
            "State Province Code already exists",
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
            url: `${env.API_URL}/master/state-provinces?filters=["state_province_name","=","${element.value}"]`,
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
        "State Province Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/state-provinces?filters=["state_province_code","=","${element.value}"]`,
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
        "State Province Code already exists",
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
      if (!form.country_id) {
        form.country_id = null
      }

      if (!form.state_province_category_id) {
        form.state_province_category_id = null
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
          message: `Record ${form.state_province_code} - ${form.state_province_name} has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
  }

  console.log('loading, ', loading)

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
          label="State / Province Name"
          required={true}
          value={form.state_province_name}
          name="state_province_name"
          cl="4"
          
          onChange={(e) => setForm({...form, state_province_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {
          !loading &&
        <FormInputSelectAjax
          label="Subdivision Category"
          value={form.state_province_category_id}
          name="state_province_category_id"
          cl="4"
          filter={`["status", "=", 1]`}
          endpoint="/master/state-province-categories"
          column="state_province_category_name"
          data={subdivisionData}
          onChange={(e) =>
            setForm({...form, state_province_category_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />
        }
        {
          loading ? null :
        <FormInputSelectAjax
          label="Country"
          value={form.country_id}
          name="country_id"
          cl="4"
          endpoint="/master/countries"
          column="country_name"
          filter={`["status", "=", 1]`}
          data={countryData}
          onChange={(e) =>
            setForm({...form, country_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />
}

      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="State / Province Code"
          required={true}
          value={form.state_province_code}
          name="state_province_code"
          cl="7"
          cr="5"
          onChange={(e) => setForm({...form, state_province_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="8"
          hint="State / Province code maximum 8 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(ProvinceForm)
