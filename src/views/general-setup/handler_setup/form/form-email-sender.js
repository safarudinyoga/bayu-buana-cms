import React, { useState, useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch, useSelector } from "react-redux"
import { Card, Form, Row, Col, Modal, Button } from "react-bootstrap"
import { withRouter } from "react-router"
import { Formik, FastField } from "formik"
import { setAlert, setCreateModal } from "redux/ui-store"
import createIcon from "assets/icons/create.svg"
import * as Yup from "yup"
import _ from "lodash"
import Api from "config/api"
import SelectAsync from "components/form/select-async"
import { ReactSVG } from "react-svg"

const endpoint = "/master/configurations/email-senders"

function FormEmailSender(props) {
  const API = new Api()
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialForm, setInitialForm] = useState({
    message_type: "",
    sender_name: "",
    sender_email: "",
  })

  const validationSchema = Yup.object().shape({
    message_type: Yup.object().required("Message Type is required."),
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

        console.log("tes", data)
        setInitialForm({
          ...initialForm,

          message_type: _.isEmpty(data.message_type)
            ? ""
            : {
                value: data.message_type.id,
                label: data.message_type.message_type_name,
              },
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
        <p className="modals-header mt-3">Edit Email Sender</p>
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
                      {form.touched.sender_name && form.errors.sender_name && (
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
                          form.touched.sender_email && form.errors.sender_email
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
    </>
  )
}

export default withRouter(FormEmailSender)
