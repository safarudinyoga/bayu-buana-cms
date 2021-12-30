import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/product-types"
const backUrl = "/master/product-types"

function ProductTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    product_type_name: "",
    product_type_code: "",
    is_default: false,
  })
  const translationFields = [
    {
      label: "Product Type Name",
      name: "product_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    product_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      noSpace: true,
      checkName: true,
    },
    is_default: {},
    product_type_code: {
      required: true,
      number: true,
      min: 1,
      max: 99,
      noSpace: true,
      checkCode: true,
    },
  }

  const validationMessages = {
    product_type_name: {
      required: "Product Type Name is required.",
    },
    product_type_code: {
      required: "Product Type Code is required.",
      number: "Code format is invalid",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Product Type"
    if (!formId) {
      docTitle = "Create Product Type"
    } else if (isView) {
      docTitle = "Product Type Details"
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
            text: "Product Types",
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
        if (res.data) {
          let currentName = res.data.product_type_name
          let currentCode = res.data.product_type_code

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/product-types?filters=["product_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentCode === parseInt(element.value)) {
                      req = true
                    } else {
                      req = false
                    }
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
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/product-types?filters=["product_type_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentName === element.value) {
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })

              return req
            },
            "Product Type Name already exists",
          )
        }
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/product-types?filters=["product_type_code","=","${element.value}"]`,
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
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/product-types?filters=["product_type_name","=","${element.value}"]`,
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
        "Product Type Name already exists",
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
      if (!form.product_type_name) {
        form.product_type_name = null
      }
      if (!form.product_type_code) {
        form.product_type_code = null
      }
      let res = await api.putOrPost(endpoint, id, {
        ...form,
        product_type_code: parseInt(form.product_type_code),
      })
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
          message: `Record ${form.product_type_code} - ${
            form.product_type_name
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
          label="Product Type Name"
          required={true}
          value={form.product_type_name}
          name="product_type_name"
          onChange={(e) =>
            setForm({ ...form, product_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputWrapper label="Is Default" hint="Set is default">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ha-1"
              value={true}
              disabled={isView || loading}
              checked={form.is_default}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_default: true,
                })
              }
            />
            <label className="form-check-label" htmlFor="ha-1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ha-2"
              value={false}
              disabled={isView || loading}
              checked={!form.is_default}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_default: false,
                })
              }
            />
            <label className="form-check-label" htmlFor="ha-2">
              No
            </label>
          </div>
        </FormInputWrapper>
      </FormHorizontal>
      <FormHorizontal>
        <FormInputControl
          label="Product Type Code"
          required={true}
          value={form.product_type_code}
          name="product_type_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({ ...form, product_type_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(ProductTypeForm)
