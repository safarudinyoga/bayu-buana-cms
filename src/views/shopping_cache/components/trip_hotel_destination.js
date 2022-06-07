import React from 'react'
import { default as SelectAsync } from "./trip_select_async"

const TripHotelDestination = () => {
  return (
    <div className={`position-relative hotel-destination-container mr-2`}>
      <h4 className='form-with-label__title'> DESTINATION <span className='label-required'></span> </h4>
      <SelectAsync
        url={`master/hotels`}
        fieldName="hotel_name"
        placeholder=""
      />
    </div>
  )
}

export default TripHotelDestination