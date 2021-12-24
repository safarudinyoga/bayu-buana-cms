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
    room_amenity_category_name: "",
    is_default: false,
    description: "",
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
    room_amenity_category_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
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

    let docTitle = "Edit Room Amenity Category"
    if (!formId) {
      docTitle = "Create Room Amenity Category"
    } else if (isView) {
      docTitle = "View Room Amenity Category"
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
      // set form to null when value is empty
      if (form.room_amenity_category_name === "") {
        form.room_amenity_category_name = null
      }
      if (form.description === "") {
        form.description = null
      }
      if (form.room_amenity_category_id === "") {
        form.room_amenity_category_id = null
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
          label="Room Amenity Category Name"
          labelRequired="label-required"
          value={form.room_amenity_category_name}
          name="room_amenity_category_name"
          onChange={(e) => setForm({...form, room_amenity_category_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputWrapper label="Is Default" hint="Set is default">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_default"
              id="tt-1"
              value={true}
              checked={form.is_default}
              onChange={(e) => setForm({...form, is_default: true})}
              disabled={isView || loading}
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
              disabled={isView || loading}
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
          onChange={(e) => setForm({...form, description: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />

        <FormInputControl
          label="Icon"
          type="image"
          onChange={doUpload}
          disabled={isView}
          url={form.room_amenity_category_asset.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
        />
      </FormHorizontal>

    </FormBuilder>
  )
}

export default withRouter(RoomAmenityTypeForm)
