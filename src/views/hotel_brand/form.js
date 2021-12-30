import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/hotel-brands"
const backUrl = "/master/hotel-brands"

function HotelBrandForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  let formId = props.match.params.id
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    hotel_brand_code: "",
    hotel_brand_name: "",
  })
  const translationFields = [
    {
      label: "Hotel Brand Name",
      name: "hotel_brand_name",
      type: "text",
    },
  ]

  const validationRules = {
    hotel_brand_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkName: formId == null
    },
    hotel_brand_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName2: formId == null
    },
  }

  const validationMessages = {
    hotel_brand_code: {
      required: "Hotel Brand Code is required.",
      minlength: "Hotel Brand Code must be at least 1 characters",
      maxlength: "Hotel Brand Code cannot be more than 36 characters",
    },
    hotel_brand_name: {
      required: "Hotel Brand Name is required.",
      minlength: "Hotel Brand Name must be at least 1 characters",
      maxlength: "Hotel Brand Name cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Brand"
    if (!formId) {
      docTitle = "Create Hotel Brand"
    } else if (isView) {
      docTitle = "View Hotel Brand"
    }

    dispatch(
      setUIParams({
        title: isView ? "Hotel Brand Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Hotel Brands",
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
    } else {
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/hotel-brands?filters=["hotel_brand_code","=","${element.value}"]`,
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
        "checkName2",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/hotel-brands?filters=["hotel_brand_name","=","${element.value}"]`,
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
        "Hotel Brand Name already exists",
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
          message: `Record ${form.hotel_brand_code} - ${form.hotel_brand_name
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
          label="Hotel Brand Name"
          required={true}
          value={form.hotel_brand_name}
          name="hotel_brand_name"
          onChange={(e) =>
            setForm({...form, hotel_brand_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Hotel Brand Code"
          required={true}
          value={form.hotel_brand_code}
          name="hotel_brand_code"
          cl={{md: "12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, hotel_brand_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Hotel Brand Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(HotelBrandForm)
