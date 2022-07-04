import Select from 'components/form/select'
import React, { useState } from 'react'
import { Accordion, Card, Form, Col, Container, Row } from 'react-bootstrap'
import { ReactSVG } from 'react-svg'
import TimeSlider from '../time_slider'
import { components, default as ReactSelect } from "react-select";

const FlightPref = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [flightServiceSelected, setFlightServiceSelected] = useState(null)

   const flightServices = [
    { value: "SQ", label: "Singapore Airlines"},
    { value: "GA", label: "Garuda Indonesia"},
    { value: "CP", label: "Cathay Pacific"},
    { value: "SC", label: "Scott"},
    { value: "AA", label: "AirAsia with baggage"},
    { value: "TA", label: "Tiger Airways"},
  ]

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <Form.Check 
            type='checkbox'
            checked={props.isSelected}
            onChange={() => null}
            label={props.label}
          />
        </components.Option>
      </div>
    )
  }

  const handleFlightServiceChange = (selected) => {
    setFlightServiceSelected(selected)
  }

  return (
    <div>
      <Accordion className='flight-pref-accordion'>
        <Card>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <div className="row mb-5 align-items-center" style={{height: 50}}>
                <div className="col-md-2">
                  Departing Preferences
                </div>
                <div className="col-md-4">
                  <h4 className='h6 mb-3'>DEPARTURE TIME (FROM - TO)</h4>
                  <TimeSlider />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                  <h4 className='h6 mb-3'>ARRIVAL TIME (FROM - TO)</h4>
                  <TimeSlider />
                </div>
              </div>
              <div className="row mb-5 align-items-center" style={{height: 50}}>
                <div className="col-md-2">
                  Returning Preferences
                </div>
                <div className="col-md-4">
                  <h4 className='h6 mb-3'>DEPARTURE TIME (FROM - TO)</h4>
                  <TimeSlider />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                  <h4 className='h6 mb-3'>ARRIVAL TIME (FROM - TO)</h4>
                  <TimeSlider />
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 position-relative">
                  Specify Carrier 
                  <ReactSVG src='/img/icons/info.svg' className='d-inline-block position-absolute ml-2' style={{bottom: 20}} />
                </div>
                <div className="col-md-4">
                  <ReactSelect 
                    options={flightServices}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option
                    }}
                    onChange={handleFlightServiceChange}
                    allowSelectAll={true}
                    value={flightServiceSelected}
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  />
                  {/* <Select 
                    options={[
                      { value: "SQ", label: "Singapore Airlines"},
                      { value: "SC", label: "Scott"}
                    ]}
                    menuPortalTarget={document.querySelector('body')}
                    isMulti={true}
                  /> */}
                </div>
                <div className="col-md-1 offset-md-1">Flight Class</div>
                <div className="col-md-2">
                  <Select
                    options={[
                      { value: "economy", label: "Economy"},
                      { value: "fc", label: "First Class"},
                      { value: "bc", label: "Business Class"}
                    ]}
                    menuPortalTarget={document.querySelector('body')}
                  />
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => setCollapsed(!collapsed)}>
            <ReactSVG 
              src={collapsed ? '/img/icons/arrow-down-extranet.svg' : '/img/icons/arrow-up-extranet.svg'} 
              className='d-inline-block mr-4 accordion-arrow' />
            <span>Flight Preferences</span>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    </div>
  )
}

export default FlightPref