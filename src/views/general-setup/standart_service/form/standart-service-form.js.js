import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import Select from "components/form/select-async"

const endpoint = "/master/configurations/standard-services"

const generateNumber = (count) => {
  const temp = []
  for (let i = 0; i <= count; i++) temp.push(`${i}`)
  return temp
}

function StandartService(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  //get Time
  const [days, setDays] = useState([])
  const [hours, setHours] = useState([])
  const [minutes, setMinutes] = useState([])

  useEffect(() => {
    setDays(generateNumber(700))
    setHours(generateNumber(23))
    setMinutes(generateNumber(59))
  }, [])

  const ListItem = ({ name }) => {
    console.log(`rendered ${name}`)
    return <div> Name is: {name} </div>
  }

  const LongList = () => {
    const [names, setNames] = useState([])

    useEffect(() => {
      setNames(generateNumber(1000))
    }, [])

    return (
      <>
        <div style={{ minWidth: 65, flex: 1 }}>
          <select
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.50em",
              marginTop: "5px",
            }}
          >
            {days.map((day, i) => (
              <option key={i}>{day}</option>
            ))}
          </select>
        </div>
      </>
    )
  }

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Standard Service"
    if (!formId) {
      docTitle = "Create Standard Service"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let data = await API.get(endpoint + "/" + formId)
        setFormValues(data)
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
    respon_time: null,
  }

  const validationSchema = Yup.object().shape({
    task_type: Yup.object().required("Task Type is required."),
    respon_time: Yup.object().required("Task Type is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateModal.id || props.id
      let form = {
        task_type: values.task_type,
        metrics_id: values.metrics_id
          ? values.metrics_id.value
          : "37f49bdb-40cc-4fce-8630-d92a7549998d",
        service_level_id: values.service_level_id
          ? values.service_level_id.value
          : "00000000-0000-0000-0000-000000000000",

        respon_time: {
          amount: values.amount === "amount" ? values.amount : 0,
        },
      }

      if (!formId) {
        //Proses Create Data
        let res = await API.post(
          `/master/configurations/standard-services`,
          form,
        )
        console.log(res)
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Standard Service for Task Type: ${form.task_type_name}' has been successfully saved.`,
          }),
        )
      } else {
        let res = await API.put(
          `/master/configurations/standard-services/${formId}`,
          form,
        )
        console.log(res)
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Standard Service for Task Type: ${form.task_type.task_type_name}' has been successfully saved.`,
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
            <></>

            <Form.Label column sm={3}>
              Task Type<span className="form-label-required">*</span>
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
            <Form.Label column sm={3}>
              Respon Time<span className="form-label-required">*</span>
            </Form.Label>

            <Col sm={9}>
              <div style={{ maxWidth: 450, display: "flex" }}>
                {/* <div style={{ minWidth: 65, flex: 1 }}>
                  <select
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "0.50em",
                      marginTop: "5px",
                    }}
                  >
                    <option></option>
                    {days.map((day, i) => (
                      <option key={i}>{day}</option>
                    ))}
                  </select>
                </div> */}
                <FastField name="respon_time">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 200 }}>
                      <div style={{ minWidth: 65, flex: 1 }}>
                        <select
                          {...field}
                          isClearable
                          isDisabled={isView}
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: "0.50em",
                            marginTop: "5px",
                          }}
                          className={`react-select ${
                            form.touched.respon_time && form.errors.respon_time
                              ? "is-invalid"
                              : null
                          }`}
                        >
                          <option></option>
                          {days.map((day, i) => (
                            <option key={i}>{day}</option>
                          ))}
                        </select>
                      </div>
                      {form.touched.respon_time && form.errors.respon_time && (
                        <Form.Control.Feedback type="invalid">
                          {form.touched.respon_time
                            ? form.errors.respon_time
                            : null}
                        </Form.Control.Feedback>
                      )}
                    </div>
                  )}
                </FastField>
                <Form.Label column sm={2}>
                  Days
                </Form.Label>
                <div style={{ minWidth: 25, flex: 1 }}>
                  <select
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "0.50em",
                      marginTop: "5px",
                    }}
                  >
                    {hours.map((hour) => (
                      <option value="hour">{hour}</option>
                    ))}
                  </select>
                </div>
                <Form.Label column sm={2}>
                  Hours
                </Form.Label>
                <div style={{ minWidth: 35, flex: 1 }}>
                  <select
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "0.50em",
                      marginTop: "5px",
                    }}
                  >
                    {minutes.map((minute) => (
                      <option value="minute">{minute}</option>
                    ))}
                  </select>
                </div>
                <Form.Label column sm={2}>
                  Minutes
                </Form.Label>
              </div>
              {touched.title && Boolean(errors.title) && (
                <div className="invalid-feedback">
                  {touched.title ? errors.title : ""}
                </div>
              )}
            </Col>
          </Form.Group>
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

export default withRouter(StandartService)
