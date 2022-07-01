import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ReactSVG } from "react-svg"

const TripDateMultitrip = (props) => {
  const [departTime, setDepartTime] = useState({ 0: new Date() })
  const [arrivalTime, setArrivalTime] = useState({ 0: new Date() })

  function RenderReactDatepicker({title}) {
    return (
      <div className={`position-relative trip-date-sm`} style={{zIndex: 3000}}>
        <h4 className='form-with-label__title'> {title} <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
        <ReactDatePicker 
          className='form-control rounded-0 form-with-label'
          selected={title === "DEPART" ? departTime[props.index] : arrivalTime[props.index]}
          dateFormat="dd MMMM yyyy"
          name={title === "DEPART" ? "departure_datetime" : "arrival_datetime"}
          autoComplete="off"
          onChange={(date) => {
            if(title === "DEPART") {
              setDepartTime({
                ...departTime,
                [props.index]: new Date(date)
              })
              
              props.formik.setFieldValue(`trips[${props.index}].departure_datetime`, new Date(date))
            } else if (title === "RETURN") {
              setArrivalTime({
                ...arrivalTime,
                [props.index]: new Date(date)
              })
              props.formik.setFieldValue(`trips[${props.index}].arrival_datetime`, new Date(date))
            }
          }}
        />
        {
          props.formik && 
          props.formik.errors &&
          props.formik.errors.trips &&
          props.formik.errors.trips[props.index] &&
          props.formik.errors.trips[props.index].departure_datetime && title === "DEPART" ? (
            <div className="route-invalid">
              {
                props.formik &&
                props.formik.touched &&
                props.formik.touched.trips &&
                props.formik.touched.trips[props.index] &&
                props.formik.touched.trips[props.index].departure_datetime ? props.formik.errors.trips[props.index].departure_datetime : null
              }
            </div>
          ) : null
        }
        {
          props.formik && 
          props.formik.errors &&
          props.formik.errors.trips &&
          props.formik.errors.trips[props.index] &&
          props.formik.errors.trips[props.index].arrival_datetime && title === "RETURN" ? (
            <div className="route-invalid">
              {
                props.formik &&
                props.formik.touched &&
                props.formik.touched.trips &&
                props.formik.touched.trips[props.index] &&
                props.formik.touched.trips[props.index].arrival_datetime ? props.formik.errors.trips[props.index].arrival_datetime : null}
            </div>
          ) : null
        }
      </div>
    )
  }

  return (
    <>
    <div className='d-flex mr-2'>
      <div className={`position-relative flex-grow-1 trip-date-sm-container`}>
        <RenderReactDatepicker 
          title={"DEPART"}
        />
      </div>
      <div className={`position-relative flex-grow-1 trip-date-sm-container`}>
        <RenderReactDatepicker 
          title={"RETURN"}
        />
      </div>
    </div>
   </>
  )
}

export default TripDateMultitrip