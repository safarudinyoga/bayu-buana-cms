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
import FormInputWrapper from "components/form/input-wrapper"
import FormInput from "components/form/input"
import { Col, Row } from 'react-bootstrap';

const endpoint = "/master/offices"
const backUrl = "/master/branch-offices"

function OfficeForm(props) {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  let formId = props.match.params.id
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [countryData, setCountryData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [cityData, setCityData] = useState([])

  const [form, setForm] = useState({
    office_name: "",
    address_line: "",
    building_room: "",
    country_id: "",
    state_province_id: "",
    city_id: "",
    postal_code: "",
    latitude: "",
    longitude: "",
    email: "",
    phone_number: "",
    fax_number: "",
    operation_hours: "",
  })
  const translationFields = [
    {
      label: "Company/ Branch Name",
      name: "office_name",
      type: "text",
      unique: true
    },
  ]

  const [validationRules, setValidationRules] = useState({
    office_name: {
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
      maxlength: 64,
    },
    country_id: {
      required: true,
    },
    state_province_id: {
      required: false,
    },
    city_id: {
      required: false,
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
    operation_hours: {
      required: false,
      minlength: 1,
      maxlength: 512,
    },
  });

  const validationMessages = {
    office_name: {
      required: "Company/ Branch Name is required",
      minlength: "Company/ Branch Name must be at least 1 characters",
      maxlength: "Company/ Branch Name cannot be more than 64 characters",
    },
    address_line: {
      minlength: "Address must be at least 1 characters",
      maxlength: "Address cannot be more than 512 characters",
    },
    building_room: {
      minlength: "Building, Room must be at least 1 characters",
      maxlength: "Building, Room cannot be more than 512 characters",
    },
    country_id: {
      required: "Country is required",
    },
    state_province_id: {
      required: "State/ Province is required",
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
    operation_hours: {
      required: "Operational Hours is required",
      minlength: "Operational Hours must be at least 1 characters",
      maxlength: "Operational Hours cannot be more than 4000 characters",
    },
  }

  useEffect(async() => {
    try {
      let {data} = await api.get("/master/agent-languages", { size: -1, sort: "sort,language_name" })
      let valRules = {}
      for (let lang of data.items) {
        valRules["office_name_"+lang.language_code] = { checkLangName: true }
      }
      setValidationRules({...validationRules, ...valRules})
    } catch (e) {

    }
  }, [])

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
      }, "Email is not valid"
    );

    let docTitle = "Edit Branch Office"
    if (!formId) {
      docTitle = "Create Branch Office"
    } else if (isView) {
      docTitle = "Branch Office Details"
    }

    dispatch(
      setUIParams({
        title: !formId ? "New Branch Office": docTitle,
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
          setForm({...res.data, country_id: res.data.country_id, longitude: res.data.longitude != 0 ? res.data.longitude : "", latitude: res.data.latitude != 0 ? res.data.latitude : ""})
          let currentName = res.data.office_name

          $.validator.addMethod(
            "checkLangName",
            function (value, element) {
              let req = false
              let lang_code = element.name.slice(12)
              let filters = JSON.stringify(["office_name","=",element.value])
              // let filters = JSON.stringify([["language_code", "=", lang_code], ["AND"], ["office_name","=",element.value]])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/offices?filters=${encodeURIComponent(filters)}`,
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
            "Company/ Branch Name already exists",
          )

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify(["office_name","=",element.value])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/offices?filters=${encodeURIComponent(filters)}`,
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
            "Company/ Branch Name already exists",
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
      } catch (e) {
        console.error(e);
      }
      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { console.error(e);}
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkLangName",
        function (value, element) {
          let req = false
          let lang_code = element.name.slice(12)
          let filters = JSON.stringify(["office_name","=",element.value])
          // let filters = JSON.stringify([["language_code", "=", lang_code], ["AND"], ["office_name","=",element.value]])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/offices?filters=${encodeURIComponent(filters)}`,
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
        "Company/ Branch Name already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify(["office_name","=",element.value])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/offices?filters=${encodeURIComponent(filters)}`,
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
        "Company/ Branch Name already exists",
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
      if (!form.address_line) {
        form.address_line = ""
      }
      if (!form.building_room) {
        form.building_room = ""
      }
      if (!form.state_province_id) {
        form.state_province_id = null
      }
      if (!form.city_id) {
        form.city_id = null
      }
      if (!form.postal_code) {
        form.postal_code = ""
      }
      if (!form.latitude) {
        form.latitude = 0
      } else {
        form.latitude = parseFloat(form.latitude)
      }
      if (!form.longitude) {
        form.longitude = 0
      } else {
        form.longitude = parseFloat(form.longitude);
      }
      if (!form.email) {
        form.email = ""
      }
      if (!form.phone_number) {
        form.phone_number = ""
      }
      if (!form.fax_number) {
        form.fax_number = ""
      }
      if (!form.operation_hours) {
        form.operation_hours = ""
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
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record ${form.office_name} has been successfully saved.`,
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
            label="Company/ Branch Name"
            required={true}
            value={form.office_name}
            name="office_name"
            onChange={(e) => setForm({...form, office_name: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="256"
            cr={{md: 5}}
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
            style={{resize: 'none'}}
          />
          <FormInputControl
            label={"Building, Room"}
            value={form.building_room}
            name="building_room"
            onChange={(e) => setForm({...form, building_room: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="64"
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
              setForm({...form, country_id: e.target.value || null, state_province_id: null, city_id: null})
              $('#attr_state').empty();
              $('#attr_city').empty();
            }}
            disabled={isView || loading}
            type="select"
            cr={{md: 5}}
          />
          }
          {
          !loading &&
          <FormInputSelectAjax
            label="State/Province"
            value={form.state_province_id}
            name="state_id"
            id="attr_state"
            data={provinceData}
            endpoint="/master/state-provinces"
            filter={`[["country.id", "=", "${form.country_id}"],["AND"],["status", "=", 1]]`}
            column="state_province_name"
            onChange={(e) => {
              setForm({...form, state_province_id: e.target.value || null, city_id: null})
              $('#attr_city').empty();
            }}
            disabled={isView || loading}
            type="select"
            cr={{md: 4}}
          />
          }
          {
          !loading &&
          <FormInputSelectAjax
            label="City"
            value={form.city_id}
            name="city_id"
            id="attr_city"
            data={cityData}
            endpoint="/master/cities"
            filter={form.state_province_id && form.state_province_id !== "" && form.state_province_id !== null 
              ? `[["country.id", "=", "${form.country_id}"],["AND"],["state_province_id", "=", "${form.state_province_id}"],["AND"],["status", "=", 1]]` 
              : `[["country.id", "=", "${form.country_id}"],["AND"],["status", "=", 1]]`
            }
            column="city_name"
            onChange={(e) =>
              setForm({...form, city_id: e.target.value || null})
            }
            disabled={isView || loading}
            type="select"
            cr={{md: 4}}
          />
          }

          <FormInputWrapper
            label={"Zip Code"}
            required={false}
          >
            <Row>
              <Col md={3}>
                <FormInput
                  label={"Zip Code"}
                  value={form.postal_code}
                  name="postal_code"
                  onChange={(e) => setForm({...form, postal_code: e.target.value})}
                  disabled={isView || loading}
                  type="text"
                  minLength="1"
                  maxLength="16"
                />
              </Col>
            </Row>
          </FormInputWrapper>

          <FormInputWrapper
            label={"Geo Location"}
            required={false}
          >
            <Row>
              <Col md={6}>
                <Row>
                  <Col xs={6}>
                    <FormInput
                      placeholder={"Latitude"}
                      value={form.latitude}
                      name="latitude"
                      onChange={(e) => setForm({...form, latitude: e.target.value})}
                      disabled={isView || loading}
                      type="text"
                      minLength="1"
                      maxLength="16"
                    />
                  </Col>
                  <Col xs={6}>
                    <FormInput 
                      placeholder={"Longitude"}
                      value={form.longitude}
                      name="longitude"
                      onChange={(e) => setForm({...form, longitude: e.target.value})}
                      disabled={isView || loading}
                      type="text"
                      minLength="1"
                      maxLength="16"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormInputWrapper>

          <FormInputWrapper
            // label={formId ? "Phone" : "Phone Number"}
            label="Phone"
            required={false}
          >
            <Row>
              <Col md={6}>
                <FormInput
                  value={form.phone_number}
                  name="phone_number"
                  onChange={(e) => setForm({...form, phone_number: e.target.value})}
                  disabled={isView || loading}
                  type="text"
                  minLength="1"
                  maxLength="32"
                />
              </Col>
            </Row>
          </FormInputWrapper>

          <FormInputWrapper
            label={"Fax"}
            required={false}
          >
            <Row>
              <Col md={6}>
                <FormInput
                  value={form.fax_number}
                  name="fax_number"
                  onChange={(e) => setForm({...form, fax_number: e.target.value})}
                  disabled={isView || loading}
                  type="text"
                  minLength="1"
                  maxLength="32"
                />
              </Col>
            </Row>
          </FormInputWrapper>

          <FormInputControl
            label={"Email"}
            value={form.email}
            name="email"
            onChange={(e) => setForm({...form, email: e.target.value})}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="256"
            cr={{md: 5}}
          />

          <FormInputControl
            value={form.operation_hours}
            name="operation_hours"
            onChange={(e) => setForm({...form, operation_hours: e.target.value})}
            label="Operational Hours"
            disabled={isView || loading}
            type="textarea"
            minLength="1"
            maxLength="512"
          />
        </FormHorizontal>
      </div>
    </FormBuilder>
  )
}

export default withRouter(OfficeForm)
