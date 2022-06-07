import React, { useState } from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import TripDateRoundtrip from './trip_date_roundtrip'


function TripMultitripSingle(props) {
  const [isDeleted, setIsDeleted] = useState(false)
  return (
    <>
      {
        isDeleted ? "" : (
          <div className='d-flex flex-wrap'>
            <Routes airports={props.airports}  />
            <TripDateRoundtrip medSize={true} />
          </div>
        )
      }
    </>
  )
}

export default TripMultitripSingle