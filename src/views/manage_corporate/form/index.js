import { withRouter } from "react-router"
import React from 'react'
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { ReactSVG } from "react-svg"

const ManageCorporateForm = (props) => {
  let dispatch = useDispatch()
  return (
    <Tab.Container>
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
              <Nav.Link eventKey="employment">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Employment</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(ManageCorporateForm)
