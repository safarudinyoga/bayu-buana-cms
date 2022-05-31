import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Form, Accordion, Card, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import { useHistory } from 'react-router';

import Roundtrip from './micro-components/roundtrip';
import Oneway from './micro-components/oneway';
import FlightPref from './micro-components/flight_pref';
import MultiTrip from './micro-components/multi_trip';



const FlightBook = (props) => {
  const history = useHistory()
  const [flightType, setFlightType] = useState("roundtrip")
  const [roundtripData, setRoundtripData] = useState({
    trip_type_code: "roundtrip"
  })
  const [onewayData, setOnewayData] = useState({
    trip_type_code: "oneway"
  })

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
    {
      name: "Singapore, Singapore",
      city: "Singapore",
      code: "SIN",
      all: "All Airports"
    },
    { 
      name: "Singapore Changi Airport",
      city: "Singapore",
      country: "Singapore",
      code: "SIN",
      city_code: "SIN",
    },
  ]

  const handleSearch = () => {

    history.push("/extranet/book-trip/book-flight")
  }

  const handleRoundtrip = (key, value) => {
    let roundtrip = {...roundtripData}
    roundtrip[key] = value
    setRoundtripData(roundtrip)
  }

  useEffect(() => {
    console.log(roundtripData)
  }, [roundtripData])
  

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
          <Roundtrip handleRoundtrip={handleRoundtrip} airports={airports} />
          <FlightPref />

          <div className='my-3'>
            <Button className='text-uppercase btn-extranet' type="button" onClick={handleSearch}>Search</Button>
          </div>
          <div className="recent-search">
            <span className='text-uppercase recent-flight-title ml-2'>Recent Flight Searches</span>
            <span className='ml-4 recent-flight-title recent-flight-clear-all'>Clear all</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="one-way"
          title="One Way"
        >
          <Oneway airports={airports} />
          <div className='my-3'>
            <Form.Check label="Add a hotel" />
          </div>
          <FlightPref />

          <div className='my-3'>
            <Button className='text-uppercase btn-extranet' type="button" onClick={() => history.push("/extranet/book-trip/book-flight")}>Search</Button>
          </div>
          <div className="recent-search">
            <span className='text-uppercase recent-flight-title ml-2'>Recent Flight Searches</span>
            <span className='ml-4 recent-flight-title recent-flight-clear-all'>Clear all</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="multi-city"
          title="Multi City"
        >
          <MultiTrip airports={airports} />
          <FlightPref />

          <div className='my-3'>
            <Button className='text-uppercase btn-extranet' type="button" onClick={() => history.push("/extranet/book-trip/book-flight")}>Search</Button>
          </div>
          <div className="recent-search">
            <span className='text-uppercase recent-flight-title ml-2'>Recent Flight Searches</span>
            <span className='ml-4 recent-flight-title recent-flight-clear-all'>Clear all</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    
  )
}

export default FlightBook