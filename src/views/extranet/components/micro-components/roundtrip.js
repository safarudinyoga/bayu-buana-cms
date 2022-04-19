import React, { useState } from 'react'
import AutoSuggest from "react-autosuggest";
import DatePicker from 'react-datepicker'
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"

const Roundtrip = (props) => {
  const { airports } = props

  const [departureValue, setDepartureValue] = useState("");
  const [arrivalValue, setArrivalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [departTime, setDepartTime] = useState(new Date())
  const [returnTime, setReturnTime] = useState(new Date())

  const [adultCount, setAdultCount] = useState(0)
  const [childrenCount, setChildrenCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)

  const [travelerValue, setTravelerValue] = useState("")

  function getSuggestions(data, value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : data.filter(airport =>
      airport.name.toLowerCase().slice(0, inputLength) === inputValue ||
      airport.city.toLowerCase().slice(0, inputLength) === inputValue 
    )
  }
  
  function renderSuggestion(suggestion, {query}) {
    return (
      <div className={`d-flex ${suggestion.all ? "" : "ml-2"}`}>
        <div className="mr-auto">
          <div className='d-md-flex flex-row'>
            <ReactSVG className="tabs-icon" src="/img/icons/flight.svg" />
            <span className="ml-md-2">{suggestion.name}</span>
          </div>
          <div className="airport-suggestion-subtext" style={{fontSize: 12, color: "#aaa"}}>
            {suggestion.all ? suggestion.all :`${suggestion.city}, ${suggestion.country}`}
          </div>
        </div>
        <div>
          {suggestion.code}
        </div>
      </div>
    )
  }

  const regex = /^[0-9\b]+$/;
  const onChangeAdult = (e) => {
    if(e.target.value === '' || regex.test(e.target.value)){
      setAdultCount(e.target.value)
    }
  }
  const onChangeChildren = (e) => {
    if(e.target.value === '' || regex.test(e.target.value)){
      setChildrenCount(e.target.value)
    }
  }
  const onChangeInfant = (e) => {
    if(e.target.value === '' || regex.test(e.target.value)){
      setInfantCount(e.target.value)
    }
  }

  const onTravelerClick = (e) => {
    let valueText = `${adultCount > 0 ? adultCount+" Adults " : ""} ${childrenCount > 0 ? childrenCount+" Children ":""} ${infantCount > 0 ? infantCount+" Infants" : ""}`

    setTravelerValue(valueText)
    document.body.click()
  }

  const popover = (
    <Popover id="passenger-popover" className='passenger-popover'>
      <Popover.Content>
        <div className="d-flex row">
          <div className='col-md-4'>Adult</div>
          <div className='d-flex col-md-8'>
            <Button 
              className='mr-2' 
              onClick={() => {
                if(adultCount === 0){
                  return;
                }
                setAdultCount(adultCount - 1)
              }}
              >-
              </Button>
            <input className='text-right' value={adultCount} style={{width: 40}} onChange={onChangeAdult}></input>
            <Button className='ml-2' onClick={() => setAdultCount(adultCount + 1)} >+</Button>
          </div>
        </div>
        <div className="d-flex row">
          <div className='col-md-4'>Children</div>
          <div className='d-flex col-md-8'>
            <Button
             className='mr-2' 
             onClick={() => {
                if(childrenCount === 0){
                  return;
                }
                setChildrenCount(childrenCount - 1)
              }}
             >-</Button>
            <input className='text-right' value={childrenCount} style={{width: 40}} onChange={onChangeChildren}></input>
            <Button className='ml-2' onClick={() => setChildrenCount(childrenCount + 1)} >+</Button>
          </div>
        </div>
        <div className="d-flex row">
          <div className='col-md-4'>Infants</div>
          <div className='d-flex col-md-8'>
            <Button 
              className='mr-2'
              onClick={() => {
                if(infantCount === 0){
                  return;
                }
                setInfantCount(infantCount - 1)
              }}
              >-</Button>
            <input className='text-right' value={infantCount} style={{width: 40}} onChange={onChangeInfant}></input>
            <Button className='ml-2' onClick={() => setInfantCount(infantCount + 1)} >+</Button>
          </div>
        </div>
        <Form.Check label="SELECT TRAVELERS" />
        <Button onClick={onTravelerClick} className='mt-3 w-100'>DONE</Button>
      </Popover.Content>
    </Popover>
  )

  return (
    <>
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
                setSuggestions(getSuggestions(airports,value));
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
                setSuggestions(getSuggestions(airports,value));
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
                selected={returnTime}
                onChange={(date) => {
                  setReturnTime(date)
                }}
              />
            </div>
          </div>
        </div>
        <div style={{width: 171}}>
          <h4 className='form-with-label__title'> TRAVELLERS</h4>
          <OverlayTrigger trigger="click" placement='bottom' overlay={popover} rootClose={true}>
            <input type="text" className='form-control rounded-0 form-with-label' value={travelerValue} />
          </OverlayTrigger>
        </div>
      </div>
      {/* end of first row */}
      <div className='my-3'>
        <Form.Check label="Add a hotel" />
      </div>
    </>
  )
}

export default Roundtrip