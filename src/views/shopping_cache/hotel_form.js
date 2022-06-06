import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setModalTitle } from "redux/ui-store"
import TripHotelDestination from './components/trip_hotel_destination'

const ShoppingCacheCreateHotel = (props) => {
  const dispatch = useDispatch()

  useEffect(async () => {
    let docTitle = "Add Shopping Criteria"

    dispatch(setModalTitle(docTitle))
  })
  return (
    <>
      <div className='d-flex flex-wrap'>
        <TripHotelDestination />
      </div>
    </>
  )
}

export default ShoppingCacheCreateHotel