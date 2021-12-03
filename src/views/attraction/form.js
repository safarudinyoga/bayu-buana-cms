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
import {setAlert, setUIParams} from "redux/ui-store"

const endpoint = "/master/attractions"
const backUrl = "/master/attractions"

const MediaGallery = (props) => {

  const [image, setImage] = useState(false)

  const doUpload = async (e) => {
    try {
      let api = new Api()
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        if (res.data.url) {
          setImage(res.data.url);
        }
      }
    } catch (e) { }
  }

  return (
    <div className="pos-relative ht-100p">
      <label htmlFor="upload-me">
        <div className="marker pos-absolute t-10 l-10">{props.name}</div>
        {image ? (<img src={image} className="rounded" alt="" style={{width: '100%'}} />) : <img src="/img/noimg.jpeg" className="rounded" alt="" style={{width: '100%'}} />}
      </label>
      <input type="file" id="upload-me" className="d-none" onChange={doUpload} style={{display: 'none'}} disabled={props.isView} />
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit svg-20 pos-absolute r--10 text-primary">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    </div>
  )
}

// react function named gallery
const Gallery = (props) => {
  return (
    <div className="row row-sm media">
      <div className="col-12 mg-y-10">
        <hr />
        <h4>Media</h4>
        <div className="row row-sm">
          <div className="col-lg-6">
            <MediaGallery name="BANNER DESKTOP" />
          </div>
          <div className="col-lg-6">
            <MediaGallery name="BANNER MOBILE" />
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-lg-6">
            <MediaGallery name="BANNER TABLET" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AttractionForm(props) {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  let formId = props.match.params.id
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [cityData, setCityData] = useState([])
  const [destinationData, setDestinationData] = useState([])
  const [zoneData, setZoneData] = useState([])

  const [form, setForm] = useState({
    attraction_name: "",
    attraction_category_attraction: [],
    attraction_address: "",
    country_id: "",
    state_province: "",
    city_id: "",
    postal_code: "",
    destination_id: "",
    zone_id: "",
    latitude: "",
    longitude: "",
    email: "",
    phone_number: "",
    fax_number: "",
    description: "",
    attraction_asset_desktop: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
    attraction_asset_mobile: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
    attraction_asset_tablet: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Attraction Name",
      name: "attraction_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ]

  const validationRules = {
    attraction_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
      noSpace: true,
    },
    attraction_category_attraction: {
      required: false,
    },
    address_line: {
      minlength: 1,
      maxlength: 512,
    },
    country_id: {
      required: true,
    },
    state_province: {
      required: false,
    },
    city_id: {
      required: true,
    },
    postal_code: {
      required: false,
      minlength: 1,
      maxlength: 16,
    },
    destination_id: {
      required: false,
    },
    zone_id: {
      required: false,
    },
    latitude: {
      required: false,
      minlength: 1,
      maxlength: 16,
    },
    longitude: {
      required: false,
      minlength: 1,
      maxlength: 16,
    },
    email: {
      required: false,
      minlength: 1,
      maxlength: 256,
    },
    phone_number: {
      required: false,
      minlength: 1,
      maxlength: 32,
    },
    fax_number: {
      required: false,
      minlength: 1,
      maxlength: 32,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
  }

  const validationMessages = {
    attraction_name: {
      required: "Attraction Name is required",
      minlength: "Attraction Name must be at least 1 characters",
      maxlength: "Attraction Name cannot be more than 64 characters",
    },
    attraction_category_attraction: {
      required: "Attraction Category is required",
    },
    address_line: {
      minlength: "Address must be at least 1 characters",
      maxlength: "Address cannot be more than 512 characters",
    },
    country_id: {
      required: "Country is required",
    },
    state_province: {
      required: "State/Province is required",
    },
    city_id: {
      required: "City is required",
    },
    postal_code: {
      required: "Zip Code is required",
      minlength: "Zip Code must be at least 1 characters",
      maxlength: "Zip Code cannot be more than 16 characters",
    },
    destination_id: {
      required: "Destination is required",
    },
    zone_id: {
      required: "Zone is required",
    },
    latitude: {
      required: "Latitude is required",
      minlength: "Latitude must be at least 1 characters",
      maxlength: "Latitude cannot be more than 16 characters",
    },
    longitude: {
      required: "Longitude is required",
      minlength: "Longitude must be at least 1 characters",
      maxlength: "Longitude cannot be more than 16 characters",
    },
    email: {
      required: "Email Address is required",
      minlength: "Email Address must be at least 1 characters",
      maxlength: "Email Address cannot be more than 256 characters",
    },
    phone_number: {
      required: "Phone is required",
      minlength: "Phone must be at least 1 characters",
      maxlength: "Phone cannot be more than 32 characters",
    },
    fax_number: {
      required: "Fax Number is required",
      minlength: "Fax must be at least 1 characters",
      maxlength: "Fax cannot be more than 32 characters",
    },
    description: {
      required: "Description is required",
      minlength: "Description must be at least 1 characters",
      maxlength: "Description cannot be more than 4000 characters",
    },
  }

  useEffect(async () => {
    let formId = props.match.params.id

    let docTitle = "Edit Attraction"
    if (!formId) {
      docTitle = "Create Attraction"
    } else if (isView) {
      docTitle = "View Attraction"
    }

    dispatch(
      setUIParams({
        title: isView ? "Attraction Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Attractions",
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
        if (res.data.attraction_category_attraction) {
          setCategoryData(res.data.attraction_category_attraction.map(value => {
            return {id: value.attraction_category.id, text: value.attraction_category.attraction_category_name}
          }))
        }
        if (res.data.country) {
          setCountryData([{...res.data.country, text: res.data.country.country_name}])
        }
        if (res.data.city) {
          setCityData([{...res.data.city, text: res.data.city.city_name}])
        }
        if (res.data.destination) {
          setDestinationData([{...res.data.destination, text: res.data.destination.destination_name}])
        }
        if (res.data.zone) {
          setZoneData([{...res.data.zone, text: res.data.zone.zone_name}])
        }
        setForm(res.data)
      } catch (e) {
        console.error(e);
      }

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
    try {
      if (!form.attraction_address) {
        form.attraction_address = null
      }
      if (!form.state_province) {
        form.state_province = null
      }
      if (!form.postal_code) {
        form.postal_code = null
      }
      if (!form.destination_id) {
        form.destination_id = null
      }
      if (!form.zone_id) {
        form.zone_id = null
      }
      if (!form.latitude) {
        form.latitude = null
      }else{
        form.latitude = parseFloat(form.latitude)
      }
      if (!form.longitude) {
        form.longitude = null
      }else{
        form.longitude = parseFloat(form.longitude);
      }
      if (!form.email) {
        form.email = null
      }
      if (!form.phone_number) {
        form.phone_number = null
      }
      if (!form.fax_number) {
        form.fax_number = null
      }
      if (!form.description) {
        form.description = null
      }
      if (!form.attraction_category_attraction) {
        form.attraction_category_attraction = null
      }

      if (!form.attraction_asset_desktop) {
        form.attraction_asset_desktop = null
      } else {
        if (!form.attraction_asset_desktop.multimedia_description_id) {
          form.attraction_asset_desktop = null
        }
      }

      if (!form.attraction_asset_mobile) {
        form.attraction_asset_mobile = null
      } else {
        if (!form.attraction_asset_mobile.multimedia_description_id) {
          form.attraction_asset_mobile = null
        }
      }

      if (!form.attraction_asset_tablet) {
        form.attraction_asset_tablet = null
      } else {
        if (!form.attraction_asset_tablet.multimedia_description_id) {
          form.attraction_asset_tablet = null
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
          message: `Record ${form.attraction_name} has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
  }

  const doUploadDesktop = async (e) => {
    try {
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          attraction_asset_desktop: {
            multimedia_description_id: res.data.id,
            multimedia_description: res.data,
          },
        })
      }
    } catch (e) {}
  }

  const doUploadTablet = async (e) => {
    try {
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      payload.append("dimension_category_code", 2)
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          attraction_asset_tablet: {
            multimedia_description_id: res.data.id,
            multimedia_description: res.data,
          },
        })
      }
    } catch (e) {}
  }

  const doUploadMobile = async (e) => {
    try {
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      payload.append("dimension_category_code", 3)
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          attraction_asset_mobile: {
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
      validationMessages={validationMessages}
      gallery={Gallery()}
    >
      <div className="col-lg-12">
      <FormHorizontal>
        <FormInputControl
          label="Attraction Name"
          labelRequired="label-required"
          value={form.attraction_name}
          name="attraction_name"
          onChange={(e) => setForm({...form, attraction_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputSelectAjax
          label="Attraction Category"
          value={form.attraction_category_attraction ? form.attraction_category_attraction.map((item) => item.attraction_category_id) : []}
          name="attraction_category_attraction"


          data={categoryData}
          endpoint="/master/attraction-categories"
          column="attraction_category_name"
          onChange={(e, values) => setForm(form => ({...form, attraction_category_attraction: values.map(v => ({attraction_category_id: v.id}))}))}
          disabled={isView || loading}
          type="selectmultiple"
        />

        <FormInputControl
          label={"Address"}
          value={form.address_line}
          name="address_line"
          onChange={(e) => setForm({...form, address_line: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="64"
        />

        <FormInputSelectAjax
          label="Country"
          labelRequired="label-required"
          value={form.country_id}
          name="country_id"


          data={countryData}
          endpoint="/master/countries"
          column="country_name"
          onChange={(e) =>
            setForm({...form, country_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputSelectAjax
          label="State/ Province"
          value={form.state_province}
          name="state_id"


          endpoint="/master/state-provinces"
          filter={form.country_id}
          column="state_province_name"
          onChange={(e) =>
            setForm({...form, state_province: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputSelectAjax
          label="City"
          value={form.city_id}
          labelRequired="label-required"
          name="city_id"


          data={cityData}
          endpoint="/master/cities"
          filter={form.country_id}
          column="city_name"
          onChange={(e) =>
            setForm({...form, city_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputControl
          label={"Zip Code"}
          value={form.postal_code}
          name="postal_code"
          onChange={(e) => setForm({...form, postal_code: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="16"
        />

        <FormInputSelectAjax
          label="Destination"
          value={form.destination_id}
          name="destination_id"


          data={destinationData}
          endpoint="/master/destinations"
          filter={form.destination_id}
          column="destination_name"
          onChange={(e) =>
            setForm({...form, destination_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputSelectAjax
          label="Zone"
          value={form.zone_id}
          name="zone_id"


          data={zoneData}
          endpoint="/master/zones"
          filter={form.zone_id}
          column="zone_name"
          onChange={(e) =>
            setForm({...form, zone_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
        />

        <FormInputControl
          label={"Latitude"}
          value={form.latitude}
          name="latitude"
          onChange={(e) => setForm({...form, latitude: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="16"
        />

        <FormInputControl
          label={"Longitude"}
          value={form.longitude}
          name="longitude"
          onChange={(e) => setForm({...form, longitude: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="16"
        />

        <FormInputControl
          label={"Email Address"}
          value={form.email}
          name="email"
          onChange={(e) => setForm({...form, email: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Phone"}
          value={form.phone_number}
          name="phone_number"
          onChange={(e) => setForm({...form, phone_number: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          label={"Fax"}
          value={form.fax_number}
          name="fax_number"
          onChange={(e) => setForm({...form, fax_number: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />

        <FormInputControl
          value={form.description}
          name="description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          label="Description"
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="64"
        />
      </FormHorizontal>
      <p className="text-sub-header">Media</p>
      <div className="row">
        <div className="col-lg-6">
          <FormInputWrapper
            label="Banner Desktop"
          >
            <label className={`card card-default shadow-none border`}>
              <div className="card-body">
                {!isView ? (
                  <i className="fas fa-edit text-muted img-edit-icon"></i>
                ) : null}
                <input
                  type="file"
                  onChange={doUploadDesktop}
                  className="d-none"
                  disabled={isView}
                  accept=".png,.jpg,.jpeg"
                />
                {form.attraction_asset_desktop &&
                form.attraction_asset_desktop.multimedia_description &&
                form.attraction_asset_desktop.multimedia_description.url ? (
                  <img
                    src={
                      form.attraction_asset_desktop.multimedia_description.url
                    }
                    className="img-fluid"
                    alt="attraction asset desktop"
                  />
                ) : (
                  ""
                )}
              </div>
            </label>
          </FormInputWrapper>
        </div>
        <div className="col-lg-6">
          <FormInputWrapper
            label="Banner Tablet"
          >
            <label className={`card card-default shadow-none border`}>
              <div className="card-body">
                {!isView ? (
                  <i className="fas fa-edit text-muted img-edit-icon"></i>
                ) : null}
                <input
                  type="file"
                  onChange={doUploadTablet}
                  className="d-none"
                  disabled={isView}
                  accept=".png,.jpg,.jpeg"
                />
                {form.attraction_asset_tablet &&
                form.attraction_asset_tablet.multimedia_description &&
                form.attraction_asset_tablet.multimedia_description.url ? (
                  <img
                    src={
                      form.attraction_asset_tablet.multimedia_description.url
                    }
                    className="img-fluid"
                    alt="attraction asset tablet"
                  />
                ) : (
                  ""
                )}
              </div>
            </label>
          </FormInputWrapper>
        </div>
        <div className="col-lg-6">
          <FormInputWrapper
            label="Banner Mobile"
          >
            <label className={`card card-default shadow-none border`}>
              <div className="card-body">
                {!isView ? (
                  <i className="fas fa-edit text-muted img-edit-icon"></i>
                ) : null}
                <input
                  type="file"
                  onChange={doUploadMobile}
                  className="d-none"
                  disabled={isView}
                  accept=".png,.jpg,.jpeg"
                />
                {form.attraction_asset_mobile &&
                form.attraction_asset_mobile.multimedia_description &&
                form.attraction_asset_mobile.multimedia_description.url ? (
                  <img
                    src={
                      form.attraction_asset_mobile.multimedia_description.url
                    }
                    className="img-fluid"
                    alt="attraction asset mobile"
                  />
                ) : (
                  ""
                )}
              </div>
            </label>
          </FormInputWrapper>
        </div>
        </div>
      </div>
    </FormBuilder>
  )
}

export default withRouter(AttractionForm)
