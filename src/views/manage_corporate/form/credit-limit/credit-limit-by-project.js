import React, { useRef } from 'react'
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { ReactSVG } from "react-svg"

import BbDataTable from 'components/table/bb-data-table'
import createIcon from "assets/icons/create.svg"
import CostCenterModal from 'views/manage_corporate/form/credit-limit/cost-center'
import useQuery from "lib/query"
import TextError from 'components/formik/textError'
import { handleYears, generateArrayOfYears } from 'lib/defineYearsRange'

const CreditLimitByProject = ({ isThereProject, setisThereProject, formikState, paramsCostCenter }) => {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = formikState
  const isView = useQuery().get("action") === "view"

  const calendarStartRef= useRef(null)
  const calendarEndRef= useRef(null)

  return (
    <>
     {isThereProject ? (
      <Form onSubmit={handleSubmit}>
        <Card style={{ boxShadow: 'none' }} className='mb-5'>
          <Card.Body className='pl-4 pr-4 pb-0 pt-0'>
            <h3 className="card-heading uppercase mb-3">credit limit</h3>
            <Row>
              <Col sm={9} lg={12}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Project Name <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Form.Control
                      name="project_name"
                      id="project_name"
                      value={values.project_name}
                      type="text"
                      minLength={1}
                      maxLength={256}
                      placeholder=""
                      style={{ width: '300px' }}
                      onChange={handleChange}
                      // disabled={isLoading}
                      readOnly={isView}
                      className={touched?.project_name && errors?.project_name && 'is-invalid'}
                    />
                    {touched?.project_name && errors?.project_name && (
                      <TextError>
                        {errors.project_name}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Total Limit Amount (IDR) <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={8}>
                    <Form.Control
                      name="total_limit_project"
                      id="total_limit_project"
                      value={values.total_limit_project}
                      type="text"
                      minLength={1}
                      maxLength={15}
                      placeholder=""
                      style={{ width: '150px' }}
                      onChange={handleChange}
                      // disabled={isLoading}
                      readOnly={isView}
                      className={touched?.total_limit_project && errors?.total_limit_project && 'is-invalid'}
                    />
                    {touched?.total_limit_project && errors?.total_limit_project && (
                      <TextError>
                        {errors.total_limit_project}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Period
                  </Form.Label>
                  <Col md={3} lg={8} className='row d-flex align-items-center'>
                    <Col lg={4}>
                      <DatePicker
                        ref={calendarStartRef}
                        className="form-control text-center"
                        dateFormat="dd MMMM yyyy"
                        onChange={(date) => {
                          setFieldValue('period.date_start', date)
                        }}
                        // disabled={isLoading}
                        readOnly={isView}
                        selected={values.period.date_start}
                        startDate={values.period.date_start}
                        endDate={values.period.date_end}
                        selectsStart
                        minDate={handleYears(10, new Date(), 'subtract')}
                        maxDate={handleYears(10, new Date(), 'add')}
                        monthsShown={2}
                        popperClassName='manage_corporate_date'
                        popperModifiers={[
                          {
                            name: "offset",
                            options: {
                              offset: [-180, 0],
                            },
                          },
                        ]}
                        shouldCloseOnSelect={false}
                        onSelect={(e) => {
                          // console.log({e,calendarEndRef})
                        }}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          monthDate,
                          customHeaderCount,
                          decreaseMonth,
                          increaseMonth,
                        }) => (
                          <div>
                            <button
                              aria-label="Previous Month"
                              className={
                                "react-datepicker__navigation react-datepicker__navigation--previous"
                              }
                              style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                              onClick={decreaseMonth}
                            >
                            </button>
                            <span className="react-datepicker__current-month">
                              {monthDate.toLocaleString("en-US", {
                                month: "long",
                                // year: "numeric",
                              })}
                              <select
                                value={moment(date).year()}
                                onChange={({ target: { value } }) => changeYear(value)}
                                className='select_year'
                              >
                                {generateArrayOfYears(10, 1010, 10).map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </span>
                            <button
                              aria-label="Next Month"
                              className={
                                "react-datepicker__navigation react-datepicker__navigation--next"
                              }
                              style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
                              onClick={increaseMonth}
                            >
                              <span className="react-datepicker__navigation-icon--next"></span>
                            </button>
                          </div>
                        )}
                      >
                        <div className='wrapper-helper-button'>
                          <div className='wrapper_reset' onClick={() => {
                            calendarStartRef.current.clear()
                            calendarStartRef.current.setSelected(null)
                          }}>
                            <h5 className='reset'>Reset</h5>
                            <ReactSVG src='/img/icons/reset.svg' />
                          </div>
                          <Button
                            variant="primary"
                            type="button"
                            className='button_apply'
                            onClick={(e) => {
                              calendarStartRef.current.setSelected(values.period.date_start)
                              calendarStartRef.current.setOpen(false)
                              calendarEndRef.current.setOpen(true)
                            }}
                          >
                            APPLY
                          </Button>
                        </div>
                      </DatePicker>
                    </Col>
                      <span className="text-center">To</span>
                    <Col lg={4}>
                      <DatePicker
                        className="form-control text-center"
                        dateFormat="dd MMMM yyyy"
                        onChange={(date) => {
                          setFieldValue('period.date_end', date)
                        }}
                        // disabled={isLoading}
                        readOnly={isView}
                        selected={values.period.date_end}
                        ref={calendarEndRef}
                        selectsEnd
                        startDate={values.period.date_start}
                        endDate={values.period.date_end}
                        minDate={values.period.date_start}
                        maxDate={handleYears(10, new Date(), 'add')}
                        monthsShown={2}
                        popperClassName='manage_corporate_date'
                        popperModifiers={[
                          {
                            name: "offset",
                            options: {
                              offset: [-180, 0],
                            },
                          },
                        ]}
                        shouldCloseOnSelect={false}
                        onSelect={(e) => {
                          // calendarEndRef.current.setSelected(e)
                        }}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          monthDate,
                          customHeaderCount,
                          decreaseMonth,
                          increaseMonth,
                        }) => (
                          <div>
                            <button
                              aria-label="Previous Month"
                              className={
                                "react-datepicker__navigation react-datepicker__navigation--previous"
                              }
                              style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                              onClick={decreaseMonth}
                            >
                            </button>
                            <span className="react-datepicker__current-month">
                              {monthDate.toLocaleString("en-US", {
                                month: "long",
                                // year: "numeric",
                              })}
                              <select
                                value={moment(date).year()}
                                onChange={({ target: { value } }) => changeYear(value)}
                                className='select_year'
                              >
                                {generateArrayOfYears(10, 10).map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </span>
                            <button
                              aria-label="Next Month"
                              className={
                                "react-datepicker__navigation react-datepicker__navigation--next"
                              }
                              style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
                              onClick={increaseMonth}
                            >
                              <span className="react-datepicker__navigation-icon--next"></span>
                            </button>
                          </div>
                        )}
                      >
                        <div className='wrapper-helper-button'>
                          <div className='wrapper_reset' onClick={() => {
                            calendarEndRef.current.clear()
                            calendarEndRef.current.setSelected(null)
                          }}>
                            <h5 className='reset'>Reset</h5>
                            <ReactSVG src='/img/icons/reset.svg' />
                          </div>
                          <Button
                            variant="primary"
                            type="button"
                            className='button_apply'
                            onClick={(e) => {
                              calendarEndRef.current.setSelected(values.period.date_end)
                              calendarEndRef.current.setOpen(false)
                            }}
                          >
                            APPLY
                          </Button>
                        </div>
                      </DatePicker>
                    </Col>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={4}>
                    Period based on <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col className='d-flex flex-column justify-content-center' sm={8}>
                    <div className='d-flex align-items-center'>
                      <Col lg={4} className='p-0'>
                        <Form.Check
                          name='period_based_on_bookingdate'
                          id='period_based_on_bookingdate'
                          type='radio'
                          value='bookingdate'
                          label="Booking Date"
                          onChange={() => setFieldValue('period_based_on', 'bookingdate')}
                          checked={values.period_based_on === 'bookingdate'}
                        />
                      </Col>
                      <Col lg={4} className='p-0'>
                        <Form.Check
                          name='period_based_on_travelingdate'
                          id='period_based_on_travelingdate'
                          type='radio'
                          value='travelingdate'
                          label="Traveling Date"
                          onChange={() => setFieldValue('period_based_on', 'travelingdate')}
                          checked={values.period_based_on === 'travelingdate'}
                        />
                      </Col>
                    </div>
                    {touched?.period_based_on && errors?.period_based_on && (
                      <TextError>
                        {errors.period_based_on}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card style={{ boxShadow: 'none' }}>
          <Card.Body className='pl-4 pr-4 pb-0 pt-0'>
            <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>COST CENTER</Card.Text>
            <Card.Body style={{ padding: '0 0 30px' }}>
              <BbDataTable {...paramsCostCenter} modalContent={CostCenterModal} />
            </Card.Body>
          </Card.Body>
        </Card>
        <div className="ml-3 mt-5 mb-4 row justify-content-md-start justify-content-center">
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
       <div className='p-4 mb-4'>
          <button
            type="button"
            onClick={() => setisThereProject(true)}
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
}

export default CreditLimitByProject