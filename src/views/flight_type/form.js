import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import { setAlert, setUIParams } from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/flight-types"
const backUrl = "/master/flight-types"

function FlightTypeForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    flight_type_code: "",
    flight_type_name: "",
  })
  const translationFields = [
    {
      label: "Flight Type Name",
      name: "flight_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    flight_type_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkName: formId == null
    },
    flight_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName2: formId == null
    },
  }

  const validationMessages = {
    flight_type_code: {
      required: "Flight Type Code is required.",
      minlength: "Flight type code must be at least 1 characters",
      maxlength: "Flight type code cannot be longer than 36 characters",

    },
    flight_type_name: {
      required: "Flight Type Name is required.",
      minlength: "Flight type name must be at least 1 characters",
      maxlength: "Flight type name cannot be longer than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Flight Type"
    if (!formId) {
      docTitle = "Create Flight Type"
    } else if (isView) {
      docTitle = "View Flight Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Flight Type Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Flight Types",
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
            url: `${env.API_URL}/master/flight-types?filters=["flight_type_code","=","${element.value}"]`,
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
        "Flight Type Code already exists",
      )

      $.validator.addMethod(
        "checkName2",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/flight-types?filters=["flight_type_name","=","${element.value}"]`,
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
        "Flight Type Name already exists",
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
          message: `Record ${form.flight_type_code} - ${
            form.flight_type_name
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
          label="Flight Type Name"
          labelRequired="label-required"
          value={form.flight_type_name}
          name="flight_type_name"
          onChange={(e) =>
            setForm({...form, flight_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Flight Type Code"
          labelRequired="label-required"
          value={form.flight_type_code}
          name="flight_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, flight_type_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Flight Type Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(FlightTypeForm)
