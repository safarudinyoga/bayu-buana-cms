import React, { useEffect, useState } from 'react'
import Oneway from './oneway'

function MultiTrip() {
  const [trips, setTrips] = useState([])
  const [tripCounter, setTripCounter] = useState(0)

  const airports = [
    {
      name: "Jakarta, Indonesia",
      city: "Jakarta",
      code: "JKT",
      all: "All Airports"
    },
    { 
      name: "Soekarno-Hatta Intl",
      city: "Jakarta",
      country: "Indonesia",
      code: "CGK",
      city_code: "JKT",
    },
    { 
      name: "Halim Perdana Kusuma",
      city: "Jakarta",
      country: "Indonesia",
      code: "HLP",
      city_code: "JKT",
    },
  ]

  useEffect(() => {
    setTrips([...trips, <Oneway id="default-trip" key="default-trip" airports={airports} />, <Oneway counter={tripCounter} id={`trip-${tripCounter}`} key={`trip-${tripCounter}`} airports={airports} multitrip handleRemoveTrip={handleRemoveTrip} />])
    setTripCounter(tripCounter+1)
  }, [])
  

  const handleAddTrip = () => {
    setTripCounter(tripCounter+1)
    setTrips([...trips, <Oneway counter={tripCounter} id={`trip-${tripCounter}`} key={`trip-${tripCounter}`} airports={airports} multitrip={true} handleRemoveTrip={handleRemoveTrip} />])
  }

  const handleRemoveTrip = (index) => {
    const tripList = [...trips]
    tripList.splice(index, 1);
    setTrips(tripList)

    // // console.log("yang dipencet:",index.target.parentNode.id)
    // // let trip = [...trips]
    // // console.log(trip)
    // let trip = [...trips.filter((item) => 
    // // {
    //   // // console.log("List Trips",trips)
    //   // console.log("item key",item.key)
    //   // console.log("index target id",index.target.parentNode.id)
    //   // console.log("is item key and index target id same? ",item.key !== index.target.parentNode.id)
    //   item.key !== index.target.parentNode.id
    // // }
    // )]
    // // console.log("the trip",trip)
    // setTrips(trip)
  }

  useEffect(() => {
    console.log(trips)
  }, [trips])
  

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