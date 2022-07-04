import { FieldArray, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Routes from 'views/extranet/components/micro-components/routes'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripCorporate from './trip_corporate'
import TripFlightClass from './trip_flight_class'
import * as Yup from "yup"

import { Form, Button } from 'react-bootstrap'
import CancelButton from 'components/button/cancel'
import { setModalTitle, setCreateModal } from "redux/ui-store"
import { useDispatch } from 'react-redux'
import Api from 'config/api'
import TripRoutes from './trip_routes'
import TripTraveler from './trip_traveler'
import TripDateMultitrip from './trip_date_multitrip'

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
        departure_datetime: new Date(),
        arrival_datetime: new Date(),
        departure_data: "",
        arrival_data: "",
      }
    ],
    cabin_type: "",
    number_of_adults: 1,
    number_of_children: 0,
    number_of_infants: 0,
    corporate_id: "",
  }

  const validationSchema = Yup.object().shape({
    trips: Yup.array().of(
      Yup.object().shape({
        departure_datetime: Yup.string().required("Depart Time is required"),
        arrival_datetime: Yup.string().required("Return Time is required"),
        departure_data: Yup.object().required("Departing from city or airport is required."),
        arrival_data: Yup.object().required("Arriving to city or airport is required."),
      })
    ),
    number_of_adults: Yup.number().required(),
    number_of_children: Yup.number().required(),
    number_of_infants: Yup.number().required(),
    cabin_type: Yup.object().notRequired(),
    corporate_id: Yup.string().notRequired(),
  })

  const [departTime, setDepartTime] = useState({ 0: new Date() })
  const [returnTime, setReturnTime] = useState({ 0: new Date() })

  const onSubmit = async (values, a) => {
    console.log("VALUES", values)

    let cacheAirCriteria = []

    if(values.trips && values.trips.length > 0) {
      values.trips.map((trip, index) => (
        cacheAirCriteria.push(
          {
            arrival_datetime: trip.arrival_datetime,
            departure_datetime: trip.departure_datetime,
            destination_city_id: trip.arrival_data.city_id,
            destination_location: trip.arrival_data.city,
            destination_airport_id: trip.arrival_data.airport_id,
            index_number: index,
            origin_city_id: trip.departure_data.city_id,
            origin_location: trip.departure_data.city,
            origin_airport_id: trip.departure_data.airport_id,
          }
        )
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
        cabin_type_id: values.cabin_type ? values.cabin_type.value : "",
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
      },
      cache_air_travel_criteria: {
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
        seats_requested: values.number_of_adults,
      },
      trip_type_id: props.tripType,
    }

    let res = await api.post("master/cache-criterias/flights", payload)
    console.log(res)
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
                            <TripRoutes index={index} airports={airports} formik={{errors, touched, setFieldValue, values}} />

                            <div className="mr-4">
                              <TripDateMultitrip index={index} smallSize={true} formik={{errors, touched, setFieldValue, values}} />
                            </div>

                            {
                              index > 0 ? (
                                <Button
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                    setDepartTime({
                                      ...departTime,
                                      [index]: ""
                                    })
                                    
                                  }}
                                  className="mt-2"
                                >
                                  REMOVE
                                </Button>
                              ) : ""
                            }
                          </div>
                        </>
                      ))
                    ) : ""
                    
                  }
                  <Button
                    onClick={() => arrayHelpers.push({departure_datetime: "", arrival_datetime: "", departure_data: "", arrival_data: ""})}
                    className="mb-4"
                  >
                    Add New
                  </Button>
                  <div className='d-flex'>
                    <TripTraveler smallSize={true} formik={{errors, touched, setFieldValue, values}} />
                    <TripFlightClass smallSize={true} formik={{errors, touched, setFieldValue, values}} />
                    <TripCorporate smallSize={true} formik={{errors, touched, setFieldValue, values}} />
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