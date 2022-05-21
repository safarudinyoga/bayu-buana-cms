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
import { setAlert, setUIParams, setCreateModal } from "redux/ui-store"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { useParams } from "react-router-dom"




const HotelSuppliers = (props) => {
  const isView = useQuery().get("action") === "view"
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  console.log('id', id)
  const endpoint = `/master/integration-partners/${id}/hotel-suppliers`

  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [title, setTitle] = useState(null)
  const [hotelSupplierName, setHotelSupplierName] = useState(null)
  const [hotelSupplierCode, setHotelSupplierCode] = useState(null)
  const [partnerHotelName, setPartnerHotelName] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(true)
  const [supplyId, setSupplyId] = useState(null)
  const [formValues, setFormValues] = useState(null)

  let api = new Api()


  // Initialize form
  const [initialForm, setIntialForm] = useState({
    hotelSupplier: "",
    partnerHotelSupplierCode: "",
    partnerHotelSupplierName: "",
    
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    hotelSupplier: Yup.object().required("Hotel Supplier is required"),
    partnerHotelSupplierCode: Yup.string().required("Partner Hotel Supplier Code is required"),
    partnerHotelSupplierName: Yup.string().required("Partner Hotel Supplier Name is required"),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id
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
            text: "Integration Partner",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )

    if(formId) {
      try {
        console.log("formId",formId)
        console.log("url", endpoint + "/" + formId)
        let { data } = await api.get(endpoint + "/" + formId)
        console.log("DATA if edit",data)
        setFormValues({ 
          ...formValues,

          hotelSupplier: data.hotel_supplier_id ? data.hotel_supplier_id : "",
          partnerHotelSupplierCode: data.hotel_supplier_code ? data.hotel_supplier_code : "",
          partnerHotelSupplierName: data.hotel_supplier_name ? data.hotel_supplier_name : "",
        })
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

    setSupplyId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValues || initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("Values:", values)
          console.log("Modal ID:", showCreateModal.id)

          let formatted = {
            hotel_supplier_code: values.partnerHotelSupplierCode,
            hotel_supplier_name: values.partnerHotelSupplierName,
            hotel_supplier_id: values.hotelSupplier.value,
            integration_partner_id: id
          }

          try {
            let res = await api.putOrPost(endpoint, supplyId, formatted)
            dispatch(
              setAlert({
                  message: `Record 'Partner Hotel Supplier Name: ${values.partnerHotelSupplierName}' has been successfully saved.`,
              })
            );
            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            
          } catch (e) {
            console.error(e)
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
          <Form onSubmit={handleSubmit} style={{background: 'transparent'}} >
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
                                    setFieldValue("hotelSupplier", v)
                                  }}
                                  name="hotelSupplier"
                                  className={`react-select ${
                                    form.touched.hotelSupplier &&
                                    form.errors.hotelSupplier
                                      ? "is-invalid"
                                      : null
                                  }`}
                                />
                                {form.touched.hotelSupplier &&
                                  form.errors.hotelSupplier && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.hotelSupplier
                                        ? form.errors.hotelSupplier
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
                                name="partnerHotelSupplierCode"
                                value={values.partnerHotelSupplierCode}          
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                minLength="1"
                                maxLength="256"
                                style={{width: 200 }}
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
                                name="partnerHotelSupplierName"
                                value={values.partnerHotelSupplierName}          
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                onClick={() => {
                  dispatch(
                    setCreateModal({
                      show: false,
                      id: null,
                      disabled_form: false,
                    })
                  )
                }}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <Modal
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
      </Modal> */}
    </div>
  )
}

export default HotelSuppliers
