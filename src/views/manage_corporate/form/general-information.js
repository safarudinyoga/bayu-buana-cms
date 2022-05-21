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
import useQuery from "lib/query"


const GeneralInfomation = (props) => {
  let api = new Api()
  const isView = useQuery().get("action") === "view"

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, setFieldValue } = useFormik({
    initialValues: {
      general_information: {
        corporate_code: '',
        corporate_name: '',
        parent_company: '',
        corporate_type: '',
        corporate_npwp: '',
        corporate_contract: {
          date_start: '',
          date_end: ''
        }
      },
      contact_information: {
        corporate_email: '',
        corporate_phone: '',
        corporate_fax: ''
      },
      correspondence_address: {
        address: '',
        country: '',
        province: '',
        city: '',
        zipcode: '',
        geo_location: {
          lat: '',
          lng: ''
        }
      },
      billing_address: {
        address: '',
        country: '',
        province: '',
        city: '',
        zipcode: '',
        geo_location: {
          lat: '',
          lng: ''
        }
      },
      other_information: {
        website: '',
        internal_remark: '',
        logo: ''
      }
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

  // Permanent Country state
  const handleChangePermanentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })

          setSelectPermanentProvince(options)
        })
      } else {
        setSelectPermanentProvince([])
      }
      let res2 = await api.get(
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const optionsCity = []
      if(res2.data.items.length > 0){
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })

          setSelectPermanentCity(optionsCity)
        })
      } else {
        setSelectPermanentCity([])
      }

    } catch (e) {}
  }

  // Current Province state
  // const handleChangeProvince = async (type, province_id, country_id) => {
  //   try {
  //     let filters = `[["country_id","=","${country_id}"],["AND"],["status","=",1]]`

  //     if(province_id && province_id !== "00000000-0000-0000-0000-000000000000") {
  //       filters = `[["state_province_id","=","${province_id}"],["AND"],["country_id","=","${country_id}"],["AND"],["status","=",1]]`
  //     }
  //     let res = await api.get(
  //       `/master/cities?filters=${filters}&sort=city_name`,
  //     )
  //     const options = []
  //     if(res.data.items.length > 0){
  //       res.data.items.forEach((data) => {
  //         options.push({
  //           label: data.city_name,
  //           value: data.id,
  //         })
  //         if(type === "current") {
  //           setSelectCurrentCity(options)
  //         } else {
  //           setSelectPermanentCity(options)
  //         }
  //       })
  //     } else {
  //       if(type=== "current") {
  //         setSelectCurrentCity([])
  //       } else {
  //         setSelectPermanentCity([])
  //       }
  //     }

  //   } catch (e) {}
  // }

  useEffect(() => {
    console.log(values);
  }, [values])


  const uploadRef = useRef(null)

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{marginBotton: 0}}>
        <Card.Body>
          <h3 className="card-heading">General Information</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Corporate Code"
                      required={true}
                      value={values.general_information.corporate_code}
                      name="general_information.corporate_code"
                      id="general_information.corporate_code"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      disabled={isView}
                      type="text"
                      style={{ maxWidth: 150 }}
                      minLength={1}
                      maxLength={128}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Corporate Name"
                      required={true}
                      value={values.general_information.corporate_name}
                      name="general_information.corporate_name"
                      id="general_information.corporate_name"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      disabled={isView}
                      type="text"
                      style={{ maxWidth: 400 }}
                      minLength={1}
                      maxLength={256}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Parent Company
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Select
                      isClearable
                      placeholder="Please choose parent company"
                      options={[
                        {
                          value: 'selected 1',
                          label: 'Hotel Markup 1'
                        },
                        {
                          value: 'selected 1',
                          label: 'Hotel Markup 2'
                        },
                      ]}
                      onChange={(e) => {
                        setFieldValue('general_information.parent_company', e)
                      }}
                      width={'400px'}
                      name='general_information.parent_company'
                      id='general_information.parent_company'
                      value={values.general_information.parent_company}
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Type
                    <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Select
                      isClearable
                      placeholder="Please choose type company"
                      options={[
                        {
                          value: 'selected 1',
                          label: 'Hotel Markup 1'
                        },
                        {
                          value: 'selected 1',
                          label: 'Hotel Markup 2'
                        },
                      ]}
                      width={'400px'}
                      name='general_information.corporate_type'
                      id='general_information.corporate_type'
                      value={values.general_information.corporate_type}
                      onChange={(e) => {
                        setFieldValue('general_information.corporate_type', e)
                      }}
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="NPWP"
                      required={true}
                      value={values.general_information.corporate_npwp}
                      name="general_information.corporate_npwp"
                      id="general_information.corporate_npwp"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      disabled={isView}
                      type="text"
                      style={{ maxWidth: 320 }}
                      minLength={1}
                      maxLength={36}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputDatePeriod
                      label='Contract Period'
                      dateStart={values.general_information.corporate_contract.date_start}
                      dateEnd={values.general_information.corporate_contract.date_end}
                      dateStartOnChange={() => {}}
                      dateEndOnChange={() => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* contact information */}
          <h3 className="card-heading">Contacts Information</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Email"
                      required={true}
                      value={values.contact_information.corporate_email}
                      name="contact_information.corporateEmail"
                      id="contact_information.corporateEmail"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 300 }}
                      minLength={1}
                      maxLength={256}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Phone"
                      required={true}
                      value={values.contact_information.corporate_phone}
                      name="contact_information.corporate_phone"
                      id="contact_information.corporate_phone"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      disabled={isView}
                      type="text"
                      style={{ maxWidth: 200 }}
                      minLength={1}
                      maxLength={36}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Fax"
                      required={false}
                      value={values.contact_information.corporate_fax}
                      name="contact_information.corporate_fax"
                      id="contact_information.corporate_fax"
                      onChange={handleChange}
                      // disabled={isView || loading}
                      disabled={isView}
                      type="text"
                      style={{ maxWidth: 200 }}
                      minLength={1}
                      maxLength={36}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Correspondence Address */}
          <h3 className="card-heading">Correspondence Address</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label={"Address"}
                      value={values.correspondence_address.address}
                      name="correspondence_address.address"
                      id="correspondence_address.address"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="textarea"
                      minLength={1}
                      maxLength={512}
                      style={{ resize: 'none', maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Country <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={9} md={3}>
                    {selectPermanentCountry.length !== 0 && (
                      <div style={{ maxWidth: 300 }}>
                        <SelectAsync
                          isClearable
                          name="correspondence_address.country"
                          url={`master/countries`}
                          value={values.correspondence_address.country}
                          placeholder="Please choose"
                          fieldName="country_name"
                          className={`react-select ${
                            touched?.correspondence_address?.country &&
                            errors?.correspondence_address?.country
                              ? "is-invalid"
                              : null
                          }`}
                          onChange={(v) => {
                            handleChangePermanentCountry(v.value)
                          }}
                          onBlur={setFieldTouched}
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
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    State / Province
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        isClearable
                        name="correspondence_address.province"
                        value={values.correspondence_address.province}
                        placeholder="Please choose"
                        options={!values.correspondence_address.country ? [] : selectPermanentProvince}
                        onChange={(v) => {

                        }}
                        onBlur={setFieldTouched}
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
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    City
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        name="correspondence_address.city"
                        isClearable
                        value={values.correspondence_address.city}
                        placeholder="Please choose"
                        options={!values.correspondence_address.country ? [] : selectPermanentCity}
                        onChange={(v) => {
                          // setFieldValue("permanentCity", v)
                        }}
                        onBlur={setFieldTouched}
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
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Zip Code"
                      required={false}
                      value={values.correspondence_address.zipcode}
                      name="correspondence_address.zipcode"
                      id="correspondence_address.zipcode"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 100 }}
                      minLength={1}
                      maxLength={16}
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
                        onChange={handleChange}
                        name='correspondence_address.geo_location.lat'
                        id='correspondence_address.geo_location.lat'
                        disabled={isView}
                        value={values.correspondence_address.geo_location.lat}
                      />
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        minLength={1}
                        maxLength={16}
                        placeholder="Longitude"
                        style={{ width: 150 }}
                        onChange={handleChange}
                        name='correspondence_address.geo_location.lng'
                        id='correspondence_address.geo_location.lng'
                        disabled={isView}
                        value={values.correspondence_address.geo_location.lng}
                      />
                    </div>
                  </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Billing Address  */}
          <h3 className="card-heading">Billing Address</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
          <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label={"Address"}
                      value={values.billing_address.address}
                      name="billing_address.address"
                      id="billing_address.address"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="textarea"
                      minLength={1}
                      maxLength={512}
                      style={{ resize: 'none', maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Country <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={9} md={3}>
                    {selectPermanentCountry.length !== 0 && (
                      <div style={{ maxWidth: 300 }}>
                        <SelectAsync
                          isClearable
                          name="billing_address.country"
                          url={`master/countries`}
                          value={values.billing_address.country}
                          placeholder="Please choose"
                          fieldName="country_name"
                          // options={selectCountry}
                          className={`react-select ${
                            touched?.billing_address?.country &&
                            errors?.billing_address?.country
                              ? "is-invalid"
                              : null
                          }`}
                          onChange={() => {}}
                          onBlur={setFieldTouched}
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
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    State / Province
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        isClearable
                        name="billing_address.province"
                        value={values.billing_address.province}
                        placeholder="Please choose"
                        options={!values.billing_address.country ? [] : selectPermanentProvince}
                        onChange={() => {}}
                        onBlur={setFieldTouched}
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
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    City
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 200 }}>
                      <Select
                        name="billing_address.city"
                        isClearable
                        value={values.billing_address.city}
                        placeholder="Please choose"
                        options={!values.billing_address.country ? [] : selectPermanentCity}
                        onChange={(v) => {
                          // setFieldValue("permanentCity", v)
                        }}
                        onBlur={setFieldTouched}
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
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Zip Code"
                      required={false}
                      value={values.billing_address.zipcode}
                      name="billing_address.zipcode"
                      id="billing_address.zipcode"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 100 }}
                      minLength={1}
                      maxLength={16}
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
                        onChange={handleChange}
                        name='billing_address.geo_location.lat'
                        id='billing_address.geo_location.lat'
                        disabled={isView}
                        value={values.billing_address.geo_location.lat}
                      />
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        minLength={1}
                        maxLength={16}
                        placeholder="Longitude"
                        style={{ width: 150 }}
                        onChange={handleChange}
                        name='billing_address.geo_location.lng'
                        id='billing_address.geo_location.lng'
                        disabled={isView}
                        value={values.billing_address.geo_location.lng}
                      />
                    </div>
                  </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Other Information */}
          <h3 className="card-heading">Other Information</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Website"
                      value={values.other_information.website}
                      name="other_information.website"
                      id="other_information.website"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="text"
                      style={{ maxWidth: 300 }}
                      minLength={1}
                      maxLength={256}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Internal Remark"
                      value={values.other_information.internal_remark}
                      name="internal_remark"
                      id="internal_remark"
                      onChange={handleChange}
                      disabled={isView}
                      // disabled={isView || loading}
                      type="textarea"
                      minLength={1}
                      maxLength={4000}
                      style={{ resize: 'none', maxWidth: 400 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Col md={3} lg={9}>
                    <FormInputControl
                      label="Logo"
                      value={values.other_information.logo}
                      name="corporateFax"
                      // onChange={handleChange}
                      disabled={isView}
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

GeneralInfomation.propTypes = {}

export default GeneralInfomation