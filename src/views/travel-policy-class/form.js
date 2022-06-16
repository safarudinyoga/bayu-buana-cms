import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { withRouter } from "react-router"
import { setAlert, setUIParams } from "redux/ui-store"
import FormInputSelectAjax from "../../components/form/input-select-ajax"
import env from "../../config/environment"

const endpoint = "/master/corporate-travel-policy-classes"
const backUrl = "/master/travel-policy-class"

function TravelPolicyClassForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [supplierTypeData, setSupplierTypeData] = useState([])
  const [id, setId] = useState(null)
  const [disabledSave, setDisabledSave] = useState(true)
  const [validCode, SetValidCode] = useState(formId)
  const [validName, SetValidName] = useState(formId)
  const [form, setForm] = useState({
    travel_policy_class_code: "",
    travel_policy_class_name: "",
    // parent_id: "",
    // manager_id: "",
  })
  const translationFields = [
    {
      label: "Name",
      name: "travel_policy_class_name",
      type: "text",
    },
  ]

  const validationRules = {
    travel_policy_class_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
      noSpace: true,
    },
    travel_policy_class_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      noSpace: true,
    },
    // parent_id: {},
    // manager_id: {},
  }

  const validationMessages = {
    travel_policy_class_code: {
      required: "Travel Policy Code is required.",
      minlength: "Travel Policy Code must be at least 1 characters",
      maxlength: "Travel Policy Code cannot be longer than 36 characters",
    },
    travel_policy_class_name: {
      required: "Travel Policy Name is required.",
      minlength: "Travel Policy Name must be at least 1 characters",
      maxlength: "Travel Policy Name cannot be longer than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()

    let docTitle = "Edit Travel Policy"
    if (!formId) {
      docTitle = "Create Travel Policy"
    } else if (isView) {
      docTitle = "Travel Policy Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employment Management",
          },
          {
            link: backUrl,
            text: "Travel Policy",
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
        if (res.data.parent) {
          setSupplierTypeData([
            { ...res.data.parent, text: res.data.parent.parent_name },
          ])
        }
        if (res.data) {
          let currentCode = res.data.travel_policy_class_code
          let currentName = res.data.travel_policy_class_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              let filters = JSON.stringify([
                "travel_policy_class_code",
                "=",
                element.value,
              ])
              $.ajax({
                type: "GET",
                async: false,
                url: `${
                  env.API_URL
                }/master/corporate-travel-policy-classes?filters=${encodeURIComponent(
                  filters,
                )}`,
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
            "Travel Policy Code already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify([
                "travel_policy_class_name",
                "=",
                element.value,
              ])
              $.ajax({
                type: "GET",
                async: false,
                url: `${
                  env.API_URL
                }/master/corporate-travel-policy-classes?filters=${encodeURIComponent(
                  filters,
                )}`,
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
            "Travel Policy Name already exists",
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
          let filters = JSON.stringify([
            "travel_policy_class_code",
            "=",
            element.value,
          ])
          $.ajax({
            type: "GET",
            async: false,
            url: `${
              env.API_URL
            }/master/corporate-travel-policy-classes?filters=${encodeURIComponent(
              filters,
            )}`,
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
        "Travel Policy Code already exists",
      )

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify([
            "travel_policy_class_name",
            "=",
            element.value,
          ])
          $.ajax({
            type: "GET",
            async: false,
            url: `${
              env.API_URL
            }/master/corporate-travel-policy-classes?filters=${encodeURIComponent(
              filters,
            )}`,
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
        "Travel Policy Name already exists",
      )
    }
  }, [])

  const checkValue = () => {
    if (
      validCode &&
      validName &&
      form.travel_policy_class_code !== "" &&
      form.travel_policy_class_name !== ""
    ) {
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
      if (!form.parent_id) {
        form.parent_id = null
      }
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }

      setLoading(false)
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record '${!formId ? "Travel Policy " : ""}${
            form.travel_policy_class_name
          }' has been successfully saved.`,
        }),
      )
    } catch (e) {
      setLoading(false)
      dispatch(
        setAlert({
          message: `Failed to save this record.`,
        }),
      )
    } finally {
    }
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      disabledSave={disabledSave}
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
          label="Name"
          required={!isView}
          value={form.travel_policy_class_name}
          name="travel_policy_class_name"
          onChange={(e) =>
            setForm({ ...form, travel_policy_class_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Code"
          required={!isView}
          value={form.travel_policy_class_code}
          name="travel_policy_class_code"
          cl={{ md: "4" }}
          cr={{ md: 8, lg: 5 }}
          onChange={(e) =>
            setForm({ ...form, travel_policy_class_code: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Travel Policy Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(TravelPolicyClassForm)
