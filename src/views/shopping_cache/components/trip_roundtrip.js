import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripCorporate from './trip_corporate'
import TripDateRoundtrip from './trip_date_roundtrip'
import TripFlightClass from './trip_flight_class'
import * as Yup from "yup"
import { Form, Button } from 'react-bootstrap'
import CancelButton from 'components/button/cancel'
import { useDispatch } from 'react-redux'
import { setModalTitle, setCreateModal } from "redux/ui-store"
import Api from "config/api"

const TripRoundtrip = (props) => {
  const dispatch = useDispatch()
  let api = new Api()

  const [criteria, setCriteria] = useState({
    arrival_datetime: "",
    departure_datetime: "",
    destination_airport_id: "",
    destination_city_id: "",
    origin_airport_id: "",
    origin_city_id: "",
  })

  const initialValues = {
    departure_data: "",
    arrival_data: "",
    departure_datetime: new Date(),
    arrival_datetime: new Date(),
    number_of_adults: 1,
    number_of_children: 0,
    number_of_infants: 0,
    cabin_type_id: "",
    corporate_id: "",
  }

  const validationSchema = Yup.object().shape({
    departure_data: Yup.object().required("Departing from city or airport is required."),
    arrival_data: Yup.object().required("Arriving to city or airport is required."),
    departure_datetime: Yup.string().required("Depart Time is required"),
    arrival_datetime: Yup.string().required("Arrival Time is required"),
    number_of_adults: Yup.number().required(),
    number_of_children: Yup.number().required(),
    number_of_infants: Yup.number().required(),
    cabin_type_id: Yup.string().notRequired(),
    corporate_id: Yup.string().notRequired(),
  })

  // const initialValues = {
  //   cache_air_origin_destination_criteria: [
  //     {
  //       administrative_city_id: "",
  //       airport_id: "",
  //       arrival_datetime: new Date(),
  //       city_id: "",
  //       departure_datetime: new Date(),
  //       dest_administrative_city_id: "",
  //       dest_airport_id: "",
  //       dest_city_id: "",
  //       dest_zone_id: "",
  //       destination_airport_id: "",
  //       destination_city_id: "",
  //       destination_location: "",
  //       index_number: 1,
  //       origin_airport_id: "",
  //       origin_city_id: "",
  //       origin_location: "",
  //       zone_id: "",
  //     }
  //   ],
  //   cache_air_travel_preference_criteria: {
  //     number_of_adults: 1,
  //     number_of_children: 0,
  //     number_of_infants: 0,
  //   },
  //   cache_air_travel_criteria: {
  //     number_of_adults: 1,
  //     number_of_children: 0,
  //     number_of_infants: 0,
  //   },
  //   cache_guest_criteria: {
  //     number_of_adults: 1,
  //     number_of_children: 0,
  //     number_of_infants: 0,
  //   },
  //   cache_room_stay_criteria: {
  //     administrative_city_id: "",
  //     airport_id: "",
  //     attraction_id: "",
  //     checkin: "",
  //     checkout: "",
  //     city_id: "",
  //     destination_city_id: "",
  //     destination_hotel_id: "",
  //     destination_id: "",
  //     destination_location: "",
  //     hotel_id: "",
  //     index_number: 1,
  //     zone_id: ""
  //   },
  //   corporate_id: "",
  //   currency_id: "",
  //   language_id: "",
  //   trip_type_id: "",
  // }

  // const validationSchema = Yup.object().shape({
  //   cache_air_origin_destination_criteria: Yup.array().of(
  //     Yup.object().shape({
  //       administrative_city_id: Yup.string().notRequired(),
  //       airport_id: Yup.string(),
  //       arrival_datetime: Yup.string().required(),
  //       city_id: Yup.string().required(),
  //       departure_datetime: Yup.string().required(),
  //       dest_administrative_city_id: Yup.string().notRequired(),
  //       dest_airport_id: Yup.string(),
  //       dest_city_id: Yup.string(),
  //       dest_zone_id: Yup.string(),
  //       destination_airport_id: Yup.string(),
  //       destination_city_id: Yup.string(),
  //       destination_location: Yup.string(),
  //       index_number: Yup.number(),
  //       origin_airport_id: Yup.string(),
  //       origin_city_id: Yup.string(),
  //       origin_location: Yup.string(),
  //       zone_id: Yup.string(),
  //     })
  //   ),
  //   cache_air_travel_preference_criteria: Yup.object().shape({
  //     number_of_adults: Yup.number().min(1).max(9),
  //     number_of_children: Yup.number().min(0).max(8),
  //     number_of_infants: Yup.number().min(0).max(8),
  //   }),
  //   cache_air_travel_criteria: Yup.object().shape({
  //     number_of_adults: Yup.number().min(1).max(9),
  //     number_of_children: Yup.number().min(0).max(8),
  //     number_of_infants: Yup.number().min(0).max(8),
  //   }),
  //   cache_guest_criteria: Yup.object().shape({
  //     number_of_adults: Yup.number().min(1).max(9),
  //     number_of_children: Yup.number().min(0).max(8),
  //     number_of_infants: Yup.number().min(0).max(8),
  //   }),
  //   cache_room_stay_criteria: Yup.object().shape({
  //     administrative_city_id: Yup.string(),
  //     airport_id: Yup.string(),
  //     attraction_id: Yup.string(),
  //     checkin: Yup.string(),
  //     checkout: Yup.string(),
  //     city_id: Yup.string(),
  //     destination_city_id: Yup.string(),
  //     destination_hotel_id: Yup.string(),
  //     destination_id: Yup.string(),
  //     destination_location: Yup.string(),
  //     hotel_id: Yup.string(),
  //     index_number: Yup.number(),
  //     zone_id: Yup.string()
  //   }),
  //   corporate_id: Yup.string(),
  //   currency_id: Yup.string(),
  //   language_id: Yup.string(),
  //   trip_type_id: Yup.string(),
  // })

  useEffect(() => {
    console.log(criteria)
    if (props.handleCacheData){
      props.handleCacheData("cache_air_origin_destination_criteria",[criteria])
    }
  }, [criteria])
  
  const onSubmit = async (values, a) => {
    console.log("VALUES", values)

    let payload = {
      cache_air_origin_destination_criteria: [
        {
          administrative_city_id: "",
          airport_id: values.departure_data.airport_id,
          arrival_datetime: values.arrival_datetime,
          city_id: values.departure_data.city_id,
          departure_datetime: values.departure_datetime,
          dest_administrative_city_id: "",
          dest_airport_id: values.arrival_data.airport_id,
          dest_city_id: values.arrival_data.city_id,
          dest_zone_id: "",
          destination_airport_id: values.arrival_data.airport_id,
          destination_city_id: values.arrival_data.city_id,
          destination_location: values.arrival_data.city,
          index_number: 1,
          origin_airport_id: values.departure_data.airport_id,
          origin_city_id: values.departure_data.city_id,
          origin_location: values.departure_data.city,
          zone_id: "",
        }
      ],
      cache_air_travel_preference_criteria: {
        cabin_type_id: "",
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
      },
      cache_air_travel_criteria: {
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
      },
      cache_guest_criteria: {
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
      },
      cache_room_stay_criteria: {
        administrative_city_id: "",
        airport_id: values.departure_data.airport_id,
        attraction_id: "",
        checkin: "",
        checkout: "",
        city_id: values.departure_data.city_id,
        destination_city_id: values.arrival_data.city_id,
        destination_hotel_id: "",
        destination_id: "",
        destination_location: "",
        hotel_id: "",
        index_number: 1,
        zone_id: ""
      },
      corporate_id: "",
      currency_id: "",
      language_id: "",
      trip_type_id: "3234761b-3fd2-4fd0-ba48-3742ffd3e7cb",
    }

    let res = await api.post("master/cache-criteria/flights", payload)
    console.log(res)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          values,
          touched,
          handleSubmit,
          isSubmiting,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap">
              <Routes 
                smallSize={true} 
                airports={props.airports} 
                formik={{errors, touched, setFieldValue}} 
              />
              <TripDateRoundtrip smallSize={true} formik={{errors, touched, setFieldValue}} />
              <Travellers smallSize={true} formik={{errors, touched, setFieldValue}} />
              <TripFlightClass smallSize={true} formik={{errors, touched, setFieldValue}} />
              <TripCorporate smallSize={true} formik={{errors, touched, setFieldValue}} />                                                    
            </div>

            <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
            </div>
          </Form>
        )}
      </Formik>
      {/* <Routes smallSize={true} airports={props.airports} formik={{errors, touched, setFieldValue}} handleCriteriaChange={handleCriteriaChange} /> */}
      {/* <TripDateRoundtrip smallSize={true} handleCriteriaChange={handleCriteriaChange} />

      <Travellers smallSize={true} handleCacheData={props.handleCacheData} />
      <TripFlightClass smallSize={true} />
      <TripCorporate smallSize={true} /> */}
    </>
  )
}

export default TripRoundtrip