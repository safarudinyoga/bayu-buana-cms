import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from "react-redux"
import { withRouter, useHistory } from "react-router"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

import GeneralInformation from "./general-information"
import BranchOffice from "../tabel/tabel"
import EmailReceipts from "./email-receipts"
// import "./employee-form.css"

import { useWindowSize } from "rooks"
import { Card } from "react-bootstrap"

const endpoint = "/master/employees"
const backUrl = "/master/corporate-profile"
const options = {
  position: "bottom-right",
}

const UserProfile = (props) => {
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  const dispatch = useDispatch()
  const api = new Api()
  const isView = useQuery().get("action") === "view"

  const [tabKey, setTabKey] = useState("general-information")
  const { innerWidth } = useWindowSize()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [Data, setData] = useState(null)
  const [finishStep, setStep] = useState(0)
  const [photoData, setPhotoData] = useState(null)

  useEffect(async () => {
    let api = new Api()

    let formId = props.match.params.id

    let docTitle = "Edit Company Profile"
    if (formId) {
      docTitle = docTitle
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Corporate Management ",
          },
          {
            link: backUrl,
            text: "Company Profile",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if (formId) {
        let { data } = await api.get(endpoint + "/" + formId)
        setData(data)
        setPhotoData(
          data.employee_asset?.multimedia_description
            ? {
                id: data.employee_asset.multimedia_description_id,
                data_url: data.employee_asset.multimedia_description.url,
              }
            : null,
        )
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const handleSelectAccordion = async (key) => {
    setTabKey(key === tabKey ? "" : key)
  }

  const doUpload = async (imageList) => {
    try {
      let payload = new FormData()
      payload.append("files", imageList[0].file)

      if (photoData || photoData !== null) await removeImage(photoData.id)

      let res = await api.post("/multimedia/files", payload)
      return res.data.id
    } catch (e) {
      openSnackbar(`Failed upload photo profile => ${e}`)
    }
  }
  const removeImage = async (id) => {
    try {
      let res = await api.delete("/multimedia/files/" + id)
      return null
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = async (values) => {
    try {
      let formId = props.match.params.id

      if (formId) {
        await onSave({ ...Data, ...form, ...values })
      } else {
        if (tabKey === "general-information") {
          setTabKey("emergency-contacts")
          setForm({ ...Data, ...form, ...values })
          if (finishStep < 1) setStep(1)
        } else if (tabKey === "emergency-contacts") {
          setTabKey("employment")
          setForm({ ...Data, ...form, ...values })
          if (finishStep < 2) setStep(2)
        } else {
          setForm({ ...Data, ...form, ...values })
          await onSave({ ...Data, ...form, ...values })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSave = async (values) => {
    try {
      let formId = props.match.params.id

      let photo_id = null
      if (values.photo_profile && values.photo_profile.length > 0) {
        if (
          !photoData ||
          photoData?.data_url !== values.photo_profile[0].data_url
        ) {
          photo_id = await doUpload(values.photo_profile)
        } else {
          photo_id = values.photo_profile[0].id
        }
      }
      if (
        photoData &&
        values.photo_profile &&
        values.photo_profile.length === 0
      )
        photo_id = await removeImage(photoData?.id)

      values = {
        ...values,
        employee_asset: {
          multimedia_description_id: photo_id,
        },
        job_title_id: values.job_title_id
          ? values.job_title_id
          : values.job_title.id,
        office_id: values.office_id
          ? values.office_id
          : values.office?.id
          ? values.office.id
          : "00000000-0000-0000-0000-000000000000",
        division_id: values.division_id
          ? values.division_id
          : values.division?.id
          ? values.division.id
          : "00000000-0000-0000-0000-000000000000",
      }

      if (!formId) {
        //ProsesCreateData
        let res = await api.post("master/employees", values)
        openSnackbar(
          `Record 'Employee Number: ${values.employee_number} Employee Name: ${
            values.given_name + " " + values?.middle_name + " " + values.surname
          }' has been successfully saved.`,
        )
        history.goBack()
      } else {
        //ProsesUpdateData
        let res = await api.put(`master/employees/${formId}`, values)
        openSnackbar(
          `Record 'Employee Number: ${values.employee_number} Employee Name: ${
            values.given_name + " " + values?.middle_name + " " + values.surname
          }' has been successfully update.`,
        )
        setForm({ ...res.data })
        if (tabKey === "employment") history.goBack()
      }
    } catch (e) {
      openSnackbar(`error: ${e}`)
    }
  }

  return (
    <>
      {innerWidth > 480 ? (
        <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column nav-side">
                <Nav.Item>
                  <Nav.Link eventKey="general-information">
                    <div>
                      <ReactSVG src="/img/icons/general-information.svg" />
                      <span>General Information</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="branch-office"
                    // disabled={finishStep < 1 && !Data?.id}
                  >
                    <div>
                      <ReactSVG src="/img/icons/office-building.svg" />
                      <span>Branch Offices</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="email-receipts"
                    // disabled={finishStep < 2 && !Data?.id}
                  >
                    <div>
                      <ReactSVG src="/img/icons/email.svg" />
                      <span>Email Recipients</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="general-information">
                  <GeneralInformation
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                    // employeeData={Data}
                    // onSubmit={onSubmit}
                    finishStep={finishStep}
                    formData={form}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="branch-office">
                  {" "}
                  <BranchOffice
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                    // employeeData={Data}
                    // onSubmit={onSubmit}
                    finishStep={finishStep}
                    formData={form}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="email-receipts">
                  {" "}
                  <EmailReceipts
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                    // employeeData={Data}
                    // onSubmit={onSubmit}
                    finishStep={finishStep}
                    formData={form}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      ) : (
        <Accordion activeKey={tabKey}>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="general-information"
              style={
                tabKey === "general-information"
                  ? { backgroundColor: "#dddddd", color: "#038072" }
                  : null
              }
              onClick={() => {
                handleSelectAccordion("general-information")
              }}
            >
              <div className="accordion-header">
                <ReactSVG
                  src="/img/icons/general-information.svg"
                  className={
                    tabKey === "general-information"
                      ? "icon-active"
                      : "icon-grey"
                  }
                />
                <span>General Information</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="general-information">
              <GeneralInformation
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
                isMobile={false}
                // employeeData={Data}
                // onSubmit={onSubmit}
                finishStep={finishStep}
                formData={form}
              />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="branch-office"
              style={
                tabKey === "branch-office"
                  ? { backgroundColor: "#dddddd", color: "#038072" }
                  : null
              }
              onClick={() => {
                !(finishStep < 2 && !Data?.id) &&
                  handleSelectAccordion("branch-office")
              }}
            >
              <div className="accordion-header">
                <ReactSVG
                  src="/img/icons/emergency-contacts.svg"
                  className={
                    tabKey === "emergency-contacts"
                      ? "icon-active"
                      : "icon-grey"
                  }
                />
                <span>Emergency Contacts</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="emergency-contacts">
              tes
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="email-receipts"
              style={
                tabKey === "employment"
                  ? { backgroundColor: "#dddddd", color: "#038072" }
                  : null
              }
              onClick={() => {
                !(finishStep < 2 && !Data?.id) &&
                  handleSelectAccordion("employment")
              }}
            >
              <div className="accordion-header">
                <ReactSVG
                  src="/img/icons/employment.svg"
                  className={
                    tabKey === "employment" ? "icon-active" : "icon-grey"
                  }
                />
                <span>Employment</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="email-receipts"
              style={{ marginBottom: 0 }}
            >
              <EmailReceipts
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
                isMobile={false}
                // employeeData={Data}
                // onSubmit={onSubmit}
                finishStep={finishStep}
                formData={form}
              />
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
    </>
  )
}

export default withRouter(UserProfile)
