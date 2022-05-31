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
    <div className="card book-card">

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
              {key == "flight" ? <ReactSVG className="tabs-icon" src="/img/icons/plane-active.svg" /> : <ReactSVG className="tabs-icon" src="/img/icons/plane-inactive.svg" /> }
              
              <span className="ml-md-2 tabs-text">FLIGHT</span>
            </div>
          }
        >
          <FlightBookSuggest personalTrip={props.personalTrip} />
        </TabPane>
        <TabPane
          className="m-3"
          eventKey="hotel"
          title={
            <div className="d-md-flex flex-row">
              {key == "hotel" ? <ReactSVG className="tabs-icon" src="/img/icons/hotel-active.svg" /> : <ReactSVG className="tabs-icon" src="/img/icons/hotel-inactive.svg" />}
              
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
              <ReactSVG className="tabs-icon" src="/img/icons/flighthotel.svg" />
              <span className="ml-md-2 tabs-text">FLIGHT+HOTEL</span>
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