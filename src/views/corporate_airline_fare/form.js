import React, { useEffect, useState, useRef } from "react"
import { withRouter, useHistory } from "react-router"
import FormikControl from "../../components/formik/formikControl"
import { Row, Col, Card, Button } from "react-bootstrap"
import useQuery from "lib/query"
import Api from "config/api"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import "react-datepicker/dist/react-datepicker.css"
import { useSnackbar } from "react-simple-snackbar"

const endpoint = "/master/corporate-airline-fares"
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
  const [openSnackbar, closeSnackbar] = useSnackbar({
    position: "bottom-right",
  })

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

  useEffect(async () => {
    try {
      if (formId) {
        let { data } = await api.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          airline_id: {
            value: data.airline.id,
            label: data.airline.airline_name
          },

        })
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
    negotiated_fare_code: Yup.string().required("Negotiated Fare Code is required"),
    account_code: Yup.string().required("Account Code is required"),
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
            let formatted = {
              airline_id: values.airline_id.value,
              account_code: values.account_code,
              negotiated_fare_code: values.negotiated_fare_code,
              effective_date: values.start_date ? new Date(values.start_date) : null,
              expire_date: values.end_date ? new Date(values.end_date) : null,
              corporate_id: 'f43826d5-95e6-4044-a65f-e26a03ad9ff9'
            }
            let res = await api.putOrPost(endpoint, formId, formatted)
            console.log('response', res)
            // openSnackbar(`Record '${values.airline_id.label}' has been successfully saved.`)
            // props.history.goBack()
          } catch (e) {
            console.log('okee', e)
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
                          isDisabled={loading || isView}
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
                          isDisabled={loading || isView}
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
                              isDisabled={loading || isView}
                              onChange={(date) => {
                                // { console.log('on change date', date) }
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