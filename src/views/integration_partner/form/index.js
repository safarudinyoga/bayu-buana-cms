import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from "react-redux"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { setUIParams } from "redux/ui-store"
import PartnerPaymentGateway from "./partner_payment_gateway/table"
import PartnerCities from "./partner_city/table"
import PartnerCountries from "./partner_country/table"
import PartnerHotels from "./partner_hotel/table"
import PartnerHotelSuppliers from "./partner_hotel_supplier/table"
import PartnerCredentials from "./partner_credentials/table"
import PartnerFeeTaxes from "./partner_fee_tax/table"
import PartnerMealPlans from "./partner_meal_plans/table"
import PartnerCurrencies from "./partner_currency/table"
import PartnerMessages from "./partner_messages/table"
import { useSnackbar } from "react-simple-snackbar"
import PartnerCabin from "./partner_cabin/table"
import PartnerInformation from "./partner-information"
import PartnerCorporate from "./partner_corporate/table"

const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"
const options = {
  position: "bottom-right",
}

const IntegrationPartnerForm = (props) => {
  const [openSnackbar] = useSnackbar(options)
  const dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const [tabKey, setTabKey] = useState("partner-information")
  const [data, setData] = useState(null)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    try {
      if (formId) {
        let { data } = await api.get(endpoint + "/" +formId)
        dispatch(
          setUIParams({
            title: data.integration_partner_name,
            breadcrumbs: [
              {
                text: "Setup And Configurations",
              },
              {
                link: backUrl,
                text: "Integration Partner",
              },
              {
                text: data.integration_partner_name,
              },
            ],
          }),
        )
        setData(data)
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
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
                    <ReactSVG src="/img/icons/partner-information.svg" />
                    <span>Partner Information</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              {
              data ? (data.integration_partner_code == 2 || data.integration_partner_code == 5 || data.integration_partner_code == 15) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-cities">
                  <div>
                    <ReactSVG src="/img/icons/partner-city.svg" />
                    <span>Partner Cities</span>
                  </div>
                </Nav.Link>
              </Nav.Item> 
              : null : null 
              }
              {
              data ? data.integration_partner_code == 2 ?
              <Nav.Item>
                <Nav.Link eventKey="partner-countries">
                  <div>
                    <ReactSVG src="/img/icons/partner-country.svg" />
                    <span>Partner Countries</span>
                  </div>
                </Nav.Link>
              </Nav.Item> 
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 2 || data.integration_partner_code == 10) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-hotels">
                  <div>
                    <ReactSVG src="/img/icons/partner-hotel.svg" />
                    <span>Partner Hotels</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 2 || data.integration_partner_code == 10) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-hotel-suppliers">
                  <div>
                    <ReactSVG src="/img/icons/partner-hotel-supplier.svg" />
                    <span>Partner Hotel Suppliers</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 1 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-credentials">
                  <div>
                    <ReactSVG src="/img/icons/partner-credential.svg" />
                    <span>Partner Credentials</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 1 || data.integration_partner_code == 2 || data.integration_partner_code == 3 || data.integration_partner_code == 4 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 10 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-corporates">
                  <div>
                    <ReactSVG src="/img/icons/partner-corporate.svg" />
                    <span>Partner Corporates</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 1 || data.integration_partner_code == 3 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-cabins">
                  <div>
                    <ReactSVG src="/img/icons/partner-cabin.svg" />
                    <span>Partner Cabins</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 1 || data.integration_partner_code == 2 || data.integration_partner_code == 3 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 10 || data.integration_partner_code == 16) ?
              <Nav.Item>
                <Nav.Link eventKey="partner-meal-plans">
                  <div>
                    <ReactSVG src="/img/icons/partner-meal-plan.svg" />
                    <span>Partner Meal Plans</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? (data.integration_partner_code == 1 || data.integration_partner_code == 3 || data.integration_partner_code == 7 || data.integration_partner_code == 8 || data.integration_partner_code == 9 || data.integration_partner_code == 16) ?
                <Nav.Item>
                <Nav.Link eventKey="partner-fee-taxes">
                  <div>
                    <ReactSVG src="/img/icons/partner-fee-tax.svg" />
                    <span>Partner Fee Taxes</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? data.integration_partner_code == 11 ?
                <Nav.Item>
                <Nav.Link eventKey="partner-payment-gateway">
                  <div>
                    <ReactSVG src="/img/icons/partner-payment-gateway.svg" />
                    <span>Partner Payment Gateways</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              {
              data ? data.integration_partner_code == 11 ?
                <Nav.Item>
                <Nav.Link eventKey="partner-currencies">
                  <div>
                    <ReactSVG src="/img/icons/partner-currency.svg" />
                    <span>Partner Currencies</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              : null : null 
              }
              <Nav.Item>
                <Nav.Link eventKey="partner-messages">
                  <div>
                    <ReactSVG src="/img/icons/partner-message.svg" />
                    <span>Partner Messages</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="partner-information">
                {tabKey === "partner-information" ? (
                  <PartnerInformation
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-cities">
                {tabKey === "partner-cities" ? (
                  <PartnerCities
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-countries">
                {tabKey === "partner-countries" ? (
                  <PartnerCountries
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-hotels">
                {tabKey === "partner-hotels" ? (
                  <PartnerHotels
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-hotel-suppliers">
                {tabKey === "partner-hotel-suppliers" ? (
                  <PartnerHotelSuppliers
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-credentials">
              {tabKey === "partner-credentials" ? (
                  <PartnerCredentials
                    handleSelectTab={(v) => handleSelectTab(v)}
                    integration_partner_code={data.integration_partner_code}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-corporates">
                {tabKey === "partner-corporates" ? (
                  <PartnerCorporate
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-cabins">
                {tabKey === "partner-cabins" ? (
                  <PartnerCabin
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>           
              <Tab.Pane eventKey="partner-meal-plans">
                {tabKey === "partner-meal-plans" ? (
                  <PartnerMealPlans
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-fee-taxes">
                {tabKey === "partner-fee-taxes" ? (
                  <PartnerFeeTaxes
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-payment-gateway">
                {tabKey === "partner-payment-gateway" ? (
                  <PartnerPaymentGateway
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-currencies">
                {tabKey === "partner-currencies" ? (
                  <PartnerCurrencies
                    handleSelectTab={(v) => handleSelectTab(v)}
                  />
                ) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="partner-messages">
                {tabKey === "partner-messages" ? (
                  <PartnerMessages
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
