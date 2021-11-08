import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"

const GeneralInformation = () => {
  return (
    <Card>
      <Card.Body>
        <h3 className="card-heading">General Information</h3>
        <Form style={{ padding: 15 }}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title <span className="form-label-required">*</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
        </Form>
        <h3 className="card-heading">Contacts</h3>
        <h3 className="card-heading">Current Address</h3>
        <h3 className="card-heading">Permanent Address</h3>
      </Card.Body>
    </Card>
  )
}

export default GeneralInformation
