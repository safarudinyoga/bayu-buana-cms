import React, { useEffect, useRef, useState } from "react"
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"

// components
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import ImageDefault from "assets/icons/image_default.svg"
// import "./_form.sass"

// utils
import Api from "config/api"
import NoImage from "assets/no_image.png"
import useQuery from "lib/query"
import TextError from "components/formik/textError"

const slugDictionary = {
  corporate_code: "Corporate Code",
  corporate_name: "Corporate Name",
  corporate_type: "Corporate Type",
  corporate_npwp: "NPWP",
  corporate_email: "Email",
  corporate_phone: "Phone",
  country: "Country",
}

const GeneralInfomation = (props) => {
  let api = new Api()
  const isView = useQuery().get("action") === "view"

  const errorMessage = (field) => {
    return `${field} is required.`
  }

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      general_information: {
        corporate_code: "",
        corporate_name: "",
        parent_company: "",
        corporate_type: {
          value: "",
        },
        corporate_npwp: "",
        corporate_contract: {
          date_start: "",
          date_end: "",
        },
      },
      contact_information: {
        corporate_email: "",
        corporate_phone: "",
        corporate_fax: "",
      },
      correspondence_address: {
        address: "",
        country: {
          value: "",
        },
        province: "",
        city: "",
        zipcode: "",
        geo_location: {
          lat: "",
          lng: "",
        },
      },
      billing_address: {
        address: "",
        country: {
          value: "",
        },
        province: "",
        city: "",
        zipcode: "",
        geo_location: {
          lat: "",
          lng: "",
        },
      },
      other_information: {
        website: "",
        internal_remark: "",
        logo: {
          img: "",
          data: {},
        },
      },
    },
    validationSchema: Yup.object({
      general_information: Yup.object({
        corporate_code: Yup.string().required(
          errorMessage(slugDictionary["corporate_code"]),
        ),
        corporate_name: Yup.string().required(
          errorMessage(slugDictionary["corporate_name"]),
        ),
        corporate_type: Yup.object({
          value: Yup.string().required(
            errorMessage(slugDictionary["corporate_type"]),
          ),
        }),
        corporate_npwp: Yup.string().required(
          errorMessage(slugDictionary["corporate_npwp"]),
        ),
      }),
      contact_information: Yup.object({
        corporate_email: Yup.string()
          .required(errorMessage(slugDictionary["corporate_email"]))
          .email("Email is not valid."),
        corporate_phone: Yup.string().required(
          errorMessage(slugDictionary["corporate_phone"]),
        ),
      }),
      correspondence_address: Yup.object({
        country: Yup.object({
          value: Yup.string().required(errorMessage(slugDictionary["country"])),
        }),
      }),
      billing_address: Yup.object({
        country: Yup.object({
          value: Yup.string().required(errorMessage(slugDictionary["country"])),
        }),
      }),
    }),
    onSubmit: (val) => {
      const payload = {
        general_information: {
          corporate_general_information: {
            corporate_code: val.general_information.corporate_code,
            corporate_name: val.general_information.corporate_name,
            parent_corporate_id:
              val.general_information.parent_company?.value || "",
          },
          contact_general_information: {
            email: val.contact_information.corporate_email,
            phone_number: val.contact_information.corporate_phone,
            fax: val.contact_information.corporate_fax,
          },
          correspondence_address: {
            address_line: val.correspondence_address.address,
            country_id: val.correspondence_address.country.value,
            state_province_id: val.correspondence_address.province?.value || "",
            city_id: val.correspondence_address.city?.value || "",
            postal_code: val.correspondence_address.zipcode,
            latitude: Number(val.correspondence_address.geo_location.lat),
            longitude: Number(val.correspondence_address.geo_location.lng),
          },
          billing_address: {
            address_line: val.billing_address.address,
            country_id: val.billing_address.country.value,
            state_province_id: val.billing_address.province?.value || "",
            city_id: val.billing_address.city?.value || "",
            postal_code: val.billing_address.zipcode,
            latitude: Number(val.billing_address.geo_location.lat),
            longitude: Number(val.billing_address.geo_location.lng),
          },
          corporate_asset: {
            multimedia_description: val.other_information.logo.data?.id || "",
          },
          industry_id: val.general_information.corporate_type.value || "",
          website: val.other_information.website,
          internal_remark: val.other_information.internal_remark,
          npwp: val.general_information.corporate_npwp,
          effective_date: val.general_information.corporate_contract.date_start,
          expire_date: val.general_information.corporate_contract.date_end,
        },
      }

      submit(payload)
    },
  })

  const submit = async (payload) => {
    console.log(payload)

    try {
      const res = await api.post("/master/agent-corporates", payload)
      console.log(res)
    } catch (error) {}
  }

  const [optionProvince, setOptionProvince] = useState({
    correspondence: [],
    billing: [],
  })
  const [optionCity, setOptionCity] = useState({
    correspondence: [],
    billing: [],
  })

  const uploadRef = useRef(null)

  // Permanent Country state
  const handleChangeCountry = async (type, v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )

      let options = []

      if (!res.data.items.length) {
        setOptionProvince({
          correspondence: [],
          billing: [],
        })
      }

      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })

          if (type === "correspondence") {
            setOptionProvince({
              correspondence: options,
              billing: [],
            })
          } else {
            setOptionProvince({
              correspondence: [],
              billing: options,
            })
          }
        })
      }

      let res2 = await api.get(
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )

      let optionsCity = []

      if (!res2.data.items.length) {
        setOptionCity({
          correspondence: [],
          billing: [],
        })
      }

      if (res2.data.items.length > 0) {
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })

          if (type === "correspondence") {
            setOptionCity({
              correspondence: optionsCity,
              billing: [],
            })
          } else {
            setOptionCity({
              correspondence: [],
              billing: optionsCity,
            })
          }
        })
      }
    } catch (e) {}
  }

  // Current Province state
  const handleChangeProvince = async (type, province_id, country_id) => {
    try {
      let filters = `[["country_id","=","${country_id}"],["AND"],["status","=",1]]`

      if (
        province_id &&
        province_id !== "00000000-0000-0000-0000-000000000000"
      ) {
        filters = `[["state_province_id","=","${province_id}"],["AND"],["country_id","=","${country_id}"],["AND"],["status","=",1]]`
      }

      let res = await api.get(
        `/master/cities?filters=${filters}&sort=city_name`,
      )

      let options = []

      if (!res.data.items.length) {
        if (type === "correspondence") {
          setOptionCity({
            ...optionCity,
            correspondence: options,
          })
        } else {
          setOptionCity({
            ...optionCity,
            billing: options,
          })
        }
      }

      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          if (type === "correspondence") {
            setOptionCity({
              ...optionCity,
              correspondence: options,
            })
          } else {
            setOptionCity({
              ...optionCity,
              billing: options,
            })
          }
        })
      }
    } catch (e) {}
  }

  const handleUpload = async (e) => {
    try {
      var files = e.target.files[0]
      if (files) {
        var filesize = (files.size / 1024 / 1024).toFixed(4)
        if (filesize > 4) {
          alert("Logo size is more than 4MB.")
          return
        }
        setFieldValue("other_information.logo", URL.createObjectURL(files))
      }
      let payload = new FormData()
      payload.append("files", e.target.files[0])

      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setFieldValue("other_information.logo.img", URL.createObjectURL(files))
        setFieldValue("other_information.logo.data", res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    console.log({ values, errors })
  }, [values, errors])

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{ marginBotton: 0 }}>
        <Card.Body>
          {/* contact information */}
          <h4>PETRO XYZ</h4>
          <br /> {moment().format("DD MMMM YY")}
          <br />
          <div className="Stars" />
          <h3 className="card-heading">Contacts</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={9} lg={9}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Email <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.contact_information.corporate_email}
                      name="contact_information.corporate_email"
                      id="contact_information.corporate_email"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={256}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 300 }}
                      className={
                        touched?.contact_information?.corporate_email &&
                        errors?.contact_information?.corporate_email &&
                        "is-invalid"
                      }
                    />
                    {touched?.contact_information?.corporate_email &&
                      errors?.contact_information?.corporate_email && (
                        <TextError>
                          {errors.contact_information.corporate_email}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Phone <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.contact_information.corporate_phone}
                      name="contact_information.corporate_phone"
                      id="contact_information.corporate_phone"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={36}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 200 }}
                      className={
                        touched?.contact_information?.corporate_phone &&
                        errors?.contact_information?.corporate_phone &&
                        "is-invalid"
                      }
                    />
                    {touched?.contact_information?.corporate_phone &&
                      errors?.contact_information?.corporate_phone && (
                        <TextError>
                          {errors.contact_information.corporate_phone}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Fax
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.contact_information.corporate_fax}
                      name="contact_information.corporate_fax"
                      id="contact_information.corporate_fax"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={36}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 200 }}
                      className={
                        touched?.contact_information?.corporate_fax &&
                        errors?.contact_information?.corporate_fax &&
                        "is-invalid"
                      }
                    />
                    {touched?.contact_information?.corporate_fax &&
                      errors?.contact_information?.corporate_fax && (
                        <TextError>
                          {errors.contact_information.corporate_fax}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* Correspondence Address */}
          <h3 className="card-heading">Correspondence Address</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Address
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <textarea
                      value={values.correspondence_address.address}
                      name="correspondence_address.address"
                      id="correspondence_address.address"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={512}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ resize: "none", maxWidth: 400 }}
                      className={`form-control mb-2 ${
                        touched?.correspondence_address?.address &&
                        errors?.correspondence_address?.address &&
                        "is-invalid"
                      }`}
                    />
                    {touched?.correspondence_address?.address &&
                      errors?.correspondence_address?.address && (
                        <TextError>
                          {errors.correspondence_address.address}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Country <span className="form-label-required">*</span>
                  </Form.Label>

                  <Col lg={9} md={3}>
                    <div style={{ maxWidth: 300 }}>
                      <SelectAsync
                        isClearable
                        name="correspondence_address.country"
                        url={`master/countries`}
                        value={values.correspondence_address.country}
                        placeholder="Please choose"
                        fieldName="country_name"
                        className={`react-select ${
                          touched?.correspondence_address?.country &&
                          errors?.correspondence_address?.country
                            ? "is-invalid"
                            : null
                        }`}
                        onChange={(v) => {
                          if (v) handleChangeCountry("correspondence", v.value)
                          setValues({
                            ...values,
                            correspondence_address: {
                              ...values.correspondence_address,
                              country: {
                                value: v.value,
                                label: v.label,
                              },
                              province: null,
                              city: null,
                            },
                          })
                        }}
                        onBlur={setFieldTouched}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView}
                        invalid={
                          touched?.correspondence_address?.country?.value &&
                          errors?.correspondence_address?.country?.value
                        }
                      />
                      {touched?.correspondence_address?.country?.value &&
                        errors?.correspondence_address?.country?.value && (
                          <TextError>
                            {errors.correspondence_address?.country?.value}
                          </TextError>
                        )}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    State / Province
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        isClearable
                        name="correspondence_address.province"
                        value={values.correspondence_address.province}
                        placeholder="Please choose"
                        options={
                          !values.correspondence_address.country
                            ? []
                            : optionProvince.correspondence
                        }
                        onChange={(v) => {
                          setFieldValue("correspondence_address.province", v)
                          setFieldValue("correspondence_address.city", null)
                          handleChangeProvince(
                            "correspondence",
                            v?.value,
                            values.correspondence_address.country?.value,
                          )
                        }}
                        onBlur={setFieldTouched}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    City
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        name="correspondence_address.city"
                        isClearable
                        value={values.correspondence_address.city}
                        placeholder="Please choose"
                        options={
                          !values.correspondence_address.country
                            ? []
                            : optionCity.correspondence
                        }
                        onChange={(v) => {
                          setFieldValue("correspondence_address.city", v)
                        }}
                        onBlur={setFieldTouched}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Zip Code
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.correspondence_address.zipcode}
                      name="correspondence_address.zipcode"
                      id="correspondence_address.zipcode"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 100 }}
                      className={
                        touched?.correspondence_address?.zipcode &&
                        errors?.correspondence_address?.zipcode &&
                        "is-invalid"
                      }
                    />
                    {touched?.correspondence_address?.zipcode &&
                      errors?.correspondence_address?.zipcode && (
                        <TextError>
                          {errors.correspondence_address.zipcode}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Geo Location
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: 10 }}>
                        <Form.Control
                          type="text"
                          minLength={1}
                          maxLength={16}
                          placeholder="Latitude"
                          style={{ width: 150 }}
                          onChange={handleChange}
                          name="correspondence_address.geo_location.lat"
                          id="correspondence_address.geo_location.lat"
                          disabled={isView}
                          value={values.correspondence_address.geo_location.lat}
                        />
                      </div>
                      <div>
                        <Form.Control
                          type="text"
                          minLength={1}
                          maxLength={16}
                          placeholder="Longitude"
                          style={{ width: 150 }}
                          onChange={handleChange}
                          name="correspondence_address.geo_location.lng"
                          id="correspondence_address.geo_location.lng"
                          disabled={isView}
                          value={values.correspondence_address.geo_location.lng}
                        />
                      </div>
                    </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* Billing Address  */}
          <h3 className="card-heading">Billing Address</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Address
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <textarea
                      value={values.billing_address.address}
                      name="billing_address.address"
                      id="billing_address.address"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={512}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ resize: "none", maxWidth: 400 }}
                      className={`form-control mb-2 ${
                        touched?.correspondence_address?.address &&
                        errors?.correspondence_address?.address &&
                        "is-invalid"
                      }`}
                    />
                    {touched?.correspondence_address?.address &&
                      errors?.correspondence_address?.address && (
                        <TextError>
                          {errors.correspondence_address.address}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Country <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={9} md={3}>
                    <div style={{ maxWidth: 300 }}>
                      <SelectAsync
                        isClearable
                        name="billing_address.country"
                        url={`master/countries`}
                        value={values.billing_address.country}
                        placeholder="Please choose"
                        fieldName="country_name"
                        className={`react-select ${
                          touched?.billing_address?.country &&
                          errors?.billing_address?.country
                            ? "is-invalid"
                            : null
                        }`}
                        onChange={(v) => {
                          if (v) handleChangeCountry("billing", v.value)
                          setValues({
                            ...values,
                            billing_address: {
                              ...values.billing_address,
                              country: {
                                value: v.value,
                                label: v.label,
                              },
                              province: null,
                              city: null,
                            },
                          })
                        }}
                        onBlur={setFieldTouched}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView}
                        invalid={
                          touched?.billing_address?.country?.value &&
                          errors?.billing_address?.country?.value
                        }
                      />
                      {touched?.billing_address?.country?.value &&
                        errors?.billing_address?.country?.value && (
                          <TextError>
                            {errors.billing_address.country?.value}
                          </TextError>
                        )}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    State / Province
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        isClearable
                        name="billing_address.province"
                        value={values.billing_address.province}
                        placeholder="Please choose"
                        options={
                          !values.billing_address.country
                            ? []
                            : optionProvince.billing
                        }
                        onChange={(v) => {
                          setFieldValue("billing_address.province", v)
                          setFieldValue("billing_address.city", null)
                          handleChangeProvince(
                            "billing",
                            v?.value,
                            values.billing_address.country?.value,
                          )
                        }}
                        onBlur={setFieldTouched}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    City
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        name="billing_address.city"
                        isClearable
                        value={values.billing_address.city}
                        placeholder="Please choose"
                        options={
                          !values.billing_address.country
                            ? []
                            : optionCity.billing
                        }
                        onChange={(v) => {
                          setFieldValue("billing_address.city", v)
                        }}
                        onBlur={setFieldTouched}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Zip Code
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.billing_address.zipcode}
                      name="billing_address.zipcode"
                      id="billing_address.zipcode"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 100 }}
                      className={
                        touched?.billing_address?.zipcode &&
                        errors?.billing_address?.zipcode &&
                        "is-invalid"
                      }
                    />
                    {touched?.billing_address?.zipcode &&
                      errors?.billing_address?.zipcode && (
                        <TextError>{errors.billing_address.zipcode}</TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Geo Location
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: 10 }}>
                        <Form.Control
                          type="text"
                          minLength={1}
                          maxLength={16}
                          placeholder="Latitude"
                          style={{ width: 150 }}
                          onChange={handleChange}
                          name="billing_address.geo_location.lat"
                          id="billing_address.geo_location.lat"
                          disabled={isView}
                          value={values.billing_address.geo_location.lat}
                        />
                      </div>
                      <div>
                        <Form.Control
                          type="text"
                          minLength={1}
                          maxLength={16}
                          placeholder="Longitude"
                          style={{ width: 150 }}
                          onChange={handleChange}
                          name="billing_address.geo_location.lng"
                          id="billing_address.geo_location.lng"
                          disabled={isView}
                          value={values.billing_address.geo_location.lng}
                        />
                      </div>
                    </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* Other Information */}
          <h3 className="card-heading">Others</h3>
          <div
            style={{ padding: "0 15px 15px 15px" }}
            className="other_information"
          >
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    NPWP
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.other_information.website}
                      name="other_information.website"
                      id="other_information.website"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={256}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 300 }}
                      className={
                        touched?.other_information?.website &&
                        errors?.other_information?.website &&
                        "is-invalid"
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3} className="mb-2">
                    Website
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.other_information.internal_remark}
                      name="other_information.internal_remark"
                      id="other_information.internal_remark"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={4000}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 300 }}
                      className={`form-control mb-2 ${
                        touched?.other_information?.internal_remark &&
                        errors?.other_information?.internal_remark &&
                        "is-invalid"
                      }`}
                    />
                    {touched?.other_information?.internal_remark &&
                      errors?.other_information?.internal_remark && (
                        <TextError>
                          {errors.other_information.internal_remark}
                        </TextError>
                      )}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="form-group d-flex align-items-start"
                >
                  <Form.Label column sm={3} className="mb-2">
                    Logo
                  </Form.Label>
                  <Col lg={9} md={3} className="d-flex align-items-start">
                    <input
                      name="other_information.logo"
                      id="other_information.logo"
                      type="file"
                      onChange={(e) => handleUpload(e)}
                      className="form-control input-image"
                      accept="image/jpeg,image/jpg,image/png"
                      data-rule-required="true"
                      data-msg-accept="Only .png, .jpg, .jpeg file supported"
                      ref={uploadRef}
                    />
                    {values.other_information.logo.img ? (
                      <img
                        src={values.other_information.logo.img || NoImage}
                        className="image_wrapper"
                        alt="up-img"
                      />
                    ) : (
                      <div
                        className="wrapper d-flex justify-content-center align-items-center cursor-pointer"
                        onClick={() => uploadRef.current.click()}
                      >
                        <img
                          src={ImageDefault}
                          className="default"
                          alt="noimage"
                        />
                      </div>
                    )}
                    <Button
                      variant="light"
                      style={{
                        margin: "0 0 0 30px",
                        backgroundColor: "#fff",
                        border: "1px solid #707070",
                        borderRadius: "8px",
                        padding: "4px 13px",
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#333333",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                      className="button"
                      onClick={() => uploadRef.current.click()}
                    >
                      UPLOAD PHOTO
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          type="submit"
          style={{
            marginRight: 15,
            marginBottom: 50,
            padding: "0 24px",
            backgroundColor: "#31394D",
          }}
        >
          SAVE
        </Button>
        <Button
          variant="secondary"
          // onClick={() => props.history.goBack()}
          style={{ padding: "0 21px" }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

GeneralInfomation.propTypes = {}

export default GeneralInfomation
