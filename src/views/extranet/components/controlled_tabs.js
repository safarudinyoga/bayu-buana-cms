import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Tabs, TabPane, Row } from "react-bootstrap"
import infoIcon from "assets/icons/information.svg"
import { ReactSVG } from "react-svg"
import FlightBookSelect from "./flight_book-react-select"
import FlightBookSuggest from "./flight_book-autosuggest"
import "./flight_book.css"

const ControlledTabs = (props) => {
  const [key, setKey] = useState("flight")

  return (
    <div className="card">

      <Tabs
        id={props.id}
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className={`mb-2`}
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
          <FlightBookSelect />
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
          Hello Hotel
        </TabPane>
        <TabPane
          className="m-3"
          eventKey="other"
          title={
            <div className="d-md-flex flex-row">
              <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
              <ReactSVG className="ml-md-1 tabs-icon" src="/img/icons/tabs/hotel.svg" />
              <span className="ml-md-2 tabs-text">FLIGHT + HOTEL</span>
            </div>
          }
        >
          Hello Flight+Hotel
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ControlledTabs