import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, Modal, ModalBody } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from 'react-datepicker'

// components & styles
import Select from "components/form/select"
import './_form.sass'
import FormInputDatePeriod from 'components/form/input-date-period'

// utils


const InvoiceSettings = props => {

  const [activeRadioInvoice, setactiveRadioInvoice] = useState('2')
  const [activeRadioPeriod, setactiveRadioPeriod] = useState('2')
  const [activeRadioDaysInWeeks, setactiveRadioDaysInWeeks] = useState('1')

  const handleChange = (e, type) => {
    const { name } = e.target

    switch (type) {
      case 'invoice':
        setactiveRadioInvoice(name);
        break;

      case 'period':
        setactiveRadioPeriod(name)
        break;

      case 'week':
        setactiveRadioDaysInWeeks(name)
        break;

      default:
        break;
    }
  };

  const daysInWeek = [
    {
      key: '1',
      label: 'Mon'
    },
    {
      key: '2',
      label: 'Tue'
    },
    {
      key: '3',
      label: 'Wed'
    },
    {
      key: '4',
      label: 'Thu'
    },
    {
      key: '5',
      label: 'Fri'
    },
    {
      key: '6',
      label: 'Sat'
    },
    {
      key: '7',
      label: 'Sun'
    },
  ]

  const optionInvoiceGroup = [
    {
      label: 'Type Of Invoice',
      value: 'type-of-invoice'
    },
    {
      label: 'Domestic/ International',
      value: 'domestic-international'
    },
    {
      label: 'Cost Center',
      value: 'cost-center'
    },
    {
      label: 'Project',
      value: 'project'
    },
    {
      label: 'Booker',
      value: 'booker'
    },
    {
      label: 'Travel Request',
      value: 'travel-request'
    },
  ]

  return (
    <Form>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Invoice Settings</h3>
          <div className='invoice_settings pl-2 pr-2'>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>DUE DAYS</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Invoice Due
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Control
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      style={{ width: '55px' }}
                      className='mr-2'
                    />
                  </Col>
                  <Col lg={2}>
                    <Card.Text className='m-0'>Days</Card.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Tolerance
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Control
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      style={{ width: '55px' }}
                      className='mr-2'
                    />
                  </Col>
                  <Col lg={2}>
                    <Card.Text className='m-0'>Days</Card.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Maximum number of invoices overdue
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Control
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      style={{ width: '55px' }}
                      className='mr-2'
                    />
                  </Col>
                  <Col lg={2}>
                    <Card.Text className='m-0'>Invoices</Card.Text>
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                INVOICE DELIVERY
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Invoice Delivered by Post Mail
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                      style={{ width: '55px' }}
                      className='mr-2'
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                SPLIT INVOICE
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Split Invoice for Service Fee
                    <div className='tooltips' />
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                      className='mr-2'
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Split Invoice per-Type of Transaction
                    <div className='tooltips' />
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                      className='mr-2'
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                TAX INVOICE
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Require Tax Invoice
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                      className='mr-2'
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                INVOICE PAYMENT
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Pay Invoice with Credit Card
                  </Form.Label>
                  <Col md={3} lg={1}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                      className='mr-2'
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                INVOICE DELIVERY PERIOD
              </Card.Header>
              <Card.Body>
              <Form.Group className='form-group'>
                <Form.Check
                  name='1'
                  id='1'
                  checked={activeRadioInvoice === '1'}
                  onChange={(e) => handleChange(e, 'invoice')}
                  label='Per Transaction'
                  type="radio"
                  className='mr-2 mb-2'
                />
                <Form.Check
                  name='2'
                  id='2'
                  checked={activeRadioInvoice === '2'}
                  onChange={(e) => handleChange(e, 'invoice')}
                  label='Batch'
                  type="radio"
                  className='mr-2 mb-2'
                />
                { activeRadioInvoice === '2' && (
                  <div style={{ paddingLeft: '26px' }}>
                    <Form.Group as={Row} className='align-items-center form-group mb-3'>
                      <Form.Label column lg={4}>
                        Specify Number of Batches
                      </Form.Label>
                      <Col md={3} lg={2}>
                        <Select
                          isClearable
                          placeholder=""
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
                          onChange={() => {}}
                          width={'60px'}
                          // name
                          // value
                          // components={
                          //   isView
                          //     ? {
                          //         DropdownIndicator: () => null,
                          //         IndicatorSeparator: () => null,
                          //       }
                          //     : null
                          // }
                          // isDisabled={isView}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='align-items-start form-group'>
                      <Form.Label column lg={4} className='pt-0'>
                        Period Type
                      </Form.Label>
                      <Col md={3} lg={8}>
                        <Form.Group className='form-group'>

                          <Form.Check
                            name='1'
                            id='1'
                            checked={activeRadioPeriod === '1'}
                            onChange={(e) => handleChange(e, 'period')}
                            label='Day Period'
                            type="radio"
                            className='mb-2'
                          />
                          { activeRadioPeriod === '1' && (
                            <div className='mb-4' style={{ paddingLeft: '26px' }}>
                              <Form.Group as={Row} className='form-group align-items-center'>
                                <div
                                  style={{
                                    width: '18px',
                                    height: '18px',
                                    background: 'red'
                                  }}
                                  className='mr-2'
                                />
                                <Form.Label column lg={3}>
                                  Day - from
                                </Form.Label>
                                <Col lg={5} className='row d-flex align-content-center'>
                                  <Col lg={4}>
                                    <DatePicker
                                      className="form-control"
                                      dateFormat="dd MMMM yyyy"
                                      selected={props.dateStart}
                                      onChange={props.dateStartOnChange}
                                    />
                                  </Col>
                                  <Col lg={2}>
                                    <span className="text-center m-0 mt-1" style={{ display: 'block' }}>to</span>
                                  </Col>
                                  <Col lg={4}>
                                    <DatePicker
                                      className="form-control"
                                      dateFormat="dd MMMM yyyy"
                                      selected={props.dateEnd}
                                      onChange={props.dateEndOnChange}
                                    />
                                  </Col>
                                </Col>
                              </Form.Group>
                            </div>
                          )}

                          <Form.Check
                            name='2'
                            id='2'
                            checked={activeRadioPeriod === '2'}
                            onChange={(e) => handleChange(e, 'period')}
                            label='Week Period'
                            type="radio"
                            className='mb-2'
                          />
                          {activeRadioPeriod === '2' && (
                            <div className='mb-4' style={{ paddingLeft: '26px' }}>
                              <Form.Group as={Row} className='align-items-center form-group mb-3'>
                                <Form.Label column lg={1} className='mr-2'>
                                  Every
                                </Form.Label>
                                <Col md={2} lg={5} className='row d-flex align-items-center'>
                                  <Form.Control
                                    type="text"
                                    minLength={1}
                                    maxLength={16}
                                    placeholder=""
                                    style={{ width: '60px' }}
                                    className='mr-3'
                                  />
                                  <Card.Text className='m-0'>week(s)</Card.Text>
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row} className='align-items-center form-group'>
                                <Col lg={12} className='row d-flex align-items-center'>
                                  <Col lg={1} className='mr-3'>
                                    <Card.Text className='m-0'>on</Card.Text>
                                  </Col>
                                  <Col lg={9} className='row d-flex align-items-center'>
                                    {daysInWeek.map((res, i) =>
                                      <Col key={i} className='row d-flex justify-content-start'>
                                        <Form.Check
                                          key={i}
                                          name={res.key}
                                          id={res.key}
                                          checked={activeRadioDaysInWeeks === res.key}
                                          onChange={(e) => handleChange(e, 'week')}
                                          label={res.label}
                                          type="radio"
                                        />
                                      </Col>
                                    )}
                                  </Col>
                                </Col>
                              </Form.Group>
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='align-items-center form-group'>
                      <Form.Label column lg={4} className='m-0'>
                        Generate and send invoice on the next
                      </Form.Label>
                      <Col lg={8} className='row d-flex align-items-center'>
                        <Col md={2} lg={2} className='row d-flex align-items-center mr-3'>
                          <Select
                            isClearable
                            placeholder=""
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
                            onChange={() => {}}
                            width={'55px'}
                            className='mr-2'
                            // name
                            // value
                            // components={
                            //   isView
                            //     ? {
                            //         DropdownIndicator: () => null,
                            //         IndicatorSeparator: () => null,
                            //       }
                            //     : null
                            // }
                            // isDisabled={isView}
                          />
                          <Card.Text className='m-0'>day(s)</Card.Text>
                        </Col>
                        <Col md={3} lg={3} className='row d-flex align-items-center'>
                          <Form.Check
                            type='checkbox'
                            name='workingDays'
                            id='workingDays'
                            label='Working days'
                          />
                        </Col>
                      </Col>
                    </Form.Group>
                  </div>
                )}
              </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='title'>
                INVOICE GROUPING (Applicable for Batch Invoice only)
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Invoice Group
                    <div className='tooltips' />
                  </Form.Label>
                  <Col md={3} lg={6}>
                    {optionInvoiceGroup.map((res, i) =>
                      <Form.Check
                        type='checkbox'
                        name={res.value}
                        id={res.value}
                        label={res.label}
                        key={i}
                        className='mb-2'
                      />
                    )}
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                EMAIL CATEGORY
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group'>
                  <Form.Label column lg={4}>
                    Email Category
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Select
                      isClearable
                      placeholder="Please Choose"
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
                      onChange={() => {}}
                      width={'300px'}
                      // name
                      // value
                      // components={
                      //   isView
                      //     ? {
                      //         DropdownIndicator: () => null,
                      //         IndicatorSeparator: () => null,
                      //       }
                      //     : null
                      // }
                      // isDisabled={isView}
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ boxShadow: 'none' }}>
              <Card.Header className='uppercase title'>
                INVOICE EMAIL RECIPIENT
              </Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group mb-2'>
                  <Form.Label column lg={4}>
                    Invoice Email Recipient
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Select
                      isClearable
                      placeholder="Select Employee"
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
                      onChange={() => {}}
                      width={'300px'}
                      // name
                      // value
                      // components={
                      //   isView
                      //     ? {
                      //         DropdownIndicator: () => null,
                      //         IndicatorSeparator: () => null,
                      //       }
                      //     : null
                      // }
                      // isDisabled={isView}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group mb-1'>
                  <Form.Label column lg={4}>
                    Travel Booker Requires Invoice
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group mb-1'>
                  <Form.Label column lg={4}>
                    Traveler Requires Invoice
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group mb-1'>
                  <Form.Label column lg={4}>
                    Personal Traveler Requires Invoice
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Form.Check
                      // name
                      // id
                      type="switch"
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
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

InvoiceSettings.propTypes = {}

export default InvoiceSettings