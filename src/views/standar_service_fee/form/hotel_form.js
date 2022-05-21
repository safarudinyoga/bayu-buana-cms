import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Tabs,
  TabPane,
  Modal,
} from "react-bootstrap"
import useQuery from "lib/query"
import createIcon from "assets/icons/create.svg"
import { ReactSVG } from "react-svg"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"
// import TabelFlightOverride from "../table/flight_override_service_fee_table"
import { useDispatch, useSelector } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"
import HotelTabel from "../table/hotel_table"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const backUrl = "/master/standard-service-fee"

const HotelModal = (props) => {
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
            <p className="modals-header mt-3">Add Hotel Standar Service Fee</p>
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

const HotelForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const isView = showCreateModal.disabled_form || props.isView
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  let api = new Api()
  let formId = props.match.params.id
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let api = new Api()
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Hotel Standard Service Fee"
    if (!formId) {
      docTitle = "Create Hotel Standard Service Fee"
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

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])
  // Initialize form
  const initialForm = {
    // Translations
  }

  const initialFormModalAddMap = {}

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
          console.log(values)
          console.log(props)
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
                      <FastField name="res">
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
                      Domestic Flight Service Fee
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={4}>
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
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Check type="radio" label="Percentage" />
                      </Form.Group>
                      <Col sm={12} md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Control
                            style={{ maxWidth: "80px" }}
                            className="mx-3"
                          />
                          <span className="text-lg mt-1">%</span>
                          <Form.Check
                            type="checkbox"
                            label="Include Taxed"
                            className="mt-2 ml-4"
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      International Flight Service Fee
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={4}>
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
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Check type="radio" label="Percentage" />
                      </Form.Group>
                      <Col sm={12} md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Control
                            style={{ maxWidth: "80px" }}
                            className="mx-3"
                          />
                          <span className="text-lg mt-1">%</span>
                          <Form.Check
                            type="checkbox"
                            label="Include Taxed"
                            className="mt-2 ml-4"
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                  </Form.Group>
                  {isView ? (
                    <h3 className="card-heading"></h3>
                  ) : (
                    <>
                      <h3 className="card-heading"></h3>
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
                        <HotelModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </Col>
                    </>
                  )}
                </div>
                {/* {formId && <TabelFlightOverride />} */}
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

export default withRouter(HotelForm)
