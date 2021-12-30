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

const endpoint = "/master/regions"
const backUrl = "/master/regions"

function RegionForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    region_code: "",
    region_name: "",
  })
  const translationFields = [
    {
      label: "Region Name",
      name: "region_name",
      type: "text",
    },
  ]

  const validationRules = {
    region_code: {
      required: true,
      minlength: 2,
      maxlength: 2,
      checkCode: true,
    },
    region_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
  }

  const validationMessages = {
    region_code: {
      required: "Region Code is required",
    },
    region_name: {
      required: "Region Name is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Region"
    if (!formId) {
      docTitle = "Create Region"
    } else if (isView) {
      docTitle = "View Region"
    }

    dispatch(
      setUIParams({
        title: isView ? "Region Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Regions",
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
          let currentCode = res.data.region_code
          let currentName = res.data.region_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/regions?filters=["region_code","=","${element.value}"]`,
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
            "Region Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/regions?filters=["region_name","=","${element.value}"]`,
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
            "Region Name already exists",
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
            url: `${env.API_URL}/master/regions?filters=["region_code","=","${element.value}"]`,
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
        "Region Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/regions?filters=["region_name","=","${element.value}"]`,
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
        "Region Name already exists",
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
          message: `Record ${form.region_code} - ${form.region_name} has been successfully ${formId ? "updated" : "saved"}..`,
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
          label="Region Name"
          required={true}
          value={form.region_name}
          name="region_name"
          onChange={(e) => setForm({...form, region_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Region Code"
          required={true}
          value={form.region_code}
          name="region_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, region_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="2"
          maxLength="2"
          hint="Region code maximum 2 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RegionForm)
