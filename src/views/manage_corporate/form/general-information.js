import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components
import FormInputControl from "components/form/input-control"
import FormInputDatePeriod from 'components/form/input-date-period'
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import './_form.sass'

// utils
import { useWindowSize } from "rooks"
import Api from "config/api"

const GeneralInfomation = ({
  isMobile
}) => {
  let api = new Api()

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      corporateCode: ''
    },
    validationSchema: Yup.object({
      corporateCode: Yup.string().required('')
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const [selectPermanentCountry, setSelectPermanentCountry] = useState([])
  const [selectPermanentProvince, setSelectPermanentProvince] = useState([])
  const [selectPermanentCity, setSelectPermanentCity] = useState([])

  useEffect(async () => {
    try {
      let res = await api.get("/master/countries")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.country_name,
          value: data.id,
        })
        setSelectPermanentCountry(options)
      })
    } catch (e) {}
  }, [])

  const uploadRef = useRef(null)

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{marginBotton: 0}}>
        <Card.Body>
          {isMobile ? "" : <h3 className="card-heading">General Information</h3>}
          <div style={isMobile ? {padding: "0"} : { padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Corporate Code"
                      required={true}
                      value={values.corporateCode}
                      name="corporateCode"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 150 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Corporate Name"
                      required={true}
                      value={values.corporateName}
                      name="corporateName"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Parent Company
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Select
                      isClearable
                      placeholder="Please choose parent company"
                      options={[1,2,3,4,5]}
                      onChange={() => {}}
                      width={'400px'}
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
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Type
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Select
                      isClearable
                      placeholder="Please choose parent company"
                      options={[1,2,3,4,5]}
                      onChange={() => {}}
                      width={'400px'}
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
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="NPWP"
                      required={true}
                      value={values.corporateNPWP}
                      name="corporateNPWP"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 320 }}
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
              </Col>
            </Row>
          </div>

          {/* contact information */}
          {isMobile ? "" : <h3 className="card-heading">Contacts Information</h3>}
          <div style={isMobile ? {padding: "0"} : { padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Email"
                      required={true}
                      value={values.corporateEmail}
                      name="corporateEmail"
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
                      label="Phone"
                      required={true}
                      value={values.corporatePhone}
                      name="corporatePhone"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 200 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Fax"
                      required={false}
                      value={values.corporateFax}
                      name="corporateFax"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 200 }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Correspondence Address */}
          {isMobile ? "" : <h3 className="card-heading">Correspondence Address</h3>}
          <div style={isMobile ? {padding: "0"} : { padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label={"Address"}
                      value={values.corporateAddress}
                      name="corporateAddress"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="textarea"
                      minLength="1"
                      maxLength="512"
                      style={{ resize: 'none', maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Country <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={9} md={3}>
                    {selectPermanentCountry.length !== 0 && (
                      <div style={{ maxWidth: 300 }}>
                        <SelectAsync
                          isClearable
                          name="permanentCountry"
                          url={`master/countries`}
                          value={
                            values.sameAddress
                              ? values.currentCountry
                              : values.permanentCountry
                          }
                          placeholder="Please choose"
                          fieldName="country_name"
                          // options={selectCountry}
                          className={`react-select ${
                            !values.sameAddress &&
                            (touched.permanentCountry &&
                            errors.permanentCountry
                              ? "is-invalid"
                              : null)
                          }`}
                          onChange={() => {}}
                          // onBlur={setFieldTouched}
                          // components={
                          //   isView
                          //     ? {
                          //         DropdownIndicator: () => null,
                          //         IndicatorSeparator: () => null,
                          //       }
                          //     : null
                          // }
                          // isDisabled={values.sameAddress || isView}
                        />
                        {/* {!values.sameAddress && (
                          <>
                            {touched.permanentCountry &&
                              errors.permanentCountry && (
                                <Form.Control.Feedback type="invalid">
                                  {touched.permanentCountry
                                    ? errors.permanentCountry
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )} */}
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    State / Province
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        isClearable
                        // name="permanentProvince"
                        // value={
                        //   values.sameAddress
                        //     ? values.currentProvince
                        //     : values.permanentProvince
                        // }
                        placeholder="Please choose"
                        options={values.permanentCountry === null ? [] : selectPermanentProvince}
                        onChange={() => {}}
                        // onBlur={setFieldTouched}
                        // components={
                        //   isView
                        //     ? {
                        //         DropdownIndicator: () => null,
                        //         IndicatorSeparator: () => null,
                        //       }
                        //     : null
                        // }
                        // isDisabled={values.sameAddress || isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    City
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        name="permanentCity"
                        isClearable
                        // value={
                        //   values.sameAddress
                        //     ? values.currentCity
                        //     : values.permanentCity
                        // }
                        placeholder="Please choose"
                        // options={values.permanentCountry === null ? [] : selectPermanentCity}
                        // onChange={(v) => {
                        //   setFieldValue("permanentCity", v)
                        // }}
                        // onBlur={setFieldTouched}
                        // components={
                        //   isView
                        //     ? {
                        //         DropdownIndicator: () => null,
                        //         IndicatorSeparator: () => null,
                        //       }
                        //     : null
                        // }
                        // isDisabled={ values.sameAddress || isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Zip Code"
                      required={false}
                      value={values.corporateZipcode}
                      name="corporateZipcode"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 100 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Geo Location
                  </Form.Label>
                  <Col md={3} lg={9}>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                      <Form.Control
                        type="text"
                        minLength={1}
                        maxLength={16}
                        placeholder="Latitude"
                        style={{ width: 150 }}
                      />
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        minLength={1}
                        maxLength={16}
                        placeholder="Longitude"
                        style={{ width: 150 }}
                      />
                    </div>
                  </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Billing Address  */}
          {isMobile ? "" : <h3 className="card-heading">Billing Address</h3>}
          <div style={isMobile ? {padding: "0"} : { padding: "0 15px 15px 15px" }}>
          <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label={"Address"}
                      value={values.corporateAddress}
                      name="corporateAddress"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="textarea"
                      minLength="1"
                      maxLength="512"
                      style={{ resize: 'none', maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Country <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={9} md={3}>
                    {selectPermanentCountry.length !== 0 && (
                      <div style={{ maxWidth: 300 }}>
                        <SelectAsync
                          isClearable
                          name="permanentCountry"
                          url={`master/countries`}
                          value={
                            values.sameAddress
                              ? values.currentCountry
                              : values.permanentCountry
                          }
                          placeholder="Please choose"
                          fieldName="country_name"
                          // options={selectCountry}
                          className={`react-select ${
                            !values.sameAddress &&
                            (touched.permanentCountry &&
                            errors.permanentCountry
                              ? "is-invalid"
                              : null)
                          }`}
                          onChange={() => {}}
                          // onBlur={setFieldTouched}
                          // components={
                          //   isView
                          //     ? {
                          //         DropdownIndicator: () => null,
                          //         IndicatorSeparator: () => null,
                          //       }
                          //     : null
                          // }
                          // isDisabled={values.sameAddress || isView}
                        />
                        {/* {!values.sameAddress && (
                          <>
                            {touched.permanentCountry &&
                              errors.permanentCountry && (
                                <Form.Control.Feedback type="invalid">
                                  {touched.permanentCountry
                                    ? errors.permanentCountry
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )} */}
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    State / Province
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        isClearable
                        // name="permanentProvince"
                        // value={
                        //   values.sameAddress
                        //     ? values.currentProvince
                        //     : values.permanentProvince
                        // }
                        placeholder="Please choose"
                        options={values.permanentCountry === null ? [] : selectPermanentProvince}
                        onChange={() => {}}
                        // onBlur={setFieldTouched}
                        // components={
                        //   isView
                        //     ? {
                        //         DropdownIndicator: () => null,
                        //         IndicatorSeparator: () => null,
                        //       }
                        //     : null
                        // }
                        // isDisabled={values.sameAddress || isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    City
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        name="permanentCity"
                        isClearable
                        // value={
                        //   values.sameAddress
                        //     ? values.currentCity
                        //     : values.permanentCity
                        // }
                        placeholder="Please choose"
                        // options={values.permanentCountry === null ? [] : selectPermanentCity}
                        // onChange={(v) => {
                        //   setFieldValue("permanentCity", v)
                        // }}
                        // onBlur={setFieldTouched}
                        // components={
                        //   isView
                        //     ? {
                        //         DropdownIndicator: () => null,
                        //         IndicatorSeparator: () => null,
                        //       }
                        //     : null
                        // }
                        // isDisabled={ values.sameAddress || isView}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Zip Code"
                      required={false}
                      value={values.corporateZipcode}
                      name="corporateZipcode"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 100 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3}>
                    Geo Location
                  </Form.Label>
                  <Col md={3} lg={9}>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                      <Form.Control
                        type="text"
                        minLength={1}
                        maxLength={16}
                        placeholder="Latitude"
                        style={{ width: 150 }}
                      />
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        minLength={1}
                        maxLength={16}
                        placeholder="Longitude"
                        style={{ width: 150 }}
                      />
                    </div>
                  </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Other Information */}
          {isMobile ? "" : <h3 className="card-heading">Other Information</h3>}
          <div style={isMobile ? {padding: "0"} : { padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Website"
                      // value={values.corporateEmail}
                      // name="corporateEmail"
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
                      label="Internal Remark"
                      // value={values.corporatePhone}
                      // name="corporatePhone"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="textarea"
                      minLength="1"
                      maxLength="512"
                      style={{ resize: 'none', maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Logo"
                      // value={values.corporateFax}
                      // name="corporateFax"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      type="image"
                      styleContainer={{ display: 'flex', }}
                      style={{ maxWidth: 100, maxHeight: 100, }}
                      children={(
                        <Button
                          variant='light'
                          style={{
                            margin: '0 0 0 30px',
                            backgroundColor: '#fff',
                            border: '1px solid #707070',
                            borderRadius: '8px',
                            padding: '4px 13px',
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#333333',
                            textTransform: 'uppercase',
                            cursor: 'pointer'
                          }}
                          className='button'
                        >
                          UPLOAD PHOTO
                        </Button>
                      )}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          // disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
          style={{ marginRight: 15, marginBottom: 135 }}
        >
          {/* {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}  */}
          SAVE & NEXT
        </Button>
        <Button
          variant="secondary"
          // onClick={() => props.history.goBack()}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

GeneralInfomation.propTypes = {}

export default GeneralInfomation