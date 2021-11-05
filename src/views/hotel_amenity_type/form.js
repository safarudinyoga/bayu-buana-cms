import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputWrapper from "components/form/input-wrapper"
import TableDropdownFilter from "../../components/table/table-dropdown-filter"
const endpoint = "/master/hotel-amenity-types"
const backUrl = "/master/hotel-amenity-types"

function HotelAmenityForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
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
    },
    hotel_amenity_category_hotel_amenity_type:{
      required: false,
    },
    hotel_amenity_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Amenity Type"
    if (!formId) {
      docTitle = "Create Hotel Amenity Type"
    } else if (isView) {
      docTitle = "Hotel Amenity Type Details"
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
        setForm(res.data)
        console.log(res.data,'data')
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
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
      }else{
        if(!form.hotel_amenity_type_asset.multimedia_description_id){
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
    } catch (e) {}
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
          label="Hotel Amenity Type Name"
          labelRequired="label-required"
          value={form.hotel_amenity_type_name}
          name="hotel_amenity_type_name"
          cl="5"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, hotel_amenity_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        <TableDropdownFilter
          label="Hotel Amenity Category"
          value={form.hotel_amenity_category_hotel_amenity_type}
          name="hotel_amenity_category_id"
          cl="5"
          cr="6"
          endpoint="/master/hotel-amenity-categories"
          column="hotel_amenity_category_name"
          onChange={(e, values) => setForm(prev => ({...prev, hotel_amenity_category_hotel_amenity_type: values.map(value => ({hotel_amenity_category_id: value.id}))}))}
          disabled={isView || loading}
          type="select"
          minLength="0"
          maxLength="9999"
        />
        <FormInputWrapper label="Icon" cl="5" cr="6">
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
              {form.hotel_amenity_type_asset &&
              form.hotel_amenity_type_asset.multimedia_description &&
              form.hotel_amenity_type_asset.multimedia_description.url ? (
                <img
                  src={form.hotel_amenity_type_asset.multimedia_description.url}
                  className="img-fluid"
                  alt="hotel amenity type"
                />
              ) : (
                ""
              )}
            </div>
          </label>
        </FormInputWrapper>
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Hotel Amenity Type Code"
          labelRequired="label-required"
          value={form.hotel_amenity_type_code}
          name="hotel_amenity_type_code"
          cl="6"
          cr="6"
          onChange={(e) =>
            setForm({
              ...form,
              hotel_amenity_type_code: parseInt(e.target.value),
            })
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Hotel Amenity type code maximum 2 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(HotelAmenityForm)
