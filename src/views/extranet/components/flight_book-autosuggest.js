import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Form, Accordion, Card, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import { useHistory } from 'react-router';

import Roundtrip from './micro-components/roundtrip';
import Oneway from './micro-components/oneway';
import FlightPref from './micro-components/flight_pref';
import MultiTrip from './micro-components/multi_trip';
import Api from "config/api"
import { Formik } from 'formik';
import * as Yup from "yup"


const FlightBook = (props) => {
  let api = new Api()

  const history = useHistory()
  const [flightType, setFlightType] = useState("roundtrip")
  const [airports, setAirports] = useState([])
  const [tripData, setTripData] = useState({
    trip_type_code: "roundtrip"
  })
  const [onewayData, setOnewayData] = useState({
    trip_type_code: "oneway"
  })

  const initialValues = {
    depart_time: "",
    return_time: "",
    departure_data: "",
    arrival_data: "",
    adult_count: 1,
    children_count: 0,
    infant_count: 0,
  }

  

  const validationSchema = Yup.object().shape({
    depart_time: Yup.string().required("Depart Time is required"),
    return_time: Yup.string().required("Return Time is required"),
    departure_data: Yup.object().required("Departing from city or airport is required."),
    arrival_data: Yup.object().required("Arriving to city or airport is required."),
    adult_count: Yup.number(),
    children_count: Yup.number(),
    infant_count: Yup.number()
  })

  const onewayValidationSchema = Yup.object().shape({
    depart_time: Yup.string().required("Depart Time is required"),
    departure_data: Yup.object().required("Departing from city or airport is required."),
    arrival_data: Yup.object().required("Arriving to city or airport is required."),
    adult_count: Yup.number(),
    children_count: Yup.number(),
    infant_count: Yup.number()
  })

  useEffect(async () => {
    try {
      let res = await api.get("/master/airports?size=-1")
      let airportDataArr = []

      res.data.items.map(async (item, i) => {
        let country = item.city ? await api.get(`/master/countries/${item.city.country_id}`) : ""

        let airportData = {}
        if(item.city){
          airportData = {
            name: item.airport_name,
            code: item.airport_code, 
            city: item.city ? item.city.city_name : "",
            city_code: item.city ? item.city.city_code : "",
            country: country.data ? country.data.country_name : "",
            airport_id: item.id,
            city_id: item.city_id
          }
          airportDataArr.push(airportData)
        }
      })
      setAirports(airportDataArr)
    } catch (error) {
      
    }
  }, [])

  const handleSearch = async (values, a) => {
    console.log("MASUK KESINI", values)

    let formatted = {
      is_personal_trip: props.personalTrip,
      trip_type_code: tripData.trip_type_code,
      flights: [
        {
          departure_city_code: tripData.departure_data.city_code ? tripData.departure_data.city_code : tripData.departure_data.code,
          departure_airport_code: tripData.departure_data.code,
          arrival_city_code: tripData.arrival_data.city_code ? tripData.arrival_data.city_code : tripData.arrival_data.code,
          arrival_airport_code: tripData.arrival_data.code,
          departure_date: tripData.depart_time,
          return_date: tripData.return_time
        }
      ],
      adults: tripData.adult_count ? tripData.adult_count : 1, 
      children:  tripData.children_count ? tripData.children_count : 0,
      infant: tripData.infant_count ? tripData.infant_count : 0,
    }

    try {
      // let res = await api.post("integration/flight/search", formatted)
      // openSnackbar(
      //   `Your profile has been successfully updated.`
      // )
    } catch(e) {}

  }

  const handleTrip = (key, value, append=false) => {
    let trip = {...tripData}

    if(append){
      if(!trip[key]){
        trip[key] = []
      } else {
        trip[key].push(value)
        setTripData(trip)
      }
      
    } else {
      trip[key] = value
      setTripData(trip)
    }
    
  }

  useEffect(() => {
    console.log(tripData)
  }, [tripData])
  

  return (
    <div>
      <Tabs
        id='flight-book-tabs'
        activeKey={flightType}
        onSelect={(k) => {
          setFlightType(k)
          handleTrip("trip_type_code", k)
        }}
        className={`mb-4 flight-book-tabs`}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab
          eventKey="roundtrip"
          title="Roundtrip"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSearch}
            validateOnMount
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              setFieldValue,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Roundtrip handleTrip={handleTrip} formik={{errors, touched, setFieldValue}} airports={airports} />
                <FlightPref />

                <div className='my-3'>
                  <Button 
                    className='text-uppercase btn-extranet' 
                    type="submit"
                    disabled={isSubmitting} 
                  >
                    Search
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          

          
          <div className="recent-search">
            <span className='text-uppercase recent-flight-title ml-2'>Recent Flight Searches</span>
            <span className='ml-4 recent-flight-title recent-flight-clear-all'>Clear all</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="oneway"
          title="One Way"
        >
          <Oneway handleTrip={handleTrip} airports={airports} />
         
          <div className="recent-search">
            <span className='text-uppercase recent-flight-title ml-2'>Recent Flight Searches</span>
            <span className='ml-4 recent-flight-title recent-flight-clear-all'>Clear all</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="multi city"
          title="Multi City"
        >
          <MultiTrip airports={airports} />
          <div className="recent-search">
            <span className='text-uppercase recent-flight-title ml-2'>Recent Flight Searches</span>
            <span className='ml-4 recent-flight-title recent-flight-clear-all'>Clear all</span>
            <div className='flight-pref-container d-flex'>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
              <div className="flight-pref mr-2">
                <span className='flight-pref__route'>CGK - ICN</span>
                <span className='flight-pref__date'>16 OCT - 22 OCT 2020</span>
                <ReactSVG className='ml-1 mr-2 d-inline-block' src='/img/icons/close-circle.svg' />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    
  )
}

export default FlightBook