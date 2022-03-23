import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Tabs, TabPane, Row, Col, Form } from "react-bootstrap"
import { ReactSVG } from "react-svg"

const FeeSection = (props) => {
  return (
    <>
      <Form.Group>
        <Row>
          <Form.Label>
            {props.title}
            <span className="form-label-required">*</span>
          </Form.Label>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Check type="radio" label="Fixed Amount" />
            </Form.Group>
            <Row className="ml-3">
              <Col sm={12} md={6}>
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
                <Form.Group className="mb-3">
                  <Form.Check type="radio" label="/Room Night" />
                  <Form.Check type="radio" label="/Room" />
                  <Form.Check
                    type="radio"
                    label="/Transaction"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Check type="radio" label="Percentage" />
            </Form.Group>
            <Row className="ml-3">
              <Col sm={12} md={6}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Control style={{ maxWidth: "80px" }} className="mx-3" />
                  <span className="text-lg mt-1">%</span>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Check
                  type="checkbox"
                  label="Include Taxed"
                  className="mt-2"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
      {props.borderBottom && <h3 className="card-heading"></h3>}
    </>
  )
}
const Fees = (props) => {
  return (
    <Form className="mb-3 pt-3 pl-3">
      <Col md={8}>
        {
          props.sections.map((val, i) => <FeeSection title={val} borderBottom={i < props.sections.length-1} /> )
        }
      </Col>
    </Form>
  )
}

export const FeeTabs = (props) => {
    const [key, setKey] = useState(props.menu[0].title)
    return (
      <div className="card">
  
        <Tabs
          id="standard-ancillary-fee"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4"
          mountOnEnter={true}
          unmountOnExit={true}
          className=""
        >
        {
            props.menu.map((menu, i) => (
              <TabPane
                key={i}
                className="m-3"
                eventKey={menu.title}
                title={<span className="ml-md-2 tabs-text fee-tabs-title">{menu.title}</span>}
              >
                <Fees sections={menu.sections} />
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    )
  }