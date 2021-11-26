import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/passenger-types"
const backUrl = "/master/passenger-types"

function PassengerTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    passenger_type_code: "",
    passenger_alpha_3_code: "",
    passenger_type_name: "",
  })
  const translationFields = [
    {
      label: "Passenger Type Name",
      name: "passenger_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    passenger_type_code: {
      required: true,
      min: 0,
      max: 99,
    },
    passenger_alpha_3_code: {
      minlength: 3,
      maxlength: 3,
    },
    passenger_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Passenger Type"
    if (!formId) {
      docTitle = "Create Passenger Type"
    } else if (isView) {
      docTitle = "View Passenger Type"
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
            text: "Passenger Types",
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
      if (!form.passenger_alpha_3_code) {
        form.passenger_alpha_3_code = null
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
          label="Passenger Type Name"
          value={form.passenger_type_name}
          name="passenger_type_name"
          onChange={(e) =>
            setForm({...form, passenger_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Passenger Type Code"
          labelRequired="label-required"
          value={form.passenger_type_code}
          name="passenger_type_code"
          cl="12"
          cr='12'
          onChange={(e) =>
            setForm({...form, passenger_type_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Passenger Type Code is numeric"
        />
        <FormInputControl
          label="Passenger Alpha 3 Code"
          value={form.passenger_alpha_3_code}
          name="passenger_alpha_3_code"
          cl="12"
          cr="12"
          onChange={(e) =>
            setForm({...form, passenger_alpha_3_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Passanger Alpha 3 Code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(PassengerTypeForm)
