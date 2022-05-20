import React, { useState } from "react"
import { Tabs, TabPane, Row, Col, Form } from "react-bootstrap"
import { FastField } from "formik"

const FeeSection = (props) => {
  
  let id = props.taxType ? props.taxType.id : "";
  let title = props.taxType ? props.taxType.fee_tax_type_name : props.title;
  let disabledAmount = props.isView 
    ? false
    : props.values[props.fieldRadio] === "" 
    ? true 
    : props.values[props.fieldRadio] !== "amount"
  let disabledPercent = props.isView 
  ? false
  : props.values[props.fieldRadio] === "" 
  ? true 
  : props.values[props.fieldRadio] !== "percent"
  return (
    <>
      <Form.Group>
        <Row>
          <Form.Label>
            {title}
            <span className="form-label-required">*</span>
          </Form.Label>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FastField name={props.fieldRadio}>
                {({ field, form }) => (
                  <Form.Check 
                    {...field} 
                    value="amount" 
                    type="radio" 
                    label="Fixed Amount" 
                    disabled={props.isView}
                    checked={props.values[props.fieldRadio] === "amount"} 
                    onClick={() => {
                      props.setFieldValue(props.values[props.fieldRadio+"_percent"], null)
                      props.setFieldValue(props.values[props.fieldRadio+"_tax_include"], false)
                    }}
                  />
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
                      {
                        disabledAmount 
                        ? <Form.Control 
                            style={{ maxWidth: "220px" }} 
                            disabled={true} 
                          />
                        : <FastField name={props.fieldAmount}>
                        {({ field }) => (
                          <Form.Control 
                            type="text" 
                            {...field} 
                            style={{ maxWidth: "220px" }} 
                            disabled={props.isView} 
                            maxLength={15} 
                            onChange={(value) => {
                              // console.log(props.values, props.fieldAmount)
                              let pattern=/^\d+$/
                              // console.log(pattern.test(value.target.value))
                              if(pattern.test(value.target.value)) {
                                const changeToInteger = Number.parseInt(value.target.value)
                                // console.log(changeToInteger, "haha")
                                // const separator = changeToInteger.toLocaleString('en-US', { maximumFractionDigits: 0 })
                                props.setFieldValue(props.fieldAmount, changeToInteger)
                              }
                             
                            }}
                          />
                        )}
                      </FastField>
                      }
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3">
                  {
                    disabledAmount
                    ? (
                      <>
                        <Form.Check type="radio" label="/Ticket" disabled={disabledAmount} />
                        <Form.Check type="radio" label="/Person" disabled={disabledAmount} />
                        <Form.Check type="radio" label="/Transaction" disabled={disabledAmount} />
                      </>
                    ) : (
                      <>
                        <FastField name={props.fieldAmountType}>
                          {({ field, form }) => (
                          <Form.Check {...field} value="de62950d-fbab-4e39-bd90-c2b6687c6b36" checked={props.values[props.fieldAmountType] === "de62950d-fbab-4e39-bd90-c2b6687c6b36"} type="radio" label="/Ticket"  disabled={props.isView}/>
                          )}
                        </FastField>
                        <FastField name={props.fieldAmountType}>
                          {({ field, form }) => (
                          <Form.Check {...field} value="de03bf84-4bd8-4cdf-9348-00246f04bcad" checked={props.values[props.fieldAmountType] === "de03bf84-4bd8-4cdf-9348-00246f04bcad"} type="radio" label="/Person" disabled={props.isView} />
                          )}
                        </FastField>
                        <FastField name={props.fieldAmountType}>
                          {({ field, form }) => (
                          <Form.Check {...field} value="5123b121-4f6a-4871-bef1-65408d663e19" checked={props.values[props.fieldAmountType] === "5123b121-4f6a-4871-bef1-65408d663e19"} type="radio" label="/Transaction" disabled={props.isView} />
                          )}
                        </FastField>
                      </>
                    )
                  }
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Form.Group>
              <FastField name={props.fieldRadio}>
                {({ field, form }) => (
                <Form.Check 
                  {...field} 
                  value="percent" 
                  type="radio" 
                  label="Percentage"
                  disabled={props.isView}
                  checked={props.values[props.fieldRadio] === "percent"}
                  onClick={() => {
                    props.setFieldValue(props.values[props.fieldRadio+"_amount"], null)
                    props.setFieldValue(props.values[props.fieldRadio+"_amount_type"], "")
                  }}
                />
                )}
              </FastField>
            </Form.Group>
            <Row className="ml-3">
              <Col sm={12} md={6}>
                <Form.Group as={Row} className="mb-3">
                  {
                    disabledPercent
                    ? <Form.Control type="number" style={{ maxWidth: "80px" }} className="mx-3" disabled={true} />
                    :
                    <FastField name={props.fieldPercent}>
                      {({ field }) => (
                          <Form.Control 
                            {...field} 
                            type="text" 
                            minLength={0}
                            maxLength={3}
                            style={{ maxWidth: "80px" }} 
                            className="mx-3" 
                            disabled={props.isView} 
                            onChange={(value) => {
                              // console.log(props.values, props.fieldAmount)
                              let pattern=/^\d+$/
                              // console.log(pattern.test(value.target.value))
                              if(pattern.test(value.target.value)) {
                                if(value.target.value <= 100) {
                                  props.setFieldValue(props.fieldPercent, value.target.value)
                                }
                              }
                              if(value.target.value === "") {
                                props.setFieldValue(props.fieldPercent, value.target.value)
                              }
                            }}
                          />
                      )}
                    </FastField>
                  }
                  <span className="text-lg mt-1">%</span>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
              {disabledPercent 
                ? <Form.Check type="checkbox" className="mt-2" label="Include Taxes" disabled={true} />
                : <FastField name={props.fieldIncludeTax}>
                    {({ field, }) => (
                    <Form.Check {...field} type="checkbox" className="mt-2" label="Include Taxes" disabled={props.isView} />
                    )}
                  </FastField>
              }
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
          key={i}
          fieldRadio={val.fieldRadio}
          fieldAmount={val.fieldAmount}
          fieldAmountType={val.fieldAmountType}
          fieldPercent={val.fieldPercent}
          fieldIncludeTax={val.fieldIncludeTax}
          fieldFeeTaxId={val.fieldFeeTaxId}
          taxType={val.taxType}
          borderBottom={i < props.sections.length-1}
          values={props.values}
          {...props}
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
                <Fees sections={menu.sections} values={props.values} {...props} />
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    )
  }