import React, { useEffect, useState } from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import TripDateOneway from './trip_date_oneway'

const TripOneway = (props) => {
  const [criteria, setCriteria] = useState({
    departure_datetime: "",
    destination_airport_id: "",
    destination_city_id: "",
    origin_airport_id: "",
    origin_city_id: "",
  })

  const handleCriteriaChange = (key, value, key2=null, value2=null) => {
    let crit = {...criteria}

    crit[key] = value
    if(key2 && value2){
      crit[key2] = value2
    }
    setCriteria(crit)
  }

  useEffect(() => {
    console.log(criteria)
    if (props.handleCacheData){
      props.handleCacheData("cache_air_origin_destination_criteria",[criteria])
    }
  }, [criteria])
  
  return (
    <>
      <Routes smallSize={true} airports={props.airports} handleCriteriaChange={handleCriteriaChange} />
      <TripDateOneway smallSize={true} handleCriteriaChange={handleCriteriaChange} />
    </>
  )
}

export default TripOneway