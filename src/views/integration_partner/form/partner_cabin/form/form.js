import React, { useEffect, useState } from "react"
import Api from "config/api"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import env from "config/environment"
import { useDispatch } from "react-redux"
import SelectAsync from "components/form/select-async"
import { withRouter, useHistory } from "react-router"
import { ReactSVG } from "react-svg"
import Select from "../../../../../components/form/select"
import { Row, Col, Tab, Nav, Card, Button, Form, Modal } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import TabelFareFamily from "../tabel-fare-family"

import * as Yup from "yup"
import _ from "lodash"

import createIcon from "assets/icons/create.svg"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import { setAlert } from "redux/ui-store"

const endpoint = "/master/integration-partner-cabin-types"

const backUrl = "/master/integration-partner"

const FareFamilyModal = (props) => {
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
            <p className="modals-header mt-3">CREATE FARE FAMILY</p>
          </div>

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Fare Family
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
                Booking Class
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col md={8}>
                <Row className="mt-md-2">
                  <Col lg={12}>
                    <Row>
                      <Col xs={12} md={12} lg={12} className="ml-4 ml-md-0">
                        <Form.Group as={Row} className="mb-3">
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "80px" }} />
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

function PartnerCabins(props) {
  let dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [showTabel] = useState(false)
  const history = useHistory()
  let api = new Api()
  let formId = props.match.params.id
  let [status, setStatus] = useState({ switchStatus: true })
  const [tabKey, setTabKey] = useState("partner-cabin")
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [selectCity, setSelectCity] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    cabin_type: "",
    cabin_type_name: "",
    cabin_type_code: "",
  })


  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    try {
      let res = await api.get(endpoint + "/" + formId)
      let data = res.data;
      console.log(formId)
      setForm({
        ...form,
        cabin_type_id: data.cabin_type_id,
        cabin_type: {
          value: data.cabin_type.id,
          label: data.cabin_type.cabin_type_name,
        },
        cabin_type_name: data.cabin_type_name,
        cabin_type_code: data.cabin_type_code,
      })
    } catch (e) { }
    setLoading(false)
  }, [])


  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])



  const validationSchema = Yup.object().shape({
    cabin_type: Yup.object()
      .required("Cabin is required."),
    cabin_type_name: Yup.string().required("Partner Cabin Name is required").test(
      "Unique Partner Cabin Name",
      "Partner Cabin Name already exists", // <- key, message
      async (value, ctx) => {
        let formId = props.match.params.id
        try {
          let res = await axios.get(`${env.API_URL}/master/integration-partner-cabin-types?filters=["cabin_type_name","=","${value}"]`)

          if (formId) {
            return res.data.items.length === 0 ||
              value === form.cabin_type_name
          } else {
            return res.data.items.length === 0
          }
        } catch (e) {
          return false
        }
      }
    ),
    cabin_type_code: Yup.string().required("Partner Cabin Code is required").test(
      "Unique Partner Cabin Code",
      "Partner Cabin Code already exists", // <- key, message
      async (value, ctx) => {
        let formId = props.match.params.id
        try {
          let res = await axios.get(`${env.API_URL}/master/integration-partner-cabin-types?filters=["cabin_type_code","=","${value}"]`)

          if (formId) {
            return res.data.items.length === 0 ||
              value === form.cabin_type_code
          } else {
            return res.data.items.length === 0
          }
        } catch (e) {
          return false
        }
      }
    ),
  })

  const initialValues = {
    cabin_type: "",
    cabin_type_name: "",
    cabin_type_code: "",
  }
  const onSubmit = async (values, a) => {
    try {
      let formId = props.match.params.id
      let form = {
        cabin_type_id: uuidv4(),
        cabin_type: values.cabin_type ? {
          id: values.cabin_type.value,
          name: values.cabin_type.label
        } : null,
        integration_partner_id: "3f61b5e0-d7cb-4f80-94e7-83114ff23903",

        cabin_type_name: values.cabin_type_name,
        cabin_type_code: values.cabin_type_code,

      }

      if (!formId) {
        //Proses Create Data

        let res = await api.post(`/master/integration-partner-cabin-types`, form)

        dispatch(
          setAlert({
            message: `Record 'Partner Cabin Name: ${form.cabin_type_name}' has been successfully saved.`,
          }),
        )
      } else {
        let res = await api.put(`/master/integration-partner-cabin-types/${formId}`, form)
        dispatch(
          setAlert({
            message: `Record 'Partner Cabin Name: ${form.cabin_type_name}' has been successfully saved.`,
          }),
        )
      }
      history.goBack()
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }

  return (

    <>
      <Formik
        initialValues={form || initialValues}
        validationSchema={validationSchema}

        isView={isView || loading}

        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Cabin<span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="cabin_type">
                            {({ field, form }) => (
                              <div style={{ maxWidth: 200 }}>
                                <SelectAsync
                                  {...field}
                                  isClearable
                                  isDisabled={isView}
                                  url={`master/cabin-types`}
                                  fieldName="cabin_type_name"
                                  onChange={(v) => {
                                    setFieldValue("cabin_type", v)
                                  }}
                                  placeholder="Please choose"
                                  className={`react-select ${form.touched.cabin_type &&
                                      form.errors.cabin_type
                                      ? "is-invalid"
                                      : null
                                    }`}
                                  components={
                                    isView
                                      ? {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                      }
                                      : null
                                  }
                                />
                                {form.touched.cabin_type &&
                                  form.errors.cabin_type && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.cabin_type
                                        ? form.errors.cabin_type
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        {/* <Form.Label column sm={4}>
                          Partner Cabin Code<span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            name="cabin_type_code"
                            type="text"
                            value={values.cabin_type_code}
                            minLength={1}
                            maxLength={36}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ maxWidth: 200 }}
                            disabled={isView}
                          />
                        </Col> */}
                        <Form.Label column md={3} lg={4}>
                          Partner Cabin Code{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col md={9} lg={8}>
                          <FastField name="cabin_type_code" disabled>
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  disabled={isView}
                                  isInvalid={
                                    form.touched.cabin_type_code &&
                                    form.errors.cabin_type_code
                                  }
                                  minLength={1}
                                  maxLength={36}
                                  {...field}
                                  style={{ maxWidth: 300 }}
                                />
                                {form.touched.cabin_type_code &&
                                  form.errors.cabin_type_code && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.cabin_type_code
                                        ? form.errors.cabin_type_code
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        {/* <Form.Label column sm={4}>
                      Partner Cabin Name<span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        name="cabin_type_name"
                        type="text"
                        value={values.cabin_type_name}
                        minLength={1}
                        maxLength={36}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ maxWidth: 200 }}
                        disabled={isView}
                      />
                    </Col> */}
                        <Form.Label column md={3} lg={4}>
                          Partner Cabin Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col md={9} lg={8}>
                          <FastField name="cabin_type_name" disabled>
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  disabled={isView}
                                  isInvalid={
                                    form.touched.cabin_type_name &&
                                    form.errors.cabin_type_name
                                  }
                                  minLength={1}
                                  maxLength={256}
                                  {...field}
                                  style={{ maxWidth: 300 }}
                                />
                                {form.touched.cabin_type_name &&
                                  form.errors.cabin_type_name && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.cabin_type_name
                                        ? form.errors.cabin_type_name
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      {isView ? <h3 className="card-heading"></h3> : <><h3 className="card-heading"></h3>
                        <Col sm={12}>
                          <div style={{ padding: "0 15px 15px 15px" }} >
                            <button
                              className="btn float-right button-override"
                              onClick={() => setModalShow(true)}
                            >
                              <img src={createIcon} className="mr-1" alt="new" />
                              Add New Fare Family
                            </button>

                          </div>
                        </Col>
                        <br />
                        <Col sm={12}>
                          <FareFamilyModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </Col>



                      </>}

                      {formId && < TabelFareFamily />}

                      {
                        props.isMobile
                          ? isView
                            ? (<div className="mb-2 row justify-content-md-start justify-content-center">
                              <Button
                                variant="secondary"
                                onClick={() => props.handleReplaceTable(props.isReplaceTable)}
                              >
                                BACK
                              </Button>
                            </div>)
                            : (<div className="ml-1 row justify-content-md-start justify-content-center">
                              <Button
                                variant="primary"
                                type="submit"
                                disabled={props.formId?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                                style={{ marginRight: 15, marginBottom: 20, marginTop: 85 }}
                              >
                                SAVE
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => props.handleReplaceTable(props.isReplaceTable)}
                                style={{ marginBottom: 20, marginTop: 85 }}
                              >
                                CANCEL
                              </Button>
                            </div>)
                          : ""
                      }
                      {
                        !props.isMobile
                          ? isView
                            ? (<>
                              <Button
                                variant="secondary"
                                onClick={() => props.handleReplaceTable(props.isReplaceTable)}
                                className="mt-3"
                              >
                                BACK
                              </Button>
                            </>)
                            : (<div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                              <Button
                                variant="primary"
                                type="submit"
                                disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                                style={{ marginRight: 15, marginBottom: 135 }}
                              >
                                SAVE
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => props.handleReplaceTable(props.isReplaceTable)}
                              >
                                CANCEL
                              </Button>
                            </div>)
                          : ""
                      }


          </Form>
        )}
      </Formik>
    </>
  )
}

export default withRouter(PartnerCabins)
