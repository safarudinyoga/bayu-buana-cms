import React from 'react'
import { default as SelectAsync } from "./trip_select_async"

function TripCorporate(props) {
  return (
    <div className={`position-relative traveller-container ${props.smallSize ? "traveller-sm mr-2" : ""}`}>
      <h4 className='form-with-label__title'> CORPORATE </h4>
      <SelectAsync
        url={`master/agent-corporates`}
        fieldName="agent_corporate.corporate.corporate_name"
        placeholder=""
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  )
}

export default TripCorporate