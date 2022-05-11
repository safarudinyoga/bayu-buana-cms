import React, { useState } from 'react'
import AutoSuggest from "react-autosuggest";
// import DatePicker from 'react-datepicker'
import DatePicker from 'react-multi-date-picker'
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import Select from 'components/form/select';

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
  const [travelerCheckbox, setTravelerCheckbox] = useState(false)
  const [travelerCheckboxConfirm, setTravelerCheckboxConfirm] = useState(false)

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

  function RenderDatepicker({ openCalendar, value, handleValueChange, title }){
    return (
      <div style={{width: 190}} className='position-relative'>
        <h4 className='form-with-label__title'> {title} <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
        <input type="text" 
          className='form-control rounded-0 form-with-label' 
          onFocus={openCalendar} 
          value={value} 
          onChange={handleValueChange}
          />
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
    setTravelerCheckboxConfirm(travelerCheckbox)
    document.body.click()
  }

  const popover = (
    <Popover id="passenger-popover" className='passenger-popover'>
      <Popover.Content>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>ADULTS</div>
          <div className='d-flex col-md-6'>
            <ReactSVG className='mr-2' src="/img/icons/minus-circle.svg" onClick={() => {
                if(adultCount === 0){
                  return;
                }
                setAdultCount(adultCount - 1)
              }} />
            <input className='text-right' value={adultCount} style={{width: 40}} onChange={onChangeAdult}></input>
            <ReactSVG className='ml-2' src="/img/icons/plus-circle.svg" onClick={() => setAdultCount(adultCount + 1)} />
          </div>
        </div>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>CHILDREN</div>
          <div className='d-flex col-md-6'>
            <ReactSVG
             className='mr-2'
             src="/img/icons/minus-circle.svg" 
             onClick={() => {
                if(childrenCount === 0){
                  return;
                }
                setChildrenCount(childrenCount - 1)
              }}
             />
            <input className='text-right' value={childrenCount} style={{width: 40}} onChange={onChangeChildren}></input>
            <ReactSVG className='ml-2' src="/img/icons/plus-circle.svg" onClick={() => setChildrenCount(childrenCount + 1)} />
          </div>
          {
            childrenCount > 0 ? (
              <div className="d-flex col-md-12">
                <Select />
              </div>
            ): ""
          }
          
        </div>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>INFANTS</div>
          <div className='d-flex col-md-6'>
            <ReactSVG 
              className='mr-2'
              src="/img/icons/minus-circle.svg"
              onClick={() => {
                if(infantCount === 0){
                  return;
                }
                setInfantCount(infantCount - 1)
              }}
              />
            <input className='text-right' value={infantCount} style={{width: 40}} onChange={onChangeInfant}></input>
            <ReactSVG className='ml-2' src="/img/icons/plus-circle.svg" onClick={() => setInfantCount(infantCount + 1)} />
          </div>
          {
            infantCount > 0 ? (
              <div className="d-flex col-md-12">
                <Select />
              </div>
            ): ""
          }
        </div>
        <Form.Check 
          label="SELECT TRAVELERS"
          onChange={() => setTravelerCheckbox(!travelerCheckbox)} 
          checked={travelerCheckbox}
        />
        <Button onClick={onTravelerClick} className='mt-3 w-100'>DONE</Button>
      </Popover.Content>
    </Popover>
  )

  return (
    <>
      <div className='d-flex'>
        <div className='d-flex mr-4'>
          <div className='form-group required position-relative'>
            <label htmlFor="departure" className='form-with-label__title'>FROM <span className='label-required'></span></label>
            <ReactSVG src='/img/icons/flight-takeoff.svg' className='form-with-label__suggest-icon'/>
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
          <div className='form-group required position-relative'> 
            <label htmlFor="arrival" className='form-with-label__title'>TO <span className='label-required'></span></label>
            <ReactSVG src='/img/icons/flight-land.svg' className='form-with-label__suggest-icon'/>
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
            <div style={{width: 173}} className="position-relative flex-grow-1 mr-3">
              <DatePicker 
                render={<RenderDatepicker title={"DEPART"} />}
                numberOfMonths={2}
                fixMainPosition={true}
                format="ddd, DD MMMM YYYY"
                value={departTime}
                onChange={(date) => {
                  setDepartTime(date)
                }}
                portal
              />
              {/* <h4 className='form-with-label__title'> DEPART <span className='label-required'></span></h4>
              <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
              <DatePicker
                className='form-control rounded-0 form-with-label'
                dateFormat="dd MMMM yyyy"
                selected={departTime}
                monthsShown={2}
                onChange={(date) => {
                  setDepartTime(date)
                }}
              /> */}
            </div>
            <div style={{width: 173}} className="position-relative flex-grow-1 mr-3">
              <DatePicker 
                render={<RenderDatepicker title={"RETURN"} />}
                numberOfMonths={2}
                fixMainPosition={true}
                format="ddd, DD MMMM YYYY"
                value={returnTime}
                onChange={(date) => {
                  setReturnTime(date)
                }}
                portal
              />
              {/* <h4 className='form-with-label__title'> RETURN <span className='label-required'></span></h4>
              <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
              <DatePicker
                className='form-control rounded-0 form-with-label'
                // inline
                dateFormat="dd MMMM yyyy"
                selected={returnTime}
                monthsShown={2}
                onChange={(date) => {
                  setReturnTime(date)
                }}
              /> */}
            </div>
          </div>
        </div>
        <div style={{width: 171}} className="position-relative">
          <h4 className='form-with-label__title'> TRAVELLERS <span className='label-required'></span></h4>
          <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' style={{bottom: 15}}/>
          <OverlayTrigger trigger="click" placement='bottom' overlay={popover} rootClose={true}>
            <input type="text" className='form-control rounded-0 form-with-label' value={travelerValue} />
          </OverlayTrigger>
        </div>
      </div>
      {/* end of first row */}
      {
        /* if traveler checkbox is checked */
        travelerCheckboxConfirm ? (
          <div>
            <div className="row my-2">
              <div className="col-md-2">
                Traveler 1
              </div>
              <div className='col-md-6'>
                <Select />
              </div>
            </div>
          </div>
        ) : ""
      }
      <div className='my-3 ml-2'>
        <Form.Check label="Add a hotel" />
      </div>
    </>
  )
}

export default Roundtrip