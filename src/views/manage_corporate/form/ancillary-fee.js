import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from "react-router"
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { useParams } from "react-router-dom"
import { FeeTabs } from "../../../components/fee_tabs"
// import { setUIParams } from "redux/ui-store"

// components & styles
import Select from "components/form/select"
import BbDataTable from 'components/table/bb-data-table'
import './_form.sass'

// utils
import Api from "config/api"

import { useSnackbar } from "react-simple-snackbar"

const endpoint = "/master/agent-processing-fee-categories/1"
const endpointFee = "/master/agent-processing-fee-categories"

const AncillaryFee = (props) => {
  let api = new Api()
  const formId = ""
  // console.log(props.match, "hahhaa")
  const history = useHistory()
  const options = {
    position: "bottom-right",
  }
  const [openSnackbar] = useSnackbar(options)
  //Flight Type
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
  //Flight ID
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

  //Hotel Type
  const [taxTypeDomesticModifyHotelFee, setTaxTypeDomesticModifyHotelFee] = useState([])
  const [taxTypeDomesticHotelRefund, setTaxTypeDomesticHotelRefund] = useState([])
  const [taxTypeDomesticHotelNonGds, setTaxTypeDomesticHotelNonGds] = useState([])
  const [taxTypeInternationalModifyHotelFee, setTaxTypeInternationalModifyHotelFee] = useState([])
  const [taxTypeInternationalHotelRefund, setTaxTypeInternationalHotelRefund] = useState([])
  const [taxTypeInternationalHotelNonGds, setTaxTypeInternationalHotelNonGds] = useState([])
  const [taxTypeHotelOtherEmergency, setTaxTypeHotelOtherEmergency] = useState([])

  //Hotel ID
  const [taxIdDomesticModifyHotelFee, setTaxIdDomesticModifyHotelFee] = useState([])
  const [taxIdDomesticHotelRefund, setTaxIdDomesticHotelRefund] = useState([])
  const [taxIdDomesticHotelNonGds, setTaxIdDomesticHotelNonGds] = useState([])
  const [taxIdInternationalModifyHotelFee, setTaxIdInternationalModifyHotelFee] = useState([])
  const [taxIdInternationalHotelRefund, setTaxIdInternationalHotelRefund] = useState([])
  const [taxIdInternationalHotelNonGds, setTaxIdInternationalHotelNonGds] = useState([])
  const [taxIdHotelOtherEmergency, setTaxIdHotelOtherEmergency] = useState([])

  const [tabKey, setTabKey] = useState("Domestic")
  useEffect(() => {
    //Flight
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

    //Hotel
    getFeeTaxType("43", setTaxTypeDomesticModifyHotelFee, setTaxIdDomesticModifyHotelFee)
    getFeeTaxType("45", setTaxTypeDomesticHotelRefund, setTaxIdDomesticHotelRefund)
    getFeeTaxType("47", setTaxTypeDomesticHotelNonGds, setTaxIdDomesticHotelNonGds)
    getFeeTaxType("44", setTaxTypeInternationalModifyHotelFee, setTaxIdInternationalModifyHotelFee)
    getFeeTaxType("46", setTaxTypeInternationalHotelRefund, setTaxIdInternationalHotelRefund)
    getFeeTaxType("48", setTaxTypeInternationalHotelNonGds, setTaxIdInternationalHotelNonGds)
    getFeeTaxType("6", setTaxTypeHotelOtherEmergency, setTaxIdHotelOtherEmergency)
  }, [])


  // const { handleSubmit, handleChange, values, errors, touched } = useFormik({
  //   initialValues: {
  //   },
  //   validationSchema: Yup.object({
  //   }),
  //   onSubmit: (val) => {
  //     console.log(val);
  //   }
  // })

  const { id } = useParams()
  // const [key, setKey] = useState('domestic')
  
  const [initialForm, setInitialForm] = useState({
    //Flight
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
    domestic_rfp: "",
    domestic_rfp_fee_tax_id: "",
    domestic_rfp_amount: "",
    domestic_rfp_amount_type: "",
    domestic_rfp_percent: "",
    domestic_rfp_tax_include: false,
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
    international_rfp: "",
    international_rfp_fee_tax_id: "",
    international_rfp_amount: "",
    international_rfp_amount_type: "",
    international_rfp_percent: "",
    international_rfp_tax_include: false,
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
    other_emergency_tax_include: false,

    //Hotel
    domestic_modify_hotel_fee: "",
    domestic_modify_hotel_fee_fee_tax_id: "",
    domestic_modify_hotel_fee_amount: "",
    domestic_modify_hotel_fee_amount_type: "",
    domestic_modify_hotel_fee_percent: "",
    domestic_modify_hotel_fee_tax_include: false,
    domestic_hotel_refund: "",
    domestic_hotel_refund_fee_tax_id: "",
    domestic_hotel_refund_amount: "",
    domestic_hotel_refund_amount_type: "",
    domestic_hotel_refund_percent: "",
    domestic_hotel_refund_tax_include: false,
    domestic_hotel_non_gds: "",
    domestic_hotel_non_gds_fee_tax_id: "",
    domestic_hotel_non_gds_amount: "",
    domestic_hotel_non_gds_amount_type: "",
    domestic_hotel_non_gds_percent: "",
    domestic_hotel_non_gds_tax_include: false,
    international_modify_hotel_fee: "",
    international_modify_hotel_fee_fee_tax_id: "",
    international_modify_hotel_fee_amount: "",
    international_modify_hotel_fee_amount_type: "",
    international_modify_hotel_fee_percent: "",
    international_modify_hotel_fee_tax_include: false,
    international_hotel_refund: "",
    international_hotel_refund_fee_tax_id: "",
    international_hotel_refund_amount: "",
    international_hotel_refund_amount_type: "",
    international_hotel_refund_percent: "",
    international_hotel_refund_tax_include: false,
    international_hotel_non_gds: "",
    international_hotel_non_gds_fee_tax_id: "",
    international_hotel_non_gds_amount: "",
    international_hotel_non_gds_amount_type: "",
    international_hotel_non_gds_percent: "",
    international_hotel_non_gds_tax_include: false,
    hotel_other_emergency: "",
    hotel_other_emergency_fee_tax_id: "",
    hotel_other_emergency_amount: "",
    hotel_other_emergency_amount_type: "",
    hotel_other_emergency_percent: "",
    hotel_other_emergency_tax_include: false,

  })
  // Initialize form

  // Schema for yup
  const validationSchema = Yup.object().shape({
    //Flight
    processing_fee_category_name: Yup
      .string()
      .required("Please enter Preset Name."),
    domestic_reissue: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticReissue.fee_tax_type_name}.`),
    domestic_reissue_amount: Yup
      .string().when('domestic_reissue', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticReissue.fee_tax_type_name}.`)
      }),
    domestic_reissue_amount_type: Yup
      .string().when('domestic_reissue', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_reissue_percent: Yup
      .string().when('domestic_reissue', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticReissue.fee_tax_type_name}.`)
      }),
    domestic_revalidate: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticRevalidate.fee_tax_type_name}.`),
    domestic_revalidate_amount: Yup
      .string().when('domestic_revalidate', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticRevalidate.fee_tax_type_name}.`)
      }),
    domestic_revalidate_amount_type: Yup
      .string().when('domestic_revalidate', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_revalidate_percent: Yup
      .string().when('domestic_revalidate', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticRevalidate.fee_tax_type_name}.`)
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
    domestic_void: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticVoid.fee_tax_type_name}.`),
    domestic_void_amount: Yup
      .string().when('domestic_void', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticVoid.fee_tax_type_name}.`)
      }),
    domestic_void_amount_type: Yup
      .string().when('domestic_void', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_void_percent: Yup
      .string().when('domestic_void', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticVoid.fee_tax_type_name}.`)
      }),
    domestic_rfp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticRfp.fee_tax_type_name}.`),
    domestic_rfp_amount: Yup
      .string().when('domestic_rfp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticRfp.fee_tax_type_name}.`)
      }),
    domestic_rfp_amount_type: Yup
      .string().when('domestic_rfp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_rfp_percent: Yup
      .string().when('domestic_rfp', {
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
    international_reissue: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalReissue.fee_tax_type_name}.`),
    international_reissue_amount: Yup
      .string().when('international_reissue', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalReissue.fee_tax_type_name}.`)
      }),
    international_reissue_amount_type: Yup
      .string().when('international_reissue', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_reissue_percent: Yup
      .string().when('international_reissue', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalReissue.fee_tax_type_name}.`)
      }),
    international_revalidate: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalRevalidate.fee_tax_type_name}.`),
    international_revalidate_amount: Yup
      .string().when('international_revalidate', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalRevalidate.fee_tax_type_name}.`)
      }),
    international_revalidate_amount_type: Yup
      .string().when('international_revalidate', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_revalidate_percent: Yup
      .string().when('international_revalidate', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalRevalidate.fee_tax_type_name}.`)
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
    international_void: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalVoid.fee_tax_type_name}.`),
    international_void_amount: Yup
      .string().when('international_void', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalVoid.fee_tax_type_name}.`)
      }),
    international_void_amount_type: Yup
      .string().when('international_void', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_void_percent: Yup
      .string().when('international_void', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalVoid.fee_tax_type_name}.`)
      }),
    international_rfp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalRfp.fee_tax_type_name}.`),
    international_rfp_amount: Yup
      .string().when('international_rfp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalRfp.fee_tax_type_name}.`)
      }),
    international_rfp_amount_type: Yup
      .string().when('international_rfp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_rfp_percent: Yup
      .string().when('international_rfp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalRfp.fee_tax_type_name}.`)
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
    domestic_modify_hotel_fee: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticModifyHotelFee.fee_tax_type_name}.`),
    domestic_modify_hotel_fee_amount: Yup
      .string().when('domestic_modify_hotel_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticModifyHotelFee.fee_tax_type_name}.`)
      }),
    domestic_modify_hotel_fee_amount_type: Yup
      .string().when('domestic_modify_hotel_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_modify_hotel_fee_percent: Yup
      .string().when('domestic_modify_hotel_fee', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticModifyHotelFee.fee_tax_type_name}.`)
      }),
    domestic_hotel_refund: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticHotelRefund.fee_tax_type_name}.`),
    domestic_hotel_refund_amount: Yup
      .string().when('domestic_hotel_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticHotelRefund.fee_tax_type_name}.`)
      }),
    domestic_hotel_refund_amount_type: Yup
      .string().when('domestic_hotel_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_hotel_refund_percent: Yup
      .string().when('domestic_hotel_refund', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticHotelRefund.fee_tax_type_name}.`)
      }),
    domestic_hotel_non_gds: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticHotelNonGds.fee_tax_type_name}.`),
    domestic_hotel_non_gds_amount: Yup
      .string().when('domestic_hotel_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticHotelNonGds.fee_tax_type_name}.`)
      }),
    domestic_hotel_non_gds_amount_type: Yup
      .string().when('domestic_hotel_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_hotel_non_gds_percent: Yup
      .string().when('domestic_hotel_non_gds', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticHotelNonGds.fee_tax_type_name}.`)
      }),
    international_modify_hotel_fee: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalModifyHotelFee.fee_tax_type_name}.`),
    international_modify_hotel_fee_amount: Yup
      .string().when('domestic_modify_hotel_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalModifyHotelFee.fee_tax_type_name}.`)
      }),
    international_modify_hotel_fee_amount_type: Yup
      .string().when('domestic_modify_hotel_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_modify_hotel_fee_percent: Yup
      .string().when('domestic_modify_hotel_fee', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalModifyHotelFee.fee_tax_type_name}.`)
      }),
    international_hotel_refund: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalHotelRefund.fee_tax_type_name}.`),
    international_hotel_refund_amount: Yup
      .string().when('domestic_hotel_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalHotelRefund.fee_tax_type_name}.`)
      }),
    international_hotel_refund_amount_type: Yup
      .string().when('domestic_hotel_refund', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_hotel_refund_percent: Yup
      .string().when('domestic_hotel_refund', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalHotelRefund.fee_tax_type_name}.`)
      }),
    international_hotel_non_gds: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalHotelNonGds.fee_tax_type_name}.`),
    international_hotel_non_gds_amount: Yup
      .string().when('domestic_hotel_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalHotelNonGds.fee_tax_type_name}.`)
      }),
    international_hotel_non_gds_amount_type: Yup
      .string().when('domestic_hotel_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_hotel_non_gds_percent: Yup
      .string().when('domestic_hotel_non_gds', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalHotelNonGds.fee_tax_type_name}.`)
      }),
    hotel_other_emergency: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeHotelOtherEmergency.fee_tax_type_name}.`),
    hotel_other_emergency_amount: Yup
      .string().when('hotel_other_emergency', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeHotelOtherEmergency.fee_tax_type_name}.`)
      }),
    hotel_other_emergency_amount_type: Yup
      .string().when('hotel_other_emergency', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_other_emergency_percent: Yup
      .string().when('hotel_other_emergency', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeHotelOtherEmergency.fee_tax_type_name}.`)
      }),
  })

  const checkprocessingType = (value) => value !== "00000000-0000-0000-0000-000000000000" ? "amount" : "percent"
  const checkChargeType = value => value === "00000000-0000-0000-0000-000000000000" ? "" : value

  useEffect(async() => {
    try {
      if(formId) {
        let {data} = await api.get(endpointFee+ "/1/" + formId)
        setInitialForm({
          ...initialForm, 
          ...data,
          //Flight
          // domestic_reissue: checkprocessingType(data.domestic_reissue.charge_type_id),
          // domestic_reissue_fee_tax_id: data.domestic_reissue.fee_tax_type_id,
          // domestic_reissue_amount: data.domestic_reissue.amount,
          // domestic_reissue_amount_type: data.domestic_reissue.amount_type,
          // domestic_reissue_percent: data.domestic_reissue.percent,
          // domestic_reissue_tax_include: data.domestic_reissue.is_tax_inclusive,
          // domestic_revalidate: checkprocessingType(data.domestic_revalidate.charge_type_id),
          // domestic_revalidate_fee_tax_id: data.domestic_revalidate.fee_tax_type_id,
          // domestic_revalidate_amount: data.domestic_revalidate.amount,
          // domestic_revalidate_amount_type: data.domestic_revalidate.amount_type,
          // domestic_revalidate_percent: data.domestic_revalidate.percent,
          // domestic_revalidate_tax_include: data.domestic_revalidate.is_tax_inclusive,
          // domestic_refund: checkprocessingType(data.domestic_refund.charge_type_id),
          // domestic_refund_fee_tax_id: data.domestic_refund.fee_tax_type_id,
          // domestic_refund_amount: data.domestic_refund.amount,
          // domestic_refund_amount_type: data.domestic_refund.amount_type,
          // domestic_refund_percent: data.domestic_refund.percent,
          // domestic_refund_tax_include: data.domestic_refund.is_tax_inclusive,
          // domestic_void: checkprocessingType(data.domestic_void.charge_type_id),
          // domestic_void_fee_tax_id: data.domestic_void.fee_tax_type_id,
          // domestic_void_amount: data.domestic_void.amount,
          // domestic_void_amount_type: data.domestic_void.amount_type,
          // domestic_void_percent: data.domestic_void.percent,
          // domestic_void_tax_include: data.domestic_void.is_tax_inclusive,
          // domestic_rfp: checkprocessingType(data.domestic_rfp.charge_type_id),
          // domestic_rfp_fee_tax_id: data.domestic_rfp.fee_tax_type_id,
          // domestic_rfp_amount: data.domestic_rfp.amount,
          // domestic_rfp_amount_type: data.domestic_rfp.amount_type,
          // domestic_rfp_percent: data.domestic_rfp.percent,
          // domestic_rfp_tax_include: data.domestic_rfp.is_tax_inclusive,
          // domestic_non_gds: checkprocessingType(data.domestic_non_gds.charge_type_id),
          // domestic_non_gds_fee_tax_id: data.domestic_non_gds.fee_tax_type_id,
          // domestic_non_gds_amount: data.domestic_non_gds.amount,
          // domestic_non_gds_amount_type: data.domestic_non_gds.amount_type,
          // domestic_non_gds_percent: data.domestic_non_gds.percent,
          // domestic_non_gds_tax_include: data.domestic_non_gds.is_tax_inclusive,
          // international_reissue: checkprocessingType(data.international_reissue.charge_type_id),
          // international_reissue_fee_tax_id: data.international_reissue.fee_tax_type_id,
          // international_reissue_amount: data.international_reissue.amount,
          // international_reissue_amount_type: data.international_reissue.amount_type,
          // international_reissue_percent: data.international_reissue.percent,
          // international_reissue_tax_include: data.international_reissue.is_tax_inclusive,
          // international_revalidate: checkprocessingType(data.international_revalidate.charge_type_id),
          // international_revalidate_fee_tax_id: data.international_revalidate.fee_tax_type_id,
          // international_revalidate_amount: data.international_revalidate.amount,
          // international_revalidate_amount_type: data.international_revalidate.amount_type,
          // international_revalidate_percent: data.international_revalidate.percent,
          // international_revalidate_tax_include: data.international_revalidate.is_tax_inclusive,
          // international_refund: checkprocessingType(data.international_refund.charge_type_id),
          // international_refund_fee_tax_id: data.international_refund.fee_tax_type_id,
          // international_refund_amount: data.international_refund.amount,
          // international_refund_amount_type: data.international_refund.amount_type,
          // international_refund_percent: data.international_refund.percent,
          // international_refund_tax_include: data.international_refund.is_tax_inclusive,
          // international_void: checkprocessingType(data.international_void.charge_type_id),
          // international_void_fee_tax_id: data.international_void.fee_tax_type_id,
          // international_void_amount: data.international_void.amount,
          // international_void_amount_type: data.international_void.amount_type,
          // international_void_percent: data.international_void.percent,
          // international_void_tax_include: data.international_void.is_tax_inclusive,
          // international_rfp: checkprocessingType(data.international_rfp.charge_type_id),
          // international_rfp_fee_tax_id: data.international_rfp.fee_tax_type_id,
          // international_rfp_amount: data.international_rfp.amount,
          // international_rfp_amount_type: data.international_rfp.amount_type,
          // international_rfp_percent: data.international_rfp.percent,
          // international_rfp_tax_include: data.international_rfp.is_tax_inclusive,
          // international_non_gds: checkprocessingType(data.international_non_gds.charge_type_id),
          // international_non_gds_fee_tax_id: data.international_non_gds.fee_tax_type_id,
          // international_non_gds_amount: data.international_non_gds.amount,
          // international_non_gds_amount_type: data.international_non_gds.amount_type,
          // international_non_gds_percent: data.international_non_gds.percent,
          // international_non_gds_tax_include: data.international_non_gds.is_tax_inclusive,
          // other_emergency: checkprocessingType(data.other_emergency_service.charge_type_id),
          // other_emergency_fee_tax_id: data.other_emergency_service.fee_tax_type_id,
          // other_emergency_amount: data.other_emergency_service.amount,
          // other_emergency_amount_type: data.other_emergency_service.amount_type,
          // other_emergency_percent: data.other_emergency_service.percent,
          // other_emergency_tax_include: data.other_emergency_service.is_tax_inclusive,

          // //Hotel
          // domestic_modify_hotel_fee: checkprocessingType(data.domestic_modify_hotel_fee.charge_type_id),
          // domestic_modify_hotel_fee_fee_tax_id: data.domestic_modify_hotel_fee.fee_tax_type_id,
          // domestic_modify_hotel_fee_amount: data.domestic_modify_hotel_fee.amount,
          // domestic_modify_hotel_fee_amount_type: data.domestic_modify_hotel_fee.amount_type,
          // domestic_modify_hotel_fee_percent: data.domestic_modify_hotel_fee.percent,
          // domestic_modify_hotel_fee_tax_include: data.domestic_modify_hotel_fee.is_tax_include,
          // domestic_hotel_refund: checkprocessingType(data.domestic_hotel_refund.charge_type_id),
          // domestic_hotel_refund_fee_tax_id: data.domestic_hotel_refund.fee_tax_type_id,
          // domestic_hotel_refund_amount: data.domestic_hotel_refund.amount,
          // domestic_hotel_refund_amount_type: checkChargeType(data.domesthotel_ic_hotel_refund.charge_type_id),
          // domestic_hotel_refund_percent: data.domestic_hotel_refund.percent,
          // domestic_refund_tax_include: data.domestic_hotel_refund.is_tax_inclusive,
          // domestic_hotel_non_gds: checkprocessingType(data.domestic_hotel_non_gds.charge_type_id),
          // domestic_hotel_non_gds_fee_tax_id: data.domestic_hotel_non_gds.fee_tax_type_id,
          // domestic_hotel_non_gds_amount: data.domestic_hotel_non_gds.amount,
          // domestic_hotel_non_gds_amount_type: data.domestic_hotel_non_gds.amount_type,
          // domestic_hotel_non_gds_percent: data.domestic_hotel_non_gds.percent,
          // domestic_hotel_non_gds_tax_include: data.domestic_hotel_non_gds.is_tax_inclusive,
          // international_modify_hotel_fee: checkprocessingType(data.international_modify_hotel_fee.charge_type_id),
          // international_modify_hotel_fee_fee_tax_id: data.international_modify_hotel_fee.fee_tax_type_id,
          // international_modify_hotel_fee_amount: data.international_modify_hotel_fee.amount,
          // international_modify_hotel_fee_amount_type: data.international_modify_hotel_fee.amount_type,
          // international_modify_hotel_fee_percent: data.international_modify_hotel_fee.percent,
          // international_modify_hotel_fee_tax_include: data.international_modify_hotel_fee.is_tax_include,
          // international_hotel_refund: checkprocessingType(data.international_hotel_refund.charge_type_id),
          // international_hotel_refund_fee_tax_id: data.international_hotel_refund.fee_tax_type_id,
          // international_hotel_refund_amount: data.international_hotel_refund.amount,
          // international_hotel_refund_percent: data.international_hotel_refund.percent,
          // international_hotel_refund_tax_include: data.international_hotel_refund.is_tax_inclusive,
          // international_hotel_non_gds: checkprocessingType(data.international_hotel_non_gds.charge_type_id),
          // international_hotel_non_gds_fee_tax_id: data.international_hotel_non_gds.fee_tax_type_id,
          // international_hotel_non_gds_amount: data.international_hotel_non_gds.amount,
          // international_hotel_non_gds_amount_type: data.international_hotel_non_gds.amount_type,
          // international_hotel_non_gds_percent: data.international_hotel_non_gds.percent,
          // international_hotel_non_gds_tax_include: data.international_hotel_non_gds.is_tax_inclusive,
          // hotel_other_emergency: checkprocessingType(data.hotel_other_emergency.charge_type_id),
          // hotel_other_emergency_fee_tax_id: data.hotel_other_emergency.fee_tax_type_id, 
          // hotel_other_emergency_amount: data.hotel_other_emergency.amount,
          // hotel_other_emergency_amount_type: data.hotel_other_emergency.amount_type,
          // hotel_other_emergency_percent: data.hotel_other_emergency.percent,
          // hotel_other_emergency_tax_include: data.hotel_other_emergency.is_tax_include,
        })
      }
    } catch (e) { console.log(e) }
  }, [])

  const removeSeparator = (value) => {
    value = value.toString().split(",").join("")
    return parseInt(value)
  }

  const setPayload = (values) => {
    let payloadDomestic = {
      description: values.description,
      processing_fee_category_name: values.processing_fee_category_name,
      domestic_reissue: {
        fee_tax_type_id: taxIdDomesticReissue,
        amount: values.domestic_reissue == "amount" ? removeSeparator(values.domestic_reissue_amount) : 0,
        percent:values.domestic_reissue == "amount" ? 0 : parseFloat(values.domestic_reissue_percent),
        charge_type_id:values.domestic_reissue == "amount" ? values.domestic_reissue_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_reissue == "amount" ? false : values.domestic_reissue_tax_include,
        
      },
      domestic_revalidate: {
        fee_tax_type_id: taxIdDomesticRevalidate,
        amount: values.domestic_revalidate == "amount" ? removeSeparator(values.domestic_revalidate_amount) : 0,
        percent:values.domestic_revalidate == "amount" ? 0 : parseFloat(values.domestic_revalidate_percent),
        charge_type_id:values.domestic_revalidate == "amount" ? values.domestic_revalidate_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_revalidate == "amount" ? false : values.domestic_revalidate_tax_include,
        
      },
      domestic_refund: {
        fee_tax_type_id: taxIdDomesticRefund,
        amount: values.domestic_refund == "amount" ? removeSeparator(values.domestic_refund_amount) : 0,
        percent:values.domestic_refund == "amount" ? 0 : parseFloat(values.domestic_refund_percent),
        charge_type_id:values.domestic_refund == "amount" ? values.domestic_refund_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_refund == "amount" ? false : values.domestic_refund_tax_include,
        
      },
      domestic_void: {
        fee_tax_type_id: taxIdDomesticVoid,
        amount: values.domestic_void == "amount" ? removeSeparator(values.domestic_void_amount) : 0,
        percent:values.domestic_void == "amount" ? 0 : parseFloat(values.domestic_void_percent),
        charge_type_id:values.domestic_void == "amount" ? values.domestic_void_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_void == "amount" ? false : values.domestic_void_tax_include,
        
      },
      domestic_rfp: {
        fee_tax_type_id: taxIdDomesticRfp,
        amount: values.domestic_rfp == "amount" ? removeSeparator(values.domestic_rfp_amount) : 0,
        percent:values.domestic_rfp == "amount" ? 0 : parseFloat(values.domestic_rfp_percent),
        charge_type_id:values.domestic_rfp == "amount" ? values.domestic_rfp_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_rfp == "amount" ? false : values.domestic_rfp_tax_include,    
      },
      domestic_non_gds: {
        fee_tax_type_id: taxIdDomesticNonGds,
        amount: values.domestic_non_gds == "amount" ? removeSeparator(values.domestic_non_gds_amount) : 0,
        percent:values.domestic_non_gds == "amount" ? 0 : parseFloat(values.domestic_non_gds_percent),
        charge_type_id:values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_non_gds == "amount" ? false : values.domestic_non_gds_tax_include,
      },
      international_reissue: {
        fee_tax_type_id: taxIdInternationalReissue,
        amount: values.international_reissue == "amount" ? removeSeparator(values.international_reissue_amount) : 0,
        percent:values.international_reissue == "amount" ? 0 : parseFloat(values.international_reissue_percent),
        charge_type_id:values.international_reissue == "amount" ? values.international_reissue_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_reissue == "amount" ? false : values.international_reissue_tax_include,
      },
      international_revalidate: {
        fee_tax_type_id: taxIdInternationalRevalidate,
        amount: values.international_revalidate == "amount" ? removeSeparator(values.international_revalidate_amount) : 0,
        percent:values.international_revalidate == "amount" ? 0 : parseFloat(values.international_revalidate_percent),
        charge_type_id:values.international_revalidate == "amount" ? values.international_revalidate_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_revalidate == "amount" ? false : values.international_revalidate_tax_include,
        
      },
      international_refund: {
        fee_tax_type_id: taxIdInternationalRefund,
        amount: values.international_refund == "amount" ? removeSeparator(values.international_refund_amount) : 0,
        percent:values.international_refund == "amount" ? 0 : parseFloat(values.international_refund_percent),
        charge_type_id:values.international_refund == "amount" ? values.international_refund_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_refund == "amount" ? false : values.international_refund_tax_include,
      },
      international_void: {
        fee_tax_type_id: taxIdInternationalVoid,
        amount: values.international_void == "amount" ? removeSeparator(values.international_void_amount) : 0,
        percent:values.international_void == "amount" ? 0 : parseFloat(values.international_void_percent),
        charge_type_id:values.international_void == "amount" ? values.international_void_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_void == "amount" ? false : values.international_void_tax_include,
      },
      international_rfp: {
        fee_tax_type_id: taxIdInternationalRfp,
        amount: values.international_rfp == "amount" ? removeSeparator(values.international_rfp_amount) : 0,
        percent:values.international_rfp == "amount" ? 0 : parseFloat(values.international_rfp_percent),
        charge_type_id:values.international_rfp == "amount" ? values.international_rfp_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_rfp == "amount" ? false : values.international_rfp_tax_include,
        
      },
      international_non_gds: {
        fee_tax_type_id: taxIdInternationalNonGds,
        amount: values.international_non_gds == "amount" ? removeSeparator(values.international_non_gds_amount) : 0,
        percent:values.international_non_gds == "amount" ? 0 : parseFloat(values.international_non_gds_percent),
        charge_type_id:values.international_non_gds == "amount" ? values.international_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_non_gds == "amount" ? false : values.international_non_gds_tax_include, 
      },
      other_emergency: {
        fee_tax_type_id: taxIdOtherEmergency,
        amount: values.other_emergency == "amount" ? removeSeparator(values.other_emergency_amount) : 0,
        percent:values.other_emergency == "amount" ? 0 : parseFloat(values.other_emergency_percent),
        charge_type_id:values.other_emergency == "amount" ? values.other_emergency_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.other_emergency == "amount" ? false : values.other_emergency_tax_include,
      },

      // Hotel
      domestic_modify_hotel_fee: {
        fee_tax_type_id: taxIdDomesticModifyHotelFee,
        amount: values.domestic_modify_hotel_fee == "amount" ? removeSeparator(values.domestic_modify_hotel_fee_amount) : 0,
        percent:values.domestic_modify_hotel_fee == "amount" ? 0 : parseFloat(values.domesticmodify_hotel_feed_percent),
        charge_type_id:values.domestic_modify_hotel_fee == "amount" ? values.domestic_modify_hotel_fee_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_modify_hotel_fee == "amount" ? false : values.domestic_modify_hotel_fee_tax_include,
      },
      domestic_hotel_refund: {
        fee_tax_type_id: taxIdDomesticHotelRefund,
        amount: values.domestic_hotel_refund == "amount" ? removeSeparator(values.domestic_hotel_refund_amount) : 0,
        percent:values.domestic_hotel_refund == "amount" ? 0 : parseFloat(values.domestic_hotel_refund_percent),
        charge_type_id:values.domestic_hotel_refund == "amount" ? values.domestic_hotel_refund_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_hotel_refund == "amount" ? false : values.domestic_hotel_refund_tax_include,
      },
      domestic_hotel_non_gds: {
        fee_tax_type_id: taxIdDomesticHotelNonGds,
        amount: values.domestic_hotel_non_gds == "amount" ? removeSeparator(values.domestic_hotel_non_gds_amount) : 0,
        percent:values.domestic_hotel_non_gds == "amount" ? 0 : parseFloat(values.domestic_hotel_non_gds_percent),
        charge_type_id:values.domestic_hotel_non_gds == "amount" ? values.domestic_hotel_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.domestic_hotel_non_gds == "amount" ? false : values.domestic_hotel_non_gds_tax_include,
      },
      international_modify_hotel_fee: {
        fee_tax_type_id: taxIdInternationalModifyHotelFee,
        amount: values.international_modify_hotel_fee == "amount" ? removeSeparator(values.international_modify_hotel_fee_amount) : 0,
        percent:values.international_modify_hotel_fee == "amount" ? 0 : parseFloat(values.international_modify_hotel_feed_percent),
        charge_type_id:values.international_modify_hotel_fee == "amount" ? values.international_modify_hotel_fee_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_modify_hotel_fee == "amount" ? false : values.international_modify_hotel_fee_tax_include,
      },
      international_hotel_refund: {
        fee_tax_type_id: taxIdInternationalHotelRefund,
        amount: values.international_hotel_refund == "amount" ? removeSeparator(values.international_hotel_refund_amount) : 0,
        percent:values.international_hotel_refund == "amount" ? 0 : parseFloat(values.international_hotel_refund_percent),
        charge_type_id:values.international_hotel_refund == "amount" ? values.international_hotel_refund_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_hotel_refund == "amount" ? false : values.international_hotel_refund_tax_include,
      },
      international_hotel_non_gds: {
        fee_tax_type_id: taxIdInternationalHotelNonGds,
        amount: values.international_hotel_non_gds == "amount" ? removeSeparator(values.international_hotel_non_gds_amount) : 0,
        percent:values.international_hotel_non_gds == "amount" ? 0 : parseFloat(values.international_hotel_non_gds_percent),
        charge_type_id:values.international_hotel_non_gds == "amount" ? values.international_hotel_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.international_hotel_non_gds == "amount" ? false : values.international_hotel_non_gds_tax_include,
      },
      hotel_other_emergency: {
        fee_tax_type_id: taxIdHotelOtherEmergency,
        amount: values.hotel_other_emergency == "amount" ? removeSeparator(values.hotel_other_emergency_amount) : 0,
        percent:values.hotel_other_emergency == "amount" ? 0 : parseFloat(values.hotel_other_emergency_percent),
        charge_type_id:values.hotel_other_emergency == "amount" ? values.hotel_other_emergency_amount_type : "00000000-0000-0000-0000-000000000000",
        is_tax_inclusive:values.hotel_other_emergency == "amount" ? false : values.hotel_other_emergency_tax_include,
      },
    }
    return payloadDomestic
  }

  const [paramsFlight, setParamsFlight] = useState({
    title: "Ancillary Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    hideCreate: true,
    module:"ancillary-fee-flight",
    baseRoute: "/master/manage-corporate/form",
    endpoint: `/master/agent-corporates/${id}/ancillary-fee`,
    columns: [
      {
        title: "Fee Type",
        data: ""
      },
      {
        title: "Processing Fee",
        data: ""
      },
    ],
    emptyTable: "No Corporate Fare found",
  })

  const [paramsHotel, setParamsHotel] = useState({
    title: "Ancillary Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    hideCreate: true,
    module:"ancillary-fee-hotel",
    baseRoute: "/master/manage-corporate/form",
    endpoint: `/master/agent-corporates/${id}/ancillary-fee`,
    columns: [
      {
        title: "Fee Type",
        data: ""
      },
      {
        title: "Processing Fee",
        data: ""
      },
    ],
    emptyTable: "No Corporate Fare found",
  })

  const [paramsOther, setParamsOther] = useState({
    title: "Ancillary Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    hideCreate: true,
    module:"ancillary-fee-other",
    baseRoute: "/master/manage-corporate/form",
    endpoint: `/master/agent-corporates/${id}/ancillary-fee`,
    columns: [
      {
        title: "Fee Type",
        data: ""
      },
      {
        title: "Processing Fee",
        data: ""
      },
    ],
    emptyTable: "No Corporate Fare found",
  })

  const handleReset = (type) => {
    switch (type) {
      case 'flight':
        setParamsFlight({...paramsFlight, filters: []})
        break;

      case 'hotel':
        setParamsHotel({...paramsHotel, filters: []})
        break;

      case 'other':
        setParamsOther({...paramsOther, filters: []})
        break;

      default:
        break;
    }
  }
  
  const [isFieldSelected, setisFieldSelected] = useState({
    flight: {
      key: '',
      isSelected: false
    },
    hotel: {
      key: '',
      isSelected: false
    },
    other: {
      key: '',
      isSelected: false
    }
  })

  const onSubmit = async(values) => {
    try {
      let payload = setPayload(values)
      let res = await api.putOrPost(endpoint, formId, payload)
      openSnackbar(
        `Ancillary Fee has been successfully ${formId ? 'updated' : 'saved'}.`,
      )
      localStorage.setItem("saf_key", "hotel")
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
        <Card style={{marginBotton: 0}}>
          <Card.Body>
            <h3 className="card-heading">Ancillary Fee</h3>
            <div className='ancillary_fee'>
              <div className='wrapper_header'>
                <Card.Text className='uppercase margin-0'>
                  flight
                </Card.Text>
                <div className='wrapper_select'>
                  <Card.Text className='margin-0'>Select Flight Ancillary Fee</Card.Text>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    className='select'
                    options={[
                      {
                        value: 'custom',
                        label: 'Custom'
                      },
                      {
                        value: 'selected',
                        label: 'Selected'
                      },
                    ]}
                    onChange={(selected) => setisFieldSelected({
                      ...isFieldSelected,
                      flight: {
                        key: selected.value,
                        isSelected: true
                      }
                    })}
                  />
                </div>
              </div>
              <div className='divider mb-2 mt-2' />
              {isFieldSelected.flight.isSelected && isFieldSelected.flight.key === 'selected' && <div className='mb-3'>
                <BbDataTable {...paramsFlight} onReset={() => handleReset('flight')} />
              </div>}
              {isFieldSelected.flight.isSelected && isFieldSelected.flight.key === 'custom' && <div className='card mt-4'>
                <FeeTabs
                    tabKey={tabKey}
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
                    // isView={isView}
                    amountSuffixSelections={[
                      {label:"/Ticket", value:"de62950d-fbab-4e39-bd90-c2b6687c6b36"},
                      {label:"/Person", value:"de03bf84-4bd8-4cdf-9348-00246f04bcad"},
                      {label:"/Transaction", value:"5123b121-4f6a-4871-bef1-65408d663e19"},
                    ]}
                    errors={errors}
                  />
              </div>}
              <div className='wrapper_header'>
                <Card.Text className='uppercase margin-0'>
                  Hotel
                </Card.Text>
                <div className='wrapper_select'>
                  <Card.Text className='margin-0'>Select Hotel Ancillary Fee</Card.Text>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    className='select'
                    options={[
                      {
                        value: 'custom',
                        label: 'Custom'
                      },
                      {
                        value: 'selected',
                        label: 'Selected'
                      },
                    ]}
                    onChange={(selected) => setisFieldSelected({
                      ...isFieldSelected,
                      hotel: {
                        key: selected.value,
                        isSelected: true
                      }
                    })}
                  />
                </div>
              </div>
              <div className='divider mb-2 mt-2' />
              {isFieldSelected.hotel.isSelected && isFieldSelected.hotel.key === 'selected' && <div className='mb-3'>
                <BbDataTable {...paramsHotel} onReset={() => handleReset('hotel')} />
              </div>}
              {isFieldSelected.hotel.isSelected && isFieldSelected.hotel.key === 'custom' && <div className='card mt-4'>
              <FeeTabs
                    tabKey={tabKey}
                    menu={[
                      {title: "Domestic", sections: [
                        {
                          title:"Modify Hotel Fee",
                          taxType:taxTypeDomesticModifyHotelFee,
                          fieldFeeTaxId:"domestic_modify_hotel_fee_fee_tax_id",
                          fieldRadio:"domestic_modify_hotel_fee",
                          fieldAmount:"domestic_modify_hotel_fee_amount",
                          fieldAmountType:"domestic_modify_hotel_fee_amount_type",
                          fieldPercent:"domestic_modify_hotel_fee_percent",
                          fieldIncludeTax:"domestic_modify_hotel_fee_tax_include"
                        },
                        {
                          title:"Refund Fee",
                          taxType:taxTypeDomesticHotelRefund,
                          fieldFeeTaxId:"domestic_hotel_refund_fee_tax_id",
                          fieldRadio:"domestic_hotel_refund",
                          fieldAmount:"domestic_hotel_refund_amount",
                          fieldAmountType:"domestic_hotel_refund_amount_type",
                          fieldPercent:"domestic_hotel_refund_percent",
                          fieldIncludeTax:"domestic_hotel_refund_tax_include"
                        },
                        {
                          title:"Non-GDS Hotel Booking Process Fee",
                          taxType:taxTypeDomesticHotelNonGds,
                          fieldFeeTaxId:"domestic_hotel_non_gds_fee_tax_id",
                          fieldRadio:"domestic_hotel_non_gds",
                          fieldAmount:"domestic_hotel_non_gds_amount",
                          fieldAmountType:"domestic_hotel_non_gds_amount_type",
                          fieldPercent:"domestic_hotel_non_gds_percent",
                          fieldIncludeTax:"domestic_hotel_non_gds_tax_include"
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"Modify Hotel Fee",
                          taxType:taxTypeInternationalModifyHotelFee,
                          fieldFeeTaxId:"international_modify_hotel_fee_fee_tax_id",
                          fieldRadio:"international_modify_hotel_fee",
                          fieldAmount:"international_modify_hotel_fee_amount",
                          fieldAmountType:"international_modify_hotel_fee_amount_type",
                          fieldPercent:"international_modify_hotel_fee_percent",
                          fieldIncludeTax:"international_modify_hotel_fee_tax_include"
                        },
                        {
                          title:"Refund Fee",
                          taxType:taxTypeInternationalHotelRefund,
                          fieldFeeTaxId:"international_hotel_refund_fee_tax_id",
                          fieldRadio:"international_hotel_refund",
                          fieldAmount:"international_hotel_refund_amount",
                          fieldAmountType:"international_hotel_refund_amount_type",
                          fieldPercent:"international_hotel_refund_percent",
                          fieldIncludeTax:"international_hotel_refund_tax_include"
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
                          taxType:taxTypeHotelOtherEmergency,
                          fieldFeeTaxId:"hotel_other_emergency_fee_tax_id",
                          fieldRadio:"hotel_other_emergency",
                          fieldAmount:"hotel_other_emergency_amount",
                          fieldAmountType:"hotel_other_emergency_amount_type",
                          fieldPercent:"hotel_other_emergency_percent",
                          fieldIncludeTax:"hotel_other_emergency_tax_include"
                        }]
                      },
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    // isView={isView}
                    amountSuffixSelections={[
                      {label:"/Ticket", value:"de62950d-fbab-4e39-bd90-c2b6687c6b36"},
                      {label:"/Person", value:"de03bf84-4bd8-4cdf-9348-00246f04bcad"},
                      {label:"/Transaction", value:"5123b121-4f6a-4871-bef1-65408d663e19"},
                    ]}
                    errors={errors}
                  />
              </div>}
              <div className='wrapper_header'>
                <Card.Text className='uppercase margin-0'>
                  Other
                </Card.Text>
                <div className='wrapper_select'>
                  <Card.Text className='margin-0'>Select Other Ancillary Fee</Card.Text>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    className='select'
                    options={[
                      {
                        value: 'custom',
                        label: 'Custom'
                      },
                      {
                        value: 'selected',
                        label: 'Selected'
                      },
                    ]}
                    onChange={(selected) => setisFieldSelected({
                      ...isFieldSelected,
                      other: {
                        key: selected.value,
                        isSelected: true
                      }
                    })}
                  />
                </div>
              </div>
              <div className='divider mb-2 mt-2' />
              {isFieldSelected.other.isSelected && isFieldSelected.other.key === 'selected' && <div className='mb-3'>
                <BbDataTable {...paramsOther} onReset={() => handleReset('hotel')} />
              </div>}
              {isFieldSelected.other.isSelected && isFieldSelected.other.key === 'custom' && <div className='card mt-4'>
              <span>Not yet available</span>
              </div>}
            </div>
          </Card.Body>
        </Card>
        <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
          >
            SAVE & NEXT
          </Button>
          <Button
            variant="secondary"
            // onClick={() => props.history.goBack()}
            style={{ padding: '0 21px' }}
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

AncillaryFee.propTypes = {}

export default AncillaryFee