import DatePicker, { DateObject }  from 'react-multi-date-picker'
import Icon from "react-multi-date-picker/components/icon"
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import React, { useEffect, useRef, useState } from "react"
import { Col, Row, Button } from 'react-bootstrap';
import _ from "lodash"


const DateRangePicker = (props) => {

  const [startDateClose, setStartDateClose] = useStateWithCallbackLazy(false)
  const [form, setForm] = useState([])

  const datePickerRef = useRef()

  useEffect(() => {
    console.log(props.value)
    if(props.value) {
      if(props.value[0] !== null) {
        setForm(props.value)
      }
    }
  }, [props])

  const RenderDatepickerStart = ({ openCalendar, value, handleValueChange }) => {
    return (
      <Row>
        <Col md={4}>
          <div className="position-relative datepicker-special-date">
            <Icon className="special-date-icon" onClick={openCalendar} />
            <input type="text"
              className="form-control periode" 
              onFocus={openCalendar}
              value={value[0]}
              onChange={handleValueChange}
              id="startDate"
            />
          </div>
        </Col>
        <Col md={1} className={"text-center mt-1"} >to</Col>
        <Col md={4}>
          <div className="position-relative datepicker-special-date">
            <Icon className="special-date-icon" onClick={openCalendar} />
            <input type="text"
              className="form-control periode" 
              onFocus={openCalendar}
              value={value[1]}
              onChange={handleValueChange}
              id="endDate"
            />
          </div>
        </Col>
      </Row>
    )
  }


  return (
    <DatePicker
     {...props}
      range
      ref={datePickerRef}
      render={<RenderDatepickerStart />}
      numberOfMonths={2}
      format="DD MMMM YYYY"
      minDate={props.minDate ? new DateObject().subtract(props.minDate, "years") : {}}
      maxDate={props.maxDate ?new DateObject().add(props.maxDate, "years") : {}}
      value={form}
      onChange={
        (date) => {
          if(date.length === 1) {
            let endDate = document.getElementById("endDate")
            endDate.focus();
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
        <button
          className="pt-1"
          style={{color: "#1E83DC"}}
          role={"button"}
          onClick={() => {
            props.onChange([])
          }}
        >
          Reset
        </button>    
        <Button 
          className="btn btn-primary ml-4 px-4 py-2"
          disabled={form.length < 2}
          onClick={
            () => {
              console.log(form, "yyy")
              setStartDateClose(true, () => {
                datePickerRef.current.closeCalendar()
                props.onChange(form)
              })
            }
        }>
          APPLY
        </Button>
      </div>
      
    </DatePicker>
  )
}

export default DateRangePicker