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
import SelectAsync from "components/form/select-async"

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
                <FastField name="destination">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        isMulti
                        url={`master/destination-groups`}
                        fieldName="destination_group_name"
                        // onChange={(v) => {
                        //   setFieldValue("destination", v)
                        // }}
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
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={4}>
                Airline Service Type
              </Form.Label>
              <Col sm={7}>
                <FastField name="airline_service_type">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 500 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        url={`master/airline-categories`}
                        fieldName="airline_category_name"
                        // onChange={(v) => {
                        //   setFieldValue("airline_service_type", v)
                        // }}
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
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={4}>
                Specified Airline
              </Form.Label>
              <Col sm={7}>
                <FastField name="specified_airline">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        url={`master/airlines`}
                        fieldName="airline_name"
                        // onChange={(v) => {
                        //   setFieldValue("specified_airline", v)
                        // }}
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
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={4}>
                Specified Source
              </Form.Label>
              <Col sm={7}>
                <FastField name="specified_source">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <SelectAsync
                        {...field}
                        isClearable
                        url={`master/supplier-types`}
                        fieldName="supplier_type_name"
                        // onChange={(v) => {
                        //   setFieldValue("specified_source", v)
                        // }}
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
  const [formModalValues, setFormModalValues] = useState(null)
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
            text: "Setup and Configurations",
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
          domestic:
            data.domestic_flight_markup.amount === 0
              ? "domestic_percentage"
              : "domestic_fixed_amount",
          domestic_amount: data.domestic_flight_markup.amount,
          domestic_charge_type_id: data.domestic_flight_markup.charge_type_id,
          domestic_percent: data.domestic_flight_markup.percent,
          domestic_is_tax_inclusive:
            data.domestic_flight_markup.is_tax_inclusive,
          international:
            data.international_flight_markup.amount === 0
              ? "international_percentage"
              : "international_fixed_amount",
          international_amount: data.international_flight_markup.amount,
          international_charge_type_id:
            data.international_flight_markup.charge_type_id,
          international_percent: data.international_flight_markup.percent,
          international_is_tax_inclusive:
            data.international_flight_markup.is_tax_inclusive,
        })
      } catch (e) {
        console.log(e)
      }
    }

    // if (modalShow && formId) {
    //   try {
    //     let { data } = await api.get(endpoint + "/" + formId)
    //     setFormModalValues({
    //       ...data,
    //     })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }, [])

  console.log("form values : ", formValues)

  // useEffect(() => {
  //   if (!props.match.params.id) {
  //     setLoading(false)
  //   }
  //   setId(props.match.params.id)
  // }, [props.match.params.id])

  const initialValues = {
    markup_category_name: "",
    description: "",
    domestic: "",
    domestic_amount: "",
    domestic_charge_type_id: "",
    domestic_percent: "",
    domestic_is_tax_inclusive: false,
    international: "",
    international_amount: "",
    international_charge_type_id: "",
    international_percent: "",
    international_is_tax_inclusive: false,
  }

  const initialFormModalAddMap = {
    caption: "",
    image: "",
  }

  const validationSchema = Yup.object().shape({
    markup_category_name: Yup.string().required("Please enter Preset Name."),
    description: Yup.string(),
    domestic: Yup.string().required(
      "Please enter fixed amount or percentage for .",
    ),
    domestic_amount: Yup.string().when("domestic", {
      is: "domestic_fixed_amount",
      then: Yup.string().required("Please enter fixed amount for ."),
    }),
    domestic_charge_type_id: Yup.string().when("domestic", {
      is: "domestic_fixed_amount",
      then: Yup.string().required("Please select charge type."),
    }),
    domestic_percent: Yup.string().when("domestic", {
      is: "domestic_percentage",
      then: Yup.string().required("Please enter percentage for ."),
    }),
    domestic_is_tax_inclusive: Yup.boolean(),
    international: Yup.string().required(
      "Please enter fixed amount or percentage for .",
    ),
    international_amount: Yup.string().when("international", {
      is: "international_fixed_amount",
      then: Yup.string().required("Please enter fixed amount for ."),
    }),
    international_charge_type_id: Yup.string().when("international", {
      is: "international_fixed_amount",
      then: Yup.string().required("Please select charge type."),
    }),
    international_percent: Yup.string().when("international", {
      is: "international_percentage",
      then: Yup.string().required("Please enter percentage for ."),
    }),
    international_is_tax_inclusive: Yup.boolean(),
  })

  const validationSchemaModalAddMap = Yup.object().shape({})

  console.log("id: ", props.match.params.id)

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("submit: ", values)
          setLoading(true)
          let api = new Api()
          try {
            let formId =
              props.match.params.id !== undefined
                ? props.match.params.id
                : false
            let form = {
              description: values.description,
              domestic_flight_markup: {
                amount: parseInt(values.domestic_amount) || 0,
                charge_type_id:
                  values.domestic_charge_type_id === ""
                    ? "c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                    : values.domestic_charge_type_id,
                is_tax_inclusive: values.domestic_is_tax_inclusive,
                percent: parseInt(values.domestic_percent) || 0,
              },
              domestic_hotel_markup: {
                amount: 0,
                charge_type_id:
                  values.domestic_charge_type_id === ""
                    ? "c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                    : values.domestic_charge_type_id,
                is_tax_inclusive: false,
                percent: 0,
              },
              international_flight_markup: {
                amount: parseInt(values.international_amount) || 0,
                charge_type_id:
                  values.international_charge_type_id === ""
                    ? "c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                    : values.international_charge_type_id,
                is_tax_inclusive: values.international_is_tax_inclusive,
                percent: parseInt(values.international_percent) || 0,
              },
              international_hotel_markup: {
                amount: 0,
                charge_type_id:
                  values.international_charge_type_id === ""
                    ? "c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                    : values.international_charge_type_id,
                is_tax_inclusive: false,
                percent: 0,
              },
              markup_category_name: values.markup_category_name,
            }

            await api.putOrPost(endpoint, formId, form)

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
                    <Form.Label column md={3} lg={3} xl={2}>
                      Preset Name
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={9} lg={9} xl={10}>
                      <Field
                        className={
                          errors.markup_category_name
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        type="text"
                        name="markup_category_name"
                        minLength={1}
                        maxLength={128}
                        style={{ maxWidth: 300 }}
                        required
                      />
                      <div className="invalid-feedback">
                        {errors.markup_category_name}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={3} lg={3} xl={2}>
                      Description
                    </Form.Label>
                    <Col md={9} lg={9} xl={10}>
                      <Field
                        as="textarea"
                        minLength={1}
                        maxLength={4000}
                        name="description"
                        className="form-control"
                        style={{ height: "88px", maxWidth: "416px" }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={3} lg={3} xl={2}>
                      Domestic Flight Mark-up
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={9} lg={9} xl={10}>
                      <Row className="mt-md-2">
                        <Col lg={7} xl={6}>
                          <Row>
                            <Col sm={12} md={12} lg={12}>
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
                                    className={
                                      errors.domestic_amount
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    maxLength={19}
                                    thousandsGroupStyle="thousand"
                                    displayType="input"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={true}
                                    value={
                                      values.domestic_amount === 0
                                        ? ""
                                        : values.domestic_amount
                                    }
                                    onBlur={(v) => {
                                      setFieldValue(
                                        "domestic_amount",
                                        v.target.value.replaceAll(",", ""),
                                      )
                                    }}
                                    isAllowed={(values) => {
                                      const { floatValue } = values
                                      return (
                                        floatValue >= 1 &&
                                        floatValue <= 999999999999999
                                      )
                                    }}
                                    disabled={
                                      values?.domestic !==
                                      "domestic_fixed_amount"
                                    }
                                  />
                                </Col>
                                <div
                                  style={{ color: "#dc3545", fontSize: "80%" }}
                                >
                                  {errors.domestic_amount}
                                </div>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={5}>
                              <Form.Group className="mb-3 ml-5 ml-md-0">
                                <Col className="d-flex flex-column">
                                  <label>
                                    <Field
                                      type="radio"
                                      name="domestic_charge_type_id"
                                      value="c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                                      disabled={
                                        values?.domestic !==
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
                                        values?.domestic !==
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
                                        values?.domestic !==
                                        "domestic_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Transaction</span>
                                  </label>
                                  <div
                                    style={{
                                      color: "#dc3545",
                                      fontSize: "80%",
                                    }}
                                  >
                                    {errors.domestic_charge_type_id}
                                  </div>
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={5} xl={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="domestic"
                                    value="domestic_percentage"
                                  />
                                  <span className="ml-2">Percentage</span>
                                </label>
                              </Form.Group>
                            </Col>
                            <Col
                              xs={3}
                              md={3}
                              lg={4}
                              xl={3}
                              className="ml-4 ml-md-0"
                            >
                              <Form.Group as={Row} className="mb-3">
                                <Col>
                                  <NumberFormat
                                    name="domestic_percent"
                                    className={
                                      errors.domestic_percent
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    maxLength={19}
                                    displayType="input"
                                    type="text"
                                    allowNegative={true}
                                    value={
                                      values.domestic_percent === 0
                                        ? ""
                                        : values.domestic_percent
                                    }
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
                                    disabled={
                                      values?.domestic !== "domestic_percentage"
                                    }
                                  />
                                  <div
                                    style={{
                                      color: "#dc3545",
                                      fontSize: "80%",
                                    }}
                                  >
                                    {errors.domestic_percent}
                                  </div>
                                </Col>
                                <p className="text-lg mt-1">%</p>
                              </Form.Group>
                            </Col>
                            <Col xs={7} md={6} lg={8}>
                              <Form.Group className="">
                                <Col>
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name="domestic_is_tax_inclusive"
                                      disabled={
                                        values?.domestic !==
                                        "domestic_percentage"
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
                      <div style={{ color: "#dc3545", fontSize: "80%" }}>
                        {errors.domestic}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={3} lg={3} xl={2}>
                      International Flight Mark-up
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={9} lg={9} xl={10}>
                      <Row className="mt-md-2">
                        <Col lg={7} xl={6}>
                          <Row>
                            <Col sm={12} md={12} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="international"
                                    value="international_fixed_amount"
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
                                    name="international_amount"
                                    className={
                                      errors.international_amount
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    maxLength={19}
                                    thousandsGroupStyle="thousand"
                                    displayType="input"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    value={
                                      values.international_amount === 0
                                        ? ""
                                        : values.international_amount
                                    }
                                    onBlur={(v) => {
                                      setFieldValue(
                                        "international_amount",
                                        v.target.value.replaceAll(",", ""),
                                      )
                                    }}
                                    isAllowed={(values) => {
                                      const { floatValue } = values
                                      return (
                                        floatValue >= 1 &&
                                        floatValue <= 999999999999999
                                      )
                                    }}
                                    disabled={
                                      values?.international !==
                                      "international_fixed_amount"
                                    }
                                  />
                                </Col>
                                <div
                                  style={{ color: "#dc3545", fontSize: "80%" }}
                                >
                                  {errors.international_amount}
                                </div>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={5}>
                              <Form.Group className="mb-3 ml-5 ml-md-0">
                                <Col className="d-flex flex-column">
                                  <label>
                                    <Field
                                      type="radio"
                                      name="international_charge_type_id"
                                      value="c93288b6-29d3-4e20-aa83-5ee6261f64ff"
                                      disabled={
                                        values?.international !==
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
                                        values?.international !==
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
                                        values?.international !==
                                        "international_fixed_amount"
                                      }
                                    />
                                    <span className="ml-2">/Transaction</span>
                                  </label>
                                  <div
                                    style={{
                                      color: "#dc3545",
                                      fontSize: "80%",
                                    }}
                                  >
                                    {errors.international_charge_type_id}
                                  </div>
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={5} xl={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <label>
                                  <Field
                                    type="radio"
                                    name="international"
                                    value="international_percentage"
                                  />
                                  <span className="ml-2">Percentage</span>
                                </label>
                              </Form.Group>
                            </Col>
                            <Col
                              xs={3}
                              md={3}
                              lg={4}
                              xl={3}
                              className="ml-4 ml-md-0"
                            >
                              <Form.Group as={Row} className="mb-3">
                                <Col>
                                  <NumberFormat
                                    name="international_percent"
                                    className={
                                      errors.international_percent
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    maxLength={19}
                                    displayType="input"
                                    type="text"
                                    allowNegative={false}
                                    value={
                                      values.international_percent === 0
                                        ? ""
                                        : values.international_percent
                                    }
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
                                      values?.international !==
                                      "international_percentage"
                                    }
                                  />
                                  <div
                                    style={{
                                      color: "#dc3545",
                                      fontSize: "80%",
                                    }}
                                  >
                                    {errors.international_percent}
                                  </div>
                                </Col>
                                <p className="text-lg mt-1">%</p>
                              </Form.Group>
                            </Col>
                            <Col xs={7} md={6} lg={8}>
                              <Form.Group className="">
                                <Col>
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name="international_is_tax_inclusive"
                                      disabled={
                                        values?.international !==
                                        "international_percentage"
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
                      <div style={{ color: "#dc3545", fontSize: "80%" }}>
                        {errors.international}
                      </div>
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
                    setFieldValue={setFieldValue}
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
