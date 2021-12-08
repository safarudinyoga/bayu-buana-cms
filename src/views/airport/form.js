import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/airports"
const backUrl = "/master/airports"

function AirportForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

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
      checkCode: formId == null,
    },
    icao_code: {
      required: false,
      minlength: 4,
      maxlength: 4,
      checkIcao: formId == null,
    },
    airport_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: formId == null,
    },
    city_id: {},
  }

  const validationMessages = {
    airport_code: {
      required: "Airport Code is required",
      minlength: "Airport Code must be at least 3 characters",
      maxlength: "Airport Code cannot be more than 3 characters",
    },
    airport_name: {
      required: "Airport Name is required",
      minlength: "Airport Name must be at least 1 characters",
      maxlength: "Airport Name cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Airport"
    let breadcrumbTitle = "Edit Airport"
    if (!formId) {
      docTitle = "Create Airport"
      breadcrumbTitle = "Create Airport"
    } else if (isView) {
      docTitle = "Airport Details"
      breadcrumbTitle = "View Airport"
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
            text: breadcrumbTitle,
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
    } else {
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airports?filters=["airport_code","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Code already exists",
      )
      $.validator.addMethod(
        "checkIcao",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airports?filters=["icao_code","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "ICAO Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airports?filters=["airport_name","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Airport Name already exists",
      )
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
      dispatch(
        setAlert({
          message: `Failed to ${formId ? "update" : "save"} this record.`,
        }),
      )
    } finally {
      setLoading(false)
      props.history.push(backUrl)
      dispatch(
        setAlert({
          message: `Record ${form.airport_code} - ${
            form.airport_name
          } has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
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
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Airport Name"
          labelRequired="label-required"
          value={form.airport_name}
          name="airport_name"          
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
          cl={{md:"12"}}
          cr="12"
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
          cl={{md:"12"}}
          cr="12"
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
