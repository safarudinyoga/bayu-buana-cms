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

function FlightCard({data, handleSelectTab, tripType, viewBy}) {
	const [Flight, setFlight] = useState({})
	const [activeCabinDesc, setActiveCabinDesc] = useState("")
	const [selectedCabin, setSelectedCabin] = useState(null)


	useEffect(async() => {
		try {
			setFlight(data)
		} catch(e) {}
	}, [])

	const FlightInfo = ({showDetailTxt=true, airline, visible}) => {
		const { routes } = airline
		return (
			<div className={`${!visible && "d-none"}`}>
				<Row className={`flight-details-header`}>
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
							routes?.map((r, i) => (
								<p key={i} className='m-0'>{r.source_code} {r.source_number}</p>
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
			</div>
		)
	}

	const setBackground = (name) => {
		switch(name) {
			case "ECONOMY":
				return "bg-header-green-1"
			case "PREMIUM ECONOMY":
				return "bg-header-dark"
			default:
				return ""
		}
	}

	const SelectCard = ({cabin={}}) => {
		const {fares} = cabin 
		return (
			<Col
				sm={2} 
				onClick={() => {
					if(cabin.name === activeCabinDesc) {
						setActiveCabinDesc("")
					} else {
						setActiveCabinDesc(cabin.name)
					}
					if(tripType !== "without-ndc") {
						setSelectedCabin(cabin)
					}
				}} 
				className={`flight-card-right d-flex flex-column align-content-center align-items-center justify-content-center 
				${(activeCabinDesc !== "" && activeCabinDesc === cabin.name) ? setBackground(cabin.name) : ""}`}
			>
				{
					cabin.name &&
					<div className={`header-flight-card-right ${setBackground(cabin.name)}`}>
						<p>{cabin.name}</p>
					</div>
				}
				<div className=' d-flex flex-column align-content-center align-items-center justify-content-center' style={{flex: 1}}>
					<p>{fares[0]?.currency_code} <b>{ThousandSeparator(fares[0]?.price)}</b></p>
					<p className='flight-type'>{fares[0]?.trip_type_name}</p>
					{
						(cabin.name !== activeCabinDesc && tripType !== "SQ") &&
							<Button 
							onClick={(e) => onSelectFlight(e, selectedCabin.fares[0])}
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
						{fares[0]?.available_seats <= 2 && <p className='rest-seat'>Only {fares[0].available_seats} seat left</p>}
					</div>
					<i className={`fas fa-angle-${cabin.name === activeCabinDesc ? "up" : "down"}`}></i>
				</div>
				
			</Col>
		)
	}
	const onSelectFlight = (e, fare) => { 
		e.stopPropagation();
		let selectedFlight = {
			airlines: Flight.airlines,
			estimation: Flight.estimation,
			fare: {
				cabin_name: selectedCabin.name,
				...fare
			}
		}
		localStorage.removeItem("selectedFlight")
		localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight))
		handleSelectTab("2")
	}


  
  return (
    <Card className='flight-card'>
			<Row style={{marginLeft: 0, marginRight:0}}>
				<Col sm={tripType !== "without-ndc" ? 8 : 10} className="flight-card-left">
				{
					Flight?.airlines?.map((airline, idx) => (
						<>
							<FlightInfo 
								key={idx} 
								airline={airline}
								showDetailTxt={idx === 0}
								viewBy={viewBy}
								visible={viewBy === "fares" ? true : idx < 1}
							/>
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
				activeCabinDesc !== ""
				? selectedCabin !== null && selectedCabin.name === "ECONOMY"
				? (
					<>
						<Row className='m-0'>
							<Col className='px-3 py-2 text-center bg-header-grey'>Fare Conditions</Col>
							{
							selectedCabin.fares.map((fare, idx) => (
								<Col className={`px-3 py-2 text-center bg-header-green-${idx+1}`} key={idx}>{fare.fare_name}</Col>
							))
							}
						</Row>
						<Row className='m-0'>
							<Col className='p-3 border fare-section'>
								<div className=''>
									<p className='text-bold'>Baggage</p>
									<p className='text-bold'>Seat Selection</p>
								</div>
							</Col>
							{
								selectedCabin.fares.map((fare, idx) => (
									<Col className='p-3 border fare-section' key={idx}>
										<p>{fare.bagage_max_kg}kg</p>
										<p>{fare.seat_selection_fee > 0
											?	`from ${fare.currecy_code} ${fare.seat_selection_fee}`
											: fare.seat_selection_types.join(" & ")
										}</p>
									</Col>
								))
							}
						</Row>
						<Row className='m-0'>
							<Col className='p-3 border fare-section'>
								<div>
									<p className='text-bold'>Earn KrisFlyer miles</p>
									<p className='text-bold'>Upgrade with miles</p>
								</div>
							</Col>
							{
								selectedCabin.fares.map((fare, idx) => (
									<Col className='p-3 border fare-section' key={idx}>
										<p>{fare.kris_flyer_miles_percentage}%</p>
										<p>{fare.upgrade_miles_allowed 
											?	"Allowed"
											: "Not Allowed"
										}</p>
									</Col>
								))
							}
						</Row>
						<Row className='m-0'>
							<Col className='p-3 border fare-section'>
								<div className=''>
									<p className='text-bold'>Cancellation</p>
									<p className='text-bold'>Booking Change</p>
									<p className='text-bold'>No Show</p>
								</div>
							</Col>
							{
								selectedCabin.fares.map((fare, idx) => (
									<Col className='p-3 border fare-section' key={idx}>
										<p>{fare.cancelation_allowed 
											?	"Allowed"
											: "Not Allowed"
										}</p>
										<p>{fare.change_booking_before || "-"}</p>
										<p>{fare.no_show_fee}</p>
									</Col>
								))
							}
						</Row>
						<Row className='m-0'>
							<Col className='p-3 border fare-section'>
							</Col>
							{
								selectedCabin.fares.map((fare, idx) => (
									<Col className='p-3 border fare-section d-flex flex-column align-content-center align-items-center ' key={idx}>
										<p>{fare.currency_code} <b>{ThousandSeparator(fare.price)}</b></p>
										<p className='flight-type'>{fare.trip_type_name}</p>
										<Button 
											onClick={(e) => onSelectFlight(e, fare)}
											className="btn-flight-select"
										>Select
										</Button>
										<p className='rest-seat'>{fare.available_seats <= 2 ? `only ${fare.available_seats} seat left` : ""}</p>
									</Col>
								))
							}
						</Row>
					</>
				)
				: (
					<div className='full-conditions'>
						<div className={`full-conditions-header ${selectedCabin.name === "PREMIUM ECONOMY" &&"bg-header-dark"}`}>
							<p>{selectedCabin.name === "PREMIUM ECONOMY" ? "Travel policy - most compliant" : "Full Fare Conditions"}</p>
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
												<p>{selectedCabin.fares[0].bagage_max_kg} kg</p>
											</Col>
										</Row>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Seat Selection</p>
											</Col>
											<Col>
												<p>
												{selectedCabin.fares[0].seat_selection_fee > 0
													?	`from ${selectedCabin.fares[0].currecy_code} ${selectedCabin.fares[0].seat_selection_fee}`
													: selectedCabin.fares[0].seat_selection_types.join(" & ")
												}
												</p>
											</Col>
										</Row>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Cancelation</p>
											</Col>
											<Col>
												<p>{selectedCabin.fares[0].cancelation_allowed 
													?	"Allowed"
													: "Not Allowed"
												}</p>
											</Col>
										</Row>
										<Row>
											<Col className='mb-2 text-bold'>
												<p><i className="fas fa-suitcase mr-1"></i> Booking Change</p>
											</Col>
											<Col>
												<p>{selectedCabin.fares[0].change_booking_before || "-"}</p>
											</Col>
										</Row>
									</div>
								</Col>
								<Col sm={4} className="d-flex flex-column justify-content-center align-items-center">
									<p>{selectedCabin.fares[0].currency_code} <b>{ThousandSeparator(selectedCabin.fares[0].price)}</b></p>
									<Button className=' btn-flight-select px-5' onClick={(e) => onSelectFlight(e, selectedCabin.fares[0])}>Select</Button>
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