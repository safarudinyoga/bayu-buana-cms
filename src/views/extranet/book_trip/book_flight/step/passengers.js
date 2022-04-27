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

function Passenger({handleSelectTab}) {
  const dispatch = useDispatch()
	const [viewBy, setViewBy] = useState('fares')
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

    const FlightDetail = () => (
        <div>
            <Row>
                <Col sm={11}>

                    <p>JAKARTA <i class="fas fa-arrow-right"></i> Hongkong</p>
                    <Row>
                        <div className='transit-wrapper'>
                            <div className='links'>
                                <p className='transit-info'>Transit 1h 50m in Singapore (SIN)</p>
                            </div>
                        </div>
                    </Row>
                </Col>
                <Col sm={1}>
                <Button variant="secondary" onClick={() => handleSelectTab('select-flight')}>CHANGE</Button>
                </Col>
            </Row>
        </div>
    )
  
    return (
    <div className='pt-4'>
        <p className='trip-txt-header'>REVIEW YOUR TRIP</p>
        <Card className="passengers-flight-detail">
            <FlightDetail/>
            <div className='border-dotted'></div>
            <FlightDetail/>
        </Card>
        <Button variant="secondary" onClick={() => handleSelectTab('select-flight')}>Back</Button>
    </div>
  )
}

export default Passenger