import React, { useEffect, useState } from "react"
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Image,
  Modal,
  CloseButton,
} from "react-bootstrap"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import TextError from "components/formik/textError"
import FormikControl from "../../../components/formik/formikControl"
import * as Yup from "yup"
import ImageUploading from "react-images-uploading"
import axios from "axios"
import _ from "lodash"
import "./user-profile.scss"
import { useWindowSize } from "rooks"
import { ReactSVG } from "react-svg"
import Dropzone from "react-dropzone-uploader"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"
import DatePicker from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"
import Icon from "react-multi-date-picker/components/icon"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import { auto } from "@popperjs/core"
import { useHistory } from "react-router"

const options = {
  position: "bottom-right",
}

const GeneralInformation = (props) => {
  const isView = useQuery().get("action") === "view"
  const history = useHistory()
  const [selectCurrentProvince, setSelectCurrentProvince] = useState([])
  const [selectCurrentCity, setSelectCurrentCity] = useState([])
  const [selectPermanentProvince, setSelectPermanentProvince] = useState([])
  const [selectPermanentCity, setSelectPermanentCity] = useState([])
  const [photoProfile, setPhotoProfile] = useState([])

  const [openSnackbar] = useSnackbar(options)
  let api = new Api()

  //upload file
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const ImageUploader = () => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
      return { url: "https://httpbin.org/post" }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
      console.log(status, meta, file)
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map((f) => f.meta))
      allFiles.forEach((f) => f.remove())
    }

    return (
      <Dropzone
        getUploadParams={(e) => console.log(e)}
        onChangeStatus={(e) => console.log(e)}
        onSubmit={(e) => console.log(e)}
        accept="image/*,audio/*,pdf/*"
        inputContent={
          <div className="form-uploader">
            <ReactSVG src="/img/icons/upload.svg" />
            <p className="title">Drag your file here, or browse</p>
          </div>
        }
      />
    )
  }

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    // General Information
    title: { value: "db24d53c-7d36-4770-8598-dc36174750af", label: "Mr" },
    firstName: "",
    middleName: "",
    lastName: "",

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

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const phoneRegExp = /^\d+$/

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    title: Yup.object(),
    firstName: Yup.string(),
    middleName: Yup.string(),
    lastName: Yup.string(),

    // Contacts
    homePhone: Yup.string()
      .required("Home Phone is required.")
      .matches(phoneRegExp, "Home Phone is not valid"),
    mobilePhone: Yup.string()
      .required("Mobile Phone is required.")
      .matches(phoneRegExp, "Mobile Phone is not valid"),
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required.")
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
    otherEmail: Yup.string().email("Email is not valid."),

    // Current Address
    currentAddress: Yup.string(),
    currentCountry: Yup.object().required("Country is required."),
    currentProvince: Yup.object().nullable(true),
    currentCity: Yup.object().nullable(true),
    currentZipCode: Yup.string(),

    // Permanent Address
    sameAddress: Yup.boolean(),
    permanentAddress: Yup.string(),
    permanentCountry: Yup.object().when("sameAddress", {
      is: false,
      then: Yup.object().required("Country is required."),
    }),
    permanentProvince: Yup.object().nullable(true),
    permanentCity: Yup.object().nullable(true),
    permanentZipCode: Yup.string(),
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

          setSelectPermanentProvince(options)
        })
      } else {
        setSelectPermanentProvince([])
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

          setSelectPermanentCity(optionsCity)
        })
      } else {
        setSelectPermanentCity([])
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
          } else {
            setSelectPermanentCity(options)
          }
        })
      } else {
        if (type === "current") {
          setSelectCurrentCity([])
        } else {
          setSelectPermanentCity([])
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
          } else {
            setSelectPermanentProvince(options)
          }
        })
      } else {
        if (type === "current") {
          setSelectCurrentProvince([])
        } else {
          setSelectPermanentProvince([])
        }
      }
    } catch (e) {
      console.log(e)
    }
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
        // setSelectPermanentCountry(options)
      })
    } catch (e) {}
  }, [])

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
            firstName: data.given_name ? data.given_name : "",
            middleName: data.middle_name ? data.middle_name : "",
            lastName: data.surname ? data.surname : "",

            // Contacts
            homePhone: _.isEmpty(data.contact)
              ? ""
              : data.contact.phone_number
              ? data.contact.phone_number
              : "",
            mobilePhone: _.isEmpty(data.contact)
              ? ""
              : data.contact.mobile_phone_number
              ? data.contact.mobile_phone_number
              : "",
            email: _.isEmpty(data.contact)
              ? ""
              : data.contact.email
              ? data.contact.email
              : "",
            otherEmail: _.isEmpty(data.contact)
              ? ""
              : data.contact.other_email
              ? data.contact.other_email
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

            // Permanent Address
            sameAddress:
              data.permanent_address.address_line ==
                data.address.address_line &&
              data.permanent_address.country_id == data.address.country_id &&
              data.permanent_address.city_id == data.address.city_id &&
              data.permanent_address.state_province_id ==
                data.address.state_province_id &&
              data.permanent_address.postal_code == data.address.postal_code
                ? true
                : false,
            permanentAddress: _.isEmpty(data.permanent_address)
              ? ""
              : data.permanent_address.address_line
              ? data.permanent_address.address_line
              : "",
            permanentCountry: _.isEmpty(data.permanent_address)
              ? ""
              : data.permanent_address.country
              ? {
                  value: data.permanent_address.country_id,
                  label: data.permanent_address.country.country_name,
                }
              : "",

            permanentProvince:
              _.isEmpty(data.permanent_address?.state_province) ||
              data.permanent_address?.state_province_id ===
                "00000000-0000-0000-0000-000000000000"
                ? isView
                  ? {
                      value: "",
                      label: "",
                    }
                  : ""
                : {
                    value: data.permanent_address.state_province_id,
                    label:
                      data.permanent_address.state_province.state_province_name,
                  },
            permanentCity:
              _.isEmpty(data.permanent_address?.city) ||
              data.permanent_address?.city_id ===
                "00000000-0000-0000-0000-000000000000"
                ? isView
                  ? {
                      value: "",
                      label: "",
                    }
                  : ""
                : {
                    value: data.permanent_address.city.id,
                    label: data.permanent_address.city.city_name,
                  },
            permanentZipCode: _.isEmpty(data.permanent_address)
              ? ""
              : data.permanent_address.postal_code
              ? data.permanent_address.postal_code
              : "",
          })

          setPhotoProfile(
            _.isEmpty(data.photo_profile)
              ? _.isEmpty(data.employee_asset.multimedia_description)
                ? []
                : [
                    {
                      data_url: data.employee_asset.multimedia_description.url,
                      id: data.employee_asset.multimedia_description.id,
                    },
                  ]
              : data.photo_profile,
          )

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

  //custom calender
  const DatePickerExpire = ({ openCalendar, value, handleValueChange }) => {
    return (
      <>
        <div className="position-relative datepicker-user-profile-corporate">
          <Icon
            className="user-profile-corporate-icon"
            onClick={openCalendar}
          />
          <input
            className="form-control"
            onFocus={openCalendar}
            style={{ maxWidth: 300 }}
            value={value}
            onChange={handleValueChange}
          />
        </div>
      </>
    )
  }

  return (
    <>
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
              mobile_phone_number: values.mobilePhone,
              other_email: values.otherEmail,
              phone_number: values.homePhone,
            },
            ktp: values.idCardNumber,
            given_name: values.firstName,
            middle_name: values.middleName,
            surname: values.lastName,

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
                  postal_code: values.currentZipCode
                    ? values.currentZipCode
                    : "",
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
            photo_profile: photoProfile,
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
            <Card style={{ marginBottom: 0 }}>
              <Card.Body>
                {props.isMobile ? (
                  ""
                ) : (
                  <h3 className="card-heading">Name On Passport</h3>
                )}
                <div
                  style={
                    props.isMobile
                      ? { padding: "0" }
                      : { padding: "0 15px 15px 15px" }
                  }
                >
                  <Row>
                    <Col sm={9} md={12} lg={9}>
                      <FormikControl
                        control="selectAsync"
                        label="Title"
                        name="title"
                        placeholder={values.name_prefixName || "Mr."}
                        url={`master/name-prefixes`}
                        fieldName={"name_prefix_name"}
                        onChange={(v) => {
                          setFieldValue("title", v)
                        }}
                        style={{ maxWidth: 120 }}
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

                      <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={4}>
                          First Name{" "}
                        </Form.Label>
                        <Col md={9} lg={8}>
                          <FastField name="firstName" disabled>
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  disabled={isView}
                                  isInvalid={
                                    form.touched.firstName &&
                                    form.errors.firstName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  {...field}
                                  style={{ maxWidth: 300 }}
                                />
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={4}>
                          Middle Name
                        </Form.Label>
                        <Col md={9} lg={8}>
                          <FastField name="middleName">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                disabled={isView}
                                minLength={1}
                                maxLength={128}
                                style={{ maxWidth: 300 }}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={4}>
                          Last Name{" "}
                        </Form.Label>
                        <Col md={9} lg={8}>
                          <FastField name="lastName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  {...field}
                                  disabled={isView}
                                  type="text"
                                  isInvalid={
                                    form.touched.lastName &&
                                    form.errors.lastName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  style={{ maxWidth: 300 }}
                                />
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <h3 className="card-heading">Passport Information</h3>
                <div
                  style={
                    props.isMobile
                      ? { padding: "0 15px 15px 0" }
                      : { padding: "0 15px 15px 15px" }
                  }
                >
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Passport Number
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="currentZipCode">
                        {({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            minLength={1}
                            maxLength={16}
                            style={{ maxWidth: 300 }}
                            disabled={isView}
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Place of issue
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
                      Expiry Date
                    </Form.Label>
                    <Col sm={9}>
                      <DatePicker
                        format="DD MMMM YYYY"
                        render={<DatePickerExpire />}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Document Passport
                    </Form.Label>
                    <Col sm={9}>
                      <Button className="button" onClick={handleShow}>
                        UPLOAD FILE
                      </Button>

                      <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        show={show}
                        onHide={handleClose}
                        centered
                        className="modal-form"
                      >
                        <Formik>
                          <Form>
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                UPLOAD YOUR FILE
                                <Form.Text muted className="text-center">
                                  Only .png, .jpg, .jpeg, .pdf file supported
                                  (max 2MB)
                                </Form.Text>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <ImageUploader />
                            </Modal.Body>
                            {/* <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer> */}
                          </Form>
                        </Formik>
                      </Modal>
                    </Col>
                  </Form.Group>
                </div>
                {props.isMobile ? (
                  isView ? (
                    <div className="mb-2 mt-1 row justify-content-md-start justify-content-center">
                      <Button
                        className="button"
                        onClick={() => props.history.goBack()}
                      >
                        BACK
                      </Button>
                    </div>
                  ) : (
                    <div className="ml-3 row justify-content-md-start justify-content-center">
                      <Button
                        className="button"
                        type="submit"
                        disabled={
                          props.finishStep > 0 || props.employeeData?.id
                            ? !isValid || isSubmitting
                            : !dirty || isSubmitting
                        }
                        style={{
                          marginRight: 15,
                          marginBottom: 40,
                          marginTop: 95,
                        }}
                      >
                        {props.employeeData?.id ? "SAVE" : "SAVE"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                        style={{
                          marginRight: 15,
                          marginBottom: 40,
                          marginTop: 95,
                        }}
                      >
                        CANCEL
                      </Button>
                    </div>
                  )
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
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
                    className="button"
                    type="submit"
                    disabled={
                      props.finishStep > 0 || props.employeeData?.id
                        ? !isValid || isSubmitting
                        : !dirty || isSubmitting
                    }
                    style={{ marginRight: 15, marginBottom: 135 }}
                  >
                    {props.employeeData?.id ? "SAVE" : "SAVE"}
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
    </>
  )
}

export default GeneralInformation
