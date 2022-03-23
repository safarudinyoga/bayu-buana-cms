import React, { useEffect, useState } from "react"
import { withRouter } from "react-router"
import Api from "config/api"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

import GeneralInformation from "./general-information"
import RoomType from "./room_type/table"
import HotelFacilities from "./hotel-facilities"
import Media from "./media"
import NearbyAttractions from "./nearby-attractions"
import PointofReferences from "./point-of-references"

import "./style.scss"

const endpoint = "/master/hotel-profile-management"
const backUrl = "/master/hotel-profile-management"

const EmployeeForm = (props) => {
  let dispatch = useDispatch()

  let api = new Api()

  const tabKeyGeneralInformation = "general-information"
  const tabKeyRoomType = "room-type"
  const tabKeyHotelFacilities = "hotel-facilities"
  const tabKeyMedia = "media"
  const tabKeyNearbyAttractions = "nearby-attractions"
  const tabKeyPointOfReferences = "point-of-references"

  const [tabKey, setTabKey] = useState(tabKeyGeneralInformation)
  const [selectJobTitle, setSelectJobTitle] = useState([])
  const [selectDivision, setSelectDivision] = useState([])
  const [selectBranchOffice, setSelectBranchOffice] = useState([])

  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    aircraft_name: "",
    model: "",
    icao_code: "",
    aircraft_code: "",
  })

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Employee"
    if (!formId) {
      docTitle = "Create Hotel Profile"
    } else if (isView) {
      docTitle = "Employee Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Hotel Profile Management",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
      } catch (e) {}
      setLoading(false)
    }
  }, [])

  // Select tabs
  const handleSelectTab = async (key) => {
    setTabKey(key)

    switch (key) {
      case tabKeyGeneralInformation:
        props.history.push(`#${tabKeyGeneralInformation}`)
        break
      case tabKeyRoomType:
        props.history.push(`#${tabKeyRoomType}`)
        break
      case tabKeyHotelFacilities:
        props.history.push(`#${tabKeyHotelFacilities}`)
        break
      case tabKeyMedia:
        props.history.push(`#${tabKeyMedia}`)
        break
      case tabKeyNearbyAttractions:
        props.history.push(`#${tabKeyNearbyAttractions}`)
        break
      case tabKeyPointOfReferences:
        props.history.push(`#${tabKeyPointOfReferences}`)
        break
    }
  }

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    props.history.push(props.history.location.hash)
    setTabKey(props.history.location.hash.substr(1))
    setId(props.match.params.id)
  }, [props.match.params.id])

  return (
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-side">
            <Nav.Item>
              <Nav.Link eventKey={tabKeyGeneralInformation}>
                <div>
                  <ReactSVG src="/img/icons/general-information.svg" />
                  <span>General Information</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={tabKeyRoomType}>
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Room Type</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={tabKeyHotelFacilities}>
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Hotel Facilities</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={tabKeyMedia}>
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Media</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={tabKeyNearbyAttractions}>
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Nearby Attractions</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={tabKeyPointOfReferences}>
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Point of References</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey={tabKeyGeneralInformation}>
              <GeneralInformation
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={tabKeyRoomType}>
              <RoomType
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={tabKeyHotelFacilities}>
              <HotelFacilities
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={tabKeyMedia}>
              <Media
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={tabKeyNearbyAttractions}>
              <NearbyAttractions
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={tabKeyPointOfReferences}>
              <PointofReferences
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(EmployeeForm)
