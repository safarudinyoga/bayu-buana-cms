import React, { useState } from 'react'
import { ReactSVG } from "react-svg"
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import Select from 'components/form/select';

function Travellers(props) {
  const [adultCount, setAdultCount] = useState(0)
  const [childrenCount, setChildrenCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)

  const [travelerValue, setTravelerValue] = useState("")
  const [travelerCheckbox, setTravelerCheckbox] = useState(false)
  const [travelerCheckboxConfirm, setTravelerCheckboxConfirm] = useState(false)


  const regex = /^[0-9\b]+$/;
  const onChangeAdult = (e) => {
    if(e.target.value === '' || regex.test(e.target.value)){
      setAdultCount(e.target.value)
    }
  }
  const onChangeChildren = (e) => {
    if(e.target.value === '' || regex.test(e.target.value)){
      setChildrenCount(e.target.value)
    }
  }
  const onChangeInfant = (e) => {
    if(e.target.value === '' || regex.test(e.target.value)){
      setInfantCount(e.target.value)
    }
  }

  const onTravelerClick = (e) => {
    let valueText = `${adultCount > 0 ? adultCount+" Adults " : ""} ${childrenCount > 0 ? childrenCount+" Children ":""} ${infantCount > 0 ? infantCount+" Infants" : ""}`

    setTravelerValue(valueText)
    let count = adultCount+childrenCount+infantCount
    props.onConfirm(travelerCheckbox, count)
    document.body.click()
  }

  const popover = (
    <Popover id="passenger-popover" className='passenger-popover'>
      <Popover.Content>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>ADULTS</div>
          <div className='d-flex col-md-6'>
            {
              adultCount === 0 ? 
                <ReactSVG className='mr-2' src="/img/icons/minus-circle.svg" /> 
                :  <ReactSVG className='mr-2' src="/img/icons/minus-circle-active.svg" onClick={() => {
                      setAdultCount(adultCount - 1)
                    }} />
            }
            <input className='text-right' value={adultCount} style={{width: 40}} onChange={onChangeAdult}></input>
            <ReactSVG className='ml-2' src="/img/icons/plus-circle.svg" onClick={() => setAdultCount(adultCount + 1)} />
          </div>
        </div>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>CHILDREN</div>
          <div className='d-flex col-md-6'>
            <ReactSVG
             className='mr-2'
             src="/img/icons/minus-circle.svg" 
             onClick={() => {
                if(childrenCount === 0){
                  return;
                }
                setChildrenCount(childrenCount - 1)
              }}
             />
            <input className='text-right' value={childrenCount} style={{width: 40}} onChange={onChangeChildren}></input>
            <ReactSVG className='ml-2' src="/img/icons/plus-circle.svg" onClick={() => setChildrenCount(childrenCount + 1)} />
          </div>
          {
            childrenCount > 0 ? (
              <div className="d-flex col-md-12">
                <Select />
              </div>
            ): ""
          }
          
        </div>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>INFANTS</div>
          <div className='d-flex col-md-6'>
            <ReactSVG 
              className='mr-2'
              src="/img/icons/minus-circle.svg"
              onClick={() => {
                if(infantCount === 0){
                  return;
                }
                setInfantCount(infantCount - 1)
              }}
              />
            <input className='text-right' value={infantCount} style={{width: 40}} onChange={onChangeInfant}></input>
            <ReactSVG className='ml-2' src="/img/icons/plus-circle.svg" onClick={() => setInfantCount(infantCount + 1)} />
          </div>
          {
            infantCount > 0 ? (
              <div className="d-flex col-md-12">
                <Select />
              </div>
            ): ""
          }
        </div>
        <Form.Check 
          label="SELECT TRAVELERS"
          onChange={() => setTravelerCheckbox(!travelerCheckbox)} 
          checked={travelerCheckbox}
        />
        <Button onClick={onTravelerClick} className='mt-3 w-100'>DONE</Button>
      </Popover.Content>
    </Popover>
  )

  return (
    <>
      <div style={{width: 190}} className="position-relative">
          <h4 className='form-with-label__title'> TRAVELLERS <span className='label-required'></span></h4>
          <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' style={{bottom: 15}}/>
          <OverlayTrigger trigger="click" placement='bottom' overlay={popover} rootClose={true}>
            <input type="text" className='form-control rounded-0 form-with-label' value={travelerValue} />
          </OverlayTrigger>
        </div>
    </>
  )
}

export default Travellers