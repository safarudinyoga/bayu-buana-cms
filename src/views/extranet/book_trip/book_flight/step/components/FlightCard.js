import { Col, Row, Card, Form, Button, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import briefcaseIC from 'assets/icons/briefcase.svg'
import videoIC from 'assets/icons/video.svg'
import seatIC from 'assets/icons/seat.svg'
import restaurantIC from 'assets/icons/restaurant.svg'
import shieldIC from 'assets/icons/shield.svg'
import moment from 'moment'
import ThousandSeparator from 'lib/thousand-separator'

const ex_logo = 'https://ik.imagekit.io/tvlk/image/imageResource/2021/07/12/1626063527483-f24d3eae611b51022ab0d1fc1457c820.png?tr=q-75,w-28'

function FlightCard({data, handleSelectTab, tripType}) {
  const dispatch = useDispatch()
	const [Flight, setFlight] = useState({})
	const [fullCondition, setFullCondition] = useState(false)
	const [selectedCabin, setSelectedCabin] = useState(null)


	useEffect(async() => {
		try {
			setFlight(data)
		} catch(e) {}
	}, [])

	const FlightInfo = ({showDetailTxt=true, airline}) => {
		const { routes } = airline
		return (
			<>
				<Row className='flight-details-header'>
					<Col sm={6} className="d-flex justify-content-between card-flight-h">
						<div className="d-flex align-items-start">
							<img src={airline?.airline_logo || ""} width={20}/>
							<p className='m-0 pl-1'>{airline?.airline_name || ""}</p>
						</div>
						<p><i class="fas fa-clock"></i> {Flight?.estimation} ({airline?.routes ? airline.routes.length -1 : 0} stop)</p>
						<p>{routes[0]?.cabin_type_name} ({routes[0]?.cabin_type_code})</p>
					</Col>
					<Col sm={{span: 3, offset: 3}} className={`${showDetailTxt?"d-inline":"d-none"} btn-flight-link text-right`}>
						<a>Show Details</a>
					</Col>
				</Row>
				<Row className='flight-details-content'>
					<Col sm={6} className={"d-flex justify-content-between align-items-center"}>
						<div>
							<p>{moment(routes[0]?.departure_date).format("HH:mm")}</p>
							<p>{routes[0]?.departure_airport_code}</p>
							<p>{moment(routes[0]?.departure_date).format("DD MMM")}</p>
						</div>
						<div className='flight-line align-center text-center'>
							<p>{routes[0]?.mileage} miles</p>
							<div className='links mb-3'>
								<i class="fas fa-plane plane-ic"></i>
							</div>
							<p>1h 5m</p>
						</div>
						<div>
							<p>{moment(routes[0]?.arrival_date).format("HH:mm")}</p>
							<p>{routes[0]?.arrival_airport_code}</p>
							<p>{moment(routes[0]?.arrival_date).format("DD MMM")}</p>
						</div>
					</Col>
					<Col sm={5} className={"d-flex justify-content-between align-items-start"}>
						<div className='pl-2'>
						{
							routes?.map((r) => (
								<p className='m-0'>{r.source_code} {r.source_number}</p>
							))
						}
						</div>
						<div>
							<div>
								{routes[0].facility_bagage && <img src={briefcaseIC} style={{padding: "0 5px 0 5px"}} />}
								{routes[0].facility_film && <img src={videoIC} style={{padding: "0 5px 0 5px"}} />}
								{routes[0].facility_meal && <img src={restaurantIC} style={{padding: "0 5px 0 5px"}} />}
								{routes[0].facility_seat_selection && <img src={seatIC} style={{padding: "0 5px 0 5px"}} />}
								{routes[0].facility_protection && <img src={shieldIC} style={{padding: "0 5px 0 5px"}} />}
							</div>
							{
								(routes[0].facility_wifi || routes[0].facility_charger) &&
									<OverlayTrigger placement="right" overlay={
										<Popover>
											<div className='px-2'>
												{routes[0].facility_wifi && <img src={seatIC} style={{padding: "0 5px 0 5px"}} />}
												{routes[0].facility_charger && <img src={shieldIC} style={{padding: "0 5px 0 5px"}} />}
											</div>
										</Popover>
									}>
										<p className='text-center' style={{fontSize:11}}>+2 more</p>
								</OverlayTrigger>
							}
						</div>
					</Col>
				</Row>
			</>
		)
	}

	const SelectCard = ({cabin={}}) => {
		const {fares} = cabin 
		return (
			<Col
				sm={2} 
				onClick={() => {
					setFullCondition(!fullCondition)
					if(tripType !== "without-ndc") {
						setSelectedCabin(cabin)
					}
				}} 
				className="flight-card-right d-flex flex-column align-content-center align-items-center justify-content-center"
			>
				{
					cabin.name &&
					<div className='header-flight-card-right' style={{}}>
						<p>{cabin.name}</p>
					</div>
				}
				
				<p>IDR <b>{ThousandSeparator(fares[0]?.price)}</b></p>
				<p className='flight-type'>{fares[0]?.trip_type_name}</p>
					{/* (!fullCondition && tripType !== "SQ") && */}
				{
					(!fullCondition) &&
						<Button 
						onClick={(e) => { 
							e.stopPropagation();
							handleSelectTab("passengers")
						}}
						className="btn-flight-select"
						>Select</Button>
				}
				{
					tripType !== "SQ" && <>
						<p className='lowest-fare'><i class="fas fa-circle"></i> Lowest Fare</p>
						<p className='travel-policy'><i className="fas fa-exclamation-triangle"></i> Travel Policy</p>
					</>
				}
				<div className='pt-4'>
					{fares[0]?.available_seats <= 2 && <p className='rest-seat'>Only 2 seat left</p>}
				</div>
				<i className={`fas fa-angle-${fullCondition ? "up" : "down"}`}></i>
			</Col>
		)
	}


  
  return (
    <Card className='flight-card'>
			<Row style={{marginLeft: 0, marginRight:0}}>
				<Col sm={tripType !== "without-ndc" ? 8 : 10} className="flight-card-left">
				{
					Flight?.airlines?.map((airline, idx) => (
						<>
							<FlightInfo key={idx} airline={airline}/>
							{idx < Flight.airlines?.length-1 ? 
							<div className='middle-border'></div> : <></>}
						</>
					))
				}
				</Col>
				{
					tripType !== "without-ndc"
					? (
						<>
						{
							Flight?.cabins?.map((cabin, i) => (
								<SelectCard key={i} cabin={cabin}/>
							))
						}
						</>
					)
					: <SelectCard cabin={Flight?.cabins[0]}/>
				}
			</Row>
			{/* FULL FARE CONDITIONS */}
			{
				fullCondition 
				? selectedCabin !== null
				? (
					<div>
						ya
					</div>
				)
				: (
					<div className='full-conditions'>
						<div className='full-conditions-header'>
							<p>Full Fare Conditions</p>
						</div>
						<div className='full-conditions-content'>
							<Row>
								<Col sm={8}>
									<div className='conditions-content-left'>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Baggage</p>
											</Col>
											<Col>
												<p>20 kg</p>
											</Col>
										</Row>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Seat Selection</p>
											</Col>
											<Col>
												<p>Complimentary</p>
											</Col>
										</Row>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Cancelation</p>
											</Col>
											<Col>
												<p>Not Allowed</p>
											</Col>
										</Row>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Booking Change</p>
											</Col>
											<Col>
												<p>Complimentary</p>
											</Col>
										</Row>
									</div>
								</Col>
								<Col sm={4} className="d-flex flex-column justify-content-center align-items-center">
									<p>IDR 10,999,999</p>
									<Button className=' btn-flight-select px-5' onClick={() => console.log("yee")}>Select</Button>
								</Col>
							</Row>
						</div>
					</div>

				)
				: null
			}
    </Card>
  )
}

export default FlightCard