import React, { useState } from 'react'
import { Tab, Tabs, Form, Accordion, Card, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import AutoSuggest from "react-autosuggest";
import DatePicker from 'react-datepicker'

import TimeSlider from './time_slider'



const FlightBook = (props) => {
  const [flightType, setFlightType] = useState("roundtrip")
  const [departureValue, setDepartureValue] = useState("");
  const [arrivalValue, setArrivalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [departTime, setDepartTime] = useState(new Date())
  const [returnTime, setReturnTime] = useState(new Date())

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

  function getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : airports.filter(airport =>
      airport.name.toLowerCase().slice(0, inputLength) === inputValue ||
      airport.city.toLowerCase().slice(0, inputLength) === inputValue 
    )

    // return airports.filter(airport =>
    //   airport.name.includes(value.trim()) || airport.city.includes(value.trim())
    // );
  }
  
  function renderSuggestion(suggestion, {query}) {
    return (
      <div className={`d-flex ${suggestion.all ? "" : "ml-2"}`}>
        <div className="mr-auto">
          <div>{suggestion.name}</div>
          <div style={{fontSize: 12, color: "#aaa"}}>
            {suggestion.all ? suggestion.all :`${suggestion.city}, ${suggestion.country}`}
          </div>
        </div>
        <div>
          {suggestion.code}
        </div>
      </div>
    )
  }

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
          {/* start of first row */}
          <div className='d-flex'>
            <div className='d-flex mr-4'>
              <div>
                <label htmlFor="departure" className='form-with-label__title'>FROM</label>
                <AutoSuggest
                  suggestions={suggestions}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  onSuggestionsFetchRequested={({ value }) => {
                    console.log(value);
                    setDepartureValue(value);
                    setSuggestions(getSuggestions(value));
                  }}
                  onSuggestionSelected={(_, { suggestionValue }) =>
                    console.log("Selected: " + suggestionValue)
                  }
                  getSuggestionValue={suggestion => suggestion.name}
                  renderSuggestion={renderSuggestion}
                  inputProps={{
                    placeholder: "Departure city, airport",
                    value: departureValue,
                    onChange: (_, { newValue, method }) => {
                      setDepartureValue(newValue);
                    },
                  }}
                  highlightFirstSuggestion={true}
                />
              </div>
              <div> 
                <label htmlFor="arrival" className='form-with-label__title'>TO</label>
                <AutoSuggest
                  suggestions={suggestions}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  onSuggestionsFetchRequested={({ value }) => {
                    console.log(value);
                    setArrivalValue(value);
                    setSuggestions(getSuggestions(value));
                  }}
                  onSuggestionSelected={(_, { suggestionValue }) =>
                    console.log("Selected: " + suggestionValue)
                  }
                  getSuggestionValue={suggestion => suggestion.name}
                  renderSuggestion={suggestion => <span>{suggestion.name}</span>}
                  inputProps={{
                    placeholder: "Arrival city, airport",
                    value: arrivalValue,
                    onChange: (_, { newValue, method }) => {
                      setArrivalValue(newValue);
                    },
                  }}
                  highlightFirstSuggestion={true}
                />
              </div>
            </div>
            
            <div className='mr-4'>
              <div className='d-flex'>
                <div style={{width: 150}}>
                  <h4 className='form-with-label__title'> DEPART</h4>
                  <DatePicker
                    className='form-control rounded-0 form-with-label'
                    dateFormat="dd MMMM yyyy"
                    selected={departTime}
                    onChange={(date) => {
                      setDepartTime(date)
                    }}
                  />
                </div>
                <div style={{width: 150}}>
                  <h4 className='form-with-label__title'> RETURN</h4>
                  <DatePicker
                    className='form-control rounded-0 form-with-label'
                    dateFormat="dd MMMM yyyy"
                    selected={departTime}
                    onChange={(date) => {
                      setDepartTime(date)
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{width: 171}}>
              <h4 className='form-with-label__title'> TRAVELLERS</h4>
              <input type="text" className='form-control rounded-0 form-with-label' />
            </div>
          </div>
          {/* end of first row */}
          <div className='my-3'>
            <Form.Check label="Add a hotel" />
          </div>

          {/* start of accordion */}
          <div>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Flight Preferences
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <div className="row mb-5">
                      <div className="col-md-2">
                        Departing Preferences
                      </div>
                      <div className="col-md-4">
                        <h4 className='h6 mb-3'>DEPARTURE TIME (FROM - TO)</h4>
                        <TimeSlider />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-4">
                        <h4 className='h6 mb-3'>ARRIVAL TIME (FROM - TO)</h4>
                        <TimeSlider />
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2">
                        Returning Preferences
                      </div>
                      <div className="col-md-4">
                        <h4 className='h6 mb-3'>DEPARTURE TIME (FROM - TO)</h4>
                        <TimeSlider />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-4">
                        <h4 className='h6 mb-3'>ARRIVAL TIME (FROM - TO)</h4>
                        <TimeSlider />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        Specify Carrier 
                      </div>
                      <div className="col-md-4">

                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-4">

                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Tab>
        <Tab
          eventKey="one-way"
          title="One Way"
        >
          Hello One Way
        </Tab>
        <Tab
          eventKey="multi-city"
          title="Multi City"
        >
          Hello Multi City
        </Tab>
      </Tabs>
    </div>
    
  )
}

export default FlightBook