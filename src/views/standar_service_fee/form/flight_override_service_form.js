import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import SelectAsync from "components/form/select-async"
import Api from "config/api"
import { MenuModal } from "./menu_modal"
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
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4} sm={4} lg={4}>
              Destination
              <span className="form-label-required">*</span>
            </Form.Label>
            <Col md={8} sm={8} lg={8}>
              <FastField name="destination">
                {({ field, form }) => (
                  <div style={{ maxWidth: 600 }}>
                    <SelectAsync
                      {...field}
                      isClearable
                      url={`master/destination-groups`}
                      fieldName="destination_group_name"
                      onChange={(v) => {
                        setFieldValue("destination", v)
                      }}
                      placeholder="Please choose"
                      className={`react-select ${
                        form.touched.destination && form.errors.destination
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    {form.touched.destination && form.errors.destination && (
                      <Form.Control.Feedback type="invalid">
                        {form.touched.destination
                          ? form.errors.destination
                          : null}
                      </Form.Control.Feedback>
                    )}
                  </div>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4} sm={4} lg={4}>
              Airline Service Type
            </Form.Label>
            <Col md={8} sm={8} lg={8}>
              <div style={{ maxWidth: 500 }}>
                <FastField name="airline_service_type">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 500 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        url={`master/airline-categories`}
                        fieldName="airline_category_name"
                        onChange={(v) => {
                          setFieldValue("airline_service_type", v)
                        }}
                        placeholder="Please choose"
                        className={`react-select ${
                          form.touched.airline_service_type &&
                          form.errors.airline_service_type
                            ? "is-invalid"
                            : null
                        }`}
                      />
                      {form.touched.airline_service_type &&
                        form.errors.airline_service_type && (
                          <Form.Control.Feedback type="invalid">
                            {form.touched.airline_service_type
                              ? form.errors.airline_service_type
                              : null}
                          </Form.Control.Feedback>
                        )}
                    </div>
                  )}
                </FastField>
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4} sm={4} lg={4}>
              Specified Airline
            </Form.Label>
            <Col md={8} sm={8} lg={8}>
              <FastField name="specified_airline">
                {({ field, form }) => (
                  <div style={{ maxWidth: 600 }}>
                    <SelectAsync
                      {...field}
                      isClearable
                      url={`master/airlines`}
                      fieldName="airline_name"
                      onChange={(v) => {
                        setFieldValue("specified_airline", v)
                      }}
                      placeholder="Please choose"
                      className={`react-select ${
                        form.touched.specified_airline &&
                        form.errors.specified_airline
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    {form.touched.specified_airline &&
                      form.errors.specified_airline && (
                        <Form.Control.Feedback type="invalid">
                          {form.touched.specified_airline
                            ? form.errors.specified_airline
                            : null}
                        </Form.Control.Feedback>
                      )}
                  </div>
                )}
              </FastField>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4} sm={4} lg={4}>
              Specified Source
            </Form.Label>
            <Col md={8} sm={8} lg={8}>
              <FastField name="specified_source">
                {({ field, form }) => (
                  <div style={{ maxWidth: 600 }}>
                    <SelectAsync
                      {...field}
                      isClearable
                      url={`master/supplier-types`}
                      fieldName="supplier_type_name"
                      onChange={(v) => {
                        setFieldValue("specified_source", v)
                      }}
                      placeholder="Please choose"
                      className={`react-select ${
                        form.touched.specified_source &&
                        form.errors.specified_source
                          ? "is-invalid"
                          : null
                      }`}
                    />
                    {form.touched.specified_source &&
                      form.errors.specified_source && (
                        <Form.Control.Feedback type="invalid">
                          {form.touched.specified_source
                            ? form.errors.specified_source
                            : null}
                        </Form.Control.Feedback>
                      )}
                  </div>
                )}
              </FastField>
            </Col>
            <MenuModal
              menu={[
                {
                  title: "MDR Fee",
                  sections: [
                    {
                      title: "MDR FEE",
                      taxType: taxTypeServiceFee,
                      fieldFeeTaxId: "domestic_flight_service_fee_tax_id",
                      fieldRadio: "domestic_flight_service",
                      fieldAmount: "domestic_flight_service_amount",
                      fieldAmountType: "domestic_flight_service_amount_type",
                      fieldPercent: "domestic_flight_service_percent",
                      fieldIncludeTax: "domestic_flight_service_tax_include",
                    },
                  ],
                },
              ]}
              values={values}
              fHandleChange={handleChange}
              fHandleBlur={handleBlur}
              setFieldValue={setFieldValue}
              // isView={isView}
              amountSuffixSelections={[
                {
                  label: "/Ticket",
                  value: "de62950d-fbab-4e39-bd90-c2b6687c6b36",
                },
                {
                  label: "/Person",
                  value: "de03bf84-4bd8-4cdf-9348-00246f04bcad",
                },
                {
                  label: "/Transaction",
                  value: "5123b121-4f6a-4871-bef1-65408d663e19",
                },
              ]}
              errors={errors}
            />
          </Form.Group>

          <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
            <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
              SAVE
            </Button>
            <Button variant="secondary" onClick={props.onHide}>
              CANCEL
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(FlightOverrideServiceForm)
