import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"

import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Api from "config/api"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { FeeTabs } from "./fee_tabs"
import { useSnackbar } from "react-simple-snackbar"

const endpoint = "/master/processing-fee-categories"
const endpointFee = "/master/agent-processing-fee-categories"
const backUrl = "/master/standard-ancillary-fee"
const options = {
  position: "bottom-right",
}
const FlightForm = (props) => {
  const history = useHistory()
  const [openSnackbar] = useSnackbar(options)
  let dispatch = useDispatch()
  let api = new Api()

  const [taxTypeDomesticReissue, setTaxTypeDomesticReissue] = useState([])
  const [taxTypeDomesticRevalidate, setTaxTypeDomesticRevalidate] = useState([])
  const [taxTypeDomesticRefund, setTaxTypeDomesticRefund] = useState([])
  const [taxTypeDomesticVoid, setTaxTypeDomesticVoid] = useState([])
  const [taxTypeDomesticRfp, setTaxTypeDomesticRfp] = useState([])
  const [taxTypeDomesticNonGds, setTaxTypeDomesticNonGds] = useState([])
  const [taxTypeInternationalReissue, setTaxTypeInternationalReissue] = useState([])
  const [taxTypeInternationalRevalidate, setTaxTypeInternationalRevalidate] = useState([])
  const [taxTypeInternationalRefund, setTaxTypeInternationalRefund] = useState([])
  const [taxTypeInternationalVoid, setTaxTypeInternationalVoid] = useState([])
  const [taxTypeInternationalRfp, setTaxTypeInternationalRfp] = useState([])
  const [taxTypeInternationalNonGds, setTaxTypeInternationalNonGds] = useState([])
  const [taxTypeOtherEmergency, setTaxTypeOtherEmergency] = useState([])
  
  const [taxIdDomesticReissue, setTaxIdDomesticReissue] = useState("")
  const [taxIdDomesticRevalidate, setTaxIdDomesticRevalidate] = useState("")
  const [taxIdDomesticRefund, setTaxIdDomesticRefund] = useState("")
  const [taxIdDomesticVoid, setTaxIdDomesticVoid] = useState("")
  const [taxIdDomesticRfp, setTaxIdDomesticRfp] = useState("")
  const [taxIdDomesticNonGds, setTaxIdDomesticNonGds] = useState("")
  const [taxIdInternationalReissue, setTaxIdInternationalReissue] = useState("")
  const [taxIdInternationalRevalidate, setTaxIdInternationalRevalidate] = useState("")
  const [taxIdInternationalRefund, setTaxIdInternationalRefund] = useState("")
  const [taxIdInternationalVoid, setTaxIdInternationalVoid] = useState("")
  const [taxIdInternationalRfp, setTaxIdInternationalRfp] = useState("")
  const [taxIdInternationalNonGds, setTaxIdInternationalNonGds] = useState("")
  const [taxIdOtherEmergency, setTaxIdOtherEmergency] = useState("")
  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    let docTitle = "Edit Flight Standard Ancillary Fee"
    if (!formId) {
      docTitle = "Create Flight Standard Ancillary Fee"
    }
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Standard Ancillary Fee",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )

  })

  useEffect(() => {
    getFeeTaxType("33", setTaxTypeDomesticReissue, setTaxIdDomesticReissue)
    getFeeTaxType("49", setTaxTypeDomesticRevalidate, setTaxIdDomesticRevalidate)
    getFeeTaxType("35", setTaxTypeDomesticRefund, setTaxIdDomesticRefund)
    getFeeTaxType("37", setTaxTypeDomesticVoid, setTaxIdDomesticVoid)
    getFeeTaxType("39", setTaxTypeDomesticRfp, setTaxIdDomesticRfp)
    getFeeTaxType("41", setTaxTypeDomesticNonGds, setTaxIdDomesticNonGds)
    getFeeTaxType("34", setTaxTypeInternationalReissue, setTaxIdInternationalReissue)
    getFeeTaxType("50", setTaxTypeInternationalRevalidate, setTaxIdInternationalRevalidate)
    getFeeTaxType("36", setTaxTypeInternationalRefund, setTaxIdInternationalRefund)
    getFeeTaxType("38", setTaxTypeInternationalVoid, setTaxIdInternationalVoid)
    getFeeTaxType("40", setTaxTypeInternationalRfp, setTaxIdInternationalRfp)
    getFeeTaxType("42", setTaxTypeInternationalNonGds, setTaxIdInternationalNonGds)
    getFeeTaxType("6", setTaxTypeOtherEmergency, setTaxIdOtherEmergency)
  }, [props.match.params.id])
  
  // Initialize form
  const [initialForm, setInitialForm] = useState({
    processing_fee_category_name: "",
    description: "",
    domestic_reissue: "",
    domestic_reissue_fee_tax_id: "",
    domestic_reissue_amount: null,
    domestic_reissue_amount_type: "",
    domestic_reissue_percent: null,
    domestic_reissue_tax_include: false,
    domestic_revalidate: "",
    domestic_revalidate_fee_tax_id: "",
    domestic_revalidate_amount: null,
    domestic_revalidate_amount_type: "",
    domestic_revalidate_percent: null,
    domestic_revalidate_tax_include: false,
    domestic_refund: "",
    domestic_refund_fee_tax_id: "",
    domestic_refund_amount: null,
    domestic_refund_amount_type: "",
    domestic_refund_percent: null,
    domestic_refund_tax_include: false,
    domestic_void: "",
    domestic_void_fee_tax_id: "",
    domestic_void_amount: null,
    domestic_void_amount_type: "",
    domestic_void_percent: null,
    domestic_void_tax_include: false,
    domestic_rfp: "",
    domestic_rfp_fee_tax_id: "",
    domestic_rfp_amount: null,
    domestic_rfp_amount_type: "",
    domestic_rfp_percent: null,
    domestic_rfp_tax_include: false,
    domestic_non_gds: "",
    domestic_non_gds_fee_tax_id: "",
    domestic_non_gds_amount: null,
    domestic_non_gds_amount_type: "",
    domestic_non_gds_percent: null,
    domestic_non_gds_tax_include: false,
    international_reissue: "",
    international_reissue_fee_tax_id: "",
    international_reissue_amount: null,
    international_reissue_amount_type: "",
    international_reissue_percent: null,
    international_reissue_tax_include: false,
    international_revalidate: "",
    international_revalidate_fee_tax_id: "",
    international_revalidate_amount: null,
    international_revalidate_amount_type: "",
    international_revalidate_percent: null,
    international_revalidate_tax_include: false,
    international_refund: "",
    international_refund_fee_tax_id: "",
    international_refund_amount: null,
    international_refund_amount_type: "",
    international_refund_percent: null,
    international_refund_tax_include: false,
    international_void: "",
    international_void_fee_tax_id: "",
    international_void_amount: null,
    international_void_amount_type: "",
    international_void_percent: null,
    international_void_tax_include: false,
    international_rfp: "",
    international_rfp_fee_tax_id: "",
    international_rfp_amount: null,
    international_rfp_amount_type: "",
    international_rfp_percent: null,
    international_rfp_tax_include: false,
    international_non_gds: "",
    international_non_gds_fee_tax_id: "",
    international_non_gds_amount: null,
    international_non_gds_amount_type: "",
    international_non_gds_percent: null,
    international_non_gds_tax_include: false,
    other_emergency: "",
    other_emergency_fee_tax_id: "",
    other_emergency_amount: null,
    other_emergency_amount_type: "",
    other_emergency_percent: null,
    other_emergency_tax_include: false
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    processing_fee_category_name: Yup.string().required("Present Name is required."),
  })

  const onSubmit = async(payload, values) => {
    try {
      let formId = props.match.params.id

      if(formId) {
        
      } else {
        let res = await api.post(endpoint, payload)
        let idFee = res.data.id;
        onSubmitFee(values, idFee)
        openSnackbar(
          `Ancillary Fee has been successfully saved.`,
        )
        history.goBack()
      }
    } catch(e) {
      console.log(e)
    }
  }

  const getFeeTaxType = async(code, setData, setId) => {
    try {
      let res = await api.get(`/master/fee-tax-types?filters=[["status","!=","0"],["and"],["fee_tax_type_code","${code}"]]`)
      let data = res.data.items[0];
      setData(data)
      setId(data.id)
    } catch(e) {
      console.log(e)
    }
  }

  const onSubmitFee = (values, id) => {
      let payloadDomestic = {
        processing_fee_category_id: id,
        domestic_reissue: {
          fee_tax_type_id: taxIdDomesticReissue,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_reissue == "amount" ? values.domestic_reissue_amount : null,
          percent:values.domestic_reissue == "amount" ? null : values.domestic_reissue_percent,
          charge_type_id:values.domestic_reissue == "amount" ? values.domestic_reissue_amount_type : null,
          is_tax_inclusive:values.domestic_reissue == "amount" ? null : values.domestic_reissue_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_revalidate: {
          fee_tax_type_id: taxIdDomesticRevalidate,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_revalidate == "amount" ? values.domestic_revalidate_amount : null,
          percent:values.domestic_revalidate == "amount" ? null : values.domestic_revalidate_percent,
          charge_type_id:values.domestic_revalidate == "amount" ? values.domestic_revalidate_amount_type : null,
          is_tax_inclusive:values.domestic_revalidate == "amount" ? null : values.domestic_revalidate_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_refund: {
          fee_tax_type_id: taxIdDomesticRefund,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_refund == "amount" ? values.domestic_refund_amount : null,
          percent:values.domestic_refund == "amount" ? null : values.domestic_refund_percent,
          charge_type_id:values.domestic_refund == "amount" ? values.domestic_refund_amount_type : null,
          is_tax_inclusive:values.domestic_refund == "amount" ? null : values.domestic_refund_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_void: {
          fee_tax_type_id: taxIdDomesticVoid,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_void == "amount" ? values.domestic_void_amount : null,
          percent:values.domestic_void == "amount" ? null : values.domestic_void_percent,
          charge_type_id:values.domestic_void == "amount" ? values.domestic_void_amount_type : null,
          is_tax_inclusive:values.domestic_void == "amount" ? null : values.domestic_void_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_frp: {
          fee_tax_type_id: taxIdDomesticRfp,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_rfp == "amount" ? values.domestic_rfp_amount : null,
          percent:values.domestic_rfp == "amount" ? null : values.domestic_rfp_percent,
          charge_type_id:values.domestic_rfp == "amount" ? values.domestic_rfp_amount_type : null,
          is_tax_inclusive:values.domestic_rfp == "amount" ? null : values.domestic_rfp_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_non_gds: {
          fee_tax_type_id: taxIdDomesticNonGds,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount : null,
          percent:values.domestic_non_gds == "amount" ? null : values.domestic_non_gds_percent,
          charge_type_id:values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount_type : null,
          is_tax_inclusive:values.domestic_non_gds == "amount" ? null : values.domestic_non_gds_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_reissue: {
          fee_tax_type_id: taxIdInternationalReissue,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_reissue == "amount" ? values.international_reissue_amount : null,
          percent:values.international_reissue == "amount" ? null : values.international_reissue_percent,
          charge_type_id:values.international_reissue == "amount" ? values.international_reissue_amount_type : null,
          is_tax_inclusive:values.international_reissue == "amount" ? null : values.international_reissue_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_revalidate: {
          fee_tax_type_id: taxIdInternationalRevalidate,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_revalidate == "amount" ? values.international_revalidate_amount : null,
          percent:values.international_revalidate == "amount" ? null : values.international_revalidate_percent,
          charge_type_id:values.international_revalidate == "amount" ? values.international_revalidate_amount_type : null,
          is_tax_inclusive:values.international_revalidate == "amount" ? null : values.international_revalidate_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_refund: {
          fee_tax_type_id: taxIdInternationalRefund,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_refund == "amount" ? values.international_refund_amount : null,
          percent:values.international_refund == "amount" ? null : values.international_refund_percent,
          charge_type_id:values.international_refund == "amount" ? values.dinternational_refund_amount_type : null,
          is_tax_inclusive:values.international_refund == "amount" ? null : values.international_refund_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_void: {
          fee_tax_type_id: taxIdInternationalVoid,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_void == "amount" ? values.international_void_amount : null,
          percent:values.international_void == "amount" ? null : values.international_void_percent,
          charge_type_id:values.international_void == "amount" ? values.international_void_amount_type : null,
          is_tax_inclusive:values.international_void == "amount" ? null : values.international_void_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_frp: {
          fee_tax_type_id: taxIdInternationalRfp,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_rfp == "amount" ? values.international_rfp_amount : null,
          percent:values.international_rfp == "amount" ? null : values.international_rfp_percent,
          charge_type_id:values.international_rfp == "amount" ? values.international_rfp_amount_type : null,
          is_tax_inclusive:values.international_rfp == "amount" ? null : values.international_rfp_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_non_gds: {
          fee_tax_type_id: taxIdInternationalNonGds,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_non_gds == "amount" ? values.international_non_gds_amount : null,
          percent:values.international_non_gds == "amount" ? null : values.international_non_gds_percent,
          charge_type_id:values.international_non_gds == "amount" ? values.international_non_gds_amount_type : null,
          is_tax_inclusive:values.international_non_gds == "amount" ? null : values.international_non_gds_tax_include,
          is_hidden: true,
          is_included: false,
        },
        other_emergency_service: {
          fee_tax_type_id: taxIdOtherEmergency,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.other_emergency == "amount" ? values.other_emergency_amount : null,
          percent:values.other_emergency == "amount" ? null : values.other_emergency_percent,
          charge_type_id:values.other_emergency == "amount" ? values.other_emergency_amount_type : null,
          is_tax_inclusive:values.other_emergency == "amount" ? null : values.other_emergency_tax_include,
          is_hidden: true,
          is_included: false,
        },
      }
      onSaveFee(payloadDomestic, 1)
  }

  const onSaveFee = async(payload, productTypeCode) => {
    try {
    console.log('payload', payload)
      let res = await api.post(endpointFee + "/"+ productTypeCode, payload)
      console.log(res)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let formatted = {
            processing_fee_category_name: values.processing_fee_category_name,
            description: values.description,
          }
          onSubmit(formatted, values)
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
                <div style={{ padding: "0 2px 2px" }}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      Preset Name
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="processing_fee_category_name">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              isInvalid={
                                form.touched.processing_fee_category_name && form.errors.processing_fee_category_name
                              }
                              minLength={1}
                              maxLength={128}
                              style={{ maxWidth: 300 }}
                              {...field}
                            />
                            {form.touched.processing_fee_category_name &&
                              form.errors.processing_fee_category_name && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.processing_fee_category_name
                                    ? form.errors.processing_fee_category_name
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      Description
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="description">
                        {({ field }) => (
                        <Form.Control
                          as="textarea"
                          style={{ height: "88px", maxWidth: "416px" }}
                        />)}
                      </FastField>
                    </Col>
                  </Form.Group>
                  
                  <FeeTabs
                    menu={[
                      {title: "Domestic", sections: [
                        {
                          title:"Reissue Fee (Reissue & Reroute)",
                          taxType:taxTypeDomesticReissue,
                          fieldFeeTaxId:"domestic_reissue_fee_tax_id",
                          fieldRadio:"domestic_reissue",
                          fieldAmount:"domestic_reissue_amount",
                          fieldAmountType:"domestic_reissue_amount_type",
                          fieldPercent:"domestic_reissue_percent",
                          fieldIncludeTax:"domestic_reissue_tax_include"
                        },
                        {
                          title:"Revalidate Fee",
                          taxType:taxTypeDomesticRevalidate,
                          fieldFeeTaxId:"domestic_revalidate_fee_tax_id",
                          fieldRadio:"domestic_revalidate",
                          fieldAmount:"domestic_revalidate_amount",
                          fieldAmountType:"domestic_revalidate_amount_type",
                          fieldPercent:"domestic_revalidate_percent",
                          fieldIncludeTax:"domestic_revalidate_tax_include"
                        },
                        {
                          title:"Refund Fee",
                          taxType:taxTypeDomesticRefund,
                          fieldFeeTaxId:"domestic_refund_fee_tax_id",
                          fieldRadio:"domestic_refund",
                          fieldAmount:"domestic_refund_amount",
                          fieldAmountType:"domestic_refund_amount_type",
                          fieldPercent:"domestic_refund_percent",
                          fieldIncludeTax:"domestic_refund_tax_include"
                        },
                        {
                          title:"Void Fee (Same Day)",
                          taxType:taxTypeDomesticVoid,
                          fieldFeeTaxId:"domestic_void_fee_tax_id",
                          fieldRadio:"domestic_void",
                          fieldAmount:"domestic_void_amount",
                          fieldAmountType:"domestic_void_amount_type",
                          fieldPercent:"domestic_void_percent",
                          fieldIncludeTax:"domestic_void_tax_include"
                        },
                        {
                          title:"RFP Fee (Contact Fee)",
                          taxType:taxTypeDomesticRfp,
                          fieldFeeTaxId:"domestic_rfp_fee_tax_id",
                          fieldRadio:"domestic_rfp",
                          fieldAmount:"domestic_rfp_amount",
                          fieldAmountType:"domestic_rfp_amount_type",
                          fieldPercent:"domestic_rfp_percent",
                          fieldIncludeTax:"domestic_rfp_tax_include"
                        },
                        {
                          title:"Non-GDS Hotel Booking Process Fee",
                          taxType:taxTypeDomesticNonGds,
                          fieldFeeTaxId:"domestic_non_gds_fee_tax_id",
                          fieldRadio:"domestic_non_gds",
                          fieldAmount:"domestic_non_gds_amount",
                          fieldAmountType:"domestic_non_gds_amount_type",
                          fieldPercent:"domestic_non_gds_percent",
                          fieldIncludeTax:"domestic_non_gds_tax_include"
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"Reissue Fee (Reissue & Reroute)",
                          taxType:taxTypeInternationalReissue,
                          fieldFeeTaxId:"international_reissue_fee_tax_id",
                          fieldRadio:"international_reissue",
                          fieldAmount:"international_reissue_amount",
                          fieldAmountType:"international_reissue_amount_type",
                          fieldPercent:"international_reissue_percent",
                          fieldIncludeTax:"international_reissue_tax_include"
                        },
                        {
                          title:"Revalidate Fee",
                          taxType:taxTypeInternationalRevalidate,
                          fieldFeeTaxId:"international_revalidate_fee_tax_id",
                          fieldRadio:"international_revalidate",
                          fieldAmount:"international_revalidate_amount",
                          fieldAmountType:"international_revalidate_amount_type",
                          fieldPercent:"international_revalidate_percent",
                          fieldIncludeTax:"international_revalidate_tax_include"
                        },
                        {
                          title:"Refund Fee",
                          taxType:taxTypeInternationalRefund,
                          fieldFeeTaxId:"international_refund_fee_tax_id",
                          fieldRadio:"international_refund",
                          fieldAmount:"international_refund_amount",
                          fieldAmountType:"international_refund_amount_type",
                          fieldPercent:"international_refund_percent",
                          fieldIncludeTax:"international_refund_tax_include"
                        },
                        {
                          title:"Void Fee (Same Day)",
                          taxType:taxTypeInternationalVoid,
                          fieldFeeTaxId:"international_void_fee_tax_id",
                          fieldRadio:"international_void",
                          fieldAmount:"international_void_amount",
                          fieldAmountType:"international_void_amount_type",
                          fieldPercent:"international_void_percent",
                          fieldIncludeTax:"international_void_tax_include"
                        },
                        {
                          title:"RFP Fee (Contact Fee)",
                          taxType:taxTypeInternationalRfp,
                          fieldFeeTaxId:"international_rfp_fee_tax_id",
                          fieldRadio:"international_rfp",
                          fieldAmount:"international_rfp_amount",
                          fieldAmountType:"international_rfp_amount_type",
                          fieldPercent:"international_rfp_percent",
                          fieldIncludeTax:"international_rfp_tax_include"
                        },
                        {
                          title:"Non-GDS Hotel Booking Process Fee",
                          taxType:taxTypeInternationalNonGds,
                          fieldFeeTaxId:"international_non_gds_fee_tax_id",
                          fieldRadio:"international_non_gds",
                          fieldAmount:"international_non_gds_amount",
                          fieldAmountType:"international_non_gds_amount_type",
                          fieldPercent:"international_non_gds_percent",
                          fieldIncludeTax:"international_non_gds_tax_include"
                        }
                      ]},
                      {title: "Other", sections: 
                        [{
                          title:"Emergency Service Assistance 24 Hours Surcharge - Issued Only",
                          taxType:taxTypeOtherEmergency,
                          fieldFeeTaxId:"other_emergency_fee_tax_id",
                          fieldRadio:"other_emergency",
                          fieldAmount:"other_emergency_amount",
                          fieldAmountType:"other_emergency_amount_type",
                          fieldPercent:"other_emergency_percent",
                          fieldIncludeTax:"other_emergency_tax_include"
                        }]
                      },
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button variant="secondary" onClick={() => history.goBack()}>
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default withRouter(FlightForm)
