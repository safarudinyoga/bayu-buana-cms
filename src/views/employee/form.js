import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import { Row, Col, Tab, Nav, Card, Button, Image } from "react-bootstrap"
import FormikControl from "../../components/formik/formikControl"
import useQuery from "lib/query"
import axios from "axios"
import Api from "config/api"
import env from "config/environment"
import { ReactSVG } from "react-svg"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import ImageUploading from "react-images-uploading"
import TextError from "components/formik/textError"
import { Form, Field, Formik, ErrorMessage } from "formik"
import * as Yup from "yup"

const endpoint = "/master/employees"
const backUrl = "/master/employee"

const EmployeeForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  let api = new Api()
  const isView = useQuery().get("action") === "view"
  const [tabKey, setTabKey] = useState("general-information")
  const [photoProfile, setPhotoProfile] = useState([])
  //console.log("imagessss", photoProfile)
  const maxNumber = 1
  const [sameAddress, setSameAddress] = useState(false)

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [optionGender, setOptionGender] = useState([])
  const [additionalRole, setAdditionalRole] = useState(false)
  console.log("data respon", formValues)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Employee"
    let breadcrumbTitle = "Edit Employee"
    if (!formId) {
      docTitle = "Create Employee"
      breadcrumbTitle = "Create Employee"
    } else if (isView) {
      docTitle = "Employee Details"
      breadcrumbTitle = "View Employee"
    }
    console.log("isView", isView)
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employee Management",
          },
          {
            link: backUrl,
            text: "Master Employee",
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
        let data = res.data
        setFormValues({
          ...data,
          birth_date: [
            {
              value: parseInt(data.birth_date.substring(8, 10)),
              label: parseInt(data.birth_date.substring(8, 10)),
            },
            {
              value: parseInt(data.birth_date.substring(5, 7)),
              label: parseInt(data.birth_date.substring(5, 7)),
            },
            {
              value: parseInt(data.birth_date.substring(0, 4)),
              label: parseInt(data.birth_date.substring(0, 4)),
            },
          ],
          name_prefix_id: {
            label: data.name_prefix.name_prefix_name,
            value: data.name_prefix_id,
          },
          address: {
            address_line: data.address.address_line,
            country_id: {
              label: data.address.country.country_name,
              value: data.address.country_id,
            },
            state_province_id: {
              label: data.address.state_province.state_province_name,
              value: data.address.state_province_id,
            },
            city_id: {
              label: data.address.city.city_name,
              value: data.address.city_id,
            },
            postal_code: data.address.postal_code,
          },
          permanent_address: {
            address_line: data.permanent_address.address_line,
            country_id: {
              label: data.permanent_address.country.country_name,
              value: data.permanent_address.country_id,
            },
            state_province_id: {
              label: data.permanent_address.state_province.state_province_name,
              value: data.permanent_address.state_province_id,
            },
            city_id: {
              label: data.permanent_address.city.city_name,
              value: data.permanent_address.city_id,
            },
            postal_code: data.permanent_address.postal_code,
          },
          job_title_id: {label : data.job_title.job_title_name, value : data.job_title.id},
          division_id: {label : data.division.division_name, value : data.division.id},
          office_id: {label : data.office.office_name, value : data.office.id},
          
          hire_date: [
            {
              value: parseInt(data.hire_date.substring(8, 10)),
              label: parseInt(data.hire_date.substring(8, 10)),
            },
            {
              value: parseInt(data.hire_date.substring(5, 7)),
              label: parseInt(data.hire_date.substring(5, 7)),
            },
            {
              value: parseInt(data.hire_date.substring(0, 4)),
              label: parseInt(data.hire_date.substring(0, 4)),
            },
          ],
        })
        //handleSameAddress
        if (
          data.address.address_line === data.permanent_address.address_line &&
          data.address.country_id === data.permanent_address.country_id &&
          data.address.state_province_id ===
            data.permanent_address.state_province_id &&
          data.address.city_id === data.permanent_address.city_id &&
          data.address.postal_code === data.address.postal_code
        ) {
          setSameAddress(true)
        } else {
          setSameAddress(false)
        }
      } catch (e) {}

      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  // Select
  useEffect(async () => {
    const options = []
    try {
      let res = await api.get("/master/genders")
      res.data.items.forEach((data) => {
        options.push({
          key: data.gender_name,
          value: data.id,
        })
      })
    } catch (e) {}
    setOptionGender(options)
  }, [])
  // Upload profile
  const onChangePhotoProfile = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("image ", imageList)
    setPhotoProfile(imageList)
  }
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
  //FormatDate XXXX-XX-XX
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear()
    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day
    return [year, month, day].join("-")
  }

  const initialValues = {
    //GeneralInformation
    name_prefix_id: "",
    given_name: "",
    middle_name: "",
    surname: "",
    birth_date: [],
    gender_id: "",
    ktp: "",
    // employee_asset: {
    //   multimedia_description: {
    //     url: "photoProfile.data_url",
    //   },
    // },

    //Contacts
    contact: {
      phone_number: "",
      mobile_phone_number: "",
      email: "",
      other_email: "",
    },
    //Address
    address: {
      address_line: "",
      country_id: "",
      state_province_id: "",
      city_id: "",
      postal_code: "",
    },
    permanent_address: {
      address_line: "",
      country_id: "",
      state_province_id: "",
      city_id: "",
      postal_code: "",
    },
    //EmergencyContact
    emergency_contact: {
      contact_name: "",
      contact_phone_number: "",
      relationship: "",
    },
    emergency_contact2: {
      contact_name: "",
      contact_phone_number: "",
      relationship: "",
    },
    //Employment
    employee_number: "",
    job_title_id: "",
    division_id: "",
    office_id: "",
    hire_date: [],
    npwp: "",
  }
  //
  const validationSchema = Yup.object({
    name_prefix_id: Yup.object().required("Title is required."),
    given_name: Yup.string().required("Employee First Name is required."),
    surname: Yup.string().required("Employee Last Name is required."),
    birth_date: Yup.array().min(3, "Date of Birth is required."),
    gender_id: Yup.string().required("Gender is required."),
    contact: Yup.object().shape({
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
      phone_number: Yup.string().required("Home Phone is required."),
      mobile_phone_number: Yup.string().required("Mobile Phone is required."),
    }),
    employee_number: Yup.string().required("Employee Number is required."),
    //sameAddress: Yup.boolean(),
    //address: Yup.object({country_id: Yup.string().required("Country is required.")}),
    //permanent_address: Yup.object({country_id: Yup.string().required("Country is required.")}),
    job_title_id: Yup.object().required("Job Title is required."),
  })

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {       
        let formId = props.match.params.id
        const Data = {
          name_prefix_id: values.name_prefix_id.value,
          given_name: values.given_name,
          middle_name: values.middle_name,
          surname: values.surname,
          birth_date: formatDate([
            values.birth_date[2].value,
            values.birth_date[1].value,
            values.birth_date[0].value,
          ]),
          gender_id: values.gender_id,
          ktp: values.ktp,
          employee_asset: {
            multimedia_description_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
          contact: {
            email: values.contact.email,
            mobile_phone_number: values.contact.mobile_phone_number,
            other_email: values.contact.other_email,
            phone_number: values.contact.phone_number,
          },
          address: {
            address_line: values.address.address_line,
            country_id: values.address.country_id.value,
            state_province_id: values.address.state_province_id.value,
            city_id: values.address.city_id.value,
            postal_code: values.address.postal_code,
          },
          permanent_address: {
            address_line: values.permanent_address.address_line,
            country_id: values.permanent_address.country_id.value,
            state_province_id: values.permanent_address.state_province_id.value,
            city_id: values.permanent_address.city_id.value,
            postal_code: values.permanent_address.postal_code,
          },
          emergency_contact: {
            contact_name: values.emergency_contact.contact_name,
            contact_phone_number: values.emergency_contact.contact_phone_number,
            relationship: values.emergency_contact.relationship,
          },
          emergency_contact2: {
            contact_name: values.emergency_contact2.contact_name,
            contact_phone_number:
              values.emergency_contact2.contact_phone_number,
            relationship: values.emergency_contact2.relationship,
          },
          employee_number: values.employee_number,
          job_title_id: values.job_title_id.value,
          division_id: values.division_id.value,
          office_id: values.office_id.value,          
          hire_date: formatDate([
            values.hire_date[2].value,
            values.hire_date[1].value,
            values.hire_date[0].value,
          ]),
          npwp: values.npwp,
        }

        setSubmitting(true)
        if (formId === undefined) {
           //ProsesCreateData
          try {
            let res = await api.post("master/employees", Data)
            console.log("data", res)
            setSubmitting(false)
          } catch (e) {}         
        } else {
           //ProsesUpdateData
          try {
            let res = await api.put(`master/employees/${formId}`, Data)
            console.log("dataupdate", res)
            setSubmitting(false || history.goBack())
            
          } catch (e) {}
        }
      }}      
      validateOnMount
      enableReinitialize
    >
      {(formik) => {
        console.log("formik", formik)
        return (
          <Form>
            <Tab.Container activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column nav-side">
                    <Nav.Item>
                      <Nav.Link eventKey="general-information">
                        <div>
                          <ReactSVG src="/img/icons/general-information.svg" />
                          <span>General Information</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="emergency-contacts">
                        <div>
                          <ReactSVG src="/img/icons/emergency-contacts.svg" />
                          <span>Emergency Contacts</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="employment">
                        <div>
                          <ReactSVG src="/img/icons/employment.svg" />
                          <span>Employment</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="general-information">
                      <Card>
                        <Card.Body>
                          <h3 className="card-heading">General Information</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="selectAsync"
                              required="label-required"
                              label="Title"
                              name="name_prefix_id"
                              placeholder={
                                formik.values.name_prefixName || "Mr."
                              }
                              url={`master/name-prefixes`}
                              fieldName={"name_prefix_name"}
                              onChange={(v) => {
                                formik.setFieldValue("name_prefix_id", v)
                              }}
                              style={{ maxWidth: 120 }}
                              isDisabled={isView}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="First Name"
                              name="given_name"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="Middle Name"
                              name="middle_name"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Last Name"
                              name="surname"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <Row className="form-group required">
                              <Col column md={3} lg={3}>
                                <label className="text-label-input">
                                  Date Of Birth
                                  <span className="label-required" />
                                </label>
                              </Col>
                              <Col className="mb-2" md={9} lg={9}>
                                <div style={{ width: 400, display: "flex" }}>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="birth_date[0]"
                                      placeholder={formik.values.day || "Date"}
                                      options={selectDay()}
                                      onChange={(v) => {
                                        formik.setFieldValue("birth_date[0]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                      isDisabled={isView}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="birth_date[1]"
                                      placeholder={
                                        formik.values.month || "Month"
                                      }
                                      options={selectMonth()}
                                      onChange={(v) => {
                                        formik.setFieldValue("birth_date[1]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                      isDisabled={isView}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="birth_date[2]"
                                      placeholder={formik.values.year || "Year"}
                                      options={selectYear()}
                                      onChange={(v) => {
                                        formik.setFieldValue("birth_date[2]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                      isDisabled={isView}
                                    />
                                  </div>
                                </div>
                                <ErrorMessage
                                  component={TextError}
                                  name="birth_date"
                                />
                              </Col>
                            </Row>
                            <FormikControl
                              control="radio"
                              required="label-required"
                              label="Gender"
                              name="gender_id"
                              options={optionGender}
                            />

                            <FormikControl
                              control="input"
                              label="ID Card Number (KTP)"
                              name="ktp"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />

                            <div
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "80px",
                              }}
                            >
                              <div
                                className="img-profile-wrapper"
                                style={{ textAlign: "center" }}
                              >
                                <div>
                                  {photoProfile.length == 0 && (
                                    <Image
                                      src={
                                        formik.values.employee_asset
                                          ?.multimedia_description?.url ||
                                        "/img/media/profile.svg"
                                      }
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
                                          <div
                                            key={index}
                                            className="image-item"
                                          >
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
                                                Only .png, .jpg, .jpeg file
                                                supported
                                              </p>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </ImageUploading>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h3 className="card-heading">Contacts</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Home Phone"
                              name="contact.phone_number"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Mobile Phone"
                              name="contact.mobile_phone_number"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Email"
                              name="contact.email"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="Other Email"
                              name="contact.other_email"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                          </div>
                          <h3 className="card-heading">Current Address</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="textarea"
                              label="Address"
                              name="address.address_line"
                              rows={3}
                              style={{ maxWidth: 416 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="selectAsync"
                              required="label-required"
                              label="Country"
                              name="address.country_id"
                              url={`master/countries`}
                              fieldName={"country_name"}
                              onChange={(v) => {
                                formik.setFieldValue("address.country_id", v)
                                formik.setFieldValue(
                                  "address.state_province_id",
                                  null,
                                )
                                formik.setFieldValue("address.city_id", null)
                              }}
                              placeholder={"Please Choose"}
                              style={{ maxWidth: 300 }}
                              isDisabled={isView}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="State/Province"
                              name="address.state_province_id"
                              url={`master/state-provinces`}
                              urlFilter={`["country_id","=",${formik.values.currentCountry?.value}]`}
                              fieldName={"state_province_name"}
                              onChange={(v) => {
                                formik.setFieldValue(
                                  "address.state_province_id",
                                  v,
                                )
                                formik.setFieldValue("address.city_id", null)
                              }}
                              placeholder={"Please Choose"}
                              style={{ maxWidth: 200 }}
                              isDisabled={isView}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="City"
                              name="address.city_id"
                              url={`master/cities`}
                              urlFilter={`["province_id","=",${formik.values.currentProvince?.value}]`}
                              fieldName={"city_name"}
                              onChange={(v) => {
                                formik.setFieldValue("address.city_id", v)
                              }}
                              placeholder={"Please Choose"}
                              style={{ maxWidth: 200 }}
                              isDisabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="ZIP Code"
                              name="address.postal_code"
                              style={{ maxWidth: 100 }}
                              disabled={isView}
                            />
                          </div>
                          <h3 className="card-heading">Permanent Address</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="checkboxOnly"
                              type="checkbox"
                              label="Same As Current Address"
                              name="sameAddress"
                              checked={sameAddress}
                              onChange={() => {
                                setSameAddress(!sameAddress)
                                formik.setFieldValue(
                                  "permanent_address.address_line",
                                  sameAddress
                                    ? ""
                                    : formik.values.address.address_line,
                                )
                                formik.setFieldValue(
                                  "permanent_address.country_id",
                                  sameAddress
                                    ? ""
                                    : formik.values.address.country_id,
                                )
                                formik.setFieldValue(
                                  "permanent_address.state_province_id",
                                  sameAddress
                                    ? ""
                                    : formik.values.address.state_province_id,
                                )
                                formik.setFieldValue(
                                  "permanent_address.city_id",
                                  sameAddress
                                    ? ""
                                    : formik.values.address.city_id,
                                )
                                formik.setFieldValue(
                                  "permanent_address.postal_code",
                                  sameAddress
                                    ? ""
                                    : formik.values.address.postal_code,
                                )
                              }}
                              onBlur={formik.handleBlur}
                              style={{ maxWidth: 416 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="textarea"
                              label="Address"
                              name="permanent_address.address_line"
                              rows={3}
                              style={{ maxWidth: 416 }}
                              disabled={isView || sameAddress}
                            />
                            <FormikControl
                              control="selectAsync"
                              required="label-required"
                              label="Country"
                              name="permanent_address.country_id"
                              url={`master/countries`}
                              fieldName={"country_name"}
                              onChange={(v) => {
                                formik.setFieldValue(
                                  "permanent_address.country_id",
                                  v,
                                )
                                formik.setFieldValue(
                                  "permanent_address.state_province_id",
                                  null,
                                )
                                formik.setFieldValue(
                                  "permanent_address.city_id",
                                  null,
                                )
                              }}
                              placeholder={
                                formik.values.permanent_country_id ||
                                "Please Choose"
                              }
                              style={{ maxWidth: 300 }}
                              isDisabled={isView || sameAddress}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="State/Province"
                              name="permanent_address.state_province_id"
                              url={`master/state-provinces`}
                              urlFilter={`["country_id","=",${formik.values.currentCountry?.value}]`}
                              fieldName={"state_province_name"}
                              onChange={(v) => {
                                formik.setFieldValue(
                                  "permanent_address.state_province_id",
                                  v,
                                )
                                formik.setFieldValue(
                                  "permanent_address.city_id",
                                  null,
                                )
                              }}
                              placeholder={
                                formik.values.permanent_state_province_id ||
                                "Please Choose"
                              }
                              style={{ maxWidth: 200 }}
                              isDisabled={isView || sameAddress}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="City"
                              name="permanent_address.city_id"
                              url={`master/cities`}
                              urlFilter={`["province_id","=",${formik.values.currentProvince?.value}]`}
                              fieldName={"city_name"}
                              onChange={(v) => {
                                formik.setFieldValue(
                                  "permanent_address.city_id",
                                  v,
                                )
                              }}
                              placeholder={
                                formik.values.permanent_city_id ||
                                "Please Choose"
                              }
                              style={{ maxWidth: 200 }}
                              isDisabled={isView || sameAddress}
                            />
                            <FormikControl
                              control="input"
                              label="ZIP Code"
                              name="permanent_address.postal_code"
                              style={{ maxWidth: 100 }}
                              disabled={isView || sameAddress}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                      <div
                        style={{
                          marginBottom: 30,
                          marginTop: 30,
                          display: "flex",
                        }}
                      >
                        <Button
                          variant="primary"
                          onClick={() => setTabKey("emergency-contacts")}
                          disabled={formik.isValidating}
                          style={{ marginRight: 15 }}
                        >
                          SAVE & NEXT
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => history.goBack()}
                        >
                          CANCEL
                        </Button>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="emergency-contacts">
                      <Card>
                        <Card.Body>
                          <h3 className="card-heading">Emergency Contact 1</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="input"
                              label="Full Name"
                              name="emergency_contact.contact_name"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="Phone Number"
                              name="emergency_contact.contact_phone_number"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="Relationship"
                              name="emergency_contact.relationship"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                          </div>
                          <h3 className="card-heading">Emergency Contact 2</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="input"
                              label="Full Name"
                              name="emergency_contact2.contact_name"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="Phone Number"
                              name="emergency_contact2.contact_phone_number"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="input"
                              label="Relationship"
                              name="emergency_contact2.relationship"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                      <div
                        style={{
                          marginBottom: 30,
                          marginTop: 30,
                          display: "flex",
                        }}
                      >
                        <Button
                          variant="primary"
                          onClick={() => setTabKey("employment")}
                          disabled={formik.isValidating}
                          style={{ marginRight: 15 }}
                        >
                          SAVE & NEXT
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setTabKey("general-information")}
                        >
                          CANCEL
                        </Button>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="employment">
                      <Card>
                        <Card.Body>
                          <h3 className="card-heading">Employment</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Employee ID"
                              name="employee_number"
                              style={{ maxWidth: 250 }}
                              disabled={isView}
                            />
                            <FormikControl
                              control="selectAsync"
                              required="label-required"
                              label="Job Title"
                              name="job_title_id"
                              url={`master/job-titles`}
                              fieldName={"job_title_name"}
                              onChange={(v) => {
                                formik.setFieldValue("job_title_id", v)
                              }}
                              placeholder={
                                formik.values.job_title_id || "Please Choose"
                              }
                              style={{ maxWidth: 200 }}
                              isDisabled={isView}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="Division"
                              name="division_id"
                              url={`master/divisions`}
                              fieldName={"division_name"}
                              onChange={(v) => {
                                formik.setFieldValue("division_id", v)
                              }}
                              placeholder={
                                formik.values.division_id || "Please Choose"
                              }
                              style={{ maxWidth: 200 }}
                              isDisabled={isView}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="Branch Office"
                              name="office_id"
                              url={`master/offices`}
                              fieldName={"office_name"}
                              onChange={(v) => {
                                formik.setFieldValue("office_id", v)
                              }}
                              placeholder={
                                formik.values.office_id || "Please Choose"
                              }
                              style={{ maxWidth: 200 }}
                              isDisabled={isView}
                            />
                            <Row className="required">
                              <Col column md={3} lg={3}>
                                <label className="text-label-input">
                                  Hiring Date
                                  <span className="label-required" />
                                </label>
                              </Col>
                              <Col className="mb-2" md={9} lg={9}>
                                <div style={{ width: 400, display: "flex" }}>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="hire_date[0]"
                                      onChange={(v) => {
                                        formik.setFieldValue("hire_date[0]", v)
                                      }}
                                      options={selectDay()}
                                      placeholder={"Date"}
                                      style={{ maxWidth: 240 }}
                                      isDisabled={isView}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="hire_date[1]"
                                      placeholder={"Month"}
                                      options={selectMonth()}
                                      onChange={(v) => {
                                        formik.setFieldValue("hire_date[1]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                      isDisabled={isView}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="hire_date[2]"
                                      placeholder={"Year"}
                                      options={selectYear()}
                                      onChange={(v) => {
                                        formik.setFieldValue("hire_date[2]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                      isDisabled={isView}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <FormikControl
                              control="input"
                              label="NPWP"
                              name="npwp"
                              style={{ maxWidth: 200 }}
                              disabled={isView}
                            />
                          </div>
                          {additionalRole && (
                            <>
                              <div style={{ padding: "0 15px 15px" }}>
                                <h6 className="mt-2">Employment</h6>
                                <div className="p-2">
                                  {/* <FormikControl
                                    control="selectAsync"
                                    required="label-required"
                                    label="Job Title"
                                    name="job_title_id"
                                    url={`master/job-titles`}
                                    fieldName={"job_title_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue("job_title_id", v)
                                    }}
                                    placeholder={
                                      formik.values.job_title_id ||
                                      "Please Choose"
                                    }
                                    style={{ maxWidth: 200 }}
                                  />
                                  <FormikControl
                                    control="selectAsync"
                                    label="Division"
                                    name="division_id"
                                    url={`master/divisions`}
                                    fieldName={"division_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue("division_id", v)
                                    }}
                                    placeholder={
                                      formik.values.division_id ||
                                      "Please Choose"
                                    }
                                    style={{ maxWidth: 200 }}
                                  /> */}
                                </div>
                              </div>
                            </>
                          )}
                          <div className="d-flex flex-row-reverse">
                            <div
                              onClick={() => setAdditionalRole(!additionalRole)}
                              style={{
                                color: "#1743BE",
                                fontSize: 13,
                                cursor: "pointer",
                              }}
                            >
                              Add Additional Role
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                      <div
                        style={{
                          marginBottom: 30,
                          marginTop: 30,
                          display: "flex",
                        }}
                      >
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={!(formik.dirty && formik.isValid)}
                          style={{ marginRight: 15 }}
                          
                        >
                          SAVE
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setTabKey("emergency-contacts")}
                        >
                          CANCEL
                        </Button>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Form>
        )
      }}
    </Formik>
  )
}

export default withRouter(EmployeeForm)
