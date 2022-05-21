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
import axios from "axios"
import useQuery from "lib/query"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router"
import { setAlert, setUIParams, setModalTitle } from "redux/ui-store"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const endpoint = "/master/hotels"

const GeneralInformation = (props) => {
    console.log("PROPS",props);
  let api = new Api()
  const isView = useQuery().get("action") === "view"
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  console.log(showCreateModal, 'ini');
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState([])
  const [feeTaxCode, setFeeTaxCode] = useState(null)
  const [feeTaxName, setFeeTaxName] = useState(null)

  const endpoint = "/master/fee-tax-types"

  let formId = props.match.params.id

  React.useEffect(async () => {
    let formId = showCreateModal.id || props.id
    let docTitle = "EDIT PARTNER FEE TAXES"
    if(formId) {
        try {
          let {data} = await api.get(endpoint + "/" + formId)
          setFeeTaxCode(data.fee_tax_type_code)
          setFeeTaxName(data.fee_tax_type_name)
        } catch(e) {
          console.log(e)
        }
    } else if (!formId) {
        docTitle = "CREATE PARTNER FEE TAXES"
    }
    dispatch(setModalTitle(docTitle))
  }, [])

  // Initialize form
  const initialForm = {
    feeTax: "",
    partnerFeeTaxCode: "",
    partnerFeeTaxName: "",
  }

  // const initialFormModalAddMap = {
  //   modalCaption: "",
  //   modalImage: "",
  // }
  // Schema for yup
  const validationSchema = Yup.object().shape({
    feeTax: Yup.object().required("Fee Tax is required"),
    partnerFeeTaxCode: Yup.string().required("Partner Fee Tax Code is required"),
    partnerFeeTaxName: Yup.string().required("Partner Fee Tax Name is required"),
  })

  // const validationSchemaModalAddMap = Yup.object().shape({
  //   modalCaption: Yup.string().required("Caption is required."),
  //   modalImage: Yup.string().required("Image is required."),
  // })

  

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

  useEffect(async () => {
    let api = new Api()
    let formId = ""

    let docTitle = "Edit Partner Fee Tax"
    if (!formId) {
      docTitle = "Create Partner Fee Tax"
    } else if (isView) {
      docTitle = "View Partner Fee Tax"
    }

    dispatch(
      setUIParams({
        title: isView ? "Partner Fee Tax Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: props.backUrl,
            text: "Partner Fee Tax",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    } else {
    }
  }, [])

  const handleOnSubmit = async (e) => {
      e.preventDefault()
      console.log('Ok');
  }

  return (
    <div>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        // validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("submit pressed")
          console.log("VALUES",values)
          console.log(props)

          let formatted = {
            fee_tax_type_id: values.feeTax.value,
            fee_tax_type_code: values.partnerFeeTaxCode,
            fee_tax_type_name: values.partnerFeeTaxName,
          }

          try {
            let res = await api.post(`master/integration-partners/${formId}/fee-taxes`, formatted)
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
          <Form onSubmit={handleSubmit} style={{background: 'transparent'}}>
                {/* <h3 className="" style={{textAlign: 'center', fontSize: 18, marginBottom: 20}}>CREATE PARTNER FEE TAXES</h3> */}
                <div style={{ padding: "0 10px 10px" }}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Form.Label column sm={4.5}>
                          Fee Tax
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="feeTax">
                            {({ field, form }) => (
                              <div style={{ marginLeft: '3%'}}>
                                <Select
                                  {...field}
                                  url={`master/fee-tax-types`}
                                  fieldName="fee_tax_type_name"
                                  onChange={(v) =>
                                    setFieldValue("feeTax", v)
                                  }
                                  placeholder="Please choose"
                                  className={`react-select ${
                                    form.touched.feeTax &&
                                    form.errors.feeTax
                                      ? "is-invalid"
                                      : null
                                  }`}
                                />
                                {form.touched.feeTax &&
                                  form.errors.feeTax && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.feeTax
                                        ? form.errors.feeTax
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
                        <Form.Label column sm={4.5} style={{}}>
                            Partner Fee Tax Code
                          <span className="form-label-required">*</span>
                        </Form.Label>
                            <Col sm={2} style={{marginLeft: 4}}>
                                <FormInputControl
                                    name="partnerFeeTaxCode"
                                    value={values.partnerFeeTaxCode}
                                    // value={feeTaxCode}          
                                    // onChange={(e) => setFeeTaxCode(e.target.value)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    minLength="1"
                                    maxLength="256"
                                    style={{width: "10vw", height: 34, marginLeft: -20, marginTop: 10}}
                                />
                            </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
                        <Form.Label column sm={4.5} style={{}}>
                            Partner Fee Tax Name
                          <span className="form-label-required">*</span>
                        </Form.Label>
                            <Col sm={2} style={{marginLeft: 0}}>
                                <FormInputControl
                                    name="partnerFeeTaxName"
                                    // value={feeTaxName}
                                    value={values.partnerFeeTaxName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}          
                                    // onChange={(e) => setFeeTaxName(e.target.value)}
                                    type="text"
                                    minLength="1"
                                    maxLength="256"
                                    style={{height: 34, width: '18rem', marginLeft: -20, marginBottom: 10}}
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
                style={{ marginRight: 15 }}
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
            <Form onSubmit={handleOnSubmit}>
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

export default withRouter(GeneralInformation)
