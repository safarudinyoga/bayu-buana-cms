import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import FormInputWrapper from "components/form/input-wrapper"

const endpoint = "/master/airlines"
const backUrl = "/master/airlines"

function AirlineForm(props) {
  let dispatch = useDispatch()

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
      minlength: 2,
      maxlength: 2,
    },
    numeric_code: {
      required: false,
      minlength: 3,
      maxlength: 3,
    },
    airline_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Airline"
    if (!formId) {
      docTitle = "Create Airline"
    } else if (isView) {
      docTitle = "View Airline"
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
      } catch (e) { }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
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
    } finally {
      setLoading(false)
      props.history.push(backUrl)
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
    >
      <FormHorizontal>
        <FormInputControl
          label="Airline Name"
          labelRequired="label-required"
          value={form.airline_name}
          name="airline_name"          
          onChange={(e) => setForm({...form, airline_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputSelectAjax
          label="Company Name"
          value={form.company_id}
          name="company_id"          
          endpoint="/master/companies"
          column="company_name"
          onChange={(e) =>
            setForm({...form, company_id: e.target.value || null})
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
        <FormInputWrapper label="Airline Logo">
          <label className="card card-default shadow-none border">
            <div className="card-body">
              {!isView ? (
                <i className="fas fa-edit text-muted img-edit-icon"></i>
              ) : null}
              <input
                type="file"
                onChange={doUpload}
                className="d-none"
                disabled={isView}
                accept=".png,.jpg,.jpeg"
              />
              {form.airline_asset &&
                form.airline_asset.multimedia_description &&
                form.airline_asset.multimedia_description.url ? (
                <img
                  src={form.airline_asset.multimedia_description.url}
                  className="img-fluid"
                  alt="airline"
                />
              ) : (
                ""
              )}
            </div>
          </label>
        </FormInputWrapper>
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Airline Code"
          labelRequired="label-required"
          value={form.airline_code}
          name="airline_code"
          cl="12"
          cr="12"
          onChange={(e) => setForm({...form, airline_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="2"
          maxLength="2"
          hint="Airline code maximum 2 characters"
        />
        <FormInputControl
          label="Numeric Code"
          value={form.numeric_code}
          name="numeric_code"
          cl="12"
          cr="12"
          onChange={(e) => setForm({...form, numeric_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Numeric code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AirlineForm)
