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
  const [taxTypeInternationalRfp, setTaxTypeInternationalRfp] = useState([])
  const [taxTypeOtherEmergency, setTaxTypeOtherEmergency] = useState([])
  
  const [taxIdDomesticHotel, setTaxIdDomesticHotel] = useState("")
  const [taxIdDomesticNonGds, setTaxIdDomesticNonGds] = useState("")
  const [taxIdDomesticRefund, setTaxIdDomesticRefund] = useState("")
  const [taxIdDomesticRfp, setTaxIdDomesticRfp] = useState("")
  const [taxIdInternationalHotel, setTaxIdInternationalHotel] = useState("")
  const [taxIdInternationalNonGds, setTaxIdInternationalNonGds] = useState("")
  const [taxIdInternationalRefund, setTaxIdInternationalRefund] = useState("")
  const [taxIdInternationalRfp, setTaxIdInternationalRfp] = useState("")
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
    getFeeTaxType("40", setTaxTypeInternationalRfp, setTaxIdInternationalRfp)
    getFeeTaxType("48", setTaxTypeInternationalNonGds, setTaxIdInternationalNonGds)
    getFeeTaxType("6", setTaxTypeOtherEmergency, setTaxIdOtherEmergency)
  }, [props.match.params.id])

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    processing_fee_category_name: "",
    description: "",
    domestic_hotel: "",
    domestic_hotel_fee_tax_id: "",
    domestic_hotel_amount: null,
    domestic_hotel_amount_type: "",
    domestic_hotel_percent: null,
    domestic_hotel_tax_include: false,
    domestic_refund: "",
    domestic_refund_fee_tax_id: "",
    domestic_refund_amount: null,
    domestic_refund_amount_type: "",
    domestic_refund_percent: null,
    domestic_refund_tax_include: false,
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
    international_hotel: "",
    international_hotel_fee_tax_id: "",
    international_hotel_amount: null,
    international_hotel_amount_type: "",
    international_hotel_percent: null,
    international_hotel_tax_include: false,
    international_refund: "",
    international_refund_fee_tax_id: "",
    international_refund_amount: null,
    international_refund_amount_type: "",
    international_refund_percent: null,
    international_refund_tax_include: false,
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

  const initialFormModalAddMap = {}

  // Schema for yup
  const validationSchema = Yup.object().shape({
    processing_fee_category_name: Yup.string().required("Present Name is required."),
  })

  const validationSchemaModalAddMap = Yup.object().shape({})

  useEffect(async() => {
    try {
      if(formId) {
        let res = await api.get(endpoint + "/" + formId)
        // let agent_res = await api.get(`endpointFee+ "/2/" + res.data.id)
        setInitialForm({
          ...initialForm, 
          ...res.data,
          // ...agent_res.data
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

  const setPayload = (values) => {
      let payloadDomestic = {
        processing_fee_category_name: values.processing_fee_category_name,
        description: values.description,
        domestic_hotel: {
          fee_tax_type_id: taxIdDomesticHotel,
          amount: values.domestic_hotel == "amount" ? values.domestic_hotel_amount : 0,
          percent:values.domestic_hotel == "amount" ? 0 : parseFloat(values.domestic_hotel_percent),
          charge_type_id:values.domestic_hotel == "amount" ? values.domestic_hotel_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_hotel == "amount" ? false : values.domestic_hotel_tax_include,
        },
        domestic_refund: {
          fee_tax_type_id: taxIdDomesticRefund,
          amount: values.domestic_refund == "amount" ? values.domestic_refund_amount : 0,
          percent:values.domestic_refund == "amount" ? 0 : parseFloat(values.domestic_refund_percent),
          charge_type_id:values.domestic_refund == "amount" ? values.domestic_refund_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_refund == "amount" ? false : values.domestic_refund_tax_include,
        },
        domestic_rfp: {
          fee_tax_type_id: taxIdDomesticRfp,
          amount: values.domestic_rfp == "amount" ? values.domestic_rfp_amount : 0,
          percent:values.domestic_rfp == "amount" ? 0 : parseFloat(values.domestic_rfp_percent),
          charge_type_id:values.domestic_rfp == "amount" ? values.domestic_rfp_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_rfp == "amount" ? false : values.domestic_rfp_tax_include,
        },
        domestic_non_gds: {
          fee_tax_type_id: taxIdDomesticNonGds,
          amount: values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount : 0,
          percent:values.domestic_non_gds == "amount" ? 0 : parseFloat(values.domestic_non_gds_percent),
          charge_type_id:values.domestic_non_gds == "amount" ? values.domestic_non_gds_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.domestic_non_gds == "amount" ? false : values.domestic_non_gds_tax_include,
        },
        international_hotel: {
          fee_tax_type_id: taxIdInternationalHotel,
          amount: values.international_hotel == "amount" ? values.international_hotel_amount : 0,
          percent:values.international_hotel == "amount" ? 0 : parseFloat(values.international_hotel_percent),
          charge_type_id:values.international_hotel == "amount" ? values.international_hotel_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_hotel == "amount" ? false : values.international_hotel_tax_include,
        },
        international_refund: {
          fee_tax_type_id: taxIdInternationalRefund,
          amount: values.international_refund == "amount" ? values.international_refund_amount : 0,
          percent:values.international_refund == "amount" ? 0 : parseFloat(values.international_refund_percent),
          charge_type_id:values.international_refund == "amount" ? values.international_refund_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_refund == "amount" ? false : values.international_refund_tax_include,
        },
        international_rfp: {
          fee_tax_type_id: taxIdInternationalRfp,
          amount: values.international_rfp == "amount" ? values.international_rfp_amount : 0,
          percent:values.international_rfp == "amount" ? 0 : parseFloat(values.international_rfp_percent),
          charge_type_id:values.international_rfp == "amount" ? values.international_rfp_amount_type : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:values.international_rfp == "amount" ? false : values.international_rfp_tax_include,
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

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
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
                          fieldFeeTaxId:"domestic_rfp_fee_tax_id",
                          fieldRadio:"domestic_rfp",
                          fieldAmount:"domestic_rfp_amount",
                          fieldAmountType:"domestic_rfp_amount_type",
                          fieldPercent:"domestic_rfp_percent",
                          fieldIncludeTax:"domestic_rfp_tax_include"
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
                          taxType:taxTypeInternationalRfp,
                          fieldFeeTaxId:"international_rfp_fee_tax_id",
                          fieldRadio:"international_rfp",
                          fieldAmount:"international_rfp_amount",
                          fieldAmountType:"international_rfp_amount_type",
                          fieldPercent:"international_rfp_percent",
                          fieldIncludeTax:"international_rfp_tax_include"
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
                      {label:"/Room Night", value:"b95094b2-0883-4e03-8e67-ceb32314b332"},
                      {label:"/Room", value:"02103ce7-ecfe-446e-baa1-cb3c6d982fe9"},
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

export default withRouter(HotelForm)
