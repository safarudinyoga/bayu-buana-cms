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
import useQuery from "lib/query"

const endpoint = "/master/agent-processing-fee-categories/1"
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
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

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
    domestic_refund: "",
    domestic_refund_fee_tax_id: "",
    domestic_refund_amount: "",
    domestic_refund_amount_type: "",
    domestic_refund_percent: "",
    domestic_refund_tax_include: false,
    domestic_void: "",
    domestic_void_fee_tax_id: "",
    domestic_void_amount: "",
    domestic_void_amount_type: "",
    domestic_void_percent: "",
    domestic_void_tax_include: false,
    domestic_frp: "",
    domestic_frp_fee_tax_id: "",
    domestic_frp_amount: "",
    domestic_frp_amount_type: "",
    domestic_frp_percent: "",
    domestic_frp_tax_include: false,
    domestic_non_gds: "",
    domestic_non_gds_fee_tax_id: "",
    domestic_non_gds_amount: "",
    domestic_non_gds_amount_type: "",
    domestic_non_gds_percent: "",
    domestic_non_gds_tax_include: false,
    international_reissue: "",
    international_reissue_fee_tax_id: "",
    international_reissue_amount: "",
    international_reissue_amount_type: "",
    international_reissue_percent: "",
    international_reissue_tax_include: false,
    international_revalidate: "",
    international_revalidate_fee_tax_id: "",
    international_revalidate_amount: "",
    international_revalidate_amount_type: "",
    international_revalidate_percent: "",
    international_revalidate_tax_include: false,
    international_refund: "",
    international_refund_fee_tax_id: "",
    international_refund_amount: "",
    international_refund_amount_type: "",
    international_refund_percent: "",
    international_refund_tax_include: false,
    international_void: "",
    international_void_fee_tax_id: "",
    international_void_amount: "",
    international_void_amount_type: "",
    international_void_percent: "",
    international_void_tax_include: false,
    international_frp: "",
    international_frp_fee_tax_id: "",
    international_frp_amount: "",
    international_frp_amount_type: "",
    international_frp_percent: "",
    international_frp_tax_include: false,
    international_non_gds: "",
    international_non_gds_fee_tax_id: "",
    international_non_gds_amount: "",
    international_non_gds_amount_type: "",
    international_non_gds_percent: "",
    international_non_gds_tax_include: false,
    other_emergency: "",
    other_emergency_fee_tax_id: "",
    other_emergency_amount: "",
    other_emergency_amount_type: "",
    other_emergency_percent: "",
    other_emergency_tax_include: false
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    processing_fee_category_name: Yup.string().required("Please enter Preset Name."),
  })

  const checkprocessingType = (value) => value !== "00000000-0000-0000-0000-000000000000" ? "amount" : "percent"

  useEffect(async() => {
    try {
      if(formId) {
        let {data} = await api.get(endpointFee+ "/1/" + formId)
        setInitialForm({
          ...initialForm, 
          ...data,
          domestic_reissue: checkprocessingType(data.domestic_reissue.charge_type_id),
          domestic_reissue_fee_tax_id: data.domestic_reissue.fee_tax_type_id,
          domestic_reissue_amount: data.domestic_reissue.amount,
          domestic_reissue_amount_type: data.domestic_reissue.charge_type_id,
          domestic_reissue_percent: data.domestic_reissue.percent,
          domestic_reissue_tax_include: data.domestic_reissue.is_tax_inclusive,
          domestic_revalidate: checkprocessingType(data.domestic_revalidate.charge_type_id),
          domestic_revalidate_fee_tax_id: data.domestic_revalidate.fee_tax_type_id,
          domestic_revalidate_amount: data.domestic_revalidate.amount,
          domestic_revalidate_amount_type: data.domestic_revalidate.charge_type_id,
          domestic_revalidate_percent: data.domestic_revalidate.percent,
          domestic_revalidate_tax_include: data.domestic_revalidate.is_tax_inclusive,
          domestic_refund: checkprocessingType(data.domestic_refund.charge_type_id),
          domestic_refund_fee_tax_id: data.domestic_refund.fee_tax_type_id,
          domestic_refund_amount: data.domestic_refund.amount,
          domestic_refund_amount_type: data.domestic_refund.charge_type_id,
          domestic_refund_percent: data.domestic_refund.percent,
          domestic_refund_tax_include: data.domestic_refund.is_tax_inclusive,
          domestic_void: checkprocessingType(data.domestic_void.charge_type_id),
          domestic_void_fee_tax_id: data.domestic_void.fee_tax_type_id,
          domestic_void_amount: data.domestic_void.amount,
          domestic_void_amount_type: data.domestic_void.charge_type_id,
          domestic_void_percent: data.domestic_void.percent,
          domestic_void_tax_include: data.domestic_void.is_tax_inclusive,
          domestic_frp: checkprocessingType(data.domestic_frp.charge_type_id),
          domestic_frp_fee_tax_id: data.domestic_frp.fee_tax_type_id,
          domestic_frp_amount: data.domestic_frp.amount,
          domestic_frp_amount_type: data.domestic_frp.charge_type_id,
          domestic_frp_percent: data.domestic_frp.percent,
          domestic_frp_tax_include: data.domestic_frp.is_tax_inclusive,
          domestic_non_gds: checkprocessingType(data.domestic_non_gds.charge_type_id),
          domestic_non_gds_fee_tax_id: data.domestic_non_gds.fee_tax_type_id,
          domestic_non_gds_amount: data.domestic_non_gds.amount,
          domestic_non_gds_amount_type: data.domestic_non_gds.charge_type_id,
          domestic_non_gds_percent: data.domestic_non_gds.percent,
          domestic_non_gds_tax_include: data.domestic_non_gds.is_tax_inclusive,
          international_reissue: checkprocessingType(data.international_reissue.charge_type_id),
          international_reissue_fee_tax_id: data.international_reissue.fee_tax_type_id,
          international_reissue_amount: data.international_reissue.amount,
          international_reissue_amount_type: data.international_reissue.charge_type_id,
          international_reissue_percent: data.international_reissue.percent,
          international_reissue_tax_include: data.international_reissue.is_tax_inclusive,
          international_revalidate: checkprocessingType(data.international_revalidate.charge_type_id),
          international_revalidate_fee_tax_id: data.international_revalidate.fee_tax_type_id,
          international_revalidate_amount: data.international_revalidate.amount,
          international_revalidate_amount_type: data.international_revalidate.charge_type_id,
          international_revalidate_percent: data.international_revalidate.percent,
          international_revalidate_tax_include: data.international_revalidate.is_tax_inclusive,
          international_refund: checkprocessingType(data.international_refund.charge_type_id),
          international_refund_fee_tax_id: data.international_refund.fee_tax_type_id,
          international_refund_amount: data.international_refund.amount,
          international_refund_amount_type: data.international_refund.charge_type_id,
          international_refund_percent: data.international_refund.percent,
          international_refund_tax_include: data.international_refund.is_tax_inclusive,
          international_void: checkprocessingType(data.international_void.charge_type_id),
          international_void_fee_tax_id: data.international_void.fee_tax_type_id,
          international_void_amount: data.international_void.amount,
          international_void_amount_type: data.international_void.charge_type_id,
          international_void_percent: data.international_void.percent,
          international_void_tax_include: data.international_void.is_tax_inclusive,
          international_frp: checkprocessingType(data.international_frp.charge_type_id),
          international_frp_fee_tax_id: data.international_frp.fee_tax_type_id,
          international_frp_amount: data.international_frp.amount,
          international_frp_amount_type: data.international_frp.charge_type_id,
          international_frp_percent: data.international_frp.percent,
          international_frp_tax_include: data.international_frp.is_tax_inclusive,
          international_non_gds: checkprocessingType(data.international_non_gds.charge_type_id),
          international_non_gds_fee_tax_id: data.international_non_gds.fee_tax_type_id,
          international_non_gds_amount: data.international_non_gds.amount,
          international_non_gds_amount_type: data.international_non_gds.charge_type_id,
          international_non_gds_percent: data.international_non_gds.percent,
          international_non_gds_tax_include: data.international_non_gds.is_tax_inclusive,
          other_emergency: checkprocessingType(data.other_emergency_service.charge_type_id),
          other_emergency_fee_tax_id: data.other_emergency_service.fee_tax_type_id,
          other_emergency_amount: data.other_emergency_service.amount,
          other_emergency_amount_type: data.other_emergency_service.charge_type_id,
          other_emergency_percent: data.other_emergency_service.percent,
          other_emergency_tax_include: data.other_emergency_service.is_tax_inclusive
        })
      }
    } catch (e) { console.log(e) }
  }, [])

  const setPayload = (values) => {
    let payloadDomestic = {
      description: values.description,
      processing_fee_category_name: values.processing_fee_category_name,
      domestic_reissue: {
        fee_tax_type_id: taxIdDomesticReissue,
        amount: values.domestic_reissue == "amount" ? values.domestic_reissue_amount : 0,
        percent:values.domestic_reissue == "amount" ? 0 : parseFloat(values.domestic_reissue_percent),
        charge_type_id:values.domestic_reissue == "amount" ? values.domestic_reissue_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_reissue == "amount" ? false : values.domestic_reissue_tax_include,
        
      },
      domestic_revalidate: {
        fee_tax_type_id: taxIdDomesticRevalidate,
        amount: values.domestic_revalidate == "amount" ? values.domestic_revalidate_amount : 0,
        percent:values.domestic_revalidate == "amount" ? 0 : parseFloat(values.domestic_revalidate_percent),
        charge_type_id:values.domestic_revalidate == "amount" ? values.domestic_revalidate_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_revalidate == "amount" ? false : values.domestic_revalidate_tax_include,
        
      },
      domestic_refund: {
        fee_tax_type_id: taxIdDomesticRefund,
        amount: values.domestic_refund == "amount" ? values.domestic_refund_amount : 0,
        percent:values.domestic_refund == "amount" ? 0 : parseFloat(values.domestic_refund_percent),
        charge_type_id:values.domestic_refund == "amount" ? values.domestic_refund_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_refund == "amount" ? false : values.domestic_refund_tax_include,
        
      },
      domestic_void: {
        fee_tax_type_id: taxIdDomesticVoid,
        amount: values.domestic_void == "amount" ? values.domestic_void_amount : 0,
        percent:values.domestic_void == "amount" ? 0 : parseFloat(values.domestic_void_percent),
        charge_type_id:values.domestic_void == "amount" ? values.domestic_void_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_void == "amount" ? false : values.domestic_void_tax_include,
        
      },
      domestic_frp: {
        fee_tax_type_id: taxIdDomesticRfp,
        amount: values.domestic_frp == "amount" ? values.domestic_frp_amount : 0,
        percent:values.domestic_frp == "amount" ? 0 : parseFloat(values.domestic_frp_percent),
        charge_type_id:values.domestic_frp == "amount" ? values.domestic_frp_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_frp == "amount" ? false : values.domestic_frp_tax_include,
        
      },
      domestic_non_gds: {
        fee_tax_type_id: taxIdDomesticNonGds,
        amount: values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount : 0,
        percent:values.domestic_non_gds == "amount" ? 0 : parseFloat(values.domestic_non_gds_percent),
        charge_type_id:values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_non_gds == "amount" ? false : values.domestic_non_gds_tax_include,
        
      },
      international_reissue: {
        fee_tax_type_id: taxIdInternationalReissue,
        amount: values.international_reissue == "amount" ? values.international_reissue_amount : 0,
        percent:values.international_reissue == "amount" ? 0 : parseFloat(values.international_reissue_percent),
        charge_type_id:values.international_reissue == "amount" ? values.international_reissue_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_reissue == "amount" ? false : values.international_reissue_tax_include,
        
      },
      international_revalidate: {
        fee_tax_type_id: taxIdInternationalRevalidate,
        amount: values.international_revalidate == "amount" ? values.international_revalidate_amount : 0,
        percent:values.international_revalidate == "amount" ? 0 : parseFloat(values.international_revalidate_percent),
        charge_type_id:values.international_revalidate == "amount" ? values.international_revalidate_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_revalidate == "amount" ? false : values.international_revalidate_tax_include,
        
      },
      international_refund: {
        fee_tax_type_id: taxIdInternationalRefund,
        amount: values.international_refund == "amount" ? values.international_refund_amount : 0,
        percent:values.international_refund == "amount" ? 0 : parseFloat(values.international_refund_percent),
        charge_type_id:values.international_refund == "amount" ? values.international_refund_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_refund == "amount" ? false : values.international_refund_tax_include,
        
      },
      international_void: {
        fee_tax_type_id: taxIdInternationalVoid,
        amount: values.international_void == "amount" ? values.international_void_amount : 0,
        percent:values.international_void == "amount" ? 0 : parseFloat(values.international_void_percent),
        charge_type_id:values.international_void == "amount" ? values.international_void_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_void == "amount" ? false : values.international_void_tax_include,
        
      },
      international_frp: {
        fee_tax_type_id: taxIdInternationalRfp,
        amount: values.international_frp == "amount" ? values.international_frp_amount : 0,
        percent:values.international_frp == "amount" ? 0 : parseFloat(values.international_frp_percent),
        charge_type_id:values.international_frp == "amount" ? values.international_frp_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_frp == "amount" ? false : values.international_frp_tax_include,
        
      },
      international_non_gds: {
        fee_tax_type_id: taxIdInternationalNonGds,
        amount: values.international_non_gds == "amount" ? values.international_non_gds_amount : 0,
        percent:values.international_non_gds == "amount" ? 0 : parseFloat(values.international_non_gds_percent),
        charge_type_id:values.international_non_gds == "amount" ? values.international_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_non_gds == "amount" ? false : values.international_non_gds_tax_include,
        
      },
      other_emergency_service: {
        fee_tax_type_id: taxIdOtherEmergency,
        amount: values.other_emergency == "amount" ? values.other_emergency_amount : 0,
        percent:values.other_emergency == "amount" ? 0 : parseFloat(values.other_emergency_percent),
        charge_type_id:values.other_emergency == "amount" ? values.other_emergency_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.other_emergency == "amount" ? false : values.other_emergency_tax_include,
        
      },
    }
    return payloadDomestic
  }

  const onSubmit = async(values) => {
    try {
      let payload = setPayload(values)
      let res = await api.putOrPost(endpoint, formId, payload)
      openSnackbar(
        `Ancillary Fee has been successfully ${formId ? 'updated' : 'saved'}.`,
      )
      history.goBack()
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
                              disabled={isView}
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
                          {...field}
                          as="textarea"
                          disabled={isView}
                          style={{ height: "88px", maxWidth: "416px" }}
                          maxLength="4000"
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
                          fieldFeeTaxId:"domestic_frp_fee_tax_id",
                          fieldRadio:"domestic_frp",
                          fieldAmount:"domestic_frp_amount",
                          fieldAmountType:"domestic_frp_amount_type",
                          fieldPercent:"domestic_frp_percent",
                          fieldIncludeTax:"domestic_frp_tax_include"
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
                          fieldFeeTaxId:"international_frp_fee_tax_id",
                          fieldRadio:"international_frp",
                          fieldAmount:"international_frp_amount",
                          fieldAmountType:"international_frp_amount_type",
                          fieldPercent:"international_frp_percent",
                          fieldIncludeTax:"international_frp_tax_include"
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
                    isView={isView}
                    amountSuffixSelections={[
                      {label:"/Ticket", value:"de62950d-fbab-4e39-bd90-c2b6687c6b36"},
                      {label:"/Person", value:"de03bf84-4bd8-4cdf-9348-00246f04bcad"},
                      {label:"/Transaction", value:"5123b121-4f6a-4871-bef1-65408d663e19"},
                    ]}
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
