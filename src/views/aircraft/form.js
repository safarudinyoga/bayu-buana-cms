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

const endpoint = "/master/aircraft"
const backUrl = "/master/aircrafts"

function AircraftForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    aircraft_name: "",
    model: "",
    icao_code: "",
    aircraft_code: "",
  })
  const translationFields = [
    {
      label: "Aircraft Name",
      name: "aircraft_name",
      type: "text",
    },
  ]

  const validationRules = {
    aircraft_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
      checkName: true,
    },
    model: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    icao_code: {
      required: true,
      minlength: 4,
      maxlength: 4,
      checkIcao: true,
    },
    aircraft_code: {
      required: true,
      minlength: 4,
      maxlength: 4,
      checkCode: true,
    },
  }

  const validationMessages = {
    aircraft_name: {
      required: "Aircraft Name is required",
    },
    icao_code: {
      required: "Icao Code is required",
    },
    model: {
      required: "Model is required",
    },
    aircraft_code: {
      required: "Aircraft Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Aircraft"
    if (!formId) {
      docTitle = "Create Aircraft"
    } else if (isView) {
      docTitle = "View Aircraft"
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
            text: "Aircrafts",
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
          let currentCode = res.data.aircraft_code
          let currentIcao = res.data.icao_code
          let currentName = res.data.aircraft_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/aircraft?filters=["aircraft_name","=","${element.value}"]`,
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
            "Aircraft Name already exists",
          )
          $.validator.addMethod(
            "checkIcao",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/aircraft?filters=["icao_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentIcao === element.value){
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
            "Icao Code already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/aircraft?filters=["aircraft_code","=","${element.value}"]`,
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
            "Aircraft Code already exists",
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
            url: `${env.API_URL}/master/aircraft?filters=["aircraft_name","=","${element.value}"]`,
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
        "Aircraft Name already exists",
      )
      $.validator.addMethod(
        "checkIcao",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/aircraft?filters=["icao_code","=","${element.value}"]`,
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
        "Icao Code already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/aircraft?filters=["aircraft_code","=","${element.value}"]`,
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
        "Aircraft Code already exists",
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
      if (!form.model) {
        form.model = null
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
          message: `Record ${form.aircraft_code} - ${form.aircraft_name} has been successfully ${formId ? "updated" : "saved"}..`,
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
          label={"Aircraft Name"}
          labelRequired="label-required"
          value={form.aircraft_name}
          name="aircraft_name"
          onChange={(e) => setForm({...form, aircraft_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputControl
          value={form.model}
          name="model"
          onChange={(e) => setForm({...form, model: e.target.value})}
          label="Model"
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          value={form.aircraft_code}
          labelRequired="label-required"
          name="aircraft_code"
          onChange={(e) => setForm({...form, aircraft_code: e.target.value})}
          cl={{md:"12"}}
          cr="12"
          disabled={isView || loading}
          label="Aircraft Code"
          type="text"
          pattern="\d*" 
          minLength="4"
          maxLength="4"
          hint="Aircraft code maximum 4 characters"
        />
        <FormInputControl
          value={form.icao_code}
          labelRequired="label-required"
          name="icao_code"
          onChange={(e) => setForm({...form, icao_code: e.target.value})}
          cl={{md:"12"}}
          cr="12"
          disabled={isView || loading}
          label="ICAO Code"
          type="text"
          minLength="4"
          maxLength="4"
          hint="ICAO Code maximum 4 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AircraftForm)
