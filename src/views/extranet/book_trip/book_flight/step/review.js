import React, {useState, useEffect} from "react"
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import moment from 'moment'
import ThousandSeparator from 'lib/thousand-separator'
const ex_logo = 'https://ik.imagekit.io/tvlk/image/imageResource/2021/07/12/1626063527483-f24d3eae611b51022ab0d1fc1457c820.png?tr=q-75,w-28'

const Review = ({handleSelectTab}) => {


	const [Flight, setFlight] = useState({})
	const [show, setShow] = useState(false)
	const handleShow = () => setShow(true)
  useEffect(async() => {
		let selectedFlight = localStorage.getItem("selectedFlight")
		if(selectedFlight) {
			selectedFlight = JSON.parse(selectedFlight)
			setFlight(selectedFlight)
		}
	}, [])

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
					<li>Baggage allow up to 30 kg</li>
					<li>Exchange Before Flight (free)</li>
					<li>Exchange After Flight (with fee $100)</li>
					<li>Refund Before Flight (with fee $90)</li>
				</ul>
			</Modal.Body>
		</Modal>
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
        </Col>
        <Col sm={1}>
        </Col>
      </Row>
      <div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3`}>
        <p className="my-0" style={{fontSize: 12, color: "#818181"}}>Notes</p>
        <ul className="note-list">
          <li>Roundtrip price for 1 traveler: IDR 3,294,700</li>
          <li>Service Fee: IDR 100,000 per ticket</li>
          <li>After Office Charge: IDR 50,000 per ticket</li>
          <li>Price quoted above is subject to change and not guaranteed until ticketed.</li>
        </ul>
      </div>
      <div className={`d-${footer ? "block": "none"} flight-detail-footer pt-3 text-bold`}>
        <Row>
          <Col sm={3}>
            <p>Mrs. Sienna Bright</p>
            <p>Ms. Marry Bright</p>
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
            <p className="font-weight-normal">IDR 6,985,345</p>
            <p className="font-weight-normal">IDR 6,985,345</p>
            <p className="text-16">IDR 6,589,123</p>
          </Col>
        </Row>
      </div>
    </div>
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

  const Flights = () => {
    return (
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <p className="m-0">FLIGHTS</p>
            <p className="m-0 font-weight-bold">Total Flights IDR 6,985,345</p>
          </div>
        </Card.Header>
        <Card.Body>
          <FlightDetail/>
          <div className='border'></div>
          <FlightDetail footer={true}/>
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
          <p className="font-weight-bold my-4 text-right">Grand Total: IDR 7,889,400</p>
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
          handleSelectTab('confirmation')
				}}
				className="btn-flight-select mr-3"
				>
						Issue Ticket Now
				</Button>
				<Button variant="secondary" onClick={() => handleSelectTab('add-ons')}>Cancel</Button>
			</div>


      <FareRulesModal/>
    </div>
  )
}

export default Review