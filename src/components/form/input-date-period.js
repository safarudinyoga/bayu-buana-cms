import React from 'react'
import DatePicker from 'react-datepicker'
import FormInputWrapper from './input-wrapper'


function FormInputDatePeriod(props) {
  return (
    <FormInputWrapper
      label={props.label}
    >
      <div className="row d-flex align-items-center">
        <div className="col-sm-5">
          <DatePicker 
            className="form-control"
            selected={props.dateStart}
            onChange={props.dateStartOnChange} 
          />
        </div>
        <span className="col-md-2 text-center">to</span>
        <div className="col-sm-5">
          <DatePicker 
            className="form-control"
            selected={props.dateEnd}
            onChange={props.dateEndOnChange} 
          />
        </div>
      </div>
      {
        props.recurring && (
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">
              Occurs on the same date every year?
            </label>
          </div>
        )
      }
    </FormInputWrapper>
  )
}

export default FormInputDatePeriod