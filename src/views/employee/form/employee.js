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

const options = {
  position: "bottom-right",
}

const Subscriptions = (props) => {
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
  })

  const numberSimbol = /^[0-9!@#$%-._^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
  const validationSchema = Yup.object({
    employee_number: Yup.string()
      .required("Employee Number is required.")
      .test(
        "Unique Employee Number",
        "Employee Number already exists", // <- key, message
        async (value, ctx) => {
          let formId = props?.employeeData?.id
            try {
              let res = await axios.get(`${env.API_URL}/master/employees?filters=["employee_number","=","${value}"]`)

              if (formId) {
                return res.data.items.length === 0 ||
                value === initialForm.employee_number
              } else {
                return res.data.items.length === 0
              }
            } catch(e) {
              return false
            }
        }
      ),
    job_title: Yup.object().required("Job Title is required."),
    npwp: Yup.string().matches(numberSimbol, "NPWP must be a number"),
  })

   // Hire Date
   const selectDay = (months=defmonths, years=defyears) => {
    const options = []
    const today = new Date()
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth() + 1
    let currentDate = today.getDate()
    if (years.value === currentYear && months.value === currentMonth) {
      for (let i = 1; i <= currentDate; i++) {
        options.push({
          label: i,
          value: i,
        })
      }
    } else {
      if (months.value === 2 && years.value % 4 == 0) {
        for (let i = 1; i <= 29; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if (months.value === 2 && years.value % 4 != 0) {
        for (let i = 1; i <= 28; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if (
        months.value === 4 ||
        months.value === 6 ||
        months.value === 9 ||
        months.value === 11
      ) {
        for (let i = 1; i <= 30; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else {
        for (let i = 1; i <= 31; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      }
    }
    return options
  }
  const selectMonth = (years=defyears) => {
    const options = []
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    const month = Array.from({ length: years.value === currentYear ? currentMonth : 12 }, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "long",
      })
    })
    
    month.forEach((data, i) => {
      options.push({
        label: data,
        value: i + 1,
      })
    })
    return options
  }
  const selectYear = () => {
    const options = []

    const startYear = 1921
    const endYear = new Date().getFullYear()

    for (let i = endYear; i >= startYear; i--) {
      options.push({
        label: i,
        value: i,
      })
    }

    return options
  }

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
          })
        }
    } catch(e) {
      console.log(e)
    }
  }, [props.employeeData, props.formData])


  function dateFormat(date) {
    var d = new Date(date),
      day = "" + d.getDate(),
      month = "" + (d.getMonth() + 1),
      year = d.getFullYear()
    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day
    return [year, month, day].join("-")
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          let formatted = {
            employee_number: values.employee_number,
            job_title_id: values.job_title ? values.job_title.value : "00000000-0000-0000-0000-000000000000",
            division_id: values.division ? values.division.value : "00000000-0000-0000-0000-000000000000",
            office_id: values.office ? values.office.value : "00000000-0000-0000-0000-000000000000",
            hire_date: values.hire_date.length > 0
            ? dateFormat([
                values.hire_date[2].value,
                values.hire_date[1].value,
                values.hire_date[0].value,
              ])
            : null,
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
            <Card>
              <Card.Body>
                <h3 className="card-heading">Employment</h3>
                {/* {console.log("values ===> ", values)} */}
                <div style={props.isMobile ? {padding: "0 0 30px 0"} : { padding: "0 15px 30px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column xs={5} sm={5} md={3} lg={3}>
                      Employee ID <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col xs={7} sm={7} md={9} lg={9} >
                      <FastField name="employee_number" disabled>
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              value={values.employee_number}
                              minLength={1}
                              maxLength={36}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={isView}
                              style={{ maxWidth: 250 }}
                              isInvalid={
                                form.touched.employee_number &&
                                form.errors.employee_number
                              }
                            />

                            {form.touched.employee_number &&
                              form.errors.employee_number && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.employee_number
                                    ? form.errors.employee_number
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
                      Job Title <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="job_title">
                        {({ field, form }) => (
                          <div style={{ maxWidth: 200 }}>
                            <SelectAsync
                              {...field}
                              isDisabled={isView}
                              url={`master/job-titles`}
                              fieldName="job_title_name"
                              onChange={(v) => {
                                setFieldValue("job_title", v)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.job_title &&
                                form.errors.job_title
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
                            {form.touched.job_title &&
                              form.errors.job_title && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.job_title
                                    ? form.errors.job_title
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
                      Division
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="division">
                        {({ field, form }) => (
                          <div style={{ maxWidth: 200 }}>
                            <SelectAsync
                              {...field}
                              isDisabled={isView}
                              url={`master/divisions`}
                              fieldName="division_name"
                              onChange={(v) => {
                                setFieldValue("division", v)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.division &&
                                form.errors.division
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
                            {form.touched.division &&
                              form.errors.division && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.division
                                    ? form.errors.division
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
                      Branch Office
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="office">
                        {({ field, form }) => (
                          <div style={{ maxWidth: 250 }}>
                            <SelectAsync
                              {...field}
                              isDisabled={isView}
                              url={`master/offices`}
                              fieldName="office_name"
                              onChange={(v) => {
                                setFieldValue("office", v)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.office &&
                                form.errors.office
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
                            {form.touched.office &&
                              form.errors.office && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.office
                                    ? form.errors.office
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
                      Hiring Date
                    </Form.Label>
                    <Col sm={9}>
                      <div style={{ maxWidth: 300, display: "flex" }}>
                        <div style={{ marginRight: 12, maxWidth: 60, flex: 1 }}>
                          <Select
                            options={selectDay(values.hire_date[1], values.hire_date[2])}
                            value={values.hire_date[0]}
                            isDisabled={isView}
                            placeholder="Day"
                            className={`react-select ${
                              touched.title && Boolean(errors.title)
                                ? "is-invalid"
                                : ""
                            }`}                           
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }                            
                            onChange={(v) => {
                              setFieldValue("hire_date[0]", v)
                            }}
                          />
                        </div>
                        <div style={{ marginRight: 12, maxWidth: 140, flex: 1 }}>
                          <Select
                            options={selectMonth(values.hire_date[2])}
                            value={values.hire_date[1]}
                            placeholder="Month"
                            isDisabled={isView}
                            disabled={true}
                            className={`react-select ${
                              touched.title && Boolean(errors.title)
                                ? "is-invalid"
                                : ""
                            }`}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }                            
                            onChange={(v) => {
                              setFieldValue("hire_date[1]", v)
                              setFieldValue("hire_date[0]", {value: 1, label: "1"})
                              // setInitialForm({
                              //   ...initialForm,
                              //   hdMonth: v,
                              //   hdDay: {value: 1, label: "1"}
                              // })
                            }}
                          />
                        </div>
                        <div style={{ maxWidth: 80, flex: 1 }}>
                          <Select
                            options={selectYear()}
                            value={values.hire_date[2]}
                            placeholder="Year"
                            isDisabled={isView}
                            className={`react-select ${
                              touched.title && Boolean(errors.title)
                                ? "is-invalid"
                                : ""
                            }`}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }                            
                            onChange={(v) => {
                              setFieldValue("hire_date[2]", v)
                              setFieldValue("hire_date[1]", {value: 1, label: "January"})
                              setFieldValue("hire_date[0]", {value: 1, label: "1"})
                              // setInitialForm({
                              //   ...initialForm,
                              //   hdYear: v,
                              //   hdMonth: {value: 1, label: "January"},
                              //   hdDay: {value: 1, label: "1"},
                              // })
                            }}
                          />
                        </div>
                      </div>
                      {touched.title && Boolean(errors.title) && (
                        <div className="invalid-feedback">
                          {touched.title ? errors.title : ""}
                        </div>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      NPWP
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="npwp"
                        type="text"
                        value={values.npwp}
                        minLength={1}
                        maxLength={36}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ maxWidth: 200 }}
                        disabled={isView}
                      />
                    </Col>
                  </Form.Group>

                  {/* Aditional Role section */}
                  {additionalRole && (
                    <>
                      <div style={{ padding: "0 15px 15px" }}>
                        <h6 className="mt-2">Employment</h6>
                        <div className="p-2">
                          {/* <FormikControl
                              control="selectAsync"
                              required="label-required"
                              label="Job Title"
                              name="job_title_id"
                              url={`master/job-titles`}
                              fieldName={"job_title_name"}
                              onChange={(v) => {
                                formik.setFieldValue("job_title_id", v)
                              }}
                              placeholder={
                                formik.values.job_title_id ||
                                "Please choose"
                              }
                              style={{ maxWidth: 200 }}
                            />
                            <FormikControl
                              control="selectAsync"
                              label="Division"
                              name="division_id"
                              url={`master/divisions`}
                              fieldName={"division_name"}
                              onChange={(v) => {
                                formik.setFieldValue("division_id", v)
                              }}
                              placeholder={
                                formik.values.division_id ||
                                "Please choose"
                              }
                              style={{ maxWidth: 200 }}
                            /> */}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="d-flex flex-row-reverse">
                    <div
                      onClick={() => setAdditionalRole(!additionalRole)}
                      style={{
                        color: "#1743BE",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Add Additional Role
                    </div>
                  </div>
                  {/* End Aditional Role section */}
                </div>

              
                {
                  props.isMobile 
                  ? isView 
                  ? (<div className="ml-1 row justify-content-md-start justify-content-center">
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
                        style={{ marginRight: 15 }}
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

export default Subscriptions;
