import React, { useEffect, useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import ReactDatePicker from 'react-datepicker'
import { ReactSVG } from "react-svg"

function TripDateOneway(props) {
  const [departTime, setDepartTime] = useState(new Date())

  function RenderDatepicker({ openCalendar, value, handleValueChange, title }){
    return (
      <div className={`position-relative ${props.smallSize ? "trip-date-sm" : ""}`} style={{zIndex: 3000}}>
        <h4 className='form-with-label__title'> {title} <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
        <input type="text" 
          className='form-control rounded-0 form-with-label' 
          onFocus={openCalendar} 
          value={value} 
          onChange={handleValueChange}
          />
      </div>
    )
  }

  useEffect(() => {
    setDepartTime(new Date(props.formik.values.departure_datetime))
  }, [props.formik.values])
  

  return (
   <>
    <div className='d-flex mr-2'>
      <div className={`position-relative flex-grow-1 ${props.smallSize ? "trip-date-sm-container" : ""} ${props.medSize ? "trip-date-md-container" : ""}`}>
        <div className={`position-relative ${props.smallSize ? "trip-date-sm" : ""}`} style={{zIndex: 3000}}>
          <h4 className='form-with-label__title'> DEPART <span className='label-required'></span></h4>
          <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
          <ReactDatePicker 
            className='form-control rounded-0 form-with-label'
            selected={departTime}
            dateFormat="dd MMMM yyyy"
            onChange={(date) => {
              setDepartTime(new Date(date))
              props.formik.setFieldValue("departure_datetime", new Date(date))
            }}
          />
          {
            props.formik && props.formik.errors.departure_datetime ? (
              <div className="route-invalid">
                {props.formik.touched.departure_datetime ? props.formik.errors.departure_datetime : null}
              </div>
            ) : null
          }
        </div>
        
        {/* <DatePicker 
          render={<RenderDatepicker title={"DEPART"} />}
          numberOfMonths={2}
          fixMainPosition={true}
          format="ddd, DD MMMM YYYY"
          value={departTime}
          onChange={(date) => {
            setDepartTime(new Date(date))
          }}
          portal
          containerStyle={{zIndex: 3000}}
          arrowStyle={{zIndex: 3000}}
        /> */}
      </div> 
    </div>
   </>
  )
}

export default TripDateOneway