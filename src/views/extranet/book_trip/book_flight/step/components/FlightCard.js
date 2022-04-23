import { Col, Row, Card, Form, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'

const ex_logo = 'https://ik.imagekit.io/tvlk/image/imageResource/2021/07/12/1626063527483-f24d3eae611b51022ab0d1fc1457c820.png?tr=q-75,w-28'

function FlightCard() {
  const dispatch = useDispatch()
	const [viewBy, setViewBy] = useState('fares')
	const [data, setData] = useState({
		origin: {
			city: "Jakarta",
			code: "JKT"
		},
		destination: {
			city: "Hong Kong",
			code: "HKG"
		},
		trip: "roundtrip",
		departure_date: "Thu, 12 Dec 20",
		return_date: "Thu, 17 Dec 20",
		passengers: {
			adult: 2,
			child: 0,
			infant: 0,
		}
		
	})
	const [showDetail, setShowDetail] = useState(false)


	useEffect(async() => {
		try {
			setData({
				origin: {
					city: "Jakarta",
					code: "JKT"
				},
				destination: {
					city: "Hong Kong",
					code: "HKG"
				},
				trip: "Roundtrip",
				departure_date: "Thu, 12 Dec 20",
				return_date: "Thu, 17 Dec 20",
				passengers: {
					adult: 2,
					child: 0,
					infant: 0,
				}
				
			})
		} catch(e) {}
	}, [])


  
  return (
    <Card className='flight-card'>
			<Row>
				<Col sm={10} className="flight-card-left">
				<Row>
					<Col sm={6} className="d-flex justify-content-between card-flight-h">
						<div className="d-flex align-items-start">
							<img src={ex_logo} width={20}/>
							<p className='m-0 pl-1'>Singapore Airlines</p>
						</div>
						<p><i class="fas fa-clock"></i> 7h 5m (1stop)</p>
						<p>Economy (N)</p>
					</Col>
					<Col sm={{span: 3, offset: 3}} className="flight-details text-right">
						<a>Show Details</a>
					</Col>
				</Row>
				
				<Row>
					<Col sm={7} className={"d-flex justify-content-between align-items-center"}>
						<div>
							<p>02:10</p>
							<p>CGK</p>
							<p>12 Dec</p>
						</div>
						<div>
							
						</div>
						<div>
							<p>10:15</p>
							<p>HKG</p>
							<p>12 Dec</p>
						</div>
					</Col>
					<Col sm={5}></Col>
				</Row>
				</Col>
				<Col sm={2} onClick={() => setShowDetail(!showDetail)} className="flight-card-right d-flex flex-column align-content-center align-items-center">
					<p>IDR <b>10,999,999</b></p>
					<p className='flight-type'>roundtrip</p>
					{
						!showDetail &&
							<Button 
							onClick={() => console.log("yee")}
							className="btn-flight-select"
							>Select</Button>
					}
					<p className='lowest-fare'><i class="fas fa-circle"></i> Lowest Fare</p>
					<p className='travel-policy'><i className="fas fa-exclamation-triangle"></i> Travel Policy</p>
					<p className='rest-seat'>Only 2 seat left</p>
					<i className={`fas fa-angle-${showDetail ? "up" : "down"}`}></i>
				</Col>
			</Row>
			{/* FULL FARE CONDITIONS */}
			{
				showDetail 
				?(
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