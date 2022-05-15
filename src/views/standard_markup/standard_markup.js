import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Tabs, TabPane, Row } from "react-bootstrap"
import FlightTable from "./table/flight_table"
import HotelTable from "./table/hotel_table"
import OtherTable from "./table/other_table"
import infoIcon from "assets/icons/information.svg"
import { ReactSVG } from "react-svg"

const ControlledTabs = () => {
  const [key, setKey] = useState("flight")

  return (
    <Tabs
      id="standard-markup"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-4"
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <TabPane
        className="m-3"
        eventKey="flight"
        title={
          <div className="d-md-flex flex-row bd-highlight">
            <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
            <span className="ml-md-2 tabs-text">FLIGHT</span>
          </div>
        }
      >
        <FlightTable />
      </TabPane>
      <TabPane
        className="m-3"
        eventKey="hotel"
        title={
          <div className="d-md-flex flex-row">
            <ReactSVG className="tabs-icon" src="/img/icons/tabs/hotel.svg" />
            <span className="ml-md-2 tabs-text">HOTEL</span>
          </div>
        }
      >
        <HotelTable />
      </TabPane>
      <TabPane
        className="m-3"
        eventKey="other"
        title={
          <div className="d-md-flex flex-row">
            <ReactSVG className="tabs-icon" src="/img/icons/tabs/other.svg" />
            <span className="ml-md-2 tabs-text">OTHER</span>
          </div>
        }
      >
        <OtherTable />
      </TabPane>
    </Tabs>
  )
}
export default function HotelBrandTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    ;<ControlledTabs />
    dispatch(
      setUIParams({
        title: "Standard Mark-Up",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Standard Mark-Up",
          },
        ],
      }),
    )
  }, [])

  return <ControlledTabs />
}
