import React, { useState } from 'react'
import { ReactSVG } from "react-svg"
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import Select from 'components/form/select';

function Travellers(props) {
  const [adultCount, setAdultCount] = useState(1)
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
    let valueText = `${adultCount > 0 ? adultCount+" Adults" : ""} ${childrenCount > 0 ? childrenCount+" Children":""} ${infantCount > 0 ? infantCount+" Infants" : ""}`

    setTravelerValue(valueText)
    let count = adultCount+childrenCount+infantCount
    props.onConfirm(travelerCheckbox, count)
    document.body.click()
  }

  const travelerAgeStyle = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dashed #ccc',
      color: state.isSelected ? 'white' : 'gray',
      padding: 2,
      fontSize: '20px',
     }),
     control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 500,
      background: 'white',
      height: 50,
      radius: 40,
      borderRadius: 5,
      display: 'flex', 
     }),
     singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
     
      return { ...provided, opacity, transition };
     }
  }

  const selectChildAge = () => {
    const options = []
  
    for (let i = 2; i <= 11; i++) {
      options.push({
        value: i,
        label: i,
      })
    }
  
    return options
  }

  const infantAgeOptions = [
    {
      value: 0,
      label: "Under 1",
    },
    {
      value: 1,
      label: 1,
    }
  ]

  function ChildrenDiv(){
    let divs = []

    for (let i = 0; i < childrenCount; i++) {
      divs.push(
        <div className='col-6'>
          <span className='traveler-title-detail'>Child {i+1} age</span>
          <Select
            options={selectChildAge()}
            styles={travelerAgeStyle}
          />
        </div>
      )
    }
    return divs
  }

  function InfantDiv(){
    let divs = []

    for (let i = 0; i < infantCount; i++) {
      divs.push(
        <div className='col-6'>
          <span className='traveler-title-detail'>Infant {i+1} age</span>
          <Select
            options={infantAgeOptions}
            styles={travelerAgeStyle}
          />
        </div>
      )
    }
    return divs
  }

  const popover = (
    <Popover id="passenger-popover" className='passenger-popover'>
      <Popover.Content>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>ADULTS</div>
          <div className='d-flex col-md-6'>
            {
              adultCount === 1 ? 
                <ReactSVG className='mr-2' src="/img/icons/minus-circle.svg" /> 
                :  <ReactSVG 
                    className='mr-2' 
                    role="button" 
                    src="/img/icons/minus-circle-active.svg" 
                    onClick={() => {
                      setAdultCount(adultCount - 1)
                    }} />
            }
            <input className='text-right' value={adultCount} style={{width: 40}} onChange={onChangeAdult}></input>
            {
              adultCount === 9 ?
                <ReactSVG className='ml-2' src="/img/icons/plus-circle-inactive.svg" />
                : <ReactSVG 
                    className='ml-2' 
                    role="button" 
                    src="/img/icons/plus-circle.svg" 
                    onClick={() => setAdultCount(adultCount + 1)} />
            }
            
          </div>
        </div>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>
            <div>CHILDREN</div>
            <div className='sublabel-traveller'>(Age 2 - 11)</div>
          </div>
          <div className='d-flex col-md-6'>
            {
              childrenCount === 0 ?
                <ReactSVG className='mr-2' src="/img/icons/minus-circle.svg" />
                : <ReactSVG
                    className='mr-2'
                    role="button"
                    src="/img/icons/minus-circle-active.svg" 
                    onClick={() => {
                      setChildrenCount(childrenCount - 1)
                    }}
                  />
            }
            <input className='text-right' value={childrenCount} style={{width: 40}} onChange={onChangeChildren}></input>
            {
              childrenCount === 8 ?
                <ReactSVG className='ml-2' src="/img/icons/plus-circle-inactive.svg" />
                : <ReactSVG 
                    className='ml-2' 
                    role="button" 
                    src="/img/icons/plus-circle.svg" 
                    onClick={() => setChildrenCount(childrenCount + 1)} />
            }
          </div>
          <div className='row w-100'>
            <ChildrenDiv />
          </div>
          
          
        </div>
        <div className="d-flex row mb-2">
          <div className='col-md-6'>
            <div>INFANTS</div>
            <div className='sublabel-traveller'>(below age 2)</div>
          </div>
          <div className='d-flex col-md-6'>
            {
              infantCount === 0 ? 
                <ReactSVG className='mr-2' src="/img/icons/minus-circle.svg" />
                : <ReactSVG 
                    className='mr-2'
                    role="button"
                    src="/img/icons/minus-circle-active.svg"
                    onClick={() => {
                      setInfantCount(infantCount - 1)
                    }}
                    />
            }
            
            <input className='text-right' value={infantCount} style={{width: 40}} onChange={onChangeInfant}></input>
            {
              infantCount === adultCount || infantCount === 8 ?
                <ReactSVG className='ml-2' src="/img/icons/plus-circle-inactive.svg" />
                : <ReactSVG 
                    className='ml-2' 
                    role="button" 
                    src="/img/icons/plus-circle.svg" 
                    onClick={() => setInfantCount(infantCount + 1)} 
                  />
            }
            
          </div>
          <div className='row w-100'>
            <InfantDiv />
          </div>
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
      <div style={{width: 280, marginBottom: 10}} className="position-relative">
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