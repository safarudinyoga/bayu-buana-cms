import React, { useState } from 'react'
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components & styles
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import TextError from 'components/formik/textError'
import './_form.sass'

// utils
import { useDispatch, useSelector } from "react-redux"
import Api from "config/api"
import useQuery from "lib/query"

const SystemAdministrator = () => {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const [optionProvince, setOptionProvince] = useState([])
  const [optionCity, setOptionCity] = useState([])

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, setFieldValue, setValues } = useFormik({
    initialValues: {
      title: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      country: {
        value: ''
      },
      city: '',
      province: '',
      zipcode: '',
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  // Permanent Country state
  const handleChangeCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )

      let options = []

      if (!res.data.items.length) {
        setOptionProvince([])
      }

      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })

          setOptionProvince(options)
        })
      }

      let res2 = await api.get(
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )

      let optionsCity = []

      if (!res2.data.items.length) {
        setOptionCity([])
      }

      if(res2.data.items.length > 0){
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })

          setOptionCity(optionsCity)
        })
      }

    } catch (e) {}
  }

  // Current Province state
  const handleChangeProvince = async (province_id, country_id) => {
    try {
      let filters = `[["country_id","=","${country_id}"],["AND"],["status","=",1]]`

      if(province_id && province_id !== "00000000-0000-0000-0000-000000000000") {
        filters = `[["state_province_id","=","${province_id}"],["AND"],["country_id","=","${country_id}"],["AND"],["status","=",1]]`
      }

      let res = await api.get(
        `/master/cities?filters=${filters}&sort=city_name`,
      )

      let options = []

      if (!res.data.items.length) {
        setOptionCity(options)
      }

      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
        })
        setOptionCity(options)
      }
    } catch (e) {}
  }

  return (
    <Form>
      <Card style={{marginBotton: 0}}>
        <Card.Body>
          <h3 className="card-heading">System Administrator</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Title <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Select
                     isClearable
                     placeholder=''
                     options={[
                        {
                          value: 'mr',
                          label: 'Mr.'
                        },
                        {
                          value: 'mrs',
                          label: 'Mrs.'
                        },
                      ]}
                      onChange={(e) => {
                        setFieldValue('title', e)
                      }}
                      width={'80px'}
                      name='title'
                      id='title'
                      value={values.title}
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
                    {errors?.title && (
                      <TextError>
                        {errors.title}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    First Name <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.first_name}
                      name="first_name"
                      id="first_name"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={128}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 150 }}
                      className={errors?.first_name && 'is-invalid'}
                    />
                    {errors?.first_name && (
                      <TextError>
                        {errors.first_name}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Middle Name
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.middle_name}
                      name="middle_name"
                      id="middle_name"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={128}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 150 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Last Name <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.last_name}
                      name="last_name"
                      id="last_name"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={128}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 150 }}
                      className={errors?.last_name && 'is-invalid'}
                    />
                    {errors?.last_name && (
                      <TextError>
                        {errors.last_name}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Email <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.email}
                      name="email"
                      id="email"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={128}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 300 }}
                      className={errors?.email && 'is-invalid'}
                    />
                    {errors?.email && (
                      <TextError>
                        {errors.email}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Phone <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                  <Form.Control
                      value={values.phone}
                      name="phone"
                      id="phone"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={128}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 200 }}
                      className={errors?.phone && 'is-invalid'}
                    />
                    {errors?.phone && (
                      <TextError>
                        {errors.phone}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Address
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <textarea
                      value={values.address}
                      name="address"
                      id="address"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={512}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ width: 400, resize: 'none', height: '80px', borderRadius: '8px', border: '1px solid #D3D3D3' }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Country <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col lg={9} md={3}>
                    <div style={{ maxWidth: 300 }}>
                      <SelectAsync
                        isClearable
                        name="country"
                        url={`master/countries`}
                        value={!values.country.value ? null : values.country}
                        placeholder="Please choose"
                        fieldName="country_name"
                        className={`react-select ${
                          touched?.country &&
                          errors?.country
                            ? "is-invalid"
                            : null
                        }`}
                        onChange={(v) => {
                          if (v) handleChangeCountry(v.value)
                          setValues({
                            ...values,
                            country: {
                              value: v.value,
                              label: v.label
                            },
                            province: null,
                            city: null
                          })
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
                        invalid={touched?.country?.value && errors?.country?.value}
                      />
                      {touched?.country?.value && errors?.country?.value && (
                        <TextError>
                          {errors.country?.value}
                        </TextError>
                      )}
                    </div>
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
                        name="province"
                        value={values.province}
                        placeholder="Please choose"
                        options={!values.country ? [] : optionProvince}
                        onChange={(v) => {
                          setFieldValue('province', v)
                          setFieldValue('city', null)
                          handleChangeProvince(v?.value, values.country?.value)
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
                        isClearable
                        name="city"
                        value={values.city}
                        placeholder="Please choose"
                        options={!values.country ? [] : optionCity}
                        onChange={(v) => {
                          setFieldValue("city", v)
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
                    Zip Code
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.zipcode}
                      name="zipcode"
                      id="zipcode"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      disabled={isView}
                      // disabled={isView || loading}
                      style={{ maxWidth: 100 }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Form>
  )
}

export default SystemAdministrator