import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
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


function RatingTypeLevelForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id
  let ratingTypeId = props.match.params.id_rating_type
  const backUrl = `/master/rating-types/${ratingTypeId}/rating-type-levels`
  const endpoint = `/master/rating-types/${ratingTypeId}/levels`

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])

  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    rating_type_level_code: null,
    rating_type_level_name: "",
    rating: null,
  })
  const translationFields = [
    {
      label: "Rating Type Level Name",
      name: "rating_type_level_name",
      type: "text",
    },
  ]

  const validationRules = {
    rating_type_level_code: {
      required: true,
      min: 0,
      max: 99,
      checkCode: true,
    },

    rating_type_level_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },

    rating: {
      required: true,
      min: 1,
      max: 999,
    },
  }

  const validationMessages = {
    rating_type_level_name: {
      required: "Rating Type Level Name is required",
    },
    rating_type_level_code: {
      required: "Rating Type Level Code is required",
    },
    rating: {
      required: "Rating is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Rating Type Level"
    if (!formId) {
      docTitle = "Create Rating Type Level"
    } else if (isView) {
      docTitle = "View Rating Type Level"
    }
    dispatch(
      setUIParams({
        title: isView ? "Rating Type Level Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: "/master/rating-types",
            text: "Rating Types",
          },
          {
            link: backUrl,
            text: "Rating Types Level",
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
          let currentCode = res.data.rating_type_level_code
          let currentName = res.data.rating_type_level_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/rating-types/${ratingTypeId}/levels?filters=["rating_type_level_code","=","${element.value}"]`,
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
            "Rating Type Level Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/rating-types/${ratingTypeId}/levels?filters=["rating_type_level_name","=","${element.value}"]`,
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
            "Rating Type Level Name already exists",
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
            url: `${env.API_URL}/master/rating-types/${ratingTypeId}/levels?filters=["rating_type_level_code","=","${element.value}"]`,
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
        "Rating Type Level Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/rating-types/${ratingTypeId}/levels?filters=["rating_type_level_name","=","${element.value}"]`,
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
        "Rating Type Level Name already exists",
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
      if (!form.rating_type_level_code) {
        form.rating_type_level_code = null
      }
      if (!form.rating_type_level_name) {
        form.rating_type_level_name = null
      }
      if (!form.rating) {
        form.rating = null
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
          message: `Record ${form.rating_type_level_code} - ${form.rating_type_level_name} has been successfully ${formId ? "updated" : "saved"}..`,
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
          label="Rating Type Level Name"
          labelRequired="label-required"
          value={form.rating_type_level_name}
          name="rating_type_level_name"
          onChange={(e) =>
            setForm({...form, rating_type_level_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputControl
          label="Rating"
          labelRequired="label-required"
          value={form.rating}
          name="rating"
          onChange={(e) =>
            setForm({...form, rating: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="1"
          max="999"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Rating Type Level Code"
          labelRequired="label-required"
          value={form.rating_type_level_code}
          name="rating_type_level_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, rating_type_level_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="1"
          max="99"
          hint="Rating type level code maximum 2 digits"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RatingTypeLevelForm)
