import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
// import { setUIParams } from 'redux/ui-store'
// import FlightCard from './components/FlightCard'
// import Select, {components} from "react-select"
// import arrowdownIcon from "assets/icons/arrow-down.svg"
// import moment from 'moment'
// import flights from './flights.json'
// import AdsImage from 'assets/ads.png'
import PopupConfirmation from './components/flight-step-confirmation-modal'
import moment from 'moment'
import ThousandSeparator from 'lib/thousand-separator'

function Passenger({handleSelectTab}) {
	const [Flight, setFlight] = useState({})
	const [show, setShow] = useState(false)
	const [showSelectSeats, setShowSelectSeats] = useState(false)
	const [showAddOns, setShowAddOns] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	useEffect(async() => {
		let selectedFlight = localStorage.getItem("selectedFlight")
		if(selectedFlight) {
			selectedFlight = JSON.parse(selectedFlight)
			setFlight(selectedFlight)
		}
	}, [])


	const FareRulesModal = () => (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					FARE RULES DETAIL
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ul>
					<li>Cancelation allow with fee</li>
					<li>Baggage allow up to 30 kg</li>
					<li>Exchange Before Flight (free)</li>
					<li>Exchange After Flight (with fee $100)</li>
					<li>Refund Before Flight (with fee $90)</li>
				</ul>
			</Modal.Body>
		</Modal>
	)

	const FlightInfo = ({route, airline}) => (
		<Row className='mt-3'>
			<Col sm={6} className={"d-flex justify-content-between align-items-center pb-3"}>
				<div>
					<p>{moment(route?.departure_date).format("HH:mm")}</p>
					<p>{moment(route?.departure_date).format("DD MMM")}</p>
					<p>{route.departure_city_code} - {route.departure_city_name}</p>
					<p>{route.departure_airport_name}</p>
					<p>{route.departure_terminal}</p>
				</div>
				<div className='flight-line align-center text-center'>
					<p>{route.mileage} miles</p>
					<div className='links mb-3'>
						<i class="fas fa-plane plane-ic"></i>
					</div>
					<p>{diff_minutes(new Date(route.departure_date), new Date(route.arrival_date))}</p>
				</div>
				<div>
				<p>{moment(route?.arrival_date).format("HH:mm")}</p>
					<p>{moment(route?.arrival_date).format("DD MMM")}</p>
					<p>{route.arrival_city_code} - {route.arrival_city_name}</p>
					<p>{route.arrival_airport_name}</p>
					<p>{route.arrival_terminal}</p>
				</div>
			</Col>
			<Col sm={6}>
				<Row>
					<Col sm={6} className={"d-flex align-items-start"}>
						<img src={airline.airline_logo} width={20}/>
						<div>
							<p>{airline.airline_name}</p>
							<p>{route.aircraft_name}</p>
							<p>{route.cabin_type_name} ({route.cabin_type_code})</p>
						</div>
						<p>{route.source_code} {route.source_number}</p>
					</Col>
					<Col sm={6}>
						<div></div>
						<ul>
							<li>Cancelation allow with fee</li>
							<li>Free changes</li>
							<li>{route.no_show_fee > 0? "Fee"+route.no_show_fee :"No show fee apply"}</li>
							<li>Baggage allow up {Flight.fare.bagage_max_kg}</li>
						</ul>
						<a className='small pointer' onClick={handleShow}>Fare Rules</a>
					</Col>
				</Row>
			</Col>
		</Row>
	)

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	const diff_minutes = (date1, date2) => {
		console.log(date1, date2)
		let milliseconds = date2.getTime() - date1.getTime()
		let seconds = Math.floor(milliseconds / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
	
		seconds = seconds % 60;
		minutes = seconds >= 30 ? minutes + 1 : minutes;
	
		minutes = minutes % 60;
		hours = hours % 24;
		console.log(hours, seconds, "<<<")
	
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
								<FlightInfo route={route} airline={airline}/>
							</div>)
						})
					}
					<div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3 text-bold`}>
							<p>Roundtrip price for 1 traveler: {Flight.fare.currency_code}{ThousandSeparator(Flight.fare.price)}</p>
					</div>
				</Col>
				<Col sm={1}>
					<Button variant="secondary" onClick={() => handleSelectTab('select-flight')}>CHANGE</Button>
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
													<Form.Control as="select">
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
				}}
				className="btn-flight-select mr-3"
				>
						continue booking
				</Button>
				<Button variant="secondary" onClick={() => handleSelectTab('select-flight')}>Back</Button>
			</div>

			<FareRulesModal/>
			<PopupConfirmation
				contentText={"Would you like to choose your Flight Seat?"}
				show={showSelectSeats}
				onClose={() => setShowSelectSeats(false)}
				onClickYes={() => {
					setShowSelectSeats(false)
					handleSelectTab('select-seats')
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
					handleSelectTab('add-ons')
				}}
				onClickNo={() => {
					setShowAddOns(false)
					handleSelectTab('review')
				}}
			/>
    </div>
  )
}

export default Passenger