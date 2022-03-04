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
import TextError from "components/formik/textError"
import { Form, Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "react-simple-snackbar"
import "./employee-form.css"
import FormMobile from "./form-mobile"
import { data } from "jquery"

const endpoint = "/master/employees"
const backUrl = "/master/employee"
const options = {
  position: "bottom-right",
}
const EmployeeForm = (props) => {
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  let dispatch = useDispatch()
  let api = new Api()
  const isView = useQuery().get("action") === "view"
  const [tabKey, setTabKey] = useState("general-information")
  const [photoProfile, setPhotoProfile] = useState({})
  const [sameAddress, setSameAddress] = useState(false)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [optionGender, setOptionGender] = useState([])
  const [additionalRole, setAdditionalRole] = useState(false)
  const [months, setMonths] = useState({ value: 1, label: "" })
  const [years, setYears] = useState({ value: 2000, label: "" })
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
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employment Management",
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
              value: 1 + parseInt(data.birth_date.substring(8, 10)),
              label: parseInt(data.birth_date.substring(8, 10)),
            },
            {
              value: parseInt(data.birth_date.substring(5, 7)),
              label: monthNames[parseInt(data.birth_date.substring(5, 7)) - 1],
            },
            {
              value: parseInt(data.birth_date.substring(0, 4)),
              label: parseInt(data.birth_date.substring(0, 4)),
            },
          ],
          name_prefix_id: {
            label: data?.name_prefix?.name_prefix_name,
            value: data?.name_prefix_id,
          },
          address: {
            address_line: data.address.address_line,
            country_id: {
              label: data.address.country.country_name,
              value: data.address.country_id,
            },
            state_province_id: {
              label:
                data?.address?.state_province?.state_province_name ||
                "Please choose",
              value: data?.address?.state_province_id || null,
            },
            city_id: {
              label: data?.address?.city?.city_name || "Please choose",
              value: data?.address?.city_id || null,
            },
            postal_code: data?.address?.postal_code,
          },
          permanent_address: {
            address_line: data.permanent_address.address_line,
            country_id: {
              label: data.permanent_address.country.country_name,
              value: data.permanent_address.country_id,
            },
            state_province_id: {
              label:
                data.permanent_address?.state_province?.state_province_name ||
                "Please choose",
              value: data.permanent_address?.state_province_id || null,
            },
            city_id: {
              label: data.permanent_address?.city?.city_name || "Please choose",
              value: data.permanent_address?.city_id || null,
            },
            postal_code: data.permanent_address.postal_code,
          },
          job_title_id: {
            label: data.job_title.job_title_name,
            value: data.job_title.id,
          },
          division_id: {
            label: data?.division?.division_name || "Please choose",
            value: data?.division?.id || null,
          },
          office_id: {
            label: data?.office?.office_name || "Please choose",
            value: data?.office?.id || null,
          },
          hire_date: [
            {
              value: 1 + parseInt(data.hire_date.substring(8, 10)),
              label: parseInt(data.hire_date.substring(8, 10)),
            },
            {
              value: parseInt(data.hire_date.substring(5, 7)),
              label: monthNames[parseInt(data.hire_date.substring(5, 7)) - 1],
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
  const onChangePhotoProfile = async (e) => {
    try {
      var files = e.target.files[0]
      if (files) {
        var filesize = (files.size / 1024 / 1024).toFixed(4)
        if (filesize > 4) {
          alert("Logo size is more than 4MB.")
          return
        }
        let api = new Api()
        let payload = new FormData()
        payload.append("files", e.target.files[0])
        let res = await api.post("/multimedia/files", payload)
        if (res.data) {
          setPhotoProfile({
            ...photoProfile,
            employee_asset: {
              multimedia_description_id: res.data.id,
              multimedia_description: res.data,
            },
          })
        }
      }
    } catch (e) {}
  }


  

  // Birthday
  //Day
  const dateObj = new Date()
  const dayToday = dateObj.getUTCDate()
  const daysInMonth = (monthx, yearx) => {
    return new Date(yearx, monthx, 0).getDate() + 1
  }
  console.log("data", years.value)
  const selectDay = () => {
    const options = []
    for (let i = 1; i < daysInMonth(months.value, years.value); i++) {
      options.push({
        value: i + 1,
        label: i,
      })
    }
    return options
  }
  //Month
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthToday = monthNames[dateObj.getUTCMonth()]
  const selectMonth = () => {
    const options = []
    monthNames.forEach((data, i) => {
      options.push({
        value: i + 1,
        label: data,
      })
    })
    return options
  }
  //Year
  const yearToday = dateObj.getUTCFullYear()
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
      day = "" + d.getDate(),
      month = "" + (d.getMonth() + 1),
      year = d.getFullYear()
    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day
    return [year, month, day].join("-")
  }

  const initialValues = {
    //GeneralInformation
    name_prefix_id: {
      value: "db24d53c-7d36-4770-8598-dc36174750af",
      label: "Mr",
    },
    given_name: "",
    middle_name: "",
    surname: "",
    birth_date: [],
    gender_id: "db24d53c-7d36-4770-8598-dc36174750af",
    ktp: "",

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
      country_id: { value: null, label: "Please choose" },
      state_province_id: { value: null, label: "Please choose" },
      city_id: { value: null, label: "Please choose" },
      postal_code: "",
    },
    permanent_address: {
      address_line: "",
      country_id: { value: null, label: "Please choose" },
      state_province_id: { value: null, label: "Please choose" },
      city_id: { value: null, label: "Please choose" },
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
    job_title_id: { value: null, label: "Please choose" },
    division_id: { value: null, label: "Please choose" },
    office_id: { value: null, label: "Please choose" },
    hire_date: [yearToday, monthToday, dayToday],
    npwp: "",
  }
  // Validasi number
  const phoneRegExp = /^\d+$/
  const numberSimbol = /^[0-9!@#$%-._^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
  //const numberSimbol = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
            let formId = props.match.params.id
            if (formId === undefined) {
              return new Promise((resolve, reject) => {
                axios
                  .get(
                    `${env.API_URL}/master/employees?filters=["contact.email","=","${value}"]`,
                  )
                  .then((res) => {
                    resolve(res.data.items.length === 0)
                    console.log("data Email", res.data.items)
                  })
                  .catch((error) => {
                    resolve(false)
                  })
              })
            } else {
              return new Promise((resolve, reject) => {
                axios
                  .get(
                    `${env.API_URL}/master/employees?filters=["contact.email","=","${value}"]`,
                  )

                  .then((res) => {
                    resolve(
                      res.data.items.length === 0 ||
                        value === formValues.contact.email,
                    )
                  })
                  .catch((error) => {
                    resolve(false)
                  })
              })
            }
          },
        ),
      other_email: Yup.string().email("Email is not valid."),
      phone_number: Yup.string()
        .matches(phoneRegExp, "Home Phone is not valid")
        .required("Home Phone is required."),
      mobile_phone_number: Yup.string()
        .matches(phoneRegExp, "Mobile Phone is not valid")
        .required("Mobile Phone is required."),
    }),
    employee_number: Yup.string()
      .required("Employee Number is required.")
      .test(
        "Unique Employee Number",
        "Employee Number already exists", // <- key, message
        (value) => {
          let formId = props.match.params.id
          if (formId === undefined) {
            return new Promise((resolve, reject) => {
              axios
                .get(
                  `${env.API_URL}/master/employees?filters=["employee_number","=","${value}"]`,
                )
                .then((res) => {
                  resolve(res.data.items.length === 0)
                })
                .catch((error) => {
                  resolve(false)
                })
            })
          } else {
            return new Promise((resolve, reject) => {
              axios
                .get(
                  `${env.API_URL}/master/employees?filters=["employee_number","=","${value}"]`,
                )

                .then((res) => {
                  resolve(
                    res.data.items.length === 0 ||
                      value === formValues.employee_number,
                  )
                })
                .catch((error) => {
                  resolve(false)
                })
            })
          }
        },
      ),

    //sameAddress: Yup.boolean(),
    address: Yup.object().shape({
      address_line: Yup.string(),
      country_id: Yup.object().required("Country is required."),
      state_province_id: Yup.object().shape({
        value: Yup.string().nullable(),
        label: Yup.string().nullable(),
      }),
      city_id: Yup.object().shape({
        value: Yup.string().nullable(),
        label: Yup.string().nullable(),
      }),
      postal_code: Yup.string(),
    }),
    permanent_address: Yup.object().shape({
      address_line: Yup.string(),
      country_id: Yup.object().required("Country is required."),
      state_province_id: Yup.object().shape({
        value: Yup.string().nullable(),
        label: Yup.string().nullable(),
      }),
      city_id: Yup.object().shape({
        value: Yup.string().nullable(),
        label: Yup.string().nullable(),
      }),
      postal_code: Yup.string(),
    }),
    emergency_contact: Yup.object().shape({
      contact_phone_number: Yup.string().matches(
        numberSimbol,
        "Phone Number is not valid",
      ),
    }),
    emergency_contact2: Yup.object().shape({
      contact_phone_number: Yup.string().matches(
        numberSimbol,
        "Phone Number is not valid",
      ),
    }),
    job_title_id: Yup.object().required("Job Title is required."),
    npwp: Yup.string().matches(numberSimbol, "NPWP must be a number"),
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
            multimedia_description_id:
              photoProfile.employee_asset?.multimedia_description_id,
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
            contact_phone_number:
              "" + values.emergency_contact.contact_phone_number,
            relationship: values.emergency_contact.relationship,
          },
          emergency_contact2: {
            contact_name: values.emergency_contact2.contact_name,
            contact_phone_number:
              "" + values.emergency_contact2.contact_phone_number,
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
            openSnackbar(
              `Record 'Employee Number: ${
                values.employee_number
              } Employee Name: ${
                values.given_name +
                " " +
                values?.middle_name +
                " " +
                values.surname
              }' has been successfully saved.`,
            )
            setSubmitting(false || history.goBack())
          } catch (e) {}
        } else {
          //ProsesUpdateData
          try {
            let res = await api.put(`master/employees/${formId}`, Data)
            openSnackbar(
              `Record 'Employee Number: ${
                values.employee_number
              } Employee Name: ${
                values.given_name +
                " " +
                values?.middle_name +
                " " +
                values.surname
              }' has been successfully update.`,
            )
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
            <FormMobile className="mobile-form"></FormMobile>
            <div className="employee-form">
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
                            <h3 className="card-heading">
                              General Information
                            </h3>
                            <div style={{ padding: "0 15px 15px" }}>
                              <Row>
                                <Col
                                  lg={11}
                                  className="order-last order-lg-first "
                                >
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
                                    maxLength="128"
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Middle Name"
                                    name="middle_name"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    maxLength="128"
                                  />
                                  <FormikControl
                                    control="input"
                                    required="label-required"
                                    label="Last Name"
                                    name="surname"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    maxLength="128"
                                  />
                                  <Row className="form-group required">
                                    <Col column md={3} lg={4}>
                                      <label className="text-label-input">
                                        Date Of Birth
                                        <span className="label-required" />
                                      </label>
                                    </Col>
                                    <Col className="mb-2" md={9} lg={8}>
                                      <div
                                        style={{
                                          maxWidth: 400,
                                          display: "flex",
                                        }}
                                      >
                                        <div
                                          style={{ marginRight: 12, flex: 1 }}
                                        >
                                          <FormikControl
                                            control="selectOnly"
                                            name="birth_date[0]"
                                            placeholder={dayToday}
                                            options={selectDay()}
                                            onChange={(v) => {
                                              formik.setFieldValue(
                                                "birth_date[0]",
                                                v,
                                              )
                                            }}
                                            style={{ maxWidth: 240 }}
                                            isDisabled={isView}
                                          />
                                        </div>
                                        <div
                                          style={{ marginRight: 12, flex: 1 }}
                                        >
                                          <FormikControl
                                            control="selectOnly"
                                            name="birth_date[1]"
                                            placeholder={monthToday}
                                            options={selectMonth()}
                                            onChange={(v) => {
                                              formik.setFieldValue(
                                                "birth_date[1]",
                                                v,
                                              )
                                              setMonths(v)
                                            }}
                                            style={{
                                              minWidth: 110,
                                              maxWidth: 240,
                                            }}
                                            isDisabled={isView}
                                          />
                                        </div>
                                        <div
                                          style={{ marginRight: 12, flex: 1 }}
                                        >
                                          <FormikControl
                                            control="selectOnly"
                                            name="birth_date[2]"
                                            placeholder={yearToday}
                                            options={selectYear()}
                                            onChange={(v) => {
                                              formik.setFieldValue(
                                                "birth_date[2]",
                                                v,
                                              )
                                              setYears(v)
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
                                    disabled={isView}
                                  />
                                  <FormikControl
                                    control="input"
                                    label="ID Card Number (KTP)"
                                    name="ktp"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    maxLength="36"
                                  />
                                </Col>
                                <Col
                                  lg={1}
                                  className="d-flex justify-content-lg-center justify-content-md-start justify-content-center order-first order-lg-last p-0"
                                >
                                  <div>
                                    <div>
                                      <FormikControl
                                        control="imageProfile"
                                        id="employee_icon"
                                        type="imageProfile"
                                        name="employee_asset"
                                        onChange={onChangePhotoProfile}
                                        disabled={isView}
                                        url={
                                          photoProfile.employee_asset
                                            ?.multimedia_description?.url ||
                                          formik.values.employee_asset
                                            ?.multimedia_description?.url
                                        }
                                      />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <h3 className="card-heading">Contacts</h3>
                            <Row>
                              <Col lg={11}>
                                <div style={{ padding: "0 15px 15px" }}>
                                  <FormikControl
                                    control="input"
                                    required="label-required"
                                    label="Home Phone"
                                    name="contact.phone_number"
                                    style={{ maxWidth: 200 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="32"
                                  />
                                  <FormikControl
                                    control="input"
                                    required="label-required"
                                    label="Mobile Phone"
                                    name="contact.mobile_phone_number"
                                    style={{ maxWidth: 200 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="32"
                                  />
                                  <FormikControl
                                    control="input"
                                    required="label-required"
                                    label="Email"
                                    name="contact.email"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    maxLength="256"
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Other Email"
                                    name="contact.other_email"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    maxLength="256"
                                  />
                                </div>
                              </Col>
                              <Col lg={1}></Col>
                            </Row>
                            <h3 className="card-heading">Current Address</h3>
                            <Row>
                              <Col lg={11}>
                                <div style={{ padding: "0 15px 15px" }}>
                                  <FormikControl
                                    control="textarea"
                                    label="Address"
                                    name="address.address_line"
                                    rows={3}
                                    style={{ maxWidth: 416 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="512"
                                  />
                                  <FormikControl
                                    control="selectAsync"
                                    required="label-required"
                                    label="Country"
                                    name="address.country_id"
                                    url={`master/countries`}
                                    fieldName={"country_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue(
                                        "address.country_id",
                                        v,
                                      )
                                      formik.setFieldValue(
                                        "address.state_province_id",
                                        { value: null, label: "Please choose" },
                                      )
                                      formik.setFieldValue("address.city_id", {
                                        value: null,
                                        label: "Please choose",
                                      })
                                    }}
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 300 }}
                                    isDisabled={isView}
                                  />                                  
                                  <FormikControl
                                    control="selectAsync"
                                    label="State/ Province"
                                    name="address.state_province_id"
                                    url={`master/state-provinces?filters=["country_id","=","${formik.values.address?.country_id?.value}"]&size=-1`}                        
                                    fieldName={"state_province_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue(
                                        "address.state_province_id",
                                        v,
                                      )
                                      formik.setFieldValue("address.city_id", {
                                        value: null,
                                        label: "Please choose",
                                      })
                                    }}
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 200 }}
                                    isDisabled={isView}
                                  />
                                  <FormikControl
                                    control="selectAsync"
                                    label="City"
                                    name="address.city_id"                                    
                                    url={`master/cities?filters=["state_province_id","=","${formik.values.address?.state_province_id?.value}"]&size=-1`}                                    
                                    fieldName={"city_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue("address.city_id", v)
                                    }}
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 200 }}
                                    isDisabled={isView}
                                  />                                  
                                  <FormikControl
                                    control="input"
                                    label="Zip Code"
                                    name="address.postal_code"
                                    style={{ maxWidth: 100 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="16"
                                  />
                                </div>
                              </Col>
                              <Col lg={1}></Col>
                            </Row>
                            <h3 className="card-heading">Permanent Address</h3>
                            <Row>
                              <Col lg={11}>
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
                                          : formik.values.address
                                              .state_province_id,
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
                                    minLength="1"
                                    maxLength="512"
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
                                        { value: null, label: "Please choose" },
                                      )
                                      formik.setFieldValue(
                                        "permanent_address.city_id",
                                        { value: null, label: "Please choose" },
                                      )
                                    }}
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 300 }}
                                    isDisabled={isView || sameAddress}
                                  />
                                  <FormikControl
                                    control="selectAsync"
                                    label="State/ Province"
                                    name="permanent_address.state_province_id"
                                    url={`master/state-provinces?filters=["country_id","=","${formik.values.permanent_address.country_id.value}"]&size=-1`}                                                                       
                                    fieldName={"state_province_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue(
                                        "permanent_address.state_province_id",
                                        v,
                                      )
                                      formik.setFieldValue(
                                        "permanent_address.city_id",
                                        { value: null, label: "Please choose" },
                                      )
                                    }}
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 200 }}
                                    isDisabled={isView || sameAddress}
                                  />
                                  <FormikControl
                                    control="selectAsync"
                                    label="City"
                                    name="permanent_address.city_id"
                                    url={`master/cities?filters=["state_province_id","=","${formik.values.permanent_address.state_province_id.value}"]&size=-1`}
                                    
                                    
                                    fieldName={"city_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue(
                                        "permanent_address.city_id",
                                        v,
                                      )
                                    }}
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 200 }}
                                    isDisabled={isView || sameAddress}
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Zip Code"
                                    name="permanent_address.postal_code"
                                    style={{ maxWidth: 100 }}
                                    disabled={isView || sameAddress}
                                    minLength="1"
                                    maxLength="16"
                                  />
                                </div>
                              </Col>
                              <Col lg={1}></Col>
                            </Row>
                          </Card.Body>
                        </Card>
                        <div
                          className="mb-5 ml-1 row justify-content-md-start justify-content-center"
                          style={{
                            marginBottom: 30,
                            marginTop: 30,
                            display: "flex",
                          }}
                        >
                          {isView ? (
                            <>
                              <Button
                                variant="secondary"
                                onClick={() => history.goBack()}
                              >
                                BACK
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="primary"
                                onClick={() => setTabKey("emergency-contacts")}
                                disabled={formik.isSubmitting}
                                style={{ marginRight: 15 }}
                              >
                                {props.match.params.id ? "SAVE" : "SAVE & NEXT"}
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => history.goBack()}
                              >
                                CANCEL
                              </Button>
                            </>
                          )}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="emergency-contacts">
                        <Card>
                          <Card.Body>
                            <h3 className="card-heading">
                              Emergency Contact 1
                            </h3>
                            <Row>
                              <Col lg={11}>
                                <div style={{ padding: "0 15px 15px" }}>
                                  <FormikControl
                                    control="input"
                                    label="Full Name"
                                    name="emergency_contact.contact_name"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="128"
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Phone Number"
                                    name="emergency_contact.contact_phone_number"
                                    style={{ maxWidth: 200 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="32"
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Relationship"
                                    name="emergency_contact.relationship"
                                    style={{ maxWidth: 200 }}
                                    disabled={isView}
                                    minlength="1"
                                    maxlength="36"
                                  />
                                </div>
                              </Col>
                              <Col lg={1}></Col>
                            </Row>

                            <h3 className="card-heading">
                              Emergency Contact 2
                            </h3>
                            <Row>
                              <Col lg={11}>
                                <div style={{ padding: "0 15px 15px" }}>
                                  <FormikControl
                                    control="input"
                                    label="Full Name"
                                    name="emergency_contact2.contact_name"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="128"
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Phone Number"
                                    name="emergency_contact2.contact_phone_number"
                                    style={{ maxWidth: 200 }}
                                    disabled={isView}
                                    minlength="1"
                                    maxlength="32"
                                  />
                                  <FormikControl
                                    control="input"
                                    label="Relationship"
                                    name="emergency_contact2.relationship"
                                    style={{ maxWidth: 200 }}
                                    disabled={isView}
                                    minLength="1"
                                    maxLength="36"
                                  />
                                </div>
                              </Col>
                              <Col lg={1}></Col>
                            </Row>
                          </Card.Body>
                        </Card>
                        <div
                          className="mb-5 ml-1 row justify-content-md-start justify-content-center"
                          style={{
                            marginBottom: 30,
                            marginTop: 30,
                            display: "flex",
                          }}
                        >
                          {isView ? (
                            <>
                              <Button
                                variant="secondary"
                                onClick={() => history.goBack()}
                              >
                                BACK
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="primary"   
                                onClick={() => setTabKey("employment")}                             
                                disabled={formik.isSubmitting}
                                style={{ marginRight: 15 }}
                              >
                                {props.match.params.id ? "SAVE" : "SAVE & NEXT"}
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => history.goBack()}
                              >
                                CANCEL
                              </Button>
                            </>
                          )}                          
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="employment">
                        <Card>
                          <Card.Body>
                            <h3 className="card-heading">Employment</h3>
                            <Row>
                              <Col lg={11}>
                                <div style={{ padding: "0 15px 15px" }}>
                                  <FormikControl
                                    control="input"
                                    required="label-required"
                                    label="Employee ID"
                                    name="employee_number"
                                    style={{ maxWidth: 250 }}
                                    disabled={isView}
                                    minlength="1"
                                    maxlength="36"
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
                                    placeholder={"Please choose"}
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
                                    placeholder={"Please choose"}
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
                                    placeholder={"Please choose"}
                                    style={{ maxWidth: 200 }}
                                    isDisabled={isView}
                                  />
                                  <Row className="required">
                                    <Col column md={3} lg={4}>
                                      <label className="text-label-input">
                                        Hiring Date
                                        <span className="label-required" />
                                      </label>
                                    </Col>
                                    <Col className="mb-2" md={9} lg={8}>
                                      <div
                                        style={{
                                          maxWidth: 400,
                                          display: "flex",
                                        }}
                                      >
                                        <div
                                          style={{ marginRight: 12, flex: 1 }}
                                        >
                                          <FormikControl
                                            control="selectOnly"
                                            name="hire_date[0]"
                                            onChange={(v) => {
                                              formik.setFieldValue(
                                                "hire_date[0]",
                                                v,
                                              )
                                            }}
                                            options={selectDay()}
                                            placeholder={dayToday}
                                            style={{ maxWidth: 240 }}
                                            isDisabled={isView}
                                          />
                                        </div>
                                        <div
                                          style={{ marginRight: 12, flex: 1 }}
                                        >
                                          <FormikControl
                                            control="selectOnly"
                                            name="hire_date[1]"
                                            placeholder={monthToday}
                                            options={selectMonth()}
                                            onChange={(v) => {
                                              formik.setFieldValue(
                                                "hire_date[1]",
                                                v,
                                              )
                                              setMonths(v)
                                            }}
                                            style={{
                                              minWidth: 120,
                                              maxWidth: 240,
                                            }}
                                            isDisabled={isView}
                                          />
                                        </div>
                                        <div
                                          style={{ marginRight: 12, flex: 1 }}
                                        >
                                          <FormikControl
                                            control="selectOnly"
                                            name="hire_date[2]"
                                            placeholder={yearToday}
                                            options={selectYear()}
                                            onChange={(v) => {
                                              formik.setFieldValue(
                                                "hire_date[2]",
                                                v,
                                              )
                                              setYears(v)
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
                                    minLength="1"
                                    maxLength="32"
                                  />
                                </div>
                              </Col>
                              <Col lg={1}></Col>
                            </Row>

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
                                          "Please choose"
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
                                          "Please choose"
                                        }
                                        style={{ maxWidth: 200 }}
                                      /> */}
                                  </div>
                                </div>
                              </>
                            )}
                            <div className="d-flex flex-row-reverse">
                              <div
                                onClick={() =>
                                  setAdditionalRole(!additionalRole)
                                }
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
                          className="mb-5 ml-1 row justify-content-md-start justify-content-center"
                          style={{
                            marginBottom: 30,
                            marginTop: 30,
                            display: "flex",
                          }}
                        >
                          {isView ? (
                            <>
                              <Button
                                variant="secondary"
                                onClick={() => history.goBack()}
                              >
                                BACK
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="primary"
                                type="submit"                                
                                disabled={!(formik.dirty || formik.isValid)}
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
                            </>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default withRouter(EmployeeForm)
