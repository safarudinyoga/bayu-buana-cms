import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Tabs, TabPane, Row } from "react-bootstrap"
import FlightTable from "./table/flight_table"
import HotelTable from "./table/hotel_table"
import OtherTable from "./table/other_table"
import infoIcon from "assets/icons/information.svg"
import { ReactSVG } from "react-svg"
import "../../styles/components/_tabs_horisontal.scss"

const ControlledTabs = () => {
  const [key, setKey] = useState("flight")
  return (
    <Tabs
      id="standard-markup"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-4"
      mountOnEnter={true}
    >
      <TabPane
        className="m-3"
        eventKey="flight"
        title={
          <Row>
            <ReactSVG src="/img/icons/tabs/plane.svg" />
            <span className="ml-2">Flight</span>
          </Row>
        }
      >
        <FlightTable />
      </TabPane>
      <TabPane
        className="m-3"
        eventKey="hotel"
        title={
          <Row>
            <ReactSVG src="/img/icons/tabs/hotel.svg" />
            <span className="ml-2">Hotel</span>
          </Row>
        }
      >
        <HotelTable />
      </TabPane>
      <TabPane
        className="m-3"
        eventKey="other"
        title={
          <Row>
            <ReactSVG src="/img/icons/tabs/other.svg" />
            <span className="ml-2">Other</span>
          </Row>
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
