import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, Modal, ModalBody, } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components & styles
import ModalCreate from 'components/Modal/bb-modal'
import Select from "components/form/select"
import './_form.sass'

// utils
import createIcon from "assets/icons/create.svg"
import Api from "config/api"
import FormInputControl from 'components/form/input-control'
import FormInputDatePeriod from 'components/form/input-date-period'

const CreditLimit = ({
  isMobile
}) => {
  const [key, setKey] = useState('credit-limit-by-project')
  const [isModalVisible, setisModalVisible] = useState(false)
  const [isThereProject, setisThereProject] = useState(true)

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
          <Form.Label column sm={3} className='mr-5 pl-0' style={{ maxWidth: '300px' }}>Share Credit Limit with other company (Petro XYZ)</Form.Label>
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
          <Form.Label column sm={3} className='mr-5 pl-0'>Total Limit Amount (IDR)</Form.Label>
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
          onClick={() => setisModalVisible(true)}
          className="btn btn-warning float-right button-new"
        >
          <img src={createIcon} className="mr-1" alt="new"  />
          Create New
        </button>
      </Form>
    </>
  )

  const CreditLimitByProject = () => (
    <>
     {isThereProject ? (
      <Form>
        <Card style={{ boxShadow: 'none' }} className='mb-5'>
          <Card.Body className='pl-3 pr-3 pb-0 pt-0'>
            <h3 className="card-heading uppercase mb-3">credit limit</h3>
            <Row>
              <Col sm={9} lg={12}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Project Name"
                      required={true}
                      // value={values.corporateCode}
                      // name="corporateCode"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 300 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Total Limit Amount (IDR)"
                      required={true}
                      // value={values.corporateCode}
                      // name="corporateCode"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 150 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputDatePeriod
                      label='Contract Period'
                      dateStart=''
                      dateEnd=''
                      dateStartOnChange={() => {}}
                      dateEndOnChange={() => {}}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Period based on
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col className='d-flex align-items-center p-0' sm={5}>
                    <Col lg={6}>
                      <Form.Check
                        name='approval'
                        checked
                        type='radio'
                        label="Booking Date"
                        onChange={(e) => {}}
                      />
                    </Col>
                    <Col lg={6}>
                      <Form.Check
                        name='approval'
                        checked
                        type='radio'
                        label="Traveling Date"
                        onChange={(e) => {}}
                      />
                    </Col>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card style={{ boxShadow: 'none' }}>
          <Card.Body className='pl-3 pr-3 pb-0 pt-0'>
            <h3 className="card-heading uppercase mb-3">cost center</h3>
            <div>
              <button
                type="button"
                onClick={() => setisModalVisible(true)}
                className="btn btn-warning float-right button-new"
              >
                <img src={createIcon} className="mr-1" alt="new"  />
                Create New
              </button>
              <Card.Text>No Project found</Card.Text>
            </div>
          </Card.Body>
        </Card>
        <div className="ml-3 mt-5 row justify-content-md-start justify-content-center">
          <Button
            variant="primary"
            type="submit"
            disabled={false}
            style={{ marginRight: 20, minWidth: '90px' }}
          >
            SAVE
          </Button>
          <Button
            variant="secondary"
            // onClick={() => props.history.goBack()}
            style={{ minWidth: '90px' }}
          >
            CANCEL
          </Button>
        </div>
      </Form>
     ) : (
       <div className='pl-4'>
          <button
            type="button"
            onClick={() => setisModalVisible(true)}
            className="btn btn-warning float-right button-new"
          >
            <img src={createIcon} className="mr-1" alt="new"  />
            Create New
          </button>
          <Card.Text>No Project found</Card.Text>
        </div>
      )}
    </>
  )

  const tabList = [
    {
      key: 'master-credit-limit',
      title: 'MASTER CREDIT LIMIT',
      children: (<MasterCreditLimit />)
    },
    {
      key: 'credit-limit-by-project',
      title: 'CREDIT LIMIT BY PROJECT',
      children: (<CreditLimitByProject />)
    },
  ]

  return (
    <>
      <div>
        <Card style={{ marginBottom: 0 }}>
          <Card.Body>
            {isMobile ? "" : <h3 className="card-heading">Credit Limit</h3>}
            <div className='credit_limit'>
              <div className='card mt-2 pb-2'>
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
                          <span className="tabs-text uppercase">{res.title}</span>
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
      </div>

      <Modal
        show={isModalVisible}
        onHide={() => setisModalVisible(false)}
        aria-labelledby="contained-modal-title-vcenter"
			  centered
      >
        <Modal.Header closeButton className="bb-modal-header" />
        <ModalBody className="bb-modal-body">
          <p className="bb-modal-title">New Cost Center</p>
          <Form style={{ backgroundColor: 'transparent', padding: '0 30px 0px 20px' }}>
            <Row>
              <Col sm={12}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Name
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={8}>
                    <Form.Control
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Limit (IDR)
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={8}>
                    <Form.Control
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      style={{ width: 150 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Allocation Type
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col className='d-flex align-items-center' md={3} lg={8}>
                    <Col lg={5}>
                      <Form.Check
                        name='approval'
                        checked
                        type='radio'
                        label="Shared"
                        onChange={(e) => {}}
                      />
                    </Col>
                    <Col lg={7}>
                      <Form.Check
                        name='approval'
                        checked
                        type='radio'
                        label="Fixed"
                        onChange={(e) => {}}
                      />
                    </Col>
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
    </>
  )
}

CreditLimit.propTypes = {}

export default CreditLimit