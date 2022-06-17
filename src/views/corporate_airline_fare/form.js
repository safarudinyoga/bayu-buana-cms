import React, { useEffect, useState, useRef } from "react"
import { withRouter, useHistory } from "react-router"
import FormikControl from "../../components/formik/formikControl"
import { Row, Col, Tab, Nav, Card, Button } from "react-bootstrap"
import useQuery from "lib/query"
import Api from "config/api"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import "react-datepicker/dist/react-datepicker.css"

const endpoint = "/master/corporate-airline-fare"
const backUrl = "/master/corporate-airline-fare"
const options = {
  position: "bottom-right",
}

const CorporateAirlineFareForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  let api = new Api()
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)

  const [formValues, setFormValues] = useState({
    airline_id: "",
    account_code: "",
    negotiated_fare_code: "",
    start_date: "",
    end_date: ""
    // period: {
    //   start_date: null,
    //   end_date: null,
    // },
    // commission_claim_original_destination: {
    //   arrival_airport_location_code: "",
    //   arrival_city_code: "",
    //   departure_airport_location_code: "",
    //   departure_city_code: ""
    // },
    // departure_from: {},
    // arrival_at: {},
    // percent: "",
  })

  useEffect(async () => {
    let api = new Api()
    let docTitle = "Create Corporate Airline Fare"
    let breadcrumbTitle = docTitle
    if (!formId) {
      docTitle = "Edit Corporate Airline Fare"
      breadcrumbTitle = docTitle
    } else if (isView) {
      docTitle = "Corporate Airline Fare Details"
      breadcrumbTitle = docTitle
    }
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            link: backUrl,
            text: "Corporate Airline Fare",
          },
          {
            text: breadcrumbTitle,
          },
        ],
      }),
    )
  }, [])

  // useEffect(async () => {
  //   try {
  //     if (formId) {
  //       let { data } = await api.get(endpoint + "/" + formId)
  //       setFormValues({
  //         ...data,
  //         airline_id: {
  //           value: data.airline.id,
  //           label: data.airline.airline_name
  //         },
  //         commission_claim_departure_date: data.commission_claim_departure_date.start_date
  //           ? {
  //             start_date: new Date(data.commission_claim_departure_date.start_date).toDateString(),
  //             end_date: new Date(data.commission_claim_departure_date.end_date).toDateString(),
  //           }
  //           : {
  //             start_date: null,
  //             end_date: null,
  //           },
  //         commission_claim_issue_date: data.commission_claim_issue_date.start_date
  //           ? {
  //             start_date: new Date(data.commission_claim_issue_date.start_date).toDateString(),
  //             end_date: new Date(data.commission_claim_issue_date.end_date).toDateString(),
  //           }
  //           : {
  //             start_date: null,
  //             end_date: null,
  //           },
  //         departure_from: {
  //           label: data.departure_city?.city_name || data.departure_airport_location?.airport_name,
  //           value: data.commission_claim_original_destination?.departure_airport_location_code || data.commission_claim_original_destination?.departure_city_code,
  //           source: data.commission_claim_original_destination.departure_airport_location_code
  //             ? "airport"
  //             : data.commission_claim_original_destination.departure_city_code
  //               ? "city"
  //               : "",
  //         },
  //         arrival_at: {
  //           label: data.arrival_city?.city_name || data.arrival_airport_location?.airport_name,
  //           value: data.commission_claim_original_destination?.arrival_airport_location_code || data.commission_claim_original_destination?.arrival_city_code,
  //           source: data.commission_claim_original_destination.arrival_airport_location_code
  //             ? "airport"
  //             : data.commission_claim_original_destination.arrival_city_code
  //               ? "city"
  //               : "",
  //         }
  //       })
  //       setSpecifyPeriodDeparture(data.commission_claim_departure_date.start_date)
  //       setSpecifyPeriodIssue(data.commission_claim_issue_date.start_date)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  // useEffect(async () => {
  //   const options = []
  //   try {
  //     let resAirport = await api.get(`/master/airports?size=-1&page=0&filter=["status", "=", 1]`)
  //     let resCity = await api.get(`/master/cities?size=-1&page=0&filter=["status", "=", 1]`)
  //     resAirport.data.items.forEach((data) => {
  //       options.push({
  //         label: data.airport_name,
  //         value: data.airport_code,
  //         source: "airport",
  //       })
  //     })
  //     resCity.data.items.forEach((data) => {
  //       options.push({
  //         label: data.city_name,
  //         value: data.city_code,
  //         source: "city",
  //       })
  //     })
  //   } catch (e) {
  //     console.log("Error", e)

  //   }
  //   setOptionRoute(options)
  // }, [])
  Yup.addMethod(Yup.object, 'optionalFields', function (message) {
    return this.test('unique', message, function (field, ctx) {
      const parent = ctx.parent
      // console.log('this pa', parent.negotiated_fare_code.value)
      if (parent?.negotiated_fare_code || parent?.account_code) {
        return parent?.negotiated_fare_code || parent?.account_code
      } else {
        return true
      }
    })
  })

  const validationSchema = Yup.object().shape({
    airline_id: Yup.object().required("Airline is required"),
    negotiated_fare_code: Yup.object().required("Negotiated Fare Code is required"),
    account_code: Yup.object().required("Account Code is required"),
    // negotiated_fare_code: Yup.object().optionalFields('Negotiated Fare Code is required').nullable(),
    // account_code: Yup.object().optionalFields('Account Code is required').nullable(),
    start_date: Yup.object().required("Start Date is required"),
    end_date: Yup.object().required("End Date is required"),
  })

  return (
    <div style={{ paddingBottom: 80 }}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log('values submit', values)
            // let formatted = {
            //   airline_id: values.airline_id.value,
            //   commission_claim_original_destination: {
            //     departure_airport_location_code: values.departure_from && values.departure_from?.source === 'airport' ? values.departure_from.value : null,
            //     arrival_airport_location_code: values.arrival_at && values.arrival_at?.source === 'airport' ? values.arrival_at.value : null,

            //     departure_city_code: values.departure_from && values.departure_from?.source === 'city' ? values.departure_from.value : null,
            //     arrival_city_code: values.arrival_at && values.arrival_at?.source === 'city' ? values.arrival_at.value : null,
            //   },
            //   commission_claim_departure_date: !specifyPeriodDeparture ? {} : {
            //     start_date: values.commission_claim_departure_date.start_date ? new Date(values.commission_claim_departure_date.start_date) : [],
            //     end_date: values.commission_claim_departure_date.end_date ? new Date(values.commission_claim_departure_date.end_date) : [],
            //   },
            //   commission_claim_issue_date: !specifyPeriodIssue ? {} : {
            //     start_date: values.commission_claim_issue_date.start_date ? new Date(values.commission_claim_issue_date.start_date) : [],
            //     end_date: values.commission_claim_issue_date.end_date ? new Date(values.commission_claim_issue_date.end_date) : [],
            //   },
            //   percent: parseFloat(values.percent)
            // }

            // let res = await api.putOrPost("master/commission-claims", formId, formatted)
            // openSnackbar(`Record '${values.airline_id.label}' has been successfully saved.`)
            // props.history.goBack()
          } catch (e) {
            console.log(e)
          }
        }}
      >
        {(formik) => {
          // { console.log('data formik', formik) }
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
                          size={{
                            label: { md: 3, lg: 3 },
                            value: { md: 4, lg: 3 }
                          }}
                        // isDisabled={loading || isView}
                        />

                        {/* account code */}
                        <FormikControl
                          control="input"
                          label="Account Code"
                          name="account_code"
                          // isDisabled={isView}
                          size={{
                            label: { md: 3, lg: 3 },
                            value: { md: 4, lg: 3 }
                          }}
                        />

                        {/* negotiated fare code */}
                        <FormikControl
                          control="input"
                          label="Negotiated Fare Code"
                          name="negotiated_fare_code"
                          // isDisabled={isView}
                          size={{
                            label: { md: 3, lg: 3 },
                            value: { md: 4, lg: 3 }
                          }}
                        />

                        <Row className="form-group">
                          <Col md={3} lg={3}>
                            <label className="text-label-input" htmlFor={"issue-period"}>
                              Period
                              <span className={""} />
                            </label>
                          </Col>
                          <Col md={9} lg={8}>
                            <FormikControl
                              control="dateRange"
                              label="Negotiated Fare Code"
                              name={['start_date', 'end_date']}
                              value={[formik.values.start_date, formik.values.end_date]}
                              isDisabled={isView}
                              onChange={(date) => {
                                { console.log('on change date', date) }
                                if (date.length > 0) {
                                  formik.setFieldValue("start_date", date[0])
                                  formik.setFieldValue("end_date", date[1])
                                } else {
                                  formik.setFieldValue("start_date", null)
                                  formik.setFieldValue("end_date", null)
                                }
                              }}
                            // size={{
                            //   label: { md: 3, lg: 3 },
                            //   value: { md: 4, lg: 3 }
                            // }}
                            />
                          </Col>
                        </Row>
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
    </div>
  )
}

export default withRouter(CorporateAirlineFareForm)