import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/attractions"
const backUrl = "/master/attractions"

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
    state_province_id: "",
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
      maxLength: 4000
    },
  ]

  const [validationRules, setValidationRules] = useState({
    attraction_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      noSpace: true,
      checkName: true,
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
    state_province_id: {
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
      validEmail: true,
    },
    phone_number: {
      required: false,
      minlength: 1,
      maxlength: 32,
      phone: true,
    },
    fax_number: {
      required: false,
      minlength: 1,
      maxlength: 32,
      fax: true
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
    attraction_asset_desktop: {
      required: formId == null,
    },
    attraction_asset_mobile: {
      required: formId == null,
    },
    attraction_asset_tablet: {
      required: formId == null,
    },
  });

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
    state_province_id: {
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
    attraction_asset_desktop: {
      required: "Banner (Desktop) Image is required"
    },
    attraction_asset_mobile: {
      required: "Banner (Mobile) Image is required"
    },
    attraction_asset_tablet: {
      required: "Banner (Tablet) Image is required"
    },
  }

  useEffect(async () => {
    let formId = props.match.params.id

    // validator for alpha num
    $.validator.addMethod(
      "phone", function (value, element) {
        return this.optional(element) || /^[0-9\-\(\)\s]+$/.test(value);
      }, "Please enter a valid phone number"
    );

    $.validator.addMethod(
      "fax", function (value, element) {
        return this.optional(element) || /^[0-9\-\(\)\s]+$/.test(value);
      }, "Please enter a valid fax number"
    );

    $.validator.addMethod(
      "validEmail", function (value, element){
        return this.optional( element ) || /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test( value );
      }, "Please enter a valid email address"
    );

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
        if (res.data) {

          let currentName = res.data.attraction_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["attraction_name","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/attractions?filters=${encodeURIComponent(filters)}`,
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
            "Attraction Name already exists",
          )
        }

        if (res.data.attraction_category_attraction) {
          setCategoryData(res.data.attraction_category_attraction.map(value => {
            if (value.attraction_category) {
              return {id: value.attraction_category.id, text: value.attraction_category.attraction_category_name}
            }
          }))
        }
        if (res.data.state_province) {
          setProvinceData([{...res.data.state_province, text: res.data.state_province.state_province_name}])
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
    } else {
      setValidationRules({
        ...validationRules,
        attraction_asset_desktop: {
          required: true
        },
        attraction_asset_mobile: {
          required: true
        },
        attraction_asset_tablet: {
          required: true
        },
      })

      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify(["attraction_name","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/attractions?filters=${encodeURIComponent(filters)}`,
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
        "Attraction Name already exists",
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
    try {
      if (!form.attraction_address) {
        form.attraction_address = null
      }
      if (!form.state_province_id) {
        form.state_province_id = null
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
      } else {
        form.latitude = parseFloat(form.latitude)
      }
      if (!form.longitude) {
        form.longitude = null
      } else {
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
        console.log(tl)
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

  const doUploadMedia = async (e, media_type = "desktop") => {
    try {
      let media_code = ["desktop", "tablet", "mobile"].indexOf(media_type) + 1
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      media_type !== "desktop" && payload.append("dimension_category_code", media_code)

      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          ["attraction_asset_" + media_type]: {
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
      showMedia={true}
      uploadMedia={doUploadMedia}
      mediaData={form}
      moduleName={"attraction"}
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
            maxLength="256"
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
            maxLength="512"
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
            value={form.state_province_id}
            name="state_id"
            data={provinceData}
            endpoint="/master/state-provinces"
            filter={`["country.id", "=", "${form.country_id}"]`}
            column="state_province_name"
            onChange={(e) =>
              setForm({...form, state_province_id: e.target.value || null})
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
            filter={`["country.id", "=", "${form.country_id}"]`}
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
            maxLength="256"
          />

          <FormInputControl
            label={"Phone"}
            value={form.phone_number}
            name="phone_number"
            onChange={(e) => setForm({...form, phone_number: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="32"
          />

          <FormInputControl
            label={"Fax"}
            value={form.fax_number}
            name="fax_number"
            onChange={(e) => setForm({...form, fax_number: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="32"
          />

          <FormInputControl
            value={form.description}
            name="description"
            onChange={(e) => setForm({...form, description: e.target.value})}
            label="Description"
            disabled={isView || loading}
            type="textarea"
            minLength="1"
            maxLength="4000"
          />
        </FormHorizontal>
      </div>
    </FormBuilder>
  )
}

export default withRouter(AttractionForm)
