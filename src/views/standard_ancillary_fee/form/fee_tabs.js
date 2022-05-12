import React, { useState } from "react"
import { Tabs, TabPane, Row, Col, Form } from "react-bootstrap"
import { FastField } from "formik"

const FeeSection = (props) => {
  // console.log(props.fieldRadio, props.values)
  // console.log(props.values[props.fieldRadio])
  let disabledAmount = props.values[props.fieldRadio] === "" ? true : props.values[props.fieldRadio] !== "amount"
  let disabledPercent = props.values[props.fieldRadio] === "" ? true : props.values[props.fieldRadio] !== "percent"
  return (
    <>
      <Form.Group>
        <Row>
          <Form.Label>
            {props.taxType ? props.taxType.fee_tax_type_name : props.title}
            <span className="form-label-required">*</span>
          </Form.Label>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FastField name={props.fieldRadio}>
                {({ field, form }) => (
                  <Form.Check {...field} value="amount" type="radio" label="Fixed Amount" checked={props.values[props.fieldRadio] === "amount"} />
                )}
              </FastField>
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
                      {props.fieldRadio === "domestic_reissue" ? console.log(disabledAmount) : ""}
                      {
                        disabledAmount 
                        ? <Form.Control style={{ maxWidth: "220px" }} disabled={true} />
                        : <FastField name={props.fieldAmount}>
                        {({ field }) => (
                          <Form.Control {...field} style={{ maxWidth: "220px" }} />
                        )}
                      </FastField>
                      }
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3">
                  <FastField name={props.fieldAmountType}>
                    {({ field, form }) => (
                    <Form.Check {...field} value="de62950d-fbab-4e39-bd90-c2b6687c6b36" type="radio" label="/Ticket" disabled={disabledAmount} />
                    )}
                  </FastField>
                  <FastField name={props.fieldAmountType}>
                    {({ field, form }) => (
                    <Form.Check {...field} value="de03bf84-4bd8-4cdf-9348-00246f04bcad" type="radio" label="/Person" disabled={disabledAmount} />
                    )}
                  </FastField>
                  <FastField name={props.fieldAmountType}>
                    {({ field, form }) => (
                    <Form.Check {...field} value="5123b121-4f6a-4871-bef1-65408d663e19" type="radio" label="/Transaction" disabled={disabledAmount} />
                    )}
                  </FastField>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Form.Group>
              <FastField name={props.fieldRadio}>
                {({ field, form }) => (
                <Form.Check {...field} value="percent" type="radio" label="Percentage" checked={props.values[props.fieldRadio] === "percent"} />
                )}
              </FastField>
            </Form.Group>
            <Row className="ml-3">
              <Col sm={12} md={6}>
                <Form.Group as={Row} className="mb-3">
                  <FastField name={props.fieldPercent}>
                    {({ field }) => (
                        <Form.Control {...field} style={{ maxWidth: "80px" }} className="mx-3" disabled={disabledPercent} />
                    )}
                  </FastField>
                  <span className="text-lg mt-1">%</span>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
              <FastField name={props.fieldIncludeTax}>
                {({ field, }) => (
                <Form.Check {...field} type="checkbox" className="mt-2" label="Include Taxed" disabled={disabledPercent} />
                )}
              </FastField>
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
          props.sections.map((val, i) => <FeeSection title={val.title} 
          fieldRadio={val.fieldRadio}
          fieldAmount={val.fieldAmount}
          fieldAmountType={val.fieldAmountType}
          fieldPercent={val.fieldPercent}
          fieldIncludeTax={val.fieldIncludeTax}
          taxType={val.taxType}
          borderBottom={i < props.sections.length-1}
          values={props.values}
          /> )
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
        >
        {
            props.menu.map((menu, i) => (
              <TabPane
                key={i}
                className="m-3"
                eventKey={menu.title}
                title={<span className="ml-md-2 tabs-text fee-tabs-title">{menu.title}</span>}
              >
                <Fees sections={menu.sections} values={props.values} />
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    )
  }