import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/languages"
const backUrl = "/master/languages"

function LanguageForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    language_code: "",
    language_alpha_3_code: "",
    language_name: "",
    language_native_name: "",
  })
  const translationFields = [
    {
      label: "Language Name",
      name: "language_name",
      type: "text",
    },
    {
      label: "Language Native Name",
      name: "language_native_name",
      type: "text",
    },
  ]

  const validationRules = {
    language_code: {
      required: true,
      minlength: 0,
      maxlength: 2,
    },
    language_alpha_3_code: {
      required: false,
      minlength: 0,
      maxlength: 3,
    },
    language_name: {
      required: true,
      minlength: 0,
      maxlength: 256,
    },
    language_native_name: {
      required: true,
      minlength: 0,
      maxlength: 256,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Language"
    if (!formId) {
      docTitle = "Create Language"
    } else if (isView) {
      docTitle = "Language Details"
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
            text: "Language",
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
          label="Language Name *"
          value={form.language_name}
          name="language_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, language_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="256"
        />
        <FormInputControl
          label="Language Native Name *"
          value={form.language_native_name}
          name="language_native_name"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, language_native_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Language Code *"
          value={form.language_code}
          name="language_code"
          cl="6"
          cr="6"
          onChange={(e) => setForm({ ...form, language_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="2"
          hint="Language code maximum 2 characters"
        />
        <FormInputControl
          label="Language Alpha 3 Code"
          value={form.language_alpha_3_code}
          name="language_alpha_3_code"
          cl="6"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, language_alpha_3_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="3"
          hint="Language Alpha 3 Code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(LanguageForm)
