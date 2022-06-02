import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import { Tab, Tabs, Form, Accordion, Card, Button } from 'react-bootstrap'
import Routes from 'views/extranet/components/micro-components/routes'
import TripDateRoundtrip from './components/trip_date_roundtrip'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripFlightClass from './components/trip_flight_class'
import TripCorporate from './components/trip_corporate'
import TripMultitripSingle from './components/trip_multitrip_single'

function ShoppingCacheCreate(props) {
  const dispatch = useDispatch()
  const [flightType, setFlightType] = useState("roundtrip")

  useEffect(async () => {
    // let formId = showCreateModal.id || props.id

    let docTitle = "Edit Shopping Criteria"
    // if (!formId) {
      docTitle = "Add Shopping Criteria"
    // } else if (isView) {
    //   docTitle = "Exchange Rate Details"
    // }

    dispatch(setModalTitle(docTitle))

    // if(formId) {
    //   try {
    //     let {data} = await API.get(endpoint + "/" + formId)
    //     setFormValues({
    //       ...data,
    //       from_currency_id: {
    //         value: data.from_currency.id,
    //         label: data.from_currency.currency_name,
    //       },
    //       to_currency_id: {
    //         value: data.to_currency.id,
    //         label: data.to_currency.currency_name,
    //       }
    //     })
    //   } catch(e) {
    //     console.log(e)
    //   }
    // }
  }, [])

  const airports = [
    {
      name: "Jakarta, Indonesia",
      city: "Jakarta",
      code: "JKT",
      all: "All Airports"
    },
    { 
      name: "Soekarno-Hatta Intl",
      city: "Jakarta",
      country: "Indonesia",
      code: "CGK",
      city_code: "JKT",
    },
    { 
      name: "Halim Perdana Kusuma",
      city: "Jakarta",
      country: "Indonesia",
      code: "HLP",
      city_code: "JKT",
    },
    {
      name: "Singapore, Singapore",
      city: "Singapore",
      code: "SIN",
      all: "All Airports"
    },
    { 
      name: "Singapore Changi Airport",
      city: "Singapore",
      country: "Singapore",
      code: "SIN",
      city_code: "SIN",
    },
  ]

  return (
    <>
      <Tabs 
        id='shopping-cache-trip-types'
        activeKey={flightType}
        onSelect={(k) => {
          setFlightType(k)
        }}
        className={`mb-4 flight-book-tabs`}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab
          eventKey="roundtrip"
          title="Roundtrip"
        >
          <div className='d-flex flex-wrap'>
            <Routes smallSize={true} airports={airports}/>
            <TripDateRoundtrip smallSize={true} />
            <Travellers smallSize={true} />
            <TripFlightClass smallSize={true} />
            <TripCorporate smallSize={true} />
          </div>
          
        </Tab>
        <Tab
          eventKey="oneway"
          title="One Way"
        ></Tab>
        <Tab
          eventKey="multi city"
          title="Multi City"
        >
          <TripMultitripSingle />
        </Tab>
      </Tabs>
    </>
  )
}

export default withRouter(ShoppingCacheCreate)