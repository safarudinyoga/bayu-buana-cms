import React, { useEffect, useState } from 'react'
import { FieldArray, Formik } from 'formik';
import * as Yup from "yup"
import { Form, Button } from 'react-bootstrap'
import Routes from './routes';
import DatePicker from 'react-multi-date-picker';
import FlightPref from './flight_pref';
import { ReactSVG } from "react-svg"
import Travellers from './travellers';
import { useHistory } from 'react-router';

const MultiTrip = (props) => {
  const { airports, handleTrip  } = props
  const history = useHistory()
  
  const initialValues = {
    trips: [
      {
        depart_time: new Date(),
        departure_data: "",
        arrival_data: ""
      }
    ]
  }

  const [departTime, setDepartTime] = useState({ 0: new Date() })
  const [departureValue, setDepartureValue] = useState({ 0: ""})
  const [arrivalValue, setArrivalValue] = useState({0: ""})

  const [travelerCheckboxConfirm, setTravelerCheckboxConfirm] = useState(false)
  const [travelerCount, setTravelerCount] = useState(0)

  function handleTravellerCheckboxConfirm(confirm, count){
    setTravelerCheckboxConfirm(confirm)
    setTravelerCount(count)
  }

  const validationSchema = Yup.object().shape({
    trips: Yup.array().of(
      Yup.object().shape({
        depart_time: Yup.string().required("Depart Time is required"),
        departure_data: Yup.object().required("Departing from city or airport is required."),
        arrival_data: Yup.object().required("Arriving to city or airport is required."),
      })
    )
  })

  const onSubmit = async (values, a) => {
    history.push("/extranet/book-trip/book-flight")
    console.log("Values", values)
  }

  useEffect(() => {
    console.log("DPRT", departTime)
  }, [departTime])
  

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, touched, handleSubmit, isSubmitting, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <FieldArray 
            name="trips"
            render={arrayHelpers => (
              <>
                {values.trips && values.trips.length > 0 ? (
                  values.trips.map((trip, index) => (
                    <>
                      <div key={index} className="d-flex flex-wrap mb-3">
                        <Routes 
                          index={index} 
                          airports={airports} 
                          formik={{errors, touched, setFieldValue, values}} 
                          departureValue={departureValue}
                          setDepartureValue={setDepartureValue}
                          arrivalValue={arrivalValue}
                          setArrivalValue={setArrivalValue}
                        />

                        <div className="mr-4">
                          <div className="d-flex">
                            <div className="position-relative flex-grow-1 book-trip-datepicker">
                              <DatePicker 
                                render={<RenderDatepicker />}
                                numberOfMonths={2}
                                fixMainPosition={true}
                                format="ddd, DD MMMM YYYY"
                                value={departTime[index]}
                                onChange={(date) => {
                                  setDepartTime({
                                    ...departTime,
                                    [index]: new Date(date)
                                  })
                                  setFieldValue(`trips[${index}].depart_time`, date)
                                }}
                                portal
                              />
                            </div>
                            
                          </div>
                          {/* tampilan error untuk depart time START */}
                          {
                            errors.trips &&
                            errors.trips[index] &&
                            errors.trips[index].depart_time ? (
                              <div className="routes-invalid">
                                {
                                  touched.trips &&
                                  touched.trips[index] &&
                                  touched.trips[index].depart_time ? (errors.trips[index].depart_time) : null
                                }
                              </div>
                            ) : null
                          }
                          {/* tampilan error untuk depart time END */}
                        </div>
                        {
                          index > 0 ? (
                            <ReactSVG 
                              src='/img/icons/bin.svg' 
                              onClick={() => {
                                arrayHelpers.remove(index)
                                setDepartTime({
                                  ...departTime,
                                  [index]: ""
                                })
                              }}
                              className="d-flex cursor-pointer align-items-center"
                            />
                            // <Button
                            //   onClick={() => {
                            //     arrayHelpers.remove(index)
                            //     setDepartTime({
                            //       ...departTime,
                            //       [index]: ""
                            //     })
                                
                            //   }}
                            // >
                            //   REMOVE
                            // </Button>
                          ) : (
                            <Travellers handleTrip={handleTrip} onConfirm={handleTravellerCheckboxConfirm} />
                          )
                        }
                      </div>
                    </>
                    
                  ))
                ) : ""}
                <div className="d-flex align-items-baseline">
                  <ReactSVG src='/img/icons/add-circle.svg' className='mr-2 mb-4 cursor-pointer' onClick={() => arrayHelpers.push({depart_time: "", departure_data: "", arrival_data: ""})} />
                  <span className='another-flight'>Add another flight</span>
                </div>
                
                {/* <Button
                  onClick={() => arrayHelpers.push({depart_time: "", departure_data: "", arrival_data: ""})}
                  className="my-4"
                >
                  Add New
                </Button> */}
              </>
            )}
          />
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
  )
}

export default MultiTrip