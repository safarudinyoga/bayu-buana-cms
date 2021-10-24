import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/age-qualifying-types"
const backUrl = "/master/age-qualifying-types"

function AgeQualifyingTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    age_qualifying_type_code: 0,
    age_qualifying_type_name: "",
  })
  const translationFields = [
    {
      label: "Age Qualifying Type Name",
      name: "age_qualifying_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    age_qualifying_type_code: {
      required: true,
      min: 0,
      max: 99,
    },
    age_qualifying_type_name: {
      required: true,
      minlength: 0,
      maxlength: 256,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Age Qualifying Type"
    if (!formId) {
      docTitle = "Create Age Qualifying Type"
    } else if (isView) {
      docTitle = "Age Qualifying Type Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Age Qualifying Type",
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
          label="Age Qualifying Type Name *"
          value={form.age_qualifying_type_name}
          name="age_qualifying_type_name"
          cl="4"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, age_qualifying_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Age Qualifying Type Code *"
          value={form.age_qualifying_type_code}
          name="age_qualifying_type_code"
          cl="6"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, age_qualifying_type_code: parseInt(e.target.value) })
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Numeric value"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AgeQualifyingTypeForm)
