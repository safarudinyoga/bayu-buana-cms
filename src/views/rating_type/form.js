import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/rating-types"
const backUrl = "/master/rating-types"

function RatingTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])

  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    provider: "",
    rating_symbol: "",
    rating_type_code: "",
    rating_type_name: "",
    scale: "",
  })
  const translationFields = [
    {
      label: "Rating Type Name",
      name: "rating_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    provider: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },

    rating_symbol: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },

    rating_type_code: {
      required: true,
      min: 0,
      max: 99,
    },

    rating_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },

    scale: {
      required: true,
      min: 1,
      max: 3,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Rating Type"
    if (!formId) {
      docTitle = "Create Rating Type"
    } else if (isView) {
      docTitle = "Rating Type Details"
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
            text: "Rating Types",
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
      if (!form.provider) {
        form.provider = null
      }
      if (!form.rating_symbol) {
        form.rating_symbol = null
      }
      if (!form.rating_type_code) {
        form.rating_type_code = null
      }
      if (!form.rating_type_name) {
        form.rating_type_name = null
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
          label="Rating Type Name"
          labelRequired="label-required"
          value={form.rating_type_name}
          name="rating_type_name"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, rating_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputControl
          label="Provider"
          value={form.provider}
          name="provider"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputControl
          label="Rating Symbol"
          labelRequired="label-required"
          value={form.rating_symbol}
          name="rating_symbol"
          cl="3"
          cr="6"
          column="name"
          onChange={(e) =>
            setForm({ ...form, rating_symbol: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        >
          <option>Please Choose</option>
          <option value="star">Star</option>
          <option value="like">Like</option>
          <option value="smiler">Smile</option>
        </FormInputControl>

        <FormInputControl
          label="Scale"
          labelRequired="label-required"
          value={form.scale}
          name="sclae"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, scale: parseInt(e.target.value) })
          }
          disabled={isView || loading}
          type="number"
          min="1"
          max="3"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Rating Type Code"
          labelRequired="label-required"
          value={form.rating_type_code}
          name="rating_type_code"
          cl="5"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, rating_type_code: parseInt(e.target.value) })
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Rating type code maximum 99 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RatingTypeForm)
