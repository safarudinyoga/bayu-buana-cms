import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components & styles
import Select from "components/form/select"
import './_form.sass'

// utils
import createIcon from "assets/icons/create.svg"
import Api from "config/api"

const CreditLimit = ({
  isMobile
}) => {
  const [key, setKey] = useState('master-credit-limit')

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const MasterCreditLimit = () => (
    <>
      <Form className='master_credit_limit'>
        <Form.Group className='wrapper'>
          <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Share Credit Limit with other company (Petro XYZ)</Form.Label>
          <Col className='d-flex align-items-center' md={3} lg={9}>
            <Col lg={3}>
              <Form.Check
                name='gender'
                checked
                type='radio'
                label="Yes"
                onChange={(e) => {}}
              />
            </Col>
            <Col lg={9}>
              <Form.Check
                name='gender'
                checked
                type='radio'
                label="No"
                onChange={(e) => {}}
              />
            </Col>
          </Col>
        </Form.Group>
        <Form.Group className='wrapper'>
          <Form.Label column sm={3} className='mr-5'>Total Limit Amount (IDR)</Form.Label>
          <Col md={3} lg={9}>
            <Form.Control
              type='text'
              // minLength={1}
              // maxLength={16}
              placeholder=''
              style={{ width: '150px' }}
            />
          </Col>
        </Form.Group>
        <Card.Text className='mt-3 mb-3'>Credit Tolerance</Card.Text>
        <Card className='box'>
          <Card.Body style={{ padding: '12px 22px' }}>
            <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>TOLERANCE 1</Card.Text>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Amount (IDR)</Form.Label>
              <Col md={3} lg={9}>
                <Form.Control
                  type='text'
                  // minLength={1}
                  // maxLength={16}
                  placeholder=''
                  style={{ width: '150px' }}
                />
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Ask approval</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='gender'
                    checked
                    type='radio'
                    label="Yes"
                    onChange={(e) => {}}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='gender'
                    checked
                    type='radio'
                    label="No"
                    onChange={(e) => {}}
                  />
                </Col>
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Select approver</Form.Label>
              <Col md={3} lg={9}>
                <Select
                  isClearable
                  placeholder="Please choose"
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
                  width={'350px'}
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
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Approval By</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='approval'
                    checked
                    type='radio'
                    label="Either One"
                    onChange={(e) => {}}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='approval'
                    checked
                    type='radio'
                    label="All"
                    onChange={(e) => {}}
                  />
                </Col>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className='box' style={{ marginBottom: '50px' }}>
          <Card.Body style={{ padding: '12px 22px' }}>
            <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>TOLERANCE 1</Card.Text>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Amount (IDR)</Form.Label>
              <Col md={3} lg={9}>
                <Form.Control
                  type='text'
                  // minLength={1}
                  // maxLength={16}
                  placeholder=''
                  style={{ width: '150px' }}
                />
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Ask approval</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='gender'
                    checked
                    type='radio'
                    label="Yes"
                    onChange={(e) => {}}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='gender'
                    checked
                    type='radio'
                    label="No"
                    onChange={(e) => {}}
                  />
                </Col>
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Select approver</Form.Label>
              <Col md={3} lg={9}>
                <Select
                  isClearable
                  placeholder="Please choose"
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
                  width={'350px'}
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
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Approval By</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='approval'
                    checked
                    type='radio'
                    label="Either One"
                    onChange={(e) => {}}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='approval'
                    checked
                    type='radio'
                    label="All"
                    onChange={(e) => {}}
                  />
                </Col>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
        <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>COST CENTER</Card.Text>
        <button
          type="button"
          onClick={() => {}}
          className="btn btn-warning float-right button-new"
        >
          <img src={createIcon} className="mr-1" alt="new" />
          Create New
        </button>
      </Form>
    </>
  )

  const tabList = [
    {
      key: 'master-credit-limit',
      children: (<MasterCreditLimit />)
    },
    {
      key: 'credit-limit-by-project',
      children: (<></>)
    },
  ]

  return (
    <div>
      <Card style={{ marginBottom: 0 }}>
        <Card.Body>
          {isMobile ? "" : <h3 className="card-heading">Credit Limit</h3>}
          <div className='credit_limit'>
            <div className='card mt-2 pb-5'>
              <Tabs
                id='credit-limit'
                activeKey={key}
                onSelect={(key) => setKey(key)}
                className='tabs mb-4'
                mountOnEnter
                unmountOnExit
              >
                {tabList.map((res, i) =>
                  <TabPane
                    key={i}
                    className="m-3 pl-2 pr-2"
                    eventKey={res.key}
                    title={
                      <div className="d-md-flex flex-row bd-highlight">
                        <span className="tabs-text uppercase">{res.key}</span>
                      </div>
                  }
                  >
                    {res.children}
                  </TabPane>
                )}
              </Tabs>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

CreditLimit.propTypes = {}

export default CreditLimit