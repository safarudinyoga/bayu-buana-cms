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

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

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
                              label="Include Taxed"
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
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  let api = new Api()

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
  })
  // Initialize form
  const initialForm = {
    // General Information
    hotelCode: "",
    hotelName: "",
    hotelBrand: null,
    starRating: null,
    numberOfRooms: "",

    // Contacts
    email: "",
    emailForBookingAcknowledgment: "",
    phone: "",
    fax: "",
    website: "",

    // Address
    address: "",
    country: null,
    province: null,
    city: null,
    zipCode: "",
    destination: "",
    zone: "",
    geoLocationLatitude: "",
    geoLocationLongitude: "",
    mapImage: "",

    // Other Information
    propertyType: "",
    locationCategory: "",
    constructionYear: "",
    lastRenovation: "",
    standardCheckinTime: "",
    standardCheckoutTime: "",
    descriptions: "",
    internalRemark: "",
    termConditions: "",

    // Translations
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
        initialValues={initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("submit: ", values)
          // console.log(props)
          // setSubmitting(true)

          // try {
          //   let res = await api.post("master/markup-rates", {
          //     birth_date: "2021-11-13T04:31:17.022Z",
          //     business_entity_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     citizen_country_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     gender_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     given_name: "string",
          //     marital_status_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     middle_name: "string",
          //     name_prefix_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     name_suffix: "string",
          //     name_title: "string",
          //     religion_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     surname: "string",
          //     surname_prefix: "string",
          //   })
          //   console.log(res)
          //   resetForm()
          //   setSubmitting(false)
          // } catch (e) {}
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
                      <FastField name="hotelCode">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              isInvalid={
                                form.touched.hotelCode && form.errors.hotelCode
                              }
                              minLength={1}
                              maxLength={128}
                              style={{ maxWidth: 300 }}
                              {...field}
                            />
                            {form.touched.hotelCode &&
                              form.errors.hotelCode && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.hotelCode
                                    ? form.errors.hotelCode
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
                      <Form.Control
                        as="textarea"
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
                                <Form.Check type="radio" label="Fixed Amount" />
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
                                  <Form.Control style={{ maxWidth: "220px" }} />
                                </Col>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                              <Form.Group className="mb-3 ml-5 ml-md-0">
                                <Col>
                                  <Form.Check type="radio" label="/Ticket" />
                                  <Form.Check type="radio" label="/Person" />
                                  <Form.Check
                                    type="radio"
                                    label="/Transaction"
                                  />
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <Form.Check type="radio" label="Percentage" />
                              </Form.Group>
                            </Col>
                            <Col xs={3} md={2} lg={3} className="ml-4 ml-md-0">
                              <Form.Group as={Row} className="mb-3">
                                <Col>
                                  <Form.Control style={{ maxWidth: "80px" }} />
                                </Col>
                                <p className="text-lg mt-1">%</p>
                              </Form.Group>
                            </Col>
                            <Col xs={7} md={6} lg={9}>
                              <Form.Group className="">
                                <Col>
                                  <Form.Check
                                    type="checkbox"
                                    label="Include Taxed"
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
                                <Form.Check type="radio" label="Fixed Amount" />
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
                                  <Form.Control style={{ maxWidth: "220px" }} />
                                </Col>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                              <Form.Group className="mb-3 ml-5 ml-md-0">
                                <Col>
                                  <Form.Check type="radio" label="/Ticket" />
                                  <Form.Check type="radio" label="/Person" />
                                  <Form.Check
                                    type="radio"
                                    label="/Transaction"
                                  />
                                </Col>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6}>
                          <Row>
                            <Col sm={12} md={3} lg={12}>
                              <Form.Group>
                                <Form.Check type="radio" label="Percentage" />
                              </Form.Group>
                            </Col>
                            <Col xs={3} md={2} lg={3} className="ml-4 ml-md-0">
                              <Form.Group as={Row} className="mb-3">
                                <Col>
                                  <Form.Control style={{ maxWidth: "80px" }} />
                                </Col>
                                <span className="text-lg mt-1">%</span>
                              </Form.Group>
                            </Col>
                            <Col xs={7} md={6} lg={9}>
                              <Form.Group className="">
                                <Col>
                                  <Form.Check
                                    type="checkbox"
                                    label="Include Taxed"
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
