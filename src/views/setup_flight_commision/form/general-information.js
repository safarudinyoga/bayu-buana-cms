import React, { useState } from 'react'
import * as Yup from "yup"

import Api from "config/api"
import { FastField, Field, Formik } from 'formik'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import Select from 'components/form/select'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

const GeneralInformation = (props) => {
  const [airline, setAirline] = useState([])
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState()
  const [periodOfIssue, setPeriodOfIssue] = useState()
  const [periodOfIssueStart, setPeriodOfIssueStart] = useState(new Date())
  const [periodOfIssueEnd, setPeriodOfIssueEnd] = useState(new Date())
  const [periodOfDeparture, setPeriodOfDeparture] = useState()
  const [periodOfDepartureStart, setPeriodOfDepartureStart] = useState(new Date())
  const [periodOfDepartureEnd, setPeriodOfDepartureEnd] = useState(new Date())
  const [commision, setCommision] = useState(0)

  let api = new Api()

  const initialForm = {
    airline: "",
    origin: "",
    destination: "",
    periodOfIssue: "",
    issueSpecified: false,
    periodOfDeparture: "",
    departureSpecified: false,
    commision: 0,
  }

  const validationSchema = Yup.object().shape({
    airline: Yup.object().required("Airline is required."),
    origin: Yup.string().test('diff-destination', 'Origin and Destination must be different', (value) => {
      const { destination } = this.parent;
      return destination != value;
    }),
    destination: Yup.string().test('diff-origin', 'Origin and Destination must be different', (value) => {
      const { origin } = this.parent;
      return origin != value;
    }),
    periodOfIssue: Yup.object(),
    periodOfDeparture: Yup.object(),
    commision: Yup.number().min(0).max(100)
  })



  return (
    <>
      <Formik
        initialValues={initialForm}
      // validationSchema={validationSchema}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={4}>
                        Specified Airline <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={4}>
                        <Field name="airlines">
                          {({ field, form }) => (
                            <>
                              <Select
                                {...field}
                                options={[
                                  { value: "mr", label: "Mr." },
                                  { value: "mrs", label: "Mrs." },
                                ]}
                                defaultValue={values.title}
                                className={`react-select ${form.touched.title && form.errors.title
                                  ? "is-invalid"
                                  : null
                                  }`}
                                onChange={(v) => {
                                  setFieldValue("airlines", v)
                                }}
                              />
                              {form.touched.title && form.errors.title && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.title
                                    ? form.errors.title
                                    : null}
                                </Form.Control.Feedback>
                              )}
                            </>
                          )}
                        </Field>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={4}>
                        Route(s) <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={4}>
                        <Field name="origin">
                          {({ field, form }) => (
                            <>
                              <Select></Select>
                            </>
                          )}
                        </Field>
                      </Col>
                      <Col sm={4}>
                        <Field name="destination">
                          {({ field, form }) => (
                            <>
                              <Select></Select>
                            </>
                          )}
                        </Field>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Period of Issue
                      </Form.Label>
                      <Col sm={8}>
                        <Field name="issue_specified">
                          {({ field, form }) => (
                            <Form.Check
                              {...field}
                              checked={values.issueSpecified === false}
                              type="radio"
                              label="Not Specified"
                              isInvalid={
                                form.touched.gender && form.errors.gender
                              }
                              style={{ marginBottom: "20px" }}
                              onChange={() =>
                                setFieldValue("issueSpecified", false)
                              }
                            />
                          )}
                        </Field>
                        <Field name="issue_specified">
                          {({ field, form }) => (
                            <Row>
                              <Col sm={3}>
                                <Form.Check
                                  {...field}
                                  checked={values.issueSpecified === true}
                                  type="radio"
                                  label="Specify Period"
                                  isInvalid={
                                    form.touched.issueSpecified && form.errors.issueSpecified
                                  }
                                  onChange={() =>
                                    setFieldValue("issueSpecified", true)
                                  }
                                />
                              </Col>
                              <Col sm={4}>
                                <DatePicker className="form-control" selected={periodOfIssueStart} onChange={(date) => setPeriodOfIssueStart(date)} />
                              </Col>
                              <Col sm={1}>
                                to
                              </Col>
                              <Col sm={4}>
                                <DatePicker className="form-control" selected={periodOfIssueEnd} onChange={(date) => setPeriodOfIssueEnd(date)} />
                              </Col>
                            </Row>
                          )}
                        </Field>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Period of Departure
                      </Form.Label>
                      <Col sm={8}>
                        <Field name="departure_specified">
                          {({ field, form }) => (
                            <Form.Check
                              {...field}
                              checked={values.departureSpecified === false}
                              type="radio"
                              label="Not Specified"
                              isInvalid={
                                form.touched.gender && form.errors.gender
                              }
                              style={{ marginBottom: "20px" }}
                              onChange={() =>
                                setFieldValue("departureSpecified", false)
                              }
                            />
                          )}
                        </Field>
                        <Field name="departure_specified">
                          {({ field, form }) => (
                            <Row>
                              <Col sm={3}>
                                <Form.Check
                                  {...field}
                                  checked={values.departureSpecified === true}
                                  type="radio"
                                  label="Specify Period"
                                  isInvalid={
                                    form.touched.departureSpecified && form.errors.departureSpecified
                                  }
                                  onChange={() =>
                                    setFieldValue("departureSpecified", true)
                                  }
                                />
                              </Col>
                              <Col sm={4}>
                                <DatePicker className="form-control" selected={periodOfDepartureStart} onChange={(date) => setPeriodOfDepartureStart(date)} />
                              </Col>
                              <Col sm={1}>
                                to
                              </Col>
                              <Col sm={4}>
                                <DatePicker className="form-control" selected={periodOfDepartureEnd} onChange={(date) => setPeriodOfDepartureEnd(date)} />
                              </Col>
                            </Row>
                          )}
                        </Field>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={4}>
                        Commision Percentage
                      </Form.Label>
                      <Col sm={8}>
                        <Field name="commision">
                          {({ field, form }) => (
                            <>
                              <div style={{ width: 90, display: "inline-block" }}>
                                <Form.Control
                                  type="text"
                                />
                              </div>
                              <span style={{ marginLeft: 10 }}> %</span>
                            </>
                          )}
                        </Field>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push(props.backUrl)}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GeneralInformation