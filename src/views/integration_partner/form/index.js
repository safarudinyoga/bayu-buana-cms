import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import PartnerCredentials from "./partner-credentials/partner-credentials"
import PartnerCorporate from "./partner-corporate/partner-corporate"

const backUrl = "/master/integration-partner"

const IntegrationPartnerForm = (props) => {
  let dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("partner-credentials")
  const isView = useQuery().get("action") === "view"
  
  useEffect(async () => {
    let formId = props.match.params.id

    let docTitle = "Edit Integrarion Partner"
    if (!formId) {
      docTitle = "Create User Access Type"
    } else if (isView) {
      docTitle = "User Access Type Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "User & Access Management",
          },
          {
            link: backUrl,
            text: "User Access Type",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  }, [])

  // Select tabs
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  useEffect(() => {
  }, [props.match.params.id])

  return (
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-side">
            <Nav.Item>
              <Nav.Link eventKey="partner-credentials">
                <div>
                  <ReactSVG src="/img/icons/user-access-type.svg" />
                  <span>Partner Credentials</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-corporate">
                <div>
                  <ReactSVG src="/img/icons/module-access.svg" />
                  <span>Partner Corporate</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="partner-credentials">
              <PartnerCredentials
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="partner-corporate">
              <PartnerCorporate
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(IntegrationPartnerForm)
