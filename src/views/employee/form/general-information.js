import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import ImageUploading from "react-images-uploading"

import Api from "config/api"
import Select from "components/form/select"

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
    title: { value: "mr", label: "Mr." },
    firstName: "",
    middleName: "",
    lastName: "",
    // dateOfBirth: "",
    gender: "male",
    idCardNumber: "",

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
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    title: Yup.object().required("Title is required."),
    firstName: Yup.string().required("Employee First Name is required."),
    middleName: Yup.string(),
    lastName: Yup.string().required("Employee Last Name is required."),
    // dateOfBirth: Yup.string().required("Date of Birth is required."),
    gender: Yup.string().required("Gender is required."),
    idCardNumber: Yup.string(),

    // Contacts
    homePhone: Yup.string().required("Home Phone is required."),
    mobilePhone: Yup.string().required("Mobile Phone is required."),
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
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
    for (let i = 0; i <= 31; i++) {
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values)

          // setSubmitting(true)

          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          //   resetForm()
          //   setSubmitting(false)
          // }, 500)
        }}
      >
        {({
          values,
          errors,
          touched,
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
                    <Col sm={8}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Title <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="title">
                            {({ field, form }) => (
                              <>
                                <div style={{ width: 90 }}>
                                  <Select
                                    {...field}
                                    options={[
                                      { value: "mr", label: "Mr." },
                                      { value: "mrs", label: "Mrs." },
                                    ]}
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
                                    <div className="invalid-feedback">
                                      {form.touched.title
                                        ? form.errors.title
                                        : null}
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          First Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="firstName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  className={
                                    form.touched.firstName &&
                                    form.errors.firstName
                                      ? "is-invalid"
                                      : null
                                  }
                                  maxLength={128}
                                  {...field}
                                />
                                {form.touched.firstName &&
                                  form.errors.firstName && (
                                    <div className="invalid-feedback">
                                      {touched.firstName
                                        ? errors.firstName
                                        : null}
                                    </div>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Middle Name
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="middleName">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                maxLength={128}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Last Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="lastName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  {...field}
                                  type="text"
                                  className={
                                    form.touched.lastName &&
                                    form.errors.lastName
                                      ? "is-invalid"
                                      : null
                                  }
                                  maxLength={128}
                                />
                                {form.touched.lastName &&
                                  form.errors.lastName && (
                                    <div className="invalid-feedback">
                                      {form.touched.lastName
                                        ? form.errors.lastName
                                        : null}
                                    </div>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      {/* <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Date Of Birth{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <div style={{ width: 300, display: "flex" }}>
                            <div style={{ marginRight: 12 }}>
                              <Select
                                options={selectDay()}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                              />
                            </div>
                            <div style={{ marginRight: 12 }}>
                              <Select
                                options={selectMonth()}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                              />
                            </div>
                            <div>
                              <Select
                                options={selectYear()}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                              />
                            </div>
                          </div>
                          {touched.title && Boolean(errors.title) && (
                            <div className="invalid-feedback">
                              {touched.title ? errors.title : ""}
                            </div>
                          )}
                        </Col>
                      </Form.Group> */}
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Gender <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
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
                                  checked={values.gender === "male"}
                                  type="radio"
                                  label="Male"
                                  className={
                                    form.touched.gender && form.errors.gender
                                      ? "is-invalid"
                                      : null
                                  }
                                  style={{ marginRight: 30 }}
                                  inline
                                  onChange={() =>
                                    setFieldValue("gender", "male")
                                  }
                                />
                              )}
                            </FastField>
                            <FastField name="gender">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  checked={values.gender === "female"}
                                  type="radio"
                                  label="Female"
                                  className={
                                    form.touched.gender && form.errors.gender
                                      ? "is-invalid"
                                      : null
                                  }
                                  inline
                                  onChange={() =>
                                    setFieldValue("gender", "female")
                                  }
                                />
                              )}
                            </FastField>
                            {touched.gender && errors.gender && (
                              <div className="invalid-feedback">
                                {touched.gender ? errors.gender : null}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          ID Card Number (KTP)
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="idCardNumber">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                maxLength={36}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <div className="img-profile-wrapper">
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
                          >
                            {({ imageList, onImageUpload, onImageUpdate }) => (
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
                                  {photoProfile.length !== 0
                                    ? "CHANGE"
                                    : "UPLOAD"}{" "}
                                  PHOTO
                                </Button>
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
                    <Form.Label column sm={2}>
                      Home Phone <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="homePhone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              className={
                                form.touched.homePhone && form.errors.homePhone
                                  ? "is-invalid"
                                  : null
                              }
                              maxLength={32}
                            />
                            {form.touched.homePhone &&
                              form.errors.homePhone && (
                                <div className="invalid-feedback">
                                  {form.touched.homePhone
                                    ? form.errors.homePhone
                                    : null}
                                </div>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Mobile Phone{" "}
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="mobilePhone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              className={
                                form.touched.mobilePhone &&
                                form.errors.mobilePhone
                                  ? "is-invalid"
                                  : null
                              }
                              maxLength={32}
                            />
                            {form.touched.mobilePhone &&
                              form.errors.mobilePhone && (
                                <div className="invalid-feedback">
                                  {form.touched.mobilePhone
                                    ? form.errors.mobilePhone
                                    : null}
                                </div>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Email <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="email">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="email"
                              className={
                                form.touched.email && form.errors.email
                                  ? "is-invalid"
                                  : null
                              }
                              maxLength={256}
                            />
                            {form.touched.email && form.errors.email && (
                              <div className="invalid-feedback">
                                {form.touched.email ? form.errors.email : null}
                              </div>
                            )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Other Email
                    </Form.Label>
                    <Col sm={10}>
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
                              maxLength={256}
                            />
                            {form.touched.otherEmail &&
                              form.errors.otherEmail && (
                                <div className="invalid-feedback">
                                  {form.touched.otherEmail
                                    ? form.errors.otherEmail
                                    : null}
                                </div>
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
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="currentAddress">
                        {({ field }) => (
                          <Form.Control
                            {...field}
                            as="textarea"
                            rows={3}
                            maxLength={512}
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Country <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      {selectCountry.length !== 0 && (
                        <FastField name="currentCountry">
                          {({ field, form }) => (
                            <>
                              <div style={{ width: 300 }}>
                                <Select
                                  {...field}
                                  placeholder="Please choose"
                                  options={selectCountry}
                                  className={`react-select ${
                                    form.touched.currentCountry &&
                                    form.errors.currentCountry
                                      ? "is-invalid"
                                      : null
                                  }`}
                                  onChange={(v) => {
                                    setFieldValue("currentCountry", v)
                                    handleChangeCountry(v.value)
                                    // if (values.currentProvince !== "") {
                                    //   setFieldValue("currentProvince", "")
                                    // }
                                  }}
                                  onBlur={setFieldTouched}
                                />
                                {form.touched.currentCountry &&
                                  form.errors.currentCountry && (
                                    <div className="invalid-feedback">
                                      {form.touched.currentCountry
                                        ? form.errors.currentCountry
                                        : null}
                                    </div>
                                  )}
                              </div>
                            </>
                          )}
                        </FastField>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      State/ Province
                    </Form.Label>
                    <Col sm={10}>
                      <div style={{ width: 300 }}>
                        <Select
                          name="currentProvince"
                          placeholder="Please choose"
                          options={selectProvince}
                          onChange={(v) => {
                            setFieldValue("currentProvince", v)
                            handleChangeProvince(v.value)
                          }}
                          onBlur={setFieldTouched}
                          isDisabled={values.currentCountry == ""}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      City
                    </Form.Label>
                    <Col sm={10}>
                      <div style={{ width: 300 }}>
                        <Select
                          name="currentCity"
                          placeholder="Please choose"
                          options={selectCity}
                          onChange={(v) => {
                            setFieldValue("currentCity", v)
                          }}
                          onBlur={setFieldTouched}
                          isDisabled={values.currentProvince == ""}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      ZIP Code
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="currentZipCode">
                        {({ field }) => (
                          <Form.Control {...field} type="text" maxLength={16} />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Permanent Address</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Col sm={10}>
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
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="permanentAddress"
                        as="textarea"
                        rows={3}
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
                    <Form.Label column sm={2}>
                      Country <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
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
                                  <div className="invalid-feedback">
                                    {touched.permanentCountry
                                      ? errors.permanentCountry
                                      : null}
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      State/ Province
                    </Form.Label>
                    <Col sm={10}>
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
                    <Form.Label column sm={2}>
                      City
                    </Form.Label>
                    <Col sm={10}>
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
                    <Form.Label column sm={2}>
                      ZIP Code
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="permanentZipCode"
                        type="text"
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
