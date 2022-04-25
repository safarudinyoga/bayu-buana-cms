import { Col, Row, Card, Form, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import FlightCard from './components/FlightCard'
import Select, {components} from "react-select"
import arrowdownIcon from "assets/icons/arrow-down.svg"

function FlightList() {
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
								<p>12 Dec 2020 (CGK - HKG)</p>
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
								<p>12 Dec 2020 (CGK - HKG)</p>
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
							<p className='trip-detail'>JAKARTA - HONGKONG - JAKARTA</p>
							<div className='trip-info'>
								<p>Prices are per adult, include tax and fees</p>
								<p>See calendar fares</p>
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
							Array.apply(null, {length: 5}).map((i) => {
								return (
									<FlightCard key={i}/>
								)
							})
						}
					</div>
				</Col>
			</Row>
    </div>
  )
}

export default FlightList