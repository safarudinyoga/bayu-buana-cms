import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import PartnerPaymentGateway from "./partner_payment_gateway/tables"
import PartnerMealPlans from "./partner_meal_plans/table"
import PartnertMessages from "./partner_messages/table"

const backUrl = "/master/integration-partner"

const IntegrationPartnerForm = (props) => {
  let dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("partner-meal-plans")
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

  useEffect(() => {}, [props.match.params.id])

  return (
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-side">
            <Nav.Item>
              <Nav.Link eventKey="partner-payment-gateway">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Payment Gateways</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-meal-plans">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Meals plans</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-messages">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Free Messages</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="partner-payment-gateway">
              <PartnerPaymentGateway />
            </Tab.Pane>
            <Tab.Pane eventKey="partner-meal-plans">
              <PartnerMealPlans />
            </Tab.Pane>
            <Tab.Pane eventKey="partner-messages">
              <PartnertMessages />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(IntegrationPartnerForm)
