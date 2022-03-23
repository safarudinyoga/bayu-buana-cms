import React, { useEffect, useState } from "react"
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

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Select from "components/form/select"
import { default as SelectAsync } from "components/form/select-async"

const endpoint = "/master/commission-claims"
const backUrl = "/master/setup-flight-commission"

const FlightCommisionForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  let api = new Api()
  const isView = useQuery().get("action") === "view"

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)

  const [formValues, setFormValues] = useState(null)
  const [optAirline, setOptAirline] = useState([])
  const [optArrival, setOptArrival] = useState([])
  const [optDeparture, setOptDeparture] = useState([])
  const [arrivalCity, setArrivalCity] = useState()
  const [departureCity, setDepartureCity] = useState()
  const [specifyPeriodIssue, setSpecifyPeriodIssue] = useState(false)
  const [specifyPeriodDeparture, setSpecifyPeriodDeparture] = useState(false)

  const [optionRoute, setOptionRoute] = useState([])

  const [periodIssueStart, setPeriodIssueStart] = useState(new Date())
  const [periodIssueEnd, setPeriodIssueEnd] = useState(new Date())

  const [periodDepartureStart, setPeriodDepartureStart] = useState(new Date())
  const [periodDepartureEnd, setPeriodDepartureEnd] = useState(new Date())

  const [commission, setCommission] = useState("0.00")


  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    let docTitle = "Edit Flight Commissions"
    let breadcrumbTitle = "Edit Flight Commissions"
    if (!formId) {
      docTitle = "Create Flight Commissions"
      breadcrumbTitle = "Create Flight Commissions"
    } else if (isView) {
      docTitle = "Flight Commissions Details"
      breadcrumbTitle = "View Flight Commissions"
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

    if(formId){

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
      let resAirport = await api.get("/master/airports")
      resAirport.data.items.forEach((data) => {
        options.push({
          label: `${data.city.city_name} (${data.airport_name})`,
          value: data.airport_code
        })
      })
    } catch(e) {}
    setOptionRoute(options)
  }, [])
  
  
  const initialValues = {
    airline_id: "",
    commission_claim_departure_date: {
      start_date: [],
      end_date: [],
    },
    commission_claim_issue_date: {
      start_date: [],
      end_date: [],

    },
    commission_claim_original_destination: {
      arrival_airport_location_code: "",
      arrival_city_code: "",
      departure_airport_location_code: "",
      departure_city_code: ""
    },
    percent: "0.00",
  }

  const percentNumber = /^100(\.0{0,2})? *%?$|^\d{1,2}(\.\d{1,2})? *%?$/

  const validationSchema = Yup.object({
    airline_id: Yup.object().required("Airline is required"),
    arrival_airport_location_code: Yup.string(),
    arrival_city_code: Yup.string(),
    departure_airport_location_code: Yup.string(),
    departure_city_code: Yup.string(),
    percent: Yup.string().matches(percentNumber, "Commision Percentage can only between 0.00 - 100.00").required("Commission Percentage is required.")
  })

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        let formatted = {
          airline_id: values.airline_id.value,
          commission_claim_original_destination: {
            departure_airport_location_code: values.departFrom.value,
            arrival_airport_location_code: values.arrivalAt.value,
          },
          commission_claim_departure_date: {
            start_date: values.departureStart ? values.departureStart : "",
            end_date: values.departureEnd ? values.departureEnd : "",
          },
          commission_claim_issue_date: {
            start_date: values.issueStart ? values.issueStart : "",
            end_date: values.issueEnd ? values.issueEnd : "",
          },
          percent: parseFloat(values.percent)
        }
        console.log(formatted)

        let res = await api.post("master/commission-claims", formatted)
        return props.history.goBack()
      }}
    >
      {(formik) => {
        console.log("Formik", formik)
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
                        label="Specified Airlines"
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
                        // isDisabled={isView}
                      />
                      {/* Routes */}
                      <Row className="form-group required">
                        <Col md={3} lg={4}>
                          <label className="text-label-input" htmlFor={"routes"}>
                            Route(s)
                            <span className={"label-required"} />
                          </label>
                        </Col>
                        <Col md={9} lg={8}>
                          <Row>
                            <Col md={5} lg={6}>
                              <Field id={"departureFrom"} name={"departureFrom"}>
                                {({ field, form, meta}) => (
                                  <div>
                                    <Select
                                      options={optionRoute}
                                      placeholder="Select Depart From"
                                      // url={`master/airports`}
                                      fieldName="airport_name"
                                      onChange={(v) => {
                                        formik.setFieldValue("departFrom", v)
                                        setOptDeparture(v)
                                      }}
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={5} lg={6}>
                              <Field id={"arrivalAt"} name={"arrivalAt"}>
                                {({ field, form, meta}) => (
                                  <div>
                                    <Select
                                      options={optionRoute}
                                      placeholder="Select Arrival At"
                                      // url={`master/airports`}
                                      fieldName="airport_name"
                                      onChange={(v) => {
                                        formik.setFieldValue("arrivalAt", v)
                                        setOptArrival(v)
                                      }}
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {/* issue period */}
                      <Row className="form-group">
                        <Col md={3} lg={4}>
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
                            <Col md={3}>
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
                            <>
                              <Col md={4}>
                                <DatePicker
                                  className="form-control"
                                  dateFormat="dd MMMM yyyy"
                                  selected={periodIssueStart}
                                  onChange={(date) => {
                                    setPeriodIssueStart(date)
                                    formik.setFieldValue("issueStart", date)
                                  }}
                                />
                              </Col>
                              <Col md={1} className="text-center">to</Col>
                              <Col md={4}>
                                <DatePicker
                                  className="form-control"
                                  dateFormat="dd MMMM yyyy"
                                  selected={periodIssueEnd}
                                  onChange={(date) => {
                                    setPeriodIssueEnd(date)
                                    formik.setFieldValue("issueEnd", date)
                                  }}
                                />
                              </Col>
                            </>
                            
                          ) : ""}
                          </Row>
                          
                          
                        </Col>
                      </Row>

                      {/* issue departure */}
                      <Row className="form-group">
                        <Col md={3} lg={4}>
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
                            <Col md={3}>
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
                              <Col md={4}>
                                <DatePicker
                                  className="form-control"
                                  dateFormat="dd MMMM yyyy"
                                  selected={periodDepartureStart}
                                  onChange={(date) => {
                                    console.log(date)
                                    setPeriodDepartureStart(date)
                                    formik.setFieldValue("departureStart", date)
                                  }}
                                />
                              </Col>
                              <Col md={1} className="text-center">to</Col>
                              <Col md={4}>
                                <DatePicker
                                  className="form-control"
                                  dateFormat="dd MMMM yyyy"
                                  selected={periodDepartureEnd}
                                  onChange={(date) => {
                                    setPeriodDepartureEnd(date)
                                    formik.setFieldValue("departureEnd", date)
                                  }}
                                />
                              </Col>
                            </>
                          ) : ""}
                          </Row>
                        </Col>
                      </Row>
                      <FormikControl 
                        control="input"
                        label="Commission Percentage"
                        name="percent"
                        style={{ maxWidth: 250 }}
                        // isDisabled={isView}
                      />
                    </Col>
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
  )
}

export default withRouter(FlightCommisionForm)