import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/airlines"
const backUrl = "/master/airlines"

function AirlineForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [companyData, setCompanyData] = useState([])
  const [form, setForm] = useState({
    airline_code: "",
    numeric_code: "",
    airline_name: "",
    company_id: "",
    airline_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Airline Name",
      name: "airline_name",
      type: "text",
      maxLength: 64
    },
  ]

  const validationRules = {
    airline_code: {
      required: true,
      minlength: 1,
      maxlength: 2,
      checkCode: true,
    },
    numeric_code: {
      required: false,
      minlength: 3,
      maxlength: 3,      
    },
    airline_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
      checkName: true,
    },
    company_id:{
      required: false,
    },
    airline_asset: {
      required: formId == null,
    },
  }

  const validationMessages = {
    airline_name: {
      required: "Airline Name is required",
      minlength: "Airline Name must be at least 1 characters",
      maxlength: "Airline Name cannot be more than 64 characters",
    },
    numeric_code: {      
      minlength: "Numeric Code must be at least 3 characters",
      maxlength: "Numeric Code cannot be more than 3 characters",
    },
    airline_code: {
      required: "Airline Code is required",
      minlength: "Airline Code must be at least 1 characters",
      maxlength: "Airline Code cannot be more than 2 characters",
    },
    airline_asset: {
      required: "Airline Logo Image is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Airline"
    if (!formId) {
      docTitle = "Create Airline"
    } else if (isView) {
      docTitle = "Airline Details"
    }

    dispatch(
      setUIParams({
        title: isView ? "Airline Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Airlines",
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
          let currentCode = res.data.airline_code
          let currentNumeric = res.data.numeric_code
          let currentName = res.data.airline_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/airlines?filters=["airline_code","=","${element.value}"]`,
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
            "Airline Code already exists",
          )
          $.validator.addMethod(
            "checkNumeric",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/airlines?filters=["numeric_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentNumeric === element.value) {
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
            "Numeric Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/airlines?filters=["airline_name","=","${element.value}"]`,
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
            "Airline Name already exists",
          )

          if (res.data.company) {
            setCompanyData([{...res.data.company, text: res.data.company.company_name}])
          }
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
            url: `${env.API_URL}/master/airlines?filters=["airline_code","=","${element.value}"]`,
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
        "Airline Code already exists",
      )
      $.validator.addMethod(
        "checkNumeric",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airlines?filters=["numeric_code","=","${element.value}"]`,
            success: function (res) {
              if(!element.value){
                req = true
              } else {
                if (res.items.length !== 0) {
                  req = true
                } else {
                  req = false
                }
              } 
            },
          })

          return req
        },
        "Numeric Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/airlines?filters=["airline_name","=","${element.value}"]`,
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
        "Airline Name already exists",
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
      if (!form.company_id) {
        form.company_id = null
      }
      if (!form.numeric_code) {
        form.numeric_code = null || ""
      }
      
      if (!form.airline_asset) {
        form.airline_asset = null
      } else {
        if (!form.airline_asset.multimedia_description_id) {
          form.airline_asset = null
        }
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
          message: `Record ${form.airline_code} - ${
            form.airline_name
          } has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
  }

  const doUpload = async (e) => {
    try {
      var files = e.target.files[0];
      if(files){
        var filesize = ((files.size/1024)/1024).toFixed(4);
        if(filesize > 4){
          alert("Airline Logo Image size is more than 4MB.");
          $("#airline_icon").val('');
          return;
        }
        let api = new Api()
        let payload = new FormData()
        payload.append("files", e.target.files[0])

        let config = {
          onUploadProgress: function(progressEvent) {
            let mediaDiv = document.getElementById("media-airline_icon")
            let progressBar = document.getElementById("progress-airline_icon")
            mediaDiv.style.display = "none"
            progressBar.style.display = "block"
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            progressBar.value = percentCompleted;
            if(progressBar.value == 100){
              setTimeout(() => {
                progressBar.style.display = "none"
                mediaDiv.style.display = "block"
              }, 1000)
            }
          }
        }

        let res = await api.post("/multimedia/files", payload, config)
        if (res.data) {
          setForm({
            ...form,
            airline_asset: {
              multimedia_description_id: res.data.id,
              multimedia_description: res.data,
            },
          })
        }
      }
    } catch (e) {}
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
          label="Airline Name"
          labelRequired="label-required"
          value={form.airline_name}
          name="airline_name"
          onChange={(e) => setForm({ ...form, airline_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        {
          !loading && 
          <FormInputSelectAjax
          label="Company Name"
          value={form.company_id}
          name="company_id"
          endpoint="/master/companies"
          column="company_name"
          
          data={companyData}
          onChange={(e) =>
            setForm({ ...form, company_id: e.target.value || null })
          }
          disabled={isView || loading}
          type="select"
        />
        }

        <FormInputControl
          id="airline_icon"
          label="Airline Logo Image"
          labelRequired="label-required"
          type="image"
          name="airline_asset"
          onChange={doUpload}
          disabled={isView}
          url={form.airline_asset.multimedia_description.url}
          style={{ maxWidth: 300, marginTop: 12 }}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Airline Code"
          labelRequired="label-required"
          value={form.airline_code}
          name="airline_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) => setForm({ ...form, airline_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="2"
          hint="Airline code maximum 2 characters"
        />
        <FormInputControl
          label="Numeric Code"
          value={form.numeric_code}
          name="numeric_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) => setForm({ ...form, numeric_code: e.target.value })}
          disabled={isView || loading}
          type="number"
          minLength="3"
          maxLength="3"
          hint="Numeric code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AirlineForm)
