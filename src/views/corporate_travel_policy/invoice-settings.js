import React, { useState } from "react"
import { Card, Form, Row, Col, Button, Collapse } from "react-bootstrap"
import { Formik, FastField } from "formik"

import useQuery from "lib/query"
import Select from "react-select"

const InvoiceSetting = (props) => {
  const isView = useQuery().get("action") === "view"

  const [monthly, setMonthly] = useState(false)
  const [daily, setDaily] = useState(false)
  const [weekly, setWeekly] = useState(false)

  const data = [
    { value: "before", label: "Before" },
    { value: "after", label: "After" },
  ]

  return (
    <>
      <Formik validator={() => ({})} enableReinitialize>
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card style={{ marginBottom: 0 }}>
              <Card.Body>
                {props.isMobile ? (
                  ""
                ) : (
                  <h3 className="card-heading">Invoice Setting</h3>
                )}
                <div
                  style={
                    props.isMobile
                      ? { padding: "0" }
                      : { padding: "0 15px 15px 15px" }
                  }
                >
                  <Row>
                    <Col sm={12} md={12} lg={8}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={3}>
                          Send First Reminder
                        </Form.Label>
                        <Col md={12} lg={2}>
                          <FastField name="firstName" disabled>
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  disabled={isView}
                                  isInvalid={
                                    form.touched.firstName &&
                                    form.errors.firstName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  {...field}
                                  style={{ maxWidth: 200 }}
                                />
                                {form.touched.firstName &&
                                  form.errors.firstName && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.firstName
                                        ? form.errors.firstName
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                        <Form.Label column md={3} lg={1}>
                          Days
                        </Form.Label>

                        <Col md={12} lg={2}>
                          <FastField name="firstName" disabled>
                            {({ field, form }) => (
                              <>
                                <Select options={data} defaultValue={data[1]} />
                              </>
                            )}
                          </FastField>
                        </Col>
                        <Col md={12} lg={2}>
                          <Form.Label>Invoice Due Date</Form.Label>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Col sm={12} md={10}>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="checkbox"
                              label="Send Recurring Reminders"
                              className="mt-2 ml-1"
                            />

                            <Form.Check
                              inline
                              className="mt-2 ml-5"
                              label="Daily"
                              name="group1"
                              type="radio"
                              id="inline-tek-2"
                              onClick={() => setDaily(!daily)}
                              aria-expanded={daily}
                            />
                            <Collapse in={daily}>
                              <Row className="mt-3 ml-5">
                                <Col sm={12} md={4}>
                                  <Form.Group as={Row} className="mb-xs-3">
                                    <Form.Label>Every</Form.Label>
                                    <Col xs={10} md={4} lg={7}>
                                      <Form.Control
                                        style={{ maxWidth: "220px" }}
                                      />
                                    </Col>
                                    <Form.Label>day (s)</Form.Label>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Collapse>
                            <Form.Check
                              className="mt-2 ml-5"
                              label="Weekly"
                              name="group1"
                              type="radio"
                              id="inline-tek-2"
                              onClick={() => setWeekly(!weekly)}
                              aria-expanded={weekly}
                            />
                            <Collapse in={weekly}>
                              <Row className="mt-3 ml-5">
                                <Col sm={12} md={4}>
                                  <Form.Group as={Row} className="mb-xs-3">
                                    <Form.Label>Every</Form.Label>
                                    <Col xs={10} md={4} lg={5}>
                                      <Form.Control
                                        style={{ maxWidth: "220px" }}
                                      />
                                    </Col>
                                    <Form.Label>week (s) On</Form.Label>
                                  </Form.Group>
                                </Col>
                                {[
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Friday",
                                  "Sat",
                                  "Sun",
                                ].map((type) => (
                                  <div
                                    key={`inline-${type}`}
                                    className="mb-3 ml-2"
                                  >
                                    <Form.Label>{type}</Form.Label>
                                    <Form.Check
                                      name="group1"
                                      type="radio"
                                      id={`inline-${type}-1`}
                                    />
                                  </div>
                                ))}
                              </Row>
                            </Collapse>
                            <Form.Check
                              className="mt-2 ml-5"
                              label="Monthly"
                              name="group1"
                              type="radio"
                              id="inline-tek-2"
                              onClick={() => setMonthly(!monthly)}
                              aria-expanded={monthly}
                            />
                            <Collapse in={monthly}>
                              <Row className="mt-3 ml-5">
                                <Col sm={12} md={4}>
                                  <Form.Group as={Row} className="mb-xs-3">
                                    <Form.Label>Day</Form.Label>
                                    <Col xs={10} md={4} lg={7}>
                                      <Form.Control
                                        style={{ maxWidth: "220px" }}
                                      />
                                    </Col>
                                    <Form.Label>Of Every</Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col sm={12} md={4}>
                                  <Form.Group as={Row} className="mb-xs-3">
                                    <Col xs={10} md={4} lg={7}>
                                      <Form.Control
                                        style={{ maxWidth: "220px" }}
                                      />
                                    </Col>
                                    <Form.Label>month (s)</Form.Label>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Collapse>
                          </Form.Group>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                {props.isMobile ? (
                  isView ? (
                    <div className="mb-2 mt-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                      >
                        BACK
                      </Button>
                    </div>
                  ) : (
                    <div className="ml-3 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={
                          props.finishStep > 0 || props.employeeData?.id
                            ? !isValid || isSubmitting
                            : !dirty || isSubmitting
                        }
                        style={{
                          marginRight: 15,
                          marginBottom: 40,
                          marginTop: 95,
                        }}
                      >
                        {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                        style={{
                          marginRight: 15,
                          marginBottom: 40,
                          marginTop: 95,
                        }}
                      >
                        CANCEL
                      </Button>
                    </div>
                  )
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
            {!props.isMobile ? (
              isView ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
                    className="mt-3"
                  >
                    BACK
                  </Button>
                </>
              ) : (
                <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={
                      props.finishStep > 0 || props.employeeData?.id
                        ? !isValid || isSubmitting
                        : !dirty || isSubmitting
                    }
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
                </div>
              )
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default InvoiceSetting
