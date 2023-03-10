import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/rating-types"
const backUrl = "/master/rating-types"

function RatingTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])

  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    provider: "",
    rating_symbol: "",
    rating_type_code: "",
    rating_type_name: "",
    scale: "",
  })
  const translationFields = [
    {
      label: "Rating Type Name",
      name: "rating_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    provider: {
      required: false,
      minlength: 1,
      maxlength: 256,
    },

    rating_symbol: {
      required: true,
    },

    rating_type_code: {
      required: true,
      min: 1,
      max: 32767,
      checkCode: true,
      noSpace: true,
      number:true
    },

    rating_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },

    scale: {
      required: true,
      min: 1,
      max: 999,
    },
  }

  const validationMessages = {
    rating_type_name: {
      required: "Rating Type Name is required",
    },
    rating_type_code: {
      required: "Rating Type Code is required",
      max: "Rating Type Code cannot be more than 32767",
    },
    scale: {
      required: "Scale is required",
    },
    rating_symbol: {
      required: "Rating Symbol is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Rating Type"
    if (!formId) {
      docTitle = "Create Rating Type"
    } else if (isView) {
      docTitle = "View Rating Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Rating Type Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Rating Types",
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
          let currentCode = res.data.rating_type_code
          let currentName = res.data.rating_type_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/rating-types?filters=["rating_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    req = currentCode === parseInt(element.value)
                  } else {
                    req = true
                  }
                },
              })
      
              return req
            },
            "Rating Type Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/rating-types?filters=["rating_type_name","=","${element.value}"]`,
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
            "Rating Type Name already exists",
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
            url: `${env.API_URL}/master/rating-types?filters=["rating_type_code","=","${element.value}"]`,
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
        "Rating Type Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/rating-types?filters=["rating_type_name","=","${element.value}"]`,
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
        "Rating Type Name already exists",
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
      if (!form.provider) {
        form.provider = ""
      }
      if (!form.rating_symbol) {
        form.rating_symbol = null
      }
      if (!form.rating_type_code) {
        form.rating_type_code = null
      }
      if (!form.rating_type_name) {
        form.rating_type_name = null
      }
      let res = await api.putOrPost(endpoint, id, {
        ...form,
        rating_type_code: parseInt(form.rating_type_code),
      })
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
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record ${form.rating_type_code} - ${form.rating_type_name} has been successfully ${formId ? "updated" : "saved"}.`,
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
          label="Rating Type Name"
          required={true}
          value={form.rating_type_name}
          name="rating_type_name"
          onChange={(e) =>
            setForm({...form, rating_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputControl
          label="Provider"
          value={form.provider}
          name="provider"
          onChange={(e) => setForm({...form, provider: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {
          !loading &&
        <FormInputSelectAjax
          label="Rating Symbol"
          required={true}
          value={form.rating_symbol}
          name="rating_symbol"
          column="rating_symbol"
          onChange={(e) =>
            setForm({...form, rating_symbol: e.target.value || null})
          }          
          disabled={isView || loading}
          type="select"
        >
          <option value="">Please Choose</option>
          <option value="star">Star</option>
          <option value="like">Like</option>
          <option value="smiler">Smile</option>
        </FormInputSelectAjax>
        }

        <FormInputControl
          label="Scale"
          required={true}
          value={form.scale}
          name="scale"
          onChange={(e) =>
            setForm({...form, scale: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="1"
          max="3"
        />

        {
          formId 
            ? <Link to={`/master/rating-types/${formId}/rating-type-levels`} className="btn btn-warning float-left button-new mt-2">
              Rating Type Level
            </Link>
          : null
        }

      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Rating Type Code"
          required={true}
          value={form.rating_type_code}
          name="rating_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, rating_type_code: e.target.value})
          }
          disabled={isView || loading}
          type="number"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RatingTypeForm)
