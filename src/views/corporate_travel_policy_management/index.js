import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav, Form, Button } from "react-bootstrap"
import { setUIParams, setAlert, setCreateModal } from "redux/ui-store"
import DestinationRestriction from "./destination_restriction"
import TravelPolicyDocument from "./travel-policy-document"
import MiscellaneousConfiguration from "./miscellaneous_configuration"
import StaffAndManager from "./staff-and-manager";
import Director from "./director";
import Vip from "./vip";
import PreferredHotelChain from "./preferred-hotel-chain";
import BBModal from "components/Modal/bb-modal";
import CancelButton from "components/button/cancel";
import TravelPolicyClass from "./components/travel-policy-modal-content";
import * as Yup from "yup";
import Api from "config/api";
import "./style.scss"

// const endpoint = "/user/profile"
const backUrl = "/master/general-setup"

const TravelPolicy = (props) => {
  let dispatch = useDispatch()
  const API = new Api()
  const isView = props.isView
  const [id, setId] = useState(null)
  const [tabKey, setTabKey] = useState("staff-and-manager")
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [formValues, setFormValues] = useState(null)

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

  const TravelPolicyClassModal = () => {
    return (
      <BBModal 
        show={showCreateNew}
        modalSize={"md"}
        onClick={() => setShowCreateNew(false)}
        modalTitle={"CREATE TRAVEL POLICY CLASS"}
        modalContent={() => (
          <TravelPolicyClass />
        )}
      />
    )
  }
  const initialValues = {
    travel_policy_class_code: "",
    travel_policy_class_name: "",
  }
  const formSize = {
    label: {
      md: 5,
      lg: 5,
    },
    value: {
      md: 7,
      lg: 7,
    }
  }
  const checkTravelCode = async (to_currency_id, from_currency_id) => {
    let filter = encodeURIComponent(JSON.stringify([["to_currency_id","=",to_currency_id], ["AND"], ["from_currency_id", "=", from_currency_id]]))
    let res = await API.get(`/master/currency-conversions?filters=${filter}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if(!sameId) return res.data.items.length === 0 

    return true
  }
  const validationSchema = Yup.object().shape({
    travel_policy_class_code: Yup.object()
      .required("Travel Policy Class Name is required")
      ,
    travel_policy_class_name: Yup.object()
    .required("Travel Policy Class Name is required")
  })

  // const onSubmit = async (values) => {
  //   try {
  //     let form = {
  //       travel_policy_class_code: values.travel_policy_class_code,
  //       travel_policy_class_name: values.travel_policy_class_name,
  //     }
  //     let res = await API.post("/master/travel-policy-classes", values)
  //     setShowCreateNew(false)
  //     dispatch(
  //       setAlert({
  //         message: `Record ${form.travel_policy_class_name} has been successfully saved.`
  //       })
  //     )
  //   } catch(e) {
  //     dispatch(
  //       setAlert({
  //         message: "Failed to save this record.",
  //       }),
  //     )
  //   }
  // }

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
            <div className="create-new-btn" onClick={() => setShowCreateNew(true)}>
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
            <Tab.Pane eventKey="staff-and-manager">
              {tabKey === "staff-and-manager" ? (
                <StaffAndManager 
                  history={props.history}
                  backUrl={backUrl}
                  handleSelectTab={(v) => handleSelectTab(v)}
                />
                ): null} 
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
      </Row>
      <TravelPolicyClassModal />
    </Tab.Container>
    
  )
}

export default withRouter(TravelPolicy)
