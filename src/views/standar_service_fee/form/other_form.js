import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import { Card, Form, Row, Col, Button, Modal } from "react-bootstrap"
import { MenuModal } from "./menu_modal"
import SelectAsync from "components/form/select-async"
import createIcon from "assets/icons/create.svg"
import { ReactSVG } from "react-svg"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
// import TabelFlightOverride from "../table/flight_override_service_fee_table"
import { useDispatch, useSelector } from "react-redux"
import { setUIParams, setCreateModal, setAlert } from "redux/ui-store"
import Api from "config/api"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const backUrl = "/master/standard-service-fee"
const endpoint = "/master/service-fee-categories"

const OtherModal = (props) => {
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
    domestic_reissue: "",
    domestic_reissue_fee_tax_id: "",
    domestic_reissue_amount: "",
    domestic_reissue_amount_type: "",
    domestic_reissue_percent: "",
    domestic_reissue_tax_include: false,
  }

  const validationSchema = Yup.object().shape({
    destination: Yup.object().required("Destination is required."),
    domestic_reissue: Yup.string().required(
      `Please enter fixed amount or percentage for ${taxTypeServiceFee.fee_tax_type_name}.`,
    ),
    domestic_reissue_amount: Yup.string().when("domestic_reissue", {
      is: (value) => value === "amount",
      then: Yup.string().required(
        `Please enter fixed amount for ${taxTypeServiceFee.fee_tax_type_name}.`,
      ),
    }),
    domestic_reissue_amount_type: Yup.string().when("domestic_reissue", {
      is: (value) => value === "amount",
      then: Yup.string().required(`Please select charge type.`),
    }),
    domestic_reissue_percent: Yup.string().when("domestic_reissue", {
      is: (value) => value === "percent",
      then: Yup.string().required(
        `Please enter percentage for ${taxTypeServiceFee.fee_tax_type_name}.`,
      ),
    }),
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
        domestic_reissue: {
          fee_tax_type_id: taxIdTypeServiceFee,
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
      }
      let res = await api.putOrPost(endpoint, form)
      console.log(res)
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div style={{ padding: "0 2px 2px" }}>
          <div className="mb-5">
            <div className="modal-button-close" onClick={props.onHide}>
              <ReactSVG src="/img/icons/close.svg" />
            </div>
            <p className="modals-header mt-3">Add Type of Service Fee</p>
          </div>
          <Formik
            validateOnMount
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={onSubmit}
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
                  <Form.Label className="mr-2">
                    Type of Other Service
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <FastField name="destination">
                      {({ field, form }) => (
                        <div style={{ maxWidth: 600 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            // url={`master/destination-groups`}
                            // fieldName="destination_group_name"
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

                <MenuModal
                  menu={[
                    {
                      title: "MDR Fee",
                      sections: [
                        {
                          title: "MDR FEE",
                          taxType: taxTypeServiceFee,
                          fieldFeeTaxId: "domestic_reissue_fee_tax_id",
                          fieldRadio: "domestic_reissue",
                          fieldAmount: "domestic_reissue_amount",
                          fieldAmountType: "domestic_reissue_amount_type",
                          fieldPercent: "domestic_reissue_percent",
                          fieldIncludeTax: "domestic_reissue_tax_include",
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
        {/* <div style={{ padding: "0 2px 2px" }}>
          <div className="mb-5">
            <div className="modal-button-close" onClick={props.onHide}>
              <ReactSVG src="/img/icons/close.svg" />
            </div>
            <p className="modals-header mt-3">Add Type of Service Fee</p>
          </div>

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={7}>
                Type of Other Service
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={5}>
                <FastField name="hotelBrand">
                  {({ field, form }) => (
                    <div style={{ maxWidth: 600 }}>
                      <Select {...field} placeholder="Please choose" />
                    </div>
                  )}
                </FastField>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={4}>
                Service Fee
                <span className="form-label-required">*</span>
              </Form.Label>
              <Col md={5}>
                <Form.Group>
                  <Form.Check type="radio" label="Fixed Amount" />
                </Form.Group>
                <Row className="ml-3">
                  <Col sm={12} md={6}>
                    <Form.Group as={Row} className="mb-xs-3">
                      <Form.Label
                        column
                        xs={2}
                        md={3}
                        lg={5}
                        className="ml-xs-4"
                      >
                        IDR
                      </Form.Label>
                      <Col xs={10} md={9} lg={7}>
                        <Form.Control style={{ maxWidth: "220px" }} />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check type="radio" label="/Unit" />
                      <Form.Check type="radio" label="/Transaction" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Check type="radio" label="Percentage" />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Control style={{ maxWidth: "80px" }} className="mx-3" />
                  <span className="text-lg mt-1">%</span>
                  <Form.Check
                    type="checkbox"
                    label="Include Taxed"
                    className="mt-2 ml-4"
                  />
                </Form.Group>
              </Col>
            </Form.Group>

            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
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
        </div> */}
      </Modal.Body>
    </Modal>
  )
}

const OtherForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const isView = showCreateModal.disabled_form || props.isView
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  let api = new Api()
  let formId = props.match.params.id
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

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
  useEffect(async () => {
    let api = new Api()
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Other Standard Service Fee"
    if (!formId) {
      docTitle = "Create Other Standard Service Fee"
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
  })

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])
  // Initialize form
  const initialForm = {
    // Translations
  }

  const initialFormModalAddMap = {}

  // Schema for yup
  const validationSchema = Yup.object().shape({})

  const validationSchemaModalAddMap = Yup.object().shape({})

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values)
          console.log(props)
        }}
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
                      <FastField name="res">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              isInvalid={
                                form.touched.hotelCode && form.errors.hotelCode
                              }
                              minLength={1}
                              maxLength={128}
                              style={{ maxWidth: 300 }}
                              {...field}
                            />
                            {form.touched.hotelCode &&
                              form.errors.hotelCode && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.hotelCode
                                    ? form.errors.hotelCode
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
                      <Form.Control
                        as="textarea"
                        style={{ height: "88px", maxWidth: "416px" }}
                      />
                    </Col>
                  </Form.Group>

                  {isView ? (
                    <h3 className="card-heading"></h3>
                  ) : (
                    <>
                      <h3 className="card-heading"></h3>
                      <Col sm={12}>
                        <div style={{ padding: "0 15px 15px 15px" }}>
                          <button
                            className="btn float-right button-override"
                            onClick={() => setModalShow(true)}
                          >
                            <img src={createIcon} className="mr-1" alt="new" />
                            Add Type of Service Other Service Fee
                          </button>
                        </div>
                      </Col>
                      <br />
                      <Col sm={12}>
                        <OtherModal
                          show={modalShow}
                          size={formSizeModal}
                          onHide={() => setModalShow(false)}
                        />
                      </Col>
                    </>
                  )}
                </div>
                {/* {formId && <TabelFlightOverride />} */}
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

export default withRouter(OtherForm)
