import { FastField, Formik } from "formik"
import React, { useState, useEffect } from "react"
// import FormHorizontal from "components/form/horizontal"
import { Card, Form, Row, Col, Button, Tabs, TabPane } from "react-bootstrap"
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import { withRouter, useHistory } from "react-router"
import useQuery from "lib/query"

const endpointFee = "/master/agent-processing-fee-categories"
const endpoint = "/master/agent-processing-fee-categories/1"
const options = {
  position: "bottom-right",
}

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
                      props.setFieldValue(
                        props.values[props.fieldRadio + "_percent"],
                        null,
                      )
                      props.setFieldValue(
                        props.values[props.fieldRadio + "_tax_include"],
                        false,
                      )
                    }}
                  />
                )}
              </FastField>
            </Form.Group>
            <Row className="ml-3">
              <Col sm={12} md={6}>
                <Form.Group as={Row} className="mb-xs-3">
                  <Form.Label column xs={2} md={3} lg={5} className="ml-xs-4">
                    IDR
                  </Form.Label>
                  <Col xs={10} md={9} lg={7}>
                    {disabledAmount ? (
                      <Form.Control
                        style={{ maxWidth: "220px" }}
                        disabled={true}
                      />
                    ) : (
                      <FastField name={props.fieldAmount}>
                        {({ field }) => (
                          <Form.Control
                            type="text"
                            {...field}
                            style={{ maxWidth: "220px" }}
                            disabled={props.isView}
                            maxLength={15}
                            onChange={(value) => {
                              // console.log(props.values, props.fieldAmount)
                              let pattern = /^\d+$/
                              // console.log(pattern.test(value.target.value))
                              if (pattern.test(value.target.value)) {
                                const changeToInteger = Number.parseInt(
                                  value.target.value,
                                )
                                // console.log(changeToInteger, "haha")
                                // const separator = changeToInteger.toLocaleString('en-US', { maximumFractionDigits: 0 })
                                props.setFieldValue(
                                  props.fieldAmount,
                                  changeToInteger,
                                )
                              }
                            }}
                          />
                        )}
                      </FastField>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3">
                  {props.amountSuffixSelections.map((suffix) => (
                    <AmountRadioSelections
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
              <Col sm={12} md={6}>
                <Form.Group as={Row} className="mb-3">
                  {disabledPercent ? (
                    <Form.Control
                      type="number"
                      style={{ maxWidth: "80px" }}
                      className="mx-3"
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
                  <span className="text-lg mt-1">%</span>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
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
                        checked={
                          props.values[props.fieldRadio + "_tax_include"]
                        }
                        disabled={props.isView}
                      />
                    )}
                  </FastField>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
      {props.borderBottom && <h3 className="card-heading">.</h3>}
    </>
  )
}
const Fees = (props) => {
  return (
    <Form className="mb-3 pt-3 pl-3">
      <Col md={8}>
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

const Menu = (props) => {
  return (
    <div style={{ padding: "0 15px 15px" }}>
      {props.menu.map((menu, i) => (
        <div key={i}>
          <Fees sections={menu.sections} values={props.values} {...props} />
        </div>
      ))}
    </div>
  )
}

const OtherAncillaryFee = (props) => {
  let api = new Api()
  const isView = useQuery().get("action") === "view"
  const history = useHistory()
  const [openSnackbar] = useSnackbar(options)
  const [taxTypeMDRFee, setTaxTypeMDRFee] = useState([])
  const [taxTypeLatePayment, setTaxTypeLatePayment] = useState([])

  const [taxIdMDRFee, setTaxIdMDRFee] = useState("")
  const [taxIdLatePayment, setTaxIdLatePayment] = useState("")
  const formId = props.match.params.id

  const getFeeTaxType = async (code, setData, setId) => {
    try {
      let res = await api.get(
        `/master/fee-tax-types?filters=[["status","!=","0"],["and"],["fee_tax_type_code","${code}"]]`,
      )
      let data = res.data.items[0]
      setData(data)
      setId(data.id)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getFeeTaxType("5", setTaxTypeMDRFee, setTaxIdMDRFee)
    getFeeTaxType("7", setTaxTypeLatePayment, setTaxIdLatePayment)
  }, [props.match.params.id])

  const [initialForm, setInitialForm] = useState({
    mdr_fee: "",
    mdr_fee_tax_id: "",
    mdr_fee_amount: null,
    mdr_fee_amount_type: "",
    mdr_fee_percent: null,
    mdr_fee_tax_include: false,
    late_payment: "",
    late_payment_tax_id: "",
    late_payment_amount: null,
    late_payment_amount_type: "",
    late_payment_percent: null,
    late_payment_tax_include: false,
  })

  const checkprocessingType = (value) =>
    value !== "00000000-0000-0000-0000-000000000000" ? "amount" : "percent"

  useEffect(async () => {
    try {
      if (formId) {
        let { data } = await api.get(endpointFee + "/1/" + formId)
        setInitialForm({
          ...initialForm,
          ...data,
          mdr_fee: checkprocessingType(data.mdr_fee.charge_type_id),
          mdr_fee_tax_id: data.mdr_fee.fee_tax_type_id,
          mdr_fee_amount: data.mdr_fee.amount,
          mdr_fee_amount_type: data.mdr_fee.charge_type_id,
          mdr_fee_percent: data.mdr_fee.percent,
          mdr_fee_tax_include: data.mdr_fee.is_tax_inclusive,
          late_payment: checkprocessingType(data.late_payment.charge_type_id),
          late_payment_tax_id: data.late_payment.fee_tax_type_id,
          late_payment_amount: data.late_payment.amount,
          late_payment_amount_type: data.late_payment.charge_type_id,
          late_payment_percent: data.late_payment.percent,
          late_payment_tax_include: data.late_payment.is_tax_inclusive,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const setPayload = (values) => {
    let payloadDomestic = {
      mdr_fee: {
        fee_tax_type_id: taxIdMDRFee,
        amount: values.mdr_fee === "amount" ? values.mdr_fee_amount : 0,
        percent:
          values.mdr_fee === "amount" ? 0 : parseFloat(values.mdr_fee_percent),
        charge_type_id:
          values.mdr_fee === "amount"
            ? values.mdr_fee_amount_type
            : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:
          values.mdr_fee === "amount" ? false : values.mdr_fee_tax_include,
      },
      late_payment: {
        fee_tax_type_id: taxIdLatePayment,
        amount:
          values.late_payment === "amount" ? values.late_payment_amount : 0,
        percent:
          values.late_payment === "amount"
            ? 0
            : parseFloat(values.late_payment_percent),
        charge_type_id:
          values.late_payment === "amount"
            ? values.late_payment_amount_type
            : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:
          values.late_payment === "amount"
            ? false
            : values.late_payment_tax_include,
      },
    }
    return payloadDomestic
  }
  const onSubmit = async (values) => {
    try {
      let payload = setPayload(values)
      let res = await api.putOrPost(endpoint, formId, payload)
      console.log(res)
      openSnackbar(
        `Ancillary Fee has been successfully ${formId ? "updated" : "saved"}.`,
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialForm}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          onSubmit(values)
        }}
        enableReinitialize
      >
        {({
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
        }) => (
          <Form onSubmit="">
            <Card>
              <Card.Body>
                <h3 className="card-heading">Other Ancillary Fee</h3>

                <Menu
                  menu={[
                    {
                      title: "MDR Fee",
                      sections: [
                        {
                          title: "MDR FEE",
                          taxType: taxTypeMDRFee,
                          fieldFeeTaxId: "mdr_fee_tax_id",
                          fieldRadio: "mdr_fee",
                          fieldAmount: "mdr_fee_amount",
                          fieldAmountType: "mdr_fee_amount_type",
                          fieldPercent: "mdr_fee_percent",
                          fieldIncludeTax: "mdr_fee_tax_include",
                        },
                        {
                          title: "Late Payment",
                          taxType: taxTypeLatePayment,
                          fieldFeeTaxId: "late_payment_tax_id",
                          fieldRadio: "late_payment",
                          fieldAmount: "late_payment_amount",
                          fieldAmountType: "late_payment_amount_type",
                          fieldPercent: "late_payment_percent",
                          fieldIncludeTax: "late_payment_tax_include",
                        },
                      ],
                    },
                  ]}
                  values={values}
                  fHandleChange={handleChange}
                  fHandleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  isView={isView}
                  amountSuffixSelections={[
                    {
                      label: "/Ticket",
                      value: "de62950d-fbab-4e39-bd90-c2b6687c6b36",
                    },
                    {
                      label: "/Person",
                      value: "de03bf84-4bd8-4cdf-9348-00246f04bcad",
                    },
                    {
                      label: "/Transaction",
                      value: "5123b121-4f6a-4871-bef1-65408d663e19",
                    },
                  ]}
                />
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
        )}
      </Formik>
    </>
  )
}

export default withRouter(OtherAncillaryFee)
