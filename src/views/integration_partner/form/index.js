import { withRouter, useHistory } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from "react-redux"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { setUIParams } from "redux/ui-store"
import PartnerPaymentGateway from "./partner_payment_gateway/table"
import PartnerMealPlans from "./partner_meal_plans/table"
import PartnertMessages from "./partner_messages/table"
import { useSnackbar } from "react-simple-snackbar"
import PartnerCabin from "../../integration_partner_cabin/tabel"
import PartnerInformation from "./partner-information"
import PartnerCorporate from "./partner-corporate/table"

const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"
const options = {
  position: "bottom-right",
}

const IntegrationPartnerForm = (props) => {
  useEffect(async () => {
    let formId = props.match.params.id

    let docTitle = "Edit Integrarion Partner"
    if (!formId) {
      docTitle = "Create User Access Type"
    } else if (isView) {
      docTitle = "User Access Type Details"
    }
  }, [])

  const [openSnackbar] = useSnackbar(options)
  const dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const [tabKey, setTabKey] = useState("partner-information")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Sabre"

    if (!formId) {
      docTitle = "Sabre"
    } else if (isView) {
      docTitle = "Sabre"
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
            text: "Integration Partner",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if (formId) {
        let { data } = await api.get(endpoint + "/" +formId)
        setData(data)
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

  useEffect(() => {}, [props.match.params.id])

  return (
    <>
      <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column nav-side">
              <Nav.Item>
                <Nav.Link eventKey="partner-information">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Information</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              {data ? (data.integration_partner_code == 2 || data.integration_partner_code == 5 || data.integration_partner_code == 15) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-cities">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Cities</span>
                  </div>
                </Nav.Link>
              </Nav.Item> : null : null 
              }
              {data ? data.integration_partner_code == 2 ?
              <Nav.Item>
                <Nav.Link eventKey="partner-countries">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Countries</span>
                  </div>
                </Nav.Link>
              </Nav.Item> : null : null 
              }
              {data ? (data.integration_partner_code == 2 || data.integration_partner_code == 10) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-hotels">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Hotels</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? (data.integration_partner_code == 2 || data.integration_partner_code == 10) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-hotel-suppliers">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Hotel Suppliers</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? (data.integration_partner_code == 1 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-credential">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Credentials</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? (data.integration_partner_code == 1 || data.integration_partner_code == 2 || data.integration_partner_code == 3 || data.integration_partner_code == 4 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 10 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-corporates">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Corporates</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? (data.integration_partner_code == 1 || data.integration_partner_code == 3 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-cabins">
                  <div>
                    <ReactSVG src="/img/icons/employment.svg" />
                    <span>Partner Cabins</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? (data.integration_partner_code == 1 || data.integration_partner_code == 2 || data.integration_partner_code == 3 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 10 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-meal-plans">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Meal Plans</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? (data.integration_partner_code == 1 || data.integration_partner_code == 3 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 16) ?
                <Nav.Item>
                <Nav.Link eventKey="partner-fee-taxes">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Fee Taxes</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? data.integration_partner_code == 11 ?
                <Nav.Item>
                <Nav.Link eventKey="partner-payment-gateway">
                  <div>
                    <ReactSVG src="/img/icons/employment.svg" />
                    <span>Partner Payment Gateways</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              {data ? data.integration_partner_code == 11 ?
                <Nav.Item>
                <Nav.Link eventKey="partner-currencies">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Currencies</span>
                  </div>
                </Nav.Link>
              </Nav.Item>: null : null 
              }
              <Nav.Item>
                <Nav.Link eventKey="partner-messages">
                  <div>
                    <ReactSVG src="/img/icons/users.svg" />
                    <span>Partner Messages</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="partner-information">
                <PartnerInformation />
              </Tab.Pane>
              <Tab.Pane eventKey="partner-credential">
                Partner Credential
              </Tab.Pane>
              <Tab.Pane eventKey="partner-corporates">
                <PartnerCorporate />
              </Tab.Pane>
              <Tab.Pane eventKey="partner-cabins">
                <PartnerCabin />
              </Tab.Pane>
              <Tab.Pane eventKey="partner-meal-plans">
                {tabKey === "partner-meal-plans" ? (
                  <PartnerMealPlans
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-fee-taxes">
                Partner Fee Taxes
              </Tab.Pane>

              <Tab.Pane eventKey="partner-payment-gateway">
                {tabKey === "partner-payment-gateway" ? (
                  <PartnerPaymentGateway
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              {/* <Tab.Pane eventKey="partner-credential">
                Partner Credential
              </Tab.Pane>
              <Tab.Pane eventKey="partner-corporates">
                Partner Corporates
              </Tab.Pane> */}
              <Tab.Pane eventKey="partner-messages">
                {tabKey === "partner-messages" ? (
                  <PartnertMessages
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default withRouter(IntegrationPartnerForm)
