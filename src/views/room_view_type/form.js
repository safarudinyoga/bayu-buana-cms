import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/room-view-types"
const backUrl = "/master/room-view-types"

function RoomViewTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    room_view_type_code: "",
    room_view_type_name: "",
  })
  const translationFields = [
    {
      label: "Room View Type Name",
      name: "room_view_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    room_view_type_code: {
      required: true,
      minlength: 3,
      maxlength: 256,
      checkCode: true,
      number: true,
      noSpace: true
    },
    room_view_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true
    },
  }

  const validationMessages = {
    room_view_type_name: {
      required: "Room View Type Name is required",
      minlength: "Room View Type Name must be at least 1 characters",
      maxlength: "Room View Type Name cannot be more than 256 characters",
    },
    room_view_type_code: {
      required: "Room View Type Code is required",
      minlength: "Room View Type Code must be at least 3 characters",
      maxlength: "Room View Type Code cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Room View Type"
    if (!formId) {
      docTitle = "Create Room View Type"
    } else if (isView) {
      docTitle = "View Room View Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Room View Type Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Room View Types",
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

        if(res.data){
          let currentCode = res.data.room_view_type_code
          let currentName = res.data.room_view_type_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/room-view-types?filters=["room_view_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode === element.value){
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
            "Room View Type Code already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/room-view-types?filters=["room_view_type_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName.toUpperCase() === element.value.toUpperCase()){
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
            "Room View Type Name already exists",
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
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/room-view-types?filters=["room_view_type_code","=","${element.value}"]`,
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
        "Room View Type Code already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/room-view-types?filters=["room_view_type_name","=","${element.value}"]`,
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
        "Room View Type Name already exists",
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
          message: `Record ${form.room_view_type_code} - ${form.room_view_type_name} has been successfully ${formId ? "updated" : "saved"}..`,
        }),
      )
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
      validationMessages={validationMessages}
    >
      <FormHorizontal>
        <FormInputControl
          label="Room View Type Name"
          labelRequired="label-required"
          value={form.room_view_type_name}
          name="room_view_type_name"
          onChange={(e) =>
            setForm({...form, room_view_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Room View Type Code"
          labelRequired="label-required"
          value={form.room_view_type_code}
          name="room_view_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, room_view_type_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          hint="Room View Type Code is numeric"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RoomViewTypeForm)
