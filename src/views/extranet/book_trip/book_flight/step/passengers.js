import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
// import { setUIParams } from 'redux/ui-store'
// import FlightCard from './components/FlightCard'
// import Select, {components} from "react-select"
// import arrowdownIcon from "assets/icons/arrow-down.svg"
// import flights from './flights.json'
// import AdsImage from 'assets/ads.png'
import PopupConfirmation from './components/flight-step-confirmation-modal'
import ThousandSeparator from 'lib/thousand-separator'
import { encrypt } from "lib/bb-crypt"
import FlightInfo from './components/FlightInfo'

function Passenger({handleSelectTab}) {
	const selectedFlight = localStorage.getItem("selectedFlight")
	
	const [Flight, setFlight] = useState({})
	const [showSelectSeats, setShowSelectSeats] = useState(false)
	const [showAddOns, setShowAddOns] = useState(false)
	const [passenger1, setPassenger1] = useState("Mrs. Sienna Bright")
	const [passenger2, setPassenger2] = useState("Ms. Marry Bright")


	useEffect(async() => {
		if(selectedFlight) {
			let parseFlight = JSON.parse(selectedFlight)
			setFlight(parseFlight)
		}
	}, [selectedFlight])

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	const diff_minutes = (date1, date2) => {
		let milliseconds = date2.getTime() - date1.getTime()
		let seconds = Math.floor(milliseconds / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
	
		seconds = seconds % 60;
		minutes = seconds >= 30 ? minutes + 1 : minutes;
	
		minutes = minutes % 60;
		hours = hours % 24;
	
		return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
	}

	const TransitLine = ({previous_arrival_date, departure_date}) => (
		<div className='transit-wrapper align-center'>
			<div className='links'>
				<p className='transit-info'>
					<i className='fas fa-clock mr-1'></i>
					Transit {diff_minutes(previous_arrival_date, departure_date)} in Singapore (SIN)
				</p>
			</div>
		</div>
	)

	const FlightDetail = ({airline, footer}) => (
		<div>
			<Row>
				<Col sm={11}>
					<Row className="w-50">
						<Col>
							<p className='text-bold m-0'>Jakarta <i class="fas fa-arrow-right"></i> Hongkong</p>
						</Col>
						<Col>
							<p className='text-bold m-0'>
								<small>
									<i className='fas fa-clock mr-1'></i> {Flight.estimation} ({Flight.routes ? Flight.routes.length -1 : 0} Stop)
								</small>
							</p>
						</Col>
					</Row>
					{
						airline.routes?.map((route, i) => {
							return (<div key={i}>
								{route?.previous_arrival_date !== null 
								&& <TransitLine 
									previous_arrival_date = {new Date(route?.previous_arrival_date)}
									departure_date = {new Date(route?.departure_date)}
								/>}
								<FlightInfo route={route} airline={airline} fare={Flight?.fare}/>
							</div>)
						})
					}
					<div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3 text-bold`}>
							<p>Roundtrip price for 1 traveler: {Flight.fare.currency_code}{ThousandSeparator(Flight.fare.price)}</p>
					</div>
				</Col>
				<Col sm={1}>
					<Button variant="secondary" onClick={() => handleSelectTab('1')}>CHANGE</Button>
				</Col>
			</Row>
		</div>
	)

	const PassengerForm = ({eventKey}) => {
			return (
			<Card>
					<Accordion.Toggle as={Card.Header} eventKey={eventKey}>
							Passenger {eventKey}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={eventKey}>
					<Card.Body>
							<Row>
									<Col sm={5}>
											<Form.Group>
													<Form.Label>CONTACT NAME</Form.Label>
													<Form.Control as="select"
														onChange={(e)=> {
															eventKey === 1 ? setPassenger1(e.target.value) : setPassenger2(e.target.value)
														}}
													>
															<option>Mrs. Sienna Bright</option>
															<option>Ms. Marry Bright</option>
													</Form.Control>
											</Form.Group>
											<Form.Group as={Row}>
													<Col sm={6}>
															<Form.Group>
																	<Form.Label>PASSPORT NUMBER*</Form.Label>
																	<Form.Control type="text"></Form.Control>
															</Form.Group>
															<Form.Group>
																	<Form.Label>DATE OF BIRTH</Form.Label>
																	<Form.Control type="text"></Form.Control>
															</Form.Group>
													</Col>
													<Col sm={6}>
															<Form.Group>
																	<Form.Label>EXPIRATION</Form.Label>
																	<Form.Control type="text"></Form.Control>
															</Form.Group>
															<Form.Group>
																	<Form.Label>ID CARD NUMBER/KTP <small>(for domestic flight)</small>*</Form.Label>
																	<Form.Control type="text"></Form.Control>
															</Form.Group>
													</Col>
											</Form.Group>
											<Form.Group>
													<Form.Label>EMAIL *</Form.Label>
													<Form.Control type="text"></Form.Control>
											</Form.Group>
											<Form.Group>
													<Form.Label>FREQUENT FLYER PROGRAM</Form.Label>
													<Form.Control as="select">
															<option>SkyMiles</option>
													</Form.Control>
											</Form.Group>
									</Col>
									<Col sm={6}>
											<Form.Group>
													<Form.Label>PASSPORT COUNTRY OF ISSUANCE*</Form.Label>
													<div className="d-flex align-items-center">
															<Form.Control as="select"  className='w-50'>
																	<option>SkyMiles</option>
															</Form.Control>
															<small><a className='text-primary ml-5'>Johnson Sienna - Passport - 1083829347.pdf</a></small>
													</div>
											</Form.Group>
											<Form.Group className='w-50'>
													<Form.Label>NATIONALITY</Form.Label>
													<Form.Control as="select">
															<option>SkyMiles</option>
													</Form.Control>
											</Form.Group>
											<Form.Group as={Row} className='w-50 ml-1'>
													<Form.Label className="w-100">MOBILE NUMBER*</Form.Label>
													<Col sm={6} className="p-0">
															<Form.Control as="select">
																	<option>Indonesia (+62)</option>
															</Form.Control>
													</Col>
													<Col sm={6}>
															<Form.Control type="text"></Form.Control>
													</Col>
											</Form.Group>
											<Form.Group className='w-50'>
													<Form.Label>FREQUENT FLYER NUMBER</Form.Label>
													<Form.Control type="text"></Form.Control>
											</Form.Group>
									</Col>
							</Row>
					</Card.Body>
					</Accordion.Collapse>
			</Card>
			)
	}
	const PassengersAccordion = () => {
		return (
		<Accordion defaultActiveKey="1" className='passenger-accordion mb-4'>
				<PassengerForm eventKey={"1"}/>
				<PassengerForm eventKey={"2"}/>
		</Accordion>
		)
	}
  
	return (
    <div className='pt-4'>
			<p className='trip-txt-header'>REVIEW YOUR TRIP</p>
			<Card className="passengers-flight-detail">
				{
					Flight?.airlines?.map((airline, idx) => (
						<div key={idx}>
							<FlightDetail key={idx} airline={airline} footer={idx === Flight.airlines?.length-1}/>
							{idx < Flight.airlines?.length-1 ? 
							<div className='middle-border'></div> : <></>}
						</div>
					))
				}
			</Card>
			<Alert variant="secondary" className="notice-alert">
				<h6 className='text-danger'>IMPORTANT NOTES :</h6>
				<ol className='w-50'>
					<li>Please check the name on the reservation based on current PASSPORT (International) and ID/KTP (Domestic)</li>
					<li>Passports validity shall be NO LESS THAN 6 MONTHS</li>
					<li>PLEASE MAKE SURE THE VISA (IF NEEDED) IS STILL VALID/APPROVED BEFORE REQUESTING TO ISSUE THE TICKET. Please refer to this link for details: <a className='text-primary'>Visa Requirement to enter Hongkong</a></li>
				</ol>
			</Alert>
			<div>
				<p className="text-bold m-0">Traveler Name(s)</p>
				<p>Traveler names must match government-issued photo ID/Passport exactly.</p>
				<PassengersAccordion/>
			</div>
			<div className='d-flex'>
				<Button 
				onClick={(e) => { 
						setShowSelectSeats(true)
						let passengers = JSON.stringify([passenger1,passenger2])
        		passengers = encrypt(passengers)
						localStorage.setItem("psg", passengers)
				}}
				className="btn-flight-select mr-3"
				>
						continue booking
				</Button>
				<Button variant="secondary" onClick={() => handleSelectTab('1')}>Back</Button>
			</div>

			<PopupConfirmation
				contentText={"Would you like to choose your Flight Seat?"}
				show={showSelectSeats}
				onClose={() => setShowSelectSeats(false)}
				onClickYes={() => {
					setShowSelectSeats(false)
					handleSelectTab('3')
				}}
				onClickNo={() => {
					setShowSelectSeats(false)
					setShowAddOns(true)
				}}
			/>

			<PopupConfirmation
				contentText={'Would you like to choose your Add-Ons?'}
				show={showAddOns}
				onClose={() => setShowAddOns(false)}
				onClickYes={() => {
					setShowAddOns(false)
					handleSelectTab('4')
				}}
				onClickNo={() => {
					setShowAddOns(false)
					handleSelectTab('5')
				}}
			/>
    </div>
  )
}

export default Passenger