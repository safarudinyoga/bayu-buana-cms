import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, Modal, ModalBody } from "react-bootstrap"
import { useParams } from "react-router-dom"
import '../manage_corporate.css'

// components & styles
import Select from "components/form/select"
import BbDataTable from 'components/table/bb-data-table'
import createIcon from "assets/icons/create.svg"
import ModalCustomServiceFee from 'views/manage_corporate/form/service-fee/modal-other-custom'

// utils

const TravelConsultantAssistant = ({ handleChangeModal  }) => {
  const [isSelectedOne, setisSelectedOne] = useState(false)
  const [isSelectedTwo, setisSelectedTwo] = useState(false)
  const { id } = useParams()
  // dropdown
  const [isFieldSelected, setisFieldSelected] = useState({
    flight: {
      key: '',
      isSelected: false
    },
    hotel: {
      key: '',
      isSelected: false
    },
    other: {
      key: '',
      isSelected: true
    }
  })

  const [activeRadioFlight, setactiveRadioFlight] = useState({
    domestic: 'flight-domestic-2',
    international: 'flight-international-2'
  })
  const [activeRadioHotel, setactiveRadioHotel] = useState({
    domestic: 'hotel-domestic-2',
    international: 'hotel-international-2'
  })

  const [paramsFlight, setParamsFlight] = useState({
    title: "flight-service-fee",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    isCheckbox: false,
    // isShowColumnAction: true,
    hideDetail: true,
    hideCreate: true,
    baseRoute: "/master/manage-corporate/form",
    endpoint: `/master/agent-corporates/${id}/service-fee`,
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
        title: "Service Fee",
        data: ""
      },
    ],
    emptyTable: "No Flight Service Fee found",
  })

  const [paramsHotel, setParamsHotel] = useState({
    title: "hotel-service-fee",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    isCheckbox: false,
    isShowColumnAction: false,
    hideCreate: true,
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
        title: "Service Fee",
        data: ""
      },
    ],
    emptyTable: "No Hotel Service Fee found",
  })

  const [paramsOther, setparamsOther] = useState({
    custom: {
      module: 'custom-other-service-fee-manage-corporate',
      createOnModal: true,
      titleModal: "Other Service Fee",
      title: "other-custom-service-fee",
      showAdvancedOptions: false,
      hideDetail: true,
      isHidePrintLogo: true,
      isHideSearch: false,
      isCheckbox: false,
      isHideDownloadLogo: true,
      // isShowColumnAction: true,
      baseRoute: "/master/manage-corporate/form",
      endpoint: `/master/agent-corporates/${id}/service-fee`,
      columns: [
        {
          title: "Type Of Service",
          data: ""
        },
        {
          title: "Service Fee",
          data: ""
        },
      ],
      emptyTable: "No Other Service Fee found",
    },
    nonCustom: {
      title: "other-noncustom-service-fee",
      showAdvancedOptions: false,
      responsiveTablet: true,
      isHidePrintLogo: true,
      isHideSearch: true,
      isHideDownloadLogo: true,
      // isShowColumnAction: false,
      hideDetail: true,
      hideCreate: true,
      baseRoute: "/master/manage-corporate/form",
      endpoint: `/master/agent-corporates/${id}/service-fee`,
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
          title: "Service Fee",
          data: ""
        },
      ],
      emptyTable: "No Other Service Fee found",
    }
  })

  const handleChange = (e, type) => {
    const { name } = e.target

    switch (type) {
      case 'flight_domestic':
        setactiveRadioFlight({
          ...activeRadioFlight,
          domestic: name
        });
        break;

      case 'flight_international':
        setactiveRadioFlight({
          ...activeRadioFlight,
          international: name
        });
        break;

      case 'hotel_domestic':
        setactiveRadioHotel({
          ...activeRadioFlight,
          domestic: name
        });
        break;

      case 'hotel_international':
        setactiveRadioHotel({
          ...activeRadioFlight,
          international: name
        });
        break;

      default:
        break;
    }
  };

  const handleReset = (type) => {
    switch (type) {
      case 'flight':
        setParamsFlight({...paramsFlight, filters: []})
        break;

      case 'hotel':
        setParamsHotel({...paramsHotel, filters: []})
        break;

      case 'other':
        setparamsOther({...paramsOther, filters: []})
        break;

      default:
        break;
    }
  }

  return (
    <div style={{ padding: '0 15px' }}>
      <Form.Group as={Row} className='align-items-center form-group ml-2 mb-2'>
        <Form.Label column lg={4}>
          Include Service Fee in the Booking Amount?
        </Form.Label>
        <Col md={3} lg={3}>
          <Form.Check
            // name
            id='travel_consultant_assist_1'
            type="switch"
            checked={isSelectedOne}
            onChange={() => setisSelectedOne(!isSelectedOne)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='align-items-center form-group ml-2 mb-4'>
        <Form.Label column lg={4}>
          Do Not Show Service Fee on the Booking Page?
        </Form.Label>
        <Col md={3} lg={3}>
          <Form.Check
            // name
            id='travel_consultant_assist_2'
            type="switch"
            checked={isSelectedTwo}
            onChange={() => setisSelectedTwo(!isSelectedTwo)}
          />
        </Col>
      </Form.Group>
      {/* flight */}
      <section className='mb-4 ml-2'>
        <div className='wrapper_header'>
          <Card.Text className='uppercase margin-0'>
            flight
          </Card.Text>
          <div className='wrapper_select'>
            <Card.Text className='margin-0'>Select Flight Service Fee</Card.Text>
            <Select
              isClearable
              placeholder="Please Choose"
              className='select'
              options={[
                {
                  value: 'custom',
                  label: 'Custom Service Fee'
                },
                {
                  value: 'selected',
                  label: 'Flight Service Fee 1'
                },
              ]}
              onChange={(selected) => setisFieldSelected({
                ...isFieldSelected,
                flight: {
                  key: selected.value,
                  isSelected: true
                }
              })}
              width={'300px'}
            />
          </div>
        </div>
        <div className='divider mb-3 mt-3' />
        {isFieldSelected.flight.isSelected && (
          <>
            <div className='box_information'>
              <Row>
                <Col sm={12} lg={6} style={{ borderRight: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-start'>
                  <Card.Title className='uppercase text-bold mb-3'>DOMESTIC FLIGHT SERVICE FEE</Card.Title>
                  {isFieldSelected.flight.key === 'selected' && (
                    <Card.Text className='mb-3'>IDR 125.000 /Ticket</Card.Text>
                  )}
                  {isFieldSelected.flight.key === 'custom' && (
                    <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                      <div>
                        <Form.Check
                          name='flight-domestic-1'
                          id='flight-domestic-1'
                          checked={activeRadioFlight.domestic === 'flight-domestic-1'}
                          onChange={(e) => handleChange(e, 'flight_domestic')}
                          label='Fixed Amount'
                          type="radio"
                          className='mr-2 mb-2'
                        />
                        {activeRadioFlight.domestic === 'flight-domestic-1' && (
                          <div style={{ paddingLeft: '26px' }} className='mt-2'>
                            <Form.Group as={Row} className='row d-flex justify-content-start align-items-start  form-group mb-3'>
                              <Form.Label column>
                                IDR
                              </Form.Label>
                              <Form.Control
                                type="text"
                                minLength={1}
                                maxLength={16}
                                placeholder=""
                                style={{ width: 150 }}
                                className='mr-3 ml-2'
                              />
                              <div className='d-flex flex-column justify-content-start mt-1'>
                                {['/Ticket', '/Person', '/Transaction'].map((res, i) =>
                                  <Form.Check
                                    name={`fixedAmount-${i+1}`}
                                    id={`fixedAmount-${i+1}`}
                                    // checked={activeRadioFlight.domestic === '1'}
                                    // onChange={(e) => handleChange(e, 'invoice')}
                                    label={res}
                                    type="radio"
                                    className='mb-2'
                                  />
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        )}
                      </div>
                      <Form.Check
                        name='flight-domestic-2'
                        id='flight-domestic-2'
                        checked={activeRadioFlight.domestic === 'flight-domestic-2'}
                        onChange={(e) => handleChange(e, 'flight_domestic')}
                        label='Percentage'
                        type="radio"
                        className='mb-2'
                      />
                      { activeRadioFlight.domestic === 'flight-domestic-2' && (
                        <div style={{ paddingLeft: '35px' }}>
                          <Form.Group as={Row} className='row d-flex align-items-center form-group'>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              placeholder=""
                              style={{ width: 50 }}
                            />
                            <Card.Text className='m-0 ml-3 mr-3'>%</Card.Text>
                            <Form.Check
                              type='checkbox'
                              name='workingDays'
                              id='workingDays'
                              label='Include Taxes'
                            />
                          </Form.Group>
                        </div>
                      )}
                    </Form.Group>
                  )}
                </Col>
                <Col sm={12} lg={6} style={{ borderLeft: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-start'>
                  <Card.Title className='uppercase text-bold mb-3'>INTERNATIONAL FLIGHT SERVICE FEE</Card.Title>
                  {isFieldSelected.flight.key === 'selected' && (
                    <Card.Text className='mb-3'>IDR 200.000 /Ticket</Card.Text>
                  )}
                  {isFieldSelected.flight.key === 'custom' && (
                    <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                      <div>
                        <Form.Check
                          name='flight-international-1'
                          id='flight-international-1'
                          checked={activeRadioFlight.international === 'flight-international-1'}
                          onChange={(e) => handleChange(e, 'flight_international')}
                          label='Fixed Amount'
                          type="radio"
                          className='mr-2 mb-2'
                        />
                        {activeRadioFlight.international === 'flight-international-1' && (
                          <div style={{ paddingLeft: '26px' }} className='mt-2'>
                            <Form.Group as={Row} className='row d-flex justify-content-start align-items-start  form-group mb-3'>
                              <Form.Label column>
                                IDR
                              </Form.Label>
                              <Form.Control
                                type="text"
                                minLength={1}
                                maxLength={16}
                                placeholder=""
                                style={{ width: 150 }}
                                className='mr-3 ml-2'
                              />
                              <div className='d-flex flex-column justify-content-start mt-1'>
                                {['/Ticket', '/Person', '/Transaction'].map((res, i) =>
                                  <Form.Check
                                    name={`fixedAmount-${i+1}`}
                                    id={`fixedAmount-${i+1}`}
                                    // checked={activeRadioFlight.international === '1'}
                                    // onChange={(e) => handleChange(e, 'invoice')}
                                    label={res}
                                    type="radio"
                                    className='mb-2'
                                  />
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        )}
                      </div>
                      <Form.Check
                        name='flight-international-2'
                        id='flight-international-2'
                        checked={activeRadioFlight.international === 'flight-international-2'}
                        onChange={(e) => handleChange(e, 'flight_international')}
                        label='Percentage'
                        type="radio"
                        className='mb-2'
                      />
                      { activeRadioFlight.international === 'flight-international-2' && (
                        <div style={{ paddingLeft: '35px' }}>
                          <Form.Group as={Row} className='row d-flex align-items-center form-group'>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              placeholder=""
                              style={{ width: 50 }}
                            />
                            <Card.Text className='m-0 ml-3 mr-3'>%</Card.Text>
                            <Form.Check
                              type='checkbox'
                              name='workingDays'
                              id='workingDays'
                              label='Include Taxes'
                            />
                          </Form.Group>
                        </div>
                      )}
                    </Form.Group>
                  )}
                </Col>
              </Row>
            </div>
            {isFieldSelected.flight.key === 'custom' && (
              <button
                type="button"
                onClick={() => handleChangeModal('flight')}
                className="btn btn-warning button-new mt-3 mb-4 ml-auto mr-2 cursor-pointer"
              >
                <img src={createIcon} className="mr-1" alt="new"  />
                Add Override Service Fee
              </button>
            )}
            {isFieldSelected.flight.key === 'selected' && (
              <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
                <BbDataTable {...paramsFlight} onReset={() => handleReset('flight')} />
              </div>
            )}
          </>
        )}
      </section>

      {/* hotel */}
      <section className='mb-4 ml-2'>
        <div className='wrapper_header'>
          <Card.Text className='uppercase margin-0'>
            hotel
          </Card.Text>
          <div className='wrapper_select'>
            <Card.Text className='margin-0'>Select Hotel Service Fee</Card.Text>
            <Select
              isClearable
              placeholder="Please Choose"
              className='select'
              options={[
                {
                  value: 'custom',
                  label: 'Custom Service Fee'
                },
                {
                  value: 'selected',
                  label: 'Hotel Service Fee 1'
                },
              ]}
              onChange={(selected) => setisFieldSelected({
                ...isFieldSelected,
                hotel: {
                  key: selected.value,
                  isSelected: true
                }
              })}
              width={'300px'}
            />
          </div>
        </div>
        <div className='divider mb-3 mt-3' />
        {isFieldSelected.hotel.isSelected && (
          <>
            <div className='box_information'>
              <Row>
                <Col sm={12} lg={6} style={{ borderRight: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-start'>
                  <Card.Title className='uppercase text-bold mb-3'>DOMESTIC HOTEL SERVICE FEE</Card.Title>
                  {isFieldSelected.hotel.key === 'selected' && (
                    <Card.Text className='mb-3'>IDR 125.000 /Ticket</Card.Text>
                  )}
                  {isFieldSelected.hotel.key === 'custom' && (
                    <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                      <div>
                        <Form.Check
                          name='hotel-domestic-1'
                          id='hotel-domestic-1'
                          checked={activeRadioHotel.domestic === 'hotel-domestic-1'}
                          onChange={(e) => handleChange(e, 'hotel_domestic')}
                          label='Fixed Amount'
                          type="radio"
                          className='mr-2 mb-2'
                        />
                        {activeRadioHotel.domestic === 'hotel-domestic-1' && (
                          <div style={{ paddingLeft: '26px' }} className='mt-2'>
                            <Form.Group as={Row} className='row d-flex justify-content-start align-items-start  form-group mb-3'>
                              <Form.Label column>
                                IDR
                              </Form.Label>
                              <Form.Control
                                type="text"
                                minLength={1}
                                maxLength={16}
                                placeholder=""
                                style={{ width: 150 }}
                                className='mr-3 ml-2'
                              />
                              <div className='d-flex flex-column justify-content-start mt-1'>
                                {['/Ticket', '/Person', '/Transaction'].map((res, i) =>
                                  <Form.Check
                                    name={`fixedAmount-${i+1}`}
                                    id={`fixedAmount-${i+1}`}
                                    // checked={activeRadioHotel.domestic === '1'}
                                    // onChange={(e) => handleChange(e, 'invoice')}
                                    label={res}
                                    type="radio"
                                    className='mb-2'
                                  />
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        )}
                      </div>
                      <Form.Check
                        name='hotel-domestic-2'
                        id='hotel-domestic-2'
                        checked={activeRadioHotel.domestic === 'hotel-domestic-2'}
                        onChange={(e) => handleChange(e, 'hotel_domestic')}
                        label='Percentage'
                        type="radio"
                        className='mb-2'
                      />
                      { activeRadioHotel.domestic === 'hotel-domestic-2' && (
                        <div style={{ paddingLeft: '35px' }}>
                          <Form.Group as={Row} className='row d-flex align-items-center form-group'>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              placeholder=""
                              style={{ width: 50 }}
                            />
                            <Card.Text className='m-0 ml-3 mr-3'>%</Card.Text>
                            <Form.Check
                              type='checkbox'
                              name='workingDays'
                              id='workingDays'
                              label='Include Taxes'
                            />
                          </Form.Group>
                        </div>
                      )}
                    </Form.Group>
                  )}
                </Col>
                <Col sm={12} lg={6} style={{ borderLeft: '1px solid #d3d3d3' }} className='d-flex flex-column align-items-center justify-content-start'>
                  <Card.Title className='uppercase text-bold mb-3'>INTERNATIONAL HOTEL SERVICE FEE</Card.Title>
                  {isFieldSelected.hotel.key === 'selected' && (
                    <Card.Text className='mb-3'>IDR 200.000 /Ticket</Card.Text>
                  )}
                  {isFieldSelected.hotel.key === 'custom' && (
                    <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                      <div>
                        <Form.Check
                          name='hotel-international-1'
                          id='hotel-international-1'
                          checked={activeRadioHotel.international === 'hotel-international-1'}
                          onChange={(e) => handleChange(e, 'hotel_international')}
                          label='Fixed Amount'
                          type="radio"
                          className='mr-2 mb-2'
                        />
                        {activeRadioHotel.international === 'hotel-international-1' && (
                          <div style={{ paddingLeft: '26px' }} className='mt-2'>
                            <Form.Group as={Row} className='row d-flex justify-content-start align-items-start  form-group mb-3'>
                              <Form.Label column>
                                IDR
                              </Form.Label>
                              <Form.Control
                                type="text"
                                minLength={1}
                                maxLength={16}
                                placeholder=""
                                style={{ width: 150 }}
                                className='mr-3 ml-2'
                              />
                              <div className='d-flex flex-column justify-content-start mt-1'>
                                {['/Ticket', '/Person', '/Transaction'].map((res, i) =>
                                  <Form.Check
                                    name={`fixedAmount-${i+1}`}
                                    id={`fixedAmount-${i+1}`}
                                    // checked={activeRadioHotel.international === '1'}
                                    // onChange={(e) => handleChange(e, 'invoice')}
                                    label={res}
                                    type="radio"
                                    className='mb-2'
                                  />
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        )}
                      </div>
                      <Form.Check
                        name='hotel-international-2'
                        id='hotel-international-2'
                        checked={activeRadioHotel.international === 'hotel-international-2'}
                        onChange={(e) => handleChange(e, 'hotel_international')}
                        label='Percentage'
                        type="radio"
                        className='mb-2'
                      />
                      { activeRadioHotel.international === 'hotel-international-2' && (
                        <div style={{ paddingLeft: '35px' }}>
                          <Form.Group as={Row} className='row d-flex align-items-center form-group'>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              placeholder=""
                              style={{ width: 50 }}
                            />
                            <Card.Text className='m-0 ml-3 mr-3'>%</Card.Text>
                            <Form.Check
                              type='checkbox'
                              name='workingDays'
                              id='workingDays'
                              label='Include Taxes'
                            />
                          </Form.Group>
                        </div>
                      )}
                    </Form.Group>
                  )}
                </Col>
              </Row>
            </div>
            {isFieldSelected.hotel.key === 'custom' && (
              <button
                type="button"
                onClick={() => handleChangeModal('hotel')}
                className="btn btn-warning button-new mt-3 mb-4 ml-auto mr-2 cursor-pointer"
              >
                <img src={createIcon} className="mr-1" alt="new"  />
                Add Override Service Fee
              </button>
            )}
            {isFieldSelected.hotel.key === 'selected' && (
              <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
                <BbDataTable {...paramsHotel} onReset={() => handleReset('hotel')} />
              </div>
            )}
          </>
        )}
      </section>

      {/* other */}
      <section className='mb-4 ml-2'>
        <div className='wrapper_header'>
          <Card.Text className='uppercase margin-0'>
            other
          </Card.Text>
          <div className='wrapper_select'>
            <Card.Text className='margin-0'>Select Other Service Fee</Card.Text>
            <Select
              isClearable
              placeholder="Please Choose"
              className='select'
              options={[
                {
                  value: 'custom',
                  label: 'custom'
                },
                {
                  value: 'noncustom',
                  label: 'not-custom'
                },
              ]}
              onChange={(selected) => setisFieldSelected({
                ...isFieldSelected,
                other: {
                  key: selected.value,
                  isSelected: true
                }
              })}
              width={'300px'}
            />
          </div>
        </div>
        <div className='divider mb-3 mt-3' />
        {isFieldSelected.other.isSelected &&
          isFieldSelected.other.key === 'custom' ? (
            <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
              <BbDataTable {...paramsOther.custom} onReset={() => handleReset('other')} modalContent={ModalCustomServiceFee} />
            </div>
          ) : isFieldSelected.other.isSelected &&
          isFieldSelected.other.key === 'noncustom' && (
            <div className='mt-3' style={{ width: '98%', margin: '0 auto' }}>
              <BbDataTable {...paramsOther.nonCustom} onReset={() => handleReset('other')} />
            </div>
          )
        }
      </section>
    </div>
  )
}


const ServiceFee = props => {

  const [key, setKey] = useState('travel_consultant_assistant')
  const [selected, setselected] = useState(true)
  const [activeRadio, setactiveRadio] = useState('2')
  const [isModalVisible, setisModalVisible] = useState({
    flight: false,
    hotel: false
  })

  const handleChange = (e, type) => {
    const { name } = e.target

    switch (type) {
      case 'service_fee' :
        setactiveRadio(name)
        break;

      default:
        break;
    }
  }

  const handleChangeModal = (type) => {
    setisModalVisible({ ...isModalVisible, [type]: true })
  }

  const tabList = [
    {
      key: 'travel_consultant_assistant',
      title: 'TRAVEL CONSULTANT ASSISTANT',
      children: (<TravelConsultantAssistant handleChangeModal={handleChangeModal} />)
    },
    {
      key: 'self_service_booking_tool',
      title: 'SELF SERVICE BOOKING TOOL',
      children: (<TravelConsultantAssistant />)
    },
    {
      key: 'personal_travel',
      title: 'PERSONAL TRAVEL',
      children: (<TravelConsultantAssistant />)
    },
  ]

  return (
    <div className='service_fee'>
      <Form>
        <Card style={{ border: '1px solid #d3d3d3' }}>
          <Card.Body>
            <h3 className="card-heading">Service Fee</h3>
            <Form.Group as={Row} className='align-items-center form-group ml-2'>
              <Form.Label column lg={4}>
                Apply Bundling Service Fee? <div className='tooltips' />
              </Form.Label>
              <Col md={3} lg={3}>
                <Form.Check
                  // name
                  id='1'
                  type="switch"
                  checked={selected}
                  onChange={() => setselected(!selected)}
                />
              </Col>
            </Form.Group>
            { selected && (
              <Form.Group as={Row} className='align-items-center form-group ml-2 mt-2'>
                <Form.Label column lg={4}>
                  Get Service Fee From
                </Form.Label>
                <Col md={3} lg={7} className='row d-flex align-items-center'>
                  <Form.Check
                    name='1'
                    id='1'
                    checked={activeRadio === '1'}
                    onChange={(e) => handleChange(e, 'service_fee')}
                    label='Per Transaction'
                    type="radio"
                    className='mr-3'
                  />
                  <Form.Check
                    name='2'
                    id='2'
                    checked={activeRadio === '2'}
                    onChange={(e) => handleChange(e, 'service_fee')}
                    label='Batch'
                    type="radio"
                    className='mr-2'
                  />
                </Col>
              </Form.Group>
            )}
            <div className='card mt-4'>
              <Tabs
                id='service-fee'
                activeKey={key}
                onSelect={(key) => setKey(key)}
                className='tabs mb-4'
                mountOnEnter
                unmountOnExit
              >
                {tabList.map((res,i) =>
                  <TabPane
                    key={i}
                    eventKey={res.key}
                    title={
                      <div className="d-md-flex flex-row bd-highlight">
                        <span className="tabs-text uppercase">{res.title}</span>
                      </div>
                    }
                  >
                    {res.children}
                  </TabPane>
                )}
              </Tabs>
            </div>
          </Card.Body>
        </Card>
        <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
          >
            SAVE
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

      {/* flight */}
      <Modal
        show={isModalVisible.flight}
        onHide={() => setisModalVisible({ flight: false, hotel: false })}
        aria-labelledby="contained-modal-title-vcenter"
			  centered
        className='modal_service_fee'
      >
        <Modal.Header closeButton className="bb-modal-header" />
        <ModalBody className="bb-modal-body">
          <p className="bb-modal-title" style={{ marginBottom: '50px' }}>ADD OVERRIDE FLIGHT SERVICE FEE</p>
          <Form style={{ backgroundColor: 'transparent', padding: '0 30px 0px 20px' }}>
            <Row>
              <Col sm={12}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Destination <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Airline Service Type
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Specified Airline
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Specified Source
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group d-flex align-items-start'>
                  <Form.Label column sm={4}>
                    Service Fee <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={8} className='col-form-label'>
                    <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                      <div>
                        <Form.Check
                          name='hotel-international-1'
                          id='hotel-international-1'
                          // checked={activeRadioHotel.international === 'hotel-international-1'}
                          onChange={(e) => handleChange(e, 'hotel_international')}
                          label='Fixed Amount'
                          type="radio"
                          className='mr-2 mb-2'
                        />
                        <div style={{ paddingLeft: '26px' }} className='mt-2'>
                          <Form.Group as={Row} className='row d-flex justify-content-start align-items-start  form-group mb-3'>
                            <Form.Label column>
                              IDR
                            </Form.Label>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              placeholder=""
                              style={{ width: 150 }}
                              className='mr-3 ml-2'
                            />
                            <div className='d-flex flex-column justify-content-start mt-1'>
                              {['/Ticket', '/Person', '/Transaction'].map((res, i) =>
                                <Form.Check
                                  name={`fixedAmount-${i+1}`}
                                  id={`fixedAmount-${i+1}`}
                                  // checked={activeRadioHotel.international === '1'}
                                  // onChange={(e) => handleChange(e, 'invoice')}
                                  label={res}
                                  type="radio"
                                  className='mb-2'
                                />
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                      <Form.Check
                        name='hotel-international-2'
                        id='hotel-international-2'
                        // checked={activeRadioHotel.international === 'hotel-international-2'}
                        onChange={(e) => handleChange(e, 'hotel_international')}
                        label='Percentage'
                        type="radio"
                        className='mb-2'
                      />
                      <div style={{ paddingLeft: '35px' }}>
                        <Form.Group as={Row} className='row d-flex align-items-center form-group'>
                          <Form.Control
                            type="text"
                            minLength={1}
                            maxLength={16}
                            placeholder=""
                            style={{ width: 50 }}
                          />
                          <Card.Text className='m-0 ml-3 mr-3'>%</Card.Text>
                          <Form.Check
                            type='checkbox'
                            name='workingDays'
                            id='workingDays'
                            label='Include Taxes'
                          />
                        </Form.Group>
                      </div>
                    </Form.Group>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                // disabled={isSubmitting || !dirty}
                style={{ marginRight: 15, padding: '0 25px' }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setisModalVisible(false)
                }}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* hotel */}
      <Modal
        show={isModalVisible.hotel}
        onHide={() => setisModalVisible({ flight: false, hotel: false })}
        aria-labelledby="contained-modal-title-vcenter"
			  centered
        className='modal_service_fee'
      >
        <Modal.Header closeButton className="bb-modal-header" />
        <ModalBody className="bb-modal-body">
          <p className="bb-modal-title" style={{ marginBottom: '50px' }}>ADD OVERRIDE HOTEL SERVICE FEE</p>
          <Form style={{ backgroundColor: 'transparent', padding: '0 30px 0px 20px' }}>
            <Row>
              <Col sm={12}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Destination <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Specified Source
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Supplier
                  </Form.Label>
                  <Col lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
                      className='select'
                      options={[
                        {
                          value: 'custom',
                          label: 'Custom Service Fee'
                        },
                        {
                          value: 'selected',
                          label: 'Flight Service Fee 1'
                        },
                      ]}
                      onChange={() => {}}
                      width={'70%'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group d-flex align-items-start'>
                  <Form.Label column sm={4}>
                    Service Fee <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={8} className='col-form-label'>
                    <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                      <div>
                        <Form.Check
                          name='hotel-international-1'
                          id='hotel-international-1'
                          // checked={activeRadioHotel.international === 'hotel-international-1'}
                          onChange={(e) => handleChange(e, 'hotel_international')}
                          label='Fixed Amount'
                          type="radio"
                          className='mr-2 mb-2'
                        />
                        <div style={{ paddingLeft: '26px' }} className='mt-2'>
                          <Form.Group as={Row} className='row d-flex justify-content-start align-items-start  form-group mb-3'>
                            <Form.Label column>
                              IDR
                            </Form.Label>
                            <Form.Control
                              type="text"
                              minLength={1}
                              maxLength={16}
                              placeholder=""
                              style={{ width: 150 }}
                              className='mr-3 ml-2'
                            />
                            <div className='d-flex flex-column justify-content-start mt-1'>
                              {['/Ticket', '/Person', '/Transaction'].map((res, i) =>
                                <Form.Check
                                  name={`fixedAmount-${i+1}`}
                                  id={`fixedAmount-${i+1}`}
                                  // checked={activeRadioHotel.international === '1'}
                                  // onChange={(e) => handleChange(e, 'invoice')}
                                  label={res}
                                  type="radio"
                                  className='mb-2'
                                />
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                      <Form.Check
                        name='hotel-international-2'
                        id='hotel-international-2'
                        // checked={activeRadioHotel.international === 'hotel-international-2'}
                        onChange={(e) => handleChange(e, 'hotel_international')}
                        label='Percentage'
                        type="radio"
                        className='mb-2'
                      />
                      <div style={{ paddingLeft: '35px' }}>
                        <Form.Group as={Row} className='row d-flex align-items-center form-group'>
                          <Form.Control
                            type="text"
                            minLength={1}
                            maxLength={16}
                            placeholder=""
                            style={{ width: 50 }}
                          />
                          <Card.Text className='m-0 ml-3 mr-3'>%</Card.Text>
                          <Form.Check
                            type='checkbox'
                            name='workingDays'
                            id='workingDays'
                            label='Include Taxes'
                          />
                        </Form.Group>
                      </div>
                    </Form.Group>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                // disabled={isSubmitting || !dirty}
                style={{ marginRight: 15, padding: '0 25px' }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setisModalVisible(false)
                }}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

ServiceFee.propTypes = {}

export default ServiceFee