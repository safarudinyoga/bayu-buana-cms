import Api from "config/api"
import useQuery from "lib/query"
import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap"
import * as Yup from "yup"
import { Formik, FastField } from "formik"
import { useDispatch } from "react-redux"
import { withRouter } from "react-router"
import { setUIParams } from "redux/ui-store"
import FormikControl from "components/formik/formikControl"
import CancelButton from "components/button/cancel"

const endpoint = "/master/employees"
const backUrl = "/master/invoice-email-setup"

const listLanguages = [
  {
    value: "DEFAULT (ENGLISH)",
  },
  {
    value: "CHINESE SIMPLIFIED",
  },
  {
    value: "CHINESE TRADITIONAL",
  },
]

const InvoiceEmailSetupForm = (props) => {
  let dispatch = useDispatch()
  let api = new Api()
  const [tabKey, setTabKey] = useState("general-information")

  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Email Template 1 - Edit Invoice Per Transaction Email"
    if (!formId) {
      docTitle = "Edit Invoice Per Transaction Email"
    } else if (isView) {
      docTitle = "Invoice Email Setup Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configuration",
          },
          {
            link: backUrl,
            text: "Invoice Email Setup",
          },
          {
            link: backUrl,
            text: "Email Template 1",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setFormValues(res.data)
      } catch (e) {}
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const [content, setContent] = useState(["Email Content", "Push Notification"])

  // api https://bbdev.monstercode.net/api/v1/master/agent-languages?size=-1&sort=sort,language_name
  const [languages, setLanguages] = useState(listLanguages)
  const [firstLanguage, setFirstLanguage] = useState({})

  useEffect(async () => {
    let api = new Api()
    api
      .get("/master/agent-languages?size=-1&sort=sort,language_name")
      .then((res) => {
        setLanguages(res.data.items)
      })
  }, [])

  const initialValues = {
    payment_gateway_code: "",
    payment_gateway_name: "",
    merchant_id: "",
    terminal_id: "",
    channel_code: "",
    currency_id: "a",
    transaction_url: "",
    notification_url: "",
    client_key: "",
    server_key: "",
    bank_id: "a",
    virtual_account_number: "",
    onvenience_store_code: "",
  }

  const borderStyle = {
    border: "1px solid #ddd",
    borderRadius: "4px",
  }

  const PreviewModal = ({ bodyEmail }) => (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-form"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-uppercase font-weight-bold">
          Invoice Email Setup Preview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            border: "1px solid #D3D3D3",
            padding: "21.01px 24.25px 37.99px",
          }}
        >
          {bodyEmail}
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(false)}
          style={{ marginTop: "29px", marginBottom: "10px" }}
        >
          OK
        </Button>
      </Modal.Body>
    </Modal>
  )

  const validationSchema = Yup.object().shape({
    invoice_email_name: Yup.string().required(
      "Invoice Email Name is required.",
    ),
    invoice_email_type: Yup.string().required("Email Type is required."),
    invoice_email_subject: Yup.string().required("Email Subject is required."),
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
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={1}>
              <div>
                <OverlayTrigger
                  placement="right"
                  trigger="click"
                  overlay={
                    <Popover className="d-flex justify-content-center">
                      <div
                        style={{
                          padding: "11px 30.5px 24px 23.5px",
                          width: "384px",
                          maxHeight: "366px",
                          overflowY: "auto",
                        }}
                      >
                        <h4 className="text-center font-weight-bold">
                          System Variables
                        </h4>
                        <hr className="m-0" />
                        test
                      </div>
                    </Popover>
                  }
                >
                  <div
                    style={{
                      width: 70,
                      backgroundColor: "#818181",
                      color: "#ffffff",
                      height: 70,
                      borderRadius: 15,
                      padding: 10,
                      alignContent: "center",
                      textAlign: "center",
                      marginBottom: 29,
                      cursor: "pointer",
                    }}
                  >
                    <img src="/img/icons/users.svg" alt="icon users"></img>
                    <p style={{ fontSize: 13 }}>Variable</p>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  trigger="click"
                  overlay={
                    <Popover className="d-flex justify-content-center">
                      <div
                        style={{
                          padding: "11px 30.5px 24px 23.5px",
                          width: "384px",
                          maxHeight: "366px",
                          overflowY: "auto",
                        }}
                      >
                        <h4 className="text-center font-weight-bold">
                          Widget Templates
                        </h4>
                        <hr className="m-0" />
                        test
                      </div>
                    </Popover>
                  }
                >
                  <div
                    style={{
                      width: 70,
                      backgroundColor: "#818181",
                      color: "#ffffff",
                      height: 70,
                      borderRadius: 15,
                      padding: 10,
                      alignContent: "center",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src="/img/icons/users.svg" alt="icon users"></img>
                    <p style={{ fontSize: 13 }}>Widget</p>
                  </div>
                </OverlayTrigger>
              </div>
            </Col>
            <Col md={11}>
              <Card>
                <Tabs defaultActiveKey={languages[0]?.value} className="mb-3">
                  {languages.map((item, index) => {
                    return (
                      <Tab eventKey={item.value} title={item.value} key={index}>
                        <Row style={{ border: 1, borderColor: "#ccc" }}>
                          <Col md={6} style={{ padding: "10px 45px" }}>
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Invoice Email Name"
                              name="invoice_email_name"
                              placeholder="Invoice Per Transactional Email"
                              style={{ maxWidth: 399.79 }}
                              size={formSize}
                              disabled={isView || loading}
                              maxLength={36}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Email Type"
                              name="invoice_email_type"
                              placeholder="Invoice Per Transactional"
                              style={{ maxWidth: 399.79 / 2 }}
                              size={formSize}
                              disabled={isView || loading}
                              maxLength={36}
                            />
                            <FormikControl
                              control="input"
                              required="label-required"
                              label="Email Subject"
                              name="invoice_email_subject"
                              placeholder="{{invoice_number}} Bayu Buana Invoice For {{corporate_name}}"
                              style={{ maxWidth: 399.79 }}
                              size={formSize}
                              disabled={isView || loading}
                              maxLength={36}
                            />
                          </Col>
                        </Row>
                        <div style={{ padding: "45px 45px" }}>
                          <Row>
                            <Col md={12} style={{ ...borderStyle, padding: 0 }}>
                              <Tabs
                                defaultActiveKey={"Email Content"}
                                className="mb-3"
                              >
                                {content.map((item, index) => {
                                  return (
                                    <Tab
                                      eventKey={item}
                                      title={item}
                                      key={index}
                                    >
                                      <Row style={{ padding: "10px 33px" }}>
                                        <Form.Control
                                          as="textarea"
                                          rows={3}
                                        ></Form.Control>
                                      </Row>
                                      <Row
                                        style={{ padding: "10px 33px 20px" }}
                                      >
                                        <Button
                                          className={"mr-3"}
                                          variant="secondary"
                                          onClick={() => setShowModal(true)}
                                        >
                                          PREVIEW
                                        </Button>
                                        <Button variant="primary">
                                          SEND TEST
                                        </Button>
                                      </Row>
                                    </Tab>
                                  )
                                })}
                              </Tabs>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                    )
                  })}
                </Tabs>
              </Card>
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
                <CancelButton />
              </div>
            </Col>
            <PreviewModal bodyEmail={<div> Ini preview email</div>} />
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(InvoiceEmailSetupForm)
