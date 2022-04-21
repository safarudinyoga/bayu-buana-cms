import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav} from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"
import PartnerCabin from "../../integration_partner_cabin/tabel"
import PartnerInformation from "./partner-information"
import { useWindowSize } from "rooks"


const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"
const options = {
  position: "bottom-right",
}

const UserProfile = (props) => {
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  const dispatch = useDispatch()
  const api = new Api()
  const isView = useQuery().get("action") === "view"

  const [tabKey, setTabKey] = useState("partner-information")
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [Data, setData] = useState(null)
  const [finishStep, setStep] = useState(0)


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
      if(formId) {
        let {data} = await api.get(endpoint + "/" + formId)
        setData(data)
        
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
    }
    finally{
      setLoading(false)
    }
  }, [])

  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

 

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
                    <Nav.Link eventKey="partner-credential" disabled={finishStep < 1 && !Data?.id} >
                      <div>
                        <ReactSVG src="/img/icons/emergency-contacts.svg" />
                        <span>Partner Credential</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-corporates" disabled={finishStep < 2 && !Data?.id}>
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner Corporates</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-cabins" disabled={finishStep < 3 && !Data?.id}>
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner Cabins</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="parrtner-meal-plans" disabled={finishStep < 4 && !Data?.id}>
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner Meals plans</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-free-tax" disabled={finishStep < 5 && !Data?.id}>
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner Free Taxes</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-messages" disabled={finishStep < 6 && !Data?.id}>
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
                  <Tab.Pane eventKey="partner-information">
                    <PartnerInformation />
                  </Tab.Pane>
                  <Tab.Pane eventKey="partner-cabins">
                    <PartnerCabin />
                  </Tab.Pane>
                  <Tab.Pane eventKey="employment">
                    tes
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
       
      
    </>
    
  );
}

export default withRouter(UserProfile);
