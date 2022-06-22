import React, { useState, useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch, useSelector } from "react-redux"
import { Card, Form, Row, Col, Modal, Button } from "react-bootstrap"
import { withRouter } from "react-router"
import { Formik, FastField } from "formik"
import { setAlert, setCreateModal } from "redux/ui-store"
import createIcon from "assets/icons/create.svg"
import * as Yup from "yup"
import Api from "config/api"
import SelectAsync from "components/form/select-async"
import { ReactSVG } from "react-svg"
import removeIcon from "assets/icons/remove.svg"

const endpoint = "/master/configurations/email-senders"

function FormEmailReceipt(props) {
  const API = new Api()
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialForm, setInitialForm] = useState([
    {
      message_type: "",
      sender_name: "",
      sender_email: "",
    },
  ])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...initialForm]
    list[index][name] = value
    setInitialForm(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...initialForm]
    list.splice(index, 1)
    setInitialForm(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInitialForm([...initialForm, { sender_name: "", sender_name: "" }])
  }

  const validationSchema = Yup.object().shape({
    message_type: Yup.object().required("Task Type is required."),
    sender_name: Yup.string().max(256).required("Sender Name is required"),
    sender_email: Yup.string()
      .max(256)
      .email("Sender Email is not valid")
      .required("Sender Email is required."),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    if (formId) {
      try {
        let { data } = await API.get(endpoint + "/" + formId)
        setId(data.id)
        setInitialForm({
          ...initialForm,
          message_type: data.message_type_name,
          sender_name: data.from_display,
          sender_email: data.from_email,
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (initialForm) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, initialForm])
  const onSubmit = async (values, a) => {
    try {
      let form = {
        message_type_id: values.message_type
          ? values.message_type.value
          : "00000000-0000-0000-0000-000000000000",

        from_display: values.sender_name,
        from_email: values.sender_email,
      }

      let res = await API.put(
        `/master/configurations/email-senders/${id}`,
        form,
      )
      console.log(res)
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
      dispatch(
        setAlert({
          message: `Record 'Email Sender for: ${values.sender_name}' has been successfully saved.`,
        }),
      )
      props.onHide()
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
    <>
      {" "}
      <div className="mb-5">
        <p className="modals-header mt-3">add email receipt</p>
      </div>
      <Formik
        validateOnMount
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={initialForm}
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
                        isDisabled={isView}
                        url={`master/message-types`}
                        fieldName="message_type_name"
                        onChange={(v) => {
                          setFieldValue("message_type", v)
                        }}
                        placeholder="Please choose"
                        className={`react-select ${
                          form.touched.message_type && form.errors.message_type
                            ? "is-invalid"
                            : null
                        }`}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
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

            {initialForm.map((input, index) => {
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
                      {initialForm.length !== 1 && (
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
    </>
  )
}

export default withRouter(FormEmailReceipt)
