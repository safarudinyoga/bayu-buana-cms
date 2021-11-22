import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"
import FormInputSelectAjax from "../../components/form/input-select-ajax"
import env from "../../config/environment"

const endpoint = "/master/hotel-suppliers"
const backUrl = "/master/hotel-suppliers"

function HotelSupplierForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    hotel_supplier_code: "",
    hotel_supplier_name: "",
    supplier_type_id: "",
  })
  const translationFields = [
    {
      label: "Hotel Supplier Name",
      name: "hotel_supplier_name",
      type: "text",
    },
  ]

  const validationRules = {
    hotel_supplier_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkName: formId == null
    },
    hotel_supplier_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName2: formId == null
    },
    supplier_type_id: {},
  }

  const validationMessages = {
    hotel_supplier_code: {
      required: "Hotel Supplier Code is required.",
      minlength: "Hotel supplier code must be at least 1 characters",
      maxlength: "Hotel supplier code cannot be longer than 36 characters",
    },
    hotel_supplier_name: {
      required: "Hotel Supplier Name is required.",
      minlength: "Hotel supplier name must be at least 1 characters",
      maxlength: "Hotel supplier name cannot be longer than 256 characters",
    },
    supplier_type_id: {},
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Supplier"
    if (!formId) {
      docTitle = "Create Hotel Supplier"
    } else if (isView) {
      docTitle = "View Hotel Supplier"
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
            text: "Hotel Suppliers",
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
            url: `${env.API_URL}/master/hotel-suppliers?filters=["hotel_supplier_code","=","${element.value}"]`,
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
            url: `${env.API_URL}/master/hotel-suppliers?filters=["hotel_supplier_name","=","${element.value}"]`,
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
        "Hotel Supplier Name already exists",
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
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Hotel Supplier Name"
          labelRequired="label-required"
          value={form.hotel_supplier_name}
          name="hotel_supplier_name"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({...form, hotel_supplier_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputSelectAjax
          label="Supplier Type"
          value={form.supplier_type_id}
          name="supplier_type_id"
          cl="3"
          cr="6"
          endpoint="/master/supplier-types"
          column="supplier_type_name"
          onChange={(e) =>
            setForm({...form, supplier_type_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Hotel Supplier Code"
          labelRequired="label-required"
          value={form.hotel_supplier_code}
          name="hotel_supplier_code"
          cl="6"
          cr="6"
          onChange={(e) =>
            setForm({...form, hotel_supplier_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="26"
          hint="Hotel Supplier Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(HotelSupplierForm)
