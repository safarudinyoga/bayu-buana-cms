import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap"
import { Formik, FastField, validateYupSchema } from "formik"
import * as Yup from "yup"
import useQuery from "lib/query"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "components/formik/formikControl"


function PaymentGatewayCreate(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const endpoint = `/master/integration-partners/${props.match.params.id}/payment-gateways`

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Payment Gateways"
    if (!formId) {
      docTitle = "Create Partner Payment Gateways"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let { data } = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          payment_gateway_code: data.payment_gateway.payment_gateway_code,
          payment_gateway_name: data.payment_gateway.payment_gateway_name,
          currency_id: {
            value: data.currency?.id || "",
            label: data.currency?.currency_name || "",
          },
          bank_id: {
            value: data.bank?.id || "",
            label: data.bank?.bank_name || "",
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

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const initialValues = {
    payment_gateway_code: "",
    payment_gateway_name: "",
    merchant_id: "",
    terminal_id: "",
    channel_code: "",
    currency_id: "",
    transaction_url: "",
    notification_url: "",
    client_key: "",
    server_key: "",
    bank_id: "",
    virtual_account_number: "",
    convenience_store_code: "",
  }

  const checkPaymentGatewayIsUnique = async (payment_gateway_name) => {
    let filter = encodeURIComponent(
      JSON.stringify([["payment_gateway_name", "=", payment_gateway_name]]),
    )
    let res = await API.get(
      `/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/payment-gateways?filters=${filter}`,
    )
    let sameId = res.data.items.find((v) => v.id === id)
    if (!sameId) return res.data.items.length === 0

    return true
  }

  // Yup.addMethod(Yup.string, "uniquePaymentGateway", function (message) {
  //   return this.test("unique", message, function (field, ctx) {
  //     let parent = ctx.parent
  //     if (parent.payment_gateway_code?.value) {
  //       return checkPaymentGatewayIsUnique(parent.payment_gateway_name?.value)
  //     } else {
  //       return true
  //     }
  //   })
  // })

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",props.match.params.id],["AND"],["status",1]]))
    let res = await API.get(endpoint + "?" + `filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if(!sameId) return res.data.items.length === 0 

    return true
  }
  
  Yup.addMethod(Yup.string, 'uniqueValueString', function (fieldName, message) {
      return this.test('unique', message, function(field) {
          if(field) return duplicateValue(fieldName, field)
          return true
      })
  })

  const validationSchema = Yup.object().shape({
    payment_gateway_code: Yup.string()
      .required("Payment Gateway Code is required.")
      .uniqueValueString('payment_gateway.payment_gateway_code', "Payment Gateway Code already exists"),
    payment_gateway_name: Yup.string()
      .required("Payment Gateway Name is required.")
      .uniqueValueString('payment_gateway.payment_gateway_name', "Payment Gateway Name already exists"),
    merchant_id: Yup.string(),
    terminal_id: Yup.string(),
    channel_code: Yup.string(),
    currency_id: Yup.object(),
    transaction_url: Yup.string(),
    notification_url: Yup.string(),
    client_key: Yup.string(),
    server_key: Yup.string(),
    bank_id: Yup.object(),
    virtual_account_number: Yup.string(),
    convenience_store_code: Yup.string(),
  })

  const onSubmit = async (values, a) => {
    console.log(values)
    try {
      let form = {
        ...values,
        payment_gateway_code: values.payment_gateway_code,
        payment_gateway_name: values.payment_gateway_name,
        merchant_id: values.merchant_id,
        terminal_id: values.terminal_id,
        channel_code: values.channel_code,
        transaction_url: values.transaction_url,
        notification_url: values.notification_url,
        client_key: values.client_key,
        server_key: values.server_key,
        virtual_account_number: values.virtual_account_number,
        convenience_store_code: values.convenience_store_code,
        currency_id: values.currency_id.value,
        bank_id: values.bank_id.value,
      }
      let res = await API.putOrPost(endpoint, id, form);
      console.log(res, "hahaha")

      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
      dispatch(
        setAlert({
          message: `Record 'Partner Payment Gateway Name: ${form.payment_gateway_name}' has been successfully saved.`,
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
            control="input"
            required="label-required"
            label="Payment Gateway Code"
            name="payment_gateway_code"
            style={{ maxWidth: 250 / 2 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
          />
          <FormikControl
            control="input"
            required="label-required"
            label="Payment Gateway Name"
            name="payment_gateway_name"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Merchant"
            name="merchant_id"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Terminal"
            name="terminal_id"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Channel Code"
            name="channel_code"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="selectAsync"
            label="Currency"
            name="currency_id"
            placeholder={"Please choose"}
            url={`master/currencies`}
            fieldName={"currency_name"}
            onChange={(v) => {
              setFieldValue("currency_id", v)
            }}
            style={{ maxWidth: 250 }}
            size={formSize}
          />
          <FormikControl
            control="input"
            label="Transaction URL"
            name="transaction_url"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Notification URL"
            name="notification_url"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Client Key"
            name="client_key"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Server Key"
            name="server_key"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="selectAsync"
            label="Bank"
            name="bank_id"
            placeholder={"Please choose"}
            url={`master/banks`}
            fieldName={"bank_name"}
            onChange={(v) => {
              setFieldValue("bank_id", v)
            }}
            style={{ maxWidth: 250 }}
            size={formSize}
          />
          <FormikControl
            control="input"
            label="Virtual Account Number"
            name="virtual_account_number"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
          />
          <FormikControl
            control="input"
            label="Convenience Store Code"
            name="convenience_store_code"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={256}
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
                  className="px-4"
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
export default withRouter(PaymentGatewayCreate)
