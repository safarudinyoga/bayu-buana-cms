import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/aircraft"
const backUrl = "/master/aircraft"

function AircraftForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    aircraft_name: "",
    model: "",
    icao_code: "",
    aircraft_code: "",
  })
  const translationFields = [
    {
      label: "Aircraft Name",
      name: "aircraft_name",
      type: "text",
    },
  ]

  const validationRules = {
    aircraft_name: {
      required: true,
    },
    icao_code: {
      required: true,
    },
    aircraft_code: {
      required: true,
      min: 1,
      max: 999,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Aircraft"
    if (!formId) {
      docTitle = "Create Aircraft"
    } else if (isView) {
      docTitle = "Aircraft Details"
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
            text: "Aircraft",
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
          label="Aircraft Name *"
          value={form.aircraft_name}
          name="aircraft_name"
          onChange={(e) => setForm({ ...form, aircraft_name: e.target.value })}
          disabled={isView || loading}
          type="text"
        />
        <FormInputControl
          value={form.model}
          name="model"
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          label="Model"
          disabled={isView || loading}
          type="text"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          value={form.aircraft_code}
          name="aircraft_code"
          onChange={(e) => setForm({ ...form, aircraft_code: e.target.value })}
          hint="Aircraft Code"
          cl="4"
          cr="6"
          disabled={isView || loading}
          type="number"
          label="Aircraft Code *"
        />
        <FormInputControl
          value={form.icao_code}
          name="icao_code"
          onChange={(e) => setForm({ ...form, icao_code: e.target.value })}
          hint="ICAO Code"
          cl="4"
          cr="6"
          disabled={isView || loading}
          label="ICAO Code *"
          type="text"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AircraftForm)
