import React, { useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import Api from "config/api"

const EmergencyContacts = (props) => {
  let api = new Api()

  // Initialize form
  const initialForm = {
    // Emergency Contact 1
    fullNameEmergency1: "",
    phoneNumberEmergency1: "",
    relationshipEmergency1: "",

    // Emergency Contact 2
    fullNameEmergency2: "",
    phoneNumberEmergency2: "",
    relationshipEmergency2: "",
  }

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

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)
        // setSubmitting(true)

        // try {
        //   let res = await api.post("master/employees", {
        //     division_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     employee_number: "string",
        //     hire_date: "2021-11-14T01:32:53.237Z",
        //     job_title_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     office_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     person_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     user_account_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //   })
        //   console.log(res)
        //   resetForm()
        //   setSubmitting(false)
        // } catch (e) {}
        return props.handleSelectTab("employment")
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
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Card>
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
                        type="text"
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
                        type="text"
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
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={!dirty}
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
        )
      }}
    </Formik>
  )
}

export default EmergencyContacts
