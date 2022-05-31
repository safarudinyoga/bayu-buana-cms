import React, { useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { Card, Form, Row, Col, Modal, Button } from "react-bootstrap"
import * as Yup from "yup"
import Api from "config/api"
import { setAlert, setCreateModal } from "redux/ui-store"
import { ReactSVG } from "react-svg"
import { Formik, FastField } from "formik"
import SelectAsync from "components/form/select-async"
import createIcon from "assets/icons/create.svg"

const EmailReceiptModal = (props) => {
  const API = new Api()
  const dispatch = useDispatch()
  const [inputFields, setInputFields] = useState([{ name: "", email: "" }])

  const [bankName] = useState([
    { bankName: "", accountName: "", errorMessage: [] },
  ])
  const handleFormChange = (index, event) => {
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
  }
  const initialValues = {
    message_type: "",
    recipient_name: "",
    recipient_email: "",
  }
  const addFields = () => {
    let newfield = { name: "", email: "" }
    setInputFields([...inputFields, newfield])
  }
  const validationSchema = Yup.object().shape({
    message_type: Yup.object().required("Task Type is required."),
    recipient_name: Yup.string().max(256).required("Sender Name is required"),
    recipient_email: Yup.string()
      .max(256)
      .email("Sender Email is not valid")
      .required("Sender Email is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = props.id
      let form = {
        agent_id: values.agent_id
          ? values.agent_id.value
          : "00000000-0000-0000-0000-000000000000",
        from_display: "aliquip nulla",
        from_email: "non ea deserunt Duis dolor",
        from_employee_id: values.from_employee_id
          ? values.from_employee_id.value
          : "00000000-0000-0000-0000-000000000000",
        from_person_id: values.from_person_id
          ? values.from_person_id.value
          : "00000000-0000-0000-0000-000000000000",
        from_user_account_id: values.from_user_account_id
          ? values.from_user_account_id.value
          : "00000000-0000-0000-0000-000000000000",
        message_type_id: values.message_type_id
          ? values.message_type_id.value
          : "00000000-0000-0000-0000-000000000000",
        message_type: values.message_type,
        recipient_name: values.sender_name,
        recipient_email: values.sender_email,
      }

      if (!formId) {
        //Proses Create Data
        let res = await API.post(`/master/configurations/email-senders`, form)
        console.log(res)

        dispatch(
          setAlert({
            message: `Record 'Email Sender for: ${form.sender_name}' has been successfully saved.`,
          }),
        )
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
            message: `Record 'Email Sender for: ${form.sender_name}' has been successfully saved.`,
          }),
        )
      }
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
          initialValues={initialValues || inputFields}
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

              {inputFields.map((input, index) => {
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
                                // isInvalid={
                                //   form.touched.recipient_name &&
                                //   form.errors.recipient_name
                                // }
                                minLength={1}
                                maxLength={128}
                                {...field}
                                style={{ maxWidth: 300 }}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                value={input.recipient_name}
                                placeholder="Recipient Name"
                              />
                              <div className="invalid-feedback">
                                {errors.recipient_name?.[index]?.name?.message}
                              </div>
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
                      <Col md={9} lg={4}>
                        <FastField name="recipient_email" disabled>
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
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                value={input.recipient_email}
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
                    </Form.Group>
                  </div>
                )
              })}

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
        <button
          onClick={addFields}
          className="float-right "
          style={{ color: "#1103C4" }}
        >
          Add another recipient
        </button>
      </Modal.Body>
    </Modal>
  )
}

export default function EmailReceiptTable() {
  const [modalShow, setModalShow] = useState(false)
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
    baseRoute: "/master/configurations/email-senders/form",
    endpoint: "/master/configurations/email-senders",
    deleteEndpoint: "/master/batch-actions/delete/configurations/email-senders",
    activationEndpoint:
      "/master/batch-actions/activate/configurations/email-senders",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "Message Type",
        data: "message_type_name",
      },
      {
        title: "Number Of Recipients",
        data: "message_type_name",
      },
    ],
    emptyTable: "No Email Recipient found",
    recordName: ["from_currency.currency_code", "to_currency.currency_code"],
    btnDownload: ".buttons-csv",
    module: "handler-setup",
  }
  return (
    <>
      <Card style={{ backgroundColor: "#F8F8F8", padding: "20px" }}>
        <Form.Label className="text-uppercase">Default Sender</Form.Label>

        <Form.Group as={Row} className="form-group">
          <Form.Label column xs={5} sm={5} md={3} lg={3}>
            Sender Name
          </Form.Label>
          <Col xs={7} sm={7} md={9} lg={9}>
            <Form.Control
              type="text"
              minLength={1}
              maxLength={36}
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
      <br />
      <Col sm={12}>
        <EmailReceiptModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Col>
      <BBDataTable {...params} />
    </>
  )
}
