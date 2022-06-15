import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import { Formik, FastField, ErrorMessage, Field } from "formik"
import TextError from "components/formik/textError"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateNewModal, setModalTitleNew } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import Select from "components/form/select"
import FormikControl from "../../../components/formik/formikControl"
import _ from "lodash"
const endpoint = "/master/configurations/standard-services"



function HotelPolicy (props) {

  const dispatch = useDispatch()
  const showCreateNewModal = useSelector((state) => state.ui.showCreateNewModal)
  const API = new Api()
  const isView = showCreateNewModal.disabled_form || props.isView
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
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["service_level.service_level_code",showCreateNewModal.service_level_code],["AND"],["status",1]]))
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
    task_type: Yup.object().required("Task Type is required.").uniqueValueObject("task_type_id","Task Type already exists"),
    response_time: Yup.array().min(3, "Response Time is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateNewModal.id || props.id            
      let amount = (values.response_time[0].value * 1440) + (values.response_time[1].value * 60) + (values.response_time[2].value)
      let form = {
        task_type_id: values.task_type.value,
        service_level_code: parseInt(showCreateNewModal.service_level_code),
        amount: amount
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
          <Row className="form-group mb-0">
            <Col lg={10} className="ml-0">
                <FormikControl 
                  control="input"
                  label="Code"
                  name="percent"
                  required="label-required"
                  className
                  style={{ maxWidth: 100 }}
                  // isDisabled={isView}
                />
            </Col>
            <span className="text-lg ml-0 percent">%</span>
          </Row>
          
          <Row className="form-group mb-0">
            <Col className="ml-0">
                <FormikControl 
                  control="input"
                  label="Name"
                  name="percent"
                  required="label-required"
                  className
                  style={{ maxWidth: 100 }}
                  // isDisabled={isView}
                />
            </Col>
            <span className="text-lg ml-0 percent">%</span>
          </Row>

          <Row className="form-group required">
            <Col md={3} lg={4}>
              <label className="text-label-input" htmlFor={"routes"}>
                Apply To
              </label>
            </Col>
            <Col md={9} lg={8}>
              <Row>
                <Col md={6} lg={10}>
                  <Field id={"departureFrom"} name={"departureFrom"}>
                    {({ field, form, meta}) => (
                      <div>
                        <Select
                          {...field}
                          // options={optionRoute}
                          placeholder="Please Choose"
                          // url={`master/airports`}
                          fieldName="airport_name"
                          // onChange={(v) => {
                          //   formik.setFieldValue("departureFrom", v)
                          //   setOptDeparture(v)
                          // }}
                        />
                      </div>
                    )}
                  </Field>
                </Col>
              </Row>
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

export default withRouter (HotelPolicy)