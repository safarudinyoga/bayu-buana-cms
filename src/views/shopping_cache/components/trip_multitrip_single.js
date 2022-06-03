import React from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import TripDateRoundtrip from './trip_date_roundtrip'


function TripMultitripSingle() {
  return (
    <div className='d-flex flex-wrap'>
      <Routes />
      <TripDateRoundtrip medSize={true} />
    </div>
  )
}

export default TripMultitripSingle