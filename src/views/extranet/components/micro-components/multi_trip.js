import React, { useEffect, useState } from 'react'
import Oneway from './oneway'

function MultiTrip() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    setTrips([...trips, [<Oneway />, <Oneway multitrip handleRemoveTrip={handleRemoveTrip} />]])
  }, [])
  

  const handleAddTrip = () => {
    setTrips([...trips, <Oneway multitrip={true} handleRemoveTrip={handleRemoveTrip} />])
  }

  const handleRemoveTrip = (index) => {

  }

  return (
    <>
      <div>
        {trips}
      </div>
      <button className='btn btn-primary mb-2' onClick={handleAddTrip}>Add more</button>
    </>
    
  )
}

export default MultiTrip