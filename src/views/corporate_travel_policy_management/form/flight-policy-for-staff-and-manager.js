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
import "../style.scss"

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
              Destination<span className="form-label-required">*</span>
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
          <Col className="policy-class-modal-title">
            <h6>CABIN CLASS</h6>
          </Col>
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
          <Row>
            <Col sm={12} md={12} lg={8}>
              <Form.Group as={Row} className="form-group" id="accordion">
                <Col sm={12} md={10}>
                  <Form.Group className="mb-3">
                    <h>Differentiate Short and Long Flights?</h>
                    <Row className="form-group mb-0">
                      <Col className="ml-0">
                        <FormikControl
                          control="input"
                          label="Short Flight Duration up to"
                          name="percent"
                          required="label-required"
                          className
                          style={{ maxWidth: 100 }}
                          // isDisabled={isView}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Collapse in={RecurringReminderType} id="headingOne">
                        <Form.Check
                          inline
                          className="mt-2 ml-5"
                          label="Yes"
                          name="group1"
                          type="radio"
                          id="inline-tek-2"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        />
                      </Collapse>
                      <Col
                        sm={12}
                        md={6}
                        className="mt-3 ml-5 collapse"
                        id="collapseOne"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <Form.Group as={Row} className="mb-xl-3">
                          <div>
                            <table>
                              <tr>
                                <th style={{ border: "1px solid #B5B5B5" }}>
                                  Comfort
                                </th>
                                <th style={{ border: "1px solid #B5B5B5" }}>
                                  Short Flight<span> - Up to 8 hours</span>
                                </th>
                                <th style={{ border: "1px solid #B5B5B5" }}>
                                  Long Flight<span> - Over 8 hours</span>
                                </th>
                              </tr>
                              <tr>
                                <td style={{ border: "1px solid #B5B5B5" }}>
                                  Cabin Class
                                </td>
                                <td style={{ border: "1px solid #B5B5B5" }}>
                                  Flight Short
                                </td>
                                <td style={{ border: "1px solid #B5B5B5" }}>
                                  Flight Long
                                </td>
                              </tr>
                            </table>
                          </div>
                        </Form.Group>
                      </Col>

                      <Collapse in={RecurringReminderType} id="headingTwo">
                        <Form.Check
                          className="mt-2 ml-5 collapsed"
                          label="No"
                          type="radio"
                          name="group1"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        />
                      </Collapse>
                      <Col
                        sm={12}
                        md={6}
                        className="mt-3 ml-5 collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                        id="collapseTwo"
                      >
                        <Form.Group as={Row} className="mb-xs-3">
                          <div>
                            <table>
                              <tr>
                                <th style={{ border: "1px solid #B5B5B5" }}>
                                  COMFORT
                                </th>
                                <th style={{ border: "1px solid #B5B5B5" }}>
                                  SHORT FLIGHT<span> - Up to 8 hours</span>
                                </th>
                              </tr>
                              <tr>
                                <td style={{ border: "1px solid #B5B5B5" }}>
                                  Highest Cabin Class
                                </td>
                                <td style={{ border: "1px solid #B5B5B5" }}>
                                  Flight Short
                                </td>
                              </tr>
                            </table>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Col className="policy-class-modal-title">
            <h6>PREFERRED AIRLINES</h6>
            <Col md={10} lg={8} className="d-flex">
              <span>Select preferred airlines</span>
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
          </Col>
          <Col className="policy-class-modal-title">
            <h6>RESTRICTED AIRLINES</h6>
            <Col md={10} lg={8} className="d-flex">
            <span>Select restricted airlines</span>
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
          </Col>

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