import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { ReactSVG } from "react-svg"
import { Card, Form, Row, Col, Accordion } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"

import GeneralInformation from "./general-information"
import EmergencyContacts from "./emergency-contacts"
import SecuritySettings from "./security-settings"
import Subscriptions from "./subscriptions"
import { fill } from "lodash";

const endpoint = "/user/profile"
const backUrl = "/profile"

const UserProfileMobile = (props) => {
  let dispatch = useDispatch()

  let api = new Api()

  // const [tabKey, setTabKey] = useState("general-information")
 

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
            text: "Management",
          },
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

  // const handleSelectTab = async (key) => {
  //   setTabKey(key)
  // }

 const [currentActiveKey, setCurrentActiveKey] = useState(null);

  const toggleActiveKey = (key) => {
    setCurrentActiveKey(currentActiveKey === key ? null : key);
  };

  return (
    <Accordion className={props.className}>
        <Card className="mb-0"  >
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="general-information" 
                style={currentActiveKey === "general-information" ? { backgroundColor: "#dddddd", color: "#038072" } : null} 
                onClick={() => { toggleActiveKey("general-information"); }}
              >
                  <div style={{ display: "inline-flex" }}>
                    <ReactSVG 
                      src="/img/icons/general-information.svg" 
                      className={currentActiveKey === "general-information" ? "icon-active" : "icon-grey"} 
                    />
                    <span style={{ paddingLeft: "10px" }}>General Information</span>
                  </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="general-information">
                  {/* <Card.Body> */}
                  <GeneralInformation
                    history={props.history}
                    backUrl={backUrl}
                    // handleSelectTab={(v) => handleSelectTab(v)}
                  />
                  {/* </Card.Body> */}
              </Accordion.Collapse>
        </Card>
        <Card className="mb-0">
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="emergency-contacts"
                style={currentActiveKey === "emergency-contacts" ? { backgroundColor: "#dddddd", color: "#038072" } : null} 
                onClick={() => { toggleActiveKey("emergency-contacts"); }}
              >
                  <div style={{ display: "inline-flex" }}>
                      <ReactSVG 
                        src="/img/icons/emergency-contacts.svg" 
                        className={currentActiveKey === "emergency-contacts" ? "icon-active" : "icon-grey"} 
                      />
                      <span style={{ paddingLeft: "10px" }}>Emergency Contacts</span>
                  </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="emergency-contacts">
                  {/* <Card.Body> */}
                    <EmergencyContacts
                      history={props.history}
                      backUrl={backUrl}
                      // handleSelectTab={(v) => handleSelectTab(v)}
                    />
                  {/* </Card.Body> */}
              </Accordion.Collapse>
        </Card>
        <Card className="mb-0">
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="security-settings"
                style={currentActiveKey === "security-settings" ? { backgroundColor: "#dddddd", color: "#038072" } : null} 
                onClick={() => { toggleActiveKey("security-settings"); }}
              >
                  <div style={{ display: "inline-flex" }}>
                      <ReactSVG 
                        src="/img/icons/employment.svg" 
                        className={currentActiveKey === "security-settings" ? "icon-active" : "icon-grey"} 
                      />
                      <span style={{ paddingLeft: "10px" }}>Security Settings</span>
                  </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="security-settings">
                  {/* <Card.Body> */}
                    <SecuritySettings
                      history={props.history}
                      backUrl={backUrl}
                      // handleSelectTab={(v) => handleSelectTab(v)}
                    />
                  {/* </Card.Body> */}
              </Accordion.Collapse>
        </Card>
        <Card className="mb-0">
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="subscriptions"
                style={currentActiveKey === "subscriptions" ? { backgroundColor: "#dddddd", color: "#038072" } : null} 
                onClick={() => { toggleActiveKey("subscriptions"); }}
              >
                  <div style={{ display: "inline-flex" }}>
                      <ReactSVG 
                        src="/img/icons/employment.svg" 
                        className={currentActiveKey === "subscriptions" ? "icon-active" : "icon-grey"} 
                      />
                      <span style={{ paddingLeft: "10px" }}>Subscriptions</span>
                  </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="subscriptions">
                  {/* <Card.Body> */}
                    <Subscriptions
                      history={props.history}
                      backUrl={backUrl}
                      // handleSelectTab={(v) => handleSelectTab(v)}
                    />
                  {/* </Card.Body> */}
              </Accordion.Collapse>
        </Card>
    </Accordion>

  );
}

export default withRouter(UserProfileMobile);
