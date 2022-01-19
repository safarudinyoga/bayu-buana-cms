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


const endpoint = "/master/hotels"
const backUrl = "/master/frequent-traveler-program"

function FrequentTravelerProgramForm(props) {
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
    loyalty_name: "",
    type: ""
  })
  const translationFields = [
    {
      label: "Loyalty Name",
      name: "loyalty_name",
      type: "text",
    },
  ]

  const validationRules = {
    loyalty_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkCode: true,
    },
    type: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    }
  }

  const validationMessages = {
    loyalty_name: {
      required: "Loyalty Name is required",
    },
    type: {
      required: "Type is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Frequent Traveler Program"
    if (!formId) {
      docTitle = "Create Frequent Traveler Program"
    } else if (isView) {
      docTitle = "Frequent Traveler Program Details"
    }

    dispatch(
      setUIParams({
        title: isView ? "Frequent Traveler Program Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: backUrl,
            text: "Frequent Traveler Program",
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
                url: `${env.API_URL}/master/hotels?filters=["state_province_name","=","${element.value}"]`,
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
                url: `${env.API_URL}/master/hotels?filters=["state_province_code","=","${element.value}"]`,
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
            url: `${env.API_URL}/master/hotels?filters=["state_province_name","=","${element.value}"]`,
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
            url: `${env.API_URL}/master/hotels?filters=["state_province_code","=","${element.value}"]`,
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
          label="Loyalty Name"
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
          <FormInputControl
          label="Type"
          required={true}
          value={form.state_province_name}
          name="type"
          cl="4"          
          onChange={(e) => setForm({...form, state_province_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        }
        {
          loading ? null :
          <FormInputControl
          label="Description"
          value={form.address_line}
          name="address_line"
          onChange={(e) => setForm({...form, address_line: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="512"
        />
}

      </FormHorizontal>

      
    </FormBuilder>
  )
}

export default withRouter(FrequentTravelerProgramForm)
