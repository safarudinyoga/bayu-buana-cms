import DatePicker, { DateObject }  from 'react-multi-date-picker'
import Icon from "react-multi-date-picker/components/icon"
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import React, { useEffect, useRef, useState } from "react"
import { Col, Row, Button } from 'react-bootstrap';
import ResetIC from 'assets/icons/reset.svg'

const DateRangePicker = ({value, onChange= ()=>{}, minDate, maxDate, placeholder="", id="" }) => {

  const [, setStartDateClose] = useStateWithCallbackLazy(false)
  const [form, setForm] = useState([])

  const datePickerRef = useRef()

  useEffect(() => {
    if(value) {
      if(value[0] !== null) {
        setForm(value)
      } else {
        setForm([])
      }
    }
  }, [value])

  const RenderDatepickerStart = ({ openCalendar, value, handleValueChange }) => {
    return (
      <Row>
        <Col md={5}>
          <div className="position-relative datepicker-special-date">
            <Icon className="special-date-icon" onClick={openCalendar} />
            <input type="text"
              className="form-control periode" 
              onFocus={openCalendar}
              value={value[0]}
              onChange={handleValueChange}
              id={`startDate_${id}`}
              placeholder={placeholder}
              autoComplete="off"
            />
          </div>
        </Col>
        <Col md={1} className={"text-center mt-1"} >to</Col>
        <Col md={5}>
          <div className="position-relative datepicker-special-date">
            <Icon className="special-date-icon" onClick={openCalendar} />
            <input type="text"
              className="form-control periode" 
              onFocus={openCalendar}
              value={value[1]}
              onChange={handleValueChange}
              id={`endDate_${id}`}
              placeholder={placeholder}
              autoComplete="off"
            />
          </div>
        </Col>
      </Row>
    )
  }


  return (
    <DatePicker
      range
      ref={datePickerRef}
      render={<RenderDatepickerStart />}
      numberOfMonths={2}
      format="DD MMMM YYYY"
      minDate={minDate ? new DateObject().subtract(minDate, "years") : {}}
      maxDate={maxDate ?new DateObject().add(maxDate, "years") : {}}
      value={form}
      onChange={
        (date) => {
          if(date.length === 1) {
            let endDate = document.getElementById(`endDate_${id}`)
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
          className="pt-1 d-flex justify-content-start align-items-center"
          style={{color: "#1E83DC", background: "none", border: 'none', fontSize: 13}}
          onClick={() => {
            onChange([])
          }}
        >
          Reset
          <img src={ResetIC} style={{width: 10, marginLeft: 10}} />
        </button>    
        <Button 
          className="btn btn-primary ml-4 px-4 py-2"
          disabled={form.length < 2}
          onClick={
            () => {
              setStartDateClose(true, () => {
                datePickerRef.current.closeCalendar()
                onChange(form)
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