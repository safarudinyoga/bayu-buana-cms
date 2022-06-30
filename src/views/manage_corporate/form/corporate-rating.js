import React, { useEffect } from 'react'
import { Form, Row, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from 'react-datepicker'

// components
import Select from "components/form/select"
import useQuery from "lib/query"
import './_form.sass'

const CorporateRating = () => {
  const isView = useQuery().get("action") === "view"
  return (
    <Form>
      <Card>
        <Card.Body>
        <h3 className="card-heading">Corporate Rating</h3>
        <div className='corporate_rating manage_corporate_card pl-2 pr-2'>
          <Card>
            <Card.Header className='header_card_corporate uppercase title'>BY TRANSACTION</Card.Header>
            <Card.Body>
              <Form.Group as={Row} className='align-items-center form-group m-0 mb-3'>
                <Form.Label column lg={4}>
                  Transactional Value
                </Form.Label>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  options={[
                    {
                      value: 'value',
                      label: 'value ??'
                    },
                  ]}
                  onChange={() => {}}
                  width={'350px'}
                  // name
                  // value
                  components={
                    isView
                      ? {
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }
                      : null
                  }
                  isDisabled={isView}
                />
              </Form.Group>
              <Form.Group as={Row} className='align-items-center form-group m-0'>
                <Form.Label column lg={4}>
                  Transactional Volume
                </Form.Label>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  options={[
                    {
                      value: 'value',
                      label: 'value ??'
                    },
                  ]}
                  onChange={() => {}}
                  width={'350px'}
                  // name
                  // value
                  components={
                    isView
                      ? {
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }
                      : null
                  }
                  isDisabled={isView}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='header_card_corporate uppercase title'>BY PAYMENT</Card.Header>
            <Card.Body>
              <Form.Group as={Row} className='align-items-center form-group m-0 mb-3'>
                <Form.Label column lg={4}>
                  Payment Punctuality
                </Form.Label>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  options={[
                    {
                      value: 'value',
                      label: 'value ??'
                    },
                  ]}
                  onChange={() => {}}
                  width={'350px'}
                  // name
                  // value
                  components={
                    isView
                      ? {
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }
                      : null
                  }
                  isDisabled={isView}
                />
              </Form.Group>
              <Form.Group as={Row} className='align-items-center form-group m-0'>
                <Form.Label column lg={4}>
                  Payment Status
                </Form.Label>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  options={[
                    {
                      value: 'value',
                      label: 'value ??'
                    },
                  ]}
                  onChange={() => {}}
                  width={'350px'}
                  // name
                  // value
                  components={
                    isView
                      ? {
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }
                      : null
                  }
                  isDisabled={isView}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className='header_card_corporate uppercase title'>OTHERS</Card.Header>
            <Card.Body>
              <Form.Group as={Row} className='align-items-center form-group m-0 mb-3'>
                <Form.Label column lg={4}>
                  Client Since
                </Form.Label>
                <DatePicker
                  className='date form-control'
                  dateFormat="dd MMMM yyyy"
                  placeholderText='DD/MM/YYYY'
                  // selected={date}
                  // onSelect={handleDateSelect}
                  // onChange={handleDateChange}
                />
              </Form.Group>
              <Form.Group as={Row} className='align-items-center form-group m-0'>
                <Form.Label column lg={4}>
                  Rating Summary
                </Form.Label>

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
  )
}

export default CorporateRating