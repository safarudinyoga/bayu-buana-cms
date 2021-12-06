import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormInputWrapper from "components/form/input-wrapper"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/room-amenity-types"
const backUrl = "/master/room-amenity-types"

function RoomAmenityTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    room_amenity_type_code: "",
    room_amenity_type_name: "",
    room_amenity_category_id: "",
    room_amenity_type_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Room Amenity Type Name",
      name: "room_amenity_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    room_amenity_type_name: {
      required: true,
      minlength: 3,
      maxlength: 64,
    },
    room_amenity_type_code: {
      required: true,
      minlength: 3,
      maxlength: 3,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Room Amenity Type"
    if (!formId) {
      docTitle = "Create Room Amenity Type"
    } else if (isView) {
      docTitle = "View Room Amenity Type"
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
            text: "Room Amenity Type",
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
      if (form.room_amenity_type_asset.multimedia_description_id == null) {
        form.room_amenity_type_asset = null
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
          room_amenity_type_asset: {
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
          value={form.room_amenity_type_name}
          name="room_amenity_type_name"
          onChange={(e) => setForm({...form, room_amenity_type_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
        <FormInputSelectAjax
          label="Room Amenity Category"
          value={form.room_amenity_category_id}
          name="room_amenity_category_id"
          endpoint="/master/room-amenity-categories"
          column="room_amenity_category_name"
          onChange={(e) =>
            setForm({...form, room_amenity_category_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        >
        </FormInputSelectAjax>
        <FormInputControl
          label="Icon"
          type="image"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          url={form.room_amenity_type_asset.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Room Amenity Type Code"
          labelRequired="label-required"
          value={form.room_amenity_type_code}
          name="room_amenity_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) => setForm({...form, room_amenity_type_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="3"
          maxLength="3"
          hint="Room Amenity Type code maximum 3 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RoomAmenityTypeForm)
