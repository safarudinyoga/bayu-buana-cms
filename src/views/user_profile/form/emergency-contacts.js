import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import Api from "config/api"
import "./user-profile-form.css"
import { useSnackbar } from "react-simple-snackbar"

const options = {
  position: "bottom-right",
}

const EmergencyContacts = (props) => {
  let api = new Api()

  const [openSnackbar] = useSnackbar(options)

  // Initialize form
  const [initialForm, setIntialForm] = useState({
    // Emergency Contact 1
    fullNameEmergency1: "",
    phoneNumberEmergency1: "",
    relationshipEmergency1: "",

    // Emergency Contact 2
    fullNameEmergency2: "",
    phoneNumberEmergency2: "",
    relationshipEmergency2: "",
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // Emergency Contact 1
    fullNameEmergency1: Yup.string(),
    phoneNumberEmergency1: Yup.string(),
    relationshipEmergency1: Yup.string(),

    // Emergency Contact 2
    fullNameEmergency2: Yup.string(),
    phoneNumberEmergency2: Yup.string(),
    relationshipEmergency2: Yup.string(),
  })

  useEffect(async () => {
    try {
      let res = await api.get("/user/profile")
      let data = res.data;
      setIntialForm({
        ...initialForm,
        
        // Emergency Contact 1
        fullNameEmergency1: data.emergency_contact.contact_name ? data.emergency_contact.contact_name : "",
        phoneNumberEmergency1: data.emergency_contact.contact_phone_number ? data.emergency_contact.contact_phone_number : "",
        relationshipEmergency1: data.emergency_contact.relationship ? data.emergency_contact.relationship : "",

        // Emergency Contact 2
        fullNameEmergency2: data.emergency_contact2.contact_name ? data.emergency_contact2.contact_name : "",
        phoneNumberEmergency2: data.emergency_contact2.contact_phone_number ? data.emergency_contact2.contact_phone_number : "",
        relationshipEmergency2: data.emergency_contact2.relationship ? data.emergency_contact2.relationship : "",

      })
    } catch(e) {}
  }, [])

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {

        let formatted = {
          emergency_contact: {
            contact_name: values.fullNameEmergency1,
            contact_phone_number: values.phoneNumberEmergency1,
            relationship: values.relationshipEmergency1
          },
          emergency_contact2: {
            contact_name: values.fullNameEmergency2,
            contact_phone_number: values.phoneNumberEmergency2,
            relationship: values.relationshipEmergency2
          }
        }

        try {
          await api.put("user/profile", formatted)
          openSnackbar(
            `Your profile has been successfully updated.`
          )
        } catch(e) {}
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
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Card style={{marginBottom: 0}}>
              <Card.Body>
                <h3 className="card-heading">Emergency Contact 1</h3>
                <div style={{ padding: "0 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Full Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="fullNameEmergency1"
                        type="text"
                        value={values.fullNameEmergency1}
                        minLength={1}
                        maxLength={128}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Phone Number
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="phoneNumberEmergency1"
                        type="tel"
                        pattern="^[+]?[0-9]{9,12}$"
                        value={values.phoneNumberEmergency1}
                        minLength={1}
                        maxLength={32}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Relationship
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="relationshipEmergency1"
                        type="text"
                        value={values.relationshipEmergency1}
                        minLength={1}
                        maxLength={36}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Emergency Contact 2</h3>
                <div style={{ padding: "0 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Full Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="fullNameEmergency2"
                        type="text"
                        value={values.fullNameEmergency2}
                        minLength={1}
                        maxLength={128}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Phone Number
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="phoneNumberEmergency2"
                        type="tel"
                        pattern="^[+]?[0-9]{9,12}$"
                        value={values.phoneNumberEmergency2}
                        minLength={1}
                        maxLength={32}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Relationship
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="relationshipEmergency2"
                        type="text"
                        value={values.relationshipEmergency2}
                        minLength={1}
                        maxLength={36}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                </div>
                {
                  props.isMobile ? (
                    <div className="mb-5 ml-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={!dirty || !isValid}
                        style={{ marginRight: 15 }}
                      >
                        SAVE
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.push("/")}
                      >
                        CANCEL
                      </Button>
                    </div>
                  ) : ""
                }
              </Card.Body>
            </Card>
            {
              props.isMobile ? "" : (
                <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!dirty || !isValid}
                    style={{ marginRight: 15 }}
                  >
                    SAVE
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.push("/")}
                  >
                    CANCEL
                  </Button>
                </div>
              )
            }
          </Form>
        )
      }}
    </Formik>
  )
}

export default EmergencyContacts
