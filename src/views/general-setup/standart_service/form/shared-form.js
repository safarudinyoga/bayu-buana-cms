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
import Select from "components/form/select"

const endpoint = "/master/configurations/standard-services"

function PartnerCityForm(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const [defmonths, setMonths] = useState({ value: 1, label: "" })
  const [defyears, setYears] = useState({ value: 1921, label: "" })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Cities"
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
    respon_time: [],
  }

  const validationSchema = Yup.object().shape({
    task_type: Yup.object().required("Task Type is required."),
  })
  const resetDate = (date, months = defmonths, years = defyears) => {
    const today = new Date()
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth() + 1
    let currentDate = today.getDate()

    if (years.value === currentYear) {
      if (months.value > currentMonth) {
        return true
      } else {
        if (date.value > currentDate) {
          return true
        } else {
          return false
        }
      }
    }

    if (months.value === 2 && years.value % 4 == 0) {
      return date.value > 29
    }
    if (months.value === 2 && years.value % 4 != 0) {
      return date.value > 28
    }
    if (
      months.value === 4 ||
      months.value === 6 ||
      months.value === 9 ||
      months.value === 11
    ) {
      return date.value > 30
    }
    return false
  }

  const selectDay = (months = defmonths, years = defyears) => {
    const options = []
    const today = new Date()
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth() + 1
    let currentDate = today.getDate()
    if (years.value === currentYear && months.value === currentMonth) {
      for (let i = 1; i <= currentDate; i++) {
        options.push({
          label: i,
          value: i,
        })
      }
    } else {
      if (months.value === 2 && years.value % 4 == 0) {
        for (let i = 1; i <= 29; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if (months.value === 2 && years.value % 4 != 0) {
        for (let i = 1; i <= 28; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if (
        months.value === 4 ||
        months.value === 6 ||
        months.value === 9 ||
        months.value === 11
      ) {
        for (let i = 1; i <= 30; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else {
        for (let i = 1; i <= 31; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      }
    }
    return options
  }

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateModal.id || props.id
      let form = {
        task_type: values.task_type,
        metrics_id: values.metrics_id
          ? values.metrics_id.value
          : "00000000-0000-0000-0000-000000000000",
        service_level_id: values.service_level_id
          ? values.service_level_id.value
          : "00000000-0000-0000-0000-000000000000",
        task_type_id: values.task_type_id
          ? values.task_type_id.value
          : "00000000-0000-0000-0000-000000000000",
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
            message: `Record 'Standard Service for Task Type: ${form.task_type.task_type_name}' has been successfully saved.`,
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
                <div style={{ marginRight: 3, minWidth: 65, flex: 1 }}>
                  <Select
                    options={selectDay(
                      values.respon_time[1],
                      values.respon_time[2],
                    )}
                    value={values.respon_time[0]}
                    isDisabled={isView}
                    placeholder="Day"
                    className={`react-select ${
                      touched.title && Boolean(errors.title) ? "is-invalid" : ""
                    }`}
                    components={
                      isView
                        ? {
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                          }
                        : null
                    }
                    style={{
                      margin: 0,
                    }}
                    onChange={(v) => {
                      setFieldValue("respon_time[0]", v)
                    }}
                  />
                </div>
                <Form.Label column sm={2}>
                  Day(s)
                </Form.Label>

                <div style={{ marginRight: 3, minWidth: 25, flex: 1 }}>
                  <Form.Control type="number" placeholder="Hours" />
                </div>
                <Form.Label column sm={2}>
                  Hour(s)
                </Form.Label>
                <div style={{ marginRight: 3, minWidth: 35, flex: 1 }}>
                  <Form.Control type="number" placeholder="Minutes" />
                </div>
                <Form.Label column sm={2}>
                  Minute(s)
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

export default withRouter(PartnerCityForm)
