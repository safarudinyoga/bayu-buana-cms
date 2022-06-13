import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button, Collapse } from "react-bootstrap"
import { Formik, FastField, ErrorMessage } from "formik"
import TextError from "components/formik/textError"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import Select from "components/form/select"
import FormikControl from "../../../components/formik/formikControl"
import _ from "lodash"
import NumberFormat from "react-number-format"

const endpoint = "/master/configurations/standard-services"

function FlightPolicy(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const [RecurringReminderType, setRecurringReminderType] = useState(true)

  const data = [
    { value: "before", label: "Before" },
    { value: "after", label: "After" },
  ]

  const selectDays = () => {
    const options = []
    for (let i = 0; i <= 700; i++) {
      options.push({
        label: i,
        value: i,
      })
    }
    return options
  }

  const selectHours = () => {
    const options = []
    for (let i = 0; i <= 23; i++) {
      options.push({
        label: i,
        value: i,
      })
    }
    return options
  }

  const selectMinutes = () => {
    const options = []
    for (let i = 0; i <= 59; i++) {
      options.push({
        label: i,
        value: i,
      })
    }
    return options
  }

  const duplicateValue = async (fieldName, value) => {
    let filters = encodeURIComponent(
      JSON.stringify([
        [fieldName, "=", value],
        ["AND"],
        [
          "service_level.service_level_code",
          showCreateModal.service_level_code,
        ],
        ["AND"],
        ["status", 1],
      ]),
    )
    let res = await API.get(endpoint + `?filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if (!sameId) return res.data.items.length === 0

    return true
  }

  Yup.addMethod(Yup.object, "uniqueValueObject", function (fieldName, message) {
    return this.test("unique", message, function (field) {
      if (field) return duplicateValue(fieldName, field.value)
      return true
    })
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Flight Policy For Staff and Manager"
    if (!formId) {
      docTitle = "CREATE FLIGHT POLICY FOR STAFF AND MANAGER"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let res = await API.get(endpoint + "/" + formId)
        let data = res.data
        let day = Math.round(data.amount / 1440)
        let hour = Math.round((data.amount % 1440) / 60)
        let minute = (data.amount % 1440) % 60
        setFormValues({
          ...formValues,
          task_type: _.isEmpty(data.task_type)
            ? ""
            : {
                value: data.task_type_id,
                label: data.task_type.task_type_name,
              },
          response_time: data.amount
            ? [
                {
                  value: day,
                  label: day,
                },
                {
                  value: hour,
                  label: hour,
                },
                {
                  value: minute,
                  label: minute,
                },
              ]
            : [],
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const initialValues = {
    task_type: "",
    response_time: [],
  }

  const validationSchema = Yup.object().shape({
    task_type: Yup.object()
      .required("Task Type is required.")
      .uniqueValueObject("task_type_id", "Task Type already exists"),
    response_time: Yup.array().min(3, "Response Time is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateModal.id || props.id
      let amount =
        values.response_time[0].value * 1440 +
        values.response_time[1].value * 60 +
        values.response_time[2].value
      let form = {
        task_type_id: values.task_type.value,
        service_level_code: parseInt(showCreateModal.service_level_code),
        amount: amount,
      }

      if (!formId) {
        //Proses Create Data
        let res = await API.post(
          `/master/configurations/standard-services`,
          form,
        )
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Standard Service for Task Type: ${values.task_type.label}' has been successfully saved.`,
          }),
        )
      } else {
        let res = await API.put(
          `/master/configurations/standard-services/${formId}`,
          form,
        )
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Standard Service for Task Type: ${values.task_type.label}' has been successfully saved.`,
          }),
        )
      }
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
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
        <Form onSubmit={handleSubmit} className="ml-2">
          <Form.Group as={Row} className="form-group">
            <Form.Label column sm={3}>
              Destination<span className="form-label-required">*</span>
            </Form.Label>
            <Col sm={8}>
              <FastField name="task_type">
                {({ field, form }) => (
                  <div style={{ maxWidth: 200 }}>
                    <SelectAsync
                      {...field}
                      isClearable
                      isDisabled={isView}
                      url={`master/task-types`}
                      fieldName="task_type_name"
                      onChange={(v) => {
                        setFieldValue("task_type", v)
                      }}
                      placeholder="Please choose"
                      className={`react-select ${
                        form.touched.task_type && form.errors.task_type
                          ? "is-invalid"
                          : null
                      }`}
                      components={
                        isView
                          ? {
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                            }
                          : null
                      }
                    />
                    {form.touched.task_type && form.errors.task_type && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.task_type ? form.errors.task_type : null}
                      </Form.Control.Feedback>
                    )}
                  </div>
                )}
              </FastField>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Message Type<span className="form-label-required">*</span>
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="message_type">
                {({ field, form }) => (
                  <div style={{ maxWidth: 200 }}>
                    <SelectAsync
                      {...field}
                      isClearable
                      url={`master/message-types`}
                      fieldName="message_type_name"
                      onChange={(v) => {
                        setFieldValue("message_type", v)
                      }}
                      placeholder="Please choose"
                      className={`react-select ${
                        form.touched.message_type && form.errors.message_type
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    {form.touched.message_type && form.errors.message_type && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.message_type
                          ? form.errors.message_type
                          : null}
                      </Form.Control.Feedback>
                    )}
                  </div>
                )}
              </FastField>
            </Col>
          </Form.Group>

          <Row className="form-group mb-0">
            <Col className="ml-0">
              <FormikControl
                control="input"
                label="Commission Percentage"
                name="percent"
                required="label-required"
                className
                style={{ maxWidth: 100 }}
                // isDisabled={isView}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={12} lg={8}>
              <Form.Group as={Row} className="form-group" id="accordion">
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

                    <Collapse in={RecurringReminderType} id="headingOne">
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
                          <Form.Label className="ml-4 ">Every</Form.Label>
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
                                    form.touched.every && form.errors.every
                                  }
                                  isAllowed={(values) => {
                                    const { formattedValue, floatValue } =
                                      values
                                    return (
                                      formattedValue === "" || floatValue <= 700
                                    )
                                  }}
                                  allowNegative={true}
                                />
                                {form.touched.every && form.errors.every && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.every
                                      ? form.errors.every
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                              </>
                            )}
                          </FastField>

                          <Form.Label className="ml-2">day(s)</Form.Label>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Collapse in={RecurringReminderType} id="headingTwo">
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
                          <Form.Label className="ml-4 ">Every</Form.Label>
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
                                      form.touched.every && form.errors.every
                                    }
                                    isAllowed={(values) => {
                                      const { formattedValue, floatValue } =
                                        values
                                      return (
                                        formattedValue === "" ||
                                        floatValue <= 700
                                      )
                                    }}
                                    allowNegative={true}
                                  />
                                  {form.touched.every && form.errors.every && (
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
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (type) => (
                          <div key={`inline-${type}`} className="mb-3 ml-2">
                            <Form.Label>{type}</Form.Label>
                            <Form.Check
                              name="group"
                              type="radio"
                              id={`inline-${type}-1`}
                            />
                          </div>
                        ),
                      )}
                    </Row>

                    <Collapse in={RecurringReminderType} id="headingThree">
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
                                      form.touched.every && form.errors.every
                                    }
                                    isAllowed={(values) => {
                                      const { formattedValue, floatValue } =
                                        values
                                      return (
                                        formattedValue === "" ||
                                        floatValue <= 31
                                      )
                                    }}
                                    allowNegative={true}
                                  />
                                  {form.touched.every && form.errors.every && (
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
                                      form.touched.every && form.errors.every
                                    }
                                    isAllowed={(values) => {
                                      const { formattedValue, floatValue } =
                                        values
                                      return (
                                        formattedValue === "" ||
                                        floatValue <= 700
                                      )
                                    }}
                                    allowNegative={true}
                                  />
                                  {form.touched.every && form.errors.every && (
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

          {!props.hideButton && (
            <div
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!isView && (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>
              )}
              <CancelButton
                onClick={() =>
                  dispatch(
                    setCreateModal({
                      show: false,
                      id: null,
                      disabled_form: false,
                    }),
                  )
                }
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(FlightPolicy)
