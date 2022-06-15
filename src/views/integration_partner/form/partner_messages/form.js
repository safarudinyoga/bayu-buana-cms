import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import { useParams } from "react-router-dom"
import useQuery from "lib/query"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../../../components/formik/formikControl"


function MessageCreate(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const param = useParams()
  const endpoint = `/master/integration-partners/${props.match.params.id}/messages`


  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Messages"
    if (!formId) {
      docTitle = "Create Partner Messages"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let { data } = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
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

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const initialValues = {
    message: "",
    message_code: "",
    message_name: "",
    short_description: "",
    description: "",
    integration_partner_id: param.id,
  }

  const validationSchema = Yup.object().shape({
    message: Yup.object().required("Message is required."),
    message_code: Yup.string().required("Message Code is required."),
    message_name: Yup.string().required("Message Name is required."),
  })

  const onSubmit = async (values, a) => {
    console.log("hehe", values)

      try {
        let form = {
          event_id: values.message.value,
          event_code: values.message_code,
          event_name: values.message_name,
          short_description: values.short_description,
          description: values.description,
          integration_partner_id: param.id,
        };
        let res = await API.putOrPost(endpoint, id, form);
        console.log(res)

        dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
        dispatch(
            setAlert({
                message: `Record 'Partner Messages Name: ${values.message_name}' has been successfully saved.`,
            })
        );
    } catch (e) {
      console.log(e)
        dispatch(
            setAlert({
                message: "Failed to save this record.",
            })
        );
    }
  }

  const formSize = {
    label: {
      md: 5,
      lg: 5,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit} className="ml-2">
          <FormikControl
            control="selectAsync"
            required="label-required"
            label="Message"
            name="message"
            placeholder={"Please choose"}
            url={`master/events`}
            fieldName={"event_name"}
            onChange={(v) => {
              setFieldValue("message", v)
            }}
            urlFilter={`["event_code", "=", "1"],["OR"],["event_code", "=", "2"],["OR"],["event_code", "=", "3"],["OR"],["event_code", "=", "15"]`}
            style={{ maxWidth: 250 }}
            sort={"event_code"}
            size={formSize}
            isDisabled={isView || loading}
          />
          <FormikControl
            control="input"
            required="label-required"
            label="Partner Message Code"
            name="message_code"
            style={{ maxWidth: 250 / 2 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
          />
          <FormikControl
            control="input"
            required="label-required"
            label="Partner Message Name"
            name="message_name"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
          />
          <FormikControl
            control="textarea"
            label="Short Description"
            name="short_description"
            rows={2}
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
            rows={3}
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
          />

          {!props.hideButton && (
            <div
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
              }}
            >
              {!isView && (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>
              )}
              <CancelButton
                onClick={() =>
                  dispatch(
                    setCreateModal({
                      show: false,
                      id: null,
                      disabled_form: false,
                    }),
                  )
                }
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}
export default withRouter(MessageCreate)
