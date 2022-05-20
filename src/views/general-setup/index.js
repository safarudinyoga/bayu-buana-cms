import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"

import GeneralInformation from "./general-information"
import HandlerSetup from "./handler-setup"
import IdentityRule from "./identity-rule"
import StandardService from "./standard-service"
import OverCreditApproverAssignment from "./over-credit-approver-assignment"
import TravelConsultantAssignment from "./travel-consultant-assignment"
import TeamAssignment from "./team-assignment"
import RetailAncillaryFee from "./retail-ancillary-fee"
import OtherAncillaryFee from "./other-ancillary-fee"
import TaxFee from "./tax-fee"
import BookingSettings from "./booking-settings"
import InvoiceSettings from "./invoice-settings"
import TravelAdvice from "./travel-advice"

// const endpoint = "/user/profile"
const backUrl = "/master/general-setup"

const GeneralSetup= (props) => {
  let dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("general-information")
  useEffect(async () => {
    let docTitle = "General Setup"
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configuration",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
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
                  <ReactSVG src="/img/icons/setup-general-information.svg" />
                  <span>General Information</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            
            <Nav.Item>
              <Nav.Link eventKey="handler-setup">
                <div>
                  <ReactSVG src="/img/icons/setup-handler-setup.svg" />
                  <span>Handler Setup</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="identity-rule">
                <div>
                  <ReactSVG src="/img/icons/setup-identity-rule.svg" />
                  <span>Identity Rule</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="standard-service">
                <div>
                  <ReactSVG src="/img/icons/setup-standard-service.svg" />
                  <span>Standard Service</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="over-credit-approver-assignment">
                <div>
                  <ReactSVG src="/img/icons/setup-over-credit.svg" />
                  <span>Over Credit Approver Assignment</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="travel-consultant-assignment">
                <div>
                  <ReactSVG src="/img/icons/setup-travel-consultant.svg" />
                  <span>Travel Consultant Assignment</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="team-assignment">
                <div>
                  <ReactSVG src="/img/icons/setup-team-assignment.svg" />
                  <span>Team Assignment</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="retail-ancillary-fee">
                <div>
                  <ReactSVG src="/img/icons/setup-retail-ancillary.svg" />
                  <span>Retail Ancillary Fee</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="other-ancillary-fee">
                <div>
                  <ReactSVG src="/img/icons/setup-other-ancillary.svg" />
                  <span>Other Ancillary Fee</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="tax-fee">
                <div>
                  <ReactSVG src="/img/icons/setup-tax-fee.svg" />
                  <span>Tax Fee</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="booking-settings">
                <div>
                  <ReactSVG src="/img/icons/setup-booking-setting.svg" />
                  <span>Booking Settings</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="invoice-settings">
                <div>
                  <ReactSVG src="/img/icons/setup-invoice-setting.svg" />
                  <span>Invoice Settings</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="travel-advice">
                <div>
                  <ReactSVG src="/img/icons/setup-travel-advice.svg" />
                  <span>Travel Advice</span>
                </div>
              </Nav.Link>
            </Nav.Item>

          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="general-information">
              {tabKey === "general-information" ? (
                <GeneralInformation
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
              ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="handler-setup">
              {tabKey === "handler-setup" ? (
                <HandlerSetup
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="identity-rule">
              {tabKey === "identity-rule" ? (
                <IdentityRule
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="standard-service">
              {tabKey === "standard-service" ? (
                <StandardService
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="over-credit-approver-assignment">
              {tabKey === "over-credit-approver-assignment" ? (
                <OverCreditApproverAssignment
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="travel-consultant-assignment">
              {tabKey === "travel-consultant-assignment" ? (
                <TravelConsultantAssignment
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="team-assignment">
              {tabKey === "team-assignment" ? (
                <TeamAssignment
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="retail-ancillary-fee">
              {tabKey === "retail-ancillary-fee" ? (
                <RetailAncillaryFee
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="other-ancillary-fee">
              {tabKey === "other-ancillary-fee" ? (
                <OtherAncillaryFee
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="tax-fee">
              {tabKey === "tax-fee" ? (
                <TaxFee
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="booking-settings">
              {tabKey === "booking-settings" ? (
                <BookingSettings
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="invoice-settings">
              {tabKey === "invoice-settings" ? (
                <InvoiceSettings
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="travel-advice">
              {tabKey === "travel-advice" ? (
                <TravelAdvice
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
              ) : null}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default withRouter(GeneralSetup);
