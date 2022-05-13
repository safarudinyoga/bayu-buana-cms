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
import FormInputControl from "components/form/input-control";
import FormAlert from "components/form/alert";
import axios from "axios"
import useQuery from "lib/query"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const endpoint = "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/hotel-suppliers"

const HotelSuppliers = (props) => {
  const isView = useQuery().get("action") === "view"
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)

  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [title, setTitle] = useState(null)
  const [hotelSupplierName, setHotelSupplierName] = useState(null)
  const [hotelSupplierCode, setHotelSupplierCode] = useState(null)
  const [partnerHotelName, setPartnerHotelName] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(true)

  let api = new Api()

  // Initialize form
  const initialForm = {
    // General Information
    hotelCode: "",
    hotelName: "",
    hotelBrand: "",
    hotelSupplierName: hotelSupplierName || "",
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
    modalCaption: "",
    modalImage: "",
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
                `${env.API_URL}/fee-tax-types/`,
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
    hotel_supplier_name: Yup.object().required("Star Rating is required."),
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
    modalCaption: Yup.string().required("Caption is required."),
    modalImage: Yup.string().required("Image is required."),
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
        accept="image/png, image/jpg, image/jpeg"
        multiple={false}
        maxSize={1000000}
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

  useEffect(async () => {
    let api = new Api()
    let formId = showCreateModal.id
    console.log(formId, 'id endpoint');

    let docTitle = "Edit Partner Hotel Suppliers"
    if (!formId) {
      docTitle = "Create Partner Hotel Suppliers"
    }
    setTitle(docTitle)

    dispatch(
      setUIParams({
        title: isView ? "Aircraft Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: props.backUrl,
            text: "Aircrafts",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      let res = await api.get(endpoint + "/" + formId)
      console.log(res, 'ini hasil');
      setHotelSupplierName(res.data.hotel_supplier_name)
      setHotelSupplierCode(res.data.hotel_supplier_code)
      setPartnerHotelName(res.data.hotel_supplier_name)
      console.log(hotelSupplierCode, 'changed');
      try {
      } catch (e) {}
      // try {
      //   let res = await api.get(endpoint + "/" + formId + "/translations", {
      //     size: 50,
      //   })
      //   setTranslations(res.data.items)
      // } catch (e) {}
      setLoading(false)
    } else {
    }
  }, [])

  const handleonSubmit = async(e) => {
    e.preventDefault()
    console.log('sini', hotelSupplierName);
    const payload = {
      "created_at": "1943-09-24T23:01:04.987Z",
      "creator_id": "urn:uuid:619774fd-7ea6-4a38-4705-48f2c9e15964",
      "hotel_supplier": {
        "value": hotelSupplierName.label
      },
      "hotel_supplier_code": hotelSupplierCode,
      "hotel_supplier_id": hotelSupplierName.value,
      "hotel_supplier_name": partnerHotelName,
      "id": "",
      "integration_partner_id": "3f61b5e0-d7cb-4f80-94e7-83114ff23903",
      "modifier_id": "",
      "sort": 1,
      "status": 1,
      "updated_at": ""
    }
    return new Promise((resolve, rejecet) => {
      axios.post(api.env.endpoint("/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/hotel-suppliers"), payload)
          .then((res) => {
              // props.history.goBack()
              console.log(res, 'succes');
              if (res.status === 200) {
                props.onHide(false)
                return (
                  <FormAlert
                    isValid={true}
                    message={"succes"}
                  />
                )
              }
          })
          .catch((error) => {
            console.log(error, 'error');
              resolve(false)
          })
    })
  };

  return (
    <div>
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
          <Form onSubmit={handleonSubmit} style={{background: 'transparent'}} style={{}} >
                <h3 className="" style={{textAlign: 'center', fontSize: 18, marginBottom: 20, marginTop: -20}}>{title}</h3>
                <div style={{ padding: "0 10px 10px" }}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex',}}>
                        <Form.Label column sm={6}>
                          Hotel Supplier     
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={6}>
                          <FastField name="hotel_supplier">
                            {({ field, form }) => {
                              return(
                              <div style={{ width: 200}}>
                                <Select
                                  {...field}
                                  url={`master/hotel-suppliers`}
                                  fieldName="hotel_supplier_name"
                                  onChange={(v) => {
                                    setFieldValue("hotel_supplier_name", v)
                                    setHotelSupplierName(v)
                                  }}
                                  className={`react-select ${
                                    form.touched.hotel_supplier_name &&
                                    form.errors.hotel_supplier_name
                                      ? "is-invalid"
                                      : null
                                  }`}
                                />
                                {form.touched.hotel_supplier_name &&
                                  form.errors.hotel_supplier_name && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.hotel_supplier_name
                                        ? form.errors.hotel_supplier_name
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            )}}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex',}}>
                        <Form.Label column sm={6} style={{marginTop: 10}}>
                            Partner Hotel Supplier Code
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={1}>
                            <FormInputControl
                                value={hotelSupplierCode}          
                                onChange={(e) => setHotelSupplierCode(e.target.value)}
                                type="text"
                                minLength="1"
                                maxLength="256"
                                style={{width: 100 }}
                            />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
                        <Form.Label column sm={6} style={{}}>
                            Partner Hotel Supplier Name
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={1}>
                          <FormInputControl
                                value={partnerHotelName}          
                                onChange={(e) => setPartnerHotelName(e.target.value)}
                                type="text"
                                minLength="1"
                                maxLength="256"
                                style={{width: 200, marginTop: -10 }}
                            />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15, marginLeft: 10 }}
              >
                SAVE
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
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-form"
        style={{width:'100vw'}}
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
                    <FastField name="modalCaption">
                      {({ field, form }) => (
                        <>
                          <Form.Control
                            type="text"
                            isInvalid={
                              form.touched.modalCaption &&
                              form.errors.modalCaption
                            }
                            maxLength={128}
                            {...field}
                          />
                          {form.touched.modalCaption &&
                            form.errors.modalCaption && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.modalCaption
                                  ? form.errors.modalCaption
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
                <Button variant="secondary" onClick={() => setModalShow(false)}>
                  CANCEL
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default HotelSuppliers
