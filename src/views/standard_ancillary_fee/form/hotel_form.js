import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import { Card, Form, Row, Col, Button, Modal } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"

import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Api from "config/api"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { FeeTabs } from "./fee_tabs"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

const endpoint = "/master/agent-processing-fee-categories/2"
const endpointFee = "/master/agent-processing-fee-categories"
const backUrl = "/master/standard-ancillary-fee"
const options = {
  position: "bottom-right",
}
const HotelForm = (props) => {
  const history = useHistory()
  const [openSnackbar] = useSnackbar(options)
  let dispatch = useDispatch()
  let api = new Api()
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

  const [taxTypeDomesticHotel, setTaxTypeDomesticHotel] = useState([])
  const [taxTypeDomesticNonGds, setTaxTypeDomesticNonGds] = useState([])
  const [taxTypeDomesticRefund, setTaxTypeDomesticRefund] = useState([])
  const [taxTypeDomesticRfp, setTaxTypeDomesticRfp] = useState([])
  const [taxTypeInternationalHotel, setTaxTypeInternationalHotel] = useState([])
  const [taxTypeInternationalNonGds, setTaxTypeInternationalNonGds] = useState([])
  const [taxTypeInternationalRefund, setTaxTypeInternationalRefund] = useState([])
  const [taxTypeInternationalFrp, setTaxTypeInternationalFrp] = useState([])
  const [taxTypeOtherEmergency, setTaxTypeOtherEmergency] = useState([])
  
  const [taxIdDomesticHotel, setTaxIdDomesticHotel] = useState("")
  const [taxIdDomesticNonGds, setTaxIdDomesticNonGds] = useState("")
  const [taxIdDomesticRefund, setTaxIdDomesticRefund] = useState("")
  const [taxIdDomesticRfp, setTaxIdDomesticRfp] = useState("")
  const [taxIdInternationalHotel, setTaxIdInternationalHotel] = useState("")
  const [taxIdInternationalNonGds, setTaxIdInternationalNonGds] = useState("")
  const [taxIdInternationalRefund, setTaxIdInternationalRefund] = useState("")
  const [taxIdInternationalFrp, setTaxIdInternationalFrp] = useState("")
  const [taxIdOtherEmergency, setTaxIdOtherEmergency] = useState("")
  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    let docTitle = "Edit Hotel Standard Ancillary Fee"
    if (!formId) {
      docTitle = "Create Hotel Standard Ancillary Fee"
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
    getFeeTaxType("43", setTaxTypeDomesticHotel, setTaxIdDomesticHotel)
    getFeeTaxType("45", setTaxTypeDomesticRefund, setTaxIdDomesticRefund)
    getFeeTaxType("39", setTaxTypeDomesticRfp, setTaxIdDomesticRfp)
    getFeeTaxType("47", setTaxTypeDomesticNonGds, setTaxIdDomesticNonGds)
    getFeeTaxType("44", setTaxTypeInternationalHotel, setTaxIdInternationalHotel)
    getFeeTaxType("46", setTaxTypeInternationalRefund, setTaxIdInternationalRefund)
    getFeeTaxType("40", setTaxTypeInternationalFrp, setTaxIdInternationalFrp)
    getFeeTaxType("48", setTaxTypeInternationalNonGds, setTaxIdInternationalNonGds)
    getFeeTaxType("6", setTaxTypeOtherEmergency, setTaxIdOtherEmergency)
  }, [props.match.params.id])

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    processing_fee_category_name: "",
    description: "",
    domestic_hotel: "",
    domestic_hotel_fee_tax_id: "",
    domestic_hotel_amount: "",
    domestic_hotel_amount_type: "",
    domestic_hotel_percent: "",
    domestic_hotel_tax_include: false,
    domestic_refund: "",
    domestic_refund_fee_tax_id: "",
    domestic_refund_amount: "",
    domestic_refund_amount_type: "",
    domestic_refund_percent: "",
    domestic_refund_tax_include: false,
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
    international_hotel: "",
    international_hotel_fee_tax_id: "",
    international_hotel_amount: "",
    international_hotel_amount_type: "",
    international_hotel_percent: "",
    international_hotel_tax_include: false,
    international_refund: "",
    international_refund_fee_tax_id: "",
    international_refund_amount: "",
    international_refund_amount_type: "",
    international_refund_percent: "",
    international_refund_tax_include: false,
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
    domestic_hotel: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticHotel.fee_tax_type_name}.`),
    domestic_hotel_amount: Yup
      .string().when('domestic_hotel', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticHotel.fee_tax_type_name}.`)
      }),
    domestic_hotel_amount_type: Yup
      .string().when('domestic_hotel', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_hotel_percent: Yup
      .string().when('domestic_hotel', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticHotel.fee_tax_type_name}.`)
      }),
    domestic_refund: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticRefund.fee_tax_type_name}.`),
    domestic_refund_amount: Yup
      .string().when('domestic_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticRefund.fee_tax_type_name}.`)
      }),
    domestic_refund_amount_type: Yup
      .string().when('domestic_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_refund_percent: Yup
      .string().when('domestic_refund', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticRefund.fee_tax_type_name}.`)
      }),
    domestic_frp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticRfp.fee_tax_type_name}.`),
    domestic_frp_amount: Yup
      .string().when('domestic_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticRfp.fee_tax_type_name}.`)
      }),
    domestic_frp_amount_type: Yup
      .string().when('domestic_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_frp_percent: Yup
      .string().when('domestic_frp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticRfp.fee_tax_type_name}.`)
      }),
    domestic_non_gds: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticNonGds.fee_tax_type_name}.`),
    domestic_non_gds_amount: Yup
      .string().when('domestic_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticNonGds.fee_tax_type_name}.`)
      }),
    domestic_non_gds_amount_type: Yup
      .string().when('domestic_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_non_gds_percent: Yup
      .string().when('domestic_non_gds', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticNonGds.fee_tax_type_name}.`)
      }),
    international_hotel: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalHotel.fee_tax_type_name}.`),
    international_hotel_amount: Yup
      .string().when('international_hotel', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalHotel.fee_tax_type_name}.`)
      }),
    international_hotel_amount_type: Yup
      .string().when('international_hotel', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_hotel_percent: Yup
      .string().when('international_hotel', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalHotel.fee_tax_type_name}.`)
      }),
    international_refund: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalRefund.fee_tax_type_name}.`),
    international_refund_amount: Yup
      .string().when('international_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalRefund.fee_tax_type_name}.`)
      }),
    international_refund_amount_type: Yup
      .string().when('international_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_refund_percent: Yup
      .string().when('international_refund', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalRefund.fee_tax_type_name}.`)
      }),
    international_frp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxIdInternationalFrp.fee_tax_type_name}.`),
    international_frp_amount: Yup
      .string().when('international_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxIdInternationalFrp.fee_tax_type_name}.`)
      }),
    international_frp_amount_type: Yup
      .string().when('international_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_frp_percent: Yup
      .string().when('international_frp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxIdInternationalFrp.fee_tax_type_name}.`)
      }),
    international_non_gds: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalNonGds.fee_tax_type_name}.`),
    international_non_gds_amount: Yup
      .string().when('international_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalNonGds.fee_tax_type_name}.`)
      }),
    international_non_gds_amount_type: Yup
      .string().when('international_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_non_gds_percent: Yup
      .string().when('international_non_gds', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalNonGds.fee_tax_type_name}.`)
      }),
    other_emergency: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeOtherEmergency.fee_tax_type_name}.`),
    other_emergency_amount: Yup
      .string().when('other_emergency', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeOtherEmergency.fee_tax_type_name}.`)
      }),
    other_emergency_amount_type: Yup
      .string().when('other_emergency', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    other_emergency_percent: Yup
      .string().when('other_emergency', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeOtherEmergency.fee_tax_type_name}.`)
      }),
  })

  const checkprocessingType = (value) => value !== "00000000-0000-0000-0000-000000000000" ? "amount" : "percent"
  const checkChargeType = value => value === "00000000-0000-0000-0000-000000000000" ? "" : value

  useEffect(async() => {
    try {
      if(formId) {
        let {data} = await api.get(endpoint + "/" + formId)
        setInitialForm({
          ...initialForm, 
          ...data,
          domestic_hotel: checkprocessingType(data.domestic_reissue.charge_type_id),
          domestic_hotel_fee_tax_id: data.domestic_reissue.fee_tax_type_id,
          domestic_hotel_amount: data.domestic_reissue.amount,
          domestic_hotel_amount_type: checkChargeType(data.domestic_reissue.charge_type_id),
          domestic_hotel_percent: data.domestic_reissue.percent,
          domestic_hotel_tax_include: data.domestic_reissue.is_tax_inclusive,
          domestic_refund: checkprocessingType(data.domestic_refund.charge_type_id),
          domestic_refund_fee_tax_id: data.domestic_refund.fee_tax_type_id,
          domestic_refund_amount: data.domestic_refund.amount,
          domestic_refund_amount_type: checkChargeType(data.domestic_refund.charge_type_id),
          domestic_refund_percent: data.domestic_refund.percent,
          domestic_refund_tax_include: data.domestic_refund.is_tax_inclusive,
          domestic_frp: checkprocessingType(data.domestic_frp.charge_type_id),
          domestic_frp_fee_tax_id: data.domestic_frp.fee_tax_type_id,
          domestic_frp_amount: data.domestic_frp.amount,
          domestic_frp_amount_type: checkChargeType(data.domestic_frp.charge_type_id),
          domestic_frp_percent: data.domestic_frp.percent,
          domestic_frp_tax_include: data.domestic_frp.is_tax_inclusive,
          domestic_non_gds: checkprocessingType(data.domestic_non_gds.charge_type_id),
          domestic_non_gds_fee_tax_id: data.domestic_non_gds.fee_tax_type_id,
          domestic_non_gds_amount: data.domestic_non_gds.amount,
          domestic_non_gds_amount_type: checkChargeType(data.domestic_non_gds.charge_type_id),
          domestic_non_gds_percent: data.domestic_non_gds.percent,
          domestic_non_gds_tax_include: data.domestic_non_gds.is_tax_inclusive,
          international_hotel: checkprocessingType(data.international_reissue.charge_type_id),
          international_hotel_fee_tax_id: data.international_reissue.fee_tax_type_id,
          international_hotel_amount: data.international_reissue.amount,
          international_hotel_amount_type: checkChargeType(data.international_reissue.charge_type_id),
          international_hotel_percent: data.international_reissue.percent,
          international_hotel_tax_include: data.international_reissue.is_tax_inclusive,
          international_refund: checkprocessingType(data.international_refund.charge_type_id),
          international_refund_fee_tax_id: data.international_refund.fee_tax_type_id,
          international_refund_amount: data.international_refund.amount,
          international_refund_amount_type: checkChargeType(data.international_refund.charge_type_id),
          international_refund_percent: data.international_refund.percent,
          international_refund_tax_include: data.international_refund.is_tax_inclusive,
          international_frp: checkprocessingType(data.international_frp.charge_type_id),
          international_frp_fee_tax_id: data.international_frp.fee_tax_type_id,
          international_frp_amount: data.international_frp.amount,
          international_frp_amount_type: checkChargeType(data.international_frp.charge_type_id),
          international_frp_percent: data.international_frp.percent,
          international_frp_tax_include: data.international_frp.is_tax_inclusive,
          international_non_gds: checkprocessingType(data.international_non_gds.charge_type_id),
          international_non_gds_fee_tax_id: data.international_non_gds.fee_tax_type_id,
          international_non_gds_amount: data.international_non_gds.amount,
          international_non_gds_amount_type: checkChargeType(data.international_non_gds.charge_type_id),
          international_non_gds_percent: data.international_non_gds.percent,
          international_non_gds_tax_include: data.international_non_gds.is_tax_inclusive,
          other_emergency: checkprocessingType(data.other_emergency_service.charge_type_id),
          other_emergency_fee_tax_id: data.other_emergency_service.fee_tax_type_id,
          other_emergency_amount: data.other_emergency_service.amount,
          other_emergency_amount_type: checkChargeType(data.other_emergency_service.charge_type_id),
          other_emergency_percent: data.other_emergency_service.percent,
          other_emergency_tax_include: data.other_emergency_service.is_tax_inclusive
          
        })
      }
    } catch (e) { console.log(e) }
  }, [])

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

  const onSubmit = async(values) => {
    try {
      let payload = setPayload(values)
      let res = await api.putOrPost(endpoint, formId, payload)
      openSnackbar(
        `Ancillary Fee has been successfully ${formId ? 'updated' : 'saved'}.`,
      )
        history.replace(backUrl)
    } catch(e) {
      openSnackbar(
        `Failed save record`,
      )
      console.log(e)
    }
  }  

  const removeSeparator = (value) => {
    value = value.toString().split(",").join("")
    return parseInt(value)
  }

  const setPayload = (values) => {
      let payloadDomestic = {
        processing_fee_category_name: values.processing_fee_category_name,
        description: values.description,
        domestic_reissue: {
          fee_tax_type_id: taxIdDomesticHotel,
          amount: values.domestic_hotel == "amount" ? removeSeparator(values.domestic_hotel_amount) : 0,
          percent:values.domestic_hotel == "amount" ? 0 : parseFloat(values.domestic_hotel_percent),
          charge_type_id:values.domestic_hotel == "amount" ? values.domestic_hotel_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_hotel == "amount" ? false : values.domestic_hotel_tax_include,
        },
        domestic_refund: {
          fee_tax_type_id: taxIdDomesticRefund,
          amount: values.domestic_refund == "amount" ? removeSeparator(values.domestic_refund_amount) : 0,
          percent:values.domestic_refund == "amount" ? 0 : parseFloat(values.domestic_refund_percent),
          charge_type_id:values.domestic_refund == "amount" ? values.domestic_refund_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_refund == "amount" ? false : values.domestic_refund_tax_include,
        },
        domestic_frp: {
          fee_tax_type_id: taxIdDomesticRfp,
          amount: values.domestic_frp == "amount" ? removeSeparator(values.domestic_frp_amount) : 0,
          percent:values.domestic_frp == "amount" ? 0 : parseFloat(values.domestic_frp_percent),
          charge_type_id:values.domestic_frp == "amount" ? values.domestic_frp_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_frp == "amount" ? false : values.domestic_frp_tax_include,
        },
        domestic_non_gds: {
          fee_tax_type_id: taxIdDomesticNonGds,
          amount: values.domestic_non_gds == "amount" ? removeSeparator(values.domestic_non_gds_amount) : 0,
          percent:values.domestic_non_gds == "amount" ? 0 : parseFloat(values.domestic_non_gds_percent),
          charge_type_id:values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_non_gds == "amount" ? false : values.domestic_non_gds_tax_include,
        },
        international_reissue: {
          fee_tax_type_id: taxIdInternationalHotel,
          amount: values.international_hotel == "amount" ? removeSeparator(values.international_hotel_amount) : 0,
          percent:values.international_hotel == "amount" ? 0 : parseFloat(values.international_hotel_percent),
          charge_type_id:values.international_hotel == "amount" ? values.international_hotel_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_hotel == "amount" ? false : values.international_hotel_tax_include,
        },
        international_refund: {
          fee_tax_type_id: taxIdInternationalRefund,
          amount: values.international_refund == "amount" ? removeSeparator(values.international_refund_amount) : 0,
          percent:values.international_refund == "amount" ? 0 : parseFloat(values.international_refund_percent),
          charge_type_id:values.international_refund == "amount" ? values.international_refund_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_refund == "amount" ? false : values.international_refund_tax_include,
        },
        international_frp: {
          fee_tax_type_id: taxIdInternationalFrp,
          amount: values.international_frp == "amount" ? removeSeparator(values.international_frp_amount) : 0,
          percent:values.international_frp == "amount" ? 0 : parseFloat(values.international_frp_percent),
          charge_type_id:values.international_frp == "amount" ? values.international_frp_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_frp == "amount" ? false : values.international_frp_tax_include,
        },
        international_non_gds: {
          fee_tax_type_id: taxIdInternationalNonGds,
          amount: values.international_non_gds == "amount" ? removeSeparator(values.international_non_gds_amount) : 0,
          percent:values.international_non_gds == "amount" ? 0 : parseFloat(values.international_non_gds_percent),
          charge_type_id:values.international_non_gds == "amount" ? values.international_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_non_gds == "amount" ? false : values.international_non_gds_tax_include,
        },
        other_emergency_service: {
          fee_tax_type_id: taxIdOtherEmergency,
          amount: values.other_emergency == "amount" ? removeSeparator(values.other_emergency_amount) : 0,
          percent:values.other_emergency == "amount" ? 0 : parseFloat(values.other_emergency_percent),
          charge_type_id:values.other_emergency == "amount" ? values.other_emergency_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.other_emergency == "amount" ? false : values.other_emergency_tax_include,
        },
      }

      return payloadDomestic
  }

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          onSubmit(values)
          console.log(values, "hahahaiihii")
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
                          title:"Domestic Modify Hotel Fee",
                          taxType:taxTypeDomesticHotel,
                          fieldFeeTaxId:"domestic_hotel_fee_tax_id",
                          fieldRadio:"domestic_hotel",
                          fieldAmount:"domestic_hotel_amount",
                          fieldAmountType:"domestic_hotel_amount_type",
                          fieldPercent:"domestic_hotel_percent",
                          fieldIncludeTax:"domestic_hotel_tax_include"
                        },
                        {
                          title:"Domestic Hotel Refund Fee",
                          taxType:taxTypeDomesticRefund,
                          fieldFeeTaxId:"domestic_refund_fee_tax_id",
                          fieldRadio:"domestic_refund",
                          fieldAmount:"domestic_refund_amount",
                          fieldAmountType:"domestic_refund_amount_type",
                          fieldPercent:"domestic_refund_percent",
                          fieldIncludeTax:"domestic_refund_tax_include"
                        },
                        {
                          title:"Domestic RFP Fee (Contact Fee)",
                          taxType:taxTypeDomesticRfp,
                          fieldFeeTaxId:"domestic_frp_fee_tax_id",
                          fieldRadio:"domestic_frp",
                          fieldAmount:"domestic_frp_amount",
                          fieldAmountType:"domestic_frp_amount_type",
                          fieldPercent:"domestic_frp_percent",
                          fieldIncludeTax:"domestic_frp_tax_include"
                        },
                        {
                          title:"Domestic Non-GDS Hotel Booking Process Fee",
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
                          title:"International Modify Hotel Fee",
                          taxType:taxTypeInternationalHotel,
                          fieldFeeTaxId:"international_hotel_fee_tax_id",
                          fieldRadio:"international_hotel",
                          fieldAmount:"international_hotel_amount",
                          fieldAmountType:"international_hotel_amount_type",
                          fieldPercent:"international_hotel_percent",
                          fieldIncludeTax:"international_hotel_tax_include"
                        },
                        {
                          title:"International Hotel Refund Fee",
                          taxType:taxTypeInternationalRefund,
                          fieldFeeTaxId:"international_refund_fee_tax_id",
                          fieldRadio:"international_refund",
                          fieldAmount:"international_refund_amount",
                          fieldAmountType:"international_refund_amount_type",
                          fieldPercent:"international_refund_percent",
                          fieldIncludeTax:"international_refund_tax_include"
                        },
                        {
                          title:"International RFP Fee (Contact Fee)",
                          taxType:taxTypeInternationalFrp,
                          fieldFeeTaxId:"international_frp_fee_tax_id",
                          fieldRadio:"international_frp",
                          fieldAmount:"international_frp_amount",
                          fieldAmountType:"international_frp_amount_type",
                          fieldPercent:"international_frp_percent",
                          fieldIncludeTax:"international_frp_tax_include"
                        },
                        {
                          title:"International Non-GDS Hotel Booking Process Fee",
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
                      {
                        label:"/Room Night", value:"b95094b2-0883-4e03-8e67-ceb32314b332"},
                      {
                        label:"/Room", value:"02103ce7-ecfe-446e-baa1-cb3c6d982fe9"},
                      {
                        label:"/Transaction", value:"5123b121-4f6a-4871-bef1-65408d663e19"},
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

export default withRouter(HotelForm)
