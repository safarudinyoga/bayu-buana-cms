import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateNewModal, setModalTitleNew } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormInputControl from "components/form/input-control"
import _ from "lodash"
import { ReactSVG } from "react-svg"
import "../style.scss"

const endpoint = "/master/configurations/standard-services"

function HotelPolicy(props) {
  const dispatch = useDispatch()
  const showCreateNewModal = useSelector((state) => state.ui.showCreateNewModal)
  const API = new Api()
  const isView = showCreateNewModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const [RecurringReminderType, setRecurringReminderType] = useState(true)

  const [form, setForm] = useState({
    special_date_name: "",
    start_date: new Date(),
    end_date: new Date(),
    fixed: false,
  })

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
          showCreateNewModal.service_level_code,
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
    let formId = showCreateNewModal.id || props.id

    let docTitle = "Edit Hotel Policy For Staff and Manager"
    if (!formId) {
      docTitle = "CREATE HOTEL POLICY FOR STAFF AND MANAGER"
    }

    dispatch(setModalTitleNew(docTitle))

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
    if (!showCreateNewModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateNewModal.id)
  }, [showCreateNewModal.id, formValues])

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
      let formId = showCreateNewModal.id || props.id
      let amount =
        values.response_time[0].value * 1440 +
        values.response_time[1].value * 60 +
        values.response_time[2].value
      let form = {
        task_type_id: values.task_type.value,
        service_level_code: parseInt(showCreateNewModal.service_level_code),
        amount: amount,
      }

      if (!formId) {
        //Proses Create Data
        let res = await API.post(
          `/master/configurations/standard-services`,
          form,
        )
        dispatch(
          setCreateNewModal({ show: false, id: null, disabled_form: false }),
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
          setCreateNewModal({ show: false, id: null, disabled_form: false }),
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
          <div className="row">
            <div className="d-flex">
              <div>
                Destination<span className="form-label-required">*</span>
              </div>
              <FastField name="task_type">
                {({ field, form }) => (
                  <div className="hotel-class-modal">
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
            </div>
            <div className="row align-item-center">
              <div>
                <ReactSVG src="/img/icons/price.svg" className="price-icon" />
                <h5>PRICE</h5>
                <h6>Maximum Nightly Rate (IDR)</h6>
                <span>(Include Tax & Service charge)</span>
              </div>
              <FormInputControl
                required={false}
                value={form.special_date_name}
                name="special_date_name"
                disabled={isView || loading}
                type="text"
                minLength={0}
                maxLength={15}
                cl={{ md: 3 }}
                cr={{ md: 7 }}
              />
            </div>
            <div className="d-flex flex-row ">
              <div className="d-flex">
                <ReactSVG
                  src="/img/icons/star-rating.svg"
                  className="star-rating-icon"
                />
                <div className="d-flex flex-column">
                  <h6>PROPERTY STAR RATING</h6>
                  <span>Highest Star Rating</span>
                </div>
              </div>
              <div className="col-8 col-md-9 col-lg-7 mb-2">
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
                          {form.touched.task_type
                            ? form.errors.task_type
                            : null}
                        </Form.Control.Feedback>
                      )}
                    </div>
                  )}
                </FastField>
              </div>
            </div>
          </div>
          <Col className="policy-class-modal">
            <h6>RESTRICTED PROPERTY TYPE</h6>
            <Col md={10} lg={8} className="d-flex">
              <span>Select restricted property type</span>
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
                    setCreateNewModal({
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

export default withRouter(HotelPolicy)
