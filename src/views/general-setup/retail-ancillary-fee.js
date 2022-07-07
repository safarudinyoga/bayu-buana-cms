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
import { FeeTabs } from "./form/fee_tabs"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"
import { ReactSVG } from "react-svg"

const endpoint = "/master/processing-fee-categories"
const endpointFee = "/master/configurations/retail-ancillary-fee"
const backUrl = "/master/retail-ancillary-fee"
const options = {
  position: "bottom-right",
}
const RetailAncillaryFee = (props) => {
  const history = useHistory()
  const [openSnackbar] = useSnackbar(options)
  let dispatch = useDispatch()
  let api = new Api()
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

  // Flight
  const [taxTypeDomesticReissue, setTaxTypeDomesticReissue] = useState([])
  const [taxTypeDomesticRevalidate, setTaxTypeDomesticRevalidate] = useState([])
  const [taxTypeDomesticRefund, setTaxTypeDomesticRefund] = useState([])
  const [taxTypeDomesticVoid, setTaxTypeDomesticVoid] = useState([])
  const [taxTypeDomesticFrp, setTaxTypeDomesticFrp] = useState([])
  const [taxTypeDomesticNonGds, setTaxTypeDomesticNonGds] = useState([])
  const [taxTypeInternationalReissue, setTaxTypeInternationalReissue] = useState([])
  const [taxTypeInternationalRevalidate, setTaxTypeInternationalRevalidate] = useState([])
  const [taxTypeInternationalRefund, setTaxTypeInternationalRefund] = useState([])
  const [taxTypeInternationalVoid, setTaxTypeInternationalVoid] = useState([])
  const [taxTypeInternationalFrp, setTaxTypeInternationalFrp] = useState([])
  const [taxTypeInternationalNonGds, setTaxTypeInternationalNonGds] = useState([])
  const [taxTypeOtherEmergency, setTaxTypeOtherEmergency] = useState([])
  
  const [taxIdDomesticReissue, setTaxIdDomesticReissue] = useState("")
  const [taxIdDomesticRevalidate, setTaxIdDomesticRevalidate] = useState("")
  const [taxIdDomesticRefund, setTaxIdDomesticRefund] = useState("")
  const [taxIdDomesticVoid, setTaxIdDomesticVoid] = useState("")
  const [taxIdDomesticFrp, setTaxIdDomesticFrp] = useState("")
  const [taxIdDomesticNonGds, setTaxIdDomesticNonGds] = useState("")
  const [taxIdInternationalReissue, setTaxIdInternationalReissue] = useState("")
  const [taxIdInternationalRevalidate, setTaxIdInternationalRevalidate] = useState("")
  const [taxIdInternationalRefund, setTaxIdInternationalRefund] = useState("")
  const [taxIdInternationalVoid, setTaxIdInternationalVoid] = useState("")
  const [taxIdInternationalFrp, setTaxIdInternationalFrp] = useState("")
  const [taxIdInternationalNonGds, setTaxIdInternationalNonGds] = useState("")
  const [taxIdOtherEmergency, setTaxIdOtherEmergency] = useState("")

  // Hotel
  const [taxTypeDomesticHotel, setTaxTypeDomesticHotel] = useState([])
  const [taxTypeDomesticNonGdsHotel, setTaxTypeDomesticNonGdsHotel] = useState([])
  const [taxTypeDomesticRefundHotel, setTaxTypeDomesticRefundHotel] = useState([])
  const [taxTypeDomesticFrpHotel, setTaxTypeDomesticFrpHotel] = useState([])
  const [taxTypeInternationalHotel, setTaxTypeInternationalHotel] = useState([])
  const [taxTypeInternationalNonGdsHotel, setTaxTypeInternationalNonGdsHotel] = useState([])
  const [taxTypeInternationalRefundHotel, setTaxTypeInternationalRefundHotel] = useState([])
  const [taxTypeInternationalFrpHotel, setTaxTypeInternationalFrpHotel] = useState([])
  const [taxTypeOtherEmergencyHotel, setTaxTypeOtherEmergencyHotel] = useState([])
  
  const [taxIdDomesticHotel, setTaxIdDomesticHotel] = useState("")
  const [taxIdDomesticNonGdsHotel, setTaxIdDomesticNonGdsHotel] = useState("")
  const [taxIdDomesticRefundHotel, setTaxIdDomesticRefundHotel] = useState("")
  const [taxIdDomesticFrpHotel, setTaxIdDomesticFrpHotel] = useState("")
  const [taxIdInternationalHotel, setTaxIdInternationalHotel] = useState("")
  const [taxIdInternationalNonGdsHotel, setTaxIdInternationalNonGdsHotel] = useState("")
  const [taxIdInternationalRefundHotel, setTaxIdInternationalRefundHotel] = useState("")
  const [taxIdInternationalFrpHotel, setTaxIdInternationalFrpHotel] = useState("")
  const [taxIdOtherEmergencyHotel, setTaxIdOtherEmergencyHotel] = useState("")
  

  useEffect(async () => {
    let api = new Api()
  })

  useEffect(() => {
    // Flight
    getFeeTaxType("33", setTaxTypeDomesticReissue, setTaxIdDomesticReissue)
    getFeeTaxType("49", setTaxTypeDomesticRevalidate, setTaxIdDomesticRevalidate)
    getFeeTaxType("35", setTaxTypeDomesticRefund, setTaxIdDomesticRefund)
    getFeeTaxType("37", setTaxTypeDomesticVoid, setTaxIdDomesticVoid)
    getFeeTaxType("41", setTaxTypeDomesticNonGds, setTaxIdDomesticNonGds)
    getFeeTaxType("39", setTaxTypeDomesticFrp, setTaxIdDomesticFrp)
    getFeeTaxType("34", setTaxTypeInternationalReissue, setTaxIdInternationalReissue)
    getFeeTaxType("50", setTaxTypeInternationalRevalidate, setTaxIdInternationalRevalidate)
    getFeeTaxType("36", setTaxTypeInternationalRefund, setTaxIdInternationalRefund)
    getFeeTaxType("38", setTaxTypeInternationalVoid, setTaxIdInternationalVoid)
    getFeeTaxType("40", setTaxTypeInternationalFrp, setTaxIdInternationalFrp)
    getFeeTaxType("42", setTaxTypeInternationalNonGds, setTaxIdInternationalNonGds)
    getFeeTaxType("6", setTaxTypeOtherEmergency, setTaxIdOtherEmergency)
    // Hotel
    getFeeTaxType("43", setTaxTypeDomesticHotel, setTaxIdDomesticHotel)
    getFeeTaxType("45", setTaxTypeDomesticRefundHotel, setTaxIdDomesticRefundHotel)
    getFeeTaxType("47", setTaxTypeDomesticNonGdsHotel, setTaxIdDomesticNonGdsHotel)
    getFeeTaxType("39", setTaxTypeDomesticFrpHotel, setTaxIdDomesticFrpHotel)
    getFeeTaxType("44", setTaxTypeInternationalHotel, setTaxIdInternationalHotel)
    getFeeTaxType("46", setTaxTypeInternationalRefundHotel, setTaxIdInternationalRefundHotel)
    getFeeTaxType("48", setTaxTypeInternationalNonGdsHotel, setTaxIdInternationalNonGdsHotel)
    getFeeTaxType("40", setTaxTypeInternationalFrpHotel, setTaxIdInternationalFrpHotel)
    getFeeTaxType("6", setTaxTypeOtherEmergencyHotel, setTaxIdOtherEmergencyHotel)
  }, [props.match.params.id])
  
  // Initialize form
  const [initialForm, setInitialForm] = useState({
    processing_fee_category_name: "",
    description: "",
    // Flight
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
    other_emergency_tax_include: false,

    // Hotel
    hotel_domestic_modify_fee: "",
    hotel_domestic_modify_fee_tax_id: "",
    hotel_domestic_modify_amount: "",
    hotel_domestic_modify_amount_type: "",
    hotel_domestic_modify_percent: "",
    hotel_domestic_modify_tax_include: false,
    hotel_domestic_refund_fee: "",
    hotel_domestic_refund_fee_fee_tax_id: "",
    hotel_domestic_refund_fee_amount: "",
    hotel_domestic_refund_fee_amount_type: "",
    hotel_domestic_refund_fee_percent: "",
    hotel_domestic_refund_fee_tax_include: false,
    hotel_domestic_domestic_frp: "",
    hotel_domestic_domestic_frp_fee_tax_id: "",
    hotel_domestic_domestic_frp_amount: "",
    hotel_domestic_domestic_frp_amount_type: "",
    hotel_domestic_domestic_frp_percent: "",
    hotel_domestic_domestic_frp_tax_include: false,
    hotel_domestic_non_gds: "",
    hotel_domestic_non_gds_fee_tax_id: "",
    hotel_domestic_non_gds_amount: "",
    hotel_domestic_non_gds_amount_type: "",
    hotel_domestic_non_gds_percent: "",
    hotel_domestic_non_gds_tax_include: false,
    hotel_international_modify: "",
    hotel_international_modify_fee_tax_id: "",
    hotel_international_modify_amount: "",
    hotel_international_modify_amount_type: "",
    hotel_international_modify_percent: "",
    hotel_international_modify_tax_include: false,
    hotel_international_refund_fee: "",
    hotel_international_refund_fee_fee_tax_id: "",
    hotel_international_refund_fee_amount: "",
    hotel_international_refund_fee_amount_type: "",
    hotel_international_refund_fee_percent: "",
    hotel_international_refund_fee_tax_include: false,
    hotel_international_frp: "",
    hotel_international_frp_fee_tax_id: "",
    hotel_international_frp_amount: "",
    hotel_international_frp_amount_type: "",
    hotel_international_frp_percent: "",
    hotel_international_frp_tax_include: false,
    hotel_international_non_gds: "",
    hotel_international_non_gds_fee_tax_id: "",
    hotel_international_non_gds_amount: "",
    hotel_international_non_gds_amount_type: "",
    hotel_international_non_gds_percent: "",
    hotel_international_non_gds_tax_include: false,
    hotel_other_emergency_service: "",
    hotel_other_emergency_service_amount: "",
    hotel_other_emergency_service_amount_type: "",
    hotel_other_emergency_service_percent: "",
    hotel_other_emergency_service_tax_include: false,
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // processing_fee_category_name: Yup.string().required("Present Name is required."),
    // Flight
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
    domestic_frp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticFrp.fee_tax_type_name}.`),
    domestic_frp_amount: Yup
      .string().when('domestic_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticFrp.fee_tax_type_name}.`)
      }),
    domestic_frp_amount_type: Yup
      .string().when('domestic_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_frp_percent: Yup
      .string().when('domestic_frp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticFrp.fee_tax_type_name}.`)
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
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalVoid.fee_tax_type_name}.`)
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
    international_frp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalFrp.fee_tax_type_name}.`),
    international_frp_amount: Yup
      .string().when('international_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalFrp.fee_tax_type_name}.`)
      }),
    international_frp_amount_type: Yup
      .string().when('international_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_frp_percent: Yup
      .string().when('international_frp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalFrp.fee_tax_type_name}.`)
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

    // Hotel
    hotel_domestic_modify_fee: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticHotel.fee_tax_type_name}.`),
    hotel_domestic_modify_fee_amount: Yup
      .string().when('hotel_domestic_modify_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticHotel.fee_tax_type_name}.`)
      }),
    hotel_domestic_modify_fee_amount_type: Yup
      .string().when('hotel_domestic_modify_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_domestic_modify_fee_percent: Yup
      .string().when('hotel_domestic_modify_fee', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticHotel.fee_tax_type_name}.`)
      }), 
    hotel_domestic_refund_fee: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticRefundHotel.fee_tax_type_name}.`),
    hotel_domestic_refund_fee_amount: Yup
      .string().when('hotel_domestic_refund_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticRefundHotel.fee_tax_type_name}.`)
      }),
    hotel_domestic_refund_fee_amount_type: Yup
      .string().when('hotel_domestic_refund_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_domestic_refund_fee_percent: Yup
      .string().when('hotel_domestic_refund_fee', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticRefundHotel.fee_tax_type_name}.`)
      }), 
    hotel_domestic_non_gds: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticNonGdsHotel.fee_tax_type_name}.`),
    hotel_domestic_non_gds_amount: Yup
      .string().when('hotel_domestic_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticNonGdsHotel.fee_tax_type_name}.`)
      }),
    hotel_domestic_non_gds_amount_type: Yup
      .string().when('hotel_domestic_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_domestic_non_gds_percent: Yup
      .string().when('hotel_domestic_non_gds', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticNonGdsHotel.fee_tax_type_name}.`)
      }), 
    hotel_domestic_frp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticFrpHotel.fee_tax_type_name}.`),
    hotel_domestic_frp_amount: Yup
      .string().when('hotel_domestic_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticFrpHotel.fee_tax_type_name}.`)
      }),
    hotel_domestic_frp_amount_type: Yup
      .string().when('hotel_domestic_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_domestic_frp_percent: Yup
      .string().when('hotel_domestic_frp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticFrpHotel.fee_tax_type_name}.`)
      }),
    hotel_international_modify: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalHotel.fee_tax_type_name}.`),
    hotel_international_modify_amount: Yup
      .string().when('hotel_international_modify', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalHotel.fee_tax_type_name}.`)
      }),
    hotel_international_modify_amount_type: Yup
      .string().when('hotel_international_modify', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_international_modify_percent: Yup
      .string().when('hotel_international_modify', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalHotel.fee_tax_type_name}.`)
      }), 
    hotel_international_refund_fee: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalRefundHotel.fee_tax_type_name}.`),
    hotel_international_refund_fee_amount: Yup
      .string().when('hotel_international_refund_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalRefundHotel.fee_tax_type_name}.`)
      }),
    hotel_international_refund_fee_amount_type: Yup
      .string().when('hotel_international_refund_fee', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_international_refund_fee_percent: Yup
      .string().when('hotel_international_refund_fee', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalRefundHotel.fee_tax_type_name}.`)
      }), 
    hotel_international_frp: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalFrpHotel.fee_tax_type_name}.`),
    hotel_international_frp_amount: Yup
      .string().when('hotel_international_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalFrpHotel.fee_tax_type_name}.`)
      }),
    hotel_international_frp_amount_type: Yup
      .string().when('hotel_international_frp', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_international_frp_percent: Yup
      .string().when('hotel_international_frp', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalFrpHotel.fee_tax_type_name}.`)
      }), 
    hotel_international_non_gds: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalNonGdsHotel.fee_tax_type_name}.`),
    hotel_international_non_gds_amount: Yup
      .string().when('hotel_international_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalNonGdsHotel.fee_tax_type_name}.`)
      }),
    hotel_international_non_gds_amount_type: Yup
      .string().when('hotel_international_non_gds', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_international_non_gds_percent: Yup
      .string().when('hotel_international_non_gds', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalNonGdsHotel.fee_tax_type_name}.`)
      }), 
    hotel_other_emergency_service: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeOtherEmergencyHotel.fee_tax_type_name}.`),
    hotel_other_emergency_service_amount: Yup
      .string().when('hotel_other_emergency_service', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeOtherEmergencyHotel.fee_tax_type_name}.`)
      }),
    hotel_other_emergency_service_amount_type: Yup
      .string().when('hotel_other_emergency_service', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    hotel_other_emergency_service_percent: Yup
      .string().when('hotel_other_emergency_service', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeOtherEmergencyHotel.fee_tax_type_name}.`)
      }), 

  })
  const checkprocessingType = (value) => value !== "00000000-0000-0000-0000-000000000000" ? "amount" : "percent"
  const checkChargeType = value => value === "00000000-0000-0000-0000-000000000000" ? "" : value
  useEffect(async() => {
    try {
        // let agent_res = await api.get(`endpointFee+ "/1/" + res.data.id)
        let {data} = await api.get(endpointFee+ "/1")
        setInitialForm({
          ...initialForm, 
          ...data,
          domestic_reissue: checkprocessingType(data.domestic_reissue.charge_type_id),
          domestic_reissue_fee_tax_id: data.domestic_reissue.fee_tax_type_id,
          domestic_reissue_amount: data.domestic_reissue.amount,
          // domestic_reissue_amount_type: checkChargeType(data.domestic_reissue.charge_type_id),
          domestic_reissue_percent: data.domestic_reissue.percent,
          domestic_reissue_tax_include: data.domestic_reissue.is_tax_inclusive,
          domestic_revalidate: checkprocessingType(data.domestic_revalidate.charge_type_id),
          domestic_revalidate_fee_tax_id: data.domestic_revalidate.fee_tax_type_id,
          domestic_revalidate_amount: data.domestic_revalidate.amount,
          // domestic_revalidate_amount_type: checkChargeType(data.domestic_revalidate.charge_type_id),
          domestic_revalidate_percent: data.domestic_revalidate.percent,
          domestic_revalidate_tax_include: data.domestic_revalidate.is_tax_inclusive,
          domestic_refund: checkprocessingType(data.domestic_refund.charge_type_id),
          domestic_refund_fee_tax_id: data.domestic_refund.fee_tax_type_id,
          domestic_refund_amount: data.domestic_refund.amount,
          // domestic_refund_amount_type: checkChargeType(data.domestic_refund.charge_type_id),
          domestic_refund_percent: data.domestic_refund.percent,
          domestic_refund_tax_include: data.domestic_refund.is_tax_inclusive,
          domestic_void: checkprocessingType(data.domestic_void.charge_type_id),
          domestic_void_fee_tax_id: data.domestic_void.fee_tax_type_id,
          domestic_void_amount: data.domestic_void.amount,
          // domestic_void_amount_type: checkChargeType(data.domestic_void.charge_type_id),
          domestic_void_percent: data.domestic_void.percent,
          domestic_void_tax_include: data.domestic_void.is_tax_inclusive,
          domestic_frp: checkprocessingType(data.domestic_rfp.charge_type_id),
          domestic_frp_fee_tax_id: data.domestic_rfp.fee_tax_type_id,
          domestic_frp_amount: data.domestic_rfp.amount,
          // domestic_frp_amount_type: checkChargeType(data.domestic_rfp.charge_type_id),
          domestic_frp_percent: data.domestic_rfp.percent,
          domestic_frp_tax_include: data.domestic_rfp.is_tax_inclusive,
          domestic_non_gds: checkprocessingType(data.domestic_non_gds.charge_type_id),
          domestic_non_gds_fee_tax_id: data.domestic_non_gds.fee_tax_type_id,
          domestic_non_gds_amount: data.domestic_non_gds.amount,
          // domestic_non_gds_amount_type: checkChargeType(data.domestic_non_gds.charge_type_id),
          domestic_non_gds_percent: data.domestic_non_gds.percent,
          domestic_non_gds_tax_include: data.domestic_non_gds.is_tax_inclusive,
          international_reissue: checkprocessingType(data.international_reissue.charge_type_id),
          international_reissue_fee_tax_id: data.international_reissue.fee_tax_type_id,
          international_reissue_amount: data.international_reissue.amount,
          // international_reissue_amount_type: checkChargeType(data.international_reissue.charge_type_id),
          international_reissue_percent: data.international_reissue.percent,
          international_reissue_tax_include: data.international_reissue.is_tax_inclusive,
          international_revalidate: checkprocessingType(data.international_revalidate.charge_type_id),
          international_revalidate_fee_tax_id: data.international_revalidate.fee_tax_type_id,
          international_revalidate_amount: data.international_revalidate.amount,
          // international_revalidate_amount_type: checkChargeType(data.international_revalidate.charge_type_id),
          international_revalidate_percent: data.international_revalidate.percent,
          international_revalidate_tax_include: data.international_revalidate.is_tax_inclusive,
          international_refund: checkprocessingType(data.international_refund.charge_type_id),
          international_refund_fee_tax_id: data.international_refund.fee_tax_type_id,
          international_refund_amount: data.international_refund.amount,
          // international_refund_amount_type: checkChargeType(data.international_refund.charge_type_id),
          international_refund_percent: data.international_refund.percent,
          international_refund_tax_include: data.international_refund.is_tax_inclusive,
          international_void: checkprocessingType(data.international_void.charge_type_id),
          international_void_fee_tax_id: data.international_void.fee_tax_type_id,
          international_void_amount: data.international_void.amount,
          // international_void_amount_type: checkChargeType(data.international_void.charge_type_id),
          international_void_percent: data.international_void.percent,
          international_void_tax_include: data.international_void.is_tax_inclusive,
          international_frp: checkprocessingType(data.international_rfp.charge_type_id),
          international_frp_fee_tax_id: data.international_rfp.fee_tax_type_id,
          international_frp_amount: data.international_rfp.amount,
          // international_frp_amount_type: checkChargeType(data.international_rfp.charge_type_id),
          international_frp_percent: data.international_rfp.percent,
          international_frp_tax_include: data.international_rfp.is_tax_inclusive,
          international_non_gds: checkprocessingType(data.international_non_gds.charge_type_id),
          international_non_gds_fee_tax_id: data.international_non_gds.fee_tax_type_id,
          international_non_gds_amount: data.international_non_gds.amount,
          // international_non_gds_amount_type: checkChargeType(data.international_non_gds.charge_type_id),
          international_non_gds_percent: data.international_non_gds.percent,
          international_non_gds_tax_include: data.international_non_gds.is_tax_inclusive,
          // other_emergency: checkprocessingType(data.other_emergency_service.charge_type_id),
          // other_emergency_fee_tax_id: data.other_emergency_service.fee_tax_type_id,
          // other_emergency_amount: data.other_emergency_service.amount,
          // other_emergency_amount_type: checkChargeType(data.other_emergency_service.charge_type_id),
          // other_emergency_percent: data.other_emergency_service.percent,
          // other_emergency_tax_include: data.other_emergency_service.is_tax_inclusive
        })
    } catch (e) { console.log(e) }
  }, [])

  const onSubmit = async(payload, values) => {
    try {
      if(formId) {
        
      } else {
        onSubmitFee(values)
        openSnackbar(
          `Ancillary Fee has been successfully saved.`,
        )
        props.handleSelectTab("other-ancillary-fee")
      }
    } catch(e) {
      console.log(e)
      openSnackbar(`Failed to save this record.`)
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
  //function for remove separator 
  const removeSeparator = (value) => {
    value = value.toString().split(",").join("")
    return parseInt(value)
  }

  const onSubmitFee = (values) => {
      let payloadDomestic = {
        domestic_reissue: {
          fee_tax_type_id: taxIdDomesticReissue,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_reissue == "amount" ? removeSeparator(values.domestic_reissue_amount) : null,
          percent:values.domestic_reissue == "amount" ? null : values.domestic_reissue_percent,
          charge_type_id:values.domestic_reissue == "amount" ? values.domestic_reissue_amount_type : null,
          is_tax_inclusive:values.domestic_reissue == "amount" ? null : values.domestic_reissue_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_revalidate: {
          fee_tax_type_id: taxIdDomesticRevalidate,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_revalidate == "amount" ? removeSeparator(values.domestic_revalidate_amount) : null,
          percent:values.domestic_revalidate == "amount" ? null : values.domestic_revalidate_percent,
          charge_type_id:values.domestic_revalidate == "amount" ? values.domestic_revalidate_amount_type : null,
          is_tax_inclusive:values.domestic_revalidate == "amount" ? null : values.domestic_revalidate_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_refund: {
          fee_tax_type_id: taxIdDomesticRefund,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_refund == "amount" ? removeSeparator(values.domestic_refund_amount) : null,
          percent:values.domestic_refund == "amount" ? null : values.domestic_refund_percent,
          charge_type_id:values.domestic_refund == "amount" ? values.domestic_refund_amount_type : null,
          is_tax_inclusive:values.domestic_refund == "amount" ? null : values.domestic_refund_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_void: {
          fee_tax_type_id: taxIdDomesticVoid,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_void == "amount" ? removeSeparator(values.domestic_void_amount) : null,
          percent:values.domestic_void == "amount" ? null : values.domestic_void_percent,
          charge_type_id:values.domestic_void == "amount" ? values.domestic_void_amount_type : null,
          is_tax_inclusive:values.domestic_void == "amount" ? null : values.domestic_void_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_frp: {
          fee_tax_type_id: taxIdDomesticFrp,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_frp == "amount" ? removeSeparator(values.domestic_frp_amount) : null,
          percent:values.domestic_frp == "amount" ? null : values.domestic_frp_percent,
          charge_type_id:values.domestic_frp == "amount" ? values.domestic_frp_amount_type : null,
          is_tax_inclusive:values.domestic_frp == "amount" ? null : values.domestic_frp_tax_include,
          is_hidden: true,
          is_included: false,
        },
        domestic_non_gds: {
          fee_tax_type_id: taxIdDomesticNonGds,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_non_gds == "amount" ? removeSeparator(values.domestic_non_gds_amount) : null,
          percent:values.domestic_non_gds == "amount" ? null : values.domestic_non_gds_percent,
          charge_type_id:values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount_type : null,
          is_tax_inclusive:values.domestic_non_gds == "amount" ? null : values.domestic_non_gds_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_reissue: {
          fee_tax_type_id: taxIdInternationalReissue,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_reissue == "amount" ? removeSeparator(values.international_reissue_amount) : null,
          percent:values.international_reissue == "amount" ? null : values.international_reissue_percent,
          charge_type_id:values.international_reissue == "amount" ? values.international_reissue_amount_type : null,
          is_tax_inclusive:values.international_reissue == "amount" ? null : values.international_reissue_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_revalidate: {
          fee_tax_type_id: taxIdInternationalRevalidate,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_revalidate == "amount" ? removeSeparator(values.international_revalidate_amount) : null,
          percent:values.international_revalidate == "amount" ? null : values.international_revalidate_percent,
          charge_type_id:values.international_revalidate == "amount" ? values.international_revalidate_amount_type : null,
          is_tax_inclusive:values.international_revalidate == "amount" ? null : values.international_revalidate_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_refund: {
          fee_tax_type_id: taxIdInternationalRefund,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_refund == "amount" ? removeSeparator(values.international_refund_amount) : null,
          percent:values.international_refund == "amount" ? null : values.international_refund_percent,
          charge_type_id:values.international_refund == "amount" ? values.dinternational_refund_amount_type : null,
          is_tax_inclusive:values.international_refund == "amount" ? null : values.international_refund_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_void: {
          fee_tax_type_id: taxIdInternationalVoid,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_void == "amount" ? removeSeparator(values.international_void_amount) : null,
          percent:values.international_void == "amount" ? null : values.international_void_percent,
          charge_type_id:values.international_void == "amount" ? values.international_void_amount_type : null,
          is_tax_inclusive:values.international_void == "amount" ? null : values.international_void_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_frp: {
          fee_tax_type_id: taxIdInternationalFrp,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_frp == "amount" ? removeSeparator(values.international_frp_amount) : null,
          percent:values.international_frp == "amount" ? null : values.international_frp_percent,
          charge_type_id:values.international_frp == "amount" ? values.international_frp_amount_type : null,
          is_tax_inclusive:values.international_frp == "amount" ? null : values.international_frp_tax_include,
          is_hidden: true,
          is_included: false,
        },
        international_non_gds: {
          fee_tax_type_id: taxIdInternationalNonGds,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_non_gds == "amount" ? removeSeparator(values.international_non_gds_amount) : null,
          percent:values.international_non_gds == "amount" ? null : values.international_non_gds_percent,
          charge_type_id:values.international_non_gds == "amount" ? values.international_non_gds_amount_type : null,
          is_tax_inclusive:values.international_non_gds == "amount" ? null : values.international_non_gds_tax_include,
          is_hidden: true,
          is_included: false,
        },
        other_emergency_service: {
          fee_tax_type_id: taxIdOtherEmergency,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.other_emergency == "amount" ? removeSeparator(values.other_emergency_amount) : null,
          percent:values.other_emergency == "amount" ? null : values.other_emergency_percent,
          charge_type_id:values.other_emergency == "amount" ? values.other_emergency_amount_type : null,
          is_tax_inclusive:values.other_emergency == "amount" ? null : values.other_emergency_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_domestic_modify_fee: {
          fee_tax_type_id: taxIdDomesticHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_domestic_modify_fee == "amount" ? removeSeparator(values.hotel_domestic_modify_fee_amount) : null,
          percent:values.hotel_domestic_modify_fee == "amount" ? null : values.hotel_domestic_modify_fee_percent,
          charge_type_id:values.hotel_domestic_modify_fee == "amount" ? values.hotel_domestic_modify_fee_amount_type : null,
          is_tax_inclusive:values.hotel_domestic_modify_fee == "amount" ? null : values.hotel_domestic_modify_fee_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_domestic_refund_fee: {
          fee_tax_type_id: taxIdDomesticRefundHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_domestic_refund_fee == "amount" ? removeSeparator(values.hotel_domestic_refund_fee_amount) : null,
          percent:values.hotel_domestic_refund_fee == "amount" ? null : values.hotel_domestic_refund_fee_percent,
          charge_type_id:values.hotel_domestic_refund_fee == "amount" ? values.hotel_domestic_refund_fee_amount_type : null,
          is_tax_inclusive:values.hotel_domestic_refund_fee == "amount" ? null : values.hotel_domestic_refund_fee_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_domestic_non_gds: {
          fee_tax_type_id: taxIdDomesticNonGdsHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_domestic_non_gds == "amount" ? removeSeparator(values.hotel_domestic_non_gds_amount) : null,
          percent:values.hotel_domestic_non_gds == "amount" ? null : values.hotel_domestic_non_gds_percent,
          charge_type_id:values.hotel_domestic_non_gds == "amount" ? values.hotel_domestic_non_gds_amount_type : null,
          is_tax_inclusive:values.hotel_domestic_non_gds == "amount" ? null : values.hotel_domestic_non_gds_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_domestic_frp: {
          fee_tax_type_id: taxIdDomesticFrpHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_domestic_frp == "amount" ? removeSeparator(values.hotel_domestic_frp_amount) : null,
          percent:values.hotel_domestic_frp == "amount" ? null : values.hotel_domestic_frp_percent,
          charge_type_id:values.hotel_domestic_frp == "amount" ? values.hotel_domestic_frp_amount_type : null,
          is_tax_inclusive:values.hotel_domestic_frp == "amount" ? null : values.hotel_domestic_frp_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_international_modify: {
          fee_tax_type_id: taxIdInternationalHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_international_modify == "amount" ? removeSeparator(values.hotel_international_modify_amount) : null,
          percent:values.hotel_international_modify == "amount" ? null : values.hotel_international_modify_percent,
          charge_type_id:values.hotel_international_modify == "amount" ? values.hotel_international_modify_amount_type : null,
          is_tax_inclusive:values.hotel_international_modify == "amount" ? null : values.hotel_international_modify_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_international_refund_fee: {
          fee_tax_type_id: taxIdInternationalRefundHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_international_refund_fee == "amount" ? removeSeparator(values.hotel_international_refund_fee_amount) : null,
          percent:values.hotel_international_refund_fee == "amount" ? null : values.hotel_international_refund_fee_percent,
          charge_type_id:values.hotel_international_refund_fee == "amount" ? values.hotel_international_refund_fee_amount_type : null,
          is_tax_inclusive:values.hotel_international_refund_fee == "amount" ? null : values.hotel_international_refund_fee_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_international_non_gds: {
          fee_tax_type_id: taxIdInternationalNonGdsHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_international_non_gds == "amount" ? removeSeparator(values.hotel_international_non_gds_amount) : null,
          percent:values.hotel_international_non_gds == "amount" ? null : values.hotel_international_non_gds_percent,
          charge_type_id:values.hotel_international_non_gds == "amount" ? values.hotel_international_non_gds_amount_type : null,
          is_tax_inclusive:values.hotel_international_non_gds == "amount" ? null : values.hotel_international_non_gds_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_international_frp: {
          fee_tax_type_id: taxIdInternationalFrpHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.hotel_international_frp == "amount" ? removeSeparator(values.hotel_international_frp_amount) : null,
          percent:values.hotel_international_frp == "amount" ? null : values.hotel_international_frp_percent,
          charge_type_id:values.hotel_international_frp == "amount" ? values.hotel_international_frp_amount_type : null,
          is_tax_inclusive:values.hotel_international_frp == "amount" ? null : values.hotel_international_frp_tax_include,
          is_hidden: true,
          is_included: false,
        },
        hotel_other_emergency_service: {
          fee_tax_type_id: taxIdOtherEmergencyHotel,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.other_emergency == "amount" ? removeSeparator(values.other_emergency_amount) : null,
          percent:values.other_emergency == "amount" ? null : values.other_emergency_percent,
          charge_type_id:values.other_emergency == "amount" ? values.other_emergency_amount_type : null,
          is_tax_inclusive:values.other_emergency == "amount" ? null : values.other_emergency_tax_include,
          is_hidden: true,
          is_included: false,
        }

      }
      onSaveFee(payloadDomestic)
  }

  const onSaveFee = async(payload) => {
    try {
    console.log('payload', payload)
      let res = await api.post(endpointFee, payload)
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
                  <h3 className="card-heading">Retail Ancillary Fee</h3>
                  <div className="d-md-flex flex-row bd-highlight card-heading">&emsp;
                      <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
                      <span className="ml-md-2 tabs-text">FLIGHT</span>
                  </div>
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
                          taxType:taxTypeDomesticFrp,
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
                          taxType:taxTypeInternationalFrp,
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
                    showTaxes={true}
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
                </div>
              </Card.Body>

              <Card.Body>
                <div style={{ padding: "0 2px 2px" }}>
                  <div className="d-md-flex flex-row bd-highlight card-heading">&emsp;
                    <ReactSVG className="tabs-icon" src="/img/icons/tabs/hotel.svg" />
                    <span className="ml-md-2 tabs-text">HOTEL</span>
                  </div>
                  <FeeTabs
                    menu={[
                      {title: "Domestic", sections: [
                        {
                          title:"Domestic Modify Hotel Fee",
                          taxType:taxTypeDomesticHotel,
                          fieldFeeTaxId:"hotel_domestic_modify_fee_fee_tax_id",
                          fieldRadio:"hotel_domestic_modify_fee",
                          fieldAmount:"hotel_domestic_modify_fee_amount",
                          fieldAmountType:"hotel_domestic_modify_fee_amount_type",
                          fieldPercent:"hotel_domestic_modify_fee_percent",
                          fieldIncludeTax:"hotel_domestic_modify_fee_tax_include"
                        },
                        {
                          title:"Domestic Hotel Refund Fee",
                          taxType:taxTypeDomesticRefundHotel,
                          fieldFeeTaxId:"hotel_domestic_refund_fee_fee_tax_id",
                          fieldRadio:"hotel_domestic_refund_fee",
                          fieldAmount:"hotel_domestic_refund_fee_amount",
                          fieldAmountType:"hotel_domestic_refund_fee_amount_type",
                          fieldPercent:"hotel_domestic_refund_fee_percent",
                          fieldIncludeTax:"hotel_domestic_refund_fee_tax_include"
                        },
                        {
                          title:"Domestic FRP Fee (Contact Fee)",
                          taxType:taxTypeDomesticFrpHotel,
                          fieldFeeTaxId:"hotel_domestic_frp_fee_tax_id",
                          fieldRadio:"hotel_domestic_frp",
                          fieldAmount:"hotel_domestic_frp_amount",
                          fieldAmountType:"hotel_domestic_frp_amount_type",
                          fieldPercent:"hotel_domestic_frp_percent",
                          fieldIncludeTax:"hotel_domestic_frp_tax_include"
                        },
                        {
                          title:"Domestic Non-GDS Hotel Booking Process Fee",
                          taxType:taxTypeDomesticNonGdsHotel,
                          fieldFeeTaxId:"hotel_domestic_non_gds_fee_tax_id",
                          fieldRadio:"hotel_domestic_non_gds",
                          fieldAmount:"hotel_domestic_non_gds_amount",
                          fieldAmountType:"hotel_domestic_non_gds_amount_type",
                          fieldPercent:"hotel_domestic_non_gds_percent",
                          fieldIncludeTax:"hotel_domestic_non_gds_tax_include"
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"International Modify Hotel Fee",
                          taxType:taxTypeInternationalHotel,
                          fieldFeeTaxId:"hotel_international_modify_fee_tax_id",
                          fieldRadio:"hotel_international_modify",
                          fieldAmount:"hotel_international_modify_amount",
                          fieldAmountType:"hotel_international_modify_amount_type",
                          fieldPercent:"hotel_international_modify_percent",
                          fieldIncludeTax:"hotel_international_modify_tax_include"
                        },
                        {
                          title:"International Hotel Refund Fee",
                          taxType:taxTypeInternationalRefundHotel,
                          fieldFeeTaxId:"hotel_international_refund_fee_fee_tax_id",
                          fieldRadio:"hotel_international_refund_fee",
                          fieldAmount:"hotel_international_refund_fee_amount",
                          fieldAmountType:"hotel_international_refund_fee_amount_type",
                          fieldPercent:"hotel_international_refund_fee_percent",
                          fieldIncludeTax:"hotel_international_refund_fee_tax_include"
                        },
                        {
                          title:"International FRP Fee (Contact Fee)",
                          taxType:taxTypeInternationalFrpHotel,
                          fieldFeeTaxId:"hotel_international_frp_fee_tax_id",
                          fieldRadio:"hotel_international_frp",
                          fieldAmount:"hotel_international_frp_amount",
                          fieldAmountType:"hotel_international_frp_amount_type",
                          fieldPercent:"hotel_international_frp_percent",
                          fieldIncludeTax:"hotel_international_frp_tax_include"
                        },
                        {
                          title:"International Non-GDS Hotel Booking Process Fee",
                          taxType:taxTypeInternationalNonGdsHotel,
                          fieldFeeTaxId:"hotel_international_non_gds_fee_tax_id",
                          fieldRadio:"hotel_international_non_gds",
                          fieldAmount:"hotel_international_non_gds_amount",
                          fieldAmountType:"hotel_international_non_gds_amount_type",
                          fieldPercent:"hotel_international_non_gds_percent",
                          fieldIncludeTax:"hotel_international_non_gds_tax_include"
                        }
                      ]},
                      {title: "Other", sections: 
                        [{
                          title:"Emergency Service Assistance 24 Hours Surcharge - Issued Only",
                          taxType:taxTypeOtherEmergencyHotel,
                          fieldFeeTaxId:"hotel_other_emergency_service_fee_tax_id",
                          fieldRadio:"hotel_other_emergency_service",
                          fieldAmount:"hotel_other_emergency_service_amount",
                          fieldAmountType:"hotel_other_emergency_service_amount_type",
                          fieldPercent:"hotel_other_emergency_service_percent",
                          fieldIncludeTax:"hotel_other_emergency_service_tax_include"
                        }]
                      },
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    isView={isView}
                    showTaxes={true}
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
                // disabled={isSubmitting || !dirty}
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

export default withRouter(RetailAncillaryFee)
