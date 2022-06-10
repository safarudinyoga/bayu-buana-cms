import DatePicker, { DateObject }  from 'react-multi-date-picker'
import Icon from "react-multi-date-picker/components/icon"
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import React, { useEffect, useRef, useState } from "react"
import { Col, Row } from 'react-bootstrap';


const DateRangePicker = (props) => {

  const [startDateClose, setStartDateClose] = useStateWithCallbackLazy(false)
  const [form, setForm] = useState([])

  const startDatePicker = useRef()
  const endDatePicker = useRef()

  useEffect(() => {
    if(props.value) {
      console.log(props.value)
      setForm([])
    }
  }, [props])


  return (
    <DatePicker
     {...props}
      range
      render={<RenderDatepickerStart />}
      numberOfMonths={2}
      format="DD MMMM YYYY"
      minDate={props.minDate ? new DateObject().subtract(props.minDate, "years") : {}}
      maxDate={props.maxDate ?new DateObject().add(props.maxDate, "years") : {}}
      value={form}
      onChange={
        (date) => {
          if(date.length === 1) {
            endDatePicker.current.focus()
            setForm(date)
          } else {
            setForm(date)
          }
        }
      }
      onOpen={() => setStartDateClose(false)}
      onClose={() => {
        setForm([])
        setStartDateClose(true)
      }}
      fixMainPosition={true}
      portal
    >
      <div className="d-flex justify-content-end p-4">
        <div
          className="pt-1"
          style={{color: "#1E83DC"}}
          role={"button"}
          onClick={() => {
            props.onChange([])
          }}
        >
          Reset
        </div>    
        <div 
          className="btn btn-primary ml-4 px-4 py-2"
          role={"button"} 
          onClick={
            () => {
              // setStartDateClose(true, () => {
              //   startDatePickerRef.current.closeCalendar()
              //   let endDate = document.getElementById("endDate")
              //   endDate.focus();
              // })
            }
        }>
          APPLY
        </div>
      </div>
      
    </DatePicker>
  )
}

function RenderDatepickerStart({ openCalendar, value, handleValueChange }) {
  return (
    <Row>
      <Col>
        <div className="position-relative datepicker-special-date">
          <Icon className="special-date-icon" onClick={openCalendar} />
          <input type="text"
            className="form-control periode" 
            onFocus={openCalendar}
            value={value[0]}
            onChange={handleValueChange}
            id="startDate"
            ref={startDatePicker}
          />
        </div>
      </Col>
      <Col md={1} className={"text-center mt-1"}>to</Col>
      <Col>
        <div className="position-relative datepicker-special-date">
          <Icon className="special-date-icon" onClick={openCalendar} />
          <input type="text"
            className="form-control periode" 
            onFocus={openCalendar}
            value={value[1]}
            onChange={handleValueChange}
            ref={endDatePicker}
          />
        </div>
      </Col>
    </Row>
  )
}

export default DateRangePicker