import { FastField, Formik } from "formik"
import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import { Card, Form, Row, Col, Button, Modal } from "react-bootstrap"
import Api from "config/api"
import FlightOverrideServiceFeeTable from "../table/flight_override_service_table"
import { withRouter, useHistory } from "react-router"
import useQuery from "lib/query"
import { Menu } from "./menu"
import { MenuModal } from "./menu_modal"
import { ReactSVG } from "react-svg"
import SelectAsync from "components/form/select-async"
import createIcon from "assets/icons/create.svg"
import { useDispatch } from "react-redux"
import { setAlert, setCreateModal, setUIParams } from "redux/ui-store"

const backUrl = "/master/standard-service-fee"
const endpoint = "/master/agent-service-fee-categories/1"

//modal service fee
const ModalOverrideServiceFee = (props) => {
  let api = new Api()
  let dispatch = useDispatch()

  //get Fee tax
  const [taxTypeServiceFee, setTaxTypeServiceFee] = useState([])
  const [taxIdTypeServiceFee, setTaxIdTypeServiceFee] = useState("")

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
    getFeeTaxType("1", setTaxTypeServiceFee, setTaxIdTypeServiceFee)
  }, [])

  const initialValues = {
    destination: "",
    airline_service_type: "",
    specified_airline: "",
    specified_source: "",
    domestic_flight_service: "",
    domestic_flight_service_fee_tax_id: "",
    domestic_flight_service_amount: "",
    domestic_flight_service_amount_type: "",
    domestic_flight_service_percent: "",
    domestic_flight_service_tax_include: false,
  }

  const validationSchema = Yup.object().shape({
    destination: Yup.object().required("Destination is required."),
    domestic_flight_service: Yup.string().required(
      `Please enter fixed amount or percentage for ${taxTypeServiceFee.fee_tax_type_name}.`,
    ),
    domestic_flight_service_amount: Yup.string().when(
      "domestic_flight_service",
      {
        is: (value) => value === "amount",
        then: Yup.string().required(
          `Please enter fixed amount for ${taxTypeServiceFee.fee_tax_type_name}.`,
        ),
      },
    ),
    domestic_flight_service_amount_type: Yup.string().when(
      "domestic_flight_service",
      {
        is: (value) => value === "amount",
        then: Yup.string().required(`Please select charge type.`),
      },
    ),
    domestic_flight_service_percent: Yup.string().when(
      "domestic_flight_service",
      {
        is: (value) => value === "percent",
        then: Yup.string().required(
          `Please enter percentage for ${taxTypeServiceFee.fee_tax_type_name}.`,
        ),
      },
    ),
  })
  const removeSeparator = (value) => {
    value = value.toString().split(",").join("")
    return parseInt(value)
  }
  const onSubmit = async (values, a) => {
    try {
      let form = {
        description: values.job_title ? values.job_title.value : "esse sit",
        service_fee_category_code: values.job_title
          ? values.job_title.value
          : "esse sit",
        service_fee_category_name: values.job_title
          ? values.job_title.value
          : "esse sit",
        domestic_flight_service: {
          charge_type: taxIdTypeServiceFee,
          amount:
            values.domestic_flight_service === "amount"
              ? removeSeparator(values.domestic_flight_service_amount)
              : 0,
          percent: values.domestic_flight_service
            ? 0
            : parseFloat(values.domestic_flight_service_percent),
          currency_id: values.domestic_flight_service
            ? values.domestic_flight_service
            : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive: values.domestic_flight_service
            ? true
            : values.domestic_flight_service_tax_include,
        },
      }
      let res = await api.putOrPost(endpoint, form)
      console.log(res)
      props.handleSelectTab("flight")
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
      dispatch(
        setAlert({
          message: `Service Fee has been successfully saved.`,
        }),
      )
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }
  return (
    <Modal
      {...props}
      size="md"
      dialogClassName="modal-50w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Body>
        <div style={{ padding: "0 2px 2px" }}>
          <div className="mb-5">
            <div className="modal-button-close" onClick={props.onHide}>
              <ReactSVG src="/img/icons/close.svg" />
            </div>
            <p className="modals-header mt-3">
              Add Flight Override Service Fee
            </p>
          </div>
          <Formik
            validateOnMount
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
              isValid,
              setFieldValue,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md={3} sm={3} lg={3}>
                    Destination
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={9} sm={9} lg={9}>
                    <FastField name="destination">
                      {({ field, form }) => (
                        <div style={{ maxWidth: 600 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            url={`master/destination-groups`}
                            fieldName="destination_group_name"
                            onChange={(v) => {
                              setFieldValue("destination", v)
                            }}
                            placeholder="Please choose"
                            className={`react-select ${
                              form.touched.destination &&
                              form.errors.destination
                                ? "is-invalid"
                                : null
                            }`}
                          />
                          {form.touched.destination &&
                            form.errors.destination && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.destination
                                  ? form.errors.destination
                                  : null}
                              </Form.Control.Feedback>
                            )}
                        </div>
                      )}
                    </FastField>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md={3} sm={3} lg={3}>
                    Airline Service Type
                  </Form.Label>
                  <Col md={9} sm={9} lg={9}>
                    <div style={{ maxWidth: 600 }}>
                      <FastField name="airline_service_type">
                        {({ field, form }) => (
                          <div style={{ maxWidth: 600 }}>
                            <SelectAsync
                              {...field}
                              isClearable
                              url={`master/airline-categories`}
                              fieldName="airline_category_name"
                              onChange={(v) => {
                                setFieldValue("airline_service_type", v)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.airline_service_type &&
                                form.errors.airline_service_type
                                  ? "is-invalid"
                                  : null
                              }`}
                            />
                            {form.touched.airline_service_type &&
                              form.errors.airline_service_type && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.airline_service_type
                                    ? form.errors.airline_service_type
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </div>
                        )}
                      </FastField>
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md={3} sm={3} lg={3}>
                    Specified Airline
                  </Form.Label>
                  <Col md={9} sm={9} lg={9}>
                    <FastField name="specified_airline">
                      {({ field, form }) => (
                        <div style={{ maxWidth: 600 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            url={`master/airlines`}
                            fieldName="airline_name"
                            onChange={(v) => {
                              setFieldValue("specified_airline", v)
                            }}
                            placeholder="Please choose"
                            className={`react-select ${
                              form.touched.specified_airline &&
                              form.errors.specified_airline
                                ? "is-invalid"
                                : null
                            }`}
                          />
                          {form.touched.specified_airline &&
                            form.errors.specified_airline && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.specified_airline
                                  ? form.errors.specified_airline
                                  : null}
                              </Form.Control.Feedback>
                            )}
                        </div>
                      )}
                    </FastField>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md={3} sm={3} lg={3}>
                    Specified Source
                  </Form.Label>
                  <Col md={9} sm={9} lg={9}>
                    <FastField name="specified_source">
                      {({ field, form }) => (
                        <div style={{ maxWidth: 600 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            url={`master/supplier-types`}
                            fieldName="supplier_type_name"
                            onChange={(v) => {
                              setFieldValue("specified_source", v)
                            }}
                            placeholder="Please choose"
                            className={`react-select ${
                              form.touched.specified_source &&
                              form.errors.specified_source
                                ? "is-invalid"
                                : null
                            }`}
                          />
                          {form.touched.specified_source &&
                            form.errors.specified_source && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.specified_source
                                  ? form.errors.specified_source
                                  : null}
                              </Form.Control.Feedback>
                            )}
                        </div>
                      )}
                    </FastField>
                  </Col>
                  <MenuModal
                    menu={[
                      {
                        title: "MDR Fee",
                        sections: [
                          {
                            title: "MDR FEE",
                            taxType: taxTypeServiceFee,
                            fieldFeeTaxId: "domestic_flight_service_fee_tax_id",
                            fieldRadio: "domestic_flight_service",
                            fieldAmount: "domestic_flight_service_amount",
                            fieldAmountType:
                              "domestic_flight_service_amount_type",
                            fieldPercent: "domestic_flight_service_percent",
                            fieldIncludeTax:
                              "domestic_flight_service_tax_include",
                          },
                        ],
                      },
                    ]}
                    values={values}
                    fHandleChange={handleChange}
                    fHandleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    // isView={isView}
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
                    errors={errors}
                  />
                </Form.Group>

                <div
                  style={{ marginBottom: 30, marginTop: 30, display: "flex" }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: 15 }}
                  >
                    SAVE
                  </Button>
                  <Button variant="secondary" onClick={props.onHide}>
                    CANCEL
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  )
}
const FlightForm = (props) => {
  let api = new Api()
  const history = useHistory()
  const isView = useQuery().get("action") === "view"
  const dispatch = useDispatch()
  const formId = props.match.params.id
  const [modalShow, setModalShow] = useState(false)
  const [taxTypeDomesticFlight, setTaxTypeDomesticFlight] = useState([])
  const [taxTypeInternationalFlight, setTaxTypeInternationalFlight] = useState(
    [],
  )
  const [taxIdDomesticFlight, setTaxIdDomesticFlight] = useState("")
  const [taxIdInternationalFlight, setTaxIdInternationalFlight] = useState("")

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
    getFeeTaxType("8", setTaxTypeDomesticFlight, setTaxIdDomesticFlight)
    getFeeTaxType(
      "9",
      setTaxTypeInternationalFlight,
      setTaxIdInternationalFlight,
    )
  }, [props.match.params.id])

  const [initialForm, setInitialForm] = useState({
    service_fee_category_name: "",
    description: "",
    domestic_flight_service: "",
    domestic_flight_service_fee_tax_id: "",
    domestic_flight_service_amount: "",
    domestic_flight_service_amount_type: "",
    domestic_flight_service_percent: "",
    domestic_flight_service_tax_include: false,
    international_flight_service: "",
    international_flight_service_fee_tax_id: "",
    international_flight_service_amount: "",
    international_flight_service_amount_type: "",
    international_flight_service_percent: "",
    international_flight_service_tax_include: false,
  })

  // Schema for yup
  const validationSchema = Yup.object().shape({
    service_fee_category_name: Yup.string()
      .required(`Please enter Preset Name.`)
      .min(1, "Must be exactly 1 digits")
      .max(128, "Maximum number 128"),
    description: Yup.string()
      .min(1, "Must be exactly 1 digits")
      .max(4000, "Maximum number 4000"),
    domestic_flight_service: Yup.string().required(
      `Please enter fixed amount or percentage for ${taxTypeDomesticFlight.fee_tax_type_name}.`,
    ),
    domestic_flight_service_amount: Yup.string().when(
      "domestic_flight_service",
      {
        is: (value) => value === "amount",
        then: Yup.string().required(
          `Please enter fixed amount for ${taxTypeDomesticFlight.fee_tax_type_name}.`,
        ),
      },
    ),
    domestic_flight_service_amount_type: Yup.string().when(
      "domestic_flight_service",
      {
        is: (value) => value === "charge_type",
        then: Yup.string().required(`Please select charge type.`),
      },
    ),
    domestic_flight_service_percent: Yup.string().when(
      "domestic_flight_service",
      {
        is: (value) => value === "percent",
        then: Yup.string().required(
          `Please enter percentage for ${taxTypeDomesticFlight.fee_tax_type_name}.`,
        ),
      },
    ),
    international_flight_service: Yup.string().required(
      `Please enter fixed amount or percentage for ${taxTypeInternationalFlight.fee_tax_type_name}.`,
    ),
    international_flight_service_amount: Yup.string().when(
      "international_flight_service",
      {
        is: (value) => value === "amount",
        then: Yup.string().required(
          `Please enter fixed amount for ${taxTypeInternationalFlight.fee_tax_type_name}.`,
        ),
      },
    ),
    international_flight_service_amount_type: Yup.string().when(
      "international_flight_service",
      {
        is: (value) => value === "amount",
        then: Yup.string().required(`Please select charge type.`),
      },
    ),
    international_flight_service_percent: Yup.string().when(
      "international_flight_service",
      {
        is: (value) => value === "percent",
        then: Yup.string().required(
          `Please enter percentage for ${taxTypeInternationalFlight.fee_tax_type_name}.`,
        ),
      },
    ),
  })

  useEffect(async () => {
    let docTitle = "Edit Flight Standard Service Fee"
    if (!formId) {
      docTitle = "Create Flight Standard Service Fee"
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
            text: "Standard Service Fee",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if (formId) {
        let res = await api.get(endpoint + "/" + formId)
        let data = res.data

        console.log("tes", data)
        setInitialForm({
          ...initialForm,
          description: data.description,
          service_fee_category_name: data.service_fee_category_name,
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

  const onSubmit = async (values, a) => {
    try {
      let form = {
        description: values.description,
        service_fee_category_name: values.service_fee_category_name,
        domestic_flight_service: {
          currency_id: taxIdDomesticFlight,
          amount:
            values.domestic_flight_service === "amount"
              ? removeSeparator(values.domestic_flight_service_amount)
              : 0,
          percent:
            values.domestic_flight_service === "amount"
              ? 0
              : parseFloat(values.domestic_flight_service_percent),
          charge_type:
            values.domestic_flight_service_amount_type === "amount"
              ? values.domestic_flight_service_amount_type
              : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive: values.domestic_flight_service
            ? false
            : values.domestic_flight_service_tax_include,
        },
        international_flight_service: {
          currency_id: taxIdInternationalFlight,
          amount:
            values.international_flight_service === "amount"
              ? removeSeparator(values.international_flight_service_amount)
              : 0,
          percent:
            values.international_flight_service === "amount"
              ? 0
              : parseFloat(values.international_flight_service_percent),
          charge_type:
            values.international_flight_service === "charge_type"
              ? values.international_flight_service_amount_type
              : "00000000-0000-0000-0000-000000000000",
          is_tax_inclusive:
            values.international_flight_service === "amount"
              ? false
              : values.international_flight_service_tax_include,
        },
      }
      let res = await api.putOrPost(endpoint, formId, form)
      console.log(res)

      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
      dispatch(
        setAlert({
          message: `Service Fee has been successfully saved.`,
        }),
      )
      props.history.goBack()
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }

  const formSizeModal = {
    label: {
      md: 3,
      lg: 3,
    },
    value: {
      md: 6,
      lg: 6,
    },
  }

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
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
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md={3}>
                    Preset Name
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="service_fee_category_name">
                      {({ field, form }) => (
                        <>
                          <Form.Control
                            type="text"
                            disabled={isView}
                            isInvalid={
                              form.touched.service_fee_category_name &&
                              form.errors.service_fee_category_name
                            }
                            minLength={1}
                            maxLength={128}
                            style={{ maxWidth: 300 }}
                            {...field}
                          />
                          {form.touched.service_fee_category_name &&
                            form.errors.service_fee_category_name && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.service_fee_category_name
                                  ? form.errors.service_fee_category_name
                                  : null}
                              </Form.Control.Feedback>
                            )}
                        </>
                      )}
                    </FastField>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column md={3}>
                    Description
                  </Form.Label>
                  <Col sm={9}>
                    <FastField name="description">
                      {({ field, form }) => (
                        <>
                          <Form.Control
                            as="textarea"
                            isInvalid={
                              form.touched.description &&
                              form.errors.description
                            }
                            style={{ height: "88px", maxWidth: "416px" }}
                            {...field}
                          />
                          {form.touched.description &&
                            form.errors.description && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.description
                                  ? form.errors.description
                                  : null}
                              </Form.Control.Feedback>
                            )}
                        </>
                      )}
                    </FastField>
                  </Col>
                </Form.Group>

                <Menu
                  menu={[
                    {
                      title: "MDR Fee",
                      sections: [
                        {
                          title: "Domestic Flight Service Fee",
                          taxType: taxTypeDomesticFlight,
                          fieldFeeTaxId: "domestic_flight_service_fee_tax_id",
                          fieldRadio: "domestic_flight_service",
                          fieldAmount: "domestic_flight_service_amount",
                          fieldAmountType:
                            "domestic_flight_service_amount_type",
                          fieldPercent: "domestic_flight_service_percent",
                          fieldIncludeTax:
                            "domestic_flight_service_tax_include",
                        },
                        {
                          title: "Late Payment",
                          taxType: taxTypeInternationalFlight,
                          fieldFeeTaxId:
                            "international_flight_service_fee_tax_id",
                          fieldRadio: "international_flight_service",
                          fieldAmount: "international_flight_service_amount",
                          fieldAmountType:
                            "international_flight_service_amount_type",
                          fieldPercent: "international_flight_service_percent",
                          fieldIncludeTax:
                            "international_flight_service_tax_include",
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
                  errors={errors}
                />
                {isView ? (
                  <h3 className="card-heading">&nbsp;</h3>
                ) : (
                  <>
                    <h3 className="card-heading">&nbsp;</h3>
                    <Col sm={12}>
                      <div style={{ padding: "0 15px 15px 15px" }}>
                        <button
                          type="button"
                          disabled={isSubmitting || !dirty}
                          className="btn float-right button-override"
                          onClick={() => setModalShow(true)}
                        >
                          <img src={createIcon} className="mr-1" alt="new" />
                          Add Override Service Fee
                        </button>
                      </div>
                    </Col>
                    <br />
                    <Col sm={12}>
                      <ModalOverrideServiceFee
                        show={modalShow}
                        isView={isView}
                        size={formSizeModal}
                        onHide={() => setModalShow(false)}
                      />
                    </Col>{" "}
                    {formId && <FlightOverrideServiceFeeTable />}
                  </>
                )}
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
