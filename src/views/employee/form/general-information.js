import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import DateView from "react-datepicker"
import * as Yup from "yup"
import ImageUploading from "react-images-uploading"
import axios from "axios"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select"
import { default as SelectAsync } from "components/form/select-async"

const GeneralInformation = (props) => {
  const [selectCountry, setSelectCountry] = useState([])
  const [selectProvince, setSelectProvince] = useState([])
  const [selectCity, setSelectCity] = useState([])
  const [photoProfile, setPhotoProfile] = useState([])
  const [optionDay, setOptionDay] = useState([])
  const [optionMonth, setOptionMonth] = useState([])
  const [optionYear, setOptionYear] = useState([])

  const maxNumber = 1

  let api = new Api()

  // Initialize form
  const initialForm = {
    // General Information
    name_prefix_id: "",
    given_name: "",
    middle_name: "",
    surname: "",
    dateOfBirth: [],
    gender_id: "",
    ktp: "",

    // Contacts
    phone_number_home: "",
    phone_number_mobile: "",
    email: "",
    other_email: "",

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
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    name_prefix_id: Yup.object().required("Title is required."),
    given_name: Yup.string().required("Employee First Name is required."),
    middle_name: Yup.string(),
    surname: Yup.string().required("Employee Last Name is required."),

    dateOfBirth: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required("Date of Birth is required."),
          label: Yup.string().required("Date of Birth is required."),
        }),
      )
      .test({
        test: (val) =>
          val.every(({ value, label }, index) => {
            if (index === 0 || index === val.length - 1) {
              return !!value && !!label
            }
            return true
          }),
      }),
    gender_id: Yup.string().required("Gender is required."),
    ktp: Yup.string(),

    // Contacts
    phone_number_home: Yup.string().required("Home Phone is required."),
    phone_number_mobile: Yup.string().required("Mobile Phone is required."),
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
    other_email: Yup.string().email("Email is not valid."),

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
    for (let i = 0; i <= 31; i++) {
      options.push({
        value: i,
        label: i,
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
        value: i + 1,
        label: data,
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
        value: i,
        label: i,
      })
    }

    return options
  }

  // Country state
  const handleChangeCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?filters=["country_id","=","${v}"]`,
      )
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.state_province_name,
          value: data.id,
        })
        setSelectProvince(options)
      })
    } catch (e) {}
  }
  // Province state
  const handleChangeProvince = async (v) => {
    try {
      let res = await api.get(
        `/master/cities?filters=["province_id","=","${v}"]`,
      )
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.state_province_name,
          value: data.id,
        })
        setSelectCity(options)
      })
    } catch (e) {}
  }

  // Upload profile
  const onChangePhotoProfile = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setPhotoProfile(imageList)
  }

  const SelectField = (FieldProps) => {
    return (
      <Select
        options={FieldProps.options}
        placeholder={FieldProps.placeholder}
        {...FieldProps.field}
        onChange={(option) =>
          FieldProps.form.setFieldValue(FieldProps.field.name, option)
        }
      />
    )
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
        setSelectCountry(options)
      })
    } catch (e) {}
  }, [])

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {         
          setSubmitting(true)
          try {
            let res = await api.post("master/persons", {
              //...values,
              name_prefix_id: values.name_prefix_id.value,
              given_name: values.given_name,
              middle_name: values.middle_name,
              surname: values.surname,
              birth_date: new Date(
                ...[
                  values.dateOfBirth[2].value,
                  values.dateOfBirth[1].value,
                  values.dateOfBirth[0].value,
                ],
              ),
              gender_id: values.gender_id,
              ktp: values.ktp,
              //phone_number_home : values.phone_number_home,
              //phone_number_mobile: values.phone_number_mobile,
              email: values.email,
              //other_email: values.other_email,
              address: {
                address_line: values.currentAddress,
                country_id: values.currentCountry.value,
                state_province_id: values.currentProvince.value,
                city_id: values.currentCity.value,
                postal_code: values.currentZipCode,
              },
              permanent_address: {
                address_line: values.permanentAddress,
                country_id: values.permanentCountry.value,
                state_province_id: values.permanentProvince.value,
                city_id: values.permanentCity.value,
                postal_code: values.permanentZipCode,
              },
            })
            console.log(res)            
            setSubmitting(false)
          } catch (e) {}

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
                          <FastField name="name_prefix_id">
                            {({ field, form }) => (
                              <>
                                <div style={{ width: 90 }}>
                                  <Select
                                    {...field}
                                    options={[
                                      {
                                        value:
                                          "db24d53c-7d36-4770-8598-dc36174750af",
                                        label: "Mr.",
                                      },
                                      {
                                        value:
                                          "55287b39-e9e6-4da5-ad9e-c4bb275ccda9",
                                        label: "Mrs.",
                                      },
                                    ]}
                                    defaultValue={values.name_prefix_id}
                                    placeholder="Mr"
                                    className={`react-select ${
                                      form.touched.name_prefix_id &&
                                      form.errors.name_prefix_id
                                        ? "is-invalid"
                                        : null
                                    }`}
                                    onChange={(v) => {
                                      setFieldValue("name_prefix_id", v)
                                    }}
                                  />
                                  {form.touched.name_prefix_id &&
                                    form.errors.name_prefix_id && (
                                      <Form.Control.Feedback type="invalid">
                                        {form.touched.name_prefix_id
                                          ? form.errors.name_prefix_id
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
                          <FastField name="given_name">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  isInvalid={
                                    form.touched.given_name &&
                                    form.errors.given_name
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  {...field}
                                />
                                {form.touched.given_name &&
                                  form.errors.given_name && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.given_name
                                        ? form.errors.given_name
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
                          <FastField name="middle_name">
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
                          <FastField name="surname">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  {...field}
                                  type="text"
                                  isInvalid={
                                    form.touched.surname && form.errors.surname
                                  }
                                  minLength={1}
                                  maxLength={128}
                                />
                                {form.touched.surname &&
                                  form.errors.surname && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.surname
                                        ? form.errors.surname
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
                              <FastField name="dateOfBirth">
                                {({ field, form }) => (
                                  <div style={{ width: 90 }}>
                                    <Select
                                      {...field}
                                      options={selectDay()}
                                      defaultValue={values.dateOfBirth[0]}
                                      onChange={(v) => {
                                        setFieldValue("dateOfBirth[0]", v)
                                      }}
                                    />
                                  </div>
                                )}
                              </FastField>
                            </div>
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <FastField name="dateOfBirth[1]">
                                {({ field, form }) => (
                                  <div style={{ width: 90 }}>
                                    <Select
                                      {...field}
                                      options={selectMonth()}
                                      defaultValue={values.dateOfBirth[1]}
                                      onChange={(v) => {
                                        setFieldValue("dateOfBirth[1]", v)
                                      }}
                                    />
                                  </div>
                                )}
                              </FastField>
                            </div>
                            <div style={{ flex: 1 }}>
                              <FastField name="dateOfBirth[2]">
                                {({ field, form }) => (
                                  <div style={{ width: 90 }}>
                                    <Select
                                      {...field}
                                      options={selectYear()}
                                      defaultValue={values.dateOfBirth[2]}
                                      className={`react-select ${
                                        form.touched.dateOfBirth &&
                                        form.errors.dateOfBirth
                                          ? "is-invalid"
                                          : null
                                      }`}
                                      onChange={(v) => {
                                        setFieldValue("dateOfBirth[2]", v)
                                      }}
                                    />
                                  </div>
                                )}
                              </FastField>
                              <ErrorMessage name="dateOfBirth[]">
                                {(msg) => (
                                  <div
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                          </div>
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
                            <FastField name="gender_id">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  checked={
                                    values.gender_id ===
                                    "db24d53c-7d36-4770-8598-dc36174750af"
                                  }
                                  type="radio"
                                  label="Male"
                                  style={{ marginRight: 30 }}
                                  inline
                                  onChange={() =>
                                    setFieldValue(
                                      "gender_id",
                                      "db24d53c-7d36-4770-8598-dc36174750af",
                                    )
                                  }
                                />
                              )}
                            </FastField>
                            <FastField name="gender_id">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  checked={
                                    values.gender_id ===
                                    "db24d53c-7d36-4770-8598-dc36174750ad"
                                  }
                                  type="radio"
                                  label="Female"
                                  inline
                                  onChange={() =>
                                    setFieldValue(
                                      "gender_id",
                                      "db24d53c-7d36-4770-8598-dc36174750ad",
                                    )
                                  }
                                />
                              )}
                            </FastField>
                          </div>
                          <ErrorMessage name="gender_id">
                            {(msg) => (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          ID Card Number (KTP)
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="ktp">
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
                    <Col sm={3}>
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
                      <FastField name="phone_number_home">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              isInvalid={
                                form.touched.phone_number_home &&
                                form.errors.phone_number_home
                              }
                              minLength={1}
                              maxLength={32}
                            />
                            {form.touched.phone_number_home &&
                              form.errors.phone_number_home && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.phone_number_home
                                    ? form.errors.phone_number_home
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
                      <FastField name="phone_number_mobile">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              isInvalid={
                                form.touched.phone_number_mobile &&
                                form.errors.phone_number_mobile
                              }
                              minLength={1}
                              maxLength={32}
                            />
                            {form.touched.phone_number_mobile &&
                              form.errors.phone_number_mobile && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.phone_number_mobile
                                    ? form.errors.phone_number_mobile
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
                      <FastField name="other_email">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="email"
                              className={
                                form.touched.other_email &&
                                form.errors.other_email
                                  ? "is-invalid"
                                  : null
                              }
                              minLength={1}
                              maxLength={256}
                            />
                            {form.touched.other_email &&
                              form.errors.other_email && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.other_email
                                    ? form.errors.other_email
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
                              <SelectAsync
                                {...field}
                                isDisabled={values.currentCountry == null}
                                url={`master/state-provinces`}
                                urlFilter={`["country_id","=",${values.currentCountry?.value}]`}
                                fieldName="state_province_name"
                                onChange={(v) =>
                                  setFieldValue("currentProvince", v)
                                }
                                placeholder="Please choose"
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
                              <SelectAsync
                                {...field}
                                isDisabled={values.currentProvince == null}
                                url={`master/cities`}
                                urlFilter={`["province_id","=",${values.currentProvince?.value}]`}
                                fieldName="city_name"
                                onChange={(v) =>
                                  setFieldValue("currentCity", v)
                                }
                                placeholder="Please choose"
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
                      {selectCountry.length !== 0 && (
                        <div style={{ width: 300 }}>
                          <Select
                            name="permanentCountry"
                            value={
                              values.sameAddress
                                ? values.currentCountry
                                : values.permanentCountry
                            }
                            placeholder="Please choose"
                            options={selectCountry}
                            className={`react-select ${
                              !values.sameAddress &&
                              (touched.permanentCountry &&
                              errors.permanentCountry
                                ? "is-invalid"
                                : null)
                            }`}
                            onChange={(v) => {
                              setFieldValue("permanentCountry", v)
                              handleChangeCountry(v.value)
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
                          options={selectProvince}
                          onChange={(v) => {
                            setFieldValue("permanentProvince", v)
                            handleChangeProvince(v.value)
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
                          options={selectCity}
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
