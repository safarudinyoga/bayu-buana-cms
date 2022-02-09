import { Formik } from 'formik';
import { values } from 'lodash-es';
import React from 'react';
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import * as Yup from "yup"

const SecuritySettings = (props) => {

  // Initialize form
  const initialForm = {
    // Change Password
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // Change Password
    oldPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'New Password must match'),
  })

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)

        return props.handleSelectTab("subscriptions")
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
                <h3 className="card-heading">Two Factor Authentication</h3>
                <div style={{ padding: "0 15px 40px 0" }}>
                  <Button
                    style={{ background: "#E84D0E", border: "#E84D0E" }}
                  >
                    Enable two factor authentication
                  </Button>
                </div>
                

                <h3 className="card-heading">Change Password</h3>
                <div style={{ padding: "0 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Old Password
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        name="oldPassword"
                        type="password"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      New Password
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        name="newPassword"
                        type="password"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Confirm Password
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
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


    
  );
}

export default SecuritySettings;
