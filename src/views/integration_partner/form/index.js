import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

import PartnerInformation from "./partner-information"
import { useWindowSize } from "rooks"
import { Card } from "react-bootstrap";

const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"
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
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [Data, setData] = useState(null)
  const [finishStep, setStep] = useState(0)
  const [photoData, setPhotoData] = useState(null)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Sabre"
   
    if (!formId) {
      docTitle = "Sabre Details"
    
    } else if (isView) {
      docTitle = "Sabre Details"
      
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
            text: "integration Partner",
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
        setData(data)
        
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
    setTabKey(key === tabKey ? "" : key)
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
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Information</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="emergency-contacts" disabled={finishStep < 1 && !Data?.id} >
                      <div>
                        <ReactSVG src="/img/icons/emergency-contacts.svg" />
                        <span>Emergency Contacts</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="employment" disabled={finishStep < 2 && !Data?.id}>
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
                    <PartnerInformation 
/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="emergency-contacts">
                    tes
                  </Tab.Pane>
                  <Tab.Pane eventKey="employment">
                    tes
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        ) : 
        (
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
                  <ReactSVG src="/img/icons/general-information.svg" 
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
                
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="emergency-contacts"
                style={
                  tabKey === "emergency-contacts"
                    ? { backgroundColor: "#dddddd", color: "#038072" }
                    : null
                }
                onClick={() => {
                  !(finishStep < 2 && !Data?.id) && handleSelectAccordion("emergency-contacts")
                }}
              >
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/emergency-contacts.svg" 
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
                eventKey="employment"
                style={
                  tabKey === "employment"
                    ? { backgroundColor: "#dddddd", color: "#038072" }
                    : null
                }
                onClick={() => {
                  !(finishStep < 2 && !Data?.id) && handleSelectAccordion("employment")
                }}
              >
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/employment.svg" 
                      className={
                        tabKey === "employment"
                          ? "icon-active"
                          : "icon-grey"
                      }
                  />
                  <span>Employment</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="employment" style={{marginBottom: 0}}>
                tes
              </Accordion.Collapse> 
            </Card>
          </Accordion>
        )
      }
      
    </>
    
  );
}

export default withRouter(UserProfile);
