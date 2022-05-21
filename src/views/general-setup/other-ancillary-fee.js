import { Formik } from "formik"
import React from "react"
// import FormHorizontal from "components/form/horizontal"
import { Card, Form, Row, Col, Button, Image, Container } from "react-bootstrap"
import Api from "config/api"

const OtherAncillaryFee = (props) => {
  let api = new Api()

  return (
    <>
      {/* <Formik
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)

        let res = await api.put("user/profile", formatted)

        return props.handleSelectTab("subscriptions")
      }}
    > */}
      {/* {({
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
      }) => {
        return ( */}
      <Form onSubmit="">
        <Card>
          <Card.Body>
            <h3 className="card-heading">Other Ancillary Fee</h3>
            <div style={{ padding: "0 15px 15px" }}>
              <Row>
                <Form.Label>
                  MDR Fee
                  <span className="form-label-required">*</span>
                </Form.Label>
              </Row>
              <Form.Group className="ml-5">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Check type="radio" label="Fixed Amount" />
                    </Form.Group>
                    <Row className="ml-3">
                      <Col sm={12} md={3}>
                        <Form.Group as={Row} className="mb-xs-3">
                          <Form.Label
                            column
                            xs={2}
                            md={3}
                            lg={5}
                            className="ml-xs-4"
                          >
                            IDR
                          </Form.Label>
                          <Col xs={10} md={9} lg={7}>
                            <Form.Control style={{ maxWidth: "220px" }} />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={6}>
                        <Form.Group className="mt-2">
                          <Form.Label>/Transaction</Form.Label>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Check type="radio" label="Percentage" />
                    </Form.Group>
                    <Row className="ml-3">
                      <Col sm={12} md={4}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Control
                            style={{ maxWidth: "80px" }}
                            className="mx-3"
                          />
                          <span className="text-lg mt-1">%</span>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={8}>
                        <Form.Check
                          type="checkbox"
                          label="Include Taxes"
                          className="mt-2"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form.Group>
              <h3 className="card-heading"></h3>
              <Row>
                <Form.Label>
                  Late Payment
                  <span className="form-label-required">*</span>
                </Form.Label>
              </Row>
              <Form.Group className="ml-5">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Check type="radio" label="Fixed Amount" />
                    </Form.Group>
                    <Row className="ml-3">
                      <Col sm={12} md={3}>
                        <Form.Group as={Row} className="mb-xs-3">
                          <Form.Label
                            column
                            xs={2}
                            md={3}
                            lg={5}
                            className="ml-xs-4"
                          >
                            IDR
                          </Form.Label>
                          <Col xs={10} md={9} lg={7}>
                            <Form.Control style={{ maxWidth: "220px" }} />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={6}>
                        <Form.Group className="mt-2">
                          <Form.Label>/Transaction</Form.Label>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Check type="radio" label="Percentage" />
                    </Form.Group>
                    <Row className="ml-3">
                      <Col sm={12} md={4}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Control
                            style={{ maxWidth: "80px" }}
                            className="mx-3"
                          />
                          <span className="text-lg mt-1">%</span>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={8}>
                        <Form.Check
                          type="checkbox"
                          label="Include Taxes"
                          className="mt-2"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form.Group>
            </div>
          </Card.Body>
        </Card>
        <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
          <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
            SAVE & NEXT
          </Button>
          <Button
            variant="secondary"
            onClick={() => props.history.push(props.backUrl)}
          >
            CANCEL
          </Button>
        </div>
      </Form>

      {/* }} */}
      {/* </Formik> */}
    </>
  )
}

export default OtherAncillaryFee
