import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/attraction-categories"
const backUrl = "/master/attraction-categories"

function AttractionCategoryForm(props) {
  let api = new Api()
  let dispatch = useDispatch()
  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    attraction_category_name: "",
    is_default: false,
    description: "",
    attraction_category_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Attraction Category Name",
      name: "attraction_category_name",
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
    attraction_category_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      noSpace: true,
    },
    is_default: {
      required: true,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
    attraction_category_asset: {
      required: formId == null,
    },
  }

  const [validationMessages, setValidationMessages] = useState({
    attraction_category_name: {
      required: "Attraction Category Name is required.",
    },
    attraction_category_asset: {
      required: "Icon is required.",
    },
  })

  useEffect(async () => {
    let docTitle = "Edit Attraction Category"
    if (!formId) {
      docTitle = "Create Attraction Category"
    } else if (isView) {
      docTitle = "View Attraction Category"
    }

    dispatch(
      setUIParams({
        title: isView ? "Attraction Category Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Attraction Categories",
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
          let currentName = res.data.attraction_category_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/attraction-categories?filters=["attraction_category_name","=","${element.value}"]`,
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
            "Attraction Category Name already exists",
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
            url: `${env.API_URL}/master/attraction-categories?filters=["attraction_category_name","=","${element.value}"]`,
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
        "Attraction Category Name already exists",
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
    try {
      if (!form.attraction_category_name) {
        form.attraction_category_name = null
      }
      if (!form.description) {
        form.description = null
      }

      if (!form.attraction_category_asset) {
        form.attraction_category_asset = null
      } else {
        if (!form.attraction_category_asset.multimedia_description_id) {
          form.attraction_category_asset = null
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
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record ${
            form.attraction_category_name
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
          alert("Icon size is more than 4MB.");
          $("#attr_icon").val('');
          return;
        }
        
        let payload = new FormData()
        payload.append("files", e.target.files[0])

        let config = {
          onUploadProgress: function(progressEvent) {
            let mediaDiv = document.getElementById("media-attr_icon")
            let progressBar = document.getElementById("progress-attr_icon")
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
            attraction_category_asset: {
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
      id="form-attraction-category"
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
          label="Attraction Category Name"
          required={true}
          value={form.attraction_category_name}
          name="attraction_category_name"
          onChange={(e) => {
            setForm({ ...form, attraction_category_name: e.target.value })
          }}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputWrapper
          label="Is Default"
          hint="Set is default"
          required={true}
        >
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
        <FormInputControl
          label="Description"
          value={form.description}
          name="description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />
        <FormInputControl
          id="attr_icon"
          label="Icon"
          type="image"
          required={true}
          name="attraction_category_asset"
          onChange={doUpload}
          disabled={isView}
          url={form.attraction_category_asset?.multimedia_description.url}
          style={{ maxWidth: 300, marginTop: 12 }}
          notes={true}
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AttractionCategoryForm)
