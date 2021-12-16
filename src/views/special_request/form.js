import {withRouter} from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/special-requests"
const backUrl = "/master/special-requests"

function SpecialRequestForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    special_request_code: "",
    special_request_name: "",
  })
  const translationFields = [
    {
      label: "Special Request Name",
      name: "special_request_name",
      type: "text",
    },
  ]

  const validationRules = {
    special_request_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
    },
    special_request_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
  }

  const validationMessages = {
    special_request_code: {
      required: "Special Request Code is required.",
      minlength: "Special Request Code must be at least 1 characters",
      maxlength: "Special Request Code cannot be more than 36 characters",
    },
    special_request_name: {
      required: "Special Request Name is required",
      minlength: "Special Request Name must be at least 1 characters",
      maxlength: "Special Request Name cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Special Request"
    let breadcrumbTitle = "Edit Special Request"
    if (!formId) {
      docTitle = "Create Special Request"
      breadcrumbTitle = "Create Special Request"
    } else if (isView) {
      docTitle = "Special Request Details"
      breadcrumbTitle = "View Special Request"
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
            text: "Special Requests",
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

        if(res.data){
          let currentCode = res.data.special_request_code
          let currentName = res.data.special_request_name

          $.validator.addMethod(
            "checkCode",
            function(value, element){
              var req = false;
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/special-requests?filters=["special_request_code","like","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode.toUpperCase() === element.value.toUpperCase()){
                      req = true
                    } else {
                      if(res.items[0].special_request_code.toUpperCase() === element.value.toUpperCase()){
                        req = false
                      }
                      else {
                        req = true
                      }
                    }

                    
                  } else {
                    req = true
                  }
                },
              })
    
              return req
            },
            "Code already exists"
          )
          $.validator.addMethod(
            "checkName",
            function(value, element){
              var req = false;
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/special-requests?filters=["special_request_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName.toUpperCase() === element.value.toUpperCase()){
                      req = true
                    } else {
                      if(res.items[0].special_request_name.toUpperCase() === element.value.toUpperCase()){
                        req = false
                      }
                      else {
                        req = true
                      }
                    }
                  } else {
                    req = true
                  }
                },
              })
    
              return req
            },
            "Special Request Name already exists"
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
        function(value, element){
          var req = false;
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/special-requests?filters=["special_request_code","like","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                if(res.items[0].special_request_code.toUpperCase() === element.value.toUpperCase()){
                  req = false
                }
                else {
                  req = true
                }
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Code already exists"
      )
      $.validator.addMethod(
        "checkName",
        function(value, element){
          var req = false;
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/special-requests?filters=["special_request_name","like","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                if(res.items[0].special_request_name.toUpperCase() === element.value.toUpperCase()){
                  req = false
                }
                else {
                  req = true
                }
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Special Request Name already exists"
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
          message: `Record ${form.special_request_code} - ${
            form.special_request_name
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
          label="Special Request Name"
          labelRequired="label-required"
          value={form.special_request_name}
          name="special_request_name"
          onChange={(e) =>
            setForm({...form, special_request_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Special Request Code"
          labelRequired="label-required"
          value={form.special_request_code}
          name="special_request_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, special_request_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Special request code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(SpecialRequestForm)
