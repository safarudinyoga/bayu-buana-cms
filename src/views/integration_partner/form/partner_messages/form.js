import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import useQuery from "lib/query"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../../../components/formik/formikControl"

const endpoint =
  "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/messages"
function MessageCreate(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

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
    meal_plan_code: "",
    meal_plan_name: "",
  }

  const validationSchema = Yup.object().shape({
    message: Yup.object().required("Messages is required."),
    message_code: Yup.string().required("Message Code is required."),
    message_name: Yup.string().required("Message Name is required."),
  })

  const onSubmit = async (values, a) => {
    console.log(values)
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
            url={`master/event-types`}
            fieldName={"event_type_name"}
            onChange={(v) => {
              setFieldValue("id", v)
            }}
            style={{ maxWidth: 250 }}
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
