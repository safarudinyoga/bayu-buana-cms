import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import { Formik, FastField, ErrorMessage, Field } from "formik"
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
const endpoint = "/master/configurations/standard-services"



const TravelPolicyClass = (props) => {

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

    let docTitle = "Edit Flight Policy For Staff and Manager"
    if (!formId) {
      docTitle = "CREATE FLIGHT POLICY FOR STAFF AND MANAGER"
    }

    dispatch(setModalTitle(docTitle))

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
    travel_policy_class_name: "",
    travel_policy_class_code: "",
    travel_policy_apply_to: "",
  }

  const validationSchema = Yup.object().shape({
    travel_policy_class_code: Yup.object().required("Travel Policy Class Code is required.").uniqueValueObject("travel_policy_class_code","Travel Policy Class Code already exists"),
    travel_policy_class_name: Yup.object().required("Travel Policy Class Name is required.").uniqueValueObject("travel_policy_class_name","Travel Policy Class Name already exists"),
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
          <Row className="form-group mb-0">
            <Col className="ml-0">
                <FormikControl 
                  control="input"
                  label="Code"
                  name="travel_policy_class_code"
                  required="label-required"
                  className
                  minLength={1}
                  maxLength={36}
                  style={{ maxWidth: 130, borderRadius: 4 }}
                  // isDisabled={isView}
                />
            </Col>
          </Row>
          
          <Row className="form-group mb-0">
            <Col className="ml-0">
                <FormikControl 
                  control="input"
                  label="Name"
                  name="travel_policy_class_name"
                  required="label-required"
                  className
                  minLength={1}
                  maxLength={256}
                  style={{ maxWidth: 250, borderRadius: 4 }}
                  // isDisabled={isView}
                />
            </Col>
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

export default TravelPolicyClass