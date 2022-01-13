import React, { useState } from "react"
import { Card, Form, Button, Row, Col, Accordion, Modal } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { ReactSVG } from "react-svg"
import Dropzone from "react-dropzone-uploader"
import Select from "components/form/select"

const Media = (props) => {
  const [modalHotelMainImage, setModalHotelMainImage] = useState(false)
  const [modalHotelMainVideo, setModalHotelMainVideo] = useState(false)
  const [modalRoomTypesImage, setModalRoomTypesImage] = useState(false)
  const [modalRoomTypesVideo, setModalRoomTypesVideo] = useState(false)
  const [modalFacilitiesImage, setModalFacilitiesImage] = useState(false)
  const [modalFacilitiesVideo, setModalFacilitiesVideo] = useState(false)
  const [selectCountry, setSelectCountry] = useState([])

  // Initialize form
  const initialForm = {}

  // Schema for yup
  const validationSchema = Yup.object().shape({})

  // Initialize form hotel main
  const initialFormHotelMainImage = {}
  const validationSchemaHotelMainImage = Yup.object().shape({})
  const initialFormHotelMainVideo = {}
  const validationSchemaHotelMainVideo = Yup.object().shape({})

  // Initialize form room types
  const initialFormRoomTypesImage = {}
  const validationSchemaRoomTypesImage = Yup.object().shape({})
  const initialFormRoomTypesVideo = {}
  const validationSchemaRoomTypesVideo = Yup.object().shape({})

  // Initialize form room types
  const initialFormFacilitiesImage = {}
  const validationSchemaFacilitiesImage = Yup.object().shape({})
  const initialFormFacilitiesVideo = {}
  const validationSchemaFacilitiesVideo = Yup.object().shape({})

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

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
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
                <h3 className="card-heading">Media</h3>
                <div style={{ padding: "0 10px 10px" }}>
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        HOTEL MAIN
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div style={{ display: "flex" }}>
                            <Button
                              variant="secondary"
                              style={{ marginRight: 20 }}
                              onClick={() => setModalHotelMainImage(true)}
                            >
                              ADD IMAGE
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => setModalHotelMainVideo(true)}
                            >
                              ADD VIDEO
                            </Button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        ROOM TYPES
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div style={{ display: "flex" }}>
                            <Button
                              variant="secondary"
                              style={{ marginRight: 20 }}
                              onClick={() => setModalRoomTypesImage(true)}
                            >
                              ADD IMAGE
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => setModalRoomTypesVideo(true)}
                            >
                              ADD VIDEO
                            </Button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        FACILITIES
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div style={{ display: "flex" }}>
                            <Button
                              variant="secondary"
                              style={{ marginRight: 20 }}
                              onClick={() => setModalFacilitiesImage(true)}
                            >
                              ADD IMAGE
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => setModalFacilitiesVideo(true)}
                            >
                              ADD VIDEO
                            </Button>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
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
        show={modalHotelMainImage}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormHotelMainImage}
          validationSchema={validationSchemaHotelMainImage}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD HOTEL IMAGE
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalHotelMainImage(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Category
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="province">
                      {({ field, form }) => (
                        <>
                          <div>
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
                <Button
                  variant="secondary"
                  onClick={() => setModalHotelMainImage(false)}
                >
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        show={modalHotelMainVideo}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormHotelMainVideo}
          validationSchema={validationSchemaHotelMainVideo}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD HOTEL VIDEO
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalHotelMainVideo(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Category
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="province">
                      {({ field, form }) => (
                        <>
                          <div>
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
                    URL
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalHotelMainVideo(false)}
                >
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        show={modalRoomTypesImage}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormRoomTypesImage}
          validationSchema={validationSchemaRoomTypesImage}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD ROOM TYPE IMAGE
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalRoomTypesImage(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Room Type
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="province">
                      {({ field, form }) => (
                        <>
                          <div>
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
                <Button
                  variant="secondary"
                  onClick={() => setModalRoomTypesImage(false)}
                >
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        show={modalRoomTypesVideo}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormRoomTypesVideo}
          validationSchema={validationSchemaRoomTypesVideo}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD ROOM TYPE VIDEO
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalRoomTypesVideo(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Room Type
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="province">
                      {({ field, form }) => (
                        <>
                          <div>
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
                    URL
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalRoomTypesVideo(false)}
                >
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        show={modalFacilitiesImage}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormFacilitiesImage}
          validationSchema={validationSchemaFacilitiesImage}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD HOTEL FACILITY IMAGE
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalFacilitiesImage(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Hotel Facility
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="province">
                      {({ field, form }) => (
                        <>
                          <div>
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
                <Button
                  variant="secondary"
                  onClick={() => setModalFacilitiesImage(false)}
                >
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        show={modalFacilitiesVideo}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
      >
        <Formik
          initialValues={initialFormFacilitiesVideo}
          validationSchema={validationSchemaFacilitiesVideo}
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
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  ADD HOTEL FACILITY VIDEO
                </Modal.Title>
                <div
                  className="modal-close"
                  onClick={() => setModalFacilitiesVideo(false)}
                >
                  <ReactSVG src="/img/icons/close.svg" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={3}>
                    Hotel Facility
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="province">
                      {({ field, form }) => (
                        <>
                          <div>
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
                    URL
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalFacilitiesVideo(false)}
                >
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

export default Media
