import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from "react-redux"
import { withRouter } from "react-router"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import "./form/user-profile.scss"
import PersonalInformation from "./form/personal-information"
import EmergencyContacts from "./form/emergency-contact"
import Passport from "./form/passport"
import SecuritySetting from "./form/security-setting"
// import UserProfileMobile from "./user-profile-mobile"

import { useWindowSize } from "rooks"
import { Card } from "react-bootstrap"

const endpoint = "/user/profile"
const backUrl = "/profile"

const UserProfile = (props) => {
  const selectedTab = props.match.params.tab

  let dispatch = useDispatch()

  let api = new Api()

  const [tabKey, setTabKey] = useState(
    selectedTab ? selectedTab : "personal-information",
  )
  const [accordionKey, setAccordionKey] = useState("gi")
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize()

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    id: "",
    aircraft_name: "",
    model: "",
    icao_code: "",
    aircraft_code: "",
  })

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "User Profile"
    if (!formId) {
      docTitle = "User Profile"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: docTitle,
          },
        ],
      }),
    )
    // try {
    //   let res = await api.get(endpoint)
    //   setForm(res.data)
    // } catch (e) {}
    // setLoading(false)
  }, [])

  const handleSelectTab = async (key) => {
    setTabKey(key)
    props.history.push("/master/corporate-user-profile/" + key)
  }

  const handleSelectAccordion = async (key) => {
    setAccordionKey(key)
  }

  return (
    <>
      {innerWidth > 480 ? (
        <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column nav-user-profile">
                <Nav.Item>
                  <Nav.Link eventKey="personal-information">
                    <div>
                      <ReactSVG src="/img/icons/general-information.svg" />
                      <span>Personal Information</span>
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
                  <Nav.Link eventKey="passport">
                    <div>
                      <ReactSVG src="/img/icons/security-settings.svg" />
                      <span>Passport</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="frequent-traveler-program">
                    <div>
                      <ReactSVG src="/img/icons/security-settings.svg" />
                      <span>Frequent Traveler Program</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="security-settings">
                    <div>
                      <ReactSVG src="/img/icons/security-settings.svg" />
                      <span>Security Settings</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="subscriptions">
                    <div>
                      <ReactSVG src="/img/icons/subscription.svg" />
                      <span>Subscriptions</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="personal-information">
                  <PersonalInformation
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
                <Tab.Pane eventKey="passport">
                  <Passport
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="frequent-traveler-program">
                  {/* <EmergencyContacts
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                  /> */}{" "}
                </Tab.Pane>
                <Tab.Pane eventKey="security-settings">
                  <SecuritySetting
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="subscriptions">
                  {/* <Subscriptions
                    history={props.history}
                    backUrl={backUrl}
                    handleSelectTab={(v) => handleSelectTab(v)}
                    isMobile={false}
                  /> */}{" "}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      ) : (
        <Accordion defaultActiveKey="gi">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="gi">
              <div className="accordion-header">
                <ReactSVG src="/img/icons/general-information.svg" />
                <span>Personal Information</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="gi">
              <PersonalInformation
                history={props.history}
                backUrl={backUrl}
                isMobile={true}
                handleSelectAccordion={(v) => handleSelectAccordion(v)}
              />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="ec">
              <div className="accordion-header">
                <ReactSVG src="/img/icons/emergency-contacts.svg" />
                <span>Emergency Contacts</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="ec">
              <EmergencyContacts
                history={props.history}
                backUrl={backUrl}
                isMobile={true}
                handleSelectAccordion={(v) => handleSelectAccordion(v)}
              />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="ss">
              <div className="accordion-header">
                <ReactSVG src="/img/icons/employment.svg" />
                <span>Passport</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="ss">
              <Passport
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
                isMobile={false}
              />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="ss">
              <div className="accordion-header">
                <ReactSVG src="/img/icons/employment.svg" />
                <span>Frequent Traveler Program</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="ss">
              {/* <SecuritySettings
                history={props.history}
                backUrl={backUrl}
                isMobile={true}
                handleSelectAccordion={(v) => handleSelectAccordion(v)}
              /> */}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="ss">
              <div className="accordion-header">
                <ReactSVG src="/img/icons/employment.svg" />
                <span>Security Settings</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="ss">
              <SecuritySetting
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
                isMobile={false}
              />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="sub">
              <div className="accordion-header">
                <ReactSVG src="/img/icons/employment.svg" />
                <span>Subscriptions</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="sub">
              {/* <Subscriptions
                history={props.history}
                backUrl={backUrl}
                isMobile={true}
                handleSelectAccordion={(v) => handleSelectAccordion(v)}
              /> */}
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
    </>
  )
}

export default withRouter(UserProfile)
