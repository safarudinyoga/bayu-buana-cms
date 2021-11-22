import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"

const endpoint = "/master/hotel-amenity-categories"
const backUrl = "/master/hotel-amenity-categories"

function HotelAmenityCategoryForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    hotel_amenity_category_name: "",
    is_default: false,
    description: "",
    hotel_amenity_category_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Hotel Amenity Category Name",
      name: "hotel_amenity_category_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ]

  const validationRules = {
    hotel_amenity_category_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    is_default: {
      required: true,
    },
    description: {
      minlength: 1,
      maxlength: 4000,
    },
    hotel_amenity_category_asset:{
      multimedia_description:{
        url:{
          required:true
        }
      }
    }
  }
  const validationMessages = {
    hotel_amenity_category_name: {
      required: "Hotel Amenity Category Name is required.",
    },
    is_default: {
      required: "Is Default is required.",
    },
    hotel_amenity_category_asset:{
      multimedia_description:{
        url:{
          required:"Hotel Amenity Category Icon Image is required."
        }
      }
    }
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Amenity Category"
    if (!formId) {
      docTitle = "Create Hotel Amenity Category"
    } else if (isView) {
      docTitle = "View Hotel Amenity Category"
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
            text: "Hotel Amenity Categories",
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
      if (!form.hotel_amenity_category_name) {
        form.hotel_amenity_category_name = null
      }
      if (!form.description) {
        form.description = null
      }

      if (!form.hotel_amenity_category_asset) {
        form.hotel_amenity_category_asset = null
      } else {
        if (!form.hotel_amenity_category_asset.multimedia_description_id) {
          form.hotel_amenity_category_asset = null
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
            message: `Record ${
                form.hotel_amenity_category_name
            } has been successfully ${formId ? "updated" : "saved"}.`,
          }),
      )
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
          hotel_amenity_category_asset: {
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
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Hotel Amenity Category Name"
          labelRequired="label-required"
          value={form.hotel_amenity_category_name}
          name="hotel_amenity_category_name"
          cl="7"
          cr="5"
          onChange={(e) =>
            setForm({...form, hotel_amenity_category_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />

        <FormInputWrapper
          label="Is Default"
          cl="7"
          cr="5"
          hint="Set is default"
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
          cl="7"
          cr="5"
          onChange={(e) => setForm({...form, description: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />
        <FormInputWrapper label="Hotel Amenity Category Icon Image" cl="7" cr="5">
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
              {form.hotel_amenity_category_asset &&
                form.hotel_amenity_category_asset.multimedia_description &&
                form.hotel_amenity_category_asset.multimedia_description.url ? (
                <img
                  src={
                    form.hotel_amenity_category_asset.multimedia_description.url
                  }
                  className="img-fluid"
                  alt="hotel amenity category"
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

export default withRouter(HotelAmenityCategoryForm)
