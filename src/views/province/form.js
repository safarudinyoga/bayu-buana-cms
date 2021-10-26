import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/state-provinces"
const backUrl = "/master/provinces"

function ProvinceForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    country_id: "",
    state_province_category_id: "",
    state_province_code: "",
    state_province_name: ""
  })
  const translationFields = [
    {
      label: "State / Province Name",
      name: "state_province_name",
      type: "text",
    },
  ]

  const validationRules = {
    state_province_code: {
      required: true,
      minlength: 1,
      maxlength: 8,
    },
    state_province_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    }
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit State / Province"
    if (!formId) {
      docTitle = "Create State / Province"
    } else if (isView) {
      docTitle = "State / Province Details"
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
            text: "States / Provinces",
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
    } finally {
      setLoading(false)
      props.history.push(backUrl)
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
    >
      <FormHorizontal>
        <FormInputControl
          label="State / Province Name *"
          value={form.state_province_name}
          name="state_province_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, state_province_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputSelectAjax
          label="Subdivision Category"
          value={form.state_province_category_id}
          name="state_province_category_id"
          cl="3"
          cr="6"
          endpoint="/master/state-province-categories"
          column="state_province_category_name"
          onChange={(e) =>
            setForm({ ...form, state_province_category_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        >
          <option value="">None</option>
          <option value="51d5cb0c-c29e-4682-af20-4b95bc5c6ee3">
          Subdivision Category 1
          </option>
          <option value="51d5cb0c-c29e-4682-af20-4b95bc5c6ee4">
          Subdivision Category 2
          </option>
        </FormInputSelectAjax>
        <FormInputSelectAjax
          label="Country"
          value={form.country_id}
          name="country_id"
          cl="3"
          cr="6"
          endpoint="/master/countries"
          column="country_name"
          onChange={(e) =>
            setForm({ ...form, country_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="State / Province Code *"
          value={form.state_province_code}
          name="state_province_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, state_province_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="8"
          hint="State / Province code maximum 2 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(ProvinceForm)
