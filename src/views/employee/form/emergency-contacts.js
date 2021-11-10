import React, { useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Select from "react-select"
import { useFormik } from "formik"
import * as Yup from "yup"
import Api from "config/api"

const EmergencyContacts = () => {
  let api = new Api()

  const { handleSubmit, errors, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      // Emergency Contact 1
      fullNameEmergency1: "",
      phoneNumberEmergency1: "",
      relationshipEmergency1: "",

      // Emergency Contact 2
      fullNameEmergency2: "",
      phoneNumberEmergency2: "",
      relationshipEmergency2: "",
    },
    validationSchema: Yup.object({
      // Emergency Contact 1
      fullNameEmergency1: Yup.string(),
      phoneNumberEmergency1: Yup.string(),
      relationshipEmergency1: Yup.string(),

      // Emergency Contact 2
      fullNameEmergency2: Yup.string(),
      phoneNumberEmergency2: Yup.string(),
      relationshipEmergency2: Yup.string(),
    }),
    onSubmit: () => {
      console.log("submit")
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Emergency Contact 1</h3>
          <div style={{ padding: "0 15px 15px" }}>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Full Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={128} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Phone Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={32} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Relationship
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={36} />
              </Col>
            </Form.Group>
          </div>
          <h3 className="card-heading">Emergency Contact 2</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Full Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={128} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Phone Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={32} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Relationship
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" maxLength={36} />
              </Col>
            </Form.Group>
          </div>
        </Card.Body>
      </Card>
      <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
        <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
          SAVE & NEXT
        </Button>
        <Button variant="secondary">CANCEL</Button>
      </div>
    </Form>
  )
}

export default EmergencyContacts
