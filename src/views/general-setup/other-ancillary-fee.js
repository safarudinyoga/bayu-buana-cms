import { Formik } from 'formik';
import React from 'react';
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
                    <Col sm={9}>
                      <Form.Group as={Row} className="form-group">
                      <div style={{ padding: "0 0 15px 15px" }}>
                        <Form.Label column sm={8}>
                          MDR Fee <span className="form-label-required">*</span>
                        </Form.Label>
                        {/* <div style={{ padding: "0 15px 15px" }}> */}
                          <Container>
                          <Row>
                            <Col sm={3}>
                              <Form.Check 
                              type="radio"
                              label="Fixed Amount"
                              inline
                            />
                            <Col>
                              {/* <Row> */}
                              <Form.Label>
                                IDR
                              </Form.Label>
                              <Form.Control
                                name="fixed-amount"
                                type="text"
                              >
                              </Form.Control>
                                /Transaction
                              {/* </Row> */}
                             
                            </Col>
                              
                            </Col>
                            <Col style={{ paddingLeft: "400px" }}>
                              <Form.Check 
                              type="radio"
                              label="Percentage"
                              inline
                           
                              />
                              <Form.Control
                                name="percentage"
                                type="text"
                              >
                              </Form.Control>
                              %
                              <Form.Check
                                label="Includes Tax"
                              >

                              </Form.Check>
                            </Col>
                          
                          </Row>
                            
                          </Container>

                        <hr style={{ width: "130%" }}></hr>
                        <Form.Label column sm={8}>
                          Late Payment <span className="form-label-required">*</span>
                        </Form.Label>
                        <Container>
                          <Row>
                            <Col>
                              <Form.Check 
                              type="radio"
                              label="Fixed Amount"
                              inline
                            />
                            {/* <Col> */}
                              <Col>
                              <Form.Label>
                                IDR
                              </Form.Label>
                              <Form.Control
                                name="fixed-amount"
                                type="text"
                              >
                              </Form.Control>
                                /Transaction
                            </Col>
                              
                            </Col>
                            <Col style={{ paddingLeft: "400px" }}>
                              <Form.Check 
                              type="radio"
                              label="Percentage"
                              inline
                           
                              />
                              <Form.Control
                                name="percentage"
                                type="text"
                              >
                              </Form.Control>
                              %
                              <Form.Check
                                label="Includes Tax"
                              >

                              </Form.Check>
                            </Col>
                          
                          </Row>
                            
                          </Container>
                        
                        </div>
                       
                        {/* </div> */}
                      </Form.Group>
                    </Col>
                </Row>
                </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 15 }}
              >
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

export default OtherAncillaryFee;