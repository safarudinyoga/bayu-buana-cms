import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, ListGroup, Button, Image } from "react-bootstrap"
import downIcon from "assets/icons/double-down.svg"
import upIcon from "assets/icons/double-up.svg"
import arrowLeft from "assets/icons/arrow-left.svg"
import arrowRight from "assets/icons/arrow-right.svg"
import xCircle from "assets/icons/x-circle.svg"
import flightTicket from "assets/icons/flight-ticket.svg"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormikControl from "components/formik/formikControl"
import "./add-or-remove-list.css"
import { FieldArray, Field } from "formik"

const AddOrRemoveList = ({
  firstData,
  secondData,
  firstCardTitle,
  secondCardTitle,
  canRemoveIndex,
  onModal,
  setFormValues,
}) => {
  const [showFilter, setShowFilter] = useState(false)
  const [leftData, setLeftData] = useState(firstData)
  const [rightData, setRightData] = useState(secondData)
  const [triger, setTriger] = useState(true)

  // console.log("secondData: ", secondData)
  // console.log("leftData: ", leftData)

  useEffect(async () => {
    if (triger) {
      setLeftData(firstData)
      setRightData(secondData)
    }
  }, [firstData, secondData])

  const handleButtonAdd = () => {
    setTriger(false)
    setLeftData((leftdata) => [...leftdata, ...rightData])
    setRightData((rightdata) => [])
    setFormValues((formValues) => [
      ...leftData.map((item) => ({
        agent_id: item.agent_employee.agent_id,
        employee_id: item.employee_id,
      })),
      ...rightData.map((item) => ({
        agent_id: item.agent_employee.agent_id,
        employee_id: item.employee_id,
      })),
    ])
  }

  const handleButtonRemove = () => {
    setTriger(false)
    setLeftData((leftdata) => [])
    setRightData((rightdata) => [...rightdata, ...leftData])
    setFormValues((formValues) => [])
  }

  const handleRemoveIndexArray = (e) => {
    const newData = leftData.filter((item) => item !== e)
    setLeftData((leftdata) => newData)
    setRightData((rightdata) => [...rightdata, e])
  }

  const handleSelectAssignmentLeader = (e) => {
    console.log("e: ", e)
    setFormValues((data) =>
      data.map((item) => ({
        ...item,
        can_issue_ticket:
          item.employee_id === e
            ? !item.can_issue_ticket
            : item.can_issue_ticket,
      })),
    )
  }

  return (
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
            {firstCardTitle}
          </Card.Header>
          <Card.Body style={{ padding: "8px 10px 10px 9px" }}>
            <ol class="list list-general-setup">
              {leftData.map((item, i) => (
                <li
                  className={canRemoveIndex ? "item-general-setup" : ""}
                  key={i}
                >
                  {canRemoveIndex ? (
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      {item.given_name} {item.middle_name} {item.surname} (
                      {item?.office?.office_name})
                      <FieldArray
                        name="employee"
                        render={(arr) => (
                          <div className="d-flex">
                            <FormikControl
                              control="input"
                              name={`employee[${i}].agent_id`}
                              type="hidden"
                              value={item.agent_employee.agent_id}
                            />
                            <FormikControl
                              control="input"
                              name={`employee[${i}].employee_id`}
                              type="hidden"
                              value={item.employee_id}
                            />
                          </div>
                        )}
                      />
                      <span
                        className="btn-x-circle"
                        onClick={() => handleRemoveIndexArray(item)}
                      >
                        <img src={xCircle} alt="right" />
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          backgroundColor: item.can_issue_ticket
                            ? "#027F71"
                            : "#D3D3D3",
                          padding: "2px 10px 2px",
                        }}
                      >
                        <label className="label-flight-ticket">
                          <Field
                            type="checkbox"
                            name="can_issue_ticket"
                            onChange={() =>
                              handleSelectAssignmentLeader(item.employee_id)
                            }
                            className="add-remove-cb"
                          />
                          <img src={flightTicket} alt="flight-ticket" />
                        </label>
                      </div>
                      {onModal && (
                        <div
                          style={{
                            backgroundColor: item.checked
                              ? "#027F71"
                              : "#D3D3D3",
                            padding: "2px 10px 2px",
                            marginLeft: "2px",
                          }}
                        >
                          <label className="label-flight-ticket">
                            <Field
                              type="checkbox"
                              name="check"
                              onChange={() =>
                                handleSelectAssignmentLeader(item.employee_id)
                              }
                              className="add-remove-cb"
                            />
                            <img src={flightTicket} alt="flight-ticket" />
                          </label>
                        </div>
                      )}
                      <div
                        className="w-100 d-flex justify-content-between align-items-center"
                        style={{ paddingLeft: 13, paddingRight: 15 }}
                      >
                        {item.given_name} {item.middle_name} {item.surname}
                        <FieldArray
                          name="employee"
                          render={(arr) => (
                            <div className="d-flex">
                              <FormikControl
                                control="input"
                                name={`employee[${i}].agent_id`}
                                type="hidden"
                                value={item.agent_employee.agent_id}
                              />
                              <FormikControl
                                control="input"
                                name={`employee[${i}].employee_id`}
                                type="hidden"
                                value={item.employee_id}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Card.Body>
        </Card>
        {!canRemoveIndex && (
          <>
            <div className="d-flex align-items-center">
              <div
                className="label-flight-ticket"
                style={{ backgroundColor: "#027F71", padding: "1px 8px 3px" }}
              >
                <img src={flightTicket} alt="flight-ticket" />
              </div>
              <span style={{ fontSize: "12px", paddingLeft: "8px" }}>
                Click to assign/remove assignment as leader.
              </span>
            </div>
            {onModal && (
              <div className="d-flex align-items-center pt-2">
                <div
                  className="label-flight-ticket"
                  style={{ backgroundColor: "#027F71", padding: "1px 8px 3px" }}
                >
                  <img src={flightTicket} alt="flight-ticket" />
                </div>
                <span style={{ fontSize: "12px", paddingLeft: "8px" }}>
                  Click to assign/forbid ttravel consultant to issue flight
                  ticket.
                </span>
              </div>
            )}
          </>
        )}
      </Col>
      <Col
        lg={2}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <button
          type="button"
          className="btn-add text-uppercase"
          onClick={() => handleButtonAdd()}
        >
          <div className="d-flex justify-content-around">
            <img src={arrowLeft} alt="left" />
            ADD
          </div>
        </button>
        <button
          type="button"
          className="btn-remove text-uppercase"
          onClick={() => handleButtonRemove()}
        >
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
            {secondCardTitle}
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
          {showFilter && (
            <div style={{ padding: "0px 33px 0px 29px" }}>
              <FormInputSelectAjax
                label="Branch Office"
                // onChange={}
                endpoint="/master/employees"
                column="given_name"
                sort="given_name"
                isGrouping={true}
                fieldGroup="employee_id"
                isArray={false}
                fieldArray=""
                // value={}
                data={secondData}
                // filter={}
                placeholder="Branch Office"
                type="selectmultiple"
                isFilter={false}
                allowClear={false}
              />
              <FormInputSelectAjax
                label="Job Title"
                // onChange={}
                endpoint="/master/employees"
                column="job_title.job_title_name"
                sort="job_title.id"
                isGrouping={true}
                fieldGroup="job_title.id"
                isArray={false}
                fieldArray=""
                // value={}
                data={secondData}
                // filter={}
                placeholder="Job Title"
                type="selectmultiple"
                isFilter={false}
                allowClear={false}
              />
              <FormInputSelectAjax
                label="Name"
                // onChange={}
                endpoint="/master/employees"
                column="given_name"
                sort="given_name"
                isGrouping={true}
                fieldGroup="employee_id"
                isArray={false}
                fieldArray=""
                // value={}
                data={secondData}
                // filter={}
                placeholder="name"
                type="selectmultiple"
                isFilter={false}
                allowClear={false}
              />
            </div>
          )}
          <Card.Body style={{ padding: "8px 10px 10px 9px" }}>
            <ol class="list list-general-setup">
              {rightData.map((item) => (
                <li className="item-general-setup">
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
                      {item.given_name} {item.middle_name} {item.surname}
                      <span>({item?.office?.name})</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AddOrRemoveList
