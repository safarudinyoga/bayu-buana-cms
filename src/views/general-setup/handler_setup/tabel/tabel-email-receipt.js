import React, { useState, useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { Card, Form, Row, Col, Modal, Button } from "react-bootstrap"
import * as Yup from "yup"
import Api from "config/api"
import { setAlert, setCreateModal } from "redux/ui-store"
import { ReactSVG } from "react-svg"
import removeIcon from "assets/icons/remove.svg"
import {
  Formik,
  FastField,
  FormFormik as form,
  FieldArray,
  Field,
  ErrorMessage,
} from "formik"
import FormEmailReceipt from "../form/form-email-receipt"
import SelectAsync from "components/form/select-async"
import createIcon from "assets/icons/create.svg"

const endpoint = "/master/configurations/email-recipients"

const EmailReceiptModal = (props) => {
  const API = new Api()
  const dispatch = useDispatch()
  const [inputFields, setInputFields] = useState([{ name: "", email: "" }])

  //example 2

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...initialValues]
    list[index][name] = value
    setInitialValues(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...initialValues]
    list.splice(index, 1)
    setInitialValues(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInitialValues([
      ...initialValues,
      { recipient_name: "", recipient_email: "" },
    ])
  }
  const [initialValues, setInitialValues] = useState([
    {
      message_type: "",
      recipient_name: "",
      recipient_email: "",
    },
  ])

  const addFields = () => {
    let newfield = { name: "", email: "" }
    setInputFields([...inputFields, newfield])
  }

  const validationSchema = Yup.object().shape({
    message_type: Yup.object().required("Message Type is required."),
    recipient_name: Yup.string().max(256),
    // .required("Recipient Name is required"),
    recipient_email: Yup.string()
      .max(256)
      .email("Recipient Email is not valid"),
    // .required("Recipient Email is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = props.id
      let form = {
        message_type_id: values.message_type
          ? values.message_type.value
          : "00000000-0000-0000-0000-000000000000",

        from_display: values.recipient_name,
        from_email: values.recipient_email,
      }

      if (!formId) {
        //Proses Create Data
        let res = await API.post(
          `/master/configurations/email-recipients`,
          form,
        )
        console.log(res)

        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Email Recipient for: ${values.recipient_name}' has been successfully saved.`,
          }),
        )
        props.onHide()
      } else {
        //proses update data
        let res = await API.put(
          `/master/configurations/email-recipients/${formId}`,
          form,
        )
        console.log(res)
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Email Recipient for: ${values.recipient_name}' has been successfully saved.`,
          }),
        )
        props.onHide()
      }
    } catch (e) {
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
      props.onHide()
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
        <div className="mb-5">
          <div className="modal-button-close" onClick={props.onHide}>
            <ReactSVG src="/img/icons/close.svg" />
          </div>
          <p className="modals-header mt-3">add email recipient</p>
        </div>
        <Formik
          validateOnMount
          enableReinitialize
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
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
            register,
          }) => (
            <Form onSubmit={handleSubmit} className="ml-2">
              <Form.Group as={Row} className="form-group">
                <Form.Label column md={3} lg={4}>
                  Message Type<span className="form-label-required">*</span>
                </Form.Label>
                <Col md={9} lg={8}>
                  <FastField name="message_type">
                    {({ field, form }) => (
                      <div style={{ maxWidth: 200 }}>
                        <SelectAsync
                          {...field}
                          isClearable
                          url={`master/message-types`}
                          fieldName="message_type_name"
                          onChange={(v) => {
                            setFieldValue("message_type", v)
                          }}
                          placeholder="Please choose"
                          className={`react-select ${
                            form.touched.message_type &&
                            form.errors.message_type
                              ? "is-invalid"
                              : null
                          }`}
                        />
                        {form.touched.message_type &&
                          form.errors.message_type && (
                            <Form.Control.Feedback type="invalid">
                              {form.touched.message_type
                                ? form.errors.message_type
                                : null}
                            </Form.Control.Feedback>
                          )}
                      </div>
                    )}
                  </FastField>
                </Col>
              </Form.Group>

              {initialValues.map((input, index) => {
                return (
                  <div key={index}>
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column md={3} lg={4}>
                        Recipient
                        <span className="form-label-required">*</span>
                      </Form.Label>
                      <Col md={9} lg={4}>
                        <FastField name="recipient_name" disabled>
                          {({ field, form }) => (
                            <>
                              <Form.Control
                                type="text"
                                isInvalid={
                                  form.touched.recipient_name &&
                                  form.errors.recipient_name
                                }
                                minLength={1}
                                maxLength={128}
                                {...field}
                                style={{ maxWidth: 300 }}
                                placeholder="Recipient Name"
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              {form.touched.recipient_name &&
                                form.errors.recipient_name && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.recipient_name
                                      ? form.errors.recipient_name
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </>
                          )}
                        </FastField>
                      </Col>

                      <Col md={9} lg={3}>
                        <FastField name="lastName" disabled>
                          {({ field, form }) => (
                            <>
                              <Form.Control
                                type="text"
                                isInvalid={
                                  form.touched.recipient_email &&
                                  form.errors.recipient_email
                                }
                                placeholder="Recipient Email"
                                minLength={1}
                                maxLength={128}
                                {...field}
                                style={{ maxWidth: 300 }}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              {form.touched.recipient_email &&
                                form.errors.recipient_email && (
                                  <Form.Control.Feedback type="invalid">
                                    {form.touched.recipient_email
                                      ? form.errors.recipient_email
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </>
                          )}
                        </FastField>
                      </Col>
                      <Col md={9} lg={1}>
                        {initialValues.length !== 1 && (
                          <Button
                            variant="outline-primary"
                            className="float-right"
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                            onClick={() => handleRemoveClick(index)}
                          >
                            <img src={removeIcon} className="mr-1" alt="new" />
                          </Button>
                        )}
                      </Col>
                    </Form.Group>
                  </div>
                )
              })}

              <Button
                // onClick={addFields}
                onClick={handleAddClick}
                variant="outline-primary"
                className="float-right"
                disabled={isSubmitting}
                style={{
                  border: "none",
                  outline: "none",
                }}
              >
                Add another recipient
              </Button>
              {!props.hideButton && (
                <div
                  style={{
                    marginBottom: 30,
                    marginTop: 30,
                    display: "flex",
                  }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ marginRight: 15 }}
                  >
                    SAVE
                  </Button>
                  <Button variant="secondary" onClick={props.onHide}>
                    CANCEL
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default function EmailReceiptTable() {
  let api = new Api()
  const [modalShow, setModalShow] = useState(false)
  const [initialForm, setInitialForm] = useState({
    receipt_name: "",
    receipt_email: "",
  })

  const validationSchema = Yup.object().shape({
    receipt_name: Yup.string(),
    receipt_email: Yup.string(),
  })

  useEffect(async () => {
    try {
      let res = await api.get(endpoint)
      let data = res.data.items[0]

      setInitialForm({
        ...initialForm,
        receipt_name: data.to_email,
        receipt_email: data.to_display,
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    showHistory: false,
    hideDetail: true,
    hideCreate: true,
    isHideDownloadLogo: true,
    title: "Handler Setup",
    titleModal: "Handler Setup",
    baseRoute: "/master/configurations/email-recipients/form",
    endpoint: "/master/configurations/email-recipients",
    deleteEndpoint:
      "/master/batch-actions/delete/configurations/email-recipients",
    activationEndpoint:
      "/master/batch-actions/activate/configurations/email-recipients",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "Message Type",
        data: "message_type.message_type_name",
      },
      {
        title: "Number Of Recipients",
        data: "message_type_name",
      },
    ],
    emptyTable: "No Email Recipient found",
    recordName: ["message_type_name"],
    btnDownload: ".buttons-csv",
    module: "handler-setup",
    showInfoDelete: true,
    infoDelete: [
      {
        title: `Email Recipient for 'Message Type`,
        recordName: "message_type.message_type_name",
      },
    ],
  }
  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
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
          <Form>
            {" "}
            <Card style={{ backgroundColor: "#F8F8F8", padding: "20px" }}>
              <Form.Label className="text-uppercase">
                Default Email Recipient
              </Form.Label>
              <Form.Group as={Row} className="form-group">
                <Form.Label column xs={5} sm={5} md={3} lg={3}>
                  Recipient Name
                </Form.Label>
                <Col xs={7} sm={7} md={9} lg={9}>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={36}
                    value={values.receipt_name}
                    style={{ maxWidth: 250 }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="form-group">
                <Form.Label column xs={5} sm={5} md={3} lg={3}>
                  Recipient Email
                </Form.Label>
                <Col xs={7} sm={7} md={9} lg={9}>
                  <Form.Control
                    type="text"
                    minLength={1}
                    value={values.receipt_email}
                    maxLength={36}
                    style={{ maxWidth: 250 }}
                  />
                </Col>
              </Form.Group>
            </Card>
            <Col sm={12}>
              <div style={{ padding: "0 15px 15px 15px" }}>
                <Button
                  className="btn float-right button-override"
                  onClick={() => setModalShow(true)}
                >
                  <img src={createIcon} className="mr-1" alt="new" />
                  Add Email Recipient
                </Button>
              </div>
            </Col>
          </Form>
        )}
      </Formik>

      <br />
      <Col sm={12}>
        <EmailReceiptModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Col>
      <BBDataTable {...params} modalContent={FormEmailReceipt} />
    </>
  )
}
