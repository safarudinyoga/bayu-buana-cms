import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Select from "react-select"
import { useFormik } from "formik"
import * as Yup from "yup"

import Api from "config/api"

const Employment = () => {
  const [selectCountry, setSelectCountry] = useState([])

  let api = new Api()

  const { handleSubmit, errors, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      employmentId: "",
      jobTitle: "",
      npwp: "",
    },
    validationSchema: Yup.object({
      employmentId: Yup.string().required("Employee Number is required."),
      npwp: Yup.string(),
    }),
    onSubmit: () => {
      console.log("submit")
    },
  })

  useEffect(async () => {
    try {
      let res = await api.get("/master/countries")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.country_name,
          value: data.id,
        })
        setSelectCountry(options)
      })
    } catch (e) {}
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Employment</h3>
          <div style={{ padding: "0 15px 15px" }}>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Employee ID <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  className={
                    touched.employmentId && Boolean(errors.employmentId)
                      ? "is-invalid"
                      : ""
                  }
                  maxLength={36}
                />
                {touched.employmentId && Boolean(errors.employmentId) && (
                  <div class="invalid-feedback">
                    {touched.employmentId ? errors.employmentId : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Job Title <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={10}>
                <div style={{ width: 300 }}>
                  <Select
                    placeholder="Please choose"
                    className={`react-select ${
                      touched.jobTitle && Boolean(errors.jobTitle)
                        ? "is-invalid"
                        : ""
                    }`}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
                {touched.jobTitle && Boolean(errors.jobTitle) && (
                  <div class="invalid-feedback">
                    {touched.jobTitle ? errors.jobTitle : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Division
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
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                Branch Office
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
            </Form.Group>
            <Form.Group as={Row} className="form-group">
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
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={2}>
                NPWP
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  className={
                    touched.npwp && Boolean(errors.npwp) ? "is-invalid" : ""
                  }
                  maxLength={36}
                />
                {touched.npwp && Boolean(errors.npwp) && (
                  <div class="invalid-feedback">
                    {touched.npwp ? errors.npwp : ""}
                  </div>
                )}
              </Col>
            </Form.Group>
          </div>
        </Card.Body>
      </Card>
      <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
        <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
          SAVE & NEXT
        </Button>
        <Button variant="secondary">CANCEL</Button>
      </div>
    </Form>
  )
}

export default Employment
