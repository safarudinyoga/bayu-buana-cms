import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/airports"
const backUrl = "/master/airports"

function AirportForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [cityData, setCityData] = useState([])
  const [form, setForm] = useState({
    airport_code: "",
    icao_code: "",
    airport_name: "",
    city_id: "",
  })
  const translationFields = [
    {
      label: "Airport Name",
      name: "airport_name",
      type: "text",
    },
  ]

  const validationRules = {
    airport_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
    },
    icao_code: {
      required: false,
      minlength: 4,
      maxlength: 4,
    },
    airport_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    city_id: {},
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Airport"
    if (!formId) {
      docTitle = "Create Airport"
    } else if (isView) {
      docTitle = "View Airport"
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
            text: "Airports",
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
        if (res.data.city) {
          setCityData([{...res.data.city, text: res.data.city.city_name}])
        }
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
          label="Airport Name"
          labelRequired="label-required"
          value={form.airport_name}
          name="airport_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({...form, airport_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputSelectAjax
          label="City"
          value={form.city_id}
          name="city_id"
          cl="3"
          cr="6"
          endpoint="/master/cities"
          column="city_name"
          data={cityData}
          onChange={(e) => setForm({...form, city_id: e.target.value || null})}
          disabled={isView || loading}
          type="select"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Airport Code"
          labelRequired="label-required"
          value={form.airport_code}
          name="airport_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({...form, airport_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Airport code maximum 3 characters"
        />
        <FormInputControl
          label="ICAO Code"
          value={form.icao_code}
          name="icao_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({...form, icao_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="4"
          maxLength="4"
          hint="ICAO Code maximum 4 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AirportForm)
