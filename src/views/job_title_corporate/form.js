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
// import FormInputSelectAjax from "../../components/form/input-select-ajax"
import env from "../../config/environment"

const endpoint = "/master/corporate-job-title"
const backUrl = "/master/corporate-job-title"

function JobTitleCorporateForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [supplierTypeData, setSupplierTypeData] = useState([])
  const [disabledSave, setDisabledSave] = useState(false)
  const [validCode, SetValidCode] = useState(formId)
  const [validName, SetValidName] = useState(formId)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    corporate_job_title_code: "",
    corporate_job_title_name: "",
    parent_id: "",
    manager_id: "",
  })
  const translationFields = [
    {
      label: "Name",
      name: "corporate_job_title_name",
      type: "text",
    },
  ]

  const validationRules = {
    corporate_job_title_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
      noSpace: true,      
    },
    corporate_corporate_job_title_name: {
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
    corporate_job_title_code: {
      required: "Job Title Code is required.",
      minlength: "Job Title code must be at least 1 characters",
      maxlength: "Job Title code cannot be longer than 36 characters",
    },
    corporate_job_title_name: {
      required: "Job Title Name is required.",
      minlength: "Job Title name must be at least 1 characters",
      maxlength: "Job Title name cannot be longer than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()    

    let docTitle = "Edit Job Title"
    if (!formId) {
      docTitle = "Create Job Title"
    } else if (isView) {
      docTitle = "Job Title Details"
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
            text: "Job Title",
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
          let currentCode = res.data.corporate_job_title_code
          let currentName = res.data.corporate_job_title_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["corporate_job_title_code","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-job-titles?filters=${encodeURIComponent(filters)}`,
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
            "Job Title Code already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["corporate_job_title_name","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-job-titles?filters=${encodeURIComponent(filters)}`,
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
            "Job Title Name already exists",
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
          let filters = JSON.stringify(["corporate_job_title_code","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/corporate-job-titles?filters=${encodeURIComponent(filters)}`,
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
        "Job Title Code already exists",
      )

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify(["corporate_job_title_name","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/corporate-job-titles?filters=${encodeURIComponent(filters)}`,
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
        "Job Title Name already exists",
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
      disabledSave={disabledSave}
      back={backUrl}
      translations={translations}
      translationFields={translationFields}
      alertMessage={"Incomplete data"}
      isValid={true}
      rules={validationRules}
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Name"
          required={!isView}
          value={form.corporate_job_title_name}
          name="corporate_job_title_name"
          onChange={(e) =>
            setForm({...form, corporate_job_title_name: e.target.value})
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
          value={form.corporate_job_title_code}
          name="corporate_job_title_code"
          cl={{md:"4"}}
          cr={{md:8, lg: 5}}
          onChange={(e) =>
            setForm({...form, corporate_job_title_code: e.target.value})
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

export default withRouter(JobTitleCorporateForm)
