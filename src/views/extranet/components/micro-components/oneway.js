import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ReactSVG } from 'react-svg';
import DatePicker from 'react-multi-date-picker'
import Travellers from './travellers';
import Routes from './routes';

const Oneway = (props) => {
  const { airports, multitrip, handleRemoveTrip, id, counter, handleTrip } = props

  const [departTime, setDepartTime] = useState(new Date())

  const [travelerCheckboxConfirm, setTravelerCheckboxConfirm] = useState(false)
  const [travelerCount, setTravelerCount] = useState(0)

  const removeTripCallback = index => () => {
    handleRemoveTrip(index)
  }

  function RenderDatepicker({ openCalendar, value, handleValueChange }){
    return (
      <div style={{width: 190}} className='position-relative'>
        <h4 className='form-with-label__title'> DEPART <span className='label-required'></span></h4>
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

  return (
    <>
      <div className='d-flex flex-wrap' id={id}>
        <Routes airports={airports} />

        <div className='mr-4'>
          <div className='d-flex'>
            <div style={{width: 173}} className="position-relative flex-grow-1 book-trip-datepicker">
              <DatePicker 
                render={<RenderDatepicker />}
                numberOfMonths={2}
                fixMainPosition={true}
                format="ddd, DD MMMM YYYY"
                value={departTime}
                onChange={(date) => {
                  setDepartTime(date)
                }}
                portal
              />
            </div>
          </div>
        </div>
        {
          multitrip ? (
            <div onClick={removeTripCallback(counter)}>
              Remove
            </div>
          ) : (
            <Travellers handleTrip={handleTrip} onConfirm={handleTravellerCheckboxConfirm} />
          )
        }
        
      </div>
      {/* end of first row */}
      
    </>
  )
}

export default Oneway