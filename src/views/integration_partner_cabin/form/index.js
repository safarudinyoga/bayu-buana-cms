import { Row, Col, Tab, Nav } from "react-bootstrap"
import { ReactSVG } from "react-svg"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import Tabel from "./form"


const backUrl = "/master/integration-partner"

export default function IntegrationPartnerCabinTypesTable() {
  const [tabKey, setTabKey] = useState("partner-cabin")
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Sabre",
        breadcrumbs: [
          {
            text: "Setup and Configuration",
          },
          {
            link: backUrl,
            text: "Intergration Partner",
          },
          {
            text: "Sabre",
          },
        ],
      }),
    )
  }, [])

 
  return <>
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col >
          <Nav variant="pills" className="flex-column nav-side">
            <Nav.Item>
              <Nav.Link href="/master/integration-partner/form/:id?">
                <div>
                  <ReactSVG src="/img/icons/general-information.svg" />
                  <span>Partner Information</span>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="partner-credential">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Credential</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-corporates">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Corporates</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-cabin">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Cabins</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-meal-plan">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Meal Plans</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-fee-taxes">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Fee Taxes</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="partner-messages">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Partner Messages</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="partner-cabin">
              <Tabel />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>

    </Tab.Container>
  </>


}
