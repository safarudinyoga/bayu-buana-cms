import { FastField, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import axios from "axios"
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import _ from "lodash"
import useQuery from "lib/query"
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import * as Yup from "yup"
import env from "config/environment"
import removeIcon from "assets/icons/remove.svg"
import FormikControl from "../../../components/formik/formikControl"
import DateRangePicker from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"

const options = {
  position: "bottom-right",
}

const Passport = (props) => {
  const isView = useQuery().get("action") === "view"
  let api = new Api()
  const [openSnackbar] = useSnackbar(options)
  const [additionalRole, setAdditionalRole] = useState(false)  
  const [defmonths, setMonths] = useState({ value: 1, label: "" })
  const [defyears, setYears] = useState({ value: 1921, label: "" }) 

  const [initialForm, setInitialForm] = useState({
    employee_number: "",
    job_title: "",
    division: "",
    office: "",
    hire_date: [],
    npwp: "",
    expiry_date: new Date(),
    name_prefixName: ""
  })

  const [form, setForm] = useState({
    start_date: new Date(),
    fixed: false,
  })


  const numberSimbol = /^[0-9!@#$%-._^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

  useEffect(async () => {
    try {
        let data = props.formData && props.formData.employee_number ? props.formData : props.employeeData;
        if(data) {
          setInitialForm({
            ...initialForm,
            employee_number: data.employee_number ? data.employee_number : "",
            job_title: _.isEmpty(data.job_title) ? '' : {
              value: data.job_title.id,
              label: data.job_title.job_title_name,
            },
            division: _.isEmpty(data.division) ? "" : {
              value: data.division.id,
              label: data.division.division_name,
            },
            office: _.isEmpty(data.office) ? '' : {
              value: data.office.id,
              label: data.office.office_name,
            },
            hire_date: data.hire_date ? [
              {
                value: parseInt(data.hire_date.split("-")[2]),
                label: parseInt(data.hire_date.split("-")[2]),
              },
              {
                value: parseInt(data.hire_date.split("-")[1]),
                  label: new Date(null, parseInt(data.hire_date.split("-")[1]), null).toLocaleDateString("en", {
                  month: "long",
                })
              },
              {
                value: parseInt(data.hire_date.split("-")[0]),
                label: parseInt(data.hire_date.split("-")[0]),  
              },
            ] : [],
            npwp: data.npwp || "",
            expiry_date: ""
          })
        }
    } catch(e) {
      console.log(e)
    }
  }, [props.employeeData, props.formData])

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          let formatted = {
            employee_number: values.employee_number,
            job_title_id: values.job_title ? values.job_title.value : "00000000-0000-0000-0000-000000000000",
            division_id: values.division ? values.division.value : "00000000-0000-0000-0000-000000000000",
            office_id: values.office ? values.office.value : "00000000-0000-0000-0000-000000000000",
            npwp: values.npwp,
            job_title: values.job_title ? {
              id: values.job_title.value,
              name: values.job_title.label
            } : null,
            division: values.division ?{
              id: values.division.value,
              name: values.division.label
            } : null,
            office: values.office ? {
              id: values.office.value,
              name: values.office.label
            } : null
          }
          console.log(formatted, values.hire_date)
          await props.onSubmit(formatted)
        } catch(e) {
          setTimeout(
            openSnackbar("error ==>", e)
            , 4000)
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
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Card style={{marginBottom: 0}}>
              <Card.Body>
                <h3 className="card-heading">Passport</h3>
                {/* {console.log("values ===> ", values)} */}
                <div style={props.isMobile ? {padding: "0 0 30px 0"} : { padding: "0 15px 30px 15px" }}>
                  {/* <Form.Group as={Row} className="form-group"> */}
                <Col md={12} lg={9} style={{paddingLeft: 0}}>
                <FormikControl
                    control="selectAsync"
                    label="Title"
                    name="title"
                    placeholder={values.name_prefixName || "Mr."}
                    url={`master/name-prefixes`}
                    fieldName={"name_prefix_name"}
                    onChange={(v) => {
                        setFieldValue("title", v)
                    }}
                    style={{ maxWidth: 120 }}
                    components={
                        isView
                        ? {
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                            }
                        : null
                    }
                    isDisabled={isView}
                    />
                </Col>

                <Form.Group as={Row} className="form-group">
                <Form.Label column sm={3}>
                    First Name
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                    name="first_name"
                    type="text"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ maxWidth: 250 }}
                    disabled={isView}
                    />
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="form-group">
                <Form.Label column sm={3}>
                    Middle Name
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                    name="middle_name"
                    type="text"
                    value={values.middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ maxWidth: 250 }}
                    disabled={isView}
                    />
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="form-group">
                <Form.Label column sm={3}>
                    Last Name
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                    name="last_name"
                    type="text"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ maxWidth: 250 }}
                    disabled={isView}
                    />
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="form-group">
                <Form.Label column sm={3}>
                    Passport Number 
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                    name="passport_number"
                    type="text"
                    value={values.passport_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ maxWidth: 250 }}
                    disabled={isView}
                    />
                </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Place of Issue
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="place_of_issue">
                        {({ field, form }) => (
                          <div style={{ maxWidth: 300 }}>
                            <SelectAsync
                              {...field}
                              isClearable
                              isDisabled={isView}
                              url={`master/place_of_issue`}
                              fieldName="place_of_issue"
                              onChange={(v) => {
                                setFieldValue("place_of_issue", v)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.place_of_issue &&
                                form.errors.place_of_issue
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
                            {form.touched.place_of_issue &&
                              form.errors.place_of_issue && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.place_of_issue
                                    ? form.errors.place_of_issue
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </div>
                        )}
                      </FastField>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                        Expiry date
                    </Form.Label>
                    <Col sm={9}>
                    <DateRangePicker
                        value={values.expiry_date}
                        onChange={(date) => {
                            setFieldValue(date)
                        }}
                        render={
                        <InputIcon
                            style={{ height: 34 }}
                        />}
                        
                    />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                        Document Passport
                    </Form.Label>
                    <Col sm={9}>
                        <Button>
                            UPLOAD FILE
                        </Button>
                    </Col>
                </Form.Group>
            </div>
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
                        disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                        style={{ marginRight: 15, marginBottom: 20, marginTop: 85 }}
                      >
                      {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
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
                    {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
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
        )
      }}
    </Formik>
  );
}

export default Passport;
