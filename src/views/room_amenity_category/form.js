import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputWrapper from "components/form/input-wrapper"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/room-amenity-categories"
const backUrl = "/master/room-amenity-categories"

function RoomAmenityTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    room_amenity_category_code: "",
    is_default: false,
    description: "",
    room_amenity_category_name: "",
    room_amenity_category_id: "",
    room_amenity_category_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Room Amenity Category Name",
      name: "room_amenity_category_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ]

  const validationRules = {
    room_amenity_category_code: {
      required: true,
      minlength: 2,
      maxlength: 2,
    },
    room_amenity_category_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 200,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Room Amenity Category"
    if (!formId) {
      docTitle = "Create Room Amenity Category"
    } else if (isView) {
      docTitle = "Room Amenity Category Details"
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
            text: "Room Amenity Category",
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
      if (form.room_amenity_category_asset.multimedia_description_id == null) {
        form.room_amenity_category_asset = null
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
          room_amenity_category_asset: {
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
          label="Room Amenity Type Name"
          labelRequired="label-required"
          value={form.room_amenity_category_name}
          name="room_amenity_category_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({...form, room_amenity_category_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputWrapper label="Is Default" cl="3" cr="6" hint="Set is default">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="tt-1"
              value={true}
              checked={form.is_default}
              onChange={(e) => setForm({...form, is_default: true})}
            />
            <label className="form-check-label" htmlFor="tt-1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="tt-2"
              value={false}
              checked={!form.is_default}
              onChange={(e) => setForm({...form, is_default: false})}
            />
            <label className="form-check-label" htmlFor="tt-2">
              No
            </label>
          </div>
        </FormInputWrapper>

        <FormInputControl
          label="Description"
          value={form.description}
          name="description"
          cl="3"
          cr="6"
          onChange={(e) => setForm({...form, description: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="64"
        />

        <FormInputWrapper label="Icon" cl="3" cr="4">
          <label className="card card-default shadow-none border">
            <div className="card-body">
              {!isView ? <i className="fas fa-edit text-muted img-edit-icon"></i> : null}
              <input
                type="file"
                onChange={doUpload}
                className="d-none"
                disabled={isView}
                accept=".png,.jpg,.jpeg"
              />
              {form.room_amenity_category_asset &&
                form.room_amenity_category_asset.multimedia_description &&
                form.room_amenity_category_asset.multimedia_description.url ? (
                <img
                  src={form.room_amenity_category_asset.multimedia_description.url}
                  className="img-fluid"
                  alt="room_amenity_type"
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

export default withRouter(RoomAmenityTypeForm)
