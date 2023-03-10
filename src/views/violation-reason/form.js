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

const endpoint = "/master/job-titles"
const backUrl = "/master/job-title"

function ViolationReasonForm(props) {
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
  const [employeeData, setEmployeeData] = useState([])
  const [form, setForm] = useState({
    job_title_code: "",
    job_title_name: "",
    parent_id: "",
    manager_id: "",
  })
  const translationFields = [
    {
      label: "Name",
      name: "job_title_name",
      type: "text",
    },
    {
      label: "Description",
      name: "job_title_name",
      type: "textarea",
    },
  ]

  const validationRules = {
    job_title_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
      noSpace: true,      
    },
    job_title_name: {
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
    job_title_code: {
      required: "Violation Reason Code is required.",
      minlength: "Violation Reason code must be at least 1 characters",
      maxlength: "Violation Reason code cannot be longer than 36 characters",
    },
    job_title_name: {
      required: "Violation Reason Name is required.",
      minlength: "Violation Reason name must be at least 1 characters",
      maxlength: "Violation Reason name cannot be longer than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()    

    let docTitle = "Edit Violation Reason"
    if (!formId) {
      docTitle = "Create Violation Reason"
    } else if (isView) {
      docTitle = "Violation Reason Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            link: backUrl,
            text: "Violation Reason",
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
          let currentCode = res.data.job_title_code
          let currentName = res.data.job_title_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["job_title_code","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/job-titles?filters=${encodeURIComponent(filters)}`,
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
            "Violation Reason Code already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["job_title_name","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/job-titles?filters=${encodeURIComponent(filters)}`,
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
            "Violation Reason Name already exists",
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
          let filters = JSON.stringify(["job_title_code","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/job-titles?filters=${encodeURIComponent(filters)}`,
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
        "Violation Reason Code already exists",
      )

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify(["job_title_name","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/job-titles?filters=${encodeURIComponent(filters)}`,
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
        "Violation Reason Name already exists",
      )
    }
  }, [])

  const checkValue = () => {
    if(validCode && validName && form.job_title_code !== "" && form.job_title_name !== "") {
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
          message: `Record '${!formId? "Job Title ": ""}${form.job_title_name
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
          value={form.job_title_name}
          name="job_title_name"
          onChange={(e) =>
            setForm({...form, job_title_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        {(formId === undefined || !loading) && (
          <FormInputSelectAjax
            label="Type"
            value={form.manager_id}
            val_id="employee_id"
            name="manager_id"
            endpoint="/master/employees"
            renderColumn={(item) => {
              return `${item.given_name || ""} ${item.middle_name || ""} ${
                item.surname || ""
              } (${item.job_title.job_title_name || ""})`
            }}
            sort="employee_number"
            filter={`["status", "=", 1]`}
            onChange={(e) =>
              setForm({ ...form, manager_id: e.target.value || null })
            }
            data={employeeData}
            disabled={isView || loading}
            type="select"
            placeholder="Please Choose"
          />
        )}

        <FormInputControl
          value={form.description}
          name="description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          label="Description"
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Code"
          required={!isView}
          value={form.job_title_code}
          name="job_title_code"
          cl={{md:"4"}}
          cr={{md:8, lg: 5}}
          onChange={(e) =>
            setForm({...form, job_title_code: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="36"
          hint="Job Title Code maximum 36 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(ViolationReasonForm)
