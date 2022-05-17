import { withRouter } from "react-router"
import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { ReactSVG } from "react-svg"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"

// components & styles
import GeneralInformation from './general-information'
import CorporateFare from './corporate-fare'
import AncillaryFee from './ancillary-fee'
import CreditLimit from './credit-limit'

const staticWarding = {
  main: 'Corporate Management',
  mainSub: 'Manage Corporate',
  create: 'Create Corporate',
  edit: 'Edit Corporate',
  detail: 'Corporate Details',
  linkSub: '/master/manage-corporate'
}

const ManageCorporateForm = ({ match }) => {
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"

  // const [tabKey, setTabKey] = useState("general-information")
  const [tabKey, setTabKey] = useState("credit-limit")

  const wardingGenerator = (formId) => {
    if (!formId) {
      return staticWarding.create
    }

    if (formId && isView) {
      return staticWarding.detail
    }

    return staticWarding.edit
  }

  useEffect(() => {
    const { main, mainSub, linkSub } = staticWarding

    const formId = match?.props?.id
    dispatch(
      setUIParams({
        title: wardingGenerator(formId),
        breadcrumbs: [
          {
            text: main,
          },
          {
            link: linkSub,
            text: mainSub,
          },
          {
            text: wardingGenerator(formId),
          },
        ],
      }),
    )
  }, [])

  return (
    <Tab.Container activeKey={tabKey} onSelect={(key) => setTabKey(key)}>
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
              <Nav.Link eventKey="corporate-fare">
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Corporate Fare</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ancillary-fee">
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Ancillary Fee</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="credit-limit">
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Credit Limit</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="general-information">
              <GeneralInformation />
            </Tab.Pane>
            <Tab.Pane eventKey="corporate-fare">
              <CorporateFare />
            </Tab.Pane>
            <Tab.Pane eventKey="ancillary-fee">
              <AncillaryFee />
            </Tab.Pane>
            <Tab.Pane eventKey="credit-limit">
              <CreditLimit />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(ManageCorporateForm)
