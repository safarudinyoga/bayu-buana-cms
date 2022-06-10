import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import ReactDatePicker from 'react-datepicker'

const TripDateHotel = (props) => {
  const [checkIn, setCheckIn] = useState(new Date())
  const [checkOut, setCheckOut] = useState(new Date())

  function RenderReactDatepicker({title}) {
    return (
      <div className={`position-relative ${props.smallSize ? "trip-date-sm" : ""}`} style={{zIndex: 3000}}>
        <h4 className='form-with-label__title'> {title} <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
        <ReactDatePicker 
          className='form-control rounded-0 form-with-label'
          selected={title === "CHECK IN" ? checkIn : checkOut}
          dateFormat="dd MMMM yyyy"
          onChange={(date) => {
            if(title === "CHECK IN") {
              setCheckIn(new Date(date))
            } else if (title === "CHECK OUT") {
              setCheckOut(new Date(date))
            }
          }}
        />
      </div>
    )
  }

  return (
    <>
      <div className={`position-relative ${props.smallSize ? "trip-date-sm-container" : ""} ${props.medSize ? "trip-date-md-container" : ""}`}>
        <RenderReactDatepicker 
          title={"CHECK IN"}
        />
      </div>
      <div className={`position-relative mr-2 ${props.smallSize ? "trip-date-sm-container" : ""} ${props.medSize ? "trip-date-md-container" : ""}`}>
        <RenderReactDatepicker 
          title={"CHECK OUT"}
        />
      </div>
    </>
  )
}

export default TripDateHotel