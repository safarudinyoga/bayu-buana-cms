import React from 'react'
import { ReactSVG } from "react-svg"

function TripFlightClass(props) {
  return (
    <div className={`position-relative traveller-container ${props.smallSize ? "traveller-sm mr-2" : ""}`}>
      <h4 className='form-with-label__title'> FLIGHT CLASS <span className='label-required'></span></h4>
      <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' />
      <input type="text" className='form-control rounded-0 form-with-label' />
    </div>  )
}

export default TripFlightClass