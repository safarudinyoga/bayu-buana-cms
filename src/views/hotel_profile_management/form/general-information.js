import React, { useEffect, useState } from "react"
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

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select"
import FormInputSelectAjax from "components/form/input-select-ajax"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const GeneralInformation = (props) => {
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)

  let api = new Api()

  // Initialize form
  const initialForm = {
    // General Information
    hotelCode: "",
    hotelName: "",
    hotelBrand: "",
    starRating: "",
    numberOfRooms: "",

    // Contacts
    email: "",
    emailForBookingAcknowledgment: "",
    phone: "",
    fax: "",
    website: "",

    // Address
    address: "",
    country: "",
    province: "",
    city: "",
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

  const ImageUploader = () => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
      return { url: "https://httpbin.org/post" }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
      console.log(status, meta, file)
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map((f) => f.meta))
      allFiles.forEach((f) => f.remove())
    }

    return (
      <Dropzone
        getUploadParams={(e) => console.log(e)}
        onChangeStatus={(e) => console.log(e)}
        onSubmit={(e) => console.log(e)}
        accept="image/*,audio/*,video/*"
        inputContent={
          <div className="form-uploader">
            <ReactSVG src="/img/icons/upload.svg" />
            <p className="title">Drag and drop files here to upload</p>
            <p className="note">Maximum file size: 1 MB</p>
          </div>
        }
      />
    )
  }

  const formTranslation = () => {
    return (
      <>
        <Form.Group as={Row} className="form-group">
          <Form.Label column sm={3}>
            Hotel Name
          </Form.Label>
          <Col sm={9}>
            <FastField name="a">
              {({ field }) => (
                <>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={128}
                    style={{ width: 300 }}
                    {...field}
                  />
                </>
              )}
            </FastField>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="form-group">
          <Form.Label column sm={3}>
            Standard Check-in Time
          </Form.Label>
          <Col sm={9}>
            <FastField name="b">
              {({ field }) => (
                <>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={16}
                    style={{ width: 100 }}
                    {...field}
                  />
                </>
              )}
            </FastField>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="form-group">
          <Form.Label column sm={3}>
            Standard Check-out Time
          </Form.Label>
          <Col sm={9}>
            <FastField name="c">
              {({ field }) => (
                <>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={16}
                    style={{ width: 100 }}
                    {...field}
                  />
                </>
              )}
            </FastField>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="form-group">
          <Form.Label column sm={3}>
            Descriptions
          </Form.Label>
          <Col sm={9}>
            <FastField name="d">
              {({ field }) => (
                <Form.Control
                  {...field}
                  as="textarea"
                  rows={3}
                  minLength={1}
                  maxLength={512}
                  style={{ width: 362 }}
                />
              )}
            </FastField>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="form-group">
          <Form.Label column sm={3}>
            Internal Remark
          </Form.Label>
          <Col sm={9}>
            <FastField name="e">
              {({ field }) => (
                <Form.Control
                  {...field}
                  as="textarea"
                  rows={3}
                  minLength={1}
                  maxLength={512}
                  style={{ width: 362 }}
                />
              )}
            </FastField>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="form-group">
          <Form.Label column sm={3}>
            Terms & Conditions
          </Form.Label>
          <Col sm={9}>
            <Editor
              // editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              // onEditorStateChange={this.onEditorStateChange}
            />
          </Col>
        </Form.Group>
      </>
    )
  }

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
                <h3 className="card-heading">General Information</h3>
                <div style={{ padding: "0 10px 10px" }}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Hotel Code
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
                          Hotel Name
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="hotelName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  isInvalid={
                                    form.touched.hotelName &&
                                    form.errors.hotelName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  style={{ width: 400 }}
                                  {...field}
                                />
                                {form.touched.hotelName &&
                                  form.errors.hotelName && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.hotelName
                                        ? form.errors.hotelName
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <FormInputSelectAjax
                        label="Hotel Chain"
                        required={true}
                        name="hotel_brand_id"
                        endpoint="/master/hotel-brands"
                        column="hotel_brand_name"
                        filter={`["status", "=", 1]`}
                        onChange={(e) => {
                          console.log("yoo")
                        }}
                        placeholder="Please choose Hotel Chain"
                        // disabled={isView || loading}
                        type="select"
                        cl={{ md: "3", lg: "3" }}
                        cr="12"
                        style={{ width: 400 }}
                      />
                      <FormInputSelectAjax
                        label="Star Rating"
                        required={true}
                        name="hotel_brand_id"
                        endpoint="/master/rating-types"
                        column="rating_type_name"
                        filter={`["status", "=", 1]`}
                        onChange={(e) => {
                          console.log("yoo")
                        }}
                        placeholder="Please choose Hotel Chain"
                        // disabled={isView || loading}
                        type="select"
                        cl={{ md: "3", lg: "3" }}
                        cr="12"
                        style={{ width: 300 }}
                      />
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={3}>
                          Number Of Rooms
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={9}>
                          <FastField name="numberOfRooms">
                            {({ field }) => (
                              <>
                                <Form.Control
                                  type="number"
                                  maxLength={9999}
                                  style={{ width: 100 }}
                                  {...field}
                                />
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <h3 className="card-heading">Contacts</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Email
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="email">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="email"
                              isInvalid={
                                form.touched.email && form.errors.email
                              }
                              minLength={1}
                              maxLength={256}
                              style={{ width: 400 }}
                              {...field}
                            />
                            {form.touched.email && form.errors.email && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.email ? form.errors.email : null}
                              </Form.Control.Feedback>
                            )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Email for Booking Acknowledgment
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="emailForBookingAcknowledgment">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="email"
                              isInvalid={
                                form.touched.emailForBookingAcknowledgment &&
                                form.errors.emailForBookingAcknowledgment
                              }
                              minLength={1}
                              maxLength={256}
                              style={{ width: 400 }}
                              {...field}
                            />
                            {form.touched.emailForBookingAcknowledgment &&
                              form.errors.emailForBookingAcknowledgment && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.emailForBookingAcknowledgment
                                    ? form.errors.emailForBookingAcknowledgment
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
                      Phone
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="phone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              isInvalid={
                                form.touched.phone && form.errors.phone
                              }
                              minLength={1}
                              maxLength={32}
                              style={{ width: 400 }}
                              {...field}
                            />
                            {form.touched.phone && form.errors.phone && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.phone ? form.errors.phone : null}
                              </Form.Control.Feedback>
                            )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Fax
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="fax">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={36}
                              style={{ width: 400 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Website
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="website">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={256}
                              style={{ width: 400 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Address</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Address
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
                      Country
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="country">
                        {({ field, form }) => (
                          <>
                            <div style={{ width: 300 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCountry}
                                className={`react-select ${
                                  form.touched.starRating &&
                                  form.errors.starRating
                                    ? "is-invalid"
                                    : null
                                }`}
                                onChange={(v) => {
                                  setFieldValue("starRating", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                              {form.touched.starRating &&
                                form.errors.starRating && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.starRating
                                      ? form.errors.starRating
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      State/Province
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="province">
                        {({ field, form }) => (
                          <>
                            <div style={{ width: 200 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCountry}
                                className="react-select"
                                onChange={(v) => {
                                  setFieldValue("province", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      City
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="city">
                        {({ field }) => (
                          <>
                            <div style={{ width: 200 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCountry}
                                className="react-select"
                                onChange={(v) => {
                                  setFieldValue("province", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Zip Code
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="zipCode">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              style={{ width: 100 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Destination
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="destination">
                        {({ field }) => (
                          <>
                            <div style={{ width: 400 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCountry}
                                className="react-select"
                                onChange={(v) => {
                                  setFieldValue("destination", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Zone
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="zone">
                        {({ field }) => (
                          <>
                            <div style={{ width: 300 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCountry}
                                className="react-select"
                                onChange={(v) => {
                                  setFieldValue("zone", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Geo Location
                    </Form.Label>
                    <Col sm={9}>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: 10 }}>
                          <FastField name="geoLocationLatitude">
                            {({ field }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  minLength={1}
                                  maxLength={16}
                                  placeholder="Latitude"
                                  style={{ width: 150 }}
                                  {...field}
                                />
                              </>
                            )}
                          </FastField>
                        </div>
                        <div>
                          <FastField name="geoLocationLongitude">
                            {({ field }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  minLength={1}
                                  maxLength={16}
                                  placeholder="Longitude"
                                  style={{ width: 150 }}
                                  {...field}
                                />
                              </>
                            )}
                          </FastField>
                        </div>
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Map Image
                    </Form.Label>
                    <Col sm={9}>
                      <Button
                        variant="secondary"
                        style={{ width: 133 }}
                        onClick={() => setModalShow(true)}
                      >
                        ADD MAP IMAGE
                      </Button>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Other Information</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Property Type
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="propertyType">
                        {({ field, form }) => (
                          <>
                            <div style={{ width: 300 }}>
                              <Select
                                {...field}
                                placeholder="Please choose Property Type"
                                options={selectCountry}
                                className={`react-select ${
                                  form.touched.propertyType &&
                                  form.errors.propertyType
                                    ? "is-invalid"
                                    : null
                                }`}
                                onChange={(v) => {
                                  setFieldValue("propertyType", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                              {form.touched.propertyType &&
                                form.errors.propertyType && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.propertyType
                                      ? form.errors.propertyType
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Location Category
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="locationCategory">
                        {({ field, form }) => (
                          <>
                            <div style={{ width: 400 }}>
                              <Select
                                {...field}
                                placeholder=""
                                options={selectCountry}
                                className={`react-select ${
                                  form.touched.locationCategory &&
                                  form.errors.locationCategory
                                    ? "is-invalid"
                                    : null
                                }`}
                                onChange={(v) => {
                                  setFieldValue("locationCategory", v)
                                }}
                                onBlur={setFieldTouched}
                              />
                              {form.touched.locationCategory &&
                                form.errors.locationCategory && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.locationCategory
                                      ? form.errors.locationCategory
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </div>
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Construction Year
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="constructionYear">
                        {({ field }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              style={{ width: 100 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Last Renovation
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="lastRenovation">
                        {({ field }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              style={{ width: 100 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Standard Check-in Time
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="standardCheckinTime">
                        {({ field }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              style={{ width: 100 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Standard Check-out Time
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="standardCheckoutTime">
                        {({ field }) => (
                          <>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              style={{ width: 100 }}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Descriptions
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="descriptions">
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
                      Internal Remark
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="internalRemark">
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
                      Terms & Conditions
                    </Form.Label>
                    <Col sm={9}>
                      <Editor
                        // editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        // onEditorStateChange={this.onEditorStateChange}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading-section">Translation</h3>
                <div className="tab-translation">
                  <Tab.Container
                    id="translation-form"
                    defaultActiveKey="indonesia"
                  >
                    <div className="tab-horizontal">
                      <div className="tab-horizontal-nav">
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="indonesia">
                              <span>Indonesia</span>
                              <i
                                className="fas fa-exclamation-triangle"
                                style={{ color: "red" }}
                              ></i>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="chinese-simplified">
                              <span>Chinese Simplified</span>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="tab-horizontal-content">
                        <Tab.Content>
                          <Tab.Pane eventKey="indonesia">
                            {formTranslation()}
                          </Tab.Pane>
                          <Tab.Pane eventKey="chinese-simplified">
                            {formTranslation()}
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </Tab.Container>
                  <div className="tab-translation-note">
                    <span>Note:</span>
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ color: "red" }}
                    ></i>
                    <span>Incomplete data</span>
                  </div>
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
                SAVE & NEXT
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push(props.backUrl)}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormModalAddMap}
          validationSchema={validationSchemaModalAddMap}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD MAP IMAGE
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalShow(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Caption
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="zipCode">
                      {({ field, form }) => (
                        <>
                          <Form.Control
                            type="text"
                            isInvalid={
                              form.touched.caption && form.errors.caption
                            }
                            maxLength={128}
                            {...field}
                          />
                          {form.touched.caption && form.errors.caption && (
                            <Form.Control.Feedback type="invalid">
                              {form.touched.caption
                                ? form.errors.caption
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
                    Image
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <ImageUploader />
                  </Col>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  SAVE
                </Button>
                <Button variant="secondary" onClick={() => setModalShow(false)}>
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default GeneralInformation
