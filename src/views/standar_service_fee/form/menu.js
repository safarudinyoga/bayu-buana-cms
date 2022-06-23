import React from "react"
import { Row, Col, Form } from "react-bootstrap"
import { FastField } from "formik"
import NumberFormat from "react-number-format"

const AmountRadioSelections = (props) => {
  return props.disabledAmount ? (
    <Form.Check
      type="radio"
      label={props.label}
      value={props.value}
      disabled={props.disabledAmount}
    />
  ) : (
    <FastField name={props.fieldAmountType}>
      {({ field, form }) => (
        <Form.Check
          {...field}
          value={props.value}
          checked={props.values[props.fieldAmountType] === props.value}
          type="radio"
          label={props.label}
          disabled={props.isView}
        />
      )}
    </FastField>
  )
}
const FeeSection = (props) => {
  let id = props.taxType ? props.taxType.id : ""
  console.log(id)
  let title = props.taxType ? props.taxType.fee_tax_type_name : props.title
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
      <Form.Group as={Row} className="mb-3">
        <Col md={3}>
          <Form.Label colum>
            {title}
            <span className="form-label-required">*</span>
          </Form.Label>
        </Col>
        <Col md={5}>
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
                    props.setFieldValue(props.fieldRadio + "_percent", "")
                    props.setFieldValue(
                      props.fieldRadio + "_tax_include",
                      false,
                    )
                  }}
                />
              )}
            </FastField>
          </Form.Group>
          <Row className="ml-3">
            <Col lg={1} md={1}>
              <Form.Label className="ml-xs-4">IDR</Form.Label>
            </Col>
            <Col lg={6} md={6}>
              <Form.Group className="mb-3">
                {disabledAmount ? (
                  <Form.Control
                    style={{ maxWidth: "220px" }}
                    disabled={true}
                    className={"grey-background"}
                  />
                ) : (
                  <FastField name={props.fieldAmount}>
                    {({ field }) => (
                      <Form.Control
                        as={NumberFormat}
                        {...field}
                        style={{ maxWidth: "220px" }}
                        disabled={props.isView}
                        className="form-control"
                        maxLength={19}
                        thousandsGroupStyle="thousand"
                        displayType="input"
                        type="text"
                        thousandSeparator={true}
                        allowNegative={true}
                        // onChange={(value) => {
                        //   // console.log(props.values, props.fieldAmount)
                        //   let pattern = /^\d+$/
                        //   // console.log(pattern.test(value.target.value))
                        //   if (pattern.test(value.target.value)) {
                        //     const changeToInteger = Number.parseInt(
                        //       value.target.value,
                        //     )
                        //     // console.log(changeToInteger, "haha")
                        //     // const separator = changeToInteger.toLocaleString('en-US', { maximumFractionDigits: 0 })
                        //     props.setFieldValue(
                        //       props.fieldAmount,
                        //       changeToInteger,
                        //     )
                        //   }
                        // }}
                      />
                    )}
                  </FastField>
                )}
              </Form.Group>
            </Col>
            <Col lg={3} md={3}>
              <Form.Group className="mb-3">
                {props.amountSuffixSelections.map((suffix, i) => (
                  <AmountRadioSelections
                    key={i}
                    {...props}
                    disabledAmount={disabledAmount}
                    value={suffix.value}
                    label={suffix.label}
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
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
                    props.setFieldValue(
                      props.values[props.fieldRadio + "_amount"],
                      null,
                    )
                    props.setFieldValue(
                      props.values[props.fieldRadio + "_amount_type"],
                      "",
                    )
                  }}
                />
              )}
            </FastField>
          </Form.Group>
          <Row className="ml-3">
            <Col md={7}>
              <Form.Group as={Row} className="mb-3">
                {disabledPercent ? (
                  <Form.Control
                    type="number"
                    style={{ maxWidth: "80px" }}
                    className="mx-3 grey-background"
                    disabled={true}
                  />
                ) : (
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
                          let pattern = /^\d+$/
                          // console.log(pattern.test(value.target.value))
                          if (pattern.test(value.target.value)) {
                            if (value.target.value <= 100) {
                              props.setFieldValue(
                                props.fieldPercent,
                                value.target.value,
                              )
                            }
                          }
                          if (value.target.value === "") {
                            props.setFieldValue(
                              props.fieldPercent,
                              value.target.value,
                            )
                          }
                        }}
                      />
                    )}
                  </FastField>
                )}
                <span
                  className={`text-lg mt-1 ${
                    disabledPercent ? "grey-text" : ""
                  } `}
                >
                  %
                </span>
              </Form.Group>
            </Col>
            <Col md={5}>
              {disabledPercent ? (
                <Form.Check
                  type="checkbox"
                  className="mt-2"
                  label="Include Taxes"
                  disabled={true}
                />
              ) : (
                <FastField name={props.fieldIncludeTax}>
                  {({ field }) => (
                    <Form.Check
                      {...field}
                      type="checkbox"
                      className="mt-2"
                      label="Include Taxes"
                      checked={props.values[props.fieldRadio + "_tax_include"]}
                      disabled={props.isView}
                    />
                  )}
                </FastField>
              )}
            </Col>
          </Row>
        </Col>
      </Form.Group>
      <FeedbackMessage {...props} />
    </>
  )
}
const FeedbackMessage = (props) => {
  return (
    <FastField name="">
      {({ field, form }) => {
        let message =
          form.errors[props.fieldRadio] ||
          form.errors[props.fieldAmount] ||
          form.errors[props.fieldAmountType] ||
          form.errors[props.fieldPercent]

        return form.touched[props.fieldRadio] && message ? (
          <p className="fback-invalid">{message}</p>
        ) : null
      }}
    </FastField>
  )
}
const Fees = (props) => {
  return (
    <Form className="mb-3 pt-3 ">
      <Col md={12}>
        {props.sections.map((val, i) => (
          <FeeSection
            title={val.title}
            key={i}
            fieldRadio={val.fieldRadio}
            fieldAmount={val.fieldAmount}
            fieldAmountType={val.fieldAmountType}
            fieldPercent={val.fieldPercent}
            fieldIncludeTax={val.fieldIncludeTax}
            fieldFeeTaxId={val.fieldFeeTaxId}
            taxType={val.taxType}
            borderBottom={i < props.sections.length - 1}
            values={props.values}
            {...props}
          />
        ))}
      </Col>
    </Form>
  )
}

export const Menu = (props) => {
  return (
    <div>
      {props.menu.map((menu, i) => (
        <Fees sections={menu.sections} values={props.values} {...props} />
      ))}
    </div>
  )
}
