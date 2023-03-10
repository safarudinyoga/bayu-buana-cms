import { Alert, Col, Tab, Tabs, Row, Button, Nav } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import Api from "config/api"
import './book_flight.css'
import Select, {components} from "react-select"
// import {OverlayTrigger, Tooltip} from "react-bootstrap"
import FlightList from './step/select_flight'
import Passenger from './step/passengers'
import SelectSeat from './step/select_seats'
import AddOn from './step/add_ons'
import Review from './step/review'
import Confirmation from './step/confirmation'
import useQuery from "lib/query"

import BBModal from 'components/Modal/bb-modal'
import FlightBookSuggest from '../../components/flight_book-autosuggest'

function BookFlight() {
  const dispatch = useDispatch()
	let currentKey = useQuery().get("key") || "1"

	const [flight, setFLight] = useState({
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
	const [tabKey, setTabKey] = useState(currentKey)
	const [showFlightModal, setShowFlightModal] = useState(false)

	const customControlStyles = base => ({
		width: 180,
		zIndex: 99999
	});

	const menuHeaderStyle = {
		padding: '8px 12px',
		color: 'black',
	};

	const MenuListLanguage = ({...props}) => {
		return (
			<components.MenuList {...props}>
			  <div style={menuHeaderStyle}>Select your language</div>
			  {props.children}
			</components.MenuList>
		);
	}

	const MenuListCurrency = ({...props}) => {
		return (
			<components.MenuList{...props}>
			  <div style={menuHeaderStyle}>Select your currency</div>
			  {props.children}
			</components.MenuList>
		);
	}
	
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
		  const options = []
		  res.data.items.forEach((data) => {
			options.push({
			  image: data.language_asset.multimedia_description.url,
			  label: data.language_code,
			  value: data.language_name,
			})
			setSelectLanguage(options)
		  })
		} catch (e) {}
	}, [])

	useEffect(async () => {
		try {
		  let res = await api.get("/master/currencies?size=10")
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
			setFLight({
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
  
	const onChangeTab = (key) => {
		setTabKey(key)
	} 

	const FLightModal = () => {
		return (
			<BBModal
				show={showFlightModal}
				onClick={() => setShowFlightModal(false)}
				modalSize={"lg"}
				scrollable={true}
				modalContent={() => (
					<FlightBookSuggest />
				)}
			/>
		)
	}
  return (
    <div className='mt-2'>
		<Row className='mb-3'>
			<Col sm={5}>
			{
				tabKey === "1" && <>
					<p>{flight.origin.city.toUpperCase()} ({flight.origin.code}) TO {flight.destination.city.toUpperCase()} ({flight.destination.code}) - {flight.trip}</p>
					<Row className='align-items-center'>
						<Col sm={6}>
							<p className='mb-0'>{flight.departure_date.toUpperCase()} - {flight.return_date.toUpperCase()}</p>
						</Col>
						<Col sm={2}> 2 Adults</Col>
						<Col sm={4}>
							<Button variant="secondary" className='px-4' onClick={() => setShowFlightModal(true)}>Modify</Button>
						</Col>
					</Row>
				</>
			}

			</Col>
			{/* Select currency and language */}
			<Col sm={{span: 3, offset: 4}}>
						<Row>
							{/* <Col> */}
							{/* <OverlayTrigger
								placement="bottom"
								overlay={<Tooltip>Choose your language</Tooltip>}
							> */}
							<Select
								defaultValue={selectLanguage}
								options={selectLanguage}
								components={{
									MenuList: MenuListLanguage,
									DropdownIndicator: () => null,
									IndicatorSeparator: () => null,
								}}
								formatOptionLabel={(language, opt) => (
									<div className="selectLanguage">
									  <img 
									  	src={language.image} 
										alt="language-image"
										className="language-image"
									  />
									  {opt.context === "menu" && <span className='language-value'>{language.value}</span>}
									  
									</div>
								)}
								label="Language"
								styles={{
									control: customControlStyles,
									input: () => ({
										width: 90
									}),
								}}
							/> 
							{/* </OverlayTrigger> */}
							
							{/* </Col>
							<Col> */}
							{/* <OverlayTrigger
								placement="bottom"
								overlay={<Tooltip>Choose your currency</Tooltip>}
							> */}
							<Select
								defaultValue={selectCurrencies}
								options={selectCurrencies}
								components={{
									MenuList: MenuListLanguage,
									DropdownIndicator: () => null,
									IndicatorSeparator: () => null,
								}}
								label="Currency"
								className="selectCurrencies"
								formatOptionLabel={(currency, opt) => (
									<div className="selectCurrencies">
									  <span className='currencies-label'>{currency.label}</span>
									  {opt.context === "menu" && <span className='currencies-value'>{currency.value}</span>}
									</div>
								)}
								styles={{
									control: customControlStyles,
									input: () => ({
										width: 90,
									})
								}}
							/>
							{/* </OverlayTrigger> */}
							{/* </Col> */}
						</Row>
					</Col>

		</Row>
		{
			showInfo &&
				<Alert variant="secondary" onClose={() => setShowInfo(false)} className="notice-alert" dismissible>
					Important Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</Alert>
		}
		<Tab.Container
			defaultActiveKey={"1"} 
			activeKey={tabKey} 
			onSelect={(k) => {
				console.log(k)
				if(k < tabKey && tabKey !== "6") {
					onChangeTab(k)
				}
			}}
		>
      <Nav variant="tabs" className="flex justify-content-between align-item-center flex-wrap flight-step-tabs">
        <Nav.Item className={tabKey > "1" ? "done":""}>
          <Nav.Link eventKey="1">
					Select Flight
					</Nav.Link>
					<div className={tabKey === "1" ? 'arrow-right':""}></div>
        </Nav.Item>
        <Nav.Item className={tabKey > "2" ? "done":""}>
          <Nav.Link eventKey="2">Passengers</Nav.Link>
					<div className={tabKey === "2" ? 'arrow-right':""}></div>
        </Nav.Item>
        <Nav.Item className={tabKey > "3" ? "done":""}>
          <Nav.Link eventKey="3">Select Seats</Nav.Link>
					<div className={tabKey === "3" ? 'arrow-right':""}></div>
        </Nav.Item>
        <Nav.Item className={tabKey > "4" ? "done":""}>
          <Nav.Link eventKey="4">Add Ons</Nav.Link>
					<div className={tabKey === "4" ? 'arrow-right':""}></div>
        </Nav.Item>
        <Nav.Item className={tabKey > "5" ? "done":""}>
          <Nav.Link eventKey="5">Review</Nav.Link>
					<div className={tabKey === "5" ? 'arrow-right':""}></div>
        </Nav.Item>
        <Nav.Item className={tabKey === "6" ? "done":""}>
          <Nav.Link eventKey="6">Confirmation</Nav.Link>
        </Nav.Item>
      </Nav>
			<Tab.Content>
				<Tab.Pane eventKey="1">
					<FlightList
						key={"1"}
						handleSelectTab={(v) => onChangeTab(v)}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="2">
					<Passenger
						key={"2"}
						handleSelectTab={(v) => onChangeTab(v)}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="3">
					<SelectSeat
						key={"3"}
						handleSelectTab={(v) => onChangeTab(v)}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="4">
					<AddOn
						key={"4"}
						handleSelectTab={(v) => onChangeTab(v)}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="5">
					<Review
						key={"5"}
						handleSelectTab={(v) => onChangeTab(v)}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="6">
					<Confirmation
						key={"6"}
						handleSelectTab={(v) => onChangeTab(v)}
					/>
				</Tab.Pane>
			</Tab.Content>
    </Tab.Container>

		<FLightModal/>
    </div>
  )
}

export default BookFlight