import { ErrorMessage, Field, getIn } from 'formik';
import React, { useEffect, useState } from 'react'
import AutoSuggest from "react-autosuggest";
import { ReactSVG } from "react-svg"

function Routes(props) {
  const { airports, smallSize } = props

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
    console.log("render suggest",suggestion)
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

  useEffect(() => {
    console.log(departureValue)
    if((departureValue == "" || departureValue == null) && props.formik ){
      console.log("KOSONG INI")
      props.formik.setFieldValue(`trips[${props.index}].departure_data`, "")
    }
  }, [departureValue])
  
  useEffect(() => {
    // console.log(props.formik.errors)
    console.log(getIn(props.formik.errors), "Errors")
  }, [props.formik])
  
  

  return (
    <>
      <div className={`d-flex ${smallSize ? "mr-2" : "mr-4"}`}>
        {/* <Field name={props.formik && props.index >= 0 ? `trips[${props.index}].departure_data` : } */}
        <div className={`form-group required position-relative departure-box mb-4 ${smallSize ? "routes-sm" : ""}`} >
          <label htmlFor="departure" className='form-with-label__title'>FROM <span className='label-required'></span></label>
          <ReactSVG src='/img/icons/flight-takeoff.svg' className='form-with-label__suggest-icon'/>
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionsFetchRequested={({ value }) => {
              setDepartureValue(value);
              setSuggestions(getSuggestions(airports,value));
            }}
            onSuggestionSelected={(_, { suggestion, suggestionValue }) => {
              console.log("Selected",suggestion)
              console.log("PROPS FORMIK", props.formik)

              if(props.formik && props.index >= 0){
                props.formik.setFieldValue(`trips[${props.index}].departure_data`, suggestion)
              }

              else if(props.formik){
                props.formik.setFieldValue("departure_data", suggestion)
              }

              if(props.handleCriteriaChange) {
                props.handleCriteriaChange("origin_airport_id", suggestion.airport_id, "origin_city_id", suggestion.city_id)
              }
              
              
            }
              
            }
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Departure city, airport",
              value: departureValue,
              onChange: (_, { newValue, method }) => {
                setDepartureValue(newValue);
              },
              id: props.index ? `departure_data-${props.index}` : "departure_data",
              name: props.index ? `departure_data-${props.index}` :"departure_data"
            }}
            highlightFirstSuggestion={true}
          />
          {/* tampilan untuk error departure data non multitrip START */}
          {props.formik && props.formik.errors.departure_data && (
            <div className='routes-invalid'>
              {props.formik.touched.departure_data ? props.formik.errors.departure_data : null}
            </div>
          )}
          {/* tampilan untuk error departure data non multitrip END */}
          {/* tampilan untuk error departure data multitrip START */}
          {
            props.formik &&
            props.formik.errors &&
            props.formik.errors.trips &&
            props.formik.errors.trips[props.index] &&
            props.formik.errors.trips[props.index].departure_data ? (
              <div className='routes-invalid'>
                {
                props.formik.touched.trips && 
                props.formik.touched.trips[props.index] &&
                props.formik.touched.trips[props.index].departure_data 
                  ? 
                  props.formik.errors.trips[props.index].departure_data : null}
              </div>
            ) : null
          }
          {/* tampilan untuk error departure data multitrip END */}
        </div>
        <div className={`form-group required position-relative arrival-box mb-4 ${smallSize ? "routes-sm" : ""}`} > 
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
            onSuggestionSelected={(_, { suggestion, suggestionValue }) => {
              console.log("Return Selected: ",suggestion)
              if(props.formik && props.index >= 0){
                props.formik.setFieldValue(`trips[${props.index}].arrival_data`, suggestion)
              }
              
              else if(props.formik){
                props.formik.setFieldValue("arrival_data", suggestion)
              }
              if(props.handleCriteriaChange) {
                props.handleCriteriaChange("destination_airport_id", suggestion.airport_id, "destination_city_id", suggestion.city_id)
              }
              
            }
              
            }
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Arrival city, airport",
              value: arrivalValue,
              onChange: (_, { newValue, method }) => {
                setArrivalValue(newValue);
              },
              id: "arrival_data",
              name: "arrival_data"
            }}
            highlightFirstSuggestion={true}
          />
          {/* tampilan untuk error arrival data non multitrip START */}
          {props.formik.errors.arrival_data && (
            <div className='routes-invalid'>
              {props.formik.touched.arrival_data ? props.formik.errors.arrival_data : null}
            </div>
          )}
          {/* tampilan untuk error arrival data non multitrip END */}

          {/* tampilan untuk error arrival data multitrip START */}
          {
            props.formik.errors.trips &&
            props.formik.errors.trips[props.index] &&
            props.formik.errors.trips[props.index].arrival_data ? (
              <div className='routes-invalid'>
                {props.formik.touched.trips && 
                props.formik.touched.trips[props.index] &&
                props.formik.touched.trips[props.index].arrival_data ? props.formik.errors.trips[props.index].arrival_data : null}
              </div>
            ) : null
          }
          {/* tampilan untuk error arrival data multitrip END */}
        </div>
      </div>
    </>
  )
}

export default Routes