import React from 'react'

function TripCorporate(props) {
  return (
    <div className={`position-relative traveller-container ${props.smallSize ? "traveller-sm mr-2" : ""}`}>
      <h4 className='form-with-label__title'> CORPORATE </h4>
      <input type="text" className='form-control rounded-0 form-with-label' />
    </div>
  )
}

export default TripCorporate