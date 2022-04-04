import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import ControlledTabs from '../components/controlled_tabs'

function BookTrip() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Book Trip",
        breadcrumbs: [
          {
            text: "Travel Management",
          },
          {
            text: "Book Trip",
          },
        ],
      }),
    )
  }, [])
  
  return (
    <div>
      <ControlledTabs />
    </div>
  )
}

export default BookTrip