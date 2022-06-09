import React, { useEffect, useState } from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripCorporate from './trip_corporate'
import TripDateRoundtrip from './trip_date_roundtrip'
import TripFlightClass from './trip_flight_class'

const TripRoundtrip = (props) => {
  const [criteria, setCriteria] = useState({
    arrival_datetime: "",
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
      <TripDateRoundtrip smallSize={true} handleCriteriaChange={handleCriteriaChange} />

      <Travellers smallSize={true} handleCacheData={props.handleCacheData} />
      <TripFlightClass smallSize={true} />
      <TripCorporate smallSize={true} />
    </>
  )
}

export default TripRoundtrip