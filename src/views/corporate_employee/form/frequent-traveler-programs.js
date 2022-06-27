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

const options = {
  position: "bottom-right",
}

const FrequentTravelerPrograms = (props) => {
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
//   const validationSchema = Yup.object({
//     employee_number: Yup.string()
//       .required("Employee Number is required.")
//       .test(
//         "Unique Employee Number",
//         "Employee Number already exists", // <- key, message
//         async (value, ctx) => {
//           let formId = props?.employeeData?.id
//             try {
//               let res = await axios.get(`${env.API_URL}/master/employees?filters=["employee_number","=","${value}"]`)

//               if (formId) {
//                 return res.data.items.length === 0 ||
//                 value === initialForm.employee_number
//               } else {
//                 return res.data.items.length === 0
//               }
//             } catch(e) {
//               return false
//             }
//         }
//       ),
//     job_title: Yup.object().required("Job Title is required."),
//     npwp: Yup.string().matches(numberSimbol, "NPWP must be a number"),
//   })

  const resetDate = (date, months=defmonths, years=defyears) => {
    const today = new Date()
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth() + 1
    let currentDate = today.getDate()

    if (years.value === currentYear) {
      if (months.value > currentMonth) {
        return true
      } else {
        if(date.value > currentDate) {
          return true
        } else {
          return false
        }
      }
    }

    if (months.value === 2 && years.value % 4 == 0) {
      return date.value > 29
    }
    if (months.value === 2 && years.value % 4 != 0) {
      return date.value > 28
    }
    if (
      months.value === 4 ||
      months.value === 6 ||
      months.value === 9 ||
      months.value === 11
    ) {
      return date.value > 30
    }
    return false
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
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          let formatted = {
            employee_number: values.employee_number,
            job_title_id: values.job_title ? values.job_title.value : "00000000-0000-0000-0000-000000000000",
            division_id: values.division ? values.division.value : "00000000-0000-0000-0000-000000000000",
            office_id: values.office ? values.office.value : "00000000-0000-0000-0000-000000000000",
            hire_date: values.hire_date.length > 0
            ? values.hire_date[0].value !== '' 
            ? dateFormat([
                values.hire_date[2].value,
                values.hire_date[1].value,
                values.hire_date[0].value,
              ])
            : null : null,
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
                <h3 className="card-heading">Frequent Traveler Programs</h3>
                {/* {console.log("values ===> ", values)} */}
                {/* <div style={props.isMobile ? {padding: "0 0 30px 0"} : { padding: "0 15px 30px 15px" }}> */}
              
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

export default FrequentTravelerPrograms;
