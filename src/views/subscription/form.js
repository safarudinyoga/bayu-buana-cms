import React, { useEffect, useState } from "react"
import Api from "config/api"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { withRouter, useHistory } from "react-router"
import FormInputControl from "components/form/input-control"
import { ReactSVG } from "react-svg"
import FormikControl from "components/formik/formikControl"
import { Row, Col, InputGroup, Nav, Card, Button, Form } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import { setAlert } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import * as Yup from "yup"
const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"

const options = {
  position: "bottom-right",
}

function Subscription(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  let api = new Api()
  // let [status, setStatus] = useState({ switchStatus: true })
  const [data, setData] = useState(null)
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    integration_partner_code: "",
    integration_partner_name: "",
    status: true,
    partner_url: "",
    partner_username: "",
    partner_password: "",
  })
	const [ passType, setPassType] = useState("password")

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    try {
      let res = await api.get(endpoint + "/" + formId)
      let data = res.data
      setData(data)
      setForm({
        ...form,
        integration_partner_code: data.integration_partner_code,
        integration_partner_name: data.integration_partner_name,
        status: data.status == 1,
        business_entity_id: data.business_entity_id.value,
        partner_url: data.partner_url,
        partner_username: data.partner_username,
        partner_password: data.partner_password ? data.partner_password : "",
      })
    } catch (e) {}
    setLoading(false)
  }, [])
  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const initialValues = {
    integration_partner_code: "",
    integration_partner_name: "",
    partner_url: "",
    partner_username: "",
    partner_password: "",
  }

  const regexURL = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
  const validationSchema = Yup.object().shape({
    partner_url: Yup.string()
          .matches(regexURL, 'Invalid URL Format')
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = props.match.params.id
      console.log('values', values)
      let form = {
        agent_performance_enabled: true,
        business_entity_id: "33867ec0-f378-cde5-f7ca-49c05af6a443",
        corporate_information_enabled: true,
        corporate_performance_enabled: false,
        credit_limit_enabled: true,
        status: values.status ? 1 : 3,
        crs_password: "",
        crs_username: "",
        description: "",
        employee_performance_enabled: false,
        integration_partner_code: values.integration_partner_code,
        integration_partner_name: values.integration_partner_name,
        integration_partner_type_id: "urn:uuid:ca40f114-075e-51f3-49b8-cdbd8311d7f9",
        invoice_enabled: false,
        involuntary_change_booking_notification_enabled: true,
        partner_password: values.partner_password,
        partner_url: values.partner_url,
        partner_username: values.partner_username,
        supplier_type_id: "urn:uuid:cf7146c4-16e5-afb7-26ee-8f570c7514be",
        transaction_performance_enabled: true,
        traveler_performance_enabled: true
      }

      if (formId) {
        //Proses Update Data
        let res = await api.put(`/master/integration-partners/${formId}`, form)
        dispatch(
          setAlert({
            message: `Record '${values.integration_partner_name}' has been successfully saved.`,
          }),
        )
      }
      history.goBack()
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
      md: 4,
      lg: 4,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }
  return (
    <Formik
      enableReinitialize
      initialValues={form || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <Card.Body>
              <h3 className="card-heading">Subscriptions</h3>
              <div style={{paddingLeft: 20}}>
                <FormikControl
                    control="switch"
                    label="Receive Travel Deals and Special Offers"
                    name="status"
                    size={formSize}
                    value={false}
                    onChange={(v) => {
                    setFieldValue("status", v)
                    }}
                    disabled={isView || loading}
                />
                <FormikControl
                    control="switch"
                    label="Receive Newsletters"
                    name="status"
                    size={formSize}
                    value={values.status }
                    onChange={(v) => {
                    setFieldValue("status", v)
                    }}
                    disabled={isView || loading}
                />
              </div>
            </Card.Body>
          </Card>
          <div
            className="mb-5 ml-1 row justify-content-md-start justify-content-center"
            style={{
              marginBottom: 30,
              marginTop: 30,
              display: "flex",
            }}
          >
            {isView ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => history.goBack()}
                >
                  BACK
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: 15 }}
                >
                  {"SAVE"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => history.goBack()}
                >
                  CANCEL
                </Button>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(Subscription)
