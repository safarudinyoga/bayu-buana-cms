import { withRouter, useHistory } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter} from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import PartnerPaymentGateway from "./partner_payment_gateway/table"
import PartnerMealPlans from "./partner_meal_plans/table"
import PartnertMessages from "./partner_messages/table"
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import PartnerCabin from "../../integration_partner_cabin/tabel"
import PartnerInformation from "./partner-information"


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
  const [Data, setData] = useState(null)
  

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
            text: "integration Partner",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if (formId) {
        let { data } = await api.get(endpoint + "/" + formId)
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
                  <Nav.Item>
                    <Nav.Link eventKey="partner-credential">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Credential</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-corporates">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Corporates</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                  <Nav.Link href={`/master/integration-partner-cabin-types`}>
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner Cabins</span>
                      </div>
                    </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="partner-meal-plans">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Meal Plans</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-fee-taxes">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Fee Taxes</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-messages">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Messages</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  
                  {/* <Nav.Link href={`/master/integration-partner-cities/${formId}/cities`}>
                    <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner City</span>
                      </div>
                    </Nav.Link> */}
                   
                  
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="partner-information">
                    <PartnerInformation />
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-cabins">
                    <PartnerCabin />
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-credential">
                    Partner Credential
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-corporates">
                    Partner Corporates
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-meal-plans">
                    Partner Meal Plans
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-fee-taxes">
                    Partner Fee Taxes
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-messages">
                    Partner Messages
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
       
      
    </>
    
  );
}

export default withRouter(IntegrationPartnerForm)
