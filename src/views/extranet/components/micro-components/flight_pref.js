import Select from 'components/form/select'
import React, { useState } from 'react'
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'
import { ReactSVG } from 'react-svg'
import TimeSlider from '../time_slider'

const FlightPref = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <Accordion>
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
                <div className="col-md-2">
                  Specify Carrier 
                </div>
                <div className="col-md-2">
                  <Select />
                </div>
                <div className="col-md-1 offset-md-3">Flight Class</div>
                <div className="col-md-2">
                  <Select />
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <ReactSVG src='/img/icons/arrow-down-extranet.svg' className='d-inline-block mr-4 accordion-arrow' />
            <span>Flight Preferences</span>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    </div>
  )
}

export default FlightPref