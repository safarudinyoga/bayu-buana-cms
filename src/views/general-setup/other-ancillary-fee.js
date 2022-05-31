import { FastField, Formik } from "formik"
import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import { withRouter } from "react-router"
import useQuery from "lib/query"
import NumberFormat from "react-number-format"

const endpointFee = "/master/agent-processing-fee-categories"
const endpoint = "/master/agent-processing-fee-categories/3"
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
              <Col sm={12} md={6}>
                <Form.Group as={Row} className="mb-xs-3">
                  <Form.Label
                    column
                    xs={2}
                    md={3}
                    lg={5}
                    className={`ml-xs-4 ${disabledAmount ? "grey-text" : ""} `}
                  >
                    IDR
                  </Form.Label>
                  <Col xs={10} md={9} lg={7}>
                    {disabledAmount ? (
                      <Form.Control
                        style={{ maxWidth: "220px" }}
                        disabled={true}
                        className={"grey-background"}
                      />
                    ) : (
                      <FastField name={props.fieldAmount}>
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
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
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
                      props.setFieldValue(props.fieldRadio + "_amount", "")
                      props.setFieldValue(props.fieldRadio + "_amount_type", "")
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
      <FeedbackMessage {...props} />
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
    domestic_reissue: "",
    domestic_reissue_fee_tax_id: "",
    domestic_reissue_amount: "",
    domestic_reissue_amount_type: "",
    domestic_reissue_percent: "",
    domestic_reissue_tax_include: false,
    domestic_revalidate: "",
    domestic_revalidate_fee_tax_id: "",
    domestic_revalidate_amount: "",
    domestic_revalidate_amount_type: "",
    domestic_revalidate_percent: "",
    domestic_revalidate_tax_include: false,
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    domestic_reissue: Yup.string().required(
      `Please enter fixed amount or percentage for ${taxTypeMDRFee.fee_tax_type_name}.`,
    ),
    domestic_reissue_amount: Yup.string().when("domestic_reissue", {
      is: (value) => value === "amount",
      then: Yup.string().required(
        `Please enter fixed amount for ${taxTypeMDRFee.fee_tax_type_name}.`,
      ),
    }),
    domestic_reissue_amount_type: Yup.string().when("domestic_reissue", {
      is: (value) => value === "amount",
      then: Yup.string().required(`Please select charge type.`),
    }),
    domestic_reissue_percent: Yup.string().when("domestic_reissue", {
      is: (value) => value === "percent",
      then: Yup.string().required(
        `Please enter percentage for ${taxTypeMDRFee.fee_tax_type_name}.`,
      ),
    }),
    domestic_revalidate: Yup.string().required(
      `Please enter fixed amount or percentage for ${taxTypeLatePayment.fee_tax_type_name}.`,
    ),
    domestic_revalidate_amount: Yup.string().when("domestic_revalidate", {
      is: (value) => value === "amount",
      then: Yup.string().required(
        `Please enter fixed amount for ${taxTypeLatePayment.fee_tax_type_name}.`,
      ),
    }),
    domestic_revalidate_amount_type: Yup.string().when("domestic_revalidate", {
      is: (value) => value === "amount",
      then: Yup.string().required(`Please select charge type.`),
    }),
    domestic_revalidate_percent: Yup.string().when("domestic_revalidate", {
      is: (value) => value === "percent",
      then: Yup.string().required(
        `Please enter percentage for ${taxTypeLatePayment.fee_tax_type_name}.`,
      ),
    }),
  })

  const checkprocessingType = (value) =>
    value !== "00000000-0000-0000-0000-000000000000" ? "amount" : "percent"
  const checkChargeType = (value) =>
    value === "00000000-0000-0000-0000-000000000000" ? "" : value

  useEffect(async () => {
    try {
      if (formId) {
        let { data } = await api.get(endpointFee + "/3/" + formId)
        setInitialForm({
          ...initialForm,
          ...data,
          domestic_reissue: checkprocessingType(
            data.domestic_reissue.charge_type_id,
          ),
          domestic_reissue_fee_tax_id: data.domestic_reissue.fee_tax_type_id,
          domestic_reissue_amount: data.domestic_reissue.amount,
          domestic_reissue_amount_type: checkChargeType(
            data.domestic_reissue.charge_type_id,
          ),
          domestic_reissue_percent: data.domestic_reissue.percent,
          domestic_reissue_tax_include: data.domestic_reissue.is_tax_inclusive,
          domestic_revalidate: checkprocessingType(
            data.domestic_revalidate.charge_type_id,
          ),
          domestic_revalidate_fee_tax_id:
            data.domestic_revalidate.fee_tax_type_id,
          domestic_revalidate_amount: data.domestic_revalidate.amount,
          domestic_revalidate_amount_type: checkChargeType(
            data.domestic_revalidate.charge_type_id,
          ),
          domestic_revalidate_percent: data.domestic_revalidate.percent,
          domestic_revalidate_tax_include:
            data.domestic_revalidate.is_tax_inclusive,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const removeSeparator = (value) => {
    value = value.toString().split(",").join("")
    return parseInt(value)
  }

  const setPayload = (values) => {
    let payloadDomestic = {
      domestic_reissue: {
        fee_tax_type_id: taxIdMDRFee,
        amount:
          values.domestic_reissue === "amount"
            ? removeSeparator(values.domestic_reissue_amount)
            : 0,
        percent:
          values.domestic_reissue === "amount"
            ? 0
            : parseFloat(values.domestic_reissue_percent),
        charge_type_id:
          values.domestic_reissue === "amount"
            ? values.domestic_reissue_amount_type
            : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:
          values.domestic_reissue === "amount"
            ? false
            : values.domestic_reissue_tax_include,
      },
      domestic_revalidate: {
        fee_tax_type_id: taxIdLatePayment,
        amount:
          values.domestic_revalidate === "amount"
            ? removeSeparator(values.domestic_revalidate_amount)
            : 0,
        percent:
          values.domestic_revalidate === "amount"
            ? 0
            : parseFloat(values.domestic_revalidate_percent),
        charge_type_id:
          values.domestic_revalidate === "amount"
            ? values.domestic_revalidate_amount_type
            : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:
          values.domestic_revalidate === "amount"
            ? false
            : values.domestic_revalidate_tax_include,
      },
      processing_fee_category_name: values.processing_fee_category_name
        ? values.processing_fee_category_name.value
        : "Other Ancillary Fee",
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
        validationSchema={validationSchema}
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
          <Form onSubmit={handleSubmit}>
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
                          fieldFeeTaxId: "domestic_reissue_fee_tax_id",
                          fieldRadio: "domestic_reissue",
                          fieldAmount: "domestic_reissue_amount",
                          fieldAmountType: "domestic_reissue_amount_type",
                          fieldPercent: "domestic_reissue_percent",
                          fieldIncludeTax: "domestic_reissue_tax_include",
                        },
                        {
                          title: "Late Payment",
                          taxType: taxTypeLatePayment,
                          fieldFeeTaxId: "domestic_revalidate_fee_tax_id",
                          fieldRadio: "domestic_revalidate",
                          fieldAmount: "domestic_revalidate_amount",
                          fieldAmountType: "domestic_revalidate_amount_type",
                          fieldPercent: "domestic_revalidate_percent",
                          fieldIncludeTax: "domestic_revalidate_tax_include",
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
                      label: "/Transaction",
                      value: "5123b121-4f6a-4871-bef1-65408d663e19",
                    },
                  ]}
                  errors={errors}
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
