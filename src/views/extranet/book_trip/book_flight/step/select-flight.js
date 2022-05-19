import { Col, Row, Card, Form, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import FlightCard from './components/FlightCard'
import Select, {components} from "react-select"
import arrowdownIcon from "assets/icons/arrow-down.svg"
import moment from 'moment'
import flights from './flights.json'
import AdsImage from 'assets/ads.png'
import BBModal from 'components/Modal/bb-modal';
import useQuery from "lib/query"

function FlightList({handleSelectTab}) {
  const dispatch = useDispatch()
	let flightType = useQuery().get("trip-type") || "without-ndc"
	console.log(flightType)
	const [viewBy, setViewBy] = useState('trip-type')
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
	const [showCalendarFares, setShowCalendarFares] = useState(false)
	const [tripType, setTripType] = useState(flightType)  //without-ndc, ndc, multiple-fare

  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Book Flight",
        breadcrumbs: [
          {
            text: "Travel Management",
          },
          {
            text: "Book Trip",
            link: "/extranet/book-trip"
          },
          {
            text: "Book Flight",
          },
        ],
      }),
    )
  }, [])

	useEffect(async() => {
		try {
			setData(flights.data)
		} catch(e) {}
	}, [])
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			color: "#333333",
			backgroundColor: state.isSelected ? "white" : "white",
			padding: 10,
			fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
			fontSize: 15,
			"&:hover": {
				// Overwrittes the different states of border
				backgroundColor: state.isFocused ? "#027F71" : "",
				color: state.isFocused ? "white" : "#333333",
			},
		}),
		control: (base, state) => ({
			...base,
			height: 6,
			width: 60,
			marginTop: -1,
			marginLeft: 8,
			border: "1px solid #DADEDF",
			fontSize: 12,
			fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
			backgroundColor: "white",
			boxShadow: state.isFocused ? 0 : 0,
			"&:hover": {
				border: "1px solid #DADEDF",
			},
		}),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1
			const transition = "opacity 300ms"
			return {...provided, opacity, transition}
		},
	}
	const DownIcon = () => {
		return <img src={arrowdownIcon} alt="down" />;
	};
	const DropdownIndicator = props => {
		return (
			<components.DropdownIndicator {...props}>
				<DownIcon />
			</components.DropdownIndicator>
		);
	};
	const TimeSelect = (props) => {
		return (
			<Form.Control as="select" className='time-select' size='sm' defaultValue={props.value}>
				<option>06:30</option>
				<option>14:30</option>
				<option>15:30</option>
				<option>23:59</option>
			</Form.Control>
		)
	}

	const Calendarfares = () => {
		return (
			<BBModal
				show={showCalendarFares}
				onClick={() => setShowCalendarFares(false)}
				modalSize={"lg"}
				scrollable={true}
				modalTitle={"calendar fares"}
			/>
		)
	}
  
  return (
    <div className='pt-4'>
			<Row>
				<Col sm={2} >
					<Card className='filter-flight'>
						<Card.Header className='filter-flight-header'>
							FILTER
						</Card.Header>
						<Card.Body className='filter-flight-body'>
							<Form.Check 
								type={'checkbox'}
								id={`hide-non-refundable`}
								label={`Hide Non-Refundable Flights`}
							/>
							<Form.Check 
								type={'checkbox'}
								id={`combine-multiple-airlines`}
								label={`Combine Multiple Airlines`}
							/>

							<Card className='mt-3 filter-card-flight'>
								<p>{moment(flightInfo.departure_date).format("DD MMM YYYY")} ({flightInfo.origin.code} - {flightInfo.destination.code})</p>
								<div className='mt-2'>
									<p>DEPARTURE TIME:</p>
									<div className='d-flex align-items-center alignt-content-center justify-content-between'>
										<TimeSelect
											value={'06:30'}
											onChange={() => {}}
										/>
										<p>to</p>
										<TimeSelect
											value={'15:30'}
											onChange={() => {}}
										/>
									</div>
								</div>
								<div className='mt-2'>
									<p>ARRIVAL TIME:</p>
									<div className='d-flex align-items-center alignt-content-center justify-content-between'>
										<TimeSelect
											value={'06:30'}
											onChange={() => {}}
										/>
										<p>to</p>
										<TimeSelect
											value={'15:30'}
											onChange={() => {}}
										/>
									</div>
								</div>
							</Card>

							<Card className='mt-3 filter-card-flight'>
								<p>{moment(flightInfo.departure_date).format("DD MMM YYYY")} ({flightInfo.destination.code} - {flightInfo.origin.code})</p>
								<div className='mt-2'>
									<p>DEPARTURE TIME:</p>
									<div className='d-flex align-items-center alignt-content-center justify-content-between'>
										<TimeSelect
											value={'06:30'}
											onChange={() => {}}
										/>
										<p>to</p>
										<TimeSelect
											value={'15:30'}
											onChange={() => {}}
										/>
									</div>
								</div>
								<div className='mt-2'>
									<p>ARRIVAL TIME:</p>
									<div className='d-flex align-items-center alignt-content-center justify-content-between'>
										<TimeSelect
											value={'06:30'}
											onChange={() => {}}
										/>
										<p>to</p>
										<TimeSelect
											value={'15:30'}
											onChange={() => {}}
										/>
									</div>
								</div>
							</Card>

							<div className='mb-3'>
								<p>STOPS</p>
								<Form.Check 
									type={'checkbox'}
									id={`hide-non-refundable`}
									label={`Hide Non-Refundable Flights`}
								/>
								<Form.Check 
									type={'checkbox'}
									id={`combine-multiple-airlines`}
									label={`Combine Multiple Airlines`}
								/>
							</div>

							<div>
								<p>AIRLINES</p>
								<Form.Check 
									type={'checkbox'}
									id={`hide-non-refundable`}
									label={`Hide Non-Refundable Flights`}
								/>
								<Form.Check 
									type={'checkbox'}
									id={`combine-multiple-airlines`}
									label={`Combine Multiple Airlines`}
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={10}>
					<Row>
						<Col sm={8}>
							<p className='trip-detail'>{
								viewBy === 'fares'
								? (<>
									{flightInfo.origin.city} 
									<i className='fas fa-arrow-right mx-1'></i> 
									{flightInfo.destination.city} 
									<i className='fas fa-arrow-right mx-1'></i> 
									{flightInfo.origin.city}
								</>)
								:`${flightInfo.origin.city} - ${flightInfo.destination.city}`
							}</p>
							<div className='trip-info'>
								<p>Prices are per adult, include tax and fees</p>
								<a 
									onClick={() => setShowCalendarFares(true)}
								className='btn-flight-link'>See calendar fares</a>
							</div>
							<div className='trip-sort-by'>
								<p>SORT BY :</p>
								<p>Travel policy - most compliant</p>
								<p>Travel duration</p>
								<p>Price</p>
							</div>
						</Col>
						<Col sm={4}>
							<div className='view-flight-options d-flex justify-content-end align-items-center'>
									<Button 
										variant="secondary" 
										className={`btn-fares ${viewBy === "fares" && 'active'}`}
										onClick={() => setViewBy('fares')}
									>View By Fares</Button>
									<Button 
										variant="secondary"
										className={`btn-schedule ${viewBy === "schedule" && 'active'}`}
										onClick={() => setViewBy('schedule')}
									>View By Schedule</Button>
							</div>
						</Col>
					</Row>
					<div className='mt-3'>
						{
							data.map((d,i) => {
								return (
									<>
										<FlightCard key={i} data={d} viewBy={viewBy} handleSelectTab={handleSelectTab} tripType={tripType} />
										{
											i === 1 && <img src={AdsImage} width="100%" style={{marginBottom: "1rem"}}/>
										}
									</>
								)
							})
						}
					</div>
				</Col>
			</Row>
			<Calendarfares/>
    </div>
  )
}

export default FlightList