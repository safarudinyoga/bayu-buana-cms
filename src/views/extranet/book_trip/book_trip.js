import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import { Form } from 'react-bootstrap'
import ControlledTabs from '../components/controlled_tabs'
import { ReactSVG } from 'react-svg'

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
      <div className='d-flex mb-3' style={{marginTop: 50}}>
        <Form.Check label="Book for Personal Trip" />
        <ReactSVG src='/img/icons/personal-trip.svg' className='d-inline-block ml-2' />
      </div>
      
      <ControlledTabs />
    </div>
  )
}

export default BookTrip