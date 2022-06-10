import React from 'react'
import { ReactSVG } from 'react-svg'
import { default as SelectAsync } from "./trip_select_async"

const TripHotelRoomGuest = (props) => {
  return (
    <>
      <div className="d-flex mr-2">
        <div className="position-relative room-container">
          <h4 className='form-with-label__title'> ROOM  <span className='label-required'></span></h4>
          <SelectAsync
            placeholder=""
          />
        </div>
        <div className="position-relative traveller-container-guest traveller-sm">
          <h4 className='form-with-label__title'> GUEST <span className='label-required'></span></h4>
          <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' />
          <SelectAsync 
            placeholder=""
          />
        </div>
      </div>
    </>
  )
}

export default TripHotelRoomGuest