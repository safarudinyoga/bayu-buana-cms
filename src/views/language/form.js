import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import $ from "jquery"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/languages"
const backUrl = "/master/languages"

function LanguageForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    language_code: "",
    language_alpha_3_code: "",
    language_name: "",
    language_native_name: "",
    language_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Language Name",
      name: "language_name",
      type: "text",
    },
    {
      label: "Language Native Name",
      name: "language_native_name",
      type: "text",
    },
  ]

  const validationRules = {
    language_code: {
      required: true,
      minlength: 2,
      maxlength: 2,
      checkCode: true,
    },
    language_alpha_3_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
      checkAlpha3: true,
    },
    language_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
    language_native_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkNativeName: true,
    },
    language_asset: {
      required: true
    },
  }

  const validationMessages = {
    language_code: {
      required: "Language Code is required",
      minlength: "Language Code must be at least 3 characters",
      maxlength: "Language Code cannot be more than 3 characters",
    },
    language_name: {
      required: "Language Name is required",
      minlength: "Language Name must be at least 1 characters",
      maxlength: "Language Name cannot be more than 256 characters",
    }, 
    language_native_name: {
      required: "Language Native Name is required",
      minlength: "Language Native Name must be at least 1 characters",
      maxlength: "Language Native Name cannot be more than 256 characters",
    }, 
    language_asset: {
      required: "Language Flag Image is required",
      extension: "png|jpg|jpeg"
    },
    language_alpha_3_code: {
      required: "Language Alpha 3 Code is required",
      minlength: "Language Alpha 3 Code must be at least 3 characters",
      maxlength: "Language Alpha 3 Code cannot be more than 3 characters",
    }
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Language"
    let breadcrumbTitle = "Edit Language"
    if (!formId) {
      docTitle = "Create Language"
      breadcrumbTitle = "Create Language"
    } else if (isView) {
      docTitle = "Language Details"
      breadcrumbTitle = "View Language"
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
            text: "Language",
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

        if(res.data) {
          let currentCode = res.data.language_code
          let currentAlpha3 = res.data.language_alpha_3_code
          let currentName = res.data.language_name
          let currentNative = res.data.language_native_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/languages?filters=["language_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode.toUpperCase() === element.value.toUpperCase()){
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
            "checkAlpha3",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/languages?filters=["language_alpha_3_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentAlpha3.toUpperCase() === element.value.toUpperCase()){
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
            "Alpha 3 Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/languages?filters=["language_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName.toUpperCase() === element.value.toUpperCase()){
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
            "Language Name already exists",
          )
          $.validator.addMethod(
            "checkNativeName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/languages?filters=["language_native_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentNative.toUpperCase() === element.value.toUpperCase()){
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
            "Language Native Name already exists",
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
            url: `${env.API_URL}/master/languages?filters=["language_code","=","${element.value}"]`,
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
        "checkAlpha3",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/languages?filters=["language_alpha_3_code","=","${element.value}"]`,
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
        "Alpha 3 Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/languages?filters=["language_name","=","${element.value}"]`,
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
        "Language Name already exists",
      )
      $.validator.addMethod(
        "checkNativeName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/languages?filters=["language_native_name","=","${element.value}"]`,
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
        "Language Native Name already exists",
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
      if (!form.language_alpha_3_code) {
        form.language_alpha_3_code = null
      }
      if (!form.language_asset) {
        form.language_asset = null
      } else {
        if (!form.language_asset.multimedia_description_id) {
          form.language_asset = null
        }
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
          message: `Record ${form.language_code} - ${
            form.language_name
          } has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
  }

  const doUpload = async (e) => {
    try {
      let api = new Api()
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          language_asset: {
            multimedia_description_id: res.data.id,
            multimedia_description: res.data,
          },
        })
      }
    } catch (e) { }
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
          label="Language Name"
          labelRequired="label-required"
          value={form.language_name}
          name="language_name"
          onChange={(e) => setForm({...form, language_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputControl
          label="Language Native Name"
          labelRequired="label-required"
          value={form.language_native_name}
          name="language_native_name"
          onChange={(e) =>
            setForm({...form, language_native_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputControl
          label="Flag"
          type="image"
          labelRequired="label-required"
          name="language_asset"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          url={form.language_asset.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Language Code"
          labelRequired="label-required"
          value={form.language_code}
          name="language_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, language_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="2"
          maxLength="2"
          hint="Language code maximum 2 characters"
        />
        <FormInputControl
          label="Language Alpha 3 Code"
          labelRequired="label-required"
          value={form.language_alpha_3_code}
          name="language_alpha_3_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, language_alpha_3_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Language Alpha 3 Code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(LanguageForm)
