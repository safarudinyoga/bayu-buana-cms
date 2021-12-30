import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"
import $ from "jquery"

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
      minlength: 1,
      maxlength: 256,
    },
    room_amenity_type_code: {
      required: true,
      number: true,
      noSpace: true,
      min: 1,
      max: 999,
    },
    room_amenity_type_asset: {
      required: false
    }
  }

  const validationMessages = {
    room_amenity_type_name: {
      required: "Room Amenity Type Name is required.",
      minlength: "Room amenity type name must be at least 1 characters",
      maxlength: "Room amenity type name must be no more than 256 characters",
    },
    room_amenity_type_code: {
      required: "Room Amenity Type Code is required.",
      min: "Room amenity type code must be at least 1",
      max: "Room amenity type code must be no more than 999999",
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
            text: "Room Amenity Types",
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
      var files = e.target.files[0];
      if(files){
        var filesize = ((files.size/1024)/1024).toFixed(4);
        if(filesize > 4){
          alert("Room Amenity Type Icon Image size is more than 4MB.");
          $("#room_icon").val('');
          return;
        }
        let api = new Api()
        let payload = new FormData()
        payload.append("files", e.target.files[0])

        let config = {
          onUploadProgress: function(progressEvent) {
            let mediaDiv = document.getElementById("media-room_icon")
            let progressBar = document.getElementById("progress-room_icon")
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
            room_amenity_type_asset: {
              multimedia_description_id: res.data.id,
              multimedia_description: res.data,
            },
          })
        }
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
          label="Room Amenity Type Name"
          required={true}
          value={form.room_amenity_type_name}
          name="room_amenity_type_name"
          onChange={(e) => setForm({...form, room_amenity_type_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {
          !loading &&
          <FormInputSelectAjax
            label="Room Amenity Category"
            value={form.room_amenity_category_id}
            // value={form.attraction_category_attraction ? form.attraction_category_attraction.map((item) => item.attraction_category_id) : []}
            filter={`["status", "=", 1]`}
            name="room_amenity_category_id"
            endpoint="/master/room-amenity-categories"
            column="room_amenity_category_name"
            onChange={(e) =>
              setForm({...form, room_amenity_category_id: e.target.value || null})
            }
            // onChange={(e, values) => setForm(form => ({...form, attraction_category_attraction: values.map(v => ({attraction_category_id: v.id}))}))}
            disabled={isView || loading}
            type="select" />
        }
        <FormInputControl
          id="room_icon"
          label="Room Amenity Type Icon Image"
          type="image"
          name="room_amenity_type_asset"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          url={form.room_amenity_type_asset?.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Room Amenity Type Code"
          required={true}
          value={form.room_amenity_type_code}
          name="room_amenity_type_code"
          cl={{md: "12"}}
          cr="12"
          onChange={(e) => setForm({...form, room_amenity_type_code: e.target.value})}
          disabled={isView || loading}
          type="number"
          minLength="1"
          maxLength="3"
          hint="Room Amenity Type code maximum 3 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RoomAmenityTypeForm)
