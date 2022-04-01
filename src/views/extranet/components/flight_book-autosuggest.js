import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import AutoSuggest from "react-autosuggest";



const FlightBook = (props) => {
  const [flightType, setFlightType] = useState("roundtrip")
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const airports = [
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
    return airports.filter(airport =>
      airport.name.includes(value.trim())
    );
  }
  

  return (
    <div style={{height: 900}}>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          console.log(value);
          setValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestionValue }) =>
          console.log("Selected: " + suggestionValue)
        }
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={suggestion => <span>{suggestion.name}</span>}
        inputProps={{
          placeholder: "Type 'c'",
          value: value,
          onChange: (_, { newValue, method }) => {
            setValue(newValue);
          }
        }}
        highlightFirstSuggestion={true}
      />
    </div>
    // <div>
    //   <Tabs
    //     id='flight-book-tabs'
    //     activeKey={flightType}
    //     onSelect={(k) => setFlightType(k)}
    //     className={`mb-4 ${props.className}`}
    //     mountOnEnter={true}
    //     unmountOnExit={true}
    //   >
    //     <Tab
    //       eventKey="roundtrip"
    //       title="Roundtrip"
    //     >
    //       <div>
    //         <Autosuggest 
    //           suggestions={suggestions}
    //           onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    //           onSuggestionsClearRequested={onSuggestionsClearRequested}
    //           getSuggestionValue={getSuggestionValue}
    //           renderSuggestion={renderSuggestion}
    //           inputProps={inputProps}
    //         />
    //       </div>
    //     </Tab>
    //     <Tab
    //       eventKey="one-way"
    //       title="One Way"
    //     >
    //       Hello One Way
    //     </Tab>
    //     <Tab
    //       eventKey="multi-city"
    //       title="Multi City"
    //     >
    //       Hello Multi City
    //     </Tab>
    //   </Tabs>
    // </div>
  )
}

export default FlightBook