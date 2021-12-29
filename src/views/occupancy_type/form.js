import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/occupancy-types"
const backUrl = "/master/occupancy-types"

function OccupancyTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    occupancy_type_name: "",
    occupancy_type_code: "",
    is_default: false,
    occupancy: "",
  })
  const translationFields = [
    {
      label: "Occupancy Type Name",
      name: "occupancy_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    occupancy_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      noSpace: true,
    },
    is_default: {},
    occupancy: {
      required: true,
      number: true,
      min: 1,
      max: 4,
      noSpace: true,
    },
    occupancy_type_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
      noSpace: true,
    },
  }

  const validationMessages = {
    occupancy_type_code: {
      required: "Occupancy Type Code is required.",
    },
    occupancy_type_name: {
      required: "Occupancy Type Name is required.",
    },
    occupancy: {
      required: "Occupancy is required.",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Occupancy Type"
    if (!formId) {
      docTitle = "Create Occupancy Type"
    } else if (isView) {
      docTitle = "View Occupancy Type"
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
            text: "Occupancy Types",
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
          let currentName = res.data.occupancy_type_name
          let currentCode = res.data.occupancy_type_code

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/occupancy-types?filters=["occupancy_type_code","=","${element.value}"]`,
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
            "Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/occupancy-types?filters=["occupancy_type_name","=","${element.value}"]`,
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
            "Occupancy Type Name already exists",
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
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/occupancy-types?filters=["occupancy_type_code","=","${element.value}"]`,
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
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/occupancy-types?filters=["occupancy_type_name","=","${element.value}"]`,
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
        "Occupancy Type Name already exists",
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
      if (!form.occupancy_type_name) {
        form.occupancy_type_name = null
      }
      if (!form.occupancy_type_code) {
        form.occupancy_type_code = null
      }
      if (!form.occupancy) {
        form.occupancy = null
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
          message: `Record ${form.occupancy_type_code} - ${
            form.occupancy_type_name
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
          label="Occupancy Type Name"
          required={true}
          value={form.occupancy_type_name}
          name="occupancy_type_name"
          onChange={(e) =>
            setForm({ ...form, occupancy_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputWrapper label="Is Default" hint="Set is default">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ha-1"
              value={true}
              disabled={isView || loading}
              checked={form.is_default}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_default: true,
                })
              }
            />
            <label className="form-check-label" htmlFor="ha-1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ha-2"
              value={false}
              disabled={isView || loading}
              checked={!form.is_default}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_default: false,
                })
              }
            />
            <label className="form-check-label" htmlFor="ha-2">
              No
            </label>
          </div>
        </FormInputWrapper>
        <FormInputControl
          label="Occupancy"
          required={true}
          value={form.occupancy}
          name="occupancy"
          onChange={(e) => setForm({ ...form, occupancy: +e.target.value })}
          disabled={isView || loading}
          type="number"
          min="1"
          max="4"
          hint="Occupation maximum 4 characters"
        />
      </FormHorizontal>
      <FormHorizontal>
        <FormInputControl
          label="Occupancy Type Code"
          required={true}
          value={form.occupancy_type_code}
          name="occupancy_type_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({ ...form, occupancy_type_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Rating type code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(OccupancyTypeForm)
