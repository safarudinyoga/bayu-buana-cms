import React, {useState, useEffect} from "react"
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import PopupConfirmation from './components/flight-step-confirmation-modal'

const SelectSeat = ({ handleSelectTab }) => {

	const [showAddOns, setShowAddOns] = useState(false)

  return (
    <>
      <p>This feature is not yet available</p>
      <div className='d-flex'>
        <Button 
        onClick={(e) => { 
					setShowAddOns(true)
        }}
        className="btn-flight-select mr-3"
        >
            continue booking
        </Button>
        <Button variant="secondary" onClick={() => handleSelectTab('passengers')}>Back</Button>
      </div>

			<PopupConfirmation
				contentText={'Would you like to choose your Add-Ons?'}
				show={showAddOns}
				onClose={() => setShowAddOns(false)}
				onClickYes={() => {
					setShowAddOns(false)
					handleSelectTab('add-ons')
				}}
				onClickNo={() => {
					setShowAddOns(false)
					handleSelectTab('review')
				}}
			/>
    </>
  )
}

export default SelectSeat