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
import { useDispatch, useSelector } from 'react-redux'
import { setModalTitle, setCreateModal } from "redux/ui-store"
import Api from "config/api"
import _ from 'lodash'


const TripRoundtrip = (props) => {
  const dispatch = useDispatch()
  let api = new Api()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal);
  const [formValues, setFormValues] = useState(null);

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

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Shopping Criteria";
    if(!formId) {
      docTitle = "Add Shopping Criteria"
    }

    dispatch(setModalTitle(docTitle));

    if(formId) {
      try {
        let res = await api.get(`master/cache-criterias/flights/${formId}`);
        setFormValues({
          ...res.data,
          departure_data: res.data.cache_air_origin_destination_criteria.origin_city.city_name,
          arrival_data: res.data.cache_air_origin_destination_criteria.destination_city.city_name,
          departure_datetime: new Date(res.data.cache_air_origin_destination_criteria.departure_datetime),
          arrival_datetime: new Date(res.data.cache_air_origin_destination_criteria.arrival_datetime),
          number_of_adults: res.data.cache_air_travel_preference_criteria.number_of_adults,
          number_of_children: res.data.cache_air_travel_preference_criteria.number_of_children,
          number_of_infants: res.data.cache_air_travel_preference_criteria.number_of_infants,
          cabin_type_id: _.isEmpty(res.data.cache_air_travel_preference_criteria.cabin_type) ? '' 
          : {
              value: res.data.cache_air_travel_preference_criteria.cabin_type.id,
              label: res.data.cache_air_travel_preference_criteria.cabin_type.cabin_type_name
            },
          corporate_id: ""
        })
      } catch(e){

      }
    }
  }, [])
  
  
  const onSubmit = async (values, a) => {
    console.log("VALUES", values)

    let payload = {
      cache_air_origin_destination_criteria: [
        {
          arrival_datetime: values.arrival_datetime,
          departure_datetime: values.departure_datetime,
          destination_city_id: values.arrival_data.city_id,
          destination_location: values.arrival_data.city,
          index_number: 1,
          origin_city_id: values.departure_data.city_id,
          origin_location: values.departure_data.city,
        }
      ],
      cache_air_travel_preference_criteria: {
        cabin_type_id: values.cabin_type_id ? values.cabin_type_id : "",
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
        seats_requested: values.number_of_adults,
      },
      cache_air_travel_criteria: {
        number_of_adults: values.number_of_adults,
        number_of_children: values.number_of_children,
        number_of_infants: values.number_of_infants,
        seats_requested: values.number_of_adults,
      },
      trip_type_id: "3234761b-3fd2-4fd0-ba48-3742ffd3e7cb",
    }

    let res = await api.post("master/cache-criterias/flights", payload)
    if(res){
      dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
    }
    console.log(res)
  }

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
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
              <Travellers smallSize={true} formik={{errors, touched, setFieldValue}} shoppingCache={true} />
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