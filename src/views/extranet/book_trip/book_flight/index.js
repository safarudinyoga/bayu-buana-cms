import { Alert, Col, Tab, Tabs, Row, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import './book_flight.css'

function BookFlight() {
  const dispatch = useDispatch()
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
	const [showInfo, setShowInfo] = useState(true)

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
  
  return (
    <div className='mt-2'>
				<Row>
					<Col sm={5}>
						<p>{data.origin.city.toUpperCase()} ({data.origin.code}) TO {data.destination.city.toUpperCase()} ({data.destination.code}) - {data.trip}</p>
						<Row>
							<Col sm={6}>
								<p>{data.departure_date.toUpperCase()} - {data.return_date.toUpperCase()}</p>
							</Col>
							<Col sm={2}> 2 Adults</Col>
							<Col sm={4}>
								<Button variant="secondary" className='px-4'>Modify</Button>
							</Col>
						</Row>

					</Col>
					{/* Select currency and language */}
					<Col sm={{span: 2, offset: 5}}>
						<p>Select currency and language</p>
					</Col>
				</Row>
				{
					showInfo &&
						<Alert variant="secondary" onClose={() => setShowInfo(false)} className="notice-alert" dismissible>
							Important Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Alert>
				}
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="book-trip-tabs">
					<Tab eventKey="home" title="Home">
						haii
					</Tab>
					<Tab eventKey="profile" title="Profile">
					</Tab>
					<Tab eventKey="contact" title="Contact" disabled>
					</Tab>
        </Tabs>
    </div>
  )
}

export default BookFlight