import { FieldArray, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripCorporate from './trip_corporate'
import TripDateRoundtrip from './trip_date_roundtrip'
import TripFlightClass from './trip_flight_class'
import TripMultitripSingle from './trip_multitrip_single'
import * as Yup from "yup"

import { Form, Button } from 'react-bootstrap'
import CancelButton from 'components/button/cancel'
import { setModalTitle, setCreateModal } from "redux/ui-store"
import { useDispatch } from 'react-redux'
import Api from 'config/api'

function TripMultitrip(props) {
  const { airports, handleTrip  } = props
  const [trips, setTrips] = useState([])
  const dispatch = useDispatch()
  let api = new Api

  // useEffect(() => {
  //   setTrips([...trips, <TripMultitripSingle airports={props.airports} />, <TripMultitripSingle airports={props.airports}  />])
  // }, [])

  // const handleAddTrip = () => {
  //   setTrips([...trips, <TripMultitripSingle airports={props.airports}  />])
  // }

  const initialValues = {
    trips: [
      {
        depart_time: new Date(),
        return_time: new Date(),
        departure_data: "",
        arrival_data: ""
      }
    ]
  }

  const validationSchema = Yup.object().shape({
    trips: Yup.array().of(
      Yup.object().shape({
        depart_time: Yup.string().required("Depart Time is required"),
        return_time: Yup.string().required("Return Time is required"),
        departure_data: Yup.object().required("Departing from city or airport is required."),
        arrival_data: Yup.object().required("Arriving to city or airport is required."),
      })
    )
  })

  const [departTime, setDepartTime] = useState({ 0: new Date() })
  const [returnTime, setReturnTime] = useState({ 0: new Date() })

  const onSubmit = async (values, a) => {
    console.log("VALUES", values)

    let cacheAirCriteria = []

    if(values.trips && values.trips.length > 0) {
      values.trips.map((trip, index) => (
        console.log("TRIP", trip)
        // cacheAirCriteria.push(
        //   {
        //     administrative_city_id: trip.departure_data.city_id,
        //     airport_id: values.departure_data.airport_id,
        //     arrival_datetime: values.arrival_datetime,
        //     city_id: values.departure_data.city_id,
        //     departure_datetime: values.departure_datetime,
        //     dest_administrative_city_id: "00000000-0000-0000-0000-000000000000",
        //     dest_airport_id: values.arrival_data.airport_id,
        //     dest_city_id: values.arrival_data.city_id,
        //     dest_zone_id: "00000000-0000-0000-0000-000000000000",
        //     destination_airport_id: values.arrival_data.airport_id,
        //     destination_city_id: values.arrival_data.city_id,
        //     destination_location: values.arrival_data.city,
        //     index_number: 1,
        //     origin_airport_id: values.departure_data.airport_id,
        //     origin_city_id: values.departure_data.city_id,
        //     origin_location: values.departure_data.city,
        //     zone_id: "00000000-0000-0000-0000-000000000000",
        //   }
        // )
      ))
    }

    let payload = {
      cache_air_origin_destination_criteria: cacheAirCriteria,
      cache_air_travel_preference_criteria: {
        cabin_type_id: "00000000-0000-0000-0000-000000000000",
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
        administrative_city_id: values.departure_data.city_id,
        airport_id: values.departure_data.airport_id,
        attraction_id: "00000000-0000-0000-0000-000000000000",
        checkin: "",
        checkout: "",
        city_id: values.departure_data.city_id,
        destination_city_id: values.arrival_data.city_id,
        destination_hotel_id: "00000000-0000-0000-0000-000000000000",
        destination_id: "00000000-0000-0000-0000-000000000000",
        destination_location: "",
        hotel_id: "00000000-0000-0000-0000-000000000000",
        index_number: 1,
        zone_id: "00000000-0000-0000-0000-000000000000"
      },
      corporate_id: "00000000-0000-0000-0000-000000000000",
      currency_id: "00000000-0000-0000-0000-000000000000",
      language_id: "00000000-0000-0000-0000-000000000000",
      trip_type_id: "dd3254b3-719b-43f4-b45c-11a99727cf06",
    }

    // let res = await api.post("master/cache-criterias/flights", payload)
    // console.log(res)
  }
  

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, values, touched, handleSubmit, isSubmitting, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray 
              name='trips'
              render={arrayHelpers => (
                <>
                  {
                    values.trips && values.trips.length > 0 ? (
                      values.trips.map((trip, index) => (
                        <>
                          <div key={index} className="d-flex flex-wrap mb-2 col-12">
                            <Routes index={index} airports={airports} formik={{errors, touched, setFieldValue, values}} />

                            <div className="mr-4">
                              <TripDateRoundtrip smallSize={true} formik={{errors, touched, setFieldValue}} />
                            </div>
                          </div>
                        </>
                      ))
                    ) : ""
                    
                  }
                  <Button
                    onClick={() => arrayHelpers.push({depart_time: "", departure_data: "", arrival_data: ""})}
                    className="mb-4"
                  >
                    Add New
                  </Button>
                  <div className='d-flex'>
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
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </>
  )
}

export default TripMultitrip