import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import { Formik, FastField, ErrorMessage } from "formik"
import TextError from "components/formik/textError"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import Select from "components/form/select"
import _ from "lodash"
const endpoint = "/master/configurations/standard-services"

function StandartService(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)


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

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["service_level.service_level_code",showCreateModal.service_level_code],["AND"],["status",1]]))
    let res = await API.get(endpoint + `?filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if(!sameId) return res.data.items.length === 0 

    return true
}

Yup.addMethod(Yup.object, 'uniqueValueObject', function (fieldName, message) {
    return this.test('unique', message, function(field) {
        if(field) return duplicateValue(fieldName, field.value)
        return true
    })
})

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Standard Service"
    if (!formId) {
      docTitle = "Create Standard Service"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let res = await API.get(endpoint + "/" + formId)
        let data = res.data
        let day = Math.round(data.amount/1440)
          let hour = Math.round((data.amount % 1440)/60)
          let minute = (data.amount % 1440) % 60
        setFormValues({
          ...formValues,
          task_type: _.isEmpty(data.task_type) ? "" : {
            value: data.task_type_id,
            label: data.task_type.task_type_name
          },
          response_time: data.amount ? [
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
          ] : [],
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
    task_type: Yup.object().required("Task Type is required.").uniqueValueObject("task_type_id","Task Type already exists"),
    response_time: Yup.array().min(3, "Response Time is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateModal.id || props.id            
      let amount = (values.response_time[0].value * 1440) + (values.response_time[1].value * 60) + (values.response_time[2].value)
      let form = {
        task_type_id: values.task_type.value,
        service_level_code: parseInt(showCreateModal.service_level_code),
        amount: amount
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
              Response Time<span className="form-label-required">*</span>
            </Form.Label>

            <Col sm={9}>
              <div style={{ maxWidth: 450, display: "flex" }}>
              <div style={{ maxWidth: 50, flex: 1 }}>
                <Select
                    options={selectDays()}
                    value={values.response_time[0]}
                    isDisabled={isView}
                    placeholder="Days"
                    className={`react-select ${
                      touched.title && Boolean(errors.title)
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(v) => {
                      setFieldValue("response_time[0]", v)
                    }}
                  />
                </div>
                <Form.Label column sm={2}>
                  Days
                </Form.Label>
                <div style={{ maxWidth: 55, flex: 1 }}>
                <Select
                    options={selectHours()}
                    value={values.response_time[1]}
                    placeholder="Hours"
                    isDisabled={isView}
                    disabled={true}
                    className={`react-select ${
                      touched.title && Boolean(errors.title)
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(v) => {
                      setFieldValue("response_time[1]", v)
                    }}
                  />
                </div>
                <Form.Label column sm={2}>
                  Hours
                </Form.Label>
                <div style={{ maxWidth: 65, flex: 1 }}>
                <Select
                    options={selectMinutes()}
                    value={values.response_time[2]}
                    placeholder="Minutes"
                    isDisabled={isView}
                    className={`react-select ${
                      touched.title && Boolean(errors.title)
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(v) => {
                      setFieldValue("response_time[2]", v)
                    }}
                  />
                </div>
                <Form.Label column sm={2}>
                  Minutes
                </Form.Label>
              </div>
              <ErrorMessage
                component={TextError}
                name="response_time"
              />
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
