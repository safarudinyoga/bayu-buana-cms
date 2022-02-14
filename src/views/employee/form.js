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
import { Form, Formik, ErrorMessage } from "formik"
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
  const maxNumber = 1

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [optionGender, setOptionGender] = useState([])
  const [additionalRole, setAdditionalRole] = useState(false)
  //console.log("data respon", formValues)

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
          name_prefix: data.name_prefix.name_prefix_name,
          hire_date: data.hire_date.split(/-|T/, 3),
          job_title_id: data.job_title.job_title_name,
          division_id: data.division.division_name,
          office_id: data.office.office_name,
          //birth_date: data.birth_date.split(/-|T/, 3),
        })
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
    console.log(imageList, addUpdateIndex)
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

  const initialValues = {
    //GeneralInformation
    name_prefix_id: "",
    given_name: "",
    middle_name: "",
    surname: "",
    birth_date: [],
    gender_id: "",
    ktp: "",
    //Contacts
    email: "",
    phone_number_home: "",
    phone_number_mobile: "",
    //Address
    address: {
      address_line: "",
      country_id: "",
      state_province_id: "",
      city_id: "",
      postal_code: "",
    },
    sameAddress: false,
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
      relation_ship: "",
    },
    emergency_contact2: {
      contact_name: "",
      contact_phone_number: "",
      relation_ship: "",
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
    phone_number_home: Yup.string().required("Home Phone is required."),
    phone_number_mobile: Yup.string().required("Mobile Phone is required."),
    employee_number: Yup.string().required("Employee Number is required."),
    sameAddress: Yup.boolean(),
    // address: Yup.object({country_id: Yup.string().required("Country is required.")}),
    job_title_id: Yup.object().required("Job Title is required."),
  })

  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
          let res = await api.post("master/employees", {
            ...values,
            address: {
              address_line: values.address.address_line,
              country_id: values.address.country_id.value,
              state_province_id: values.address.state_province_id.value,
              city_id: values.address.city_id.value,
              postal_code: values.address.postal_code,
            },
            birth_date: new Date(
              ...[
                values.birth_date[2].value,
                values.birth_date[1].value,
                values.birth_date[0].value,
              ],
            ),
            division_id: values.division_id.value,
            employee_asset: {
              multimedia_description: {
                url: "https://bbdev.monstercode.net/files/b3986414-5c5f-45a3-be6f-4fedcce2d022.png",
              },
            },
            hire_date: new Date(
              ...[
                values.hire_date[2].value,
                values.hire_date[1].value,
                values.hire_date[0].value,
              ],
            ),
            job_title_id: values.job_title_id.value,
            name_prefix_id: values.name_prefix_id.value,
            office_id: values.office_id.value,
            permanent_address: {
              address_line: values.permanent_address.address_line,
              country_id: values.permanent_address.country_id.value,
              state_province_id:
                values.permanent_address.state_province_id.value,
              city_id: values.permanent_address.city_id.value,
              postal_code: values.permanent_address.postal_code,
            },
          })
          console.log("data", res)
          setSubmitting(false)
        } catch (e) {}
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formik, isSubmitting) => {
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
                              placeholder={formik.values.name_prefix || "Mr."}
                              url={`master/name-prefixes`}
                              fieldName={"name_prefix_name"}
                              onChange={(v) => {
                                formik.setFieldValue("name_prefix_id", v)
                              }}
                              style={{ maxWidth: 120 }}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="First Name"
                              name="given_name"
                              style={{ maxWidth: 250 }}
                            />
                            <FormikControl
                              control="input"
                              label="Middle Name"
                              name="middle_name"
                              style={{ maxWidth: 250 }}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Last Name"
                              name="surname"
                              style={{ maxWidth: 250 }}
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
                                      placeholder="Date"
                                      options={selectDay()}
                                      onChange={(v) => {
                                        formik.setFieldValue("birth_date[0]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="birth_date[1]"
                                      placeholder="Month"
                                      options={selectMonth()}
                                      onChange={(v) => {
                                        formik.setFieldValue("birth_date[1]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="birth_date[2]"
                                      placeholder="Year"
                                      options={selectYear()}
                                      onChange={(v) => {
                                        formik.setFieldValue("birth_date[2]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
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
                              name="phone_number_home"
                              style={{ maxWidth: 200 }}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Mobile Phone"
                              name="phone_number_mobile"
                              style={{ maxWidth: 200 }}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Email"
                              name="email"
                              style={{ maxWidth: 250 }}
                            />
                            <FormikControl
                              control="input"
                              label="Other Email"
                              name="other_email"
                              style={{ maxWidth: 250 }}
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
                              }}
                              placeholder="Please Choose"
                              style={{ maxWidth: 300 }}
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
                              }}
                              placeholder="Please Choose"
                              style={{ maxWidth: 200 }}
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
                              placeholder="Please Choose"
                              style={{ maxWidth: 200 }}
                            />
                            <FormikControl
                              control="input"
                              label="ZIP Code"
                              name="address.postal_code"
                              style={{ maxWidth: 100 }}
                            />
                          </div>
                          <h3 className="card-heading">Permanent Address</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="checkboxOnly"
                              type="checkbox"
                              label="Same As Current Address"
                              name="sameAddress"
                              checked={formik.values.sameAddress}
                              onChange={() => {
                                formik.setFieldValue(
                                  "sameAddress",
                                  !formik.values.sameAddress,
                                )
                                formik.setFieldValue(
                                  "permanent_address.address_line",
                                  formik.values.sameAddress
                                    ? ""
                                    : formik.values.address.address_line,
                                )
                                formik.setFieldValue(
                                  "permanent_address.country_id",
                                  formik.values.sameAddress
                                    ? ""
                                    : formik.values.address.country_id,
                                )
                                formik.setFieldValue(
                                  "permanent_address.state_province_id",
                                  formik.values.sameAddress
                                    ? ""
                                    : formik.values.address.state_province_id,
                                )
                                formik.setFieldValue(
                                  "permanent_address.city_id",
                                  formik.values.sameAddress
                                    ? ""
                                    : formik.values.address.city_id,
                                )
                                formik.setFieldValue(
                                  "permanent_address.postal_code",
                                  formik.values.sameAddress
                                    ? ""
                                    : formik.values.address.postal_code,
                                )
                              }}
                              onBlur={formik.handleBlur}
                              style={{ maxWidth: 416 }}
                            />
                            <FormikControl
                              control="textarea"
                              label="Address"
                              name="permanent_address.address_line"
                              rows={3}
                              style={{ maxWidth: 416 }}
                              disabled={formik.values.sameAddress}
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
                              }}
                              placeholder="Please Choose"
                              style={{ maxWidth: 300 }}
                              isDisabled={formik.values.sameAddress}
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
                              }}
                              placeholder="Please Choose"
                              style={{ maxWidth: 200 }}
                              isDisabled={formik.values.sameAddress}
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
                              placeholder="Please Choose"
                              style={{ maxWidth: 200 }}
                              isDisabled={formik.values.sameAddress}
                            />
                            <FormikControl
                              control="input"
                              label="ZIP Code"
                              name="permanent_address.postal_code"
                              style={{ maxWidth: 100 }}
                              disabled={formik.values.sameAddress}
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
                            />
                            <FormikControl
                              control="input"
                              label="Phone Number"
                              name="emergency_contact.contact_phone_number"
                              style={{ maxWidth: 200 }}
                            />
                            <FormikControl
                              control="input"
                              label="Relationship"
                              name="emergency_contact.relation_ship"
                              style={{ maxWidth: 200 }}
                            />
                          </div>
                          <h3 className="card-heading">Emergency Contact 2</h3>
                          <div style={{ padding: "0 15px 15px" }}>
                            <FormikControl
                              control="input"
                              label="Full Name"
                              name="emergency_contact2.contact_name"
                              style={{ maxWidth: 250 }}
                            />
                            <FormikControl
                              control="input"
                              label="Phone Number"
                              name="emergency_contact2.contact_phone_number"
                              style={{ maxWidth: 200 }}
                            />
                            <FormikControl
                              control="input"
                              label="Relationship"
                              name="emergency_contact2.relation_ship"
                              style={{ maxWidth: 200 }}
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
                          onClick={() => history.goBack()}
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
                                      placeholder={
                                        formik.values.hire_date[2] || "Date"
                                      }
                                      style={{ maxWidth: 240 }}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="hire_date[1]"
                                      placeholder={
                                        formik.values.hire_date[1] || "Month"
                                      }
                                      options={selectMonth()}
                                      onChange={(v) => {
                                        formik.setFieldValue("hire_date[1]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
                                    />
                                  </div>
                                  <div style={{ marginRight: 12, flex: 1 }}>
                                    <FormikControl
                                      control="selectOnly"
                                      name="hire_date[2]"
                                      placeholder={
                                        formik.values.hire_date[0] || "Year"
                                      }
                                      options={selectYear()}
                                      onChange={(v) => {
                                        formik.setFieldValue("hire_date[2]", v)
                                      }}
                                      style={{ maxWidth: 240 }}
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
                            />
                          </div>
                          {additionalRole && (
                            <>
                              <div style={{ padding: "0 15px 15px" }}>
                                <h6 className="mt-2">Employment</h6>
                                <div className="p-2">
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
                                  />
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
                          disabled={formik.isValidating}
                          style={{ marginRight: 15 }}
                        >
                          SAVE
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => history.goBack()}
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