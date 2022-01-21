import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Image,
  Tab,
  Nav,
  Modal,
} from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { Editor } from "react-draft-wysiwyg"
import { ReactSVG } from "react-svg"
import Dropzone from "react-dropzone-uploader"
import axios from "axios"

import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"
import HotelTabel from "../table/hotel_table"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const backUrl = "/master/standard-markup"

const HotelForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  let api = new Api()

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    let docTitle = "Edit Hotel Standard Markup"
    if (!formId) {
      docTitle = "Create Hotel Standard Markup"
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
  const validationSchema = Yup.object().shape({
    // General Information
    hotelCode: Yup.string()
      .required("Hotel Code is required.")
      .test(
        "Unique Code",
        "Hotel Code already exists", // <- key, message
        (value) => {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${env.API_URL}/master/hotels?filters=["hotel_code","=","${value}"]`,
              )
              .then((res) => {
                resolve(res.data.items.length == 0)
              })
              .catch((error) => {
                resolve(false)
              })
          })
        },
      ),
    hotelName: Yup.string().required("Hotel Name is required."),
    hotelBrand: Yup.object(),
    starRating: Yup.object().required("Star Rating is required."),
    numberOfRooms: Yup.number(),

    // Contacts
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
    emailForBookingAcknowledgment: Yup.string()
      .email("Email for Booking Acknowledgment is not valid.")
      .required("Email for Booking Acknowledgment is required."),
    phone: Yup.string().required("Phone is required."),
    fax: Yup.string(),
    website: Yup.string(),

    // Address
    address: Yup.string(),
    country: Yup.object().required("Country is required."),
    province: Yup.object(),
    city: Yup.object(),
    zipCode: Yup.string(),
    destination: Yup.object(),
    zone: Yup.object(),
    geoLocationLatitude: Yup.string(),
    mapImage: Yup.string(),

    // Other Information
    propertyType: Yup.object().required("Property Type is required."),
    locationCategory: Yup.object().required("Location Category is required."),
    constructionYear: Yup.string(),
    lastRenovation: Yup.string(),
    standardCheckinTime: Yup.string(),
    standardCheckoutTime: Yup.string(),
    descriptions: Yup.string(),
    internalRemark: Yup.string(),
    termConditions: Yup.string(),
  })

  const validationSchemaModalAddMap = Yup.object().shape({
    caption: Yup.string().required("Caption is required."),
    image: Yup.string().required("Hotel Name is required."),
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
          // setSubmitting(true)

          // try {
          //   let res = await api.post("master/persons", {
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
                <div style={{ padding: "0 10px 10px" }}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Preset Name
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="hotelCode">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  isInvalid={
                                    form.touched.hotelCode &&
                                    form.errors.hotelCode
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  style={{ width: 150 }}
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
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Description
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="address">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                as="textarea"
                                rows={3}
                                minLength={1}
                                maxLength={512}
                                style={{ width: 416 }}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Domestic Hotel Mark-up
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <Row>
                            <Col sm={6}>
                              <Form.Check type="radio" label="Fixed Amount" className="mb-2"/>
                              <Row>
                                <Col sm={5}>
                                  <Form.Group as={Row} className="form-group">
                                    <Form.Label column sm={3}>
                                      IDR
                                    </Form.Label>
                                    <Col sm={9}>
                                      <FastField name="hotelCode">
                                        {({ field, form }) => (
                                          <>
                                            <Form.Control
                                              type="text"
                                              isInvalid={
                                                form.touched.hotelCode &&
                                                form.errors.hotelCode
                                              }
                                              minLength={1}
                                              maxLength={128}
                                              style={{ width: 150 }}
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
                                </Col>
                                <Col sm={7}>
                                  <Form.Check
                                    type="radio"
                                    label="/Room Night"
                                  />
                                  <Form.Check type="radio" label="/Room" />
                                  <Form.Check
                                    type="radio"
                                    label="/Transaction"
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col sm={6}>
                              <Form.Check type="radio" label="Percentage" className="mb-2"/>
                              <Row>
                                <Col sm={5}>
                                <Form.Group as={Row} className="form-group">                                    
                                    <Col sm={3}>
                                      <FastField name="hotelCode">
                                        {({ field, form }) => (
                                          <>
                                            <Form.Control
                                              type="text"
                                              isInvalid={
                                                form.touched.hotelCode &&
                                                form.errors.hotelCode
                                              }
                                              minLength={1}
                                              maxLength={128}
                                              style={{ width: 40 }}
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
                                    <Form.Label column sm={9}>
                                      %
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col sm={7}>
                                  <Form.Check label="Include Taxed" />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          International Hotel Mark-up
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <Row>
                            <Col sm={6}>
                              <Form.Check type="radio" label="Fixed Amount" className="mb-2" />
                              <Row>
                                <Col sm={5}>
                                <Form.Group as={Row} className="form-group">
                                    <Form.Label column sm={3}>
                                      IDR
                                    </Form.Label>
                                    <Col sm={9}>
                                      <FastField name="hotelCode">
                                        {({ field, form }) => (
                                          <>
                                            <Form.Control
                                              type="text"
                                              isInvalid={
                                                form.touched.hotelCode &&
                                                form.errors.hotelCode
                                              }
                                              minLength={1}
                                              maxLength={128}
                                              style={{ width: 150 }}
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
                                </Col>
                                <Col sm={7}>
                                  <Form.Check
                                    type="radio"
                                    label="/Room Night"
                                  />
                                  <Form.Check type="radio" label="/Room" />
                                  <Form.Check
                                    type="radio"
                                    label="/Transaction"
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col sm={6}>
                              <Form.Check type="radio" label="Percentage" className="mb-2" />
                              <Row>
                                <Col sm={5}>
                                <Form.Group as={Row} className="form-group">                                    
                                    <Col sm={3}>
                                      <FastField name="hotelCode">
                                        {({ field, form }) => (
                                          <>
                                            <Form.Control
                                              type="text"
                                              isInvalid={
                                                form.touched.hotelCode &&
                                                form.errors.hotelCode
                                              }
                                              minLength={1}
                                              maxLength={128}
                                              style={{ width: 40 }}
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
                                    <Form.Label column sm={9}>
                                      %
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col sm={7}>
                                  <Form.Check label="Include Taxed" />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <h3 className="card-heading"></h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <HotelTabel />
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

export default withRouter(HotelForm)
