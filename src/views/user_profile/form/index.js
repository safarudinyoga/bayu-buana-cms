import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"

import GeneralInformation from "./general-information"
import EmergencyContacts from "./emergency-contacts"
import SecuritySettings from "./security-settings"
import Subscriptions from "./subscriptions";

const endpoint = "/user/profile"
const backUrl = "/profile"

const UserProfile = (props) => {
  let dispatch = useDispatch()

  let api = new Api()

  const [tabKey, setTabKey] = useState("general-information")

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
    try {
      let res = await api.get(endpoint)
      console.log(res);
      setForm(res.data)
    } catch (e) {}
    setLoading(false)
  }, [])

  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  return (
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
              <Nav.Link eventKey="security-settings">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Security Settings</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="subscriptions">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Subscriptions</span>
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
              />
            </Tab.Pane>
            <Tab.Pane eventKey="emergency-contacts">
              <EmergencyContacts
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="security-settings">
              <SecuritySettings
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="subscriptions">
              <Subscriptions
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default withRouter(UserProfile);
