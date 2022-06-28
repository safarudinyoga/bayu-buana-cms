import React, { useState, useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { Card, Form, Row, Col, Modal, Button } from "react-bootstrap"
import { withRouter } from "react-router"
import { Formik, FastField } from "formik"
import { setAlert, setCreateModal } from "redux/ui-store"
import createIcon from "assets/icons/create.svg"
import * as Yup from "yup"
import Api from "config/api"
import FormEmail from "../form/form-email-sender"
import SelectAsync from "components/form/select-async"
import { ReactSVG } from "react-svg"

const endpoint = "/master/configurations/email-senders"

const EmailSenderModal = (props) => {
  const API = new Api()
  const dispatch = useDispatch()

  const initialValues = {
    message_type: "",
    sender_name: "",
    sender_email: "",
  }

  const validationSchema = Yup.object().shape({
    message_type: Yup.object().required("Task Type is required."),
    sender_name: Yup.string().max(256).required("Sender Name is required"),
    sender_email: Yup.string()
      .max(256)
      .email("Sender Email is not valid")
      .required("Sender Email is required."),
  })
  const onSubmit = async (values, a) => {
    try {
      let formId = props.id
      let form = {
        message_type_id: values.message_type
          ? values.message_type.value
          : "00000000-0000-0000-0000-000000000000",
        from_display: values.sender_name,
        from_email: values.sender_email,
      }

      if (!formId) {
        //Proses Create Data
        let res = await API.post(endpoint, form)
        console.log(res)

        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Email Sender for: ${values.sender_name}' has been successfully saved.`,
          }),
        )
        props.onHide()
      } else {
        //proses update data
        let res = await API.put(
          `/master/configurations/email-senders/${formId}`,
          form,
        )
        console.log(res)
        dispatch(
          setCreateModal({ show: false, id: null, disabled_form: false }),
        )
        dispatch(
          setAlert({
            message: `Record 'Email Sender for: ${values.sender_name}' has been successfully saved.`,
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
          <p className="modals-header mt-3">New Email Sender</p>
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
              <Form.Group as={Row} className="form-group">
                <Form.Label column md={3} lg={4}>
                  Sender Name
                  <span className="form-label-required">*</span>
                </Form.Label>
                <Col md={9} lg={8}>
                  <FastField name="sender_name" disabled>
                    {({ field, form }) => (
                      <>
                        <Form.Control
                          type="text"
                          isInvalid={
                            form.touched.sender_name && form.errors.sender_name
                          }
                          minLength={1}
                          maxLength={128}
                          {...field}
                          style={{ maxWidth: 300 }}
                          placeholder="Sender Name"
                        />
                        {form.touched.sender_name &&
                          form.errors.sender_name && (
                            <Form.Control.Feedback type="invalid">
                              {form.touched.sender_name
                                ? form.errors.sender_name
                                : null}
                            </Form.Control.Feedback>
                          )}
                      </>
                    )}
                  </FastField>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="form-group">
                <Form.Label column md={3} lg={4}>
                  Sender Email
                  <span className="form-label-required">*</span>
                </Form.Label>
                <Col md={9} lg={8}>
                  <FastField name="sender_email" disabled>
                    {({ field, form }) => (
                      <>
                        <Form.Control
                          type="text"
                          isInvalid={
                            form.touched.sender_email &&
                            form.errors.sender_email
                          }
                          minLength={1}
                          maxLength={128}
                          {...field}
                          style={{ maxWidth: 300 }}
                          placeholder="Sender Email"
                        />
                        {form.touched.sender_email &&
                          form.errors.sender_email && (
                            <Form.Control.Feedback type="invalid">
                              {form.touched.sender_email
                                ? form.errors.sender_email
                                : null}
                            </Form.Control.Feedback>
                          )}
                      </>
                    )}
                  </FastField>
                </Col>
              </Form.Group>

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

function EmailSenderTable() {
  let api = new Api()
  const [modalShow, setModalShow] = useState(false)
  const [initialForm, setInitialForm] = useState({
    sender_name: "",
    sender_email: "",
  })

  const validationSchema = Yup.object().shape({
    sender_name: Yup.string(),
    sender_email: Yup.string(),
  })

  useEffect(async () => {
    try {
      let res = await api.get(endpoint)
      let data = res.data.items[0]
      console.log("tes", data)
      setInitialForm({
        ...initialForm,
        sender_name: data.from_display,
        sender_email: data.from_email,
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
    baseRoute: "/master/email/form",
    endpoint: "/master/configurations/email-senders",
    deleteEndpoint:
      "/master/batch-actions/delete/configurations/email-sendersl",
    activationEndpoint:
      "/master/batch-actions/activate/configurations/email-senders",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "Message Type",
        data: "message_type.message_type_name",
      },
      {
        title: "Sender Name",
        data: "from_display",
      },
      {
        title: "Sender Email",
        data: "from_email",
        render: (data, type) => {
          return data || ""
        },
      },
    ],
    emptyTable: "No Email Sender found",
    recordName: ["from_display", "from_email"],
    btnDownload: ".buttons-csv",
    module: "handler-setup",
    showInfoDelete: true,
    infoDelete: [
      {
        title: `Email Sender for 'Message Type`,
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
                Default Email Sender
              </Form.Label>
              <Form.Group as={Row} className="form-group">
                <Form.Label column xs={5} sm={5} md={3} lg={3}>
                  Sender Name
                </Form.Label>
                <Col xs={7} sm={7} md={9} lg={9}>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={36}
                    value={values.sender_name}
                    style={{ maxWidth: 250 }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="form-group">
                <Form.Label column xs={5} sm={5} md={3} lg={3}>
                  Sender Email
                </Form.Label>
                <Col xs={7} sm={7} md={9} lg={9}>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={36}
                    style={{ maxWidth: 250 }}
                    value={values.sender_email}
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
                  Add Email Sender
                </Button>
              </div>
            </Col>
          </Form>
        )}
      </Formik>

      <br />
      <Col sm={12}>
        <EmailSenderModal show={modalShow} onHide={() => setModalShow(false)} />
      </Col>

      <BBDataTable {...params} modalContent={FormEmail} />
    </>
  )
}

export default withRouter(EmailSenderTable)
