import React, { useEffect, useState } from 'react'
import AutoSuggest from "react-autosuggest";
import { ReactSVG } from "react-svg"

const TripRoutes = (props) => {
  const { airports } = props

  const [departureValue, setDepartureValue] = useState("");
  const [arrivalValue, setArrivalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function getSuggestions(data, value) {
    console.log("get suggestion", value)
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : data.filter(airport =>
      airport.name.toLowerCase().slice(0, inputLength) === inputValue ||
      airport.city.toLowerCase().slice(0, inputLength) === inputValue ||
      airport.code.toLowerCase().slice(0, inputLength) === inputValue
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
    console.log("FROM TRIP ROUTES", props.flightData)
    if(props.flightData){
      let origin = `${props.flightData.cache_air_origin_destination_criteria.origin_city.city_name}, ${props.flightData.cache_air_origin_destination_criteria.origin_airport.airport_code}`
      let destination = `${props.flightData.cache_air_origin_destination_criteria.destination_city.city_name}, ${props.flightData.cache_air_origin_destination_criteria.destination_airport.airport_code}`
      setDepartureValue(origin)
      setArrivalValue(destination)

      if(props.formik){
        let originValue = {
          airport_id: props.flightData.cache_air_origin_destination_criteria.origin_airport.id,
          city: props.flightData.cache_air_origin_destination_criteria.origin_city.city_name,
          city_code: props.flightData.cache_air_origin_destination_criteria.origin_city.city_code,
          city_id: props.flightData.cache_air_origin_destination_criteria.origin_city.id,
          code: props.flightData.cache_air_origin_destination_criteria.origin_airport.airport_code,
          country: props.flightData.cache_air_origin_destination_criteria.origin_city.country_id,
          name: props.flightData.cache_air_origin_destination_criteria.origin_airport.airport_name
        }

        let destinationValue = {
          airport_id: props.flightData.cache_air_origin_destination_criteria.destination_airport.id,
          city: props.flightData.cache_air_origin_destination_criteria.destination_city.city_name,
          city_code: props.flightData.cache_air_origin_destination_criteria.destination_city.city_code,
          city_id: props.flightData.cache_air_origin_destination_criteria.destination_city.id,
          code: props.flightData.cache_air_origin_destination_criteria.destination_airport.airport_code,
          country: props.flightData.cache_air_origin_destination_criteria.destination_city.country_id,
          name: props.flightData.cache_air_origin_destination_criteria.destination_airport.airport_name
        }
        props.formik.setFieldValue("departure_data", originValue)
        props.formik.setFieldValue("arrival_data", destinationValue)
      }
    }
  }, [props.flightData])

  useEffect(() => {
    console.log("Flight DAta",props.formik.values)
  }, [props.formik.values])
  
  
  

  return (
    <>
      <div className='d-flex mr-2'>
        <div className="form-group required position-relative departure-box mb-4 routes-sm">
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
              console.log("Suggestion selected", suggestion)
              if(props.formik && props.index >= 0){
                props.formik.setFieldValue(`trips[${props.index}].departure_data`, suggestion)
              }

              else if(props.formik){
                props.formik.setFieldValue("departure_data", suggestion)
              }
            }}
            getSuggestionValue={suggestion => `${suggestion.city}, ${suggestion.code}`}
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
        <div className="form-group required position-relative departure-box mb-4 routes-sm">
          <label htmlFor="arrival" className='form-with-label__title'>TO <span className='label-required'></span></label>
          <ReactSVG src='/img/icons/flight-land.svg' className='form-with-label__suggest-icon'/>
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionsFetchRequested={({ value }) => {
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
            }
              
            }
            getSuggestionValue={suggestion => `${suggestion.city}, ${suggestion.code}`}
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

export default TripRoutes