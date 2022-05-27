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

const endpoint = "/master/divisions"
const backUrl = "/master/divisions"

function JobTitleCorporateForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [parentDivisionTypeData, setParentDivisionTypeData] = useState([])
  const [employeeData, setEmployeeData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    depth:0,
    division_code: "",
    division_name: "",
    parent_division_id: "",
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
    parent_division_id: {},
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
    parent_division_id: {},
  }

  useEffect(async () => {
    let api = new Api()    

    let docTitle = "Edit Division"
    let bcTitle = docTitle
    if (!formId) {
      docTitle = "Create New Division"
      bcTitle = "Create Division"
    } else if (isView) {
      docTitle = "Division"
      bcTitle = "Division Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Setup & Configuration",
          },
          {
            link: backUrl,
            text: "Division",
          },
          {
            text: bcTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data);
        if (res.data.parent_division && res.data.parent_division_id) {
          setParentDivisionTypeData([{...res.data.parent_division, id: res.data.parent_division_id, text: res.data.parent_division.division_name}])
        }
        if (res.data.manager) {
          setEmployeeData([{...res.data.manager, text: res.data.manager.given_name}])
        }
        if (res.data) {
          let currentCode = res.data.division_code
          let currentName = res.data.division_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              let encodeFilters = encodeURIComponent(JSON.stringify(["division_code","=",element.value]))
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/divisions?filters=${encodeFilters}`,
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
            "Division Code already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let encodeFilters = encodeURIComponent(JSON.stringify(["division_name","=",element.value]))
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/divisions?filters=${encodeFilters}`,
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
          let encodeFilters = encodeURIComponent(JSON.stringify(["division_code","=",element.value]))
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/divisions?filters=${encodeFilters}`,
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
        "Division Code already exists",
      )

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let encodeFilters = encodeURIComponent(JSON.stringify(["division_name","=",element.value]))
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/divisions?filters=${encodeFilters}`,
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
      if (!form.parent_division_id) {
        form.parent_division_id = formId ? "00000000-0000-0000-0000-000000000000" : null
        delete form.parent_division
      } else {
        form.depth = parseInt(form.depth) + 1
      }
      if (!form.manager_id) {
        form.manager_id = formId ? "00000000-0000-0000-0000-000000000000" : null
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
          message: `Record ${form.division_name} has been successfully saved.`,
        }),
      )
    } catch (e) {
      setLoading(false)
      dispatch(
        setAlert({
          message: `Failed to save this record.`,
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
          label={isView ? "Division Name" : "Name"}
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
          value={form.parent_division_id}
          name="parent_division_id"
          endpoint="/master/divisions"
          column="division_name"
          filter={formId ? `[["id","!=","${formId}"],["and"],[["parent_division_id","!=","${formId}"],["or"],["parent_division_id","is",null]]]` : ``}
          onChange={(e) =>
            setForm({...form, parent_division_id: e.target.value || null})
          }
          data={parentDivisionTypeData}
          disabled={isView || loading}
          type="select"
          placeholder="Select Parent Division"
        />}

        {(formId === undefined || !loading) && <FormInputSelectAjax
          label="Manager"
          value={form.manager_id}
          val_id="employee_id"
          name="manager_id"
          endpoint="/master/employees"
          renderColumn= {(item) => {
            return `${item.given_name || ''} ${item.middle_name || ''} ${item.surname || ''} (${item.job_title.job_title_name || ''})`
          }}
          sort="employee_number"
          filter={`["status", "=", 1]`}
          onChange={(e) =>
            setForm({...form, manager_id: e.target.value || null})
          }
          data={employeeData}
          disabled={isView || loading}
          type="select"
          placeholder="Select Manager"
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

export default withRouter(JobTitleCorporateForm)
