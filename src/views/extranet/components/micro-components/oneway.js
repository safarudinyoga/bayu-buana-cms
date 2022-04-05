import React, { useState } from 'react'
import AutoSuggest from "react-autosuggest";
import DatePicker from 'react-datepicker'
import { Form } from 'react-bootstrap'

const Oneway = (props) => {
  const { airports } = props

  const [departureValue, setDepartureValue] = useState("");
  const [arrivalValue, setArrivalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [departTime, setDepartTime] = useState(new Date())

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
    </>
  )
}

export default Oneway