import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
// import DatePicker from "react-datepicker"
import DatePicker from 'react-multi-date-picker'
import { DateObject } from 'react-multi-date-picker'
import InputIcon from "react-multi-date-picker/components/input_icon"
import FormInputWrapper from "components/form/input-date-period";
import FormInputDatePeriod from "components/form/input-date-period";
import { ReactSVG } from "react-svg"
import "./special-date.css"
import { Card } from "react-bootstrap"

const endpoint = "/master/agent-special-dates"
const backUrl = "/master/special-date"

function SpecialDateForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [cityData, setCityData] = useState([])
  const [repeat, setRepeat] = useState(false)

  const [initialForm, setInitialForm] = useState({
    special_date_name: "",
    start_date: new Date(),
    end_date: new Date(),
    fixed: repeat,
  })

  const validationSchema = Yup.object().shape({
    special_date_name: Yup.string().required("Special Date Name is required").min(1).max(256),
    start_date: Yup.date().required(),
    end_date: Yup.date().required(),
    fixed: Yup.boolean()
  })

  useEffect(async () => {
    let api = new Api()

    let bcTitle = "Edit Special Date"
    let docTitle = bcTitle
    if(!formId) {
      bcTitle = "Create Special Date"
      docTitle = bcTitle
    } else if(isView) {
      bcTitle = "Special Date Details"
      docTitle = bcTitle
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
            text: "Special Dates",
          },
          {
            text: bcTitle
          },
        ],
      }),
    )
  })

  function RenderDatepicker({ openCalendar, value, handleValueChange }) {
    return (
      <div className="position-relative datepicker-special-date">
        <ReactSVG src='/img/icons/date-range.svg' className="special-date-icon" />
        <input type="text"
          className="form-control" 
          onFocus={openCalendar} 
          value={value} 
          onChange={handleValueChange}
          readOnly
        />
      </div>
    )
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          
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
            isSubmitting,
            isValid,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Card>
                <Card.Body>
                  <div style={{ padding: "0 2px 2px" }}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column md={2}>
                        Special Date Name
                        <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={10}>
                        <FastField name="specialDateName">
                          {({ field, form }) => (
                            <>
                              <Form.Control
                                type="text"
                                isInvalid={
                                  form.touched.specialDateName && form.errors.specialDateName
                                }
                                minLength={1}
                                maxLength={128}
                                style={{ maxWidth: 300 }}
                                {...field}
                              />
                              {form.touched.specialDateName &&
                                form.errors.specialDateName && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.specialDateName
                                      ? form.errors.specialDateName
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </>
                          )}
                        </FastField>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column md={2}>
                        Periode
                      </Form.Label>
                      <Col sm={4}>
                        <DatePicker
                          render={<RenderDatepicker />}
                          numberOfMonths={2}
                          fixMainPosition={true}
                          format="DD MMMM YYYY"
                          minDate={new DateObject().subtract(10, "years")}
                          maxDate={new DateObject().add(10, "years")}
                          value={form.start_date}
                          onChange={(date) => setForm({...form, start_date: new Date(date)})} 
                        />
                      </Col>
                      <span className="text-center">to</span>
                      <Col sm={4}>
                        <DatePicker
                          render={<RenderDatepicker />} 
                          numberOfMonths={2}
                          fixMainPosition={true}
                          format="DD MMMM YYYY"
                          minDate={new DateObject().subtract(10, "years") && form.start_date}
                          maxDate={new DateObject().add(10, "years")}
                          value={form.end_date}
                          onChange={(date) => setForm({...form, end_date: new Date(date)})} 
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Form>
          )
        }
      </Formik>
    </>
  )
}

export default withRouter(SpecialDateForm)