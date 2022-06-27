import { FastField, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from "axios"
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import _ from "lodash"
import useQuery from "lib/query"

import "./traveler-setting.css"

const options = {
  position: "bottom-right",
}

const Employee = (props) => {
  const isView = useQuery().get("action") === "view"
  let api = new Api()
  const [openSnackbar] = useSnackbar(options)

  const [initialForm, setInitialForm] = useState({
    employee_number: "",
    job_title: "",
    division: "",
    office: "",
    hire_date: [],
    npwp: "",
  })

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
                <h3 className="card-heading">Status</h3>
                {/* {console.log("values ===> ", values)} */}
                <div style={props.isMobile ? {padding: "0 0 30px 0"} : { padding: "0 15px 30px 15px" }}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={6}>
                    Allow booking for other travelers
                  </Form.Label>
                  <Col sm={6}>
                    <OverlayTrigger
                      key={"offers"}
                      placement="top"
                      overlay={
                        <Tooltip id="offers-top">
                          {
                            values.dealSubscription ? "Deactivate" : "Activate"
                          }
                        </Tooltip>
                      }
                    > 
                      {({ ref, ...triggerHandler }) => (
                        <Form.Switch
                          {...triggerHandler}
                          ref={ref}
                          id="deals-subscription"
                          name="deals-subscription"
                          checked={values.dealSubscription}
                          className="traveler-switch"
                          onChange={(e) => 
                            setFieldValue("dealSubscription", !values.dealSubscription)
                          }
                          
                        />
                      )}
                      
                    </OverlayTrigger>
                  
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
        )
      }}
    </Formik>
  );
}

export default Employee;
