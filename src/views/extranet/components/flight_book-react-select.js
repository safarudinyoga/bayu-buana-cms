import React, { useState } from 'react'
import { Tab, Tabs, Form, Accordion, Card, Button } from 'react-bootstrap'
import { ReactSVG } from "react-svg"
import Select, {components} from "react-select"
import DatePicker from 'react-datepicker'

import "./flight_book.css"
import TimeSlider from './time_slider'


const FlightBook = (props) => {
  const [flightType, setFlightType] = useState("roundtrip")
  const [departTime, setDepartTime] = useState(new Date())
  const [returnTime, setReturnTime] = useState(new Date())

  const options = [
    {
      label: "Jakarta, Indonesia",
      subLabel: "All Airports",
      code: "JKT",
      selected: "Jakarta",
      
    },
    {
      label: "Soekarno-Hatta Intl",
      subLabel: "Jakarta, Indonesia",
      code: "CGK",
      selected: "Jakarta (CGK - Soekarno Hatta Intl)",
    },
    {
      label: "Halim Perdana Kusuma",
      subLabel: "Jakarta, Indonesia",
      code: "HLP",
      selected: "Jakarta (HLP - Halim Perdana Kusuma)",
    }
  ]

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
      </components.DropdownIndicator>
    );
  }

  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      {/* <h4 className='form-with-label__title'>HELLO</h4> */}
      {children}
    </components.Control>
  );

  const formatOptionLabel = (option, { context }) => {
    return context === "menu" ? (
      <div style={{ display: "flex" }}>
        <div className='mr-auto'>
          <div>{option.label}</div>
          <div style={{fontSize: 12, color: "#aaa"}}>{option.subLabel}</div>
        </div>
        <div style={{ marginLeft: "10px" }}>
          {option.code}
        </div>
      </div>
    ) : (
      option.selected
    )
  }

  return (
    <div>
      <Tabs
        id='flight-book-tabs'
        activeKey={flightType}
        onSelect={(k) => setFlightType(k)}
        className={`mb-4 flight-book-tabs`}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab
          eventKey="roundtrip"
          title="Roundtrip"
        >
          <div className="row">
            <div className="col-md-2 p-0">
              <Select
                options={options}
                formatOptionLabel={formatOptionLabel}
                components={{DropdownIndicator, Control}}
                label="FROM"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                })}
              />
            </div>
            
            <div className="col-md-2 p-0">
              <Select
                options={options}
                formatOptionLabel={formatOptionLabel}
                components={{DropdownIndicator, Control}}
                label="TO"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                })}
              />
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6 pr-0">
                  <h4 className='form-with-label__title'> DEPART</h4>
                  <DatePicker
                    className='form-control rounded-0 form-with-label'
                    dateFormat="dd MMMM yyyy"
                    selected={departTime}
                    onChange={(date) => {
                      setDepartTime(date)
                    }}
                  />
                </div>
                <div className="col-md-6 pl-0">
                  <h4 className='form-with-label__title'> RETURN</h4>
                  <DatePicker 
                    className='form-control rounded-0 form-with-label'
                    dateFormat="dd MMMM yyyy"
                    selected={returnTime}
                    onChange={(date) => {
                      setReturnTime(date)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <h4 className='form-with-label__title'> TRAVELERS</h4>
              <Select
                options={options}
                formatOptionLabel={formatOptionLabel}
                components={{Control}}
                label="TRAVELERS"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Check label="Add a hotel" />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-12">
              <Accordion defaultActiveKey='0'>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Flight Preferences
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                      <div className="row mb-5">
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
                      <div className="row mb-5">
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
                          <Select />
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                          <Select />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Button>Search</Button>
            </div>
          </div>
          <div className="row">

          </div>
        </Tab>
        <Tab
          eventKey="one-way"
          title="One Way"
        >
          Hello One Way
        </Tab>
        <Tab
          eventKey="multi-city"
          title="Multi City"
        >
          Hello Multi City
        </Tab>
      </Tabs>
    </div>
  )
}

export default FlightBook