// import { Formik } from 'formik';
import React, { useState } from "react"
import { Card, Form, Row, Col, ListGroup, Button, Image } from "react-bootstrap"
import Api from "config/api"
import downIcon from "assets/icons/double-down.svg"
import upIcon from "assets/icons/double-up.svg"
import arrowLeft from "assets/icons/arrow-left.svg"
import arrowRight from "assets/icons/arrow-right.svg"
import xCircle from "assets/icons/x-circle.svg"
import CancelButton from "components/button/cancel"
import "./style.css"

const OverCreditApproverAssignment = (props) => {
  let api = new Api()
  const [showFilter, setShowFilter] = useState(false)

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
            <h3 className="card-heading">Over Credit Approver Assignment</h3>
            <div style={{ padding: "0 15px 40px 0" }}>
              <Row>
                <Col lg={5}>
                  <Card>
                    <Card.Header
                      className="text-uppercase"
                      style={{
                        backgroundColor: "#027F71",
                        color: "#FFFFFF",
                        padding: "9px 9px 10px",
                        fontSize: "15px",
                      }}
                    >
                      LIST OF OVER CREDIT APPROVERS
                    </Card.Header>
                    <Card.Body style={{ padding: "8px 10px 10px 9px" }}>
                      <ol class="list list-general-setup">
                        <li>
                          <div className="w-100 d-flex justify-content-between">
                            Tiffany Young (BCD)
                            <span className="btn-x-circle">
                              <img src={xCircle} alt="right" />
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="w-100 d-flex justify-content-between">
                            Dhani Doel (BCD)
                            <span className="btn-x-circle">
                              <img src={xCircle} alt="right" />
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="w-100 d-flex justify-content-between">
                            Jhon Bill (NCD)
                            <span className="btn-x-circle">
                              <img src={xCircle} alt="right" />
                            </span>
                          </div>
                        </li>
                      </ol>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  lg={2}
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <button type="button" className="btn-add text-uppercase">
                    <div className="d-flex justify-content-around">
                      <img src={arrowLeft} alt="left" />
                      ADD
                    </div>
                  </button>
                  <button type="button" className="btn-remove text-uppercase">
                    <div className="d-flex justify-content-around">
                      REMOVE <img src={arrowRight} alt="right" />
                    </div>
                  </button>
                </Col>
                <Col lg={5}>
                  <Card>
                    <Card.Header
                      className="text-uppercase"
                      style={{
                        backgroundColor: "#027F71",
                        color: "#FFFFFF",
                        padding: "9px 9px 10px",
                        fontSize: "15px",
                      }}
                    >
                      EMPLOYEE NAME
                    </Card.Header>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-5 col-xl-5 padding-0 align-middle">
                      <button
                        onClick={() => setShowFilter(!showFilter)}
                        type="button"
                        className="btn btn-link advanced-options-btn float-right float-md-left"
                      >
                        <span className="mr-2">Advanced Options</span>{" "}
                        {showFilter ? (
                          <img src={upIcon} alt="up" />
                        ) : (
                          <img src={downIcon} alt="down" />
                        )}
                      </button>
                    </div>
                    <Card.Body style={{ padding: "8px 10px 10px 9px" }}>
                      <ol class="list list-general-setup">
                        <li>
                          <div className="d-flex align-items-center">
                            <svg
                              class="float-left row-handle nopadding"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                            >
                              <rect
                                id="backgroundrect"
                                width="100%"
                                height="100%"
                                x="0"
                                y="0"
                                fill="none"
                                stroke="none"
                              />
                              <path
                                d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_1"
                                class=""
                              />
                              <path
                                d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_2"
                                class=""
                              />
                            </svg>
                            <div className="w-100 d-flex justify-content-between">
                              Tamara Ling <span>(NDC)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <svg
                              class="float-left row-handle nopadding"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                            >
                              <rect
                                id="backgroundrect"
                                width="100%"
                                height="100%"
                                x="0"
                                y="0"
                                fill="none"
                                stroke="none"
                              />
                              <path
                                d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_1"
                                class=""
                              />
                              <path
                                d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_2"
                                class=""
                              />
                            </svg>
                            <div className="w-100 d-flex justify-content-between">
                              Tamara Ling <span>(NDC)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <svg
                              class="float-left row-handle nopadding"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                            >
                              <rect
                                id="backgroundrect"
                                width="100%"
                                height="100%"
                                x="0"
                                y="0"
                                fill="none"
                                stroke="none"
                              />
                              <path
                                d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_1"
                                class=""
                              />
                              <path
                                d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_2"
                                class=""
                              />
                            </svg>
                            <div className="w-100 d-flex justify-content-between">
                              Tamara Ling <span>(NDC)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <svg
                              class="float-left row-handle nopadding"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                            >
                              <rect
                                id="backgroundrect"
                                width="100%"
                                height="100%"
                                x="0"
                                y="0"
                                fill="none"
                                stroke="none"
                              />
                              <path
                                d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_1"
                                class=""
                              />
                              <path
                                d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_2"
                                class=""
                              />
                            </svg>
                            <div className="w-100 d-flex justify-content-between">
                              Tamara Ling <span>(NDC)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <svg
                              class="float-left row-handle nopadding"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                            >
                              <rect
                                id="backgroundrect"
                                width="100%"
                                height="100%"
                                x="0"
                                y="0"
                                fill="none"
                                stroke="none"
                              />
                              <path
                                d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_1"
                                class=""
                              />
                              <path
                                d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_2"
                                class=""
                              />
                            </svg>
                            <div className="w-100 d-flex justify-content-between">
                              Tamara Ling <span>(NDC)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <svg
                              class="float-left row-handle nopadding"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                            >
                              <rect
                                id="backgroundrect"
                                width="100%"
                                height="100%"
                                x="0"
                                y="0"
                                fill="none"
                                stroke="none"
                              />
                              <path
                                d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_1"
                                class=""
                              />
                              <path
                                d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z"
                                fill="#707070"
                                id="svg_2"
                                class=""
                              />
                            </svg>
                            <div className="w-100 d-flex justify-content-between">
                              Tamara Ling <span>(NDC)</span>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
        <div
          style={{
            marginBottom: 30,
            marginTop: 30,
            display: "flex",
          }}
        >
          <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
            SAVE & NEXT
          </Button>
          <CancelButton />
        </div>
      </Form>

      {/* }} */}
      {/* </Formik> */}
    </>
  )
}

export default OverCreditApproverAssignment
