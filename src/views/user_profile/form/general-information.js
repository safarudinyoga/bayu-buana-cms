import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import ImageUploading from "react-images-uploading"
import axios from "axios"
import _ from "lodash"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select"
import { default as SelectAsync } from "components/form/select-async"

const GeneralInformation = (props) => {
  const [selectCurrentProvince, setSelectCurrentProvince] = useState([])
  const [selectCurrentCity, setSelectCurrentCity] = useState([])
  const [selectPermanentCountry, setSelectPermanentCountry] = useState([])
  const [selectPermanentProvince, setSelectPermanentProvince] = useState([])
  const [selectPermanentCity, setSelectPermanentCity] = useState([])
  const [selectNamePrefix, setSelectNamePrefix] = useState([])
  const [photoProfile, setPhotoProfile] = useState([])
  const maxNumber = 1
  let api = new Api()

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    // General Information
    title: { value: "db24d53c-7d36-4770-8598-dc36174750af", label: "Mr" },
    firstName: "",
    middleName: "",
    lastName: "",
    // dateOfBirth: "",
    gender: "male",
    idCardNumber: "",
    dobDay: { value: 1, label: 1 },
    dobMonth: { value: 1, label: "January" },
    dobYear: { value: 1921, label: 1921 },

    // Contacts
    homePhone: "",
    mobilePhone: "",
    email: "",
    otherEmail: "",

    // Current Address
    currentAddress: "",
    currentCountry: "",
    currentProvince: "",
    currentCity: "",
    currentZipCode: "",

    // Permanent Address
    sameAddress: false,
    permanentAddress: "",
    permanentCountry: "",
    permanentProvince: "",
    permanentCity: "",
    permanentZipCode: "",
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    title: Yup.object().required("Title is required."),
    firstName: Yup.string().required("First Name is required."),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required."),
    // dateOfBirth: Yup.string().required("Date of Birth is required."),
    gender: Yup.string().required("Gender is required."),
    idCardNumber: Yup.string(),

    // Contacts
    homePhone: Yup.string().required("Home Phone is required."),
    mobilePhone: Yup.string().required("Mobile Phone is required."),
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required.")
      .test(
        "Unique Email Contacts",
        "Email already exists", // <- key, message
        (value) => {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${env.API_URL}/master/employees?filters=["email","=","${value}"]`,
              )
              .then((res) => {
                resolve(res.data.items.length == 0)
              })
              .catch((error) => {
                resolve(false)
              })
          })
        },
      ),
    otherEmail: Yup.string().email("Email is not valid."),

    // Current Address
    currentAddress: Yup.string(),
    currentCountry: Yup.object().required("Country is required."),
    currentProvince: Yup.object(),
    currentCity: Yup.object(),
    currentZipCode: Yup.string(),

    // Permanent Address
    sameAddress: Yup.boolean(),
    permanentAddress: Yup.string(),
    permanentCountry: Yup.object().when("sameAddress", {
      is: false,
      then: Yup.object().required("Country is required."),
    }),
    permanentProvince: Yup.object(),
    permanentCity: Yup.object(),
    permanentZipCode: Yup.string(),
  })

  // Birthday
  const selectDay = () => {
    const options = []
    for (let i = 1; i <= 31; i++) {
      options.push({
        label: i,
        value: i,
      })
    }
    return options
  }
  const selectMonth = () => {
    const options = []
    const month = Array.from({ length: 12 }, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "long",
      })
    })
    month.forEach((data, i) => {
      options.push({
        label: data,
        value: i + 1,
      })
    })
    return options
  }
  const selectYear = () => {
    const options = []

    const startYear = 1921
    const endYear = new Date().getFullYear()

    for (let i = endYear; i >= startYear; i--) {
      options.push({
        label: i,
        value: i,
      })
    }

    return options
  }

  // Current Country state
  const handleChangeCurrentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?filters=["country_id","=","${v}"]`,
      )
      const options = []
      if(res.data.items.length > 0){
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
      
    } catch (e) {}
  }

  // Permanent Country state
  const handleChangePermanentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?filters=["country_id","=","${v}"]`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })
          
          setSelectPermanentProvince(options)
        })
      } else {
        setSelectPermanentProvince([])
      }
      
    } catch (e) {}
  }
  // Current Province state
  const handleChangeCurrentProvince = async (v) => {
    try {
      let res = await api.get(
        `/master/cities?filters=["state_province_id","=","${v}"]`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          setSelectCurrentCity(options)
        })
      } else {
        setSelectCurrentCity([])
      }
      
    } catch (e) {}
  }
  // Permanent Province state
  const handleChangePermanentProvince = async (v) => {
    try {
      let res = await api.get(
        `/master/cities?filters=["state_province_id","=","${v}"]`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          setSelectPermanentCity(options)
        })
      } else {
        setSelectPermanentCity([])
      }
      
    } catch (e) {}
  }

  // Upload profile
  const onChangePhotoProfile = (imageList, addUpdateIndex) => {
    // data for submit
    setPhotoProfile(imageList)
  }

  useEffect(async () => {
    try {
      let res = await api.get("/master/countries")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.country_name,
          value: data.id,
        })
        setSelectPermanentCountry(options)
      })
    } catch (e) {}
  }, [])

  useEffect(async() => {
    try {
      let res = await api.get("/master/name-prefixes")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.name_prefix_name,
          value: data.id,
        })
        setSelectNamePrefix(options)
      })
    } catch(e) {

    }
  }, [])

  useEffect(async () => {
    try {
      let res = await api.get("/user/profile")
      let data = res.data;
      setInitialForm({
        ...initialForm,
        title: _.isEmpty(data.name_prefix) ? "" : {
          ...initialForm.title,
          value: data.name_prefix.id,
          label: data.name_prefix.name_prefix_name
        },
        firstName: data.given_name ? data.given_name : "",
        middleName: data.middle_name ? data.middle_name : "",
        lastName: data.surname ? data.surname : "",
        gender: _.isEmpty(data.gender) ? "" : data.gender.id,
        idCardNumber: data.ktp ? data.ktp : "",
        dobDay: data.birth_date ? {
          value: parseInt(data.birth_date.split("-")[2]),
          label: parseInt(data.birth_date.split("-")[2]), 
        } : {
          value: 1,
          label: 1,
        },
        dobMonth: data.birth_date ? {
          value: parseInt(data.birth_date.split("-")[1]),
          label: new Date(null, parseInt(data.birth_date.split("-")[1]), null).toLocaleDateString("en", {
            month: "long",
          }), 
        }: {
          value: 1,
          label: 1,
        },
        dobYear: data.birth_date ? {
          value: parseInt(data.birth_date.split("-")[0]),
          label: parseInt(data.birth_date.split("-")[0]),  
        } : {
          value: 1921,
          label: 1921,
        },
        
        // Contacts
        homePhone: _.isEmpty(data.contact) ? "" : data.contact.phone_number ? data.contact.phone_number : "",
        mobilePhone: _.isEmpty(data.contact) ? "" : data.contact.mobile_phone_number ? data.contact.mobile_phone_number : "",
        email: _.isEmpty(data.contact) ? "" : data.contact.email ? data.contact.email : "",
        otherEmail: _.isEmpty(data.contact) ? "" : data.contact.other_email ? data.contact.other_email : "",

        // Current Address
        currentAddress: _.isEmpty(data.address) ? "" : data.address.address_line ? data.address.address_line : "",
        currentCountry: _.isEmpty(data.address) ? "" : data.address.country ? {
          value: data.address.country_id,
          label: data.address.country.country_name
        } : "",
        currentProvince: _.isEmpty(data.address) ? "" : data.address.state_province ? {
          value: data.address.state_province_id,
          label: data.address.state_province.state_province_name
        } : "",
        currentCity: _.isEmpty(data.address) ? "" : data.address.city ? {
          value: data.address.city.id,
          label: data.address.city.city_name
        } : "",
        currentZipCode: _.isEmpty(data.address) ? "" : data.address.postal_code ? data.address.postal_code : "",

        // Permanent Address
        sameAddress: (
          data.permanent_address.address_line == data.address.address_line && 
          data.permanent_address.country_id == data.address.country_id &&
          data.permanent_address.city_id == data.address.city_id &&
          data.permanent_address.state_province_id == data.address.state_province_id &&
          data.permanent_address.postal_code == data.address.postal_code
        ) ? true : false,
        permanentAddress: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.address_line ? data.permanent_address.address_line : "",
        permanentCountry: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.country ? {
          value: data.permanent_address.country_id,
          label: data.permanent_address.country.country_name,
        } : "",
        permanentProvince: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.state_province ? {
          value: data.permanent_address.state_province_id,
          label: data.permanent_address.state_province.state_province_name,
        } : "",
        permanentCity: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.city ? {
          value: data.permanent_address.city_id,
          label: data.permanent_address.city.city_name
        } : "",
        permanentZipCode: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.postal_code ? data.permanent_address.postal_code : ""
      });
    } catch(e) {}
  }, [])

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let day = values.dobDay.value < 10 ? ("0"+values.dobDay.value) : values.dobDay.value;
          let month = values.dobMonth.value < 10 ? ("0"+values.dobMonth.value) : values.dobMonth.value;
          let year = values.dobYear.value;

          let formatted = {
            address: {
              address_line: values.currentAddress ? values.currentAddress : "",
              country_id: values.currentCountry ? values.currentCountry.value : "",
              state_province_id: values.currentProvince ? values.currentProvince.value : "",
              city_id: values.currentCity ? values.currentCity.value : {},
              postal_code: values.currentZipCode ? values.currentZipCode : ""
            },
            contact: {
              email: values.email,
              mobile_phone_number: values.mobilePhone,
              other_email: values.otherEmail,
              phone_number: values.homePhone
            },
            ktp: values.idCardNumber,
            given_name: values.firstName,
            middle_name: values.middleName,
            surname: values.lastName,
            birth_date: year+"-"+month+"-"+day,
            name_prefix_id: values.title.value,
            gender_id: values.gender,
            permanent_address: values.sameAddress ? {
              address_line: values.currentAddress ? values.currentAddress : "",
              country_id: values.currentCountry ? values.currentCountry.value : "",
              state_province_id: values.currentProvince ? values.currentProvince.value : "",
              city_id: values.currentCity ? values.currentCity.value : "",
              postal_code: values.currentZipCode ? values.currentZipCode : ""
            } : {
              address_line: values.permanentAddress ? values.permanentAddress : "",
              country_id: values.permanentCountry ? values.permanentCountry.value : "",
              state_province_id: values.permanentProvince ? values.permanentProvince.value : "",
              city_id: values.permanentCity ? values.permanentCity.value : "",
              postal_code: values.permanentZipCode ? values.permanentZipCode : "" 
            }
          }
          console.log(formatted);

          let res = await api.put("user/profile", formatted)
          return props.handleSelectTab("emergency-contacts")
        }}
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
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <h3 className="card-heading">General Information</h3>
                <div style={{ padding: "0 15px 15px" }}>
                  <Row>
                    <Col sm={9}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Title <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="title">
                            
                            {({ field, form }) => (
                              <>
                                <div style={{ width: 90 }}>
                                  <Select
                                    {...field}
                                    options={selectNamePrefix}
                                    defaultValue={values.title}
                                    className={`react-select ${
                                      form.touched.title && form.errors.title
                                        ? "is-invalid"
                                        : null
                                    }`}
                                    onChange={(v) => {
                                      setFieldValue("title", v)
                                    }}
                                  />
                                  {form.touched.title && form.errors.title && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.title
                                        ? form.errors.title
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                                </div>
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          First Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="firstName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  isInvalid={
                                    form.touched.firstName &&
                                    form.errors.firstName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  {...field}
                                />
                                {form.touched.firstName &&
                                  form.errors.firstName && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.firstName
                                        ? form.errors.firstName
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Middle Name
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="middleName">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                minLength={1}
                                maxLength={128}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Last Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="lastName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  {...field}
                                  type="text"
                                  isInvalid={
                                    form.touched.lastName &&
                                    form.errors.lastName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                />
                                {form.touched.lastName &&
                                  form.errors.lastName && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.lastName
                                        ? form.errors.lastName
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Date Of Birth{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <div style={{ width: 400, display: "flex" }}>
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <Select
                                options={selectDay()}
                                value={values.dobDay}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                                onChange={(v) => {
                                  setFieldValue("dobDay", v)
                                }}
                              />
                            </div>
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <Select
                                options={selectMonth()}
                                value={values.dobMonth}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                                onChange={(v) => {
                                  setFieldValue("dobMonth", v)
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <Select
                                options={selectYear()}
                                value={values.dobYear}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                                onChange={(v) => {
                                  setFieldValue("dobYear", v)
                                }}
                              />
                            </div>
                          </div>
                          {touched.title && Boolean(errors.title) && (
                            <div className="invalid-feedback">
                              {touched.title ? errors.title : ""}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Gender <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <div
                            style={{
                              height: 38,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FastField name="gender">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  checked={values.gender === "db24d53c-7d36-4770-8598-dc36174750af"}
                                  type="radio"
                                  label="Male"
                                  isInvalid={
                                    form.touched.gender && form.errors.gender
                                  }
                                  style={{ marginRight: 30 }}
                                  inline
                                  onChange={() =>
                                    setFieldValue("gender", "db24d53c-7d36-4770-8598-dc36174750af")
                                  }
                                />
                              )}
                            </FastField>
                            <FastField name="gender">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  checked={values.gender === "db24d53c-7d36-4770-8598-dc36174750ad"}
                                  type="radio"
                                  label="Female"
                                  isInvalid={
                                    form.touched.gender && form.errors.gender
                                  }
                                  inline
                                  onChange={() =>
                                    setFieldValue("gender", "db24d53c-7d36-4770-8598-dc36174750ad")
                                  }
                                />
                              )}
                            </FastField>
                            {touched.gender && errors.gender && (
                              <Form.Control.Feedback type="invalid">
                                {touched.gender ? errors.gender : null}
                              </Form.Control.Feedback>
                            )}
                          </div>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          ID Card Number (KTP)
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="idCardNumber">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                minLength={1}
                                maxLength={36}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={3} style={{ height: 170 }}>
                      <div
                        className="img-profile-wrapper"
                        style={{ textAlign: "center" }}
                      >
                        <div>
                          {photoProfile.length == 0 && (
                            <Image
                              src="/img/media/profile.svg"
                              className="img-profile"
                              roundedCircle
                            />
                          )}
                          <ImageUploading
                            value={photoProfile}
                            onChange={onChangePhotoProfile}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["png", "jpg", "jpeg"]}
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageUpdate,
                              errors,
                            }) => (
                              // write your building UI
                              <>
                                {imageList.map((image, index) => (
                                  <div key={index} className="image-item">
                                    <Image
                                      src={image["data_url"]}
                                      roundedCircle
                                      className="img-profile"
                                    />
                                  </div>
                                ))}
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    photoProfile.length !== 0
                                      ? onImageUpload()
                                      : onImageUpdate(1)
                                  }
                                >
                                  {/* {photoProfile.length !== 0
                                    ? "CHANGE"
                                    : "UPLOAD"}                                */}
                                  User Profile Image
                                </Button>
                                {errors && (
                                  <>
                                    {errors.acceptType && (
                                      <p className="img-error-label">
                                        Only .png, .jpg, .jpeg file supported
                                      </p>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </ImageUploading>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <h3 className="card-heading">Contacts</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Home Phone <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="homePhone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              isInvalid={
                                form.touched.homePhone && form.errors.homePhone
                              }
                              minLength={1}
                              maxLength={32}
                            />
                            {form.touched.homePhone &&
                              form.errors.homePhone && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.homePhone
                                    ? form.errors.homePhone
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
                      Mobile Phone{" "}
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="mobilePhone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              isInvalid={
                                form.touched.mobilePhone &&
                                form.errors.mobilePhone
                              }
                              minLength={1}
                              maxLength={32}
                            />
                            {form.touched.mobilePhone &&
                              form.errors.mobilePhone && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.mobilePhone
                                    ? form.errors.mobilePhone
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
                      Email <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="email">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="email"
                              isInvalid={
                                form.touched.email && form.errors.email
                              }
                              minLength={1}
                              maxLength={256}
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
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Other Email
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="otherEmail">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="email"
                              className={
                                form.touched.otherEmail &&
                                form.errors.otherEmail
                                  ? "is-invalid"
                                  : null
                              }
                              minLength={1}
                              maxLength={256}
                            />
                            {form.touched.otherEmail &&
                              form.errors.otherEmail && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.otherEmail
                                    ? form.errors.otherEmail
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Current Address</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
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
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Country
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="currentCountry">
                        {({ field, form }) => (
                          <div style={{ width: 300 }}>
                            <SelectAsync
                              {...field}
                              url={`master/countries`}
                              fieldName="country_name"
                              onChange={(v) => {
                                setFieldValue("currentCountry", v)
                                setFieldValue("currentProvince", null)
                                setFieldValue("currentCity", null)
                                handleChangeCurrentCountry(v.value)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.currentCountry &&
                                form.errors.currentCountry
                                  ? "is-invalid"
                                  : null
                              }`}
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
                      State/Province
                    </Form.Label>
                    <Col sm={9}>
                      <Field name="currentProvince">
                        {({ field, form }) => (
                          <>
                            <div style={{ width: 200 }}>
                              {/* <SelectAsync
                                {...field}
                                isDisabled={values.currentCountry == null}
                                url={`master/state-provinces`}
                                urlFilter={`["country_id","=","${values.currentCountry?.value}"]`}
                                fieldName="state_province_name"
                                onChange={(v) =>
                                  setFieldValue("currentProvince", v)
                                }
                                placeholder="Please choose"
                              /> */}
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCurrentProvince}
                                onChange={(v) => {
                                  setFieldValue("currentProvince", v)
                                  handleChangeCurrentProvince(v.value)
                                }}
                                isDisabled={values.currentCountry == null}
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
                              {/* <SelectAsync
                                {...field}
                                isDisabled={values.currentProvince == null}
                                url={`master/cities`}
                                urlFilter={`["state_province_id","=","${values.currentProvince?.value}"]`}
                                fieldName="city_name"
                                onChange={(v) =>
                                  setFieldValue("currentCity", v)
                                }
                                placeholder="Please choose"
                              /> */}
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCurrentCity}
                                onChange={(v) => {
                                  setFieldValue("currentCity", v)
                                }}
                                isDisabled={values.currentProvince == null}
                              />
                            </div>
                          </>
                        )}
                      </Field>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      ZIP Code
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="currentZipCode">
                        {({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            minLength={1}
                            maxLength={16}
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Permanent Address</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Col sm={9}>
                      <Form.Check
                        type="checkbox"
                        label="Same As Current Address"
                        name="sameAddress"
                        checked={values.sameAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Address
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="permanentAddress"
                        as="textarea"
                        rows={3}
                        minLength={1}
                        maxLength={512}
                        value={
                          values.sameAddress
                            ? values.currentAddress
                            : values.permanentAddress
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={values.sameAddress}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Country <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      {selectPermanentCountry.length !== 0 && (
                        <div style={{ width: 300 }}>
                          <SelectAsync
                            name="permanentCountry"
                            url={`master/countries`}
                            value={
                              values.sameAddress
                                ? values.currentCountry
                                : values.permanentCountry
                            }
                            placeholder="Please choose"
                            fieldName="country_name"
                            // options={selectCountry}
                            className={`react-select ${
                              !values.sameAddress &&
                              (touched.permanentCountry &&
                              errors.permanentCountry
                                ? "is-invalid"
                                : null)
                            }`}
                            onChange={(v) => {
                              setFieldValue("permanentCountry", v)
                              setFieldValue("permanentProvince", null)
                              setFieldValue("permanentCity", null)
                              handleChangePermanentCountry(v.value)
                            }}
                            onBlur={setFieldTouched}
                            isDisabled={values.sameAddress}
                          />
                          {!values.sameAddress && (
                            <>
                              {touched.permanentCountry &&
                                errors.permanentCountry && (
                                  <Form.Control.Feedback type="invalid">
                                    {touched.permanentCountry
                                      ? errors.permanentCountry
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </>
                          )}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      State/ Province
                    </Form.Label>
                    <Col sm={9}>
                      <div style={{ width: 300 }}>
                        <Select
                          name="permanentProvince"
                          value={
                            values.sameAddress
                              ? values.currentProvince
                              : values.permanentProvince
                          }
                          placeholder="Please choose"
                          options={selectPermanentProvince}
                          onChange={(v) => {
                            setFieldValue("permanentProvince", v)
                            handleChangePermanentProvince(v.value)
                          }}
                          onBlur={setFieldTouched}
                          isDisabled={
                            values.permanentCountry == "" || values.sameAddress
                          }
                        />
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      City
                    </Form.Label>
                    <Col sm={9}>
                      <div style={{ width: 300 }}>
                        <Select
                          name="permanentCity"
                          value={
                            values.sameAddress
                              ? values.currentCity
                              : values.permanentCity
                          }
                          placeholder="Please choose"
                          options={selectPermanentCity}
                          onChange={(v) => {
                            setFieldValue("permanentCity", v)
                          }}
                          onBlur={setFieldTouched}
                          isDisabled={
                            values.permanentProvince == "" || values.sameAddress
                          }
                        />
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      ZIP Code
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="permanentZipCode"
                        type="text"
                        minLength={1}
                        maxLength={16}
                        value={
                          values.sameAddress
                            ? values.currentZipCode
                            : values.permanentZipCode
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={values.sameAddress}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE & NEXT
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push(props.backUrl)}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GeneralInformation
