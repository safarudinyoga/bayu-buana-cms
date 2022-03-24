import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import _ from "lodash"

const options = {
  position: "bottom-right",
}

const Subscriptions = (props) => {
  let api = new Api()
  const [openSnackbar] = useSnackbar(options)

  const [initialForm, setInitialForm] = useState({
    employee_number: "",
    job_title: "",
    division: "",
    office: "",
    hdDay: { value: 1, label: 1 },
    hdMonth: { value: 1, label: "January" },
    hdYear: { value: 1921, label: 1921 },
    npwp: "",
  })

   // Hire Date
   const selectDay = () => {
    const options = []
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate()
    if(initialForm.dobYear.value === currentYear && initialForm.dobMonth.value === currentMonth){
      for (let i = 1; i <= currentDate; i++) {
        options.push({
          label: i,
          value: i,
        })
      }
    } else {
      if(initialForm.dobMonth.value === 2 && initialForm.dobYear.value % 4 == 0){
        for (let i = 1; i <= 29; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if(initialForm.dobMonth.value === 2 && initialForm.dobYear.value % 4 != 0){
        for (let i = 1; i <= 28; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if(initialForm.dobMonth.value === 4 || initialForm.dobMonth.value === 6 || initialForm.dobMonth.value === 9 || initialForm.dobMonth.value === 11) {
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
  const selectMonth = () => {
    const options = []
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    const month = Array.from({ length: initialForm.dobYear.value === currentYear ? currentMonth : 12 }, (e, i) => {
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
        let data = props.employeeData;
        console.log(data);
        setInitialForm({
          ...initialForm,
          employee_number: data.employee_number ? data.employee_number : "",
          job_title: _.isEmpty(data.job_title) ? {
            value: data.job_title.id,
            label: data.job_title.country.job_title_name,
          } : "",
          division: _.isEmpty(data.division) ? {
            value: data.division.id,
            label: data.division.division_name,
          } : "",
          office: _.isEmpty(data.office) ? {
            value: data.office.id,
            label: data.office.division_name,
          } : "",
          hdDay: data.hire_date ? {
            value: parseInt(data.hire_date.split("-")[2]),
            label: parseInt(data.hire_date.split("-")[2]), 
          } : {
            value: 1,
            label: 1,
          },
          hdMonth: data.hire_date ? {
            value: parseInt(data.hire_date.split("-")[1]),
            label: new Date(null, parseInt(data.hire_date.split("-")[1]), null).toLocaleDateString("en", {
              month: "long",
            }), 
          }: {
            value: 1,
            label: 1,
          },
          hdYear: data.hire_date ? {
            value: parseInt(data.hire_date.split("-")[0]),
            label: parseInt(data.hire_date.split("-")[0]),  
          } : {
            value: 1921,
            label: 1921,
          },
          npwp: data.npwp || "",
        })
    } catch(e) {}
  }, [])

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)
        let day = values.hdDay.value < 10 ? ("0"+values.hdDay.value) : values.hdDay.value;
          let month = values.hdMonth.value < 10 ? ("0"+values.hdMonth.value) : values.hdMonth.value;
          let year = values.hdYear.value;

        let formatted = {
            birth_date: year+"-"+month+"-"+day,
            employee_number: values.employee_number,
            npwp: values.npwp,
            job_title_id: values.job_title ? values.job_title.value : "00000000-0000-0000-0000-000000000000",
            office_id: values.office ? values.office.value : "00000000-0000-0000-0000-000000000000",
            division_id: values.division ? values.division.value : "00000000-0000-0000-0000-000000000000",
        }

        try {
          await props.onSubmit(formatted)
          openSnackbar(
            `Subscriptions has been successfully updated.`
          )
        } catch(e) {}
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
              <h3 className="card-heading">Subscriptions</h3>
              <div style={{ padding: "0 15px 15px" }}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={6}>
                    Receive Travel Deals and Special Offers
                  </Form.Label>
                  <Col sm={6}>
                  <Form.Check 
                    type="switch"
                    id="deals-subscription"
                    name="deals-subscription"
                    checked={values.dealSubscription}
                    onChange={(e) => 
                      setFieldValue("dealSubscription", !values.dealSubscription)
                    }
                  />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={6}>
                    Receive Newsletters
                  </Form.Label>
                  <Col sm={6}>
                  <Form.Check 
                    type="switch"
                    id="newsletter-subscription"
                    name="newsletter-subscription"
                    checked={values.newsletterSubscription}
                    onChange={(e) => 
                      setFieldValue("newsletterSubscription", !values.newsletterSubscription)
                    }
                  />
                  </Col>
                </Form.Group>
              </div>
              <div style={{ marginBottom: 30, marginTop: 30 }} className="mobile-button">
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push("/")}
              >
                CANCEL
              </Button>
            </div>
              </Card.Body>
              {
                props.isMobile ? (
                  <div className="mb-5 ml-1 row justify-content-md-start justify-content-center">
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginRight: 15 }}
                    >
                      SAVE
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => props.history.push("/")}
                    >
                      CANCEL
                    </Button>
                  </div>
                ) : ""
              }
            </Card>
            {
              props.isMobile ? "" : (
                <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: 15 }}
                  >
                    SAVE
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.push("/")}
                  >
                    CANCEL
                  </Button>
                </div>
              )
            }
          </Form>
        )
      }}
    </Formik>
  );
}

export default Subscriptions;
