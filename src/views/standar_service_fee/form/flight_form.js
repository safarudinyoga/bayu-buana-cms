import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import { Card, Form, Row, Col, Button, Modal } from "react-bootstrap"
import createIcon from "assets/icons/create.svg"
import { ReactSVG } from "react-svg"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Api from "config/api"
import Select from "components/form/select-async"
import useQuery from "lib/query"
import { Menu } from "./menu"
import { useSnackbar } from "react-simple-snackbar"
import FlightOverrideServiceFeeTable from "../table/flight_override_service_table"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const backUrl = "/master/standard-service-fee"
const endpointFee = "/master/agent-processing-fee-categories"
const endpoint = "/master/service-fee-categories"

const options = {
  position: "bottom-right",
}
const FlightModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div style={{ padding: "0 2px 2px" }}>
          <div className="mb-5">
            <div className="modal-button-close" onClick={props.onHide}>
              <ReactSVG src="/img/icons/close.svg" />
            </div>
            <p className="modals-header mt-3">
              Add Flight Override Service Fee
            </p>
          </div>

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Destination
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={7}>
                <FastField name="hotelBrand">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <Select {...field} placeholder="Please choose" />
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Airline Service Type
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={7}>
                <FastField name="hotelBrand">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <Select {...field} placeholder="Please choose" />
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Specified Airline
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={7}>
                <FastField name="hotelBrand">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <Select {...field} placeholder="Please choose" />
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Specified Source
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={7}>
                <FastField name="hotelBrand">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <Select {...field} placeholder="Please choose" />
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={4}>
                Service Fee
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col md={8}>
                <Form.Group>
                  <Form.Check type="radio" label="Fixed Amount" />
                </Form.Group>
                <Row className="ml-3">
                  <Col sm={12} md={6}>
                    <Form.Group as={Row} className="mb-xs-3">
                      <Form.Label
                        column
                        xs={2}
                        md={3}
                        lg={5}
                        className="ml-xs-4"
                      >
                        IDR
                      </Form.Label>
                      <Col xs={10} md={9} lg={7}>
                        <Form.Control style={{ maxWidth: "220px" }} />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check type="radio" label="/Ticket" />
                      <Form.Check type="radio" label="/Person" />
                      <Form.Check type="radio" label="/Transaction" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Check type="radio" label="Percentage" />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Control style={{ maxWidth: "80px" }} className="mx-3" />
                  <span className="text-lg mt-1">%</span>
                  <Form.Check
                    type="checkbox"
                    label="Include Taxed"
                    className="mt-2 ml-4"
                  />
                </Form.Group>
              </Col>
            </Form.Group>

            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button variant="secondary" onClick={props.onHide}>
                CANCEL
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const FlightForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  const [openSnackbar] = useSnackbar(options)
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

  const [modalShow, setModalShow] = useState(false)
  let api = new Api()

  useEffect(async () => {
    let docTitle = "Edit Flight Standard Service Fee"
    if (!formId) {
      docTitle = "Create Flight Standard Service Fee"
    }
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Standard Service Fee",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  })

  //get data fee tax
  const [taxTypeDomesticFlight, setTaxTypeDomesticFlight] = useState([])
  const [taxTypeInternationalFlight, setTaxTypeInternationalFlight] = useState(
    [],
  )

  const [taxIdDomesticFlight, setTaxIdDomesticFlight] = useState("")
  const [taxIdInternationalFlight, setTaxIdInternationalFlight] = useState("")

  const getFeeTaxType = async (code, setData, setId) => {
    try {
      let res = await api.get(
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
    getFeeTaxType("8", setTaxTypeDomesticFlight, setTaxIdDomesticFlight)
    getFeeTaxType(
      "9",
      setTaxTypeInternationalFlight,
      setTaxIdInternationalFlight,
    )
  }, [props.match.params.id])

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    service_fee_category_name: "",
    description: "",
    domestic_flight: "",
    domestic_flight_fee_tax_id: "",
    domestic_flight_amount: null,
    domestic_flight_amount_type: "",
    domestic_flight_percent: null,
    domestic_flight_tax_include: false,
    international_flight: "",
    international_flight_fee_tax_id: "",
    international_flight_amount: null,
    international_flight_amount_type: "",
    international_flight_percent: null,
    international_flight_tax_include: false,
  })
  useEffect(async () => {
    try {
      if (formId) {
        let res = await api.get(endpoint + "/" + formId)
        // let agent_res = await api.get(`endpointFee+ "/1/" + res.data.id)
        setInitialForm({
          ...initialForm,
          ...res.data,
          // ...agent_res.data
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const onSubmit = async (payload, values) => {
    try {
      if (formId) {
      } else {
        // let res = await api.post(endpoint, payload)
        // let idFee = res.data.id;
        onSubmitFee(values)
        openSnackbar(`Service Fee has been successfully saved.`)
        history.goBack()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmitFee = (values) => {
    let payloadDomestic = {
      domestic_flight: {
        fee_tax_type_id: taxIdDomesticFlight,
        amount:
          values.domestic_flight === "amount" ? values.domestic_flight : 0,
        percent:
          values.domestic_flight === "amount"
            ? 0
            : values.domestic_flight_percent,
        charge_type_id:
          values.domestic_flight === "amount"
            ? values.domestic_flight_amount_type
            : null,
        is_tax_inclusive:
          values.domestic_flight === "amount"
            ? false
            : values.domestic_flight_tax_include,
      },
      international_flight: {
        fee_tax_type_id: taxIdInternationalFlight,
        amount:
          values.international_flight === "amount"
            ? values.international_flight_amount
            : 0,
        percent:
          values.international_flight === "amount"
            ? 0
            : values.international_flight_percent,
        charge_type_id:
          values.international_flight === "amount"
            ? values.international_flight_amount_type
            : null,
        is_tax_inclusive:
          values.international_flight === "amount"
            ? false
            : values.international_flight_tax_include,
      },
    }
    onSaveFee(payloadDomestic, 1)
  }

  const onSaveFee = async (payload, productTypeCode) => {
    try {
      console.log("payload", payload)
      let res = await api.post(endpointFee + "/" + productTypeCode, payload)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    service_fee_category_name: Yup.string()
      .required("Please enter Preset Name.")
      .min(1, "Min value 1.")
      .max(128, "Max value 128."),
    description: Yup.string()
      .min(1, "Min value 1")
      .max(4000, "Max value 4000."),
  })

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values)
          console.log(props)
          let formatted = {
            service_fee_category_name: values.preset_name,
            description: values.description,
          }
          onSubmit(formatted, values)
        }}
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
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <div style={{ padding: "0 2px 2px" }}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      Preset Name
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="service_fee_category_name">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              isInvalid={
                                form.touched.service_fee_category_name &&
                                form.errors.service_fee_category_name
                              }
                              minLength={1}
                              maxLength={128}
                              style={{ maxWidth: 300 }}
                              {...field}
                            />
                            {form.touched.service_fee_category_name &&
                              form.errors.service_fee_category_name && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.service_fee_category_name
                                    ? form.errors.service_fee_category_name
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      Description
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="description">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              as="textarea"
                              isInvalid={
                                form.touched.description &&
                                form.errors.description
                              }
                              style={{ height: "88px", maxWidth: "416px" }}
                              {...field}
                            />
                            {form.touched.description &&
                              form.errors.description && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.description
                                    ? form.errors.description
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                      <Menu
                        menu={[
                          {
                            sections: [
                              {
                                title: "Domestic Flight",
                                taxType: taxTypeDomesticFlight,
                                fieldFeeTaxId: "domestic_flight_fee_tax_id",
                                fieldRadio: "domestic_flight",
                                fieldAmount: "domestic_flight_amount",
                                fieldAmountType: "domestic_flight_amount_type",
                                fieldPercent: "domestic_flight_percent",
                                fieldIncludeTax: "domestic_flight_tax_include",
                              },
                              {
                                title: "International Flight",
                                taxType: taxTypeInternationalFlight,
                                fieldFeeTaxId:
                                  "international_flight_fee_tax_id",
                                fieldRadio: "international_flight",
                                fieldAmount: "international_flight_amount",
                                fieldAmountType:
                                  "international_flight_amount_type",
                                fieldPercent: "international_flight_percent",
                                fieldIncludeTax:
                                  "international_flight_tax_include",
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
                    </Col>
                  </Form.Group>

                  {isView ? (
                    <h3 className="card-heading">.</h3>
                  ) : (
                    <>
                      <h3 className="card-heading">.</h3>
                      <Col sm={12}>
                        <div style={{ padding: "0 15px 15px 15px" }}>
                          <button
                            className="btn float-right button-override"
                            onClick={() => setModalShow(true)}
                          >
                            <img src={createIcon} className="mr-1" alt="new" />
                            Add Override Service Fee
                          </button>
                        </div>
                      </Col>
                      <br />
                      <Col sm={12}>
                        <FlightModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </Col>
                    </>
                  )}
                </div>
                {formId && <FlightOverrideServiceFeeTable />}
              </Card.Body>
            </Card>

            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button variant="secondary" onClick={() => history.goBack()}>
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default withRouter(FlightForm)
