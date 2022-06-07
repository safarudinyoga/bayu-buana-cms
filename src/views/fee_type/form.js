import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/fee-tax-types"
const backUrl = "/master/fee-type"

function FeeTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [validCode, SetValidCode] = useState(formId)
  const [validName, SetValidName] = useState(formId)
  const [disabledSave, setDisabledSave] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    fee_tax_type_code: "",
    fee_tax_type_name: "",
  })
  const translationFields = [
    {
      label: "Fee Type Name",
      name: "fee_tax_type_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      maxLength: 4000,
    },
  ]

  const validationRules = {
    fee_tax_type_code: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkCode: true,
    },
    fee_tax_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
  }

  const validationMessages = {
    fee_tax_type_name: {
      required: "Fee Type Name is required",
    },
    fee_tax_type_code: {
      required: "Fee Type Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Fee Type"
    if (!formId) {
      docTitle = "Create Fee Type"
    } else if (isView) {
      docTitle = "Details Fee Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Details Fee Type" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management ",
          },
          {
            link: backUrl,
            text: "Fee Type",
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
        console.log(res.data)

        if (res.data) {
          let currentCode = res.data.fee_tax_type_code
          let currentName = res.data.fee_tax_type_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/fee-tax-types?filters=["fee_tax_type_name","=","${element.value}"]`,
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
              SetValidName(req)
              return req
            },
            "Fee Type Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/fee-tax-types?filters=["fee_tax_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentCode === element.value) {
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })
              SetValidCode(req)
              return req
            },
            "Fee Type Code already exists",
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
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/fee-tax-types?filters=["fee_tax_type_name","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })
          SetValidName(req)
          return req
        },
        "Fee Type Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/fee-tax-types?filters=["fee_tax_type_code","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })
          SetValidCode(req)
          return req
        },
        "Fee Type Code already exists",
      )
    }
  }, [])
  const checkValue = () => {
    if (validCode && validName) {
      setDisabledSave(false)
    } else {
      setDisabledSave(true)
    }
  }

  useEffect(() => {
    checkValue()
  }, [form, validCode, validName])
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
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record  ${form.fee_tax_type_name} has been successfully ${
            formId ? "updated" : "saved"
          }.`,
        }),
      )
    }
  }

  console.log("loading, ", loading)

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      disabledSave={disabledSave}
      translations={translations}
      translationFields={translationFields}
      alertMessage={"Incomplete data"}
      isValid={false}
      rules={validationRules}
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Fee Type Name"
          required={true}
          value={form.fee_tax_type_name}
          name="fee_tax_type_name"
          cl="4"
          onChange={(e) =>
            setForm({ ...form, fee_tax_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {loading ? null : (
          <FormInputControl
            label="Description"
            value={form.description}
            name="address_line"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            disabled={isView || loading}
            type="textarea"
            minLength="1"
            maxLength="4000"
          />
        )}
      </FormHorizontal>
      <FormHorizontal>
        <FormInputControl
          label="Fee Type Code"
          required={true}
          value={form.fee_tax_type_code}
          name="fee_tax_type_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({ ...form, fee_tax_type_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          // hint="Fee Type Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(FeeTypeForm)
