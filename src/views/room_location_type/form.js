import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

const endpoint = "/master/room-location-types"
const backUrl = "/master/room-location-types"

function RoomLocationTypeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    room_location_type_code: "",
    room_location_type_name: "",
  })
  const translationFields = [
    {
      label: "Room Location Type Name",
      name: "room_location_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    room_location_type_code: {
      required: true,
      min: 0,
      max: 99,
    },
    room_location_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Room Location Type"
    if (!formId) {
      docTitle = "Create Room Location Type"
    } else if (isView) {
      docTitle = "View Room Location Type"
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
            text: "Room Location Types",
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
          label="Room Location Type Name"
          labelRequired="label-required"
          value={form.room_location_type_name}
          name="room_location_type_name"
          onChange={(e) =>
            setForm({...form, room_location_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Room Location Type Code"
          labelRequired="label-required"
          value={form.room_location_type_code}
          name="room_location_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, room_location_type_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          hint="Room Location Type Code is numeric"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RoomLocationTypeForm)
