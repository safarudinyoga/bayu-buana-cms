import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import env from "../../config/environment"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
const endpoint = "/master/destination-groups"
const backUrl = "/master/destination-groups"

function DestinationGroupForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    destination_group_code: "",
    destination_group_name: "",
  })
  const translationFields = [
    {
      label: "Destination Group Name",
      name: "destination_group_name",
      type: "text",
    },
  ]

  const validationRules = {
    destination_group_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
      noSpace: true,      
    },
    destination_group_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      noSpace: true,
    },
  }
  const validationMessages = {
    destination_group_code: {
      required: "Destination Group Code is required.",
      number: "Code format is invalid",
    },
    destination_group_name: {
      required: "Destination Group Name is required.",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Destination Group"
    if (!formId) {
      docTitle = "Create Destination Group"
    } else if (isView) {
      docTitle = "View Destination Group"
    }

    dispatch(
      setUIParams({
        title: isView ? "Destination Group Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Destination Groups",
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
          let currentCode = res.data.destination_group_code
          let currentName = res.data.destination_group_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/destination-groups?filters=["destination_group_name","=","${element.value}"]`,
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
            "Destination Group Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/destination-groups?filters=["destination_group_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentCode === element.value) {
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
            "Destination Group Code already exists",
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
            url: `${env.API_URL}/master/destination-groups?filters=["destination_group_name","=","${element.value}"]`,
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
        "Destination Group Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/destination-groups?filters=["destination_group_code","=","${element.value}"]`,
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
        "Destination Group Code already exists",
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
      if (!form.destination_group_name) {
        form.destination_group_name = null
      }
      if (!form.destination_group_code) {
        form.destination_group_code = null
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
          message: `Record ${
            form.destination_group_name
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
          label="Destination Group Name"
          labelRequired="label-required"
          value={form.destination_group_name}
          name="destination_group_name"
          onChange={(e) =>
            setForm({ ...form, destination_group_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Destination Group Code"
          labelRequired="label-required"
          value={form.destination_group_code}
          name="destination_group_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({ ...form, destination_group_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="36"
          hint="Destination Group Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(DestinationGroupForm)
