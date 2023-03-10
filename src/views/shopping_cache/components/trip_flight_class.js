import React, { useEffect, useState } from 'react'
import { ReactSVG } from "react-svg"
import { default as SelectAsync } from "./trip_select_async"
import { SelectFetch } from "react-select-fetch"
import Api from "config/api"
import env from "config/environment"



function TripFlightClass(props) {
  const [flightClass, setFlightClass] = useState()
  let api = new Api()
  
  useEffect(() => {
    console.log("trigger formik values",props.formik.values)
    setFlightClass(props.formik.values ? props.formik.values.cabin_type : "")
  }, [props.formik.values])
  


  return (
    <div className={`position-relative traveller-container ${props.smallSize ? "traveller-sm mr-2" : ""}`}>
      <h4 className='form-with-label__title'> FLIGHT CLASS </h4>
      {/* <ReactSVG src='/img/icons/people.svg' className='form-with-label__suggest-icon' /> */}
      {/* <SelectFetch 
        styles={customStyles}
        
      /> */}
      <SelectAsync
        url={`master/cabin-types`}
        fieldName="cabin_type_name"
        placeholder="Economy"
        value={flightClass}
        onChange={(v) => {
          setFlightClass(v)
          props.formik.setFieldValue("cabin_type", v)
        }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
      
      {/* <input type="text" className='form-control rounded-0 form-with-label' /> */}
    </div>  )
}

export default TripFlightClass