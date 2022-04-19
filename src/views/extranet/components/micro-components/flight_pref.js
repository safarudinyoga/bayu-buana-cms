import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import TimeSlider from '../time_slider'

const FlightPref = () => {
  return (
    <div>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Flight Preferences
          </Accordion.Toggle>
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
                <div className="col-md-4">

                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">

                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default FlightPref