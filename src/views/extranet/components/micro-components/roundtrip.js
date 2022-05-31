import React, { useEffect, useState } from 'react'
// import DatePicker from 'react-datepicker'
import DatePicker from 'react-multi-date-picker'
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import Select from 'components/form/select';
import Travellers from './travellers';
import Routes from './routes';

const Roundtrip = (props) => {
  const { airports, handleRoundtrip } = props

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

  const CustomMenu = ({ innerRef, innerProps, children }) => {
    return (
      <div ref={innerRef} {...innerProps} className="traveler-select-menu">
        {children}
        <div 
          className='new-guest-traveler' 
          role={"button"}
          onClick={() => console.log("New")}
        >
          Add a Guest Traveler
        </div>
        {/* <button
            className="btn btn-info btn-sm btn-block"
            onClick={() => console.log("NEW")}
        >Add New</button> */}
      </div>
    )
  }
  
  function TravelerList(props) {
    let divs = []

    const travelerDiv = (i) => {
      return (
        <div>
          <div className="row my-2">
            <div className="col-md-2">
              Traveler {i+1}
            </div>
            <div className='col-md-6'>
              <Select 
                options={[
                  {value: "Mr. Adam Smith (Procurement Manager)", label: "Mr. Adam Smith (Procurement Manager)"},
                  {value: "Mr. Bobby White (Engineer)", label: "Mr. Bobby White (Engineer)"},
                  {value: "Ms. Carina Wong (Finance Controller)", label: "Ms. Carina Wong (Finance Controller)"},
                  {value: "Ms. Dina Dash (Sales Manager)", label: "Ms. Dina Dash (Sales Manager)"},
                  {value: "Mr. Jonny Setiawan (Engineer)", label: "Mr. Jonny Setiawan (Engineer)"},
                ]}
                components={{ Menu: CustomMenu }}
              />
            </div>
          </div>
        </div>
      )
    } 
    

    for(let i = 0; i < travelerCount; i++){
      divs.push(
        travelerDiv(i)
      )
    }
    return divs
  }

  useEffect(() => {
    handleRoundtrip("depart_time", departTime)
    
  }, [departTime])

  useEffect(() => {
    handleRoundtrip("return_time", returnTime)
    
  }, [returnTime])
  

  return (
    <>
      <div className='d-flex flex-wrap'>
        <Routes handleRoundtrip={handleRoundtrip} airports={airports} />
        
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
        <Travellers onConfirm={handleTravellerCheckboxConfirm} handleRoundtrip={handleRoundtrip} />
      </div>
      {/* end of first row */}
      {
        travelerCheckboxConfirm ? <TravelerList /> : ""
      }
      
      <div className='my-3 ml-2'>
        <Form.Check label="Add a hotel" />
      </div>
    </>
  )
}

export default Roundtrip