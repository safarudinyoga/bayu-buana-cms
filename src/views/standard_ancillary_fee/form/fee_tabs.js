import React, { useState } from "react"
import { Tabs, TabPane, Row, Col, Form } from "react-bootstrap"
import { FastField } from "formik"
import NumberFormat from "react-number-format";

const AmountRadioSelections = (props) => {
  return props.disabledAmount
  ?
    <Form.Check type="radio" label={props.label} value={props.value} disabled={props.disabledAmount} />
  : 
    <FastField name={props.fieldAmountType}>
      {({ field, form }) => (
      <Form.Check {...field} value={props.value} checked={props.values[props.fieldAmountType] === props.value} type="radio" label={props.label}  disabled={props.isView}/>
      )}
    </FastField>
}

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
                      props.setFieldValue(props.fieldRadio+"_percent", "")
                      props.setFieldValue(props.fieldRadio+"_tax_include", false)
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
                    className={`ml-xs-4 ${disabledAmount? "grey-text": ""} `}
                  >
                    IDR
                  </Form.Label>
                  <Col xs={10} md={9} lg={7}>
                      {
                        disabledAmount 
                        ? <Form.Control 
                            style={{ maxWidth: "220px" }} 
                            disabled={true} 
                            className={"grey-background"}
                          />
                        : <FastField name={props.fieldAmount}>
                        {({ field }) => (
                          <NumberFormat
                            {...field} 
                            className="form-control"
                            maxLength={19}
                            thousandsGroupStyle="thousand"
                            displayType="input"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={true}
                            // onChange={(values) => {
                              // const { value } = values;
                              // props.setFieldValue(props.fieldAmount, value)
                              // console.log(props.fieldAmount, values.target.value)
                            // }}
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
                    props.amountSuffixSelections.map((suffix, i) => <AmountRadioSelections 
                      key={i}
                      {...props}
                      disabledAmount={disabledAmount}
                      value={suffix.value}
                      label={suffix.label}
                    />)
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
                    props.setFieldValue(props.fieldRadio+"_amount", "")
                    props.setFieldValue(props.fieldRadio+"_amount_type", "")
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
                    ? <Form.Control 
                        type="number" 
                        style={{ maxWidth: "80px" }} 
                        className="mx-3 grey-background" 
                        disabled={true} 
                      />
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
                               if(value.target.value === "") {
                                 props.setFieldValue(props.fieldPercent, value.target.value)
                               }
                             } else { //for bugs field can alphabet
                               props.setFieldValue(props.fieldPercent, "")
                             }
                           }}
                         />
                      )}
                    </FastField>
                  }
                  <span className={`text-lg mt-1 ${disabledPercent? "grey-text": ""} `}>%</span>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
              {disabledPercent 
                ? <Form.Check 
                    type="checkbox" 
                    className="mt-2" 
                    label="Include Taxes" 
                    disabled={true} 
                  />
                : <FastField name={props.fieldIncludeTax}>
                    {({ field }) => (
                    <Form.Check {...field} type="checkbox" className="mt-2" label="Include Taxes" checked={props.values[props.fieldRadio+"_tax_include"]} disabled={props.isView} />
                    )}
                  </FastField>
              }
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
      <FeedbackMessage {...props} />
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
  const [key, setKey] = useState(props.tabKey || props.menu[0].title)
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

const FeedbackMessage = (props) => {
  return <FastField name="">
    {({ field,form }) => {
      let message = form.errors[props.fieldRadio] || form.errors[props.fieldAmount]|| form.errors[props.fieldAmountType] || form.errors[props.fieldPercent]

      return form.touched[props.fieldRadio] &&
      message
      ? (
        <p className="fback-invalid">
          {message}
        </p>
      ) : null
    }}
  </FastField>
}