import React, {useState, useEffect} from "react"
import { Col, Row, Card, Alert, Button } from "react-bootstrap"
import CheckInIC from 'assets/icons/foursquare-check-in.svg'
import moment from 'moment'
import ThousandSeparator from 'lib/thousand-separator'

const ex_logo = 'https://ik.imagekit.io/tvlk/image/imageResource/2021/07/12/1626063527483-f24d3eae611b51022ab0d1fc1457c820.png?tr=q-75,w-28'

const Confirmation = () => {

	const [Flight, setFlight] = useState({})

  useEffect(async() => {
		let selectedFlight = localStorage.getItem("selectedFlight")
		if(selectedFlight) {
			selectedFlight = JSON.parse(selectedFlight)
			setFlight(selectedFlight)
		}
	}, [])

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
					</Col>
				</Row>
			</Col>
		</Row>
	)

  const FlightDetail = ({footer, airline}) => (
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
            <p>Mrs. Sienna Bright</p>
            <p>Ms. Marry Bright</p>
          </Col>
          <Col sm={{span: 2, offset: 3}}>
            <p className="font-weight-normal">CGK-HKG-CGK</p>
            <p className="font-weight-normal">CGK-HKG-CGK</p>
          </Col>
          <Col sm={2}>
            <p className="font-weight-normal">Fare-roundtrip</p>
            <p className="font-weight-normal">Fare-roundtrip</p>
            <p className="text-16">Sub-total</p>
          </Col>
          <Col className="text-right"  sm={2}>
            <p className="font-weight-normal">{Flight?.fare?.currency_code}{ThousandSeparator(Flight.fare.price)}</p>
            <p className="font-weight-normal">{Flight?.fare?.currency_code}{ThousandSeparator(Flight.fare.price)}</p>
            <p className="text-16">{Flight?.fare?.currency_code} {ThousandSeparator((Flight?.fare?.price * 2))}</p>
          </Col>
        </Row>
      </div>
    </div>
  )

  const FlightRelated = () => {
    return (
      <>
        <div className="mb-3 gray-list px-4">
          <p>OTHER FLIGHT RELATED AND ADD-ONS</p>
          <p>Total Add Ons IDR 1,000,000</p>
        </div>
        <div className="px-4">
            <p className="font-weight-bold">Mrs. Sienna Bright</p>
          <Row>
            <Col className="d-flex">
              <div className="px-3">
                <p>CGK-HKG</p>
                <p>CGK-HKG</p>
                <p>CGK-SIN</p>
              </div>
              <div>
                <p>Additional Baggage 5Kg Departing</p>
                <p>Travel Insurance</p>
                <p>Seat 42J, 42K</p>
              </div>
            </Col>
            <Col className="text-right" style={{maxWidth: 145}}  sm={2}>
              <p>IDR 500,000</p>
              <p>IDR 160,000</p>
              <p>IDR 340,000</p>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <p style={{width:145}} className="text-16 font-weight-bold pl-1">TOTAL</p>
            <p style={{width:145}} className="text-16 font-weight-bold text-right">{Flight?.fare?.currency_code} {ThousandSeparator((Flight?.fare?.price * 2) + 1000000)}</p>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className="pt-4">
      <Row>
        <Col md={10}>
          <Card>
            <Card.Body className="d-flex">
              <div>
                <img src={CheckInIC}/>
              </div>
              <div>
                <p>Booking Code: {"{{booking_code}}"}</p>
                <p>Partner Booking Code / PNR: {"{{partner_booking_code}}"}</p>
                <p>Thank You, {"{{name}}"}</p>
                <p>Your Flight Ticket has been Issued!</p>
              </div>
              <div>

              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <p>Your Booking Details</p>
              <p>Jakarta - Hongkong - Jakarta</p>
              <p>{Flight?.airlines?.map((a)=> " "+moment(a.routes[0].departure_date).format("DD MMM YYYY"))}</p>
              <p>AIRLINE BOOKING CODE / PNR: DEDWQDS</p>
              <p>Traveller(s): 1. Mrs. Sienna Johnson</p>
              <p>2. Ms. Marry Bright</p>

              <div className="mb-3 gray-list px-4">
                <p>PRICE PER-TRAVELLER (Roundtrip)</p>
                <p>{Flight?.fare?.currency_code} {ThousandSeparator(Flight?.fare?.price || 0)}</p>
              </div>
              <div className="px-4">
              {
                Flight?.airlines?.map((airline, idx) => (
                  <div key={idx}>
                    <FlightDetail key={idx} airline={airline} footer={idx === Flight.airlines?.length-1}/>
                    {idx < Flight.airlines?.length-1 ? 
                    <div className='middle-border'></div> : <></>}
                  </div>
                ))
              }
              </div>

              <FlightRelated/>

            </Card.Body>
          </Card>

          <Alert variant="secondary" className="notice-alert">
            <h6 className='text-danger'>IMPORTANT NOTES :</h6>
            <ol className='w-50'>
              <li>Please check the name on the reservation based on current PASSPORT (International) and ID/KTP (Domestic)</li>
              <li>Passports validity shall be NO LESS THAN 6 MONTHS</li>
            </ol>
          </Alert>

          <Card>
            <Card.Body>
              <h6>RESERVATION ADDITIONAL INFORMATION</h6>
              <p>Project Name: Project Name Sample</p>
              <p>Project: Project1</p>
              <p>Cost Center: Manufacture</p>
              <p>Travel Purpose: Site Survey</p>
            </Card.Body>
          </Card>

          <div className="d-flex align-items-center">
            <p className="m-0">Change on Trip Planes</p>
            <Button 
              onClick={(e) => {}}
              className="btn-flight-select mx-3"
            >
                Request for change
            </Button>
            <p className="m-0 text-danger">Fees May Apply</p>
          </div>

        </Col>

        <Col md={2}>
          <div>
            <div>
              <p>Print E-Voucher</p>
            </div>
            <div>
              <p>Export File</p>
            </div>
          </div>
          <Card>
            <div style={{height: 324}}>
            </div>
          </Card>

          <Card>
            <div style={{height: 338}}>
            </div>
          </Card>

          <div>
            <p>Download Our Apps</p>
          </div>
        </Col>
      </Row>
      <Button 
        onClick={(e) => {}}
        className="btn-flight-select my-5"
      >
          Back to Dashboard
      </Button>
    </div>
  )
}

export default Confirmation