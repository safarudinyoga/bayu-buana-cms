import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { Menu } from "./menu"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"

const endpoint = "/master/service-fee-categories"

function FlightOverrideServiceForm(props) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  //get data fee tax
  const [taxTypeServiceFee, setTaxTypeServiceFee] = useState([])
  const [taxIdServiceFee, setTaxIdServiceFee] = useState("")

  const getFeeTaxType = async (code, setData, setId) => {
    try {
      let res = await API.get(
        `/master/fee-tax-types?filters=[["status","!=","0"],["and"],["fee_tax_type_code","${code}"]]`,
      )
      let data = res.data.items[0]
      setData(data)
      setId(data.id)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getFeeTaxType("1", setTaxTypeServiceFee, setTaxIdServiceFee)
  }, [props.match.params.id])

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Flight Override Service Fee"

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let res = await API.get(endpoint + "/" + id)
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
  }, [showCreateModal.id, formValues])

  const initialValues = {
    destination: "",
    airline_service_type: "",
    specified_airline: "",
    specified_source: "",
    service_fee: "",
    service_fee_tax_id: "",
    service_fee_amount: null,
    service_fee_amount_type: "",
    service_fee_percent: null,
    service_fee_tax_include: false,
  }

  const validationSchema = Yup.object().shape({
    destination: Yup.object().required("Destination is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = showCreateModal.id || props.id
      let form = {
        city_id: uuidv4(),
        city_code: values.city_code,
        city_name: values.city_name,
        latitude: values.latitude,
        longitude: values.longitude,
      }

      if (!formId) {
        //Proses Create Data
        let integration_parter_id = props.match.params.id
        let res = await API.post(
          `/master/integration-partners/${integration_parter_id}/cities`,
          form,
        )
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Partner City Name: ${form.city_name}' has been successfully saved.`,
          }),
        )
      } else {
        let res = await API.put(
          `/master/integration-partner-cities/${formId}`,
          form,
        )
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
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
                      className={`react-select ${
                        form.touched.city && form.errors.city
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
                    {form.touched.city && form.errors.city && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.city ? form.errors.city : null}
                      </Form.Control.Feedback>
                    )}
                  </div>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Partner City Code <span className="form-label-required">*</span>
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="city_code" disabled>
                {({ field, form }) => (
                  <>
                    <Form.Control
                      type="text"
                      disabled={isView}
                      isInvalid={
                        form.touched.city_code && form.errors.city_code
                      }
                      minLength={1}
                      maxLength={128}
                      {...field}
                      style={{ maxWidth: 300 }}
                    />
                    {form.touched.city_code && form.errors.city_code && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.city_code ? form.errors.city_code : null}
                      </Form.Control.Feedback>
                    )}
                  </>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Partner City Name <span className="form-label-required">*</span>
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="city_name" disabled>
                {({ field, form }) => (
                  <>
                    <Form.Control
                      type="text"
                      disabled={isView}
                      isInvalid={
                        form.touched.city_name && form.errors.city_name
                      }
                      minLength={1}
                      maxLength={128}
                      {...field}
                      style={{ maxWidth: 300 }}
                    />
                    {form.touched.city_name && form.errors.city_name && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.city_name ? form.errors.city_name : null}
                      </Form.Control.Feedback>
                    )}
                  </>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Latitude
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="latitude" disabled>
                {({ field, form }) => (
                  <>
                    <Form.Control
                      type="text"
                      disabled={isView}
                      minLength={1}
                      maxLength={16}
                      {...field}
                      style={{ maxWidth: 300 }}
                    />
                  </>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column md={3} lg={4}>
              Longitude
            </Form.Label>
            <Col md={9} lg={8}>
              <FastField name="longitude" disabled>
                {({ field, form }) => (
                  <>
                    <Form.Control
                      type="text"
                      disabled={isView}
                      minLength={1}
                      maxLength={16}
                      {...field}
                      style={{ maxWidth: 300 }}
                    />
                  </>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Menu
            menu={[
              {
                sections: [
                  {
                    title: "Service Fee",
                    taxType: taxTypeServiceFee,
                    fieldFeeTaxId: "domestic_flight_fee_tax_id",
                    fieldRadio: "domestic_flight",
                    fieldAmount: "domestic_flight_amount",
                    fieldAmountType: "domestic_flight_amount_type",
                    fieldPercent: "domestic_flight_percent",
                    fieldIncludeTax: "domestic_flight_tax_include",
                  },
                ],
              },
            ]}
            values={values}
            fHandleChange={handleChange}
            fHandleBlur={handleBlur}
            setFieldValue={setFieldValue}
            isView={isView}
          />
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

export default withRouter(FlightOverrideServiceForm)
