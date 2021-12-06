import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import FormInputWrapper from "components/form/input-wrapper"

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
    language_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
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
      minlength: 2,
      maxlength: 2,
    },
    language_alpha_3_code: {
      required: false,
      minlength: 3,
      maxlength: 3,
    },
    language_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    language_native_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    language_asset: {
      required: true
    },
  }

  const validationMessages = {
    language_code: {
      required: "Language Code is required",
      minlength: "Language Code must be at least 3 characters",
      maxlength: "Language Code cannot be more than 3 characters",
    },
    language_name: {
      required: "Language Name is required",
      minlength: "Language Name must be at least 1 characters",
      maxlength: "Language Name cannot be more than 256 characters",
    }, 
    language_native_name: {
      required: "Language Native Name is required",
      minlength: "Language Native Name must be at least 1 characters",
      maxlength: "Language Native Name cannot be more than 256 characters",
    }, 
    language_asset: {
      required: "Language Flag Image is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Language"
    if (!formId) {
      docTitle = "Create Language"
    } else if (isView) {
      docTitle = "View Language"
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
      if (!form.language_alpha_3_code) {
        form.language_alpha_3_code = null
      }
      if (!form.language_asset) {
        form.language_asset = null
      } else {
        if (!form.language_asset.multimedia_description_id) {
          form.language_asset = null
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
          language_asset: {
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
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Language Name"
          labelRequired="label-required"
          value={form.language_name}
          name="language_name"
          onChange={(e) => setForm({...form, language_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputControl
          label="Language Native Name"
          labelRequired="label-required"
          value={form.language_native_name}
          name="language_native_name"
          onChange={(e) =>
            setForm({...form, language_native_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputControl
          label="Flag"
          type="image"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          data={form}
          style={{maxWidth: 300, marginTop: 12}}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Language Code"
          labelRequired="label-required"
          value={form.language_code}
          name="language_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, language_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="2"
          maxLength="2"
          hint="Language code maximum 2 characters"
        />
        <FormInputControl
          label="Language Alpha 3 Code"
          labelRequired="label-required"
          value={form.language_alpha_3_code}
          name="language_alpha_3_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, language_alpha_3_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Language Alpha 3 Code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(LanguageForm)
