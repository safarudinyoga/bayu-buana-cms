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

const endpoint = "/master/cities"
const backUrl = "/master/cities"

function CityForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [initialCountry, setInitialCountry] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    city_code: "",
    city_name: "",
    country_id: ""
  })
  const translationFields = [
    {
      label: "City Name",
      name: "city_name",
      type: "text",
    },
  ]

  const validationRules = {
    city_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
    },
    city_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    country_id: {
      required: true
    }
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit City"
    if (!formId) {
      docTitle = "Create City"
    } else if (isView) {
      docTitle = "City Details"
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
            text: "Cities",
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
        if (res.data.country) {
            setInitialCountry([{...res.data.country, text: res.data.country.country_name}])
        }
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
          label="City Name *"
          value={form.city_name}
          name="city_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, city_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputSelectAjax
          label="Country"
          value={form.country_id}
          name="country_id"
          cl="3"
          cr="6"
          endpoint="/master/countries"
          column="country_name"
          data={initialCountry}
          onChange={(e) =>
            setForm({ ...form, country_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
        />
        
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="City Code *"
          value={form.city_code}
          name="city_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, city_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="City code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(CityForm)
