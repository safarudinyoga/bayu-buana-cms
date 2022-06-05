import React, { useEffect, useState } from 'react'
import { ReactSVG } from "react-svg"
import { default as SelectAsync } from "./trip_select_async"
import { SelectFetch } from "react-select-fetch"
import Api from "config/api"
import env from "config/environment"



function TripFlightClass(props) {
  const [flightClassOptions, setFlightClassOptions] = useState([])
  let api = new Api()

  useEffect(async () => {
    try {
      let res = await api.get('/master/cabin-types')
    } catch (error) {
      
    }
  }, [])


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
      />
      
      {/* <input type="text" className='form-control rounded-0 form-with-label' /> */}
    </div>  )
}

export default TripFlightClass