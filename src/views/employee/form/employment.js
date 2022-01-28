import React, { useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Select from "react-select"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { useDebouncedCallback } from "use-debounce"
import { useToggleState } from "use-toggle-state"
import { default as SelectAsync } from "components/form/select-async"

import Api from "config/api"

const Employment = (props) => {
  const { selectJobTitle, selectDivision, selectBranchOffice } = props

  const [checkEmployeeId, setCheckEmployeeId] = useState(false)
  const [additionalRole, setAdditionalRole] = useToggleState(false)

  let api = new Api()

  // Initialize form
  const initialForm = {
    employeeId: "",
    jobTitle: "",
    division: "",
    branchOffice: "",
    hiringDate: "",
    npwp: "",
    additionalJobTitle: "",
    additionalDivision: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required("Employee Number is required."),
    jobTitle: Yup.object().required("Job Title is required."),
    division: Yup.object(),
    branchOffice: Yup.object(),
    hiringDate: Yup.string(),
    npwp: Yup.string(),
    additionalJobTitle: Yup.object().required("Job Title is required."),
    additionalDivision: Yup.object(),
  })

  const selectDay = () => {
    const options = []
    for (let i = 0; i <= 31; i++) {
      options.push({
        label: i,
        value: i,
      })
    }
    return options
  }
  const selectMonth = () => {
    const options = []
    const month = Array.from({ length: 12 }, (e, i) => {
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

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values)
          // setSubmitting(true)

          // try {
          //   let res = await api.post("master/employees", {
          //     division_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     employee_number: "string",
          //     hire_date: "2021-11-14T01:32:53.237Z",
          //     job_title_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     office_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     person_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     user_account_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //   })
          //   console.log(res)
          //   resetForm()
          //   setSubmitting(false)
          // } catch (e) {}
        }}
      >
        {function ShowForm({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) {
          const searchEmployeeId = useDebouncedCallback(
            async (text) => {
              try {
                let res = await api.get(`/master/agent-employees/${text}`)
                setCheckEmployeeId(true)
                setFieldValue("employeeId", "")
              } catch (e) {
                setCheckEmployeeId(false)
                setFieldValue("employeeId", text)
              }
            },
            // delay in ms
            1000,
          )
          return (
            <Form onSubmit={handleSubmit}>
              <Card>
                <Card.Body>
                  <h3 className="card-heading">Employment</h3>
                  <div style={{ padding: "0 15px 15px" }}>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={3}>
                        Employee ID{" "}
                        <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={9}>
                        <div style={{ maxWidth: 250 }}>
                          <Form.Control
                            name="employeeId"
                            type="text"
                            value={values.employeeId}
                            minLength={1}
                            maxLength={36}
                            isInvalid={
                              checkEmployeeId ||
                              (touched.employeeId && errors.employeeId)
                            }
                            onChange={(e) => {
                              handleChange(e)
                              searchEmployeeId(e.target.value)
                            }}
                            onBlur={handleBlur}
                          />
                          {(checkEmployeeId ||
                            (touched.employeeId && errors.employeeId)) && (
                            <Form.Control.Feedback type="invalid">
                              {checkEmployeeId
                                ? "Employee Number already exists"
                                : touched.employeeId
                                ? errors.employeeId
                                : null}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={3}>
                        Job Title <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={9}>
                        <Field name="jobTitle">
                          {({ field, form }) => (
                            <div style={{ width: 300 }}>
                              <SelectAsync
                                {...field}
                                url={`master/job-titles`}
                                fieldName="job_title_name"
                                onChange={(v) => {
                                  setFieldValue("jobTitle", v)
                                }}
                                placeholder="Please choose"
                                className={`react-select ${
                                  form.touched.jobTitle && form.errors.jobTitle
                                    ? "is-invalid"
                                    : null
                                }`}
                              />
                              {form.touched.jobTitle &&
                                form.errors.jobTitle && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.jobTitle
                                      ? form.errors.jobTitle
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={3}>
                        Division
                      </Form.Label>
                      <Col sm={9}>
                        <div style={{ width: 300 }}>
                          <Field name="division">
                            {({ field, form }) => (
                              <div style={{ width: 300 }}>
                                <SelectAsync
                                  {...field}
                                  url={`master/divisions`}
                                  fieldName="division_name"
                                  onChange={(v) => {
                                    setFieldValue("division", v)
                                  }}
                                  placeholder="Please choose"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={3}>
                        Branch Office
                      </Form.Label>
                      <Col sm={9}>
                        <div style={{ width: 300 }}>
                          <Field name="branchOffice">
                            {({ field, form }) => (
                              <div style={{ width: 300 }}>
                                <SelectAsync
                                  {...field}
                                  url={`master/offices`}
                                  fieldName="office_name"
                                  onChange={(v) => {
                                    setFieldValue("branchOffice", v)
                                  }}
                                  placeholder="Please choose"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={3}>
                        Hiring Date
                      </Form.Label>
                      <Col sm={9}>
                        <div style={{ width: 300, display: "flex" }}>
                          <div style={{ marginRight: 12 }}>
                            <Select
                              options={selectDay()}
                              className="react-select"
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              style={{ marginRight: 12 }}
                            />
                          </div>
                          <div style={{ marginRight: 12 }}>
                            <Select
                              options={selectMonth()}
                              className="react-select"
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              style={{ marginRight: 12 }}
                            />
                          </div>
                          <div>
                            <Select
                              options={selectYear()}
                              className="react-select"
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              style={{ marginRight: 12 }}
                            />
                          </div>
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={3}>
                        NPWP
                      </Form.Label>
                      <Col sm={9}>
                        <div style={{ maxWidth: 250 }}>
                          <Form.Control
                            name="npwp"
                            type="text"
                            value={values.npwp}
                            minLength={1}
                            maxLength={36}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Col>
                    </Form.Group>
                    {additionalRole && (
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={12}>
                          Additional Role
                        </Form.Label>
                        <div
                          style={{
                            padding: "0 0 0 35px",
                          }}
                        >
                          <Form.Group as={Row} className="form-group">
                            <Form.Label column sm={6}>
                              Job Title{" "}
                              <span className="form-label-required">*</span>
                            </Form.Label>
                            <Col sm={6}>
                              <Field name="additionalJobTitle">
                                {({ field, form }) => (
                                  <div style={{ width: 300 }}>
                                    <SelectAsync
                                      {...field}
                                      url={`master/job-titles`}
                                      fieldName="job_title_name"
                                      onChange={(v) => {
                                        setFieldValue("additionalJobTitle", v)
                                      }}
                                      placeholder="Please choose"
                                      className={`react-select ${
                                        form.touched.additionalJobTitle &&
                                        form.errors.additionalJobTitle
                                          ? "is-invalid"
                                          : null
                                      }`}
                                    />
                                    {form.touched.additionalJobTitle &&
                                      form.errors.additionalJobTitle && (
                                        <Form.Control.Feedback type="invalid">
                                          {form.touched.additionalJobTitle
                                            ? form.errors.additionalJobTitle
                                            : null}
                                        </Form.Control.Feedback>
                                      )}
                                  </div>
                                )}
                              </Field>
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="form-group">
                            <Form.Label column sm={6}>
                              Division
                            </Form.Label>
                            <Col sm={6}>
                              <div style={{ width: 300 }}>
                                <Field name="additionalDivision">
                                  {({ field, form }) => (
                                    <div style={{ width: 300 }}>
                                      <SelectAsync
                                        {...field}
                                        url={`master/divisions`}
                                        fieldName="division_name"
                                        onChange={(v) => {
                                          setFieldValue("additionalDivision", v)
                                        }}
                                        placeholder="Please choose"
                                      />
                                    </div>
                                  )}
                                </Field>
                              </div>
                            </Col>
                          </Form.Group>
                        </div>
                      </Form.Group>
                    )}
                    <Form.Group
                      as={Row}
                      className="form-group"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <div
                        onClick={() => setAdditionalRole()}
                        style={{
                          color: "#1743BE",
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        Add Additional Role
                      </div>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
              <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!dirty}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => props.history.push(props.backUrl)}
                >
                  CANCEL
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default Employment
