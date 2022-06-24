import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import {
  Card,
  Form,
  Row,
  Col,
  Container,
  Button,
  Image,
  Tab,
  Nav,
  Modal,
} from "react-bootstrap"
import createIcon from "assets/icons/create.svg"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { ReactSVG } from "react-svg"
import axios from "axios"

import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"
import NumberFormat from "react-number-format"
import FormikControl from "components/formik/formikControl"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const endpoint = "/master/agent-markup-categories/1"
const backUrl = "/master/standard-markup"

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
            <p className="modals-header mt-3">ADD FLIGHT OVERRIDE MARKUP</p>
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

            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={4}>
                Airline Service Type
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

            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={4}>
                Specified Airline
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
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={4}>
                Specified Source
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
                Mark-up
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col md={8}>
                <Row className="mt-md-2">
                  <Col lg={12}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <Form.Group>
                          <Form.Check type="radio" label="Fixed Amount" />
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={5}>
                        <Form.Group as={Row} className="mb-xs-3">
                          <Form.Label column xs={2} md={3} lg={3}>
                            IDR
                          </Form.Label>
                          <Col xs={10} md={9} lg={9}>
                            <Form.Control style={{ maxWidth: "220px" }} />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={4}>
                        <Form.Group className="mb-3 ml-5 ml-md-0">
                          <Col>
                            <Form.Check type="radio" label="/Tiket" />
                            <Form.Check type="radio" label="/Person" />
                            <Form.Check type="radio" label="/Transaction" />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={12}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <Form.Group>
                          <Form.Check type="radio" label="Percentage" />
                        </Form.Group>
                      </Col>
                      <Col xs={3} md={3} lg={3} className="ml-4 ml-md-0">
                        <Form.Group as={Row} className="mb-3">
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <span className="text-lg mt-1">%</span>
                        </Form.Group>
                      </Col>
                      <Col xs={7} md={9} lg={9}>
                        <Form.Group className="">
                          <Col>
                            <Form.Check
                              type="checkbox"
                              label="Include Taxes"
                              className="mt-2"
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
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
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const api = new Api()

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    let docTitle = "Edit Flight Standard Markup"
    if (!formId) {
      docTitle = "Create Flight Standard Markup"
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
            text: "Standard Markup",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )

    if (formId) {
      try {
        let { data } = await api.get(endpoint + "/" + formId)
        setFormValues({
          // ...data,
          markup_category_name: data.markup_category_name,
          description: data.description,
          domestic: "",
          domestic_amount: data.domestic_flight_markup.amount,
          domestic_charge_type_id: data.domestic_flight_markup.charge_type_id,
          domestic_percent:data.domestic_flight_markup.percent,
          domestic_is_tax_inclusive: data.domestic_flight_markup.is_tax_inclusive,
          international: "",
          international_amount: data.international_flight_markup.amount,
          international_charge_type_id: data.international_flight_markup.charge_type_id,
          international_percent: data.international_flight_markup.percent,
          international_is_tax_inclusive: data.international_flight_markup.is_tax_inclusive,
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  console.log("form values : ", formValues)

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const initialValues = {
    markup_category_name: "",
    description: "",
    domestic: "",
    domestic_amount: 0,
    domestic_charge_type_id: "c93288b6-29d3-4e20-aa83-5ee6261f64ff",
    domestic_percent: 0,
    domestic_is_tax_inclusive: "",
    international: "",
    international_amount: 0,
    international_charge_type_id: "c93288b6-29d3-4e20-aa83-5ee6261f64ff",
    international_percent: 0,
    international_is_tax_inclusive: "",
  }

  const initialFormModalAddMap = {
    caption: "",
    image: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({})

  const validationSchemaModalAddMap = Yup.object().shape({})

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("submit: ", values)
          setLoading(true)
          let api = new Api()
          try {
            let form = {
              description: values.description,
              domestic_flight_markup: {
                amount: parseInt(values.domestic_amount),
                charge_type_id: values.domestic_charge_type_id,
                is_tax_inclusive: true,
                percent: 10,
              },
              domestic_hotel_markup: {
                amount: 0,
                charge_type_id: values.domestic_charge_type_id,
                is_tax_inclusive: false,
                percent: 0,
              },
              international_flight_markup: {
                amount: parseInt(values.international_amount),
                charge_type_id: values.international_charge_type_id,
                is_tax_inclusive: false,
                percent: 0,
              },
              international_hotel_markup: {
                amount: 0,
                charge_type_id: values.international_charge_type_id,
                is_tax_inclusive: false,
                percent: 0,
              },
              markup_category_name: values.markup_category_name,
            }
            await api.putOrPost(endpoint, id, form)

            dispatch(
              setAlert({
                message: `Markup has been successfully saved.`,
              }),
            )
          } catch (e) {
            dispatch(
              setAlert({
                message: "Failed to save this record.",
              }),
            )
          }
        }}
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
                      <Field
                        className="form-control"
                        type="text"
                        name="markup_category_name"
                        minLength={1}
                        maxLength={128}
                        style={{ maxWidth: 300 }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      Description
                    </Form.Label>
                    <Col sm={10}>
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                        style={{ height: "88px", maxWidth: "416px" }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      Domestic Flight Mark-up
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={10}>
                      <Row className="mt-md-2">
                        <Col lg={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="domestic"
                                    value="domestic_fixed_amount"
                                  />
                                  <span className="ml-2">Fixed Amount</span>
                                </label>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={5} className="ml-lg-4">
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
                                  <NumberFormat
                                    name="domestic_amount"
                                    className="form-control"
                                    maxLength={19}
                                    thousandsGroupStyle="thousand"
                                    displayType="input"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onBlur={(v) => {
                                      setFieldValue(
                                        "domestic_amount",
                                        v.target.value.replaceAll(",", ""),
                                      )
                                    }}
                                    disabled={
                                      values.domestic !==
                                      "domestic_fixed_amount"
                                    }
                                  />
                                </Col>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                              <Form.Group className="mb-3 ml-5 ml-md-0">
                                <Col>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="domestic_charge_type_id"
                                      value="c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                                      disabled={
                                        values.domestic !==
                                        "domestic_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Ticket</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="domestic_charge_type_id"
                                      value="de03bf84-4bd8-4cdf-9348-00246f04bcad"
                                      disabled={
                                        values.domestic !==
                                        "domestic_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Person</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="domestic_charge_type_id"
                                      value="5123b121-4f6a-4871-bef1-65408d663e19"
                                      disabled={
                                        values.domestic !==
                                        "domestic_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Transaction</span>
                                  </label>
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="domestic"
                                    value="percentage"
                                  />
                                  <span className="ml-2">Percentage</span>
                                </label>
                              </Form.Group>
                            </Col>
                            <Col xs={3} md={2} lg={3} className="ml-4 ml-md-0">
                              <Form.Group as={Row} className="mb-3">
                                <Col>
                                  <NumberFormat
                                    name="domestic_percent"
                                    className="form-control"
                                    maxLength={19}
                                    displayType="input"
                                    type="text"
                                    allowNegative={false}
                                    onBlur={(v) => {
                                      setFieldValue(
                                        "domestic_percent",
                                        v.target.value.replaceAll(",", ""),
                                      )
                                    }}
                                    isAllowed={(values) => {
                                      const { floatValue } = values
                                      return (
                                        floatValue >= 1 && floatValue <= 100
                                      )
                                    }}
                                    disabled={values.domestic !== "percentage"}
                                  />
                                </Col>
                                <p className="text-lg mt-1">%</p>
                              </Form.Group>
                            </Col>
                            <Col xs={7} md={6} lg={9}>
                              <Form.Group className="">
                                <Col>
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name="domestic_is_tax_inclusive"
                                      disabled={
                                        values.domestic !== "percentage"
                                      }
                                    />
                                    <span className="ml-2">Include Taxes</span>
                                  </label>
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      International Flight Mark-up
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={10}>
                      <Row className="mt-md-2">
                        <Col lg={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="international"
                                    value="international_fixed_amount"
                                  />
                                  <span className="ml-2">Fixed Amount</span>
                                </label>
                                {/* <Form.Check type="radio" label="Fixed Amount" /> */}
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={5} className="ml-lg-4">
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
                                  <NumberFormat
                                    name="international_amount"
                                    className="form-control"
                                    maxLength={19}
                                    thousandsGroupStyle="thousand"
                                    displayType="input"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onBlur={(v) => {
                                      setFieldValue(
                                        "international_amount",
                                        v.target.value.replaceAll(",", ""),
                                      )
                                    }}
                                    disabled={
                                      values.international !==
                                      "international_fixed_amount"
                                    }
                                  />
                                </Col>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                              <Form.Group className="mb-3 ml-5 ml-md-0">
                                <Col>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="international_charge_type_id"
                                      value="c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                                      disabled={
                                        values.international !==
                                        "international_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Ticket</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="international_charge_type_id"
                                      value="de03bf84-4bd8-4cdf-9348-00246f04bcad"
                                      disabled={
                                        values.international !==
                                        "international_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Person</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="international_charge_type_id"
                                      value="5123b121-4f6a-4871-bef1-65408d663e19"
                                      disabled={
                                        values.international !==
                                        "international_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Transaction</span>
                                  </label>
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="international"
                                    value="percentage"
                                  />
                                  <span className="ml-2">Percentage</span>
                                </label>
                              </Form.Group>
                            </Col>
                            <Col xs={3} md={2} lg={3} className="ml-4 ml-md-0">
                              <Form.Group as={Row} className="mb-3">
                                <Col>
                                  <NumberFormat
                                    name="international_percent"
                                    className="form-control"
                                    maxLength={19}
                                    displayType="input"
                                    type="text"
                                    allowNegative={false}
                                    onBlur={(v) => {
                                      setFieldValue(
                                        "international_percent",
                                        v.target.value.replaceAll(",", ""),
                                      )
                                    }}
                                    isAllowed={(values) => {
                                      const { floatValue } = values
                                      return (
                                        floatValue >= 1 && floatValue <= 100
                                      )
                                    }}
                                    disabled={
                                      values.international !== "percentage"
                                    }
                                  />
                                </Col>
                                <p className="text-lg mt-1">%</p>
                              </Form.Group>
                            </Col>
                            <Col xs={7} md={6} lg={9}>
                              <Form.Group className="">
                                <Col>
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name="international_is_tax_inclusive"
                                      disabled={
                                        values.international !== "percentage"
                                      }
                                    />
                                    <span className="ml-2">Include Taxes</span>
                                  </label>
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading"></h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <button
                    className="btn float-right button-override"
                    onClick={() => setModalShow(true)}
                  >
                    <img src={createIcon} className="mr-1" alt="new" />
                    Add Override Mark-up
                  </button>
                  <FlightModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
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
