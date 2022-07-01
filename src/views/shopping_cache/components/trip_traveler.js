import React, { useEffect, useState } from 'react'
import { ReactSVG } from "react-svg"
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import Select from 'components/form/select';

const TripTraveler = (props) => {
  const [adultCount, setAdultCount] = useState(1)
  const [childrenCount, setChildrenCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)

  const [travelerValue, setTravelerValue] = useState("1 Adult")

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

    if(props.formik){
      props.formik.setFieldValue("number_of_adults", adultCount)
      props.formik.setFieldValue("number_of_children", childrenCount)
      props.formik.setFieldValue("number_of_infants", infantCount)
    }
    
    document.body.click()
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
        </div>
        <Button onClick={onTravelerClick} className='mt-3 w-100'>DONE</Button>
      </Popover.Content>
    </Popover>
  )

  useEffect(() => {
    let adultValue = `${props.formik.values.number_of_adults} ${props.formik.values.number_of_adults > 1 ? "Adults" : "Adult" }`
    let childrenValue = props.formik.values.number_of_children > 0 ? `${props.formik.values.number_of_children} ${props.formik.values.number_of_children > 1 ? "Children" : "Child" }` : ""
    let infantValue =  props.formik.values.number_of_infants > 0 ? `${props.formik.values.number_of_infants} ${props.formik.values.number_of_infants > 1 ? "Infants" : "Infant" }` : ""

    let valueText = `${adultValue} ${childrenValue} ${infantValue}`

    setTravelerValue(valueText)
  }, [props.formik.values])
  

  return (
    <>
      <div className={`position-relative traveller-container traveller-sm mr-2`}>
        <h4 className='form-with-label__title'> TRAVELERS <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' />
        <OverlayTrigger trigger="click" placement='bottom' overlay={popover} rootClose={true}>
          <input type="text" className='form-control rounded-0 form-with-label' name="travelers" id="travelers" value={travelerValue} autoComplete="off" />
        </OverlayTrigger>
      </div>
    </>
  )
}

export default TripTraveler