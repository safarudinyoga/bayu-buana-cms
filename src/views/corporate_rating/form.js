import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"


const endpoint = "/master/corporate-rating-types"
const backUrl = "/master/corporate-rating"

function CorporateRatingForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    corporate_rating_type_code: "",
    corporate_rating_type_name: "",
    scale: "",
  })
  const translationFields = [
    {
      label: "Corporate Rating Name",
      name: "corporate_rating_type_name",
      type: "text",
    },   
  ]

  const validationRules = {
    corporate_rating_type_code: {
      required: true,
      min: 1,
      max: 32767,
      checkCode: true,
    },
    corporate_rating_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
    scale: {
      required: false,
      min: 1,
      max: 9999,
    },
  }

  const validationMessages = {
    corporate_rating_type_name: {
      required: "Corporate Rating Name is required",
    },
    corporate_rating_type_code: {
      required: "Corporate Rating Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Corporate Rating"
    if (!formId) {
      docTitle = "Create Corporate Rating"
    } else if (isView) {
      docTitle = "Corporate Rating Details"
    }

    dispatch(
      setUIParams({
        title: isView ? "Corporate Rating Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: backUrl,
            text: "Corporate Rating",
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

        if (res.data) {
          let currentCode = res.data.corporate_rating_type_code
          let currentName = res.data.corporate_rating_type_name

          
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-rating-types?filters=["corporate_rating_type_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName == element.value){
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
            "Corporate Rating Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              console.log('currentCode', currentCode)
              console.log('val', element.value)
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-rating-types?filters=["corporate_rating_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode == element.value){
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
            "Corporate Rating Code already exists",
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
            url: `${env.API_URL}/master/corporate-rating-types?filters=["corporate_rating_type_name","=","${element.value}"]`,
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
        "Corporate Rating Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/corporate-rating-types?filters=["corporate_rating_type_code","=","${element.value}"]`,
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
        "Corporate Rating Code already exists",
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
      if (!form.scale) {
        form.scale = null
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
          message: `Record ${form.corporate_rating_type_code} - ${form.corporate_rating_type_name} has been successfully ${formId ? "updated" : "saved"}.`,
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
          label="Rating Name"
          required={true}
          value={form.corporate_rating_type_name}
          name="corporate_rating_type_name"
          cl="4"          
          onChange={(e) => setForm({...form, corporate_rating_type_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />       
        {
          loading ? null :
          <FormInputControl
          label="Rating"
          value={form.scale}
          name="scale"
          onChange={(e) => setForm({...form, scale: parseInt(e.target.value)})}
          disabled={isView || loading}
          type="number"
          min="1"
          max="9999"
        />
        }

      </FormHorizontal>
      <FormHorizontal>
        <FormInputControl
          label="Rating Code"
          required={true}
          value={form.corporate_rating_type_code}
          name="corporate_rating_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, corporate_rating_type_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="32767"
          hint="Location Category Code is numeric"
        />
      </FormHorizontal>

      
    </FormBuilder>
  )
}

export default withRouter(CorporateRatingForm)
