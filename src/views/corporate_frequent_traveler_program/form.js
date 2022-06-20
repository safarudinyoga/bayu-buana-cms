import Api from 'config/api'
import { FastField, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalTitle } from 'redux/ui-store'
import { Col, Form, Row, Button } from "react-bootstrap"
import SelectAsync from "components/form/select-async"
import CancelButton from "components/button/cancel"

const endpoint = "/master/integration-partner-cities"

const CorporateFrequentTravelerProgramForm = (props) => {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Frequent Traveler Program"
    if(!formId) {
      docTitle = "Add Frequent Traveler Program"
    }

    dispatch(setModalTitle(docTitle))

    if(formId){
      try {
        let res = await API.get(endpoint + "/" + formId)
        setFormValues(res.data)
      } catch(e) {
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
    traveler_program_type: "",
    loyalty_program_name: "",
    loyalty_number: "",
  }
  

  return (
    <Formik
      initialValues={formValues || initialValues}
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
            <Form.Label column sm={4}>
              Type of Traveler Program:
            </Form.Label>
            <Col sm={8}>
              <FastField name="traveler_program_type">
                {({ field, form}) => (
                  <div style={{ maxWidth: 200 }}>
                    <SelectAsync 
                      {...field}
                      isClearable
                      isDisabled={isView}
                      onChange={(v) => {
                        setFieldValue("traveler_program_type", v)
                      }}
                      placeholder="Please choose"
                      className={`react-select ${
                        form.touched.traveler_program_type && form.errors.traveler_program_type 
                          ? "is-invalid" 
                          : null
                        }`
                      }
                      components={
                        isView
                          ? {
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                            }
                          : null
                      }
                    />
                    {form.touched.traveler_program_type && form.errors.traveler_program_type && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.traveler_program_type ? form.errors.traveler_program_type : null}
                      </Form.Control.Feedback>
                    )}
                  </div>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Loyalty Program Name
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="loyalty_program_name">
                {({ field, form }) => (
                  <div style={{ maxWidth: 200 }}>
                  <SelectAsync 
                    {...field}
                    isClearable
                    isDisabled={isView}
                    onChange={(v) => {
                      setFieldValue("loyalty_program_name", v)
                    }}
                    placeholder="Please choose"
                    className={`react-select ${
                      form.touched.loyalty_program_name && form.errors.loyalty_program_name 
                        ? "is-invalid" 
                        : null
                      }`
                    }
                    components={
                      isView
                        ? {
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                          }
                        : null
                    }
                  />
                  {form.touched.loyalty_program_name && form.errors.loyalty_program_name && (
                    <Form.Control.Feedback type="invalid">
                      {form.touched.loyalty_program_name ? form.errors.loyalty_program_name : null}
                    </Form.Control.Feedback>
                  )}
                </div>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Loyalty Number
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="loyalty_number">
                {({ field, form }) => (
                  <>
                    <Form.Control 
                      type='text'
                      disabled={isView}
                      isInvalid={
                        form.touched.loyalty_number && form.errors.loyalty_number
                      }
                      minLength={1}
                      maxLength={36}
                      {...field}
                      style={{ maxWidth: 300 }}
                    />
                    {form.touched.loyalty_number && form.errors.loyalty_number && (
                      <Form.Control.Feedback type='invalid'>
                        {form.touched.loyalty_number ? form.errors.loyalty_number : null}
                      </Form.Control.Feedback>
                    )}
                  </>
                )}
              </FastField>
            </Col>
          </Form.Group>

          {!props.hideButton && (
            <div
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
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

export default CorporateFrequentTravelerProgramForm