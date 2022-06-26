import React, {useState, useEffect} from "react"
import { Col, Row, Modal } from 'react-bootstrap'
import moment from 'moment'


const FlightInfo = ({route, airline, fare}) => {

	const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

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

  return (
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
              <li>Baggage allow up {fare.bagage_max_kg}</li>
            </ul>
            <a className='small pointer' onClick={handleShow}>Fare Rules</a>
          </Col>
        </Row>
      </Col>
      <FareRulesModal/>
    </Row>
  )
}

export default FlightInfo