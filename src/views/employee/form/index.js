import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

import GeneralInformation from "./general-information"
import EmergencyContacts from "./emergency-contacts"
import SecuritySettings from "./security-settings"
import Employee from "./employee"
import "./employee-form.css"

import { useWindowSize } from "rooks"
import { Card } from "react-bootstrap";

const endpoint = "/master/employees"
const backUrl = "/master/employee"
const options = {
  position: "bottom-right",
}

const UserProfile = (props) => {
  const [openSnackbar] = useSnackbar(options)
  const dispatch = useDispatch()
  const api = new Api()
  const isView = useQuery().get("action") === "view"

  const [tabKey, setTabKey] = useState("general-information")
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [Data, setData] = useState(null)
  const [finishStep, setStep] = useState(0)
  const [photoData, setPhotoData] = useState(null)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Employee"
    if (!formId) {
      docTitle = "Create Employee"
    } else if (isView) {
      docTitle = "Employee Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Management",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if(formId) {
        let {data} = await api.get(endpoint + "/" + formId)
        setForm(data)
        setPhotoData(data.employee_asset?.multimedia_description ? {
          id: data.employee_asset.multimedia_description_id,
          data_url: data.employee_asset.multimedia_description.url
        } : null)
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
    }
    finally{
      setLoading(false)
    }
  }, [])

  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const handleSelectAccordion = async (key) => {
    setTabKey(key)
  }

  const doUpload = async (imageList) => {
    try {
      let payload = new FormData()
      payload.append("files", imageList[0].file)

      if(photoData || photoData !== null) await removeImage(photoData.id)

      let res = await api.post("/multimedia/files", payload)
      return res.data.id
    } catch(e) {

    }
  }
  const removeImage = async (id) => {
    try {
      let res = await api.delete("/multimedia/files/"+id)
      return null
    } catch(e) {

    }
  }

  const onSubmit = async(values) => {
    try {
      let formId = props.match.params.id

      if(formId) {
        setForm({...form, ...values})
        await onSave(values)
      } else {
        if(tabKey === "general-information") {
          setTabKey("emergency-contacts")
          setForm({...form, ...values})
          if(finishStep < 1) setStep(1)
        } else if(tabKey === "emergency-contacts") {
          setTabKey("employment")
          setForm({...form, ...values})
          if(finishStep < 2) setStep(2)
        } else {
          setForm({...form, ...values})
          await onSave(values)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSave = async() => {

  }

  return (
    <>
      {
        innerWidth > 480 ? (
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
                    <Nav.Link eventKey="emergency-contacts">
                      <div>
                        <ReactSVG src="/img/icons/emergency-contacts.svg" />
                        <span>Emergency Contacts</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="employment">
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Employment</span>
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
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="emergency-contacts">
                    <EmergencyContacts
                      history={props.history}
                      backUrl={backUrl}
                      handleSelectTab={(v) => handleSelectTab(v)}
                      isMobile={false}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="security-settings">
                    <SecuritySettings
                      history={props.history}
                      backUrl={backUrl}
                      handleSelectTab={(v) => handleSelectTab(v)}
                      isMobile={false}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="subscriptions">
                    <Employee
                      history={props.history}
                      backUrl={backUrl}
                      handleSelectTab={(v) => handleSelectTab(v)}
                      isMobile={false}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        ) : 
        (
          <Accordion defaultActiveKey="general-information">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="general-information">
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/general-information.svg" />
                  <span>General Information</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="general-information">
                <GeneralInformation
                  history={props.history}
                  backUrl={backUrl}
                  isMobile={true}
                  handleSelectAccordion={(v) => handleSelectAccordion(v)}
                />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="emergency-contacts">
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Emergency Contacts</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="emergency-contacts">
                <EmergencyContacts
                  history={props.history}
                  backUrl={backUrl}
                  isMobile={true}
                  handleSelectAccordion={(v) => handleSelectAccordion(v)}
                />
              </Accordion.Collapse> 
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="employment">
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Employment</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="employment">
                <SecuritySettings
                  history={props.history}
                  backUrl={backUrl}
                  isMobile={true}
                  handleSelectAccordion={(v) => handleSelectAccordion(v)}
                />
              </Accordion.Collapse> 
            </Card>
          </Accordion>
        )
      }
      
    </>
    
  );
}

export default withRouter(UserProfile);
