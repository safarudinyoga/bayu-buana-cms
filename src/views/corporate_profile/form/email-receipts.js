import React from "react"
import { Form, Row, Col, Card, Button } from "react-bootstrap"

// components & styles
import Select from "components/form/select"

// utils

const EmailReceipts = (props) => {
  return (
    <Form>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Invoice Settings</h3>
          <div className="invoice_settings pl-2 pr-2">
            <Form.Group as={Row} className="align-items-center form-group mb-2">
              <Form.Label column lg={4}>
                Invoice Email Recipient
              </Form.Label>
              <Col md={3} lg={8}>
                <Select
                  isClearable
                  placeholder="Select Employee"
                  options={[
                    {
                      value: "silver",
                      label: "label",
                    },
                    {
                      value: "silver",
                      label: "label",
                    },
                  ]}
                  onChange={() => {}}
                  width={"300px"}
                  // name
                  // value
                  // components={
                  //   isView
                  //     ? {
                  //         DropdownIndicator: () => null,
                  //         IndicatorSeparator: () => null,
                  //       }
                  //     : null
                  // }
                  // isDisabled={isView}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center form-group mb-1">
              <Form.Label column lg={4}>
                Travel Booker Requires Invoice
              </Form.Label>
              <Col md={3} lg={8}>
                <Form.Check
                  // name
                  // id
                  type="switch"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center form-group mb-1">
              <Form.Label column lg={4}>
                Traveler Requires Invoice
              </Form.Label>
              <Col md={3} lg={8}>
                <Form.Check
                  // name
                  // id
                  type="switch"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center form-group mb-1">
              <Form.Label column lg={4}>
                Personal Traveler Requires Invoice
              </Form.Label>
              <Col md={3} lg={8}>
                <Form.Check
                  // name
                  // id
                  type="switch"
                />
              </Col>
            </Form.Group>
          </div>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          type="submit"
          style={{
            marginRight: 15,
            marginBottom: 50,
            padding: "0 24px",
            backgroundColor: "#31394D",
          }}
        >
          SAVE
        </Button>
        <Button
          variant="secondary"
          // onClick={() => props.history.goBack()}
          style={{ padding: "0 21px" }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default EmailReceipts
