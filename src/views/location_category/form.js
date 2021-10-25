import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/location-categories"
const backUrl = "/master/location-categories"

function LocationCategoryForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    location_category_code: 0,
    location_category_name: "",
  })
  const translationFields = [
    {
      label: "Location Category Name",
      name: "location_category_name",
      type: "text",
    },
  ]

  const validationRules = {
    location_category_code: {
      required: true,
      min: 0,
      max: 99,
    },
    location_category_name: {
      required: true,
      minlength: 0,
      maxlength: 256,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Location Category"
    if (!formId) {
      docTitle = "Create Location Category"
    } else if (isView) {
      docTitle = "Location Category Details"
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
            text: "Location Category",
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
          label="Location Category Name *"
          value={form.location_category_name}
          name="location_category_name"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, location_category_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Location Category Code *"
          value={form.location_category_code}
          name="location_category_code"
          cl="6"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, location_category_code: parseInt(e.target.value) })
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Location Category Code is numeric"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(LocationCategoryForm)
