import React, { useEffect, useState } from 'react'
import { ReactSVG } from "react-svg"
import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import Select from 'components/form/select';

function Travellers(props) {
  const [adultCount, setAdultCount] = useState(1)
  const [childrenCount, setChildrenCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)

  const [infantError, setInfantError] = useState(false)
  const [ageData, setAgeData] = useState([])

  const [travelerValue, setTravelerValue] = useState("1 Adult")
  const [travelerCheckbox, setTravelerCheckbox] = useState(false)
  const [travelerCacheData, setTravelerCacheData] = useState({
    number_of_adults: 1,
    number_of_children: 0,
    number_of_infants: 0
  })


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

    setInfantError(false)
    setTravelerValue(valueText)
    let count = adultCount+childrenCount+infantCount
    if(props.onConfirm){
      props.onConfirm(travelerCheckbox, count)
    }

    if(props.handleCacheData){
      props.handleCacheData("cache_air_travel_preference_criteria", travelerCacheData, "cache_air_traveler_criteria", travelerCacheData)
    }

    if(props.formik){
      props.formik.setFieldValue("number_of_adults", adultCount)
      props.formik.setFieldValue("number_of_children", childrenCount)
      props.formik.setFieldValue("number_of_infants", infantCount)
    }
    
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

  const updateAge = (v, index)=> {
    let newAgeData = [...ageData]
    newAgeData[index] = {
      label: v.value,
      value: v.value
    }
    setAgeData(newAgeData);
  }
  function ChildrenDiv(){
    let divs = []
    for (let i = 0; i < childrenCount; i++) {
      divs.push(
        <div className='col-6'>
          <span className='traveler-title-detail'>Child {i+1} age</span>
          <Select
            options={selectChildAge()}
            styles={travelerAgeStyle}
            value={ageData[i]}
            onChange={(v) => {
              updateAge(v, i)
            }}
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
        {infantError ? (
          <div className='traveler-invalid'>
            You can only book for 1 infant per adult
          </div>
        ) : ""}
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
                      setInfantError(false)
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
                    onClick={() => {
                      setAdultCount(adultCount + 1)
                      setInfantError(false)
                    }} />
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
                      setInfantError(false)
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
                    onClick={() => {
                      setChildrenCount(childrenCount + 1)
                      setInfantError(false)
                    }} />
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
                      setInfantError(false)
                    }}
                    />
            }
            
            <input className='text-right' value={infantCount} style={{width: 40}} onChange={onChangeInfant}></input>
            {
              infantCount === adultCount || infantCount === 8 ?
                <ReactSVG 
                  className='ml-2' 
                  src="/img/icons/plus-circle-inactive.svg" 
                  onClick={() => setInfantError(true)}
                />
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
          onChange={() => {
            setTravelerCheckbox(!travelerCheckbox)
            setInfantError(false)
          }} 
          checked={travelerCheckbox}
        />
        <Button onClick={onTravelerClick} className='mt-3 w-100'>DONE</Button>
      </Popover.Content>
    </Popover>
  )

  useEffect(() => {

    if(props.handleTrip){
      props.handleTrip("adult_count", adultCount)
    }

    if(props.handleCacheData){
      let travelerCache = {...travelerCacheData}
      travelerCache.number_of_adults = adultCount
      setTravelerCacheData(travelerCache)
    }
    
  }, [adultCount])

  useEffect(() => {

    if(props.handleTrip){
      props.handleTrip("children_count", childrenCount)
    }

    if(props.handleCacheData){
      let travelerCache = {...travelerCacheData}
      travelerCache.number_of_children = childrenCount
      setTravelerCacheData(travelerCache)
    }
    
  }, [childrenCount])

  useEffect(() => {

    if(props.handleTrip){
      props.handleTrip("infant_count", infantCount)
    }

    if(props.handleCacheData){
      let travelerCache = {...travelerCacheData}
      travelerCache.number_of_infants = infantCount
      setTravelerCacheData(travelerCache)
    }
    
  }, [infantCount])
  

  return (
    <>
      <div className={`position-relative traveller-container ${props.smallSize ? "traveller-sm mr-2" : ""}`}>
        <h4 className='form-with-label__title'> TRAVELERS <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' />
        <OverlayTrigger trigger="click" placement='bottom' overlay={popover} rootClose={true}>
          <input type="text" className='form-control rounded-0 form-with-label' name="travelers" id="travelers" value={travelerValue} autoComplete="off" />
        </OverlayTrigger>
      </div>
    </>
  )
}

export default Travellers