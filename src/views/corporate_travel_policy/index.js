import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import GeneralInformation from "./general-information"
import DestinationRestriction from "./destination_restriction"
import StandardService from "./standart_service/standard-service"
import OverCreditApproverAssignment from "./over-credit-approver-assignment"
import TravelConsultantAssignment from "./travel-consultant-assignment"
import TeamAssignment from "./team-assignment"
import RetailAncillaryFee from "./retail-ancillary-fee"
import OtherAncillaryFee from "./other-ancillary-fee"
import TaxFee from "./tax-fee"
import BookingSettings from "./booking-settings"
import InvoiceSettings from "./invoice-settings"
import TravelAdvice from "./travel-advice"
import TravelPolicyDocument from "./travel-policy-document"
import DivisionCorporate from "./division_corporate"
import MiscellaneousConfiguration from "./miscellaneous_configuration"
import StaffAndManager from "./staff-and-manager";
import Director from "./director";
import Vip from "./vip";
import PreferredHotelChain from "./preferred-hotel-chain";
import "./style.scss"

// const endpoint = "/user/profile"
const backUrl = "/master/general-setup"

const TravelPolicy = (props) => {
  let dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("staff-and-manager")
  // const [modalShow, setModalShow] = useState(false)

  useEffect(async () => {
    let docTitle = "Travel Policy"
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Corporate Management",
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
          <Nav.Item className="nav-header">
              <div>
                <span>POLICY CLASSES</span>
              </div>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="staff-and-manager">
                <div>
                  <ReactSVG src="/img/icons/corporate-staff-manager.svg" />
                  <span>Staff and Manager</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="director">
                <div>
                  <ReactSVG src="/img/icons/corporate-director.svg" />
                  <span>Director</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="vip">
                <div>
                  <ReactSVG src="/img/icons/corporate-vip.svg" />
                  <span>VIP</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <div className="create-new-btn">
              <ReactSVG src="/img/icons/corporate-create-new.svg"/>
              <span>Create New</span>
            </div>

          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="director">
              {tabKey === "director" ? (
                <Director
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
              ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="vip">
              {tabKey === "vip" ? (
                <Vip
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
              ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="general-information">
              {tabKey === "general-information" ? (
                <GeneralInformation
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
              ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="destination-restriction">
              {tabKey === "destination-restriction" ? (
                <DestinationRestriction
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="preferred-hotel-chain">
              {tabKey === "preferred-hotel-chain" ? (
                <PreferredHotelChain
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="travel-policy-document">
              {tabKey === "travel-policy-document" ? (
                <TravelPolicyDocument
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ): null} 
            </Tab.Pane>
            <Tab.Pane eventKey="miscellaneous-configuration">
              {tabKey === "miscellaneous-configuration" ? (
                <MiscellaneousConfiguration
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ) : null}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-side">
          <Nav.Item>
              <div className="nav-header">
                <span>GLOBAL SETTINGS</span>
              </div>
            </Nav.Item> 

            <Nav.Item>
              <Nav.Link eventKey="destination-restriction">
                <div>
                  <ReactSVG src="/img/icons/corporate-destination-restriction.svg" />
                  <span>Destination Restrictions</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="preferred-hotel-chain">
                <div>
                  <ReactSVG src="/img/icons/corporate-preferred-hotel.svg" />
                  <span>Preferred Hotel Chains</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="miscellaneous-configuration">
                <div>
                  <ReactSVG src="/img/icons/corporate-miscellaneous.svg" />
                  <span>Miscellaneous configurations</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="travel-policy-document">
                <div>
                  <ReactSVG src="/img/icons/corporate-travel-policy.svg" />
                  <span>Travel Policy Document</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
          <Tab.Pane eventKey="staff-and-manager">
              {tabKey === "staff-and-manager" ? (
                <StaffAndManager 
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ): null} 
            </Tab.Pane>

            <Tab.Pane eventKey="general-information">
              {tabKey === "general-information" ? (
                <GeneralInformation
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
            <Tab.Pane eventKey="travel-advice">
              {tabKey === "travel-advice" ? (
                <TravelAdvice
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
              ) : null}
            </Tab.Pane>
            <Tab.Pane eventKey="email">
              {tabKey === "email" ? (
                <DivisionCorporate
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ): null} 
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    
  )
}

export default withRouter(TravelPolicy)
