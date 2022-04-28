import React, { useEffect, useState } from "react"
import Api from "config/api"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { withRouter, useHistory } from "react-router"
import FormInputControl from "components/form/input-control"
import { ReactSVG } from "react-svg"
import FormikControl from "../../../components/formik/formikControl"
import { Row, Col, Tab, Nav, Card, Button, } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import { Form, Formik } from "formik"
import { setAlert } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"

const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"

const options = {
  position: "bottom-right",
}

function FormIntegrationPartner(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  let api = new Api()
  let [status, setStatus] = useState({ switchStatus: true })
  console.log(status)
  const [tabKey, setTabKey] = useState("partner-information")
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    integration_partner_code: "",
    integration_partner_name: "",
    status:"",
    partner_url:"",
  })

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    try {
      let res = await api.get(endpoint + "/" + formId)
      let data = res.data;
      setForm({
        ...form,
        integration_partner_code: data.integration_partner_code,
        integration_partner_name: data.integration_partner_name,
        status: data.status,
        business_entity_id:data.business_entity_id.value,
        partner_url: data.partner_url
      })
    } catch (e) { }
    setLoading(false)
  }, [])
  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])


  const handleSelectTab = async (key) => {
    setTabKey(key)
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
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>

        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="partner-information">
              <Formik
               enableReinitialize
               initialValues={form}
               onSubmit={async (values, { setSubmitting, resetForm }) => {
                console.log(values)
        
                let formatted = {
                  integration_partner_code: values.integration_partner_code,
                  integration_partner_name: values.integration_partner_name,
                  status: values.status,
                  business_entity_id:values.business_entity_id,
                  partner_url: values.partner_url,
                  partner_username: values.partner_username ? {
                    id: values.partner_username.value,
                    name: values.partner_username.label
                  } : null,
                }
        
                try {
                  let res = await api.put(`/master/integration-partners`, formatted)
                  dispatch(
                    setAlert({
                      message: `Record '${formatted.integration_partner_name}' has been successfully saved.`,
                    }),
                  )
                } catch(e) {
                  dispatch(
                    setAlert({
                      message: "Failed to save this record.",
                    }),
                  )
                }
              }}
              >
                {({ values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,}) => (
                  <Form onSubmit={handleSubmit} >
                    <Card>
                      <Card.Body>
                        <h3 className="card-heading">Partner Information</h3>
                        <FormInputControl
                          label="Partner Code"
                          value={values.integration_partner_code}
                          name="integration_partner_code"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              integration_partner_code: e.target.value,
                            })
                          }
                          disabled={isView || loading}
                          type="text"
                          minLength="1"
                          style={{ maxWidth: 75 }}
                          maxLength="64"
                        />
                        <FormInputControl
                          label="Partner Name"
                          value={values.integration_partner_name}
                          name="integration_partner_name"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              integration_partner_name: e.target.value,
                            })
                          }
                          disabled={isView || loading}
                          type="text"
                          style={{ maxWidth: 300 }}
                          minLength="1"
                          maxLength="64"
                        />
                       
                        <FormikControl
                          control="switch"
                          label="Status"
                          name="status"
                          size={formSize}
                          value={form.status}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              status: e.target.value,
                            })
                          }
                          disabled={isView || loading}
                        />
                        <FormInputControl
                          label="Partner Name"
                          value={form.partner_url}
                          name="integration_partner_name"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              partner_url: e.target.value,
                            })
                          }
                          disabled={isView || loading}
                          type="text"
                          style={{ maxWidth: 300 }}
                          minLength="1"
                          maxLength="64"
                        />
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
                          <Button variant="secondary" onClick={() => history.goBack()}>
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
                            {props.match.params.id ? "SAVE" : "SAVE & NEXT"}
                          </Button>
                          <Button variant="secondary" onClick={() => history.goBack()}>
                            CANCEL
                          </Button>
                        </>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>


            </Tab.Pane>
            <Tab.Pane eventKey="partner-cities">
              {/* <IdentityRule
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              /> */}
              {/* s */}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(FormIntegrationPartner)
