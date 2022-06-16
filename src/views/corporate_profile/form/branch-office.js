import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import SelectAsync from "components/form/select-async"
import Select from "components/form/select"
import * as Yup from "yup"
import env from "config/environment"
import Api from "config/api"
import _ from "lodash"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setModalTitle } from "redux/ui-store"

const endpoint = "/master/offices"

function BranchOffice(props) {
  console.log(props)
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Branch Office"
    if (!formId) {
      docTitle = "New Branch Office"
    } else if (isView) {
      docTitle = "Branch Office Details"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let { data } = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          from_currency_id: {
            value: data.from_currency.id,
            label: data.from_currency.currency_name,
          },
          to_currency_id: {
            value: data.to_currency.id,
            label: data.to_currency.currency_name,
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const [selectCurrentProvince, setSelectCurrentProvince] = useState([])
  const [selectCurrentCity, setSelectCurrentCity] = useState([])

  let api = new Api()

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    // General Information
    title: { value: "db24d53c-7d36-4770-8598-dc36174750af", label: "Mr" },
    branchName: "",

    // Contacts
    PhoneNumber: "",
    email: "",

    // Current Address
    currentAddress: "",
    currentCountry: "",
    currentProvince: "",
    currentCity: "",
    currentZipCode: "",
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    title: Yup.object().required("Title is required."),
    branchName: Yup.string().required("Employee First Name is required."),

    // Contacts

    PhoneNumber: Yup.string(),
    email: Yup.string()
      .email("Email is not valid.")
      .test(
        "Unique Email Contacts",
        "Email already exists", // <- key, message
        (value) => {
          let formId = props?.employeeData?.id
          if (formId === undefined) {
            return new Promise((resolve, reject) => {
              axios
                .get(
                  `${env.API_URL}/master/employees?filters=["contact.email","like","${value}"]`,
                )
                .then((res) => {
                  resolve(
                    !res.data.items.find(
                      (e) =>
                        e.contact.email.toUpperCase() === value.toUpperCase(),
                    ),
                  )
                })
                .catch((res, error) => {
                  resolve(
                    res.data.items.find(
                      (e) =>
                        e.contact.email.toUpperCase() === value.toUpperCase(),
                    ),
                  )
                })
            })
          } else {
            return new Promise((resolve, reject) => {
              axios
                .get(
                  `${env.API_URL}/master/employees?filters=["contact.email","like","${value}"]`,
                )
                .then((res) => {
                  resolve(
                    !res.data.items.find(
                      (e) =>
                        e.contact.email.toUpperCase() === value.toUpperCase(),
                    ) || value === initialForm.email,
                  )
                })
                .catch((res, error) => {
                  resolve(
                    res.data.items.find(
                      (e) =>
                        e.contact.email.toUpperCase() === value.toUpperCase(),
                    ),
                  )
                })
            })
          }
        },
      ),

    // Current Address
    currentAddress: Yup.string(),
    currentCountry: Yup.object().required("Country is required."),
    currentProvince: Yup.object().nullable(true),
    currentCity: Yup.object().nullable(true),
    currentZipCode: Yup.string(),
  })

  // Current Country state
  const handleChangeCurrentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })

          setSelectCurrentProvince(options)
        })
      } else {
        setSelectCurrentProvince([])
      }

      let res2 = await api.get(
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const optionsCity = []
      if (res2.data.items.length > 0) {
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })
        })
      } else {
      }
    } catch (e) {}
  }

  // Permanent Country state
  const handleChangePermanentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })
        })
      }
      let res2 = await api.get(
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const optionsCity = []
      if (res2.data.items.length > 0) {
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })
        })
      } else {
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
      const options = []
      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          if (type === "current") {
            setSelectCurrentCity(options)
          }
        })
      } else {
        if (type === "current") {
          setSelectCurrentCity([])
        }
      }
    } catch (e) {}
  }

  const getProvince = async (type, v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })
          if (type === "current") {
            setSelectCurrentProvince(options)
          }
        })
      } else {
        if (type === "current") {
          setSelectCurrentProvince([])
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Upload profile

  useEffect(async () => {
    try {
      let res = await api.get("/master/countries")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.country_name,
          value: data.id,
        })
        // setSelectPermanentCountry(options)
      })
    } catch (e) {}
  }, [])

  // useEffect(async() => {
  //   try {
  //     let res = await api.get("/master/name-prefixes")
  //     const options = []
  //     res.data.items.forEach((data) => {
  //       options.push({
  //         label: data.name_prefix_name,
  //         value: data.id,
  //       })
  //       setSelectNamePrefix(options)
  //     })
  //   } catch(e) {

  //   }
  // }, [])

  useEffect(async () => {
    try {
      if (props.employeeData) {
        let data =
          props.formData && props.formData.given_name
            ? props.formData
            : props.employeeData
        if (data) {
          setInitialForm({
            ...initialForm,
            title: _.isEmpty(data.name_prefix)
              ? ""
              : {
                  ...initialForm.title,
                  value: data.name_prefix.id,
                  label: data.name_prefix.name_prefix_name,
                },
            branchName: data.given_name ? data.given_name : "",

            // Contacts

            PhoneNumber: _.isEmpty(data.contact)
              ? ""
              : data.contact.mobile_phone_number
              ? data.contact.mobile_phone_number
              : "",
            email: _.isEmpty(data.contact)
              ? ""
              : data.contact.email
              ? data.contact.email
              : "",

            // Current Address
            currentAddress: _.isEmpty(data.address)
              ? ""
              : data.address.address_line
              ? data.address.address_line
              : "",
            currentCountry: _.isEmpty(data.address)
              ? ""
              : data.address.country
              ? {
                  value: data.address.country_id,
                  label: data.address.country.country_name,
                }
              : "",
            currentProvince:
              _.isEmpty(data.address?.state_province) ||
              data.address?.state_province_id ===
                "00000000-0000-0000-0000-000000000000"
                ? isView
                  ? {
                      value: "",
                      label: "",
                    }
                  : ""
                : {
                    value: data.address.state_province_id,
                    label: data.address.state_province.state_province_name,
                  },

            currentCity:
              _.isEmpty(data.address?.city) ||
              data.address?.city_id === "00000000-0000-0000-0000-000000000000"
                ? isView
                  ? {
                      value: "",
                      label: "",
                    }
                  : ""
                : {
                    value: data.address.city.id,
                    label: data.address.city.city_name,
                  },

            currentZipCode: _.isEmpty(data.address)
              ? ""
              : data.address.postal_code
              ? data.address.postal_code
              : "",
          })

          getProvince("current", data?.address?.country_id)
          getProvince("permanent", data?.permanent_address?.country_id)

          if (data.permanent_address.state_province) {
            handleChangeProvince(
              "permanent",
              data.permanent_address.state_province.id,
              data.permanent_address.country_id,
            )
          } else {
            handleChangePermanentCountry(data.permanent_address.country_id)
          }

          if (data.address.state_province) {
            handleChangeProvince(
              "current",
              data.address.state_province.id,
              data.address.country_id,
            )
          } else {
            handleChangeCurrentCountry(data.address.country_id)
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }, [props.employeeData, props.formData])

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={validationSchema}
      validator={() => ({})}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        let formatted = {
          address: {
            address_line: values.currentAddress ? values.currentAddress : "",
            country_id: values.currentCountry
              ? values.currentCountry.value
              : "",
            state_province_id: values.currentProvince
              ? values.currentProvince.value
              : "00000000-0000-0000-0000-000000000000",
            city_id: values.currentCity
              ? values.currentCity.value
              : "00000000-0000-0000-0000-000000000000",
            city: values.currentCity,
            state_province: values.currentProvince,
            country: values.currentCountry,
            postal_code: values.currentZipCode ? values.currentZipCode : "",
          },
          contact: {
            email: values.email,
            mobile_phone_number: values.PhoneNumber,
          },

          given_name: values.branchName,

          name_prefix_id: values.title.value,
          permanent_address: values.sameAddress
            ? {
                address_line: values.currentAddress
                  ? values.currentAddress
                  : "",
                country_id: values.currentCountry
                  ? values.currentCountry.value
                  : "",
                state_province_id: values.currentProvince
                  ? values.currentProvince.value
                  : "00000000-0000-0000-0000-000000000000",
                city_id: values.currentCity
                  ? values.currentCity.value
                  : "00000000-0000-0000-0000-000000000000",
                postal_code: values.currentZipCode ? values.currentZipCode : "",
                city: values.currentCity,
                state_province: values.currentProvince,
                country: values.currentCountry,
              }
            : {
                address_line: values.permanentAddress
                  ? values.permanentAddress
                  : "",
                country_id: values.permanentCountry
                  ? values.permanentCountry.value
                  : "",
                state_province_id: values.permanentProvince
                  ? values.permanentProvince.value
                  : "00000000-0000-0000-0000-000000000000",
                city_id: values.permanentCity
                  ? values.permanentCity.value
                  : "00000000-0000-0000-0000-000000000000",
                postal_code: values.permanentZipCode
                  ? values.permanentZipCode
                  : "",
                city: values.permanentCity,
                state_province: values.permanentProvince,
                country: values.permanentCountry,
              },
        }

        await props.onSubmit(formatted)
      }}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div
            style={
              props.isMobile
                ? { padding: "0" }
                : { padding: "0 15px 15px 15px" }
            }
          >
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column md={3} lg={7}>
                    Company/Branch Name{" "}
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={9} lg={5}>
                    <FastField name="branchName" disabled>
                      {({ field, form }) => (
                        <>
                          <Form.Control
                            type="text"
                            disabled={isView}
                            isInvalid={
                              form.touched.branchName && form.errors.branchName
                            }
                            minLength={1}
                            maxLength={128}
                            {...field}
                            style={{ maxWidth: 300 }}
                          />
                          {form.touched.branchName &&
                            form.errors.branchName && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.branchName
                                  ? form.errors.branchName
                                  : null}
                              </Form.Control.Feedback>
                            )}
                        </>
                      )}
                    </FastField>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                Address
              </Form.Label>
              <Col sm={9}>
                <FastField name="currentAddress">
                  {({ field }) => (
                    <Form.Control
                      {...field}
                      as="textarea"
                      rows={3}
                      minLength={1}
                      maxLength={512}
                      disabled={isView}
                      style={{ maxWidth: 416 }}
                    />
                  )}
                </FastField>
              </Col>
            </Form.Group>
          </div>
          <div
            style={
              props.isMobile
                ? { padding: "0 15px 15px 0" }
                : { padding: "0 15px 15px 15px" }
            }
          >
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                Country <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={9}>
                <FastField name="currentCountry">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 300 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        isDisabled={isView}
                        url={`master/countries`}
                        fieldName="country_name"
                        onChange={(v) => {
                          setFieldValue("currentProvince", null)
                          setFieldValue("currentCity", null)
                          setFieldValue("currentCountry", v)
                          if (v) handleChangeCurrentCountry(v.value)
                        }}
                        placeholder="Please choose"
                        className={`react-select ${
                          form.touched.currentCountry &&
                          form.errors.currentCountry
                            ? "is-invalid"
                            : null
                        }`}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                      />
                      {form.touched.currentCountry &&
                        form.errors.currentCountry && (
                          <Form.Control.Feedback type="invalid">
                            {form.touched.currentCountry
                              ? form.errors.currentCountry
                              : null}
                          </Form.Control.Feedback>
                        )}
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                State/ Province
              </Form.Label>
              <Col sm={9}>
                <Field name="currentProvince">
                  {({ field, form }) => (
                    <>
                      {console.log(field, "fi")}
                      <div style={{ maxWidth: 200 }}>
                        <Select
                          {...field}
                          isClearable
                          placeholder="Please choose"
                          options={
                            values.currentCountry === null
                              ? []
                              : selectCurrentProvince
                          }
                          onChange={(v) => {
                            setFieldValue("currentProvince", v)
                            if (v) {
                              setFieldValue("currentCity", "")
                            }
                            handleChangeProvince(
                              "current",
                              v?.value || null,
                              values.currentCountry.value,
                            )
                          }}
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
                    </>
                  )}
                </Field>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                City
              </Form.Label>
              <Col sm={9}>
                <Field name="currentCity">
                  {({ field }) => (
                    <>
                      <div style={{ width: 200 }}>
                        <Select
                          {...field}
                          isClearable
                          placeholder="Please choose"
                          options={
                            values.currentCountry === null
                              ? []
                              : selectCurrentCity
                          }
                          onChange={(v) => {
                            setFieldValue("currentCity", v)
                          }}
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
                    </>
                  )}
                </Field>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                Zip Code
              </Form.Label>
              <Col sm={9}>
                <FastField name="currentZipCode">
                  {({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      minLength={1}
                      maxLength={16}
                      style={{ maxWidth: 100 }}
                      disabled={isView}
                    />
                  )}
                </FastField>
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
                    />
                  </div>
                  <div>
                    <Form.Control
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder="Longitude"
                      style={{ width: 150 }}
                    />
                  </div>
                </div>
              </Col>
            </Form.Group>
          </div>
          <div
            style={
              props.isMobile
                ? { padding: "0 15px 15px 0" }
                : { padding: "0 15px 15px 15px" }
            }
          >
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                Phone Number
              </Form.Label>
              <Col sm={9}>
                <FastField name="PhoneNumber">
                  {({ field, form }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="text"
                        disabled={isView}
                        style={{ maxWidth: 200 }}
                        isInvalid={
                          form.touched.PhoneNumber && form.errors.PhoneNumber
                        }
                        minLength={1}
                        maxLength={32}
                      />
                      {form.touched.PhoneNumber && form.errors.PhoneNumber && (
                        <Form.Control.Feedback type="invalid">
                          {form.touched.PhoneNumber
                            ? form.errors.PhoneNumber
                            : null}
                        </Form.Control.Feedback>
                      )}
                    </>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                Fax
              </Form.Label>
              <Col sm={9}>
                <FastField name="PhoneNumber">
                  {({ field, form }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="text"
                        disabled={isView}
                        style={{ maxWidth: 200 }}
                        isInvalid={
                          form.touched.PhoneNumber && form.errors.PhoneNumber
                        }
                        minLength={1}
                        maxLength={32}
                      />
                      {form.touched.PhoneNumber && form.errors.PhoneNumber && (
                        <Form.Control.Feedback type="invalid">
                          {form.touched.PhoneNumber
                            ? form.errors.PhoneNumber
                            : null}
                        </Form.Control.Feedback>
                      )}
                    </>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <FastField name="email">
                  {({ field, form }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="email"
                        isInvalid={form.touched.email && form.errors.email}
                        minLength={1}
                        maxLength={256}
                        disabled={isView}
                        style={{ maxWidth: 300 }}
                      />
                      {form.touched.email && form.errors.email && (
                        <Form.Control.Feedback type="invalid">
                          {form.touched.email ? form.errors.email : null}
                        </Form.Control.Feedback>
                      )}
                    </>
                  )}
                </FastField>
              </Col>
            </Form.Group>
          </div>

          {props.isMobile ? (
            isView ? (
              <div className="mb-2 mt-1 row justify-content-md-start justify-content-center">
                <Button
                  variant="secondary"
                  onClick={() => props.history.goBack()}
                >
                  BACK
                </Button>
              </div>
            ) : (
              <div className="ml-3 row justify-content-md-start justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    props.finishStep > 0 || props.employeeData?.id
                      ? !isValid || isSubmitting
                      : !dirty || isSubmitting
                  }
                  style={{ marginRight: 15, marginBottom: 40, marginTop: 95 }}
                >
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => props.history.goBack()}
                  style={{ marginRight: 15, marginBottom: 40, marginTop: 95 }}
                >
                  CANCEL
                </Button>
              </div>
            )
          ) : (
            ""
          )}

          {!props.isMobile ? (
            isView ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => props.history.goBack()}
                  className="mt-3"
                >
                  BACK
                </Button>
              </>
            ) : (
              <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    props.finishStep > 0 || props.employeeData?.id
                      ? !isValid || isSubmitting
                      : !dirty || isSubmitting
                  }
                  style={{ marginRight: 15, marginBottom: 135 }}
                >
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => props.history.goBack()}
                >
                  CANCEL
                </Button>
              </div>
            )
          ) : (
            ""
          )}
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(BranchOffice)
