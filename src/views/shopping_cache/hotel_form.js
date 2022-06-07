import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setModalTitle, setCreateModal } from "redux/ui-store"
import TripCorporate from './components/trip_corporate'
import TripDateHotel from './components/trip_date_hotel'
import TripHotelDestination from './components/trip_hotel_destination'
import TripHotelRoomGuest from './components/trip_hotel_room_guest'
import { Button } from 'react-bootstrap'
import CancelButton from 'components/button/cancel'

const ShoppingCacheCreateHotel = (props) => {
  const dispatch = useDispatch()

  useEffect(async () => {
    let docTitle = "Add Shopping Criteria"

    dispatch(setModalTitle(docTitle))
  })
  return (
    <>
      <div className='d-flex flex-wrap' style={{marginBottom: 50, marginTop: 50}}>
        <TripHotelDestination />
        <TripDateHotel smallSize={true} />
        <TripHotelRoomGuest />
        <TripCorporate smallSize={true} />
      </div>

      <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          // disabled={!dirty || !isValid}
          // onClick={handleSubmitData}
          style={{ marginRight: 15 }}
        >
          SAVE
        </Button>
        <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
      </div>
    </>
  )
}

export default ShoppingCacheCreateHotel