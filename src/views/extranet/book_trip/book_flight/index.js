import { Alert, Col, Tab, Tabs, Row, Button, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import Api from "config/api"
import './book_flight.css'
import Select, {components, StylesConfig} from "react-select"

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
	let api = new Api()
	const [selectLanguage, setSelectLanguage] = useState([])
	const [selectCurrencies, setSelectCurrencies] = useState([])

	// const image = (backgroundImage = "") => ({
	// 	alignItems: 'center',
	// 	display: 'flex',
	  
	// 	':before': {
	// 	  backgroundImage: url(backgroundImage),
	// 	  borderRadius: 10,
	// 	  content: '" "',
	// 	  display: 'block',
	// 	  marginRight: 8,
	// 	  height: 10,
	// 	  width: 10,
	// 	},
	//   });

	useEffect(async () => {
		try {
		  let res = await api.get("/master/languages?size=10")
		  console.log(res, "hahahah")
		  const options = []
		  res.data.items.forEach((data) => {
			options.push({
			  image: data.language_asset.multimedia_description.url,
			  label: data.language_code,
			  value: data.language_name,
			})
			setSelectLanguage(options)
		  })
		  console.log(selectLanguage, "cobaaak")
		} catch (e) {}
	}, [])

	useEffect(async () => {
		try {
		  let res = await api.get("/master/currencies?size=10")
		  console.log(res, "ehheheh")
		  const options = []
		  res.data.items.forEach((data) => {
			options.push({
			  label: data.currency_code,
			  value: data.currency_name,
			})
			setSelectCurrencies(options)
		  })
		} catch (e) {}
	}, [])

	
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
						<Row>
							<Col>
							<Select
								options={selectLanguage}
								label="Language"
								className="selectLanguage"
								theme={(theme) => ({
								...theme,
								borderRadius: 0,
								})}
							/> 
							</Col>
							<Col>
							<Select
								options={selectCurrencies}
								label="Currency"
								className="selectCurrencies"
								theme={(theme) => ({
								...theme,
								borderRadius: 0,
								})}
							/>
							</Col>
						</Row>
					</Col>
				</Row>
				{
					showInfo &&
						<Alert variant="secondary" onClose={() => setShowInfo(false)} className="notice-alert" dismissible>
							Important Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Alert>
				}
        <Tabs defaultActiveKey="select-flight" id="uncontrolled-tab-example" className="book-trip-tabs">
					<Tab eventKey="select-flight" title="Select Flight" tabClassName="book-trip-tab-link">
						haii
					</Tab>
					<Tab eventKey="passengers" title="Passengers" tabClassName="book-trip-tab-link">
						haii
					</Tab>
					<Tab eventKey="select-seats" title="Select Seats" tabClassName="book-trip-tab-link">
						haii
					</Tab>
					<Tab eventKey="add-ons" title="Add Ons" tabClassName="book-trip-tab-link">
						haii
					</Tab>
					<Tab eventKey="review" title="Review" tabClassName="book-trip-tab-link">
						haii
					</Tab>
					<Tab eventKey="confirmation" title="Confirmation" tabClassName="book-trip-tab-link">
						haii
					</Tab>
        </Tabs>
    </div>
  )
}

export default BookFlight