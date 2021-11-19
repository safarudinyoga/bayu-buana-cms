import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/attraction-categories"
const backUrl = "/master/attraction-categories"

function AttractionCategoryForm(props) {
  let dispatch = useDispatch()

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
  ]

  const validationRules = {
    attraction_category_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    is_default: {
      required: true,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Attraction Category"
    if (!formId) {
      docTitle = "Create Attraction Category"
    } else if (isView) {
      docTitle = "View Attraction Category"
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
      } catch (e) { }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
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
    } finally {
      setLoading(false)
      props.history.push(backUrl)
    }
  }
  const doUpload = async (e) => {
    try {
      let api = new Api()
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          attraction_category_asset: {
            multimedia_description_id: res.data.id,
            multimedia_description: res.data,
          },
        })
      }
    } catch (e) { }
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
    >
      <FormHorizontal>
        <FormInputControl
          label="Attraction Category Name"
          labelRequired="label-required"
          value={form.attraction_category_name}
          name="attraction_category_name"
          cl="6"
          cr="6"
          onChange={(e) =>
            setForm({...form, attraction_category_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputWrapper
          label="Is Default"
          labelRequired="label-required"
          cl="6"
          cr="6"
          hint="Set is default"
        >
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ac-1"
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
            <label className="form-check-label" htmlFor="ac-1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="ac-2"
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
            <label className="form-check-label" htmlFor="ac-2">
              No
            </label>
          </div>
        </FormInputWrapper>
        <FormInputControl
          label="Description"
          value={form.description}
          name="description"
          cl="6"
          cr="6"
          onChange={(e) => setForm({...form, description: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />
        <FormInputWrapper label="Icon" cl="6" cr="6" labelRequired="label-required">
          <label className="card card-default shadow-none border">
            <div className="card-body">
              {!isView ? (
                <i className="fas fa-edit text-muted img-edit-icon"></i>
              ) : null}
              <input
                type="file"
                onChange={doUpload}
                className="d-none"
                disabled={isView}
                accept=".png,.jpg,.jpeg"
              />
              {form.attraction_category_asset &&
                form.attraction_category_asset.multimedia_description &&
                form.attraction_category_asset.multimedia_description.url ? (
                <img
                  src={
                    form.attraction_category_asset.multimedia_description.url
                  }
                  className="img-fluid"
                  alt="attraction category"
                />
              ) : (
                ""
              )}
            </div>
          </label>
        </FormInputWrapper>
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AttractionCategoryForm)
