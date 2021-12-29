import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/passenger-types"
const backUrl = "/master/passenger-types"

function PassengerTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    passenger_type_code: "",
    passenger_alpha_3_code: "",
    passenger_type_name: "",
  })
  const translationFields = [
    {
      label: "Passenger Type Name",
      name: "passenger_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    passenger_type_code: {
      required: true,
      number: true,
      min: 0,
      max: 99,
      checkTypeCode: true,
      noSpace: true,
    },
    passenger_alpha_3_code: {
      minlength: 3,
      maxlength: 3,
      checkAlphaCode: true,
      noSpace: true,
    },
    passenger_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      noSpace: true,
    },
  }

  const validationMessages = {
    passenger_type_name: {
      required: "Passenger Type Name is required.",
    },
    passenger_type_code: {
      required: "Passenger Type Code is required.",
      number: "Code format is invalid",
    },
    passenger_alpha_3_code: {
      minlength: "Code format is invalid",
      maxlength: "Code format is invalid",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Passenger Type"
    if (!formId) {
      docTitle = "Create Passenger Type"
    } else if (isView) {
      docTitle = "View Passenger Type"
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
            text: "Passenger Types",
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
          let currentName = res.data.passenger_type_name
          let currentTypeCode = res.data.passenger_type_code
          let currentAlphaCode = res.data.passenger_alpha_3_code

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/passenger-types?filters=["passenger_type_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentName === element.value) {
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
            "Passenger Type Name already exists",
          )

          $.validator.addMethod(
            "checkTypeCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/passenger-types?filters=["passenger_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentTypeCode === parseInt(element.value)) {
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
            "checkAlphaCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/passenger-types?filters=["passenger_alpha_3_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentAlphaCode === element.value) {
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
        }
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/passenger-types?filters=["passenger_type_name","=","${element.value}"]`,
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
        "Passenger Type Name already exists",
      )

      $.validator.addMethod(
        "checkTypeCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/passenger-types?filters=["passenger_type_code","=","${element.value}"]`,
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
        "checkAlphaCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/passenger-types?filters=["passenger_alpha_3_code","=","${element.value}"]`,
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
      if (!form.passenger_alpha_3_code) {
        form.passenger_alpha_3_code = null
      }
      let res = await api.putOrPost(endpoint, id, {
        ...form,
        passenger_type_code: parseInt(form.passenger_type_code),
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
      props.history.push(backUrl)
      dispatch(
        setAlert({
          message: `Record ${form.passenger_type_code} - ${
            form.passenger_type_name
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
          label="Passenger Type Name"
          required={true}
          value={form.passenger_type_name}
          name="passenger_type_name"
          onChange={(e) =>
            setForm({ ...form, passenger_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Passenger Type Code"
          required={true}
          value={form.passenger_type_code}
          name="passenger_type_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({ ...form, passenger_type_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
        />
        <FormInputControl
          label="Alpha 3 Code"
          value={form.passenger_alpha_3_code}
          name="passenger_alpha_3_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({ ...form, passenger_alpha_3_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(PassengerTypeForm)
