import React, { useEffect, useState, useRef } from "react"
import { withRouter, useHistory } from "react-router"
import FormikControl from "../../components/formik/formikControl"
import { Row, Col, Tab, Nav, Card, Button, Image, Form as BSForm } from "react-bootstrap"
import useQuery from "lib/query"
import axios from "axios"
import Api from "config/api"
import env from "config/environment"
import { Form, Formik, ErrorMessage, Field } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "react-simple-snackbar"
import TextError from "components/formik/textError"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

import DatePicker, { registerLocale } from "react-datepicker"
import engb from "date-fns/locale/en-GB"

import "react-datepicker/dist/react-datepicker.css";
import Select from "components/form/select"
import { default as SelectAsync } from "components/form/select-async"
import DateRangePicker from "../../components/form/date_range_picker"
import { values } from "lodash"

const endpoint = "/master/commission-claims"
const backUrl = "/master/setup-flight-commission"
const options = {
  position: "bottom-right",
}

const FlightCommisionForm = (props) => {
  registerLocale("engb", engb)
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  let dispatch = useDispatch()
  let api = new Api()
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)

  const [formValues, setFormValues] = useState({
    airline_id: "",
    commission_claim_departure_date: {
      start_date: null,
      end_date: null,
    },
    commission_claim_issue_date: {
      start_date: null,
      end_date: null,
    }, 
    commission_claim_original_destination: {
      arrival_airport_location_code: "",
      arrival_city_code: "",
      departure_airport_location_code: "",
      departure_city_code: ""
    },
    departure_from: {},
    arrival_at: {},
    percent: "",
  })
  const [specifyPeriodIssue, setSpecifyPeriodIssue] = useState(false)
  const [specifyPeriodDeparture, setSpecifyPeriodDeparture] = useState(false)

  const [optionRoute, setOptionRoute] = useState([])

  const dateHighlight = useRef(null);
  
  const setInputFocus = () => {
    dateHighlight.current.focus();
  }


  useEffect(async () => {
    let api = new Api()
    let docTitle = "Edit Flight Commission"
    let breadcrumbTitle = "Edit Flight Commission"
    if (!formId) {
      docTitle = "Create Flight Commissions"
      breadcrumbTitle = "Create Flight Commission"
    } else if (isView) {
      docTitle = "Flight Commissions Details"
      breadcrumbTitle = "View Flight Commission"
    }
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Setup Flight Commission",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  }, [])

  useEffect(async() => {
    try {
      if(formId){
        let {data} = await api.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          airline_id: {
            value: data.airline.id,
            label: data.airline.airline_name
          },
          commission_claim_departure_date: data.commission_claim_departure_date.start_date 
          ? {
            start_date: new Date(data.commission_claim_departure_date.start_date).toDateString(),
            end_date: new Date(data.commission_claim_departure_date.end_date).toDateString(),
          }
          : {
            start_date: null,
            end_date: null,
          },
          commission_claim_issue_date: data.commission_claim_issue_date.start_date 
          ? {
            start_date: new Date(data.commission_claim_issue_date.start_date).toDateString(),
            end_date: new Date(data.commission_claim_issue_date.end_date).toDateString(),
          }
          : {
            start_date: null,
            end_date: null,
          }, 
          departure_from : {
            label: data.departure_city?.city_name || data.departure_airport_location?.airport_name,
            value: data.commission_claim_original_destination?.departure_airport_location_code || data.commission_claim_original_destination?.departure_city_code,
            source: data.commission_claim_original_destination.departure_airport_location_code 
            ? "airport"
            : data.commission_claim_original_destination.departure_city_code
            ? "city"
            :"",
          },
          arrival_at: {
            label: data.arrival_city?.city_name || data.arrival_airport_location?.airport_name,
            value: data.commission_claim_original_destination?.arrival_airport_location_code || data.commission_claim_original_destination?.arrival_city_code,
            source: data.commission_claim_original_destination.arrival_airport_location_code 
            ? "airport"
            : data.commission_claim_original_destination.arrival_city_code
            ? "city"
            :"",
          }
        })
        setSpecifyPeriodDeparture(data.commission_claim_departure_date.start_date)
        setSpecifyPeriodIssue(data.commission_claim_issue_date.start_date)
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  // Routes
  useEffect(async () => {
    const options = []
    try {
      let resAirport = await api.get(`/master/airports?size=-1&page=0&filter=["status", "=", 1]`)
      let resCity = await api.get(`/master/cities?size=-1&page=0&filter=["status", "=", 1]`)
      resAirport.data.items.forEach((data) => {
        options.push({
          label: data.airport_name,
          value: data.airport_code,
          source: "airport",
        })
      })
      resCity.data.items.forEach((data) => {
        options.push({
          label: data.city_name,
          value: data.city_code,
          source: "city",
        })
      })
    } catch(e) {
      console.log("Error",e)

    }
    setOptionRoute(options)
  }, [])
  
  const subYears = (event, num) => {
    event.setFullYear(event.getFullYear() - num)
    return event
  }
  const addYears = (event, num) => {
    event.setFullYear(event.getFullYear() + num)
    return event
  }

  const percentNumber = /^100(\.0{0,2})? *%?$|^\d{1,2}(\.\d{1,2})? *%?$/

  Yup.addMethod(Yup.object, 'pairRoutes', function(message) {
    return this.test('unique', message, function() {
      if (this.parent.arrival_at.value !== undefined && this.parent.departure_from.value !== undefined) {
        return this.parent.arrival_at.value !== this.parent.departure_from.value
      } else {
        return true
      }
    })
  })

  const validationSchema = Yup.object({
    airline_id: Yup.object().required("Airline is required"),
    arrival_airport_location_code: Yup.string(),
    arrival_city_code: Yup.string(),
    departure_airport_location_code: Yup.string(),
    departure_city_code: Yup.string(),

    departure_from: Yup.object().pairRoutes("Origin and Destination must be different."),
    arrival_at: Yup.object().pairRoutes("Origin and Destination must be different."),

    percent: Yup.string().matches(percentNumber, "Commision Percentage can only between 0.00 - 100.00").required("Commission Percentage is required.")
  })

  return (
    <div style={{ paddingBottom: 80}}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            let formatted = {
              airline_id: values.airline_id.value,
              commission_claim_original_destination: {
                departure_airport_location_code: values.departure_from && values.departure_from?.source === 'airport' ? values.departure_from.value : null,
                arrival_airport_location_code: values.arrival_at && values.arrival_at?.source === 'airport' ? values.arrival_at.value : null,

                departure_city_code: values.departure_from && values.departure_from?.source === 'city' ? values.departure_from.value : null,
                arrival_city_code: values.arrival_at && values.arrival_at?.source === 'city' ? values.arrival_at.value : null,
              },
              commission_claim_departure_date: !specifyPeriodDeparture ? {} : {
                start_date: values.commission_claim_departure_date.start_date ? new Date(values.commission_claim_departure_date.start_date) : [],
                end_date: values.commission_claim_departure_date.end_date ? new Date(values.commission_claim_departure_date.end_date) : [],
              },
              commission_claim_issue_date: !specifyPeriodIssue ? {} : {
                start_date: values.commission_claim_issue_date.start_date ? new Date(values.commission_claim_issue_date.start_date) : [],
                end_date: values.commission_claim_issue_date.end_date ? new Date(values.commission_claim_issue_date.end_date) : [],
              },
              percent: parseFloat(values.percent)
            }
  
            let res = await api.putOrPost("master/commission-claims", formId, formatted)
            openSnackbar(`Record '${values.airline_id.label}' has been successfully saved.`)
            props.history.goBack()
          } catch (e) {
            console.log(e)
          }
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="commission-form">
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <FormikControl
                          control="selectAsync"
                          required={isView ? "" : "label-required"}
                          label="Specified Airline"
                          name="airline_id"
                          placeholder="Please Choose"
                          url={`master/airlines`}
                          fieldName={"airline_name"}
                          onChange={(v) => {
                            formik.setFieldValue("airline_id", v)
                          }}
                          components={
                            isView ? {
                              DropdownIndicator: () => null, 
                              IndicatorSeparator: () => null,
                            } : null
                          }
                          size= {{
                            label:{ md: 3, lg: 3},
                            value:{ md: 4, lg: 3}
                          }}
                          // isDisabled={loading}
                        />
                        {/* Routes */}
                        <Row className="form-group required">
                          <Col md={3} lg={3}>
                            <label className="text-label-input" htmlFor={"routes"}>
                              Route(s)
                            </label>
                          </Col>
                          <Col md={9} lg={6}>
                            <Row>
                              <Col md={5} lg={6}>
                                <Field id={"departure_from"} name={"departure_from"}>
                                  {({ field, form, meta}) => (
                                    <div>
                                      <Select
                                        {...field}
                                        options={optionRoute}
                                        placeholder="Select Depart From"
                                        // url={`master/airports`}
                                        fieldName="airport_name"
                                        onChange={(v) => {
                                          formik.setFieldValue("departure_from", v)
                                        }}
                                        className={`react-select ${
                                          form.errors.departure_from
                                            ? "is-invalid"
                                            : null
                                        }`}
                                      />
                                      {form.errors.departure_from ? (
                                        <div className="invalid-feedback">{form.errors.departure_from}</div>
                                      ) : null}
                                    </div>
                                  )}
                                </Field>
                              </Col>
                              <Col md={5} lg={6}>
                                <Field id={"arrival_at"} name={"arrival_at"}>
                                  {({ field, form, meta}) => (
                                    <div>
                                      <Select
                                        {...field}
                                        options={optionRoute}
                                        placeholder="Select Arrival At"
                                        // url={`master/airports`}
                                        fieldName="airport_name"
                                        onChange={(v) => {
                                          formik.setFieldValue("arrival_at", v)
                                        }}
                                        className={`react-select ${
                                          form.errors.arrival_at
                                            ? "is-invalid"
                                            : null
                                        }`}
                                      />
                                      {form.errors.arrival_at ? (
                                        <div className="invalid-feedback">{form.errors.arrival_at}</div>
                                      ) : null}
                                    </div>
                                  )}
                                </Field>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {/* issue period */}
                        <Row className="form-group">
                          <Col md={3} lg={3}>
                            <label className="text-label-input" htmlFor={"issue-period"}>
                              Period of Issue
                              <span className={""} />
                            </label>
                          </Col>
                          <Col md={9} lg={8}>
                            <BSForm.Check
                              type="radio"
                              checked={!specifyPeriodIssue}
                              onClick={(e) => setSpecifyPeriodIssue(false)}
                              onChange={(e) => setSpecifyPeriodIssue(false)}
                              id={`issue-period-false`}
                              name={`issue-period`}
                              label={`Not Specified`}
                            />
                            <Row className="align-items-center">
                              <Col md={2}>
                                <BSForm.Check
                                  type="radio"
                                  checked={specifyPeriodIssue}
                                  onClick={(e) => setSpecifyPeriodIssue(true)}
                                  onChange={(e) => setSpecifyPeriodIssue(true)}
                                  id={`issue-period-true`}
                                  name={`issue-period`}
                                  label={`Specify Period`}
                                />
                              </Col>
                              {specifyPeriodIssue ? (
                                <Col>
                                  <DateRangePicker
                                    minDate={10}
                                    maxDate={10}
                                    value={[formik.values.commission_claim_issue_date.start_date, formik.values.commission_claim_issue_date.end_date]}
                                    onChange={(date) => {
                                      if(date.length > 0) {
                                        formik.setFieldValue("commission_claim_issue_date", {
                                          start_date: date[0],
                                          end_date: date[1],
                                        })
                                      } else {
                                        formik.setFieldValue("commission_claim_issue_date", {
                                          start_date: null,
                                          end_date: null,
                                        })
                                      }
                                    }}
                                  />
                                </Col>
                              ) : ""}
                            </Row>
                            
                            
                          </Col>
                        </Row>

                        {/* issue departure */}
                        <Row className="form-group">
                          <Col md={3} lg={3}>
                            <label className="text-label-input" htmlFor={"departure-period"}>
                              Period of Departure
                              <span className={""} />
                            </label>
                          </Col>
                          <Col md={9} lg={8}>
                            <BSForm.Check
                              type="radio"
                              checked={!specifyPeriodDeparture}
                              onClick={(e) => setSpecifyPeriodDeparture(false)}
                              onChange={(e) => setSpecifyPeriodDeparture(false)}
                              id={`departure-period-false`}
                              name={`departure-period`}
                              label={`Not Specified`}
                            />
                            <Row className="align-items-center">
                              <Col md={2}>
                                <BSForm.Check
                                  type="radio"
                                  checked={specifyPeriodDeparture}
                                  onClick={(e) => setSpecifyPeriodDeparture(true)}
                                  onChange={(e) => setSpecifyPeriodDeparture(true)}
                                  id={`departure-period-true`}
                                  name={`departure-period`}
                                  label={`Specify Period`}
                                />
                              </Col>
                              {specifyPeriodDeparture ? (
                              <>
                                <Col>
                                  <DateRangePicker
                                    minDate={10}
                                    maxDate={10}
                                    value={[formik.values.commission_claim_departure_date.start_date, formik.values.commission_claim_departure_date.end_date]}
                                    onChange={(date) => {
                                      if(date.length > 0) {
                                        formik.setFieldValue("commission_claim_departure_date", {
                                          start_date: date[0],
                                          end_date: date[1],
                                        })
                                      } else {
                                        formik.setFieldValue("commission_claim_departure_date", {
                                          start_date: null,
                                          end_date: null,
                                        })
                                      }
                                    }}
                                  />
                                </Col>
                              </>
                            ) : ""}
                            </Row>
                          </Col>
                        </Row>
                        {/* <Col xs={3} md={3} lg={3} className="ml-md-0"> */}
                          <Row className="form-group mb-0">
                            <Col className="ml-0">
                                <FormikControl 
                                  control="input"
                                  label="Commission Percentage"
                                  name="percent"
                                  required="label-required"
                                  className
                                  style={{ maxWidth: 60 }}
                                  // isDisabled={isView}
                                  size= {{
                                    label:{ md: 3, lg: 3},
                                    value:{ md: 4, lg: 3}
                                  }}
                                />
                            </Col>
                            <span className="text-lg ml-0 percent">%</span>
                          </Row>
                        </Col>
                        
                      {/* </Col> */}
                    </Row>
                  </Card.Body>
                </Card>
                <div
                  className="mb-5 ml-1 row justify-content-md-start justify-content-center"
                  style={{
                    marginBottom: 30,
                    marginTop: 30,
                    display: "flex",
                  }}
                >
                  {isView ? (
                    <>
                      <Button
                        variant="secondary"
                        onClick={() => history.goBack()}
                      >
                        BACK
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{ marginRight: 15 }}
                      >
                        SAVE
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => history.goBack()}
                      >
                        CANCEL
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default withRouter(FlightCommisionForm)