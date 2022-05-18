import React, { useState } from 'react'
import AutoSuggest from "react-autosuggest";
import { ReactSVG } from "react-svg"

function Routes(props) {
  const { airports } = props

  const [departureValue, setDepartureValue] = useState("");
  const [arrivalValue, setArrivalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <>
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
    </>
  )
}

export default Routes