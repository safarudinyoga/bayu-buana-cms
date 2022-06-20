import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { setUIParams } from "redux/ui-store"

// compoenents & styles
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import TextError from 'components/formik/textError'

// utils
import Api from "config/api"
import useQuery from "lib/query"
import { useDispatch, useSelector } from "react-redux"
import { setModalTitle } from "redux/ui-store"
import { errorMessage } from 'lib/errorMessageHandler'

const staticWarding = {
  main: 'Branch Offices',
  detail: 'Branch Office Details',
  create: 'New Branch Office',
  edit: 'Edit Branch Office',
  linkBack:  "/master/corporate-profile",
  endpoint: "/master/offices"
}

const BranchOfficeForm = ({ match }) => {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)

  const [loading, setLoading] = useState(false)
  const [optionProvince, setOptionProvince] = useState([])
  const [optionCity, setOptionCity] = useState([])

  useEffect(async () => {
    let formId = showCreateModal.id || match?.params?.id

    let docTitle = "Edit Branch Office"
    if (!formId) {
      docTitle = "New Branch Office"
    } else if (isView) {
      docTitle = "Branch Office Details"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let { data } = await api.get(staticWarding.endpoint + "/" + formId)
        // setFormValues({
        //   ...data,
        //   from_currency_id: {
        //     value: data.from_currency.id,
        //     label: data.from_currency.currency_name,
        //   },
        //   to_currency_id: {
        //     value: data.to_currency.id,
        //     label: data.to_currency.currency_name,
        //   },
        // })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  // const wardingGenerator = () => {
  //   if (!formId) {
  //     return staticWarding.create
  //   }

  //   if (formId && isView) {
  //     return staticWarding.detail
  //   }

  //   return staticWarding.edit
  // }

  // useEffect(() => {
  //   const { linkBack } = staticWarding
  //   dispatch(
  //     setUIParams({
  //       title: wardingGenerator(formId),
  //       breadcrumbs: [
  //         {
  //           text: "Corporate Management",
  //         },
  //         {
  //           link: linkBack,
  //           text: 'Company Profile',
  //         },
  //         {
  //           text: wardingGenerator(),
  //         },
  //       ],
  //     }),
  //   )
  // }, [])


  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, setFieldValue, setValues } = useFormik({
    initialValues: {
      office_name: '',
      address_line: '',
      country_id: '',
      state_id: '',
      city_id: '',
      postal_code: '',
      geo_location: {
        lat: '',
        lng: ''
      },
      phone_number: '',
      fax_number: '',
      email: ''
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {

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
      <Row>
        <Col lg={12}>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
              Company/ Branch Name <span className="form-label-required">*</span>
            </Form.Label>
            <Col md={3} lg={9}>
              <Form.Control
                value={values.office_name}
                name="office_name"
                id="office_name"
                onChange={handleChange}
                type="text"
                minLength={1}
                maxLength={256}
                placeholder=""
                // disabled={isView}
                // disabled={isView || loading}
                // style={{ maxWidth: 150 }}
                // className={touched?.general_information?.corporate_code && errors?.general_information?.corporate_code && 'is-invalid'}
              />
              {/* {touched?.general_information?.corporate_code && errors?.general_information?.corporate_code && (
                <TextError>
                  {errors.general_information.corporate_code}
                </TextError>
              )} */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
              Address
            </Form.Label>
            <Col md={3} lg={9}>
              <textarea
                value={values.address_line}
                name="address_line"
                id="address_line"
                onChange={handleChange}
                minLength={1}
                maxLength={512}
                placeholder=""
                // disabled={isView}
                // disabled={isView || loading}
                // style={{ resize: 'none', maxWidth: 400 }}
                className={`form-control mb-2 ${touched?.address_line && errors?.address_line && 'is-invalid'}`}
              />
              {touched?.address_line && errors?.address_line && (
                <TextError>
                  {errors.address_line}
                </TextError>
              )}
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
                  name="country_id"
                  url={`master/countries`}
                  value={values.country_id}
                  placeholder="Please choose"
                  fieldName="country_name"
                  className={`react-select ${
                    touched?.country_id &&
                    errors?.country_id
                      ? "is-invalid"
                      : null
                  }`}
                  onChange={(v) => {
                    if (v) handleChangeCountry(v.value)
                    setValues({
                      ...values,
                      country_id: v.value
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
                  invalid={touched?.country_id && errors?.country_id}
                />
                {touched?.country_id && errors?.country_id && (
                  <TextError>
                    {errors.country_id}
                  </TextError>
                )}
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
              State/Province
            </Form.Label>
            <Col md={3} lg={9}>
              <div style={{ maxWidth: 200 }}>
                <Select
                  isClearable
                  name="state_id"
                  value={values.state_id}
                  placeholder="Please choose"
                  options={!values.state_id ? [] : optionProvince}
                  onChange={(v) => {
                    setFieldValue('state_id', v.value)
                    setFieldValue('city_id', null)
                    handleChangeProvince(v?.value, values.state_id)
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
                  name="city_id"
                  value={values.city_id}
                  placeholder="Please choose"
                  options={!values.city_id ? [] : optionCity}
                  onChange={(v) => {
                    setFieldValue("city_id", v.value)
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
                value={values.postal_code}
                name="postal_code"
                id="postal_code"
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
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
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
                  name='geo_location.lat'
                  id='geo_location.lat'
                  disabled={isView}
                  value={values.geo_location.lat}
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
                  name='geo_location.lng'
                  id='geo_location.lng'
                  disabled={isView}
                  value={values.geo_location.lng}
                />
              </div>
            </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
              Phone Number
            </Form.Label>
            <Col md={3} lg={9}>
              <Form.Control
                value={values.phone_number}
                name="phone_number"
                id="phone_number"
                onChange={handleChange}
                type="text"
                minLength={1}
                maxLength={32}
                placeholder=""
                disabled={isView}
                // disabled={isView || loading}
                style={{ maxWidth: 200 }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
              Fax
            </Form.Label>
            <Col md={3} lg={9}>
              <Form.Control
                value={values.fax_number}
                name="fax_number"
                id="fax_number"
                onChange={handleChange}
                type="text"
                minLength={1}
                maxLength={32}
                placeholder=""
                disabled={isView}
                // disabled={isView || loading}
                style={{ maxWidth: 200 }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={3} className='mb-2'>
              Email
            </Form.Label>
            <Col md={3} lg={9}>
              <Form.Control
                value={values.email}
                name="email"
                id="email"
                onChange={handleChange}
                type="text"
                minLength={1}
                maxLength={256}
                placeholder=""
                disabled={isView}
                // disabled={isView || loading}
                style={{ maxWidth: 300 }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          // disabled={
          //   props.finishStep > 0 || props.employeeData?.id
          //     ? !isValid || isSubmitting
          //     : !dirty || isSubmitting
          // }
          style={{ marginRight: 15, marginBottom: 50, padding: '0 24px', backgroundColor: '#31394D' }}
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

BranchOfficeForm.propTypes = {}

export default BranchOfficeForm