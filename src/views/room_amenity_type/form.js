import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectMultiAjax from "components/form/input-select-multi-ajax"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/room-amenity-types"
const backUrl = "/master/room-amenity-types"

function RoomAmenityTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [form, setForm] = useState({
    room_amenity_type_code: "",
    room_amenity_type_name: "",
    room_amenity_category_room_amenity_type: [],
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
      checkName: true,
    },
    room_amenity_type_code: {
      required: true,
      number: true,
      noSpace: true,
      min: 1,
      max: 32767,
      checkCode: true
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
      max: "Room amenity type code must be no more than 32767",
      number: "Code format is invalid"
    },
  }

  useEffect(async () => {
    let api = new Api()
    

    let docTitle = "Edit Room Amenity Type"
    if (!formId) {
      docTitle = "Create Room Amenity Type"
    } else if (isView) {
      docTitle = "View Room Amenity Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Room Amenity Type Details" : docTitle,
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

        if(res.data) {
          let currentCode = res.data.room_amenity_type_code
          let currentName = res.data.room_amenity_type_name

          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/room-amenity-types?filters=["room_amenity_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentCode === parseInt(element.value)) {
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
            "Code already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/room-amenity-types?filters=["room_amenity_type_name","=","${element.value}"]`,
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
            "Room Amenity Type Name already exists",
          )
        }

        if(res.data.room_amenity_category_room_amenity_type){
          setCategoryData(res.data.room_amenity_category_room_amenity_type.map(value => {
            if(value.room_amenity_category) {
              return {id: value.room_amenity_category.id, text: value.room_amenity_category.room_amenity_category_name}
            }
          }))
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
            url: `${env.API_URL}/master/room-amenity-types?filters=["room_amenity_type_code","=","${element.value}"]`,
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
        "Code already exists",
      )

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/room-amenity-types?filters=["room_amenity_type_name","=","${element.value}"]`,
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
        "Room Amenity Type Name already exists",
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
      if (form.room_amenity_type_asset.multimedia_description_id == null) {
        form.room_amenity_type_asset = null
      }

      if(!form.room_amenity_type_code){
        form.room_amenity_type_code = null
      } else {
        form.room_amenity_type_code = parseInt(form.room_amenity_type_code)
      }

      if(!form.room_amenity_category_room_amenity_type){
        form.room_amenity_category_room_amenity_type = null
      }

      if(form.room_amenity_category_room_amenity_type.length === 0){
        form.room_amenity_category_room_amenity_type = "00000000-0000-0000-0000-000000000000"
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
          message: `Record ${form.room_amenity_type_code} - ${
            form.room_amenity_type_name
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
          <FormInputSelectMultiAjax
            label="Room Amenity Category"
            value={form.room_amenity_category_room_amenity_type ? form.room_amenity_category_room_amenity_type.map((item) => item.room_amenity_category_id) : []}
            // value={form.attraction_category_attraction ? form.attraction_category_attraction.map((item) => item.attraction_category_id) : []}
            filter={`["status", "=", 1]`}
            name="room_amenity_category_room_amenity_type"
            data={categoryData}
            endpoint="/master/room-amenity-categories"
            column="room_amenity_category_name"
            // onChange={(e) =>
            //   setForm({...form, room_amenity_category_id: e.target.value || null})
            // }
            // onChange={(e, values) => setForm(form => ({...form, room_amenity_category: values.map(v => ({room_amenity_category_id: v.id}))}))}
            onChange={(e, values) => {
              setForm(form => ({...form, room_amenity_category_room_amenity_type: values.map(v => (
                {room_amenity_category_id: v.id}
              ))}))

              // console.log(form)
            }}
            disabled={isView || loading}
            type="selectmultiple" />
        }
        <FormInputControl
          id="room_icon"
          label="Icon"
          type="image"
          name="room_amenity_type_asset"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          url={form.room_amenity_type_asset?.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
          notes={true}
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
          onKeyPress={(e) => {
            let charCode = (e.which) ? e.which : e.keyCode
            if(charCode > 31 && (charCode < 48 || charCode > 57))
              e.preventDefault()
          }}
          disabled={isView || loading}
          type="number"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(RoomAmenityTypeForm)
