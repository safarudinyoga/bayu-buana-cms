import React, { useState } from 'react'
import { Tab, Tabs, Form, Accordion, Card, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"

import Roundtrip from './micro-components/roundtrip';
import Oneway from './micro-components/oneway';
import FlightPref from './micro-components/flight_pref';



const FlightBook = (props) => {
  const [flightType, setFlightType] = useState("roundtrip")

  const airports = [
    {
      name: "Jakarta, Indonesia",
      city: "Jakarta",
      code: "JKT",
      all: "All Airports"
    },
    { 
      name: "Soekarno-Hatta Intl",
      city: "Jakarta",
      country: "Indonesia",
      code: "CGK",
      city_code: "JKT",
    },
    { 
      name: "Halim Perdana Kusuma",
      city: "Jakarta",
      country: "Indonesia",
      code: "HLP",
      city_code: "JKT",
    },
  ]

  return (
    <div>
      <Tabs
        id='flight-book-tabs'
        activeKey={flightType}
        onSelect={(k) => setFlightType(k)}
        className={`mb-4 flight-book-tabs`}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab
          eventKey="roundtrip"
          title="Roundtrip"
        >
          <Roundtrip airports={airports} />
          <FlightPref />

          <div className='my-3'>
            <Button>Search</Button>
          </div>
          <div className="recent-search">
            <span className='text-uppercase'>Recent Flight Searches</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <span className='ml-1 mr-2'>X</span>
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <span className='ml-1 mr-2'>X</span>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="one-way"
          title="One Way"
        >
          <Oneway airports={airports} />
          <FlightPref />

          <div className='my-3'>
            <Button>Search</Button>
          </div>
          <div className="recent-search">
            <span className='text-uppercase'>Recent Flight Searches</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <span className='ml-1 mr-2'>X</span>
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <span className='ml-1 mr-2'>X</span>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="multi-city"
          title="Multi City"
        >
          <Oneway airports={airports} />
          <FlightPref />

          <div className='my-3'>
            <Button>Search</Button>
          </div>
          <div className="recent-search">
            <span className='text-uppercase'>Recent Flight Searches</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <span className='ml-1 mr-2'>X</span>
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <span className='ml-1 mr-2'>X</span>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    
  )
}

export default FlightBook