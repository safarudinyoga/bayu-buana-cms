import React, { useState } from "react"
import { Card, Form, Row, Col, ListGroup, Button, Image } from "react-bootstrap"
import downIcon from "assets/icons/double-down.svg"
import upIcon from "assets/icons/double-up.svg"
import arrowLeft from "assets/icons/arrow-left.svg"
import arrowRight from "assets/icons/arrow-right.svg"
import xCircle from "assets/icons/x-circle.svg"
import "./add-or-remove-list.css"

const AddOrRemoveList = ({ firstData, secondData, canRemoveIndex }) => {
  const [showFilter, setShowFilter] = useState(false)
  const [leftdata, setLeftData] = useState(firstData)
  const [rightdata, setRightData] = useState(secondData)
  const [selected, setSelected] = useState({})

  const handleButtonAdd = () => {
    setLeftData((leftdata) => [...leftdata, ...rightdata])
    setRightData((rightdata) => [])
  }

  const handleButtonRemove = () => {
    setLeftData((leftdata) => [])
    setRightData((rightdata) => [...rightdata, ...leftdata])
  }

  const handleRemoveIndexArray = (e) => {
    const newData = leftdata.filter((item) => item !== e)
    setLeftData((leftdata) => newData)
    setRightData((rightdata) => [...rightdata, e])
  }

  const toggleSelected = (id) => {
    setSelected((selected) => ({
      ...selected,
      [id]: !selected[id],
    }))
    // setColor(color === "#D3D3D3" ? "#027F71" : "#D3D3D3")
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
            LIST OF OVER CREDIT APPROVERS
          </Card.Header>
          <Card.Body style={{ padding: "8px 10px 10px 9px" }}>
            <ol class="list list-general-setup">
              {leftdata.map((item, i) => (
                <li
                  className={canRemoveIndex ? "item-general-setup" : ""}
                  key={i}
                >
                  {canRemoveIndex ? (
                    <div className="w-100 d-flex justify-content-between">
                      {item.name} ({item.category})
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
                          backgroundColor: selected[item.name]
                            ? "#027F71"
                            : "#D3D3D3",
                          padding: "2px 10px 2px",
                        }}
                      >
                        <label className="label-flight-ticket">
                          <input
                            type="checkbox"
                            name="check-ticket"
                            checked={selected[item.name]}
                            onChange={() => toggleSelected(item.name)}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill={selected[item.name] ? "#FFFFFF" : "#FFFFFF"}
                            class="bi bi-images"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                          </svg>
                        </label>
                      </div>
                      <div
                        className="w-100 d-flex justify-content-between"
                        style={{ paddingLeft: 13, paddingRight: 15 }}
                      >
                        {item.name} <span>({item.category})</span>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Card.Body>
        </Card>
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
              {rightdata.map((item) => (
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
                      {item.name} <span>({item.category})</span>
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
