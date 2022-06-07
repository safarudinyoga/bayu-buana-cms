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
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import { convertToHTML } from "draft-convert"
import DOMPurify from "dompurify"
import { stateToHTML } from "draft-js-export-html"
import FormikControl from "components/formik/formikControl"
import CancelButton from "components/button/cancel"
import { useParams } from "react-router-dom"

const endpoint = "/master/employees"

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
  let routeParams = useParams()
  const backToEmailSetup = "/master/invoice-email-setup"
  const backToEmailTemplate = `/master/invoice-email-setup/${routeParams.template_id}`

  let api = new Api()

  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState(null)
  const [showSentModal, setShowSentModal] = useState(false)
  const [sentModalMsg, setSentModalMsg] = useState("")
  const [sentModalIc, setSentModalIc] = useState("fas fa-envelope")

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty(),
  // )

  // const [convertedContent, setConvertedContent] = useState(null)
  // const handleEditorChange = (state) => {
  //   setEditorState(state)
  // }

  // const convertContentToHTML = () => {
  //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
  //   setConvertedContent(currentContentAsHTML)
  // }

  // const createMarkup = (html) => {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   }
  // }

  // console.log("convertedContent: ", createMarkup(convertedContent))

  // const [initialState, setInitialState] = useState(
  //   EditorState.createWithContent(
  //     ContentState.createFromBlockArray(
  //       convertFromHTML(
  //         "<img src=" + "/img/logo.png" + "/><p>My initial content.</p>",
  //       ),
  //     ),
  //   ),
  // )

  // let html = stateToHTML(editorState.getCurrentContent())
  // const contentBlock = htmlToDraft(html)
  // if (contentBlock) {
  //   const contentState = ContentState.createFromBlockArray(
  //     contentBlock.contentBlocks,
  //   )
  //   editorStateInitial = EditorState.createWithContent(contentState)
  // }

  const [bodyEmail, setBodyEmail] = useState(() => EditorState.createEmpty())

  const handleEditorState = (editorState) => {
    const html = stateToHTML(editorState.getCurrentContent())
    // const contentBlock = htmlToDraft(html)
    setBodyEmail(html)
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = `${'Email Category Name'} - Edit ${'Email Template Name'}`
    let docHeading = docTitle
    if (!formId) {
      docTitle = `Edit ${'Email Template Name'}`
      docHeading = `${'Email Category Name'} - Edit ${'Email Template Name'}`
    } else if (isView) {
      docTitle = `$'{Email Template Name'} Detail`
      docHeading = docTitle
    }

    dispatch(
      setUIParams({
        title: docHeading,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: backToEmailSetup,
            text: `${'Email Category Name'}`,
          },
          {
            link: backToEmailTemplate,
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
        // setLanguages(res.data.items)
        setLanguages(listLanguages)
      })
  }, [])

  const initialValues = {
    invoice_email_name: '',
    invoice_email_type: '',
    invoice_email_subject: ''
  }

  const validationSchema = Yup.object().shape({
    invoice_email_name: Yup.string().required(
      "Invoice Email Name is required.",
    ),
    invoice_email_type: Yup.string().required("Email Type is required."),
    invoice_email_subject: Yup.string().required("Email Subject is required."),
  })

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
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: bodyEmail }}
          ></div>
          {/* <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(convertedContent)}
          ></div> */}
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

  const onSubmit = async (values, a) => {
    console.log(values, "<<<<<")
  }

  const SentModal = () => {
    return <Modal
      show={showSentModal}
      onHide={() => setShowSentModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-form"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <i className={`${sentModalIc}`} style={{fontSize: 40}}></i>
        <p>{sentModalMsg}</p>
        <div className="d-flex justify-content-center w-100" style={{borderTop:"1px solid #E4E4E4", marginTop:15}}>
          <Button
            variant="primary"
            onClick={() => setShowSentModal(false)}
            style={{ marginTop: 15, marginBottom: "10px" }}
          >
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  }

  const onSendTest = async (type) => {
    try {
      console.log(type)
      if(type === "Email Content") {
        setSentModalIc("fas fa-envelope")
        setSentModalMsg("Email has been sent to john.doe@petroxyz.com")
      }
      if(type === "Push Notification") {
        setSentModalIc("fas fa-mobile-alt")
        setSentModalMsg("Notification has been pushed to +628223701693")
      }
      setShowSentModal(true)
    } catch (e) { console.log(e) }
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
      onSubmit={() => {
      console.log("jaaaaoooo")
      }}
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
                              maxLength={256}
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
                              maxLength={256}
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
                              maxLength={256}
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
                                        <Editor
                                          wrapperStyle={{ width: "100%" }}
                                          editorStyle={{
                                            border: "1px solid #D3D3D3",
                                            // marginTop: "-5px",
                                          }}
                                          toolbarStyle={{
                                            background:
                                              "#ECECEC 0% 0% no-repeat padding-box",
                                            border: "1px solid #D3D3D3",
                                            borderBottom: "none",
                                          }}
                                          // editorState={editorState}
                                          // onEditorStateChange={
                                          //   handleEditorChange
                                          // }
                                          onEditorStateChange={
                                            handleEditorState
                                          }
                                        />
                                      </Row>
                                      <Row
                                        style={{
                                          padding: "10px 33px 20px",
                                          marginTop: 50,
                                        }}
                                      >
                                        <Button
                                          className={"mr-3"}
                                          variant="secondary"
                                          onClick={() => {
                                            setShowModal(true)
                                            // convertContentToHTML()
                                          }}
                                        >
                                          PREVIEW
                                        </Button>
                                        <Button 
                                          variant="primary"
                                          onClick={() => {
                                            onSendTest(item)
                                          }}
                                        >
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
                <CancelButton onClick={() => props.history.goBack() }/>
              </div>
            </Col>
            <PreviewModal bodyEmail={bodyEmail} />
            <SentModal/>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(InvoiceEmailSetupForm)
