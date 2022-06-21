import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { setUIParams } from 'redux/ui-store'
// import FlightCard from './components/FlightCard'
// import Select, {components} from "react-select"
// import arrowdownIcon from "assets/icons/arrow-down.svg"
// import moment from 'moment'
// import flights from './flights.json'
// import AdsImage from 'assets/ads.png'
import PopupConfirmation from './components/flight-step-confirmation-modal'

const ex_logo = 'https://ik.imagekit.io/tvlk/image/imageResource/2021/07/12/1626063527483-f24d3eae611b51022ab0d1fc1457c820.png?tr=q-75,w-28'

function Passenger({handleSelectTab}) {
  const dispatch = useDispatch()
	const [viewBy, setViewBy] = useState('fares')
	const [flightInfo, setFlightInfo] = useState({
		plane: "Singapore Airlines",
		time_estimation: "7h 3m",
		class: "Economy",
		origin: {
			city: "Jakarta",
			code: "JKT",
			airport: "Soekarno-Hatta Intl.",
			terminal: 3,
		},
		destination: {
			city: "Hong Kong",
			code: "HKG",
			airport: "Hong Kong Intl.",
			terminal: 3,
		},
		trip: "Roundtrip",
		departure_date: "2022-12-12 14:00:00",
		return_date: "2022-12-17 12:25:00",
		passengers: {
			adult: 2,
			child: 0,
			infant: 0,
		},
	})
	const [data, setData] = useState([])
	const [show, setShow] = useState(false)
	const [showSelectSeats, setShowSelectSeats] = useState(false)
	const [showAddOns, setShowAddOns] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)


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

	const FlightInfo = () => (
		<Row className='mt-3'>
			<Col sm={6} className={"d-flex justify-content-between align-items-center pb-3"}>
				<div>
					<p>02:10 pm</p>
					<p>12 Dec</p>
					<p>CGK - Hong Kong</p>
					<p>Hong Kong Intl.</p>
					<p>Terminal 3</p>
				</div>
				<div className='flight-line align-center text-center'>
					<p>788 miles</p>
					<div className='links mb-3'>
						<i class="fas fa-plane plane-ic"></i>
					</div>
					<p>1h 5m</p>
				</div>
				<div>
					<p>02:10 pm</p>
					<p>12 Dec</p>
					<p>CGK - Hong Kong</p>
					<p>Hong Kong Intl.</p>
					<p>Terminal 3</p>
				</div>
			</Col>
			<Col sm={6}>
				<Row>
					<Col sm={6} className={"d-flex align-items-start"}>
						<img src={ex_logo} width={20}/>
						<div>
							<p>Singapore Airlines</p>
							<p>Boeing 777-300ER</p>
							<p>conomy (N)</p>
						</div>
						<p>SQ 955</p>
					</Col>
					<Col sm={6}>
						<div></div>
						<ul>
							<li>Cancelation allow with fee</li>
							<li>Free changes</li>
							<li>No show fee apply</li>
							<li>Baggage allow up 30kg</li>
						</ul>
						<a className='small pointer' onClick={handleShow}>Fare Rules</a>
					</Col>
				</Row>
			</Col>
		</Row>
	)

	const FlightDetail = ({footer}) => (
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
																	<i className='fas fa-clock mr-1'></i> 7h 5m (1 Stop)
															</small>
													</p>
											</Col>
									</Row>
									<FlightInfo/>
									<div className='transit-wrapper align-center'>
											<div className='links'>
													<p className='transit-info'>
															<i className='fas fa-clock mr-1'></i>
															Transit 1h 50m in Singapore (SIN)
													</p>
											</div>
									</div>
									<FlightInfo/>
									<div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3 text-bold`}>
											<p>Roundtrip price for 1 traveler: IDR 3.294.700</p>
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
															<option>Ana</option>
															<option>Dina</option>
															<option>Lina</option>
															<option>Tina</option>
															<option>Rina</option>
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
				<FlightDetail/>
				<div className='border-dotted'></div>
				<FlightDetail footer={true}/>
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