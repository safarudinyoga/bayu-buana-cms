import React, {useState, useEffect} from "react"
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import moment from 'moment'
import ThousandSeparator from 'lib/thousand-separator'
import { decrypt } from "lib/bb-crypt"

const Review = ({handleSelectTab}) => {


	const [Flight, setFlight] = useState({})
  const [Passengers, setPassengers] = useState([])
	const [show, setShow] = useState(false)
	const handleShow = () => setShow(true)
  let selectedFlight = localStorage.getItem("selectedFlight")
  let passengers = localStorage.getItem("psg")
  
  useEffect(async() => {

    window.scrollTo({top: 0, behavior: 'smooth'});

    if(passengers) {
      passengers = decrypt(passengers)
      passengers = JSON.parse(passengers)
      setPassengers(passengers)
    }
		if(selectedFlight) {
			selectedFlight = JSON.parse(selectedFlight)
			setFlight(selectedFlight)
		}
	}, [selectedFlight, passengers])

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

  const FareRulesModal = () => (
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					FARE RULES DETAIL
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ul>
					<li>Cancelation allow with fee</li>
					<li>Baggage allow up to 20 kg</li>
					<li>Exchange Before Flight (free)</li>
					<li>Exchange After Flight (with fee $100)</li>
					<li>Refund Before Flight (with fee $90)</li>
				</ul>
			</Modal.Body>
		</Modal>
	)

  const FlightSummary = ({footer, airline}) => (
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
        </Col>
        <Col sm={1}>
        </Col>
      </Row>
      <div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3`}>
        <p className="my-0" style={{fontSize: 12, color: "#818181"}}>Notes</p>
        <ul className="note-list">
          <li>Roundtrip price for 1 traveler: {Flight?.fare?.currency_code}{ThousandSeparator(Flight.fare.price)}</li>
          <li>Service Fee: IDR 100,000 per ticket</li>
          <li>After Office Charge: IDR{Flight?.fare?.booking_change_fee_after} per ticket</li>
          <li>Price quoted above is subject to change and not guaranteed until ticketed.</li>
        </ul>
      </div>
      <div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3 text-bold`}>
        <Row>
          <Col sm={3}>
            <p>{Passengers[0]}</p>
            <p>{Passengers[1]}</p>
          </Col>
          <Col style={{maxWidth: 145}}sm={{span: 2, offset: 5}}>
            <p className="font-weight-normal">CGK-HKG-CGK</p>
            <p className="font-weight-normal">CGK-HKG-CGK</p>
          </Col>
          <Col style={{maxWidth: 145}} sm={2}>
            <p className="font-weight-normal">Fare-roundtrip</p>
            <p className="font-weight-normal">Fare-roundtrip</p>
            <p className="text-16">Sub-total</p>
          </Col>
          <Col className="text-right" style={{maxWidth: 145}}  sm={2}>
            <p className="font-weight-normal">{Flight?.fare?.currency_code}{ThousandSeparator(Flight.fare.price)}</p>
            <p className="font-weight-normal">{Flight?.fare?.currency_code}{ThousandSeparator(Flight.fare.price)}</p>
            <p className="text-16">{Flight?.fare?.currency_code} {ThousandSeparator((Flight?.fare?.price * 2))}</p>
          </Col>
        </Row>
      </div>
    </div>
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

  const Flights = () => {
    return (
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <p className="m-0">FLIGHTS</p>
            <p className="m-0 font-weight-bold">Total Flights {Flight?.fare?.currency_code} {ThousandSeparator((Flight?.fare?.price * 2)+200000)}</p>
          </div>
        </Card.Header>
        <Card.Body>
          {
            Flight?.airlines?.map((airline, idx) => (
              <div key={idx}>
                <FlightSummary key={idx} airline={airline} footer={idx === Flight.airlines?.length-1}/>
                {idx < Flight.airlines?.length-1 ? 
                <div className='middle-border'></div> : <></>}
              </div>
            ))
          }
        </Card.Body>
      </Card>
    )
  }

  const TravelRequest = () => {
    return (
      <div className="mt-4 mb-5 row">
        <Col md={4}>
          
          <Form.Group as={Row}>
            <Form.Label column sm={4}>Travel Request</Form.Label>
            <Col sm={8}>
              <Button 
                onClick={(e) => {}}
                className="btn-flight-select"
              >
                upload file
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={4}>Travel Purpose</Form.Label>
            <Col sm={8}>
              <Form.Control as="select">
                <option>Site Survey</option>
                <option>Site Survey</option>
                <option>Site Survey</option>
                <option>Site Survey</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={4}>Project</Form.Label>
            <Col sm={8}>
              <Form.Control as="select">
                <option>Project 1</option>
                <option>Site Survey</option>
                <option>Site Survey</option>
                <option>Site Survey</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={4}>Cost Center</Form.Label>
            <Col sm={8}>
              <Form.Control as="select">
                <option>Manufacture</option>
                <option>Site Survey</option>
                <option>Site Survey</option>
                <option>Site Survey</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
        <Form.Check type="checkbox" id={`check-api-checkbox`} className="ml-2">
          <Form.Check.Input type="checkbox" />
          <Form.Check.Label>
          I acknowledge that I have read and accept the above Rules & Restrictions, <a>Terms & Conditions,</a> <a>Privacy Policy</a> and <a>Government Travel Advice</a>
          </Form.Check.Label>
        </Form.Check>
      </div>
    )
  }

  return (
    <div className="pt-4">
      <p className='trip-txt-header pl-2'>Review For Booking</p>
      <Flights/>

      <Row className="mx-0 mb-4" style={{borderRadius: 4, backgroundColor: "#F2F2F2", borderColor: "#DCDCDC"}}>
        <Col className="px-3">
          <p className="font-weight-bold my-4">Credit Limit Status: OK</p>
        </Col>
        <Col className="px-3">
          <p className="font-weight-bold my-4 text-right">Grand Total: {Flight?.fare?.currency_code} {ThousandSeparator((Flight?.fare?.price * 2)+200000)}</p>
        </Col>
      </Row>

      <Alert variant="secondary" className="notice-alert">
				<h6 className='text-danger'>IMPORTANT NOTES :</h6>
				<ol className='w-50'>
					<li>Please check the name on the reservation based on current PASSPORT (International) and ID/KTP (Domestic)</li>
					<li>Passports validity shall be NO LESS THAN 6 MONTHS</li>
					<li>PLEASE MAKE SURE THE VISA (IF NEEDED) IS STILL VALID/APPROVED BEFORE REQUESTING TO ISSUE THE TICKET. Please refer to this link for details: <a className='text-primary'>Visa Requirement to enter Hongkong</a></li>
				</ol>
			</Alert>

      <TravelRequest/>

      <div className='d-flex'>
				<Button 
				onClick={(e) => { 
          handleSelectTab('6')
				}}
				className="btn-flight-select mr-3"
				>
						Issue Ticket Now
				</Button>
				<Button variant="secondary" onClick={() => handleSelectTab('4')}>Cancel</Button>
			</div>


      <FareRulesModal/>
    </div>
  )
}

export default Review