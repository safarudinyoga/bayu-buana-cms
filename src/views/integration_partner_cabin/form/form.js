import React, { useEffect, useState } from "react"
import Api from "config/api"
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import SelectAsync from "components/form/select-async"
import { withRouter, useHistory } from "react-router"
import FormInputControl from "components/form/input-control"
import { ReactSVG } from "react-svg"
import FormikControl from "../../../components/formik/formikControl"
import Select from "../../../components/form/select"
import { Row, Col, Tab, Nav, Card, Button, Form } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import Tabel from './tabel-fare-family'
import * as Yup from "yup"
import _ from "lodash"

import createIcon from "assets/icons/create.svg"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import { setAlert } from "redux/ui-store"

const endpoint = "/master/integration-partner-cabin-types"

const backUrl = "/master/employee"
function FormIntegrationPartner(props) {
  let dispatch = useDispatch()
  const history = useHistory()
  let api = new Api()
  let [status, setStatus] = useState({ switchStatus: true })
  const [tabKey, setTabKey] = useState("partner-cabin")
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [selectCity, setSelectCity] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    cabin_type:"",
    cabin_type_name:"",
    cabin_type_code:"",
  })


  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit partner-cabin"
    if (!formId) {
      docTitle = "Add partner-cabin"
    } else if (isView) {
      docTitle = "partner-cabin Details"
    }
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employment Management",
          },
          {
            link: backUrl,
            text: "Master Employee",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )

    try {
      let res = await api.get(endpoint + "/" + formId)
      let data = res.data;

      setForm({
        ...form,
        cabin_type_id:data.cabin_type_id,
        cabin_type:{
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
      cabin_type_name: Yup.string().required("Partner Cabin Name is required"),
      cabin_type_code: Yup.string().required("Partner Cabin Code is required"),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = props.match.params.id
      let form = {
        cabin_type_id:uuidv4(),
        integration_partner_id:uuidv4(),
        cabin_type: values.cabin_type ? {
        id:values.cabin_type.value,
        name: values.cabin_type_name.values
        } : null,
        cabin_type_name: values.cabin_type_name,
        cabin_type_code: values.cabin_type_code,

      }
    
      if (!formId) {
        //Proses Create Data
        let res = await api.post(`/master/integration-partner-cabin-types`,  form)
        dispatch(
          setAlert({
            message: `Record 'Partner Cabin Name: ${form.cabin_type_name}' has been successfully saved.`,
          }),
        )
      } else {
        let res = await api.put(`/master/integration-partner-cabin-types/${formId}`,  form)
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
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const formSize = {
    label: {
      md: 4,
      lg: 4,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }
  return (

    <>
      <Formik
        initialValues={form}
        validationSchema={validationSchema}
        validator={() => ({})}
        isView={isView || loading}
        // onSubmit={async (values, { setSubmitting, resetForm }) => {

        //   let formatted = {
        //     cabin_type: values.cabin_type ? values.cabin_type.value : "00000000-0000-0000-0000-000000000000",
        //     cabin_type_name: values.cabin_type_name,
        //     cabin_type_code: values.cabin_type_code,
            
        //   }
        //   try {
        //     let res = await api.post(`/master/integration-partner-cabin-types`,  formatted)
        //     dispatch(
        //       setAlert({
        //         message: `Record 'Partner Cabin Name: ${formatted.cabin_type_name}' has been successfully saved.`,
        //       }),
        //     )
        //   } catch(e) {
        //     dispatch(
        //       setAlert({
        //         message: "Failed to save this record.",
        //       }),
        //     )
        //   }
        // }}
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
            <Card>
              <Card.Body>
                <h3 className="card-heading">Partner Cabin</h3>
                {/* <FormikControl
                  control="selectAsync"
                  required={isView ? "" : "label-required"}
                  label="Cabin"
                  name="cabin"
                  placeholder={values.cabin_type_name || "Please Choose."}
                  url={`master/integration-partner-cabin-types`}
                  fieldName={"cabin_type_name"}
                  onChange={(v) => {
                    setFieldValue("cabin", v)
                  }}
                  style={{ maxWidth: 250 }}
                  components={
                    isView
                      ? {
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }
                      : null
                  }
                  isDisabled={isView}
                />  */}
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
                              url={`master/integration-partner-cabin-types`}
                              fieldName="cabin_type_name"
                              onChange={(v) => {
                                setFieldValue("cabin_type", v)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.cabin_type &&
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
                    <Form.Label column sm={4}>
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
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={4}>
                      Partner Cabin Code<span className="form-label-required">*</span>
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
                    </Col>
                  </Form.Group>
               <h3 className="card-heading"></h3>
               <div style={{ padding: "0 15px 15px 15px" }}>
                 
                  <button
                    className="btn float-right button-override"
                    
                  >
                    <img  src={createIcon} className="mr-1" alt="new" />
                    Add New Fare Family
                  </button>
                  {/* <FlightModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  /> */}
                </div>
                {/* < Tabel /> */}
                {
                  props.isMobile 
                  ? isView 
                  ? (<div className="mb-2 row justify-content-md-start justify-content-center">
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
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
                        onClick={() => props.history.goBack()} 
                        style={{ marginBottom: 20, marginTop: 85 }}                       
                      >
                        CANCEL
                      </Button>
                    </div>)
                  : ""
                }
              </Card.Body>
            </Card>
            {
              !props.isMobile 
              ? isView 
              ? (<>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
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
                    onClick={() => props.history.goBack()}
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

export default withRouter(FormIntegrationPartner)
