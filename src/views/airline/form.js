import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/airlines"
const backUrl = "/master/airlines"

function AirlineForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    airline_code: "",
    numeric_code: "",
    airline_name: "",
    company_id: "",
    airline_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Airline Name",
      name: "airline_name",
      type: "text",
    },
  ]

  const validationRules = {
    airline_code: {
      required: true,
      minlength: 1,
      maxlength: 3,
      checkCode: formId == null,
    },
    numeric_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
      checkNumeric: formId == null,
    },
    airline_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: formId == null,
    },
    airline_asset: {
      required: formId == null,
    },
  }

  const validationMessages = {
    airline_name: {
      required: "Airline Name is required",
    },
    numeric_code: {
      required: "Numeric Code is required",
    },
    airline_code: {
      required: "Airline Code is required",
    },
    airline_asset: {
      required: "Airline Logo Image is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Airline"
    if (!formId) {
      docTitle = "Create Airline"
    } else if (isView) {
      docTitle = "Airline Details"
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
            text: "Airlines",
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
            url: `${env.API_URL}/master/airlines?filters=["airline_code","=","${element.value}"]`,
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
        "Airline Code already exists",
      )
      $.validator.addMethod(
        "checkNumeric",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airlines?filters=["numeric_code","=","${element.value}"]`,
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
        "Numeric Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airlines?filters=["airline_name","=","${element.value}"]`,
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
        "Airline Name already exists",
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
      if (!form.company_id) {
        form.company_id = null
      }
      if (!form.numeric_code) {
        form.numeric_code = null
      }
      if (!form.airline_asset) {
        form.airline_asset = null
      } else {
        if (!form.airline_asset.multimedia_description_id) {
          form.airline_asset = null
        }
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
          message: `Record ${form.airline_code} - ${
            form.airline_name
          } has been successfully ${formId ? "updated" : "saved"}..`,
        }),
      )
    }
  }

  const doUpload = async (e) => {
    try {
      let api = new Api()
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          airline_asset: {
            multimedia_description_id: res.data.id,
            multimedia_description: res.data,
          },
        })
      }
    } catch (e) {}
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
          label="Airline Name"
          labelRequired="label-required"
          value={form.airline_name}
          name="airline_name"
          onChange={(e) => setForm({ ...form, airline_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputSelectAjax
          label="Company Name"
          value={form.company_id}
          name="company_id"
          endpoint="/master/companies"
          column="company_name"
          onChange={(e) =>
            setForm({ ...form, company_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        >
          <option value="">None</option>
          <option value="51d5cb0c-c29e-4682-af20-4b95bc5c6ee3">
            Company 1
          </option>
          <option value="51d5cb0c-c29e-4682-af20-4b95bc5c6ee4">
            Company 2
          </option>
        </FormInputSelectAjax>
        <FormInputControl
          label="Airline Logo Image"
          type="image"
          name="airline_asset"
          onChange={doUpload}
          disabled={isView}
          url={form.airline_asset.multimedia_description.url}
          style={{ maxWidth: 300, marginTop: 12 }}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Airline Code"
          labelRequired="label-required"
          value={form.airline_code}
          name="airline_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) => setForm({ ...form, airline_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="3"
          hint="Airline code maximum 3 characters"
        />
        <FormInputControl
          label="Numeric Code"
          value={form.numeric_code}
          name="numeric_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) => setForm({ ...form, numeric_code: e.target.value })}
          disabled={isView || loading}
          type="number"
          minlength="3"
          maxLength="3"
          hint="Numeric code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AirlineForm)
