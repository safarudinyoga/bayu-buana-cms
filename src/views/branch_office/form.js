import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormInputSelectMultiAjax from "components/form/input-select-multi-ajax"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
import capitalizeFirstLetter from "lib/capitalizeFirstLetter"

const endpoint = "/master/branch_offices"
const backUrl = "/master/branch_offices"

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
    branch_office_name: "",
    attraction_address: "",
    country_id: "",
    state_province_id: "",
    city_id: "",
    postal_code: "",
    latitude: "",
    longitude: "",
    email: "",
    phone_number: "",
    fax_number: "",
    operational_hour: "",
  })
  const translationFields = [
    {
      label: "Company/Branch Name",
      name: "branch_office_name",
      type: "text",
    },
  ]

  const [validationRules, setValidationRules] = useState({
    branch_office_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      noSpace: true,
      checkName: true,
    },
    address_line: {
      minlength: 1,
      maxlength: 512,
    },
    building_room: {
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
    operational_hour: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
  });

  const validationMessages = {
    branch_office_name: {
      required: "Branch/Company Name is required",
      minlength: "Branch/Company Name must be at least 1 characters",
      maxlength: "Branch/Company Name cannot be more than 64 characters",
    },
    address_line: {
      minlength: "Address must be at least 1 characters",
      maxlength: "Address cannot be more than 512 characters",
    },
    building_room: {
      minlength: "Building room must be at least 1 characters",
      maxlength: "Building room cannot be more than 512 characters",
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
    operational_hour: {
      required: "Operational Hours is required",
      minlength: "Operational Hours must be at least 1 characters",
      maxlength: "Operational Hours cannot be more than 4000 characters",
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

    let docTitle = "Edit Branch Offices"
    if (!formId) {
      docTitle = "Create Branch Offices"
    } else if (isView) {
      docTitle = "Branch Offices Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employment Management",
          },
          {
            link: backUrl,
            text: "Branch Offices",
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
          setForm({...res.data, country_id: res.data.country.id})
          let currentName = res.data.branch_office_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["branch_office_name","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/branch_offices?filters=${encodeURIComponent(filters)}`,
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
          let filters = JSON.stringify(["branch_office_name","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/branch_offices?filters=${encodeURIComponent(filters)}`,
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
      if (!form.operational_hour) {
        form.operational_hour = null
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
          message: `Record ${form.branch_office_name} has been successfully ${formId ? "updated" : "saved"}.`,
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
      <div className="col-lg-12">
        <FormHorizontal>
          <FormInputControl
            label="Company/Branch Name"
            required={true}
            value={form.branch_office_name}
            name="branch_office_name"
            onChange={(e) => setForm({...form, branch_office_name: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="256"
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
          <FormInputControl
            label={"Building Room"}
            value={form.building_room}
            name="building_room"
            onChange={(e) => setForm({...form, building_room: e.target.value})}
            disabled={isView || loading}
            type="textarea"
            minLength="1"
            maxLength="512"
          />
          {
          !loading &&
          <FormInputSelectAjax
            label="Country"
            required={true}
            value={form.country_id}
            name="country_id"
            data={countryData}
            endpoint="/master/countries"
            column="country_name"
            filter={`["status", "=", 1]`}
            onChange={(e) => {
              setForm({...form, country_id: e.target.value || null})
              $('#attr_state').empty();
              $('#attr_city').empty();
            }}
            disabled={isView || loading}
            type="select"
          />
          }
          {
          !loading &&
          <FormInputSelectAjax
            label="State/ Province"
            value={form.state_province_id}
            name="state_id"
            id="attr_state"
            data={provinceData}
            endpoint="/master/state-provinces"
            filter={`[["country.id", "=", "${form.country_id}"],["AND"],["status", "=", 1]]`}
            column="state_province_name"
            onChange={(e) =>
              setForm({...form, state_province_id: e.target.value || null})
            }
            disabled={isView || loading}
            type="select"
          />
          }
          {
          !loading &&
          <FormInputSelectAjax
            label="City"
            value={form.city_id}
            required={true}
            name="city_id"
            id="attr_city"
            data={cityData}
            endpoint="/master/cities"
            filter={`[["country.id", "=", "${form.country_id}"],["AND"],["status", "=", 1]]`}
            column="city_name"
            onChange={(e) =>
              setForm({...form, city_id: e.target.value || null})
            }
            disabled={isView || loading}
            type="select"
          />
          }

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
            label={"Email"}
            value={form.email}
            name="email"
            onChange={(e) => setForm({...form, email: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="256"
          />

          <FormInputControl
            value={form.operational_hour}
            name="operational_hour"
            onChange={(e) => setForm({...form, operational_hour: e.target.value})}
            label="Operational Hours"
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
