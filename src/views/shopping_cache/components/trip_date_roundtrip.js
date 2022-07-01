import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ReactSVG } from "react-svg"

function TripDateRoundtrip(props) {
  const [departTime, setDepartTime] = useState(new Date())
  const [returnTime, setReturnTime] = useState(new Date())

  useEffect(() => {
    setDepartTime(props.formik.values.departure_datetime ? new Date(props.formik.values.departure_datetime) : new Date())
    setReturnTime(props.formik.values.arrival_datetime ? new Date(props.formik.values.arrival_datetime) : new Date())
  }, [props.formik.values])
  

  function RenderReactDatepicker({title}) {
    return (
      <div className={`position-relative ${props.smallSize ? "trip-date-sm" : ""}`} style={{zIndex: 3000}}>
        <h4 className='form-with-label__title'> {title} <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
        <ReactDatePicker 
          className='form-control rounded-0 form-with-label'
          selected={title === "DEPART" ? departTime : returnTime}
          dateFormat="dd MMMM yyyy"
          name={title === "DEPART" ? "departure_datetime" : "arrival_datetime"}
          onChange={(date) => {
            if(title === "DEPART") {
              setDepartTime(new Date(date))
              setReturnTime(new Date(date))
              props.formik.setFieldValue("departure_datetime", new Date(date))
            } else if (title === "RETURN") {
              setReturnTime(new Date(date))
              props.formik.setFieldValue("arrival_datetime", new Date(date))
            }
          }}
        />
        {
          props.formik && props.formik.errors.departure_datetime && title === "DEPART" ? (
            <div className="route-invalid">
              {props.formik.touched.departure_datetime ? props.formik.errors.departure_datetime : null}
            </div>
          ) : null
        }
        {
          props.formik && props.formik.errors.arrival_datetime && title === "RETURN" ? (
            <div className="route-invalid">
              {props.formik.touched.arrival_datetime ? props.formik.errors.arrival_datetime : null}
            </div>
          ) : null
        }
      </div>
    )
  }

  useEffect(() => {
    if(props.handleCriteriaChange){
      props.handleCriteriaChange("departure_datetime", departTime)
    }
  }, [departTime])

  useEffect(() => {
    if(props.handleCriteriaChange){
      props.handleCriteriaChange("arrival_datetime", returnTime)
    }
  }, [returnTime])
  

  return (
   <>
    <div className='d-flex mr-2'>
      <div className={`position-relative flex-grow-1 ${props.smallSize ? "trip-date-sm-container" : ""} ${props.medSize ? "trip-date-md-container" : ""}`}>
        <RenderReactDatepicker 
          title={"DEPART"}
        />
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
      <div className={`position-relative flex-grow-1 ${props.smallSize ? "trip-date-sm-container" : ""} ${props.medSize ? "trip-date-md-container" : ""}`}>
        <RenderReactDatepicker 
          title={"RETURN"}
        />
        {/* <DatePicker 
          render={<RenderDatepicker title={"RETURN"} />}
          numberOfMonths={2}
          fixMainPosition={true}
          format="ddd, DD MMMM YYYY"
          value={returnTime}
          onChange={(date) => {
            setReturnTime(new Date(date))
          }}
          portal
        /> */}
      </div>
    </div>
   </>
  )
}

export default TripDateRoundtrip