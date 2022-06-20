import React, {useState, useEffect} from "react"
import { Col, Row, Card, Alert } from "react-bootstrap"

const ex_logo = 'https://ik.imagekit.io/tvlk/image/imageResource/2021/07/12/1626063527483-f24d3eae611b51022ab0d1fc1457c820.png?tr=q-75,w-28'

const Confirmation = () => {

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
						<i className="fas fa-plane plane-ic"></i>
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
              <p className='text-bold m-0'>Jakarta <i className="fas fa-arrow-right"></i> Hongkong</p>
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


  return (
    <div className="pt-4">
      <Row>
        <Col md={10}>
          <Card>
            <Card.Body>
              <div>

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
              <FlightDetail/>
              <div className='border'></div>
              <FlightDetail footer={true}/>
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
              <h5>RESERVATION ADDITIONAL INFORMATION</h5>
              <p>Project Name: Project Name Sample</p>
              <p>Project: Project1</p>
              <p>Cost Center: Manufacture</p>
              <p>Travel Purpose: Site Survey</p>
            </Card.Body>
          </Card>

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
    </div>
  )
}

export default Confirmation