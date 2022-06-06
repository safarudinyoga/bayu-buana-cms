import React, { useState } from "react"
import { Card, Form, Row, Col, Button, Collapse } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import NumberFormat from "react-number-format"
import useQuery from "lib/query"
import Select from "react-select"

const InvoiceSetting = (props) => {
  const isView = useQuery().get("action") === "view"
  const [RecurringReminderType, setRecurringReminderType] = useState(false)

  const data = [
    { value: "before", label: "Before" },
    { value: "after", label: "After" },
  ]

  const initialValues = {
    every: "",
    response_time: [],
  }

  const validationSchema = Yup.object().shape({
    every: Yup.number()
      .typeError("you must specify a number")
      .min(0, "Min value 0.")
      .max(30, "Max value 700."),
    response_time: Yup.array().min(3, "Response Time is required."),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
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
                  <h3 className="card-heading">Invoice Settings</h3>
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
                      <Form.Label style={{ textTransform: "uppercase" }}>
                        Invoice Reminder{" "}
                      </Form.Label>
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
                          Day(s)
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
                      <Form.Group
                        as={Row}
                        className="form-group"
                        id="accordion"
                      >
                        <Col sm={12} md={10}>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="checkbox"
                              label="Send Recurring Reminders"
                              className="mt-2 ml-1"
                              onClick={() =>
                                setRecurringReminderType(!RecurringReminderType)
                              }
                              aria-expanded={RecurringReminderType}
                            />

                            <Collapse
                              in={RecurringReminderType}
                              id="headingOne"
                            >
                              <Form.Check
                                inline
                                className="mt-2 ml-5"
                                label="Daily"
                                name="group1"
                                type="radio"
                                id="inline-tek-2"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              />
                            </Collapse>
                            <Row
                              className="mt-3 ml-5 collapse"
                              id="collapseOne"
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >
                              <Col sm={12} md={5}>
                                <Form.Group as={Row} className="mb-xs-3">
                                  <Form.Label className="ml-4 ">
                                    Every
                                  </Form.Label>
                                  <FastField name="every" disabled>
                                    {({ field, form }) => (
                                      <>
                                        <NumberFormat
                                          {...field}
                                          className="form-control"
                                          thousandsGroupStyle="thousand"
                                          displayType="input"
                                          type="text"
                                          style={{
                                            width: "60px",
                                            marginLeft: "12px",
                                          }}
                                          isInvalid={
                                            form.touched.every &&
                                            form.errors.every
                                          }
                                          isAllowed={(values) => {
                                            const {
                                              formattedValue,
                                              floatValue,
                                            } = values
                                            return (
                                              formattedValue === "" ||
                                              floatValue <= 700
                                            )
                                          }}
                                          allowNegative={true}
                                        />
                                        {form.touched.every &&
                                          form.errors.every && (
                                            <Form.Control.Feedback type="invalid">
                                              {form.touched.every
                                                ? form.errors.every
                                                : null}
                                            </Form.Control.Feedback>
                                          )}
                                      </>
                                    )}
                                  </FastField>

                                  <Form.Label className="ml-2">
                                    day(s)
                                  </Form.Label>
                                </Form.Group>
                              </Col>
                            </Row>

                            <Collapse
                              in={RecurringReminderType}
                              id="headingTwo"
                            >
                              <Form.Check
                                className="mt-2 ml-5 collapsed"
                                label="Weekly"
                                type="radio"
                                name="group1"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              />
                            </Collapse>

                            <Row
                              className="mt-3 ml-5 collapse"
                              aria-labelledby="headingTwo"
                              data-parent="#accordion"
                              id="collapseTwo"
                            >
                              <Col sm={12} md={6}>
                                <Form.Group as={Row} className="mb-xs-3">
                                  <Form.Label className="ml-4 ">
                                    Every
                                  </Form.Label>
                                  <Col xs={10} md={4} lg={5}>
                                    <FastField name="weekly" disabled>
                                      {({ field, form }) => (
                                        <>
                                          <NumberFormat
                                            {...field}
                                            className="form-control"
                                            thousandsGroupStyle="thousand"
                                            displayType="input"
                                            type="text"
                                            style={{ maxWidth: "220px" }}
                                            isInvalid={
                                              form.touched.every &&
                                              form.errors.every
                                            }
                                            isAllowed={(values) => {
                                              const {
                                                formattedValue,
                                                floatValue,
                                              } = values
                                              return (
                                                formattedValue === "" ||
                                                floatValue <= 700
                                              )
                                            }}
                                            allowNegative={true}
                                          />
                                          {form.touched.every &&
                                            form.errors.every && (
                                              <Form.Control.Feedback type="invalid">
                                                {form.touched.every
                                                  ? form.errors.every
                                                  : null}
                                              </Form.Control.Feedback>
                                            )}
                                        </>
                                      )}
                                    </FastField>
                                  </Col>
                                  <Form.Label>week(s) on</Form.Label>
                                </Form.Group>
                              </Col>
                              {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                              ].map((type) => (
                                <div
                                  key={`inline-${type}`}
                                  className="mb-3 ml-2"
                                >
                                  <Form.Label>{type}</Form.Label>
                                  <Form.Check
                                    name="group"
                                    type="radio"
                                    id={`inline-${type}-1`}
                                  />
                                </div>
                              ))}
                            </Row>

                            <Collapse
                              in={RecurringReminderType}
                              id="headingThree"
                            >
                              <Form.Check
                                className="mt-2 ml-5 collapse"
                                label="Monthly"
                                name="group1"
                                type="radio"
                                data-toggle="collapse"
                                data-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              />
                            </Collapse>

                            <Row
                              className="mt-3 ml-5 collapse"
                              aria-labelledby="headingThree"
                              data-parent="#accordion"
                              id="collapseThree"
                            >
                              <Col sm={12} md={6}>
                                <Form.Group as={Row} className="mb-xs-3">
                                  <Form.Label className="ml-4 ">Day</Form.Label>
                                  <Col xs={10} md={4} lg={7}>
                                    <FastField name="montly" disabled>
                                      {({ field, form }) => (
                                        <>
                                          <NumberFormat
                                            {...field}
                                            className="form-control"
                                            thousandsGroupStyle="thousand"
                                            displayType="input"
                                            type="text"
                                            style={{ maxWidth: "100px" }}
                                            isInvalid={
                                              form.touched.every &&
                                              form.errors.every
                                            }
                                            isAllowed={(values) => {
                                              const {
                                                formattedValue,
                                                floatValue,
                                              } = values
                                              return (
                                                formattedValue === "" ||
                                                floatValue <= 31
                                              )
                                            }}
                                            allowNegative={true}
                                          />
                                          {form.touched.every &&
                                            form.errors.every && (
                                              <Form.Control.Feedback type="invalid">
                                                {form.touched.every
                                                  ? form.errors.every
                                                  : null}
                                              </Form.Control.Feedback>
                                            )}
                                        </>
                                      )}
                                    </FastField>
                                  </Col>
                                  <Form.Label>of every</Form.Label>
                                </Form.Group>
                              </Col>
                              <Col sm={12} md={4}>
                                <Form.Group as={Row} className="mb-xs-3">
                                  <Col xs={10} md={6} lg={7}>
                                    <FastField name="every-monthy" disabled>
                                      {({ field, form }) => (
                                        <>
                                          <NumberFormat
                                            {...field}
                                            className="form-control"
                                            thousandsGroupStyle="thousand"
                                            displayType="input"
                                            type="text"
                                            style={{ maxWidth: "220px" }}
                                            isInvalid={
                                              form.touched.every &&
                                              form.errors.every
                                            }
                                            isAllowed={(values) => {
                                              const {
                                                formattedValue,
                                                floatValue,
                                              } = values
                                              return (
                                                formattedValue === "" ||
                                                floatValue <= 700
                                              )
                                            }}
                                            allowNegative={true}
                                          />
                                          {form.touched.every &&
                                            form.errors.every && (
                                              <Form.Control.Feedback type="invalid">
                                                {form.touched.every
                                                  ? form.errors.every
                                                  : null}
                                              </Form.Control.Feedback>
                                            )}
                                        </>
                                      )}
                                    </FastField>
                                  </Col>
                                  <Form.Label>month(s)</Form.Label>
                                </Form.Group>
                              </Col>
                            </Row>
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
