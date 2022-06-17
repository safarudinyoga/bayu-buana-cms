import React, {useState, useEffect} from "react"
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import BBModal from 'components/Modal/bb-modal';

const SelectSeat = ({ handleSelectTab }) => {

	const [showConfirmation, setShowConfirmation] = useState(false)

  const PopupConfirmation = () => {
		return (
			<BBModal
				show={showConfirmation}
				size="sm"
				onClick={() => setShowConfirmation(false)}
				scrollable={true}
				modalContent={() => (
					<>
						<p>Would you like to choose your Add-Ons?</p>
						<p>** fees apply</p>

						<div className='d-flex'>
							<Button 
                className="mr-3"
								onClick={(e) => { 
									setShowConfirmation(false)
                  handleSelectTab("add-ons")
								}}
							>
								YES
							</Button>
							<Button onClick={(e) => setShowConfirmation(false)}>
								NO
							</Button>
						</div>
					</>
				)}
			/>
		)
	}
  return (
    <>
      <p>This feature is not yet available</p>
      <div className='d-flex'>
        <Button 
        onClick={(e) => { 
            setShowConfirmation(true)
        }}
        className="btn-flight-select mr-3"
        >
            continue booking
        </Button>
        <Button variant="secondary" onClick={() => handleSelectTab('passengers')}>Back</Button>
      </div>
			<PopupConfirmation/>
    </>
  )
}

export default SelectSeat