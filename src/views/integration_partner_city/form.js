import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button} from 'react-bootstrap';
import { Formik, FastField } from "formik"
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import axios from "axios"
import env from "config/environment"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"

const endpoint = "/master/integration-partner-cities"


function PartnerCityForm(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  
  



  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Cities"
    if (!formId) {
      docTitle = "New Partner Cities"
    } 

    dispatch(setModalTitle(docTitle))


    if (formId) {
      try {
        let res = await API.get(endpoint + "/" + formId)
        setFormValues(res.data)
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
    city: "",
    city_code: "",
    city_name: "",
  }



  const validationSchema = Yup.object().shape({
    city: Yup.object()
      .required("City is required.."),
    city_code:Yup.string()
      .required("Partner City Code is required")
      .test(
        "Unique Partner City Code",
        "Partner City Code already exists", // <- key, message
        async (value, ctx) => {
          let formId = props.match.params.id
          try {
            let res = await axios.get(`${env.API_URL}/master/integration-partner-cities?filters=["city_code","=","${value}"]`)
  
            if (formId) {
              return res.data.items.length === 0 ||
                value === formValues.city_code
            } else {
              return res.data.items.length === 0
            }
          } catch (e) {
            return false
          }
        }
      ),
    city_name: Yup.string()
      .required("Partner City Name is required")
      .test(
        "Unique Partner City Name",
        "Partner City Name already exists", // <- key, message
        async (value, ctx) => {
          let formId = props.match.params.id
          try {
            let res = await axios.get(`${env.API_URL}/master/integration-partner-cities?filters=["city_name","=","${value}"]`)
  
            if (formId) {
              return res.data.items.length === 0 ||
                value === formValues.city_name
            } else {
              return res.data.items.length === 0
            }
          } catch (e) {
            return false
          }
        }
      ),

  })

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateModal.id || props.id
      let form = {
        city_id: uuidv4(),
        city_code: values.city_code,
        city_name: values.city_name,

      }


      if (!formId) {
        //Proses Create Data
        let integration_parter_id = props.match.params.id
        let res = await API.post(`/master/integration-partners/${integration_parter_id}/cities`, form)
        dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
        dispatch(
          setAlert({
            message: `Record 'Partner City Name: ${form.city_name}' has been successfully saved.`,
          }),
        )
      } else {
        let res = await API.put(`/master/integration-partner-cities/${formId}`, form)
        dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
        dispatch(
          setAlert({
            message: `Record 'Partner City Name: ${form.city_name}' has been successfully saved.`,
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
      {
        ({
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
              <Form.Label column sm={4}>
                City<span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={8}>
                <FastField name="city">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 200 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        isDisabled={isView}
                        url={`master/cities`}
                        fieldName="city_name"
                        onChange={(v) => {
                          setFieldValue("city", v)
                        }}
                        placeholder="Please choose"
                        className={`react-select ${form.touched.city &&
                            form.errors.city
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
                      {form.touched.city &&
                        form.errors.city && (
                          <Form.Control.Feedback type="invalid">
                            {form.touched.city
                              ? form.errors.city
                              : null}
                          </Form.Control.Feedback>
                        )}
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column md={3} lg={4}>
                Partner City Code{" "}
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col md={9} lg={8}>
                <FastField name="city_code" disabled>
                  {({ field, form }) => (
                    <>
                      <Form.Control
                        type="text"
                        disabled={isView}
                        isInvalid={
                          form.touched.city_code &&
                          form.errors.city_code
                        }
                        minLength={1}
                        maxLength={128}
                        {...field}
                        style={{ maxWidth: 300 }}
                      />
                      {form.touched.city_code &&
                        form.errors.city_code && (
                          <Form.Control.Feedback type="invalid">
                            {form.touched.city_code
                              ? form.errors.city_code
                              : null}
                          </Form.Control.Feedback>
                        )}
                    </>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column md={3} lg={4}>
                Partner City Name{" "}
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col md={9} lg={8}>
                <FastField name="city_name" disabled>
                  {({ field, form }) => (
                    <>
                      <Form.Control
                        type="text"
                        disabled={isView}
                        isInvalid={
                          form.touched.city_name &&
                          form.errors.city_name
                        }
                        minLength={1}
                        maxLength={128}
                        {...field}
                        style={{ maxWidth: 300 }}
                      />
                      {form.touched.city_name &&
                        form.errors.city_name && (
                          <Form.Control.Feedback type="invalid">
                            {form.touched.city_name
                              ? form.errors.city_name
                              : null}
                          </Form.Control.Feedback>
                        )}
                    </>
                  )}
                </FastField>
              </Col>
            </Form.Group>
           
            {!props.hideButton && <div
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
              }}
            >
              {!isView && <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>}
              <CancelButton onClick={() => dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))} />
            </div>}
          </Form>
        )
      }

    </Formik>
  )
}

export default withRouter(PartnerCityForm) 