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

const endpoint = "/master/processing-fee-categories"
const endpointFee = "/master/agent-processing-fee-categories"
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

  // Tax Type Flight
  const [taxTypeDomesticFlightVat, setTaxTypeDomesticFlightVat] = useState([])
  const [taxTypeDomesticFlightServiceFeeVat, setTaxTypeDomesticFlightServiceFeeVat] = useState([])
  const [taxTypeInternationalFlightServiceFeeVat, setTaxTypeInternationalFlightServiceFeeVat] = useState([])
  const [taxTypeInternationalFlightVat, setTaxTypeInternationalFlightVat] = useState([])
 
  // Tax Type Hotel
  const [taxTypeDomesticHotelServiceFeeVat, setTaxTypeDomesticHotelServiceFeeVat] = useState([])
  const [taxTypeDomesticHotelVat, setTaxTypeDomesticHotelVat] = useState([])
  const [taxTypeInternationalHotelServiceFeeVat, setTaxTypeInternationalHotelServiceFeeVat] = useState([])
  const [taxTypeInternationalHotelVat, setTaxTypeInternationalHotelVat] = useState([])

  // Tax Type Other 
  const [taxTypeOtherRentCarVat, setTaxTypeOtherRentCarVat] = useState([])
  const [taxTypeOtherServiceFeeVat, setTaxTypeOtherServiceFeeVat] = useState([])
  
  
  // Tax ID Flight 
  const [taxIdDomesticFlightVat, setTaxIdDomesticFlightVat] = useState("")
  const [taxIdDomesticFlightServiceFeeVat, setTaxIdDomesticFlightServiceFeeVat] = useState("")
  const [taxIdInternationalFlightServiceFeeVat, setTaxIdInternationalFlightServiceFeeVat] = useState("")
  const [taxIdInternationalFlightVat, setTaxIdInternationalFlightVat] = useState("")

  // Tax ID Hotel
  const [taxIdDomesticHotelServiceFeeVat, setTaxIdDomesticHotelServiceFeeVat] = useState("")
  const [taxIdDomesticHotelVat, setTaxIdDomesticHotelVat] = useState("")
  const [taxIdInternationalHotelServiceFeeVat, setTaxIdInternationalHotelServiceFeeVat] = useState("")
  const [taxIdInternationalHotelVat, setTaxIdInternationalHotelVat] = useState("")

  // Tax ID Other 
  const [taxIdOtherRentCarVat, setTaxIdOtherRentCarVat] = useState([])
  const [taxIdOtherServiceFeeVat, setTaxIdOtherServiceFeeVat] = useState([])
  
  // useEffect(async () => {
  //   let api = new Api()
  // })

  useEffect(() => {
    getFeeTaxType("18", setTaxTypeDomesticFlightVat, setTaxIdDomesticFlightVat)
    getFeeTaxType("23", setTaxTypeDomesticFlightServiceFeeVat, setTaxIdDomesticFlightServiceFeeVat)
    getFeeTaxType("24", setTaxTypeInternationalFlightServiceFeeVat, setTaxIdInternationalFlightServiceFeeVat)
    getFeeTaxType("19", setTaxTypeInternationalFlightVat, setTaxIdInternationalFlightVat)
    getFeeTaxType("25", setTaxTypeDomesticHotelServiceFeeVat, setTaxIdDomesticHotelServiceFeeVat)
    getFeeTaxType("20", setTaxTypeDomesticHotelVat, setTaxIdDomesticHotelVat)
    getFeeTaxType("26", setTaxTypeInternationalHotelServiceFeeVat, setTaxIdInternationalHotelServiceFeeVat)
    getFeeTaxType("21", setTaxTypeInternationalHotelVat, setTaxIdInternationalHotelVat)
    getFeeTaxType("51", setTaxTypeOtherRentCarVat, setTaxIdOtherRentCarVat)
    getFeeTaxType("22", setTaxTypeOtherServiceFeeVat, setTaxIdOtherServiceFeeVat)

  }, [props.match.params.id])
  
  // Initialize form
  const [initialForm, setInitialForm] = useState({
    processing_fee_category_name: "",
    description: "",
    // Flight
    domestic_flight_vat:"",
    domestic_flight_vat_tax_id: "",
    domestic_flight_vat_amount: "",
    domestic_flight_vat_amount_type: "",
    domestic_flight_vat_percent: "",
    domestic_flight_service_fee_vat: "",
    domestic_flight_service_fee_vat_tax_id: "",
    domestic_flight_service_fee_vat_amount: "",
    domestic_flight_service_fee_vat_amount_type: "",
    domestic_flight_service_fee_vat_percent: "",
    international_flight_vat: "",
    international_flight_vat_tax_id: "",
    international_flight_vat_amount: "",
    international_flight_vat_amount_type: "",
    international_flight_vat_percent: "",
    international_flight_service_fee_vat: "",
    international_flight_service_fee_vat_tax_id: "",
    international_flight_service_fee_vat_amount: "",
    international_flight_service_fee_vat_amount_type: "",
    international_flight_service_fee_vat_percent: "",

    // Hotel
    domestic_hotel_vat: "",
    domestic_hotel_vat_tax_id: "",
    domestic_hotel_vat_amount: "",
    domestic_hotel_vat_amount_type: "",
    domestic_hotel_vat_percent: "",
    domestic_hotel_service_fee_vat: "",
    domestic_hotel_service_fee_vat_tax_id: "",
    domestic_hotel_service_fee_vat_amount: "",
    domestic_hotel_service_fee_vat_amount_type: "",
    domestic_hotel_service_fee_vat_percent: "",
    international_hotel_vat: "",
    international_hotel_vat_tax_id: "",
    international_hotel_vat_amount: "",
    international_hotel_vat_amount_type: "",
    international_hotel_vat_percent: "",
    international_hotel_service_fee_vat: "",
    international_hotel_service_fee_vat_tax_id: "",
    international_hotel_service_fee_vat_amount: "",
    international_hotel_service_fee_vat_amount_type: "",
    international_hotel_service_fee_vat_percent: "",

    // Other
    domestic_other_vat: "",
    domestic_other_vat_tax_id: "",
    domestic_other_vat_amount: "",
    domestic_other_vat_amount_type: "",
    domestic_other_vat_percent: "",
    domestic_other_service_fee_vat: "",
    domestic_other_service_fee_vat_tax_id: "",
    domestic_other_service_fee_vat_amount: "",
    domestic_other_service_fee_vat_amount_type: "",
    domestic_other_service_fee_vat_percent: "",

  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // processing_fee_category_name: Yup.string().required("Present Name is required."),
    // Flight

    // Hotel

    // Other
  })

  useEffect(async() => {
    try {
      if(formId) {
        let res = await api.get(endpoint + "/" + formId)
        // let agent_res = await api.get(`endpointFee+ "/1/" + res.data.id)
        setInitialForm({
          ...initialForm, 
          ...res.data,
          // ...agent_res.data
        })
      }
    } catch (e) { console.log(e) }
  }, [])

  const onSubmit = async(payload, values) => {
    try {
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
        // Flight 
        domestic_flight_vat: {
          fee_tax_type_id: taxIdDomesticFlightVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_flight_vat == "amount" ? values.domestic_flight_vat_amount : null,
          percent:values.domestic_flight_vat == "amount" ? null : values.domestic_flight_vat_percent,
          charge_type_id:values.domestic_flight_vat == "amount" ? values.domestic_flight_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },
        domestic_flight_service_fee_vat: {
          fee_tax_type_id: taxIdDomesticFlightServiceFeeVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_flight_service_fee_vat == "amount" ? values.domestic_flight_service_fee_vat_amount : null,
          percent:values.domestic_flight_service_fee_vat == "amount" ? null : values.domestic_flight_service_fee_vat_percent,
          charge_type_id:values.domestic_flight_service_fee_vat == "amount" ? values.domestic_flight_service_fee_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },  
        international_flight_vat: {
          fee_tax_type_id: taxIdInternationalFlightVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_flight_vat == "amount" ? values.international_flight_vat_amount : null,
          percent:values.international_flight_vat == "amount" ? null : values.international_flight_vat_percent,
          charge_type_id:values.international_flight_vat == "amount" ? values.international_flight_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },
        international_flight_service_fee_vat: {
          fee_tax_type_id: taxIdInternationalFlightServiceFeeVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_flight_service_fee_vat == "amount" ? values.international_flight_service_fee_vat_amount : null,
          percent:values.international_flight_service_fee_vat == "amount" ? null : values.international_flight_service_fee_vat_percent,
          charge_type_id:values.international_flight_service_fee_vat == "amount" ? values.international_flight_service_fee_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },  

        //Hotel
        domestic_hotel_vat: {
          fee_tax_type_id: taxIdDomesticHotelVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_hotel_vat == "amount" ? values.domestic_hotel_vat_amount : null,
          percent:values.domestic_hotel_vat == "amount" ? null : values.domestic_hotel_vat_percent,
          charge_type_id:values.domestic_hotel_vat == "amount" ? values.domestic_hotel_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },
        domestic_hotel_service_fee_vat: {
          fee_tax_type_id: taxIdDomesticHotelServiceFeeVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_hotel_service_fee_vat == "amount" ? values.domestic_hotel_service_fee_vat_amount : null,
          percent:values.domestic_hotel_service_fee_vat == "amount" ? null : values.domestic_hotel_service_fee_vat_percent,
          charge_type_id:values.domestic_hotel_service_fee_vat == "amount" ? values.domestic_hotel_service_fee_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },  
        international_hotel_vat: {
          fee_tax_type_id: taxIdInternationalHotelVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_hotel_vat == "amount" ? values.international_hotel_vat_amount : null,
          percent:values.international_hotel_vat == "amount" ? null : values.international_hotel_vat_percent,
          charge_type_id:values.international_hotel_vat == "amount" ? values.international_hotel_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },
        international_hotel_service_fee_vat: {
          fee_tax_type_id: taxIdInternationalHotelServiceFeeVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.international_hotel_service_fee_vat == "amount" ? values.international_hotel_service_fee_vat_amount : null,
          percent:values.international_hotel_service_fee_vat == "amount" ? null : values.international_hotel_service_fee_vat_percent,
          charge_type_id:values.internahotel_flight_service_fee_vat == "amount" ? values.international_hotel_service_fee_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },  

        // Other
        domestic_other_vat: {
          fee_tax_type_id: taxIdOtherRentCarVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_other_vat == "amount" ? values.domestic_other_vat_amount : null,
          percent:values.domestic_other_vat == "amount" ? null : values.domestic_other_vat_percent,
          charge_type_id:values.domestic_other_vat == "amount" ? values.domestic_other_vat_amount_type : null,
          is_hidden: true,
          is_included: false,
        },

        domestic_other_service_fee_vat: {
          fee_tax_type_id: taxIdOtherServiceFeeVat,
          currency_id:"ccd96b44-3053-4469-9c55-0b7163a01d34",
          amount: values.domestic_other_service_fee_vat == "amount" ? values.domestic_other_service_fee_vat_amount : null,
          percent:values.domestic_other_service_fee_vat == "amount" ? null : values.domestic_other_service_fee_vat_percent,
          charge_type_id:values.domestic_other_service_fee_vat == "amount" ? values.domestic_other_service_fee_vat_amount_type : null,
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
                          fieldFeeTaxId:"domestic_flight_vat_tax_id",
                          fieldRadio:"domestic_flight_vat",
                          fieldAmount:"domestic_flight_vat_amount",
                          fieldAmountType:"domestic_flight_vat_amount_type",
                          fieldPercent:"domestic_flight_vat_percent",
                        },
                        {
                          title:"Flight Service Fee VAT",
                          taxType:taxTypeDomesticFlightServiceFeeVat,
                          fieldFeeTaxId:"domestic_flight_service_fee_vat_tax_id",
                          fieldRadio:"domestic_flight_service_fee_vat",
                          fieldAmount:"domestic_flight_service_fee_vat_amount",
                          fieldAmountType:"domestic_flight_service_fee_vat_amount_type",
                          fieldPercent:"domestic_flight_service_fee_vat_percent",
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"Flight VAT",
                          taxType:taxTypeInternationalFlightVat,
                          fieldFeeTaxId:"international_flight_vat_tax_id",
                          fieldRadio:"international_flight_vat",
                          fieldAmount:"international_flight_vat_amount",
                          fieldAmountType:"international_flight_vat_amount_type",
                          fieldPercent:"international_flight_vat_percent",
                        },
                        {
                          title:"Flight Service Fee VAT",
                          taxType:taxTypeInternationalFlightServiceFeeVat,
                          fieldFeeTaxId:"international_flight_service_fee_vat_tax_id",
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
                          fieldFeeTaxId:"domestic_hotel_vat_tax_id",
                          fieldRadio:"domestic_hotel_vat",
                          fieldAmount:"domestic_hotel_vat_amount",
                          fieldAmountType:"domestic_hotel_vat_amount_type",
                          fieldPercent:"domestic_hotel_vat_percent",
                        },
                        {
                          title:"Hotel Service Fee VAT",
                          taxType:taxTypeDomesticHotelServiceFeeVat,
                          fieldFeeTaxId:"domestic_hotel_service_fee_vat_tax_id",
                          fieldRadio:"domestic_hotel_service_fee_vat",
                          fieldAmount:"domestic_hotel_service_fee_vat_amount",
                          fieldAmountType:"domestic_hotel_service_fee_vat_amount_type",
                          fieldPercent:"domestic_hotel_service_fee_vat_percent",
                        }
                      ]},
                      {title: "International", sections: [
                        {
                          title:"Hotel VAT",
                          taxType:taxTypeInternationalHotelVat,
                          fieldFeeTaxId:"international_hotel_vat_tax_id",
                          fieldRadio:"international_hotel_vat",
                          fieldAmount:"international_hotel_vat_amount",
                          fieldAmountType:"international_hotel_vat_amount_type",
                          fieldPercent:"international_hotel_vat_percent",
                        },
                        {
                          title:"Hotel Service Fee VAT",
                          taxType:taxTypeInternationalHotelServiceFeeVat,
                          fieldFeeTaxId:"international_hotel_service_fee_vat_tax_id",
                          fieldRadio:"international_hotel_service_fee_vat",
                          fieldAmount:"international_hotel_service_fee_vat_amount",
                          fieldAmountType:"international_hotel_service_fee_vat_amount_type",
                          fieldPercent:"international_hotel_service_fee_vat_percent",
                        },
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
                          taxType:taxTypeOtherRentCarVat,
                          fieldFeeTaxId:"domestic_other_vat_fee_tax_id",
                          fieldRadio:"domestic_other_vat",
                          fieldAmount:"domestic_other_vat_amount",
                          fieldAmountType:"domestic_other_vat_amount_type",
                          fieldPercent:"domestic_other_vat_percent"
                        },
                        {
                          title:"Service Fee VAT",
                          taxType:taxTypeOtherServiceFeeVat,
                          fieldFeeTaxId:"domestic_other_service_fee_vat_fee_tax_id",
                          fieldRadio:"domestic_other_service_fee_vat",
                          fieldAmount:"domestic_other_service_fee_vat_amount",
                          fieldAmountType:"domestic_other_service_fee_vat_amount_type",
                          fieldPercent:"domestic_other_service_fee_vat_percent"
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
