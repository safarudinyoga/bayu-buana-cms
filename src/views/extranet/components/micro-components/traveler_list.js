import React from 'react'
import TravelerSelect from './traveler_select'

function TravelerList(props) {
  const { travelerCount, handleTrip } = props

  let travelers = []

  for(let i = 0; i < travelerCount; i++){
    travelers.push(<TravelerSelect count={i} isGuest={false} handleTrip={handleTrip} />)
  }

  return (
    <div className='my-4'>
      {travelers}
    </div>
    
  )
}

export default TravelerList