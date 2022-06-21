import React, { useEffect, useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"

import Travellers from './travellers';
import Routes from './routes';
import TravelerList from './traveler_list';
import { Formik } from 'formik';

const Roundtrip = (props) => {
  const { airports, handleTrip, formik } = props

  const [departTime, setDepartTime] = useState(new Date())
  const [returnTime, setReturnTime] = useState(new Date())

  const [travelerCheckboxConfirm, setTravelerCheckboxConfirm] = useState(false)
  const [travelerCount, setTravelerCount] = useState(0)


  function RenderDatepicker({ openCalendar, value, handleValueChange, title }){
    return (
      <div style={{width: 190}} className='position-relative'>
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

  function handleTravellerCheckboxConfirm(confirm, count){
    setTravelerCheckboxConfirm(confirm)
    setTravelerCount(count)
  }

  useEffect(() => {
    formik.setFieldValue("depart_time", departTime)
  }, [departTime])

  useEffect(() => {
    formik.setFieldValue("return_time", returnTime)
  }, [returnTime])
  

  return (
    <>
      <div className='d-flex flex-wrap'>
        <Routes formik={formik} airports={airports} />
        
        <div className='mr-4'>
          <div className='d-flex'>
            <div style={{width: 173}} className="position-relative flex-grow-1 mr-3">
              <DatePicker 
                render={<RenderDatepicker title={"DEPART"} />}
                numberOfMonths={2}
                fixMainPosition={true}
                format="ddd, DD MMMM YYYY"
                value={departTime}
                onChange={(date) => {
                  setDepartTime(new Date(date))
                }}
                portal
              />
            </div>
            <div style={{width: 173}} className="position-relative flex-grow-1 mr-3">
              <DatePicker 
                render={<RenderDatepicker title={"RETURN"} />}
                numberOfMonths={2}
                fixMainPosition={true}
                format="ddd, DD MMMM YYYY"
                value={returnTime}
                onChange={(date) => {
                  setReturnTime(new Date(date))
                }}
                portal
              />
            </div>
          </div>
        </div>
        <Travellers onConfirm={handleTravellerCheckboxConfirm} handleTrip={handleTrip} />
      </div>
      {/* end of first row */}
      {
        travelerCheckboxConfirm ? <TravelerList handleTrip={handleTrip} travelerCount={travelerCount}/> : ""
      }
      
      <div className='my-3 ml-2'>
        <Form.Check label="Add a hotel" />
      </div>
    </>
  )
}

export default Roundtrip