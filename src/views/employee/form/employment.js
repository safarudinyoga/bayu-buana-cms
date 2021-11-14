import React, { useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Select from "react-select"
import { Formik } from "formik"
import * as Yup from "yup"
import { useDebouncedCallback } from "use-debounce"
import { useToggleState } from "use-toggle-state"

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
    // hiringDate: "",
    npwp: "",
    additionalJobTitle: "",
    additionalDivision: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required("Employee Number is required."),
    jobTitle: Yup.object().required("Job Title is required."),
    division: Yup.string(),
    branchOffice: Yup.string(),
    // hiringDate: Yup.string(),
    npwp: Yup.string(),
    additionalJobTitle: Yup.object().required("Job Title is required."),
    additionalDivision: Yup.string(),
  })

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
                      <Form.Label column sm={2}>
                        Employee ID{" "}
                        <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={10}>
                        <div style={{ maxWidth: 250 }}>
                          <Form.Control
                            name="employeeId"
                            type="text"
                            value={values.employeeId}
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
                      <Form.Label column sm={2}>
                        Job Title <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col sm={10}>
                        <div style={{ width: 300 }}>
                          <Select
                            name="jobTitle"
                            options={selectJobTitle}
                            placeholder="Please choose"
                            className={`react-select ${
                              touched.jobTitle && errors.jobTitle
                                ? "is-invalid"
                                : null
                            }`}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            onChange={(e) => {
                              handleChange(e)
                              setFieldValue("jobTitle", e)
                            }}
                            onBlur={handleBlur}
                          />
                          {touched.jobTitle && errors.jobTitle && (
                            <Form.Control.Feedback type="invalid">
                              {touched.jobTitle ? errors.jobTitle : null}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={2}>
                        Division
                      </Form.Label>
                      <Col sm={10}>
                        <div style={{ width: 300 }}>
                          <Select
                            name="division"
                            options={selectDivision}
                            placeholder="Please choose"
                            className="react-select"
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            onChange={(e) => {
                              handleChange(e)
                              setFieldValue("division", e)
                            }}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={2}>
                        Branch Office
                      </Form.Label>
                      <Col sm={10}>
                        <div style={{ width: 300 }}>
                          <Select
                            name="branchOffice"
                            options={selectBranchOffice}
                            placeholder="Please choose"
                            className="react-select"
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            onChange={(e) => {
                              handleChange(e)
                              setFieldValue("branchOffice", e)
                            }}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={2}>
                        Hiring Date
                      </Form.Label>
                      <Col sm={10}>
                        <div style={{ width: 300 }}>
                          <Select
                            options={[
                              { value: "mr", label: "Mr." },
                              { value: "mrs", label: "Mrs." },
                            ]}
                            placeholder="Please choose"
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </div>
                      </Col>
                    </Form.Group> */}
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={2}>
                        NPWP
                      </Form.Label>
                      <Col sm={10}>
                        <div style={{ maxWidth: 250 }}>
                          <Form.Control
                            name="npwp"
                            type="text"
                            value={values.npwp}
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
                            padding: "0 20px",
                          }}
                        >
                          <Form.Group as={Row} className="form-group">
                            <Form.Label column sm={5}>
                              Job Title{" "}
                              <span className="form-label-required">*</span>
                            </Form.Label>
                            <Col sm={7}>
                              <div style={{ width: 300 }}>
                                <Select
                                  name="additionalJobTitle"
                                  options={selectJobTitle}
                                  placeholder="Please choose"
                                  className={`react-select ${
                                    touched.additionalJobTitle &&
                                    errors.additionalJobTitle
                                      ? "is-invalid"
                                      : null
                                  }`}
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                  onChange={(e) => {
                                    handleChange(e)
                                    setFieldValue("additionalJobTitle", e)
                                  }}
                                  onBlur={handleBlur}
                                />
                                {touched.additionalJobTitle &&
                                  errors.additionalJobTitle && (
                                    <Form.Control.Feedback type="invalid">
                                      {touched.additionalJobTitle
                                        ? errors.additionalJobTitle
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="form-group">
                            <Form.Label column sm={5}>
                              Division
                            </Form.Label>
                            <Col sm={7}>
                              <div style={{ width: 300 }}>
                                <Select
                                  name="additionalDivision"
                                  options={selectDivision}
                                  placeholder="Please choose"
                                  className="react-select"
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                  onChange={(e) => {
                                    handleChange(e)
                                    setFieldValue("additionalDivision", e)
                                  }}
                                  onBlur={handleBlur}
                                />
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
