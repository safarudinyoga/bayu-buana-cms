import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import { FastField, Formik } from "formik"
import * as Yup from "yup"
import "./employee-form.css"
import { useSnackbar } from "react-simple-snackbar"
import _ from "lodash"
import useQuery from "lib/query"

const options = {
  position: "bottom-right",
}

const EmergencyContacts = (props) => {
  const isView = useQuery().get("action") === "view"

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

  const phoneNumberPlus = /^[0-9 ()+]+$/
  // Schema for yup
  const validationSchema = Yup.object().shape({
    // Emergency Contact 1
    fullNameEmergency1: Yup.string(),
    phoneNumberEmergency1: Yup.string().matches(
      phoneNumberPlus,
      "Phone Number is not valid",
    ),
    relationshipEmergency1: Yup.string(),

    // Emergency Contact 2
    fullNameEmergency2: Yup.string(),
    phoneNumberEmergency2: Yup.string().matches(
      phoneNumberPlus,
      "Phone Number is not valid",
    ),
    relationshipEmergency2: Yup.string(),
  })

  useEffect(async () => {
    try {
      if(props.employeeData) {
        let data = props.formData ? props.formData : props.employeeData
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
      }
    } catch(e) {}
  }, [props.employeeData, props.formData])

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

        console.log(formatted)

        try {
          await props.onSubmit(formatted)
        } catch(e) {
          console.log(e)
        }
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
                <div style={props.isMobile ? {padding: "0 15px 15px 0"} : { padding: "0 15px 15px 15px" }}>
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
                        style={{ maxWidth: 250 }}
                        disabled={isView}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Phone Number
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="phoneNumberEmergency1" disabled>
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              value={values.phoneNumberEmergency1}
                              minLength={1}
                              maxLength={32}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isView}
                              style={{ maxWidth: 200 }}
                              isInvalid={
                                form.touched.phoneNumberEmergency1 &&
                                form.errors.phoneNumberEmergency1
                              }
                            />

                            {form.touched.phoneNumberEmergency1 &&
                              form.errors.phoneNumberEmergency1 && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.phoneNumberEmergency1
                                    ? form.errors.phoneNumberEmergency1
                                    : null}
                                </Form.Control.Feedback>
                            )}
                          </>
                        )}
                      </FastField>
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
                        style={{ maxWidth: 200 }}
                        disabled={isView}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Emergency Contact 2</h3>
                <div style={props.isMobile ? {padding: "0 15px 30px 0"} : { padding: "0 15px 30px 15px" }}>
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
                        style={{ maxWidth: 250 }}
                        disabled={isView}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Phone Number
                    </Form.Label>
                    <Col sm={9}>
                    <FastField name="phoneNumberEmergency2" disabled>
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              value={values.phoneNumberEmergency2}
                              minLength={1}
                              maxLength={32}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isView}
                              style={{ maxWidth: 200 }}
                              isInvalid={
                                form.touched.phoneNumberEmergency2 &&
                                form.errors.phoneNumberEmergency2
                              }
                            />

                            {form.touched.phoneNumberEmergency2 &&
                              form.errors.phoneNumberEmergency2 && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.phoneNumberEmergency2
                                    ? form.errors.phoneNumberEmergency2
                                    : null}
                                </Form.Control.Feedback>
                            )}
                          </>
                        )}
                      </FastField>
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
                        style={{ maxWidth: 200 }}
                        disabled={isView}
                      />
                    </Col>
                  </Form.Group>
                </div>
                {
                  props.isMobile 
                  ? isView 
                  ? (<div className="mb-2 mt-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}                        
                      >
                        BACK
                      </Button>
                    </div>) 
                  : (
                    <div className="m-2 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                        style={{ marginRight: 15 }}
                      >
                        {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}                       
                      >
                        CANCEL
                      </Button>
                    </div>)
                  : ""
                }
              </Card.Body>
            </Card>
            {
              !props.isMobile 
              ? isView 
              ? (<>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
                    className="mt-3"
                  >
                    BACK
                  </Button>
                </>) 
              : (<div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                  <Button                    
                    variant="primary"
                    type="submit"
                    disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                    style={{ marginRight: 15, marginBottom: 135 }}
                  >
                    {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
                  >
                    CANCEL
                  </Button>
                </div>)
              : ""
            }
          </Form>
        )
      }}
    </Formik>
  )
}

export default EmergencyContacts
