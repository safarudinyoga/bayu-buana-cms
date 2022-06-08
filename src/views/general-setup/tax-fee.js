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
import { FeeTabs } from "./form//fee_tabs"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"
import { ReactSVG } from "react-svg"

const endpoint = "/master/configurations/tax-fee"
const endpointFee = "/master/configurations/tax-fee"
const options = {
  position: "bottom-right",
}
const TaxFee = (props) => {
  const history = useHistory()
  const [openSnackbar] = useSnackbar(options)
  let dispatch = useDispatch()
  let api = new Api()
  const formId = props.match.params.id
  const isView = useQuery().get("action") === "view"

  const [taxTypeDomesticFlightVat, setTaxTypeDomesticFlightVat] = useState([])
  const [taxTypeDomesticFlightServiceFeeVat, setTaxTypeDomesticFlightServiceFeeVat] = useState([])
  const [taxTypeDomesticHotelVat, setTaxTypeDomesticHotelVat] = useState([])
  const [taxTypeDomesticHotelServiceFeeVat, setTaxTypeDomesticHotelServiceFeeVat] = useState([])
  const [taxTypeOtherVat, setTaxTypeOtherVat] = useState([])
  const [taxTypeOtherServiceFeeVat, setTaxTypeOtherServiceFeeVat] = useState([])
  const [taxTypeInternationalFlightVat, setTaxTypeInternationalFlightVat] = useState([])
  const [taxTypeInternationalFlightServiceFeeVat, setTaxTypeInternationalFlightServiceFeeVat] = useState([])
  const [taxTypeInternationalHotelVat, setTaxTypeInternationalHotelVat] = useState([])
  const [taxTypeInternationalHotelServiceFeeVat, setTaxTypeInternationalHotelServiceFeeVat] = useState([])
  
  const [taxIdDomesticFlightVat, setTaxIdDomesticFlightVat] = useState("")
  const [taxIdDomesticFlightServiceFeeVat, setTaxIdDomesticFlightServiceFeeVat] = useState("")
  const [taxIdDomesticHotelVat, setTaxIdDomesticHotelVat] = useState("")
  const [taxIdDomesticHotelServiceFeeVat, setTaxIdDomesticHotelServiceFeeVat] = useState("")
  const [taxIdOtherVat, setTaxIdOtherVat] = useState("")
  const [taxIdOtherServiceFeeVat, setTaxIdOtherServiceFeeVat] = useState("")
  const [taxIdInternationalFlightVat, setTaxIdInternationalFlightVat] = useState("")
  const [taxIdInternationalFlightServiceFeeVat, setTaxIdInternationalFlightServiceFeeVat] = useState("")
  const [taxIdInternationalHotelVat, setTaxIdInternationalHotelVat] = useState("")
  const [taxIdInternationalHotelServiceFeeVat, setTaxIdInternationalHotelServiceFeeVat] = useState("")

  useEffect(async () => {
    let api = new Api()
  })

  useEffect(() => {
    getFeeTaxType("18", setTaxTypeDomesticFlightVat, setTaxIdDomesticFlightVat)
    getFeeTaxType("23", setTaxTypeDomesticFlightServiceFeeVat, setTaxIdDomesticFlightServiceFeeVat)
    getFeeTaxType("20", setTaxTypeDomesticHotelVat, setTaxIdDomesticHotelVat)
    getFeeTaxType("25", setTaxTypeDomesticHotelServiceFeeVat, setTaxIdDomesticHotelServiceFeeVat)
    getFeeTaxType("17", setTaxTypeOtherVat, setTaxIdOtherVat)
    getFeeTaxType("22", setTaxTypeOtherServiceFeeVat, setTaxIdOtherServiceFeeVat)  
    getFeeTaxType("19", setTaxTypeInternationalFlightVat, setTaxIdInternationalFlightVat)
    getFeeTaxType("24", setTaxTypeInternationalFlightServiceFeeVat, setTaxIdInternationalFlightServiceFeeVat)
    getFeeTaxType("21", setTaxTypeInternationalHotelVat, setTaxIdInternationalHotelVat)
    getFeeTaxType("26", setTaxTypeInternationalHotelServiceFeeVat, setTaxIdInternationalHotelServiceFeeVat)
  }, [props.match.params.id])
  
  // Initialize form
  const [initialForm, setInitialForm] = useState({
    domestic_flight_vat: "",
    domestic_flight_vat_fee_tax_id: "",
    domestic_flight_vat_amount: "",
    domestic_flight_vat_amount_type: "",
    domestic_flight_vat_percent: "",

    domestic_flight_service_fee_vat: "",
    domestic_flight_service_fee_vat_fee_tax_id: "",
    domestic_flight_service_fee_vat_amount: "",
    domestic_flight_service_fee_vat_amount_type: "",
    domestic_flight_service_fee_vat_percent: "",

    domestic_hotel_vat: "",
    domestic_hotel_vat_fee_tax_id: "",
    domestic_hotel_vat_amount: "",
    domestic_hotel_vat_amount_type: "",
    domestic_hotel_vat_percent: "",

    domestic_hotel_service_fee_vat: "",
    domestic_hotel_service_fee_vat_fee_tax_id: "",
    domestic_hotel_service_fee_vat_amount: "",
    domestic_hotel_service_fee_vat_amount_type: "",
    domestic_hotel_service_fee_vat_percent: "",
    
    domestic_other_vat: "",
    domestic_other_vat_fee_tax_id: "",
    domestic_other_vat_amount: "",
    domestic_other_vat_amount_type: "",
    domestic_other_vat_percent: "",

    domestic_other_service_fee_vat: "",
    domestic_other_service_fee_vat_fee_tax_id: "",
    domestic_other_service_fee_vat_amount: "",
    domestic_other_service_fee_vat_amount_type: "",
    domestic_other_service_fee_vat_percent: "",

    international_flight_vat: "",
    international_flight_vat_fee_tax_id: "",
    international_flight_vat_amount: "",
    international_flight_vat_amount_type: "",
    international_flight_vat_percent: "",

    international_flight_service_fee_vat: "",
    international_flight_service_fee_vat_fee_tax_id: "",
    international_flight_service_fee_vat_amount: "",
    international_flight_service_fee_vat_amount_type: "",
    international_flight_service_fee_vat_percent: "",

    international_hotel_vat: "",
    international_hotel_vat_fee_tax_id: "",
    international_hotel_vat_amount: "",
    international_hotel_vat_amount_type: "",
    international_hotel_vat_percent: "",

    international_hotel_service_fee_vat: "",
    international_hotel_service_fee_vat_fee_tax_id: "",
    international_hotel_service_fee_vat_amount: "",
    international_hotel_service_fee_vat_amount_type: "",
    international_hotel_service_fee_vat_percent: "",

    international_hotel_service_fee_vat: "",
    international_hotel_service_fee_vat_fee_tax_id: "",
    international_hotel_service_fee_vat_amount: "",
    international_hotel_service_fee_vat_amount_type: "",
    international_hotel_service_fee_vat_percent: "",
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // Domestic
    domestic_flight_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticFlightVat.fee_tax_type_name}.`),
    domestic_flight_vat_amount: Yup
      .string().when('domestic_flight_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticFlightVat.fee_tax_type_name}.`)
      }),
    domestic_flight_vat_amount_type: Yup
      .string().when('domestic_flight_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_flight_vat_percent: Yup
      .string().when('domestic_flight_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticFlightVat.fee_tax_type_name}.`)
      }),
    domestic_flight_service_fee_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticFlightServiceFeeVat.fee_tax_type_name}.`),
    domestic_flight_service_fee_vat_amount: Yup
      .string().when('domestic_flight_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticFlightServiceFeeVat.fee_tax_type_name}.`)
      }),
    domestic_flight_service_fee_vat_amount_type: Yup
      .string().when('domestic_flight_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_flight_service_fee_vat_percent: Yup
      .string().when('domestic_flight_service_fee_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticFlightServiceFeeVat.fee_tax_type_name}.`)
      }),
    domestic_hotel_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticHotelVat.fee_tax_type_name}.`),
    domestic_hotel_vat_amount: Yup
      .string().when('domestic_hotel_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticHotelVat.fee_tax_type_name}.`)
      }),
    domestic_hotel_vat_amount_type: Yup
      .string().when('domestic_hotel_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_hotel_vat_percent: Yup
      .string().when('domestic_hotel_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticHotelVat.fee_tax_type_name}.`)
      }),
    domestic_hotel_service_fee_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeDomesticHotelServiceFeeVat.fee_tax_type_name}.`),
    domestic_hotel_service_fee_vat_amount: Yup
      .string().when('domestic_hotel_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeDomesticHotelServiceFeeVat.fee_tax_type_name}.`)
      }),
    domestic_hotel_service_fee_vat_amount_type: Yup
      .string().when('domestic_hotel_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_hotel_service_fee_vat_percent: Yup
      .string().when('domestic_hotel_service_fee_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeDomesticHotelServiceFeeVat.fee_tax_type_name}.`)
      }),
    domestic_other_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeOtherVat.fee_tax_type_name}.`),
    domestic_other_vat_amount: Yup
      .string().when('domestic_other_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeOtherVat.fee_tax_type_name}.`)
      }),
    domestic_other_vat_amount_type: Yup
      .string().when('domestic_other_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_other_vat_percent: Yup
      .string().when('domestic_other_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeOtherVat.fee_tax_type_name}.`)
      }),
    domestic_other_service_fee_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeOtherServiceFeeVat.fee_tax_type_name}.`),
    domestic_other_service_fee_vat_amount: Yup
      .string().when('domestic_other_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeOtherServiceFeeVat.fee_tax_type_name}.`)
      }),
    domestic_other_service_fee_vat_amount_type: Yup
      .string().when('domestic_other_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    domestic_other_service_fee_vat_percent: Yup
      .string().when('domestic_other_service_fee_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeOtherServiceFeeVat.fee_tax_type_name}.`)
      }),

    // International
    international_flight_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalFlightVat.fee_tax_type_name}.`),
    international_flight_vat_amount: Yup
      .string().when('international_flight_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalFlightVat.fee_tax_type_name}.`)
      }),
    international_flight_vat_amount_type: Yup
      .string().when('international_flight_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_flight_vat_percent: Yup
      .string().when('international_flight_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalFlightVat.fee_tax_type_name}.`)
      }), 
    international_flight_service_fee_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalFlightServiceFeeVat.fee_tax_type_name}.`),
    international_flight_service_fee_vat_amount: Yup
      .string().when('international_flight_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalFlightServiceFeeVat.fee_tax_type_name}.`)
      }),
    international_flight_service_fee_vat_amount_type: Yup
      .string().when('international_flight_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_flight_service_fee_vat_percent: Yup
      .string().when('international_flight_service_fee_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalFlightServiceFeeVat.fee_tax_type_name}.`)
      }), 
    international_hotel_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalHotelVat.fee_tax_type_name}.`),
    international_hotel_vat_amount: Yup
      .string().when('international_hotel_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalHotelVat.fee_tax_type_name}.`)
      }),
    international_hotel_vat_amount_type: Yup
      .string().when('international_hotel_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_hotel_vat_percent: Yup
      .string().when('international_hotel_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalHotelVat.fee_tax_type_name}.`)
      }), 
    international_hotel_service_fee_vat: Yup
      .string()
      .required(`Please enter fixed amount or percentage for ${taxTypeInternationalHotelServiceFeeVat.fee_tax_type_name}.`),
    international_hotel_service_fee_vat_amount: Yup
      .string().when('international_hotel_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please enter fixed amount for ${taxTypeInternationalHotelServiceFeeVat.fee_tax_type_name}.`)
      }),
    international_hotel_service_fee_vat_amount_type: Yup
      .string().when('international_hotel_service_fee_vat', {
        is: value => value === "amount",
        then: Yup.string().required(`Please select charge type.`)
      }),
    international_hotel_service_fee_vat_percent: Yup
      .string().when('international_hotel_service_fee_vat', {
        is: value => value === "percent",
        then: Yup.string().required(`Please enter percentage for ${taxTypeInternationalHotelServiceFeeVat.fee_tax_type_name}.`)
      }), 
  })

  useEffect(async() => {
    try {
      if(formId) {
        let {data} = await api.get(endpointFee+ "/" + formId)
        setInitialForm({
          ...initialForm, 
          ...data,
          domestic_flight_vat: data.domestic_flight_vat.charge_type_id,
          domestic_flight_vat_fee_tax_id: data.domestic_flight_vat.fee_tax_type_id,
          domestic_flight_vat_amount: data.domestic_flight_vat.amount,
          domestic_flight_vat_amount_type: data.domestic_flight_vat.charge_type_id,
          domestic_flight_vat_percent: data.domestic_flight_vat.percent,

          domestic_flight_service_fee_vat: data.domestic_flight_service_fee_vat.charge_type_id,
          domestic_flight_service_fee_vat_fee_tax_id: data.domestic_flight_service_fee_vat.fee_tax_type_id,
          domestic_flight_service_fee_vat_amount: data.domestic_flight_service_fee_vat.amount,
          domestic_flight_service_fee_vat_amount_type: data.domestic_flight_service_fee_vat.charge_type_id,
          domestic_flight_service_fee_vat_percent: data.domestic_flight_service_fee_vat.percent,

          domestic_hotel_vat: data.domestic_hotel_vat.charge_type_id,
          domestic_hotel_vat_fee_tax_id: data.domestic_hotel_vat.fee_tax_type_id,
          domestic_hotel_vat_amount: data.domestic_hotel_vat.amount,
          domestic_hotel_vat_amount_type: data.domestic_hotel_vat.charge_type_id,
          domestic_hotel_vat_percent: data.domestic_hotel_vat.percent,
          
          domestic_hotel_service_fee_vat: data.domestic_hotel_service_fee_vat.charge_type_id,
          domestic_hotel_service_fee_vat_fee_tax_id: data.domestic_hotel_service_fee_vat.fee_tax_type_id,
          domestic_hotel_service_fee_vat_amount: data.domestic_hotel_service_fee_vat.amount,
          domestic_hotel_service_fee_vat_amount_type: data.domestic_hotel_service_fee_vat.charge_type_id,
          domestic_hotel_service_fee_vat_percent: data.domestic_hotel_service_fee_vat.percent,
          
          domestic_other_vat: data.domestic_other_vat.charge_type_id,
          domestic_other_vat_fee_tax_id: data.domestic_other_vat.fee_tax_type_id,
          domestic_other_vat_amount: data.domestic_other_vat.amount,
          domestic_other_vat_amount_type: data.domestic_other_vat.charge_type_id,
          domestic_other_vat_percent: data.domestic_other_vat.percent,
          
          domestic_other_service_fee_vat: data.domestic_other_service_fee_vat.charge_type_id,
          domestic_other_service_fee_vat_fee_tax_id: data.domestic_other_service_fee_vat.fee_tax_type_id,
          domestic_other_service_fee_vat_amount: data.domestic_other_service_fee_vat.amount,
          domestic_other_service_fee_vat_amount_type: data.domestic_other_service_fee_vat.charge_type_id,
          domestic_other_service_fee_vat_percent: data.domestic_other_service_fee_vat.percent,
          
          international_flight_vat: data.international_flight_vat.charge_type_id,
          international_flight_vat_fee_tax_id: data.international_flight_vat.fee_tax_type_id,
          international_flight_vat_amount: data.international_flight_vat.amount,
          international_flight_vat_amount_type: data.international_flight_vat.charge_type_id,
          international_flight_vat_percent: data.international_flight_vat.percent,
          
          international_flight_service_fee_vat: data.international_flight_service_fee_vat.charge_type_id,
          international_flight_service_fee_vat_fee_tax_id: data.international_flight_service_fee_vat.fee_tax_type_id,
          international_flight_service_fee_vat_amount: data.international_flight_service_fee_vat.amount,
          international_flight_service_fee_vat_amount_type: data.international_flight_service_fee_vat.charge_type_id,
          international_flight_service_fee_vat_percent: data.international_flight_service_fee_vat.percent,
          
          international_hotel_vat: data.international_hotel_vat.charge_type_id,
          international_hotel_vat_fee_tax_id: data.international_hotel_vat.fee_tax_type_id,
          international_hotel_vat_amount: data.international_hotel_vat.amount,
          international_hotel_vat_amount_type: data.international_hotel_vat.charge_type_id,
          international_hotel_vat_percent: data.international_hotel_vat.percent,
          
          international_hotel_service_fee_vat: data.international_hotel_service_fee_vat.charge_type_id,
          international_hotel_service_fee_vat_fee_tax_id: data.international_hotel_service_fee_vat.fee_tax_type_id,
          international_hotel_service_fee_vat_amount: data.international_hotel_service_fee_vat.amount,
          international_hotel_service_fee_vat_amount_type: data.international_hotel_service_fee_vat.charge_type_id,
          international_hotel_service_fee_vat_percent: data.international_hotel_service_fee_vat.percent,
          
          international_hotel_service_fee_vat: data.international_hotel_service_fee_vat.charge_type_id,
          international_hotel_service_fee_vat_fee_tax_id: data.international_hotel_service_fee_vat.fee_tax_type_id,
          international_hotel_service_fee_vat_amount: data.international_hotel_service_fee_vat.amount,
          international_hotel_service_fee_vat_amount_type: data.international_hotel_service_fee_vat.charge_type_id,
          international_hotel_service_fee_vat_percent: data.international_hotel_service_fee_vat.percent
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
      domestic_flight_vat: {
        fee_tax_type_id: taxIdDomesticFlightVat,
        amount: values.domestic_flight_vat == "amount" ? removeSeparator(values.domestic_flight_vat_amount) : null,
        percent:values.domestic_flight_vat == "amount" ? null : values.domestic_flight_vat_percent,
        charge_type_id:values.domestic_flight_vat == "amount" ? values.domestic_flight_vat_amount_type : null,
      },
      domestic_flight_service_fee_vat: {
        fee_tax_type_id: taxIdDomesticFlightServiceFeeVat,
        amount: values.domestic_flight_service_fee_vat == "amount" ? values.domestic_flight_service_fee_vat_amount : null,
        percent:values.domestic_flight_service_fee_vat == "amount" ? null : values.domestic_flight_service_fee_vat_percent,
        charge_type_id:values.domestic_flight_service_fee_vat == "amount" ? values.domestic_flight_service_fee_vat_amount_type : null,
      },
      domestic_hotel_vat: {
        fee_tax_type_id: taxIdDomesticHotelVat,
        amount: values.domestic_hotel_vat == "amount" ? values.domestic_hotel_vat_amount : null,
        percent:values.domestic_hotel_vat == "amount" ? null : values.domestic_hotel_vat_percent,
        charge_type_id:values.domestic_hotel_vat == "amount" ? values.domestic_hotel_vat_amount_type : null,
      },
      domestic_hotel_service_fee_vat: {
        fee_tax_type_id: taxIdDomesticHotelServiceFeeVat,
        amount: values.domestic_hotel_service_fee_vat == "amount" ? values.domestic_hotel_service_fee_vat_amount : null,
        percent:values.domestic_hotel_service_fee_vat == "amount" ? null : values.domestic_hotel_service_fee_vat_percent,
        charge_type_id:values.domestic_hotel_service_fee_vat == "amount" ? values.domestic_hotel_service_fee_vat_amount_type : null,
      },
      domestic_other_vat: {
        fee_tax_type_id: taxIdOtherVat,
        amount: values.domestic_other_vat == "amount" ? values.domestic_other_vat_amount : null,
        percent:values.domestic_other_vat == "amount" ? null : values.domestic_other_vat_percent,
        charge_type_id:values.domestic_other_vat == "amount" ? values.domestic_other_vat_amount_type : null,
      },
      domestic_other_service_fee_vat: {
        fee_tax_type_id: taxIdOtherServiceFeeVat,
        amount: values.domestic_other_service_fee_vat == "amount" ? values.domestic_other_service_fee_vat_amount : null,
        percent:values.domestic_other_service_fee_vat == "amount" ? null : values.domestic_other_service_fee_vat_percent,
        charge_type_id:values.domestic_other_service_fee_vat == "amount" ? values.domestic_other_service_fee_vat_amount_type : null,
      },
      international_flight_vat: {
        fee_tax_type_id: taxIdInternationalFlightVat,
        amount: values.international_flight_vat == "amount" ? values.international_flight_vat_amount : null,
        percent:values.international_flight_vat == "amount" ? null : values.international_flight_vat_percent,
        charge_type_id:values.international_flight_vat == "amount" ? values.international_flight_vat_amount_type : null,
      },
      international_flight_service_fee_vat: {
        fee_tax_type_id: taxIdInternationalFlightServiceFeeVat,
        amount: values.international_flight_service_fee_vat == "amount" ? values.international_flight_service_fee_vat_amount : null,
        percent:values.international_flight_service_fee_vat == "amount" ? null : values.international_flight_service_fee_vat_percent,
        charge_type_id:values.international_flight_service_fee_vat == "amount" ? values.international_flight_service_fee_vat_amount_type : null,
      },
      international_hotel_vat: {
        fee_tax_type_id: taxIdInternationalHotelVat,
        amount: values.international_hotel_vat == "amount" ? values.international_hotel_vat_amount : null,
        percent:values.international_hotel_vat == "amount" ? null : values.international_hotel_vat_percent,
        charge_type_id:values.international_hotel_vat == "amount" ? values.dinternational_hotel_vat_amount_type : null,
      },
      international_hotel_service_fee_vat: {
        fee_tax_type_id: taxIdInternationalHotelServiceFeeVat,
        amount: values.international_hotel_service_fee_vat == "amount" ? values.international_hotel_service_fee_vat_amount : null,
        percent:values.international_hotel_service_fee_vat == "amount" ? null : values.international_hotel_service_fee_vat_percent,
        charge_type_id:values.international_hotel_service_fee_vat == "amount" ? values.international_hotel_service_fee_vat_amount_type : null,
      },
    }
    return payloadDomestic
  }

    const onSubmit = async(values) => {
      try {
        let payload = setPayload(values)
        let res = await api.putOrPost(endpoint, formId, payload)
        openSnackbar(
          `Tax Fee has been successfully ${formId ? 'updated' : 'saved'}.`,
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
                <h3 className="card-heading">Tax Fee</h3>
                <div className="d-md-flex flex-row bd-highlight card-heading">&emsp;
                    <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
                    <span className="ml-md-2 tabs-text">FLIGHT</span>
                </div>
                  <FeeTabs
                    menu={[
                      {title: "Domestic", sections: [
                        {
                          title:"Flight VAT",
                          taxType:taxTypeDomesticFlightVat,
                          fieldFeeTaxId:"domestic_flight_vat_fee_tax_id",
                          fieldRadio:"domestic_flight_vat",
                          fieldAmount:"domestic_flight_vat_amount",
                          fieldAmountType:"domestic_flight_vat_amount_type",
                          fieldPercent:"domestic_flight_vat_percent",
                        },
                        {
                          title:"Revalidate Fee",
                          taxType:taxTypeDomesticFlightServiceFeeVat,
                          fieldFeeTaxId:"domestic_flight_service_fee_vat_fee_tax_id",
                          fieldRadio:"domestic_flight_service_fee_vat",
                          fieldAmount:"domestic_flight_service_fee_vat_amount",
                          fieldAmountType:"domestic_flight_service_fee_vat_amount_type",
                          fieldPercent:"domestic_flight_service_fee_vat_percent",
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"Reissue Fee (Reissue & Reroute)",
                          taxType:taxTypeInternationalFlightVat,
                          fieldFeeTaxId:"international_flight_vat_fee_tax_id",
                          fieldRadio:"international_flight_vat",
                          fieldAmount:"international_flight_vat_amount",
                          fieldAmountType:"international_flight_vat_amount_type",
                          fieldPercent:"international_flight_vat_percent",
                        },
                        {
                          title:"Revalidate Fee",
                          taxType:taxTypeInternationalFlightServiceFeeVat,
                          fieldFeeTaxId:"international_flight_service_fee_vat_fee_tax_id",
                          fieldRadio:"international_flight_service_fee_vat",
                          fieldAmount:"international_flight_service_fee_vat_amount",
                          fieldAmountType:"international_flight_service_fee_vat_amount_type",
                          fieldPercent:"international_flight_service_fee_vat_percent",
                        }
                      ]},
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    isView={isView}
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
                          title:"Hotel VAT",
                          taxType:taxTypeDomesticHotelVat,
                          fieldFeeTaxId:"domestic_hotel_vat_fee_tax_id",
                          fieldRadio:"domestic_hotel_vat",
                          fieldAmount:"domestic_hotel_vat_amount",
                          fieldAmountType:"domestic_hotel_vat_amount_type",
                          fieldPercent:"domestic_hotel_vat_percent",
                        },
                        {
                          title:"Hotel Service Fee VAT",
                          taxType:taxTypeDomesticHotelServiceFeeVat,
                          fieldFeeTaxId:"domestic_hotel_service_fee_vat_fee_tax_id",
                          fieldRadio:"domestic_hotel_service_fee_vat",
                          fieldAmount:"domestic_hotel_service_fee_vat_amount",
                          fieldAmountType:"domestic_hotel_service_fee_vat_amount_type",
                          fieldPercent:"domestic_hotel_service_fee_vat_percent",
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"Hotel Vat",
                          taxType:taxTypeInternationalHotelVat,
                          fieldFeeTaxId:"international_hotel_vat_fee_tax_id",
                          fieldRadio:"international_hotel_vat",
                          fieldAmount:"international_hotel_vat_amount",
                          fieldAmountType:"international_hotel_vat_amount_type",
                          fieldPercent:"international_hotel_vat_percent",
                        },
                        {
                          title:"Hotel Service Fee VAT",
                          taxType:taxTypeInternationalHotelServiceFeeVat,
                          fieldFeeTaxId:"international_hotel_service_fee_vat_fee_tax_id",
                          fieldRadio:"international_hotel_service_fee_vat",
                          fieldAmount:"international_hotel_service_fee_vat_amount",
                          fieldAmountType:"international_hotel_service_fee_vat_amount_type",
                          fieldPercent:"international_hotel_service_fee_vat_percent",
                        }
                      ]},
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    isView={isView}
                  />
                </div>
              </Card.Body>

              <Card.Body>
                <div style={{ padding: "0 2px 2px" }}>
                  <div className="d-md-flex flex-row bd-highlight card-heading">&emsp;
                    <ReactSVG className="tabs-icon" src="/img/icons/tabs/other.svg" />
                    <span className="ml-md-2 tabs-text">OTHER</span>
                  </div>
                  <FeeTabs
                    menu={[
                      {title: "Other", sections: [
                        {
                          title:"Rent Car VAT",
                          taxType:taxTypeOtherVat,
                          fieldFeeTaxId:"domestic_other_vat_tax_id",
                          fieldRadio:"domestic_other_vat",
                          fieldAmount:"domestic_other_vat_amount",
                          fieldAmountType:"domestic_other_vat_amount_type",
                          fieldPercent:"domestic_other_vat_percent",
                        },
                        {
                          title:"Service Fee VAT",
                          taxType:taxTypeOtherServiceFeeVat,
                          fieldFeeTaxId:"domestic_other_service_fee_vat_tax_id",
                          fieldRadio:"domestic_other_service_fee_vat",
                          fieldAmount:"domestic_other_service_fee_vat_amount",
                          fieldAmountType:"domestic_other_service_fee_vat_amount_type",
                          fieldPercent:"domestic_other_service_fee_vat_percent",
                        }
                      ]}
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    isView={isView}
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

export default withRouter(TaxFee)
