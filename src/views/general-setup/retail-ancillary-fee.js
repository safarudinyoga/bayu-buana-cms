import { Formik } from 'formik';
import React from 'react';
import { Card, Form, Row, Col, Button, Tabs, TabPane } from "react-bootstrap"
import Api from "config/api"
// import FlightTable from "./table/flight_table"
// import HotelTable from "./table/hotel_table"
// import OtherTable from "./table/other_table"
// import { ReactSVG } from "react-svg"
const RetailAncillaryFee = (props) => {
  let api = new Api()

  return (
    <>
      {/* <Formik
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)

        let res = await api.put("user/profile", formatted)

        return props.handleSelectTab("subscriptions")
      }}
    > */}
      {/* {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return ( */}
          <Form onSubmit="">
            <Card>
              <Card.Body>
                <h3 className="card-heading">Retail Ancillary Fee</h3>
                <div style={{ padding: "0 15px 40px 0" }}>
                {/* <Tabs
                  id="standard-markup"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-4"
                  mountOnEnter={true}
                  unmountOnExit={true}
                  className=""
                >
                  <TabPane
                    className="m-3"
                    eventKey="flight"
                    title={
                      <div className="d-md-flex flex-row bd-highlight">
                        <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
                        <span className="ml-md-2 tabs-text">FLIGHT</span>
                      </div>
                    }
                  >
                    <FlightTable />
                  </TabPane>
                  <TabPane
                    className="m-3"
                    eventKey="hotel"
                    title={
                      <div className="d-md-flex flex-row">
                        <ReactSVG className="tabs-icon" src="/img/icons/tabs/hotel.svg" />
                        <span className="ml-md-2 tabs-text">HOTEL</span>
                      </div>
                    }
                  >
                    <HotelTable />
                  </TabPane>
                  <TabPane
                    className="m-3"
                    eventKey="other"
                    title={
                      <div className="d-md-flex flex-row">
                        <ReactSVG className="tabs-icon" src="/img/icons/tabs/other.svg" />
                        <span className="ml-md-2 tabs-text">OTHER</span>
                      </div>
                    }
                  >
                    <OtherTable />
                  </TabPane>
                </Tabs> */}
                </div>
              </Card.Body>
            </Card>
          </Form>
        
      {/* }} */}
    {/* </Formik> */}
    </>
  )
  }

export default RetailAncillaryFee;