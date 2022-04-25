import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import { Form } from 'react-bootstrap'
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
      <Form.Check label="Book for Personal Trip" className='mb-2' style={{marginTop: 50}} />
      <ControlledTabs />
    </div>
  )
}

export default BookTrip