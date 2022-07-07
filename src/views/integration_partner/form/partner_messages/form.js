import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { Form, Button } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { useParams } from "react-router-dom"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../../../components/formik/formikControl"
import _ from "lodash"


function MessageCreate(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [eventId, setEventId] = useState(null)
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
        console.log('data', data)
        setFormValues({
          ...data,
          event: _.isEmpty(data.event) ? '' : {
            value: data.event.id,
            label: data.event.event_name,
          },
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

    setEventId(showCreateModal.id)
    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const initialValues = {
    event: "",
    event_code: "",
    event_name: "",
    short_description: "",
    description: "",
    integration_partner_id: param.id,
  }

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",param.id],["AND"],["status",1]]))
    let res = await API.get(endpoint + `?filters=${filters}`)
    if(eventId){
      return res.data.items.length === 0 || value === (formValues[fieldName] || formValues[fieldName].value)
    } else {
      return res.data.items.length === 0
    }
    
    return true
  }

  Yup.addMethod(Yup.object, 'uniqueValueObject', function (fieldName, message) {
      return this.test('unique', message, function(field) {
          if(field) return duplicateValue(fieldName, field.value)
          return true
      })
  })

  Yup.addMethod(Yup.string, 'uniqueValueString', function (fieldName, message) {
      return this.test('unique', message, function(field) {
          if(field) return duplicateValue(fieldName, field)
          return true
      })
  })
  const validationSchema = Yup.object().shape({
    event: Yup.object().required("Messages is required.").uniqueValueObject("event_id","Message already exists"),
    event_code: Yup.string().required("Partner Message Code is required.").uniqueValueString('event_code', 'Partner Message Code already exists'),
    event_name: Yup.string().required("Partner Message Name is required.").uniqueValueString('event_name', 'Partner Message Name already exists'),
  })

  const onSubmit = async (values, a) => {
      try {
        let form = {
          event_id: values.event.value,
          event_code: values.event_code,
          event_name: values.event_name,
          short_description: values.short_description,
          description: values.description,
          integration_partner_id: param.id,
        };
        let res = await API.putOrPost(endpoint, id, form);
        console.log(res)

        dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
        dispatch(
            setAlert({
                message: `Record 'Partner Messages Name: ${values.event_name}' has been successfully saved.`,
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
            name="event"
            placeholder={""}
            url={`master/events`}
            fieldName={"event_name"}
            onChange={(v) => {
              setFieldValue("event", v)
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
            name="event_code"
            style={{ maxWidth: 250 / 2 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
          />
          <FormikControl
            control="input"
            required="label-required"
            label="Partner Message Name"
            name="event_name"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={64}
          />
          <FormikControl
            control="textarea"
            label="Short Description"
            name="short_description"
            rows={2}
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={4000}
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
            rows={3}
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={4000}
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
