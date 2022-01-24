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
import FormInputSelectAjax from "../../components/form/input-select-ajax"
import env from "../../config/environment"

const endpoint = "/master/division"
const backUrl = "/master/division"

function DivisionForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [supplierTypeData, setSupplierTypeData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    division_code: "",
    division_name: "",
    parent_id: "",
    manager_id: "",
  })
  const translationFields = [
    {
      label: "Name",
      name: "division_name",
      type: "text",
    },
  ]

  const validationRules = {
    division_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
      noSpace: true,      
    },
    division_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      noSpace: true,
    },
    parent_id: {},
    manager_id: {},
  }

  const validationMessages = {
    division_code: {
      required: "Division Code is required.",
      minlength: "Division code must be at least 1 characters",
      maxlength: "Division code cannot be longer than 36 characters",
    },
    division_name: {
      required: "Division Name is required.",
      minlength: "Division name must be at least 1 characters",
      maxlength: "Division name cannot be longer than 256 characters",
    },
    parent_id: {},
  }

  useEffect(async () => {
    let api = new Api()    

    let docTitle = "Edit Division"
    if (!formId) {
      docTitle = "Create Division"
    } else if (isView) {
      docTitle = "Division Details"
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
            text: "Division",
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
        setForm(res.data);
        if (res.data.parent) {
          setSupplierTypeData([{...res.data.parent, text: res.data.parent.parent_name}])
        }
        if (res.data) {
          let currentCode = res.data.division_code
          let currentName = res.data.division_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/division?filters=["division_code","=","${element.value}"]`,
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
                url: `${env.API_URL}/master/division?filters=["division_name","=","${element.value}"]`,
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
            "Division Name already exists",
          )
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
            url: `${env.API_URL}/master/division?filters=["division_code","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          console.log(req)
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
            url: `${env.API_URL}/master/division?filters=["division_name","=","${element.value}"]`,
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
        "Division Name already exists",
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
          message: `Record ${form.division_code} - ${form.division_name
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
          label="Name"
          required={true}
          value={form.division_name}
          name="division_name"
          onChange={(e) =>
            setForm({...form, division_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        {(formId === undefined || !loading) && <FormInputSelectAjax
          label="Parent Division"
          value={form.parent_id}
          name="parent_id"
          endpoint="/master/parent-division"
          column="parent_name"
          filter={`["status", "=", 1]`}
          onChange={(e) =>
            setForm({...form, parent_id: e.target.value || null})
          }
          data={supplierTypeData}
          disabled={isView || loading}
          type="select"
        />}

        {(formId === undefined || !loading) && <FormInputSelectAjax
          label="Manager"
          value={form.parent_id}
          name="parent_id"
          endpoint="/master/manager"
          column="manager_name"
          filter={`["status", "=", 1]`}
          onChange={(e) =>
            setForm({...form, parent_id: e.target.value || null})
          }
          data={supplierTypeData}
          disabled={isView || loading}
          type="select"
        />}
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Code"
          required={true}
          value={form.division_code}
          name="division_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, division_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Division Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(DivisionForm)