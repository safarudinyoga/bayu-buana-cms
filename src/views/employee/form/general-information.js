import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Select from "react-select"
import { useFormik } from "formik"
import * as Yup from "yup"
import Api from "config/api"

const GeneralInformation = () => {
  const [selectCountry, setSelectCountry] = useState([])

  let api = new Api()

  const { handleSubmit, errors, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      // General Information
      title: "mr",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "male",
      idCardNumber: "",

      // Contacts
      homePhone: "",
      mobilePhone: "",
      email: "",
      otherEmail: "",

      // Current Address
      address: "",
      country: [],
    },
    validationSchema: Yup.object({
      // General Information
      title: Yup.string().required("Title is required."),
      firstName: Yup.string().required("Employee First Name is required."),
      middleName: Yup.string(),
      lastName: Yup.string().required("Employee Last Name is required."),
      dateOfBirth: Yup.string().required("Date of Birth is required."),
      gender: Yup.string().required("Gender is required."),
      idCardNumber: Yup.number(),

      // Contacts
      homePhone: Yup.number().required("Home Phone is required."),
      mobilePhone: Yup.number().required("Mobile Phone is required."),
      email: Yup.string()
        .email("Email is not valid.")
        .required("Email is required."),
      otherEmail: Yup.string().email("Email is not valid."),

      // Current Address
      address: Yup.string(),
      country: Yup.array().min(1, "Country is required."),
    }),
    onSubmit: () => {
      console.log("submit")
    },
  })

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
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Body>
          <h3 className="card-heading">General Information</h3>
          <div style={{ padding: "0 15px 15px" }}>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Title <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <div style={{ width: 90 }}>
                  <Select
                    options={[
                      { value: "mr", label: "Mr." },
                      { value: "mrs", label: "Mrs." },
                    ]}
                    defaultValue={{ value: "mr", label: "Mr." }}
                    className={`react-select ${
                      touched.title && Boolean(errors.title) ? "is-invalid" : ""
                    }`}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
                {touched.title && Boolean(errors.title) && (
                  <div class="invalid-feedback">
                    {touched.title ? errors.title : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                First Name <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  className={
                    touched.firstName && Boolean(errors.firstName)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={128}
                />
                {touched.firstName && Boolean(errors.firstName) && (
                  <div class="invalid-feedback">
                    {touched.firstName ? errors.firstName : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Middle Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={128} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Last Name <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  className={
                    touched.lastName && Boolean(errors.lastName)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={128}
                />
                {touched.lastName && Boolean(errors.lastName) && (
                  <div class="invalid-feedback">
                    {touched.lastName ? errors.lastName : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Date Of Birth <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  className={
                    touched.lastName && Boolean(errors.lastName)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={128}
                />
                {touched.lastName && Boolean(errors.lastName) && (
                  <div class="invalid-feedback">
                    {touched.lastName ? errors.lastName : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Gender <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  checked
                  name="gender"
                  value="male"
                  type="radio"
                  label="Male"
                  className={
                    touched.lastName && Boolean(errors.lastName)
                      ? "is-invalid"
                      : ""
                  }
                  style={{ marginRight: 30 }}
                  inline
                />
                <Form.Check
                  name="gender"
                  value="female"
                  type="radio"
                  label="Female"
                  className={
                    touched.lastName && Boolean(errors.lastName)
                      ? "is-invalid"
                      : ""
                  }
                  inline
                />
                {touched.lastName && Boolean(errors.lastName) && (
                  <div class="invalid-feedback">
                    {touched.lastName ? errors.lastName : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                ID Card Number (KTP)
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" type="number" maxLength={36} />
              </Col>
            </Form.Group>
          </div>
          <h3 className="card-heading">Contacts</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Home Phone <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  className={
                    touched.homePhone && Boolean(errors.homePhone)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={32}
                />
                {touched.homePhone && Boolean(errors.homePhone) && (
                  <div class="invalid-feedback">
                    {touched.homePhone ? errors.homePhone : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Mobile Phone <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  className={
                    touched.mobilePhone && Boolean(errors.mobilePhone)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={32}
                />
                {touched.mobilePhone && Boolean(errors.mobilePhone) && (
                  <div class="invalid-feedback">
                    {touched.mobilePhone ? errors.mobilePhone : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Email <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  className={
                    touched.email && Boolean(errors.email) ? "is-invalid" : ""
                  }
                  maxLength={256}
                />
                {touched.email && Boolean(errors.email) && (
                  <div class="invalid-feedback">
                    {touched.email ? errors.email : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Other Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  className={
                    touched.otherEmail && Boolean(errors.otherEmail)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={256}
                />
                {touched.otherEmail && Boolean(errors.otherEmail) && (
                  <div class="invalid-feedback">
                    {touched.otherEmail ? errors.otherEmail : ""}
                  </div>
                )}
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
                <Form.Control as="textarea" rows={3} maxLength={512} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Country <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <div style={{ width: 300 }}>
                  <Select
                    placeholder="Please choose"
                    options={selectCountry}
                    className={`react-select ${
                      touched.country && Boolean(errors.country)
                        ? "is-invalid"
                        : ""
                    }`}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
                {touched.country && Boolean(errors.country) && (
                  <div class="invalid-feedback">
                    {touched.country ? errors.country : ""}
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
                    placeholder="Please choose"
                    options={selectCountry}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
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
                    placeholder="Please choose"
                    options={selectCountry}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                ZIP Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={16} />
              </Col>
            </Form.Group>
          </div>
          <h3 className="card-heading">Permanent Address</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Address
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="textarea" rows={3} maxLength={512} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Country <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <div style={{ width: 300 }}>
                  <Select
                    placeholder="Please choose"
                    options={selectCountry}
                    className={`react-select ${
                      touched.country && Boolean(errors.country)
                        ? "is-invalid"
                        : ""
                    }`}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
                {touched.country && Boolean(errors.country) && (
                  <div class="invalid-feedback">
                    {touched.country ? errors.country : ""}
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
                    placeholder="Please choose"
                    options={selectCountry}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
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
                    placeholder="Please choose"
                    options={selectCountry}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                ZIP Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={16} />
              </Col>
            </Form.Group>
          </div>
        </Card.Body>
      </Card>
      <Button variant="primary" type="submit">
        SAVE & NEXT
      </Button>
      <Button variant="secondary">CANCEL</Button>
    </Form>
  )
}

export default GeneralInformation
