import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/hotel-amenity-types"
const backUrl = "/master/hotel-amenity-types"

function HotelAmenityForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [form, setForm] = useState({
    hotel_amenity_type_code: "",
    hotel_amenity_type_name: "",
    hotel_amenity_category_hotel_amenity_type: [],
    hotel_amenity_type_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })

  const translationFields = [
    {
      label: "Hotel Amenity Type Name",
      name: "hotel_amenity_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    hotel_amenity_type_code: {
      required: true,
      min: 0,
      max: 99,
      checkCode: formId == null,
    },
    hotel_amenity_category_hotel_amenity_type: {
      required: false,
    },
    hotel_amenity_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: formId == null,
    },
  }

  const validationMessages = {
    hotel_amenity_type_name: {
      required: "Hotel Amenity Type Name is required",
    },
    hotel_amenity_type_code: {
      required: "Hotel Amenity Type Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Amenity Type"
    if (!formId) {
      docTitle = "Create Hotel Amenity Type"
    } else if (isView) {
      docTitle = "View Hotel Amenity Type"
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
            text: "Hotel Amenity Types",
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
        let data = {
          hotel_amenity_type_code: res.data.hotel_amenity_type_code,
          hotel_amenity_type_name: res.data.hotel_amenity_type_name,
          hotel_amenity_category_hotel_amenity_type: res.data.hotel_amenity_category_hotel_amenity_type.map(value => value.hotel_amenity_category.id),
          hotel_amenity_type_asset: res.data.hotel_amenity_type_asset
        }
        setForm(data)
        if (res.data.hotel_amenity_category_hotel_amenity_type) {
          setCategoryData(res.data.hotel_amenity_category_hotel_amenity_type.map(value => ({...value.hotel_amenity_category, text: value.hotel_amenity_category.hotel_amenity_category_name})))
        }
      } catch (e) {
      }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/hotel-amenity-types?filters=["hotel_amenity_type_name","=","${element.value}"]`,
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
        "Hotel Amenity Type Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/hotel-amenity-types?filters=["hotel_amenity_type_code","=","${element.value}"]`,
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
        "Hotel Amenity Type Code already exists",
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
      if (!form.hotel_amenity_type_code) {
        form.hotel_amenity_type_code = null
      }
      if (!form.hotel_amenity_type_name) {
        form.hotel_amenity_type_name = null
      }
      if (!form.hotel_amenity_category_hotel_amenity_type) {
        form.hotel_amenity_category_hotel_amenity_type = null
      }
      if (!form.hotel_amenity_type_asset) {
        form.hotel_amenity_type_asset = null
      } else {
        if (!form.hotel_amenity_type_asset.multimedia_description_id) {
          form.hotel_amenity_type_asset = null
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
          hotel_amenity_type_asset: {
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
          label="Hotel Amenity Type Name"
          labelRequired="label-required"
          value={form.hotel_amenity_type_name}
          name="hotel_amenity_type_name"
          onChange={(e) =>
            setForm({...form, hotel_amenity_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <FormInputSelectAjax
          label="Hotel Amenity Category"
          value={form.hotel_amenity_category_hotel_amenity_type}
          name="hotel_amenity_category_id"
          data={categoryData}
          endpoint="/master/hotel-amenity-categories"
          column="hotel_amenity_category_name"
          onChange={(e, values) => setForm(prev => ({...prev, hotel_amenity_category_hotel_amenity_type: values.map(value => ({hotel_amenity_category_id: value.id}))}))}
          disabled={isView || loading}
          type="selectmultiple"
          placeholder="Hotel Amenity Category"
        />
        <FormInputControl
          label="Icon"
          type="image"
          onChange={doUpload}
          disabled={isView}
          url={form.hotel_amenity_type_asset.multimedia_description.url}
          style={{maxWidth: 300, marginTop: 12}}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Hotel Amenity Type Code"
          labelRequired="label-required"
          value={form.hotel_amenity_type_code}
          name="hotel_amenity_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({
              ...form,
              hotel_amenity_type_code: parseInt(e.target.value),
            })
          }
          disabled={isView || loading}
          type="text"
          min="0"
          max="99"
          hint="Hotel Amenity type code maximum 2 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(HotelAmenityForm)
