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

const endpoint = "/master/location-categories"
const backUrl = "/master/location-categories"

function LocationCategoryForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    location_category_code: "",
    location_category_name: "",
  })
  const translationFields = [
    {
      label: "Location Category Name",
      name: "location_category_name",
      type: "text",
    },
  ]

  const validationRules = {
    location_category_code: {
      required: true,
      min: 1,
      max: 99,
      checkCode: true,
    },
    location_category_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true
    },
  }

  const validationMessages = {
    location_category_name: {
      required: "Location category Name is required",
      minlength: "Location category Name must be at least 1 characters",
      maxlength: "Location category Name cannot be more than 99 characters",
    },
    location_category_code: {
      required: "Location category Code is required",
      minlength: "Location category Code must be at least 1 characters",
      maxlength: "Location category Code cannot be more than 36 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Location Category"
    let breadcrumbTitle = "Edit Location Category"
    if (!formId) {
      docTitle = "Create Location Category"
      breadcrumbTitle = "Create Location Category"
    } else if (isView) {
      docTitle = "Location Category Details"
      breadcrumbTitle = "View Location Category"
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
            text: "Location Categories",
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
          let currentCode = res.data.location_category_code
          let currentName = res.data.location_category_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/location-categories?filters=["location_category_code","=","${element.value}"]`,
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
            "Location Category Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/location-categories?filters=["location_category_name","=","${element.value}"]`,
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
            "Location Category Name already exists",
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
            url: `${env.API_URL}/master/location-categories?filters=["location_category_code","=","${element.value}"]`,
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
        "Location Category Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/location-categories?filters=["location_category_name","=","${element.value}"]`,
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
        "Location Category Name already exists",
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
          message: `Record ${form.location_category_code} - ${form.location_category_name} has been successfully ${formId ? "updated" : "saved"}.`,
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
          label="Location Category Name"
          required={true}
          value={form.location_category_name}
          name="location_category_name"
          onChange={(e) =>
            setForm({...form, location_category_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Location Category Code"
          required={true}
          value={form.location_category_code}
          name="location_category_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, location_category_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Location Category Code is numeric"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(LocationCategoryForm)
