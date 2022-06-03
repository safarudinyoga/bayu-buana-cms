import React, { useEffect, useState } from 'react'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripCorporate from './trip_corporate'
import TripFlightClass from './trip_flight_class'
import TripMultitripSingle from './trip_multitrip_single'

function TripMultitrip(props) {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    setTrips([...trips, <TripMultitripSingle airports={props.airports} />, <TripMultitripSingle airports={props.airports}  />])
  }, [])

  const handleAddTrip = () => {
    setTrips([...trips, <TripMultitripSingle airports={props.airports}  />])
  }
  

  return (
    <>
      <div>
        {trips}
        <button className='btn btn-primary mb-2' onClick={handleAddTrip}>Add more</button>
      </div>
      <div className="d-flex">
        <Travellers smallSize={true} />
        <TripFlightClass smallSize={true} />
        <TripCorporate smallSize={true} />
      </div>
    </>
  )
}

export default TripMultitrip