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

const endpoint = "/master/meal-plan-types"
const backUrl = "/master/meal-plan-types"

function MealPlanTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    meal_plan_type_code: "",
    meal_plan_type_name: "",
    meal_plan_type_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    }
  })
  const translationFields = [
    {
      label: "Meal Plan Type Name",
      name: "meal_plan_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    meal_plan_type_code: {
      required: true,
      min: 1,
      max: 32767,
      checkCode: true,
    },
    meal_plan_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true
    },
    meal_plan_type_asset: {
      required: false,
    }
  }

  const validationMessages = {
    meal_plan_type_name: {
      required: "Meal plan type Name is required",
      minlength: "Meal plan type Name must be at least 1 characters",
      maxlength: "Meal plan type Name cannot be more than 99 characters",
    },
    meal_plan_type_code: {
      required: "Meal plan type Code is required",
      max: "Meal plan type code must be no more than 32767",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Meal Plan Type"
    if (!formId) {
      docTitle = "Create Meal Plan Type"
    } else if (isView) {
      docTitle = "View Meal Plan Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Meal Plan Type Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Meal Plan Types",
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

        if(res.data){
          let currentCode = res.data.meal_plan_type_code
          let currentName = res.data.meal_plan_type_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/meal-plan-types?filters=["meal_plan_type_code","=","${element.value}"]`,
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
            "Meal plan type Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              let filters = JSON.stringify(["meal_plan_type_name","=",element.value])
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/meal-plan-types?filters=${encodeURIComponent(filters)}`,
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
            "Meal plan type Name already exists",
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
            url: `${env.API_URL}/master/meal-plan-types?filters=["meal_plan_type_code","=","${element.value}"]`,
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
        "Meal plan type Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify(["meal_plan_type_name","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/meal-plan-types?filters=${encodeURIComponent(filters)}`,
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
        "Meal plan type Name already exists",
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
      if(form.meal_plan_type_asset){
        if(form.meal_plan_type_asset.multimedia_description_id == null){
          form.meal_plan_type_asset = null
        }
      } else {
        form.meal_plan_type_asset = null
      }

      if(form.meal_plan_type_code === ""){
        form.meal_plan_type_code = null
      }

      if(form.meal_plan_type_name === ""){
        form.meal_plan_type_name = null
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
          message: `Record ${form.meal_plan_type_code} - ${form.meal_plan_type_name} has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
  }

  const doUpload = async (e) => {
    try {
      var files = e.target.files[0];
      if(files){
        var filesize = ((files.size/1024)/1024).toFixed(4);
        if(filesize > 4){
          alert("Icon size is more than 4MB.");
          $("#meal-plan-type-icon").val('');
          return;
        }
        let api = new Api()
        let payload = new FormData()
        payload.append("files", e.target.files[0])

        let config = {
          onUploadProgress: function(progressEvent) {
            let mediaDiv = document.getElementById("media-meal-plan-type-icon")
            let progressBar = document.getElementById("progress-meal-plan-type-icon")
            mediaDiv.style.display = "none"
            progressBar.style.display = "block"
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            progressBar.value = percentCompleted;
            if(progressBar.value == 100){
              setTimeout(() => {
                progressBar.style.display = "none"
                mediaDiv.style.display = "block"
              }, 1000)
            }
          }
        }

        let res = await api.post("/multimedia/files", payload, config)
        if (res.data) {
          setForm({
            ...form,
            meal_plan_type_asset: {
              multimedia_description_id: res.data.id,
              multimedia_description: res.data,
            },
          })
        }
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
          label="Meal Plan Type Name"
          required={true}
          value={form.meal_plan_type_name}
          name="meal_plan_type_name"
          onChange={(e) =>
            setForm({...form, meal_plan_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputControl
          id="meal-plan-type-icon"
          label="Icon"
          type="image"
          name="meal_plan_type_asset"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          url={form.meal_plan_type_asset?.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
          notes={true}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Meal Plan Type Code"
          required={true}
          value={form.meal_plan_type_code}
          name="meal_plan_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, meal_plan_type_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="32767"
          hint="Meal Plan Type Code is numeric"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(MealPlanTypeForm)
