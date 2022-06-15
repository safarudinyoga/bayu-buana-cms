import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Form, Button } from "react-bootstrap"
import Select from "components/form/select"

// components & style
import BbDataTable from 'components/table/bb-data-table'

// utils


const MarkUp = props => {

  const [isFieldSelected, setisFieldSelected] = useState({
    flight: false,
    hotel: false,
    other: false
  })

  const [paramsFlight, setParamsFlight] = useState({
    title: "flight-markup",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isCheckbox: false,
    isHideSearch: true,
    isHideDownloadLogo: true,
    hideCreate: true,
    isShowColumnAction: false,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/ancillary-fee",
    columns: [
      {
        title: "Destination",
        data: ""
      },
      {
        title: "Airline Service Type",
        data: ""
      },
      {
        title: "Apply Condition",
        data: ""
      },
      {
        title: "Markup",
        data: ""
      },
    ],
    emptyTable: "No Flight Markup found",
  })

  const [paramsHotel, setParamsHotel] = useState({
    title: "hotel-markup",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isCheckbox: false,
    isHideDownloadLogo: true,
    hideCreate: true,
    isShowColumnAction: false,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/ancillary-fee",
    columns: [
      {
        title: "Destination",
        data: ""
      },
      {
        title: "Apply Condition",
        data: ""
      },
      {
        title: "Markup",
        data: ""
      },
    ],
    emptyTable: "No Hotel Markup found",
  })

  const [paramsOther, setParamsOther] = useState({
    title: "other-custom-markup",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    hideCreate: true,
    isCheckbox: false,
    isShowColumnAction: false,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/ancillary-fee",
    columns: [
      {
        title: "Type of Service",
        data: ""
      },
      {
        title: "Markup",
        data: ""
      },
    ],
    emptyTable: "No Hotel Markup found",
  })

  const handleReset = (type) => {
    switch (type) {
      case 'flight':
        setParamsFlight({...paramsFlight, filters: []})
        break;

      case 'hotel':
        setParamsHotel({...paramsHotel, filters: []})
        break;

      case 'other':
        setParamsOther({...paramsOther, filters: []})
        break;

      default:
        break;
    }
  }

  return (
    <Form>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Mark Up <div className='tooltips' /></h3>
          <div className='mark_up'>
            <section className='mb-4'>
              <div className='wrapper_header'>
                <Card.Text className='uppercase margin-0'>
                  flight
                </Card.Text>
                <div className='wrapper_select'>
                  <Card.Text className='margin-0'>Select Flight Markup</Card.Text>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    className='select'
                    options={[
                      {
                        value: 'selected',
                        label: 'Flight Markup 1'
                      },
                      {
                        value: 'selected',
                        label: 'Flight Markup 2'
                      },
                    ]}
                    onChange={(selected) => setisFieldSelected({
                      ...isFieldSelected,
                      flight: true
                    })}
                    width={'250px'}
                  />
                </div>
              </div>
              <div className='divider mb-3 mt-3' />
              { isFieldSelected.flight && (
                <>
                  <div className='box_information'>
                    <Row>
                      <Col sm={12} lg={6} style={{ borderRight: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-center'>
                        <Card.Title className='uppercase text-bold mb-2 mt-3'>domestic flight markup</Card.Title>
                        <Card.Text className='mb-3'>IDR 125.000 /Ticket</Card.Text>
                      </Col>
                      <Col sm={12} lg={6} style={{ borderLeft: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-center'>
                        <Card.Title className='uppercase text-bold mb-2 mt-3'>international flight markup</Card.Title>
                        <Card.Text className='mb-3'>IDR 200.000 /Ticket</Card.Text>
                      </Col>
                    </Row>
                  </div>
                  <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
                    <BbDataTable {...paramsFlight} onReset={() => handleReset('flight')} />
                  </div>
                </>
              )}
            </section>

            <section className='mb-4'>
              <div className='wrapper_header'>
                <Card.Text className='uppercase margin-0'>
                  Hotel
                </Card.Text>
                <div className='wrapper_select'>
                  <Card.Text className='margin-0'>Select Hotel Markup</Card.Text>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    className='select'
                    options={[
                      {
                        value: 'selected',
                        label: 'Hotel Markup 1'
                      },
                      {
                        value: 'selected',
                        label: 'Hotel Markup 2'
                      },
                    ]}
                    onChange={(selected) => setisFieldSelected({
                      ...isFieldSelected,
                      hotel: true
                    })}
                    width={'250px'}
                  />
                </div>
              </div>
              <div className='divider mb-3 mt-3' />
              { isFieldSelected.hotel && (
                <>
                  <div className='box_information'>
                    <Row>
                      <Col sm={12} lg={6} style={{ borderRight: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-center'>
                        <Card.Title className='uppercase text-bold mb-2 mt-3'>domestic hotel markup</Card.Title>
                        <Card.Text className='mb-3'>IDR 125.000 /Ticket</Card.Text>
                      </Col>
                      <Col sm={12} lg={6} style={{ borderLeft: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-center'>
                        <Card.Title className='uppercase text-bold mb-2 mt-3'>international hotel markup</Card.Title>
                        <Card.Text className='mb-3'>IDR 200.000 /Ticket</Card.Text>
                      </Col>
                    </Row>
                  </div>
                  <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
                    <BbDataTable {...paramsHotel} onReset={() => handleReset('hotel')} />
                  </div>
                </>
              )}
            </section>

            <section className='mb-4'>
              <div className='wrapper_header'>
                <Card.Text className='uppercase margin-0'>
                  Other
                </Card.Text>
                <div className='wrapper_select'>
                  <Card.Text className='margin-0'>Select Other Markup</Card.Text>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    className='select'
                    options={[
                      {
                        value: 'silver',
                        label: 'label'
                      },
                      {
                        value: 'silver',
                        label: 'label'
                      },
                    ]}
                    onChange={(selected) => setisFieldSelected({
                      ...isFieldSelected,
                      other: true
                    })}
                    width={'250px'}
                  />
                </div>
              </div>
              <div className='divider mb-3 mt-3' />
              { isFieldSelected.other && (
                <>
                  <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
                    <BbDataTable {...paramsOther} onReset={() => handleReset('other')} />
                  </div>
                </>
              )}
            </section>
          </div>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
        >
          SAVE & NEXT
        </Button>
        <Button
          variant="secondary"
          // onClick={() => props.history.goBack()}
          style={{ padding: '0 21px' }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

MarkUp.propTypes = {}

export default MarkUp