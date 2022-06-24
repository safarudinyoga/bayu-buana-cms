import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ReactSVG } from 'react-svg';
import DatePicker from 'react-multi-date-picker'
import Travellers from './travellers';
import Routes from './routes';
import { Formik, useFormikContext } from 'formik';
import * as Yup from "yup"
import FlightPref from './flight_pref';
import { useHistory } from 'react-router';

const Oneway = (props) => {
  const { airports, multitrip, handleRemoveTrip, id, counter, handleTrip, formik } = props

  const history = useHistory()

  const [departTime, setDepartTime] = useState(new Date())

  const [travelerCheckboxConfirm, setTravelerCheckboxConfirm] = useState(false)
  const [travelerCount, setTravelerCount] = useState(0)

  const removeTripCallback = index => () => {
    handleRemoveTrip(index)
  }

  function RenderDatepicker({ openCalendar, value, handleValueChange }){
    return (
      <div style={{width: 190}} className='position-relative'>
        <h4 className='form-with-label__title'> DEPART <span className='label-required'></span></h4>
        <ReactSVG src='/img/icons/date-range.svg' className='form-with-label__suggest-icon'/>
        <input type="text" 
          className='form-control rounded-0 form-with-label' 
          onFocus={openCalendar} 
          value={value} 
          onChange={handleValueChange}
          />
      </div>
    )
  }

  function handleTravellerCheckboxConfirm(confirm, count){
    setTravelerCheckboxConfirm(confirm)
    setTravelerCount(count)
  }

  const initialValues = {
    depart_time: new Date(),
    departure_data: "",
    arrival_data: "",
    adult_count: 1,
    children_count: 0,
    infant_count: 0,
  }

  const validationSchema = Yup.object().shape({
    depart_time: Yup.string().required("Depart Time is required"),
    departure_data: Yup.object().required("Departing from city or airport is required."),
    arrival_data: Yup.object().required("Arriving to city or airport is required."),
    adult_count: Yup.number(),
    children_count: Yup.number(),
    infant_count: Yup.number()
  })

  const handleSearch = (values, a) => {
    console.log("MASUK KE ONEWAY COMP", values)
    history.push("/extranet/book-trip/book-flight")
  }

  return (
    <>
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
              <div className='d-flex flex-wrap' id={id}>
                <Routes airports={airports} formik={{errors, touched, setFieldValue}} />

                <div className='mr-4'>
                  <div className='d-flex'>
                    <div style={{width: 173}} className="position-relative flex-grow-1 book-trip-datepicker">
                      <DatePicker 
                        render={<RenderDatepicker />}
                        numberOfMonths={2}
                        fixMainPosition={true}
                        format="ddd, DD MMMM YYYY"
                        value={departTime}
                        onChange={(date) => {
                          setDepartTime(date)
                          setFieldValue("depart_time",date)
                        }}
                        portal
                      />
                    </div>
                  </div>
                </div>
                {
                  multitrip ? (
                    <div onClick={removeTripCallback(counter)}>
                      Remove
                    </div>
                  ) : (
                    <Travellers handleTrip={handleTrip} onConfirm={handleTravellerCheckboxConfirm} />
                  )
                }
              </div>
              {
                multitrip ? "" : (
                  <>
                    <div className='my-3'>
                      <Form.Check label="Add a hotel" />
                    </div>
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
                  </>
                )
              }
              
          </Form>
        )}
      </Formik>

      
      {/* end of first row */}
      
    </>
  )
}

export default Oneway