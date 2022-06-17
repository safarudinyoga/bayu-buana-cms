import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router"
import { Form, Row, Col, Card, Button, Modal, ModalBody } from "react-bootstrap"

// components
import Select from "components/form/select"


// utils
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"

const ModalCustomServiceFee = props => {
	const dispatch = useDispatch()

  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const isView = showCreateModal.disabled_form || props.isView

  useEffect(() => {
    let formId = showCreateModal.id || props.id
    let modalTitle = 'ADD OVERRIDE OTHER SERVICE FEE'

    dispatch(setModalTitle(modalTitle))
  }, [])


  return (
    <Form style={{ backgroundColor: 'transparent', padding: '0 30px 0px 20px' }}>
      <Row>
        <Col sm={12}>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3}>
              Type of Other Service <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={9}>
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
            <Form.Label column sm={3}>
              Service Fee <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={9} className='col-form-label'>
              <Form.Group className='form-group' style={{ minWidth: '60%', margin: '0 auto' }}>
                <div>
                  <Form.Check
                    name='hotel-international-1'
                    id='hotel-international-1'
                    // checked={activeRadioHotel.international === 'hotel-international-1'}
                    // onChange={(e) => handleChange(e, 'hotel_international')}
                    label='Fixed Amount'
                    type="radio"
                    className='mr-2 mb-2'
                  />
                  <div style={{ paddingLeft: '26px' }} className='mt-2'>
                    <Form.Group as={Row} className='row d-flex justify-content-start align-items-start form-group mb-1'>
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
                        {['/Unit', '/Transaction'].map((res, i) =>
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
                  // onChange={(e) => handleChange(e, 'hotel_international')}
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
          onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

ModalCustomServiceFee.propTypes = {}

export default withRouter(ModalCustomServiceFee)