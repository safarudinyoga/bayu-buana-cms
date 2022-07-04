import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from 'react-datepicker'
import { debounce } from 'lodash'
import { useDispatch } from "react-redux"
import { ReactSVG } from "react-svg"
import PropTypes from 'prop-types'

// components & styles
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import ImageDefault from 'assets/icons/image_default.svg'
import TextError from 'components/formik/textError'
import './_form.sass'

// utils
import Api from "config/api"
import NoImage from "assets/no_image.png"
import useQuery from "lib/query"
import { errorMessage } from 'lib/errorMessageHandler'
import { setAlert } from "redux/ui-store"
import moment from 'moment'
import { SUCCESS_RESPONSE_STATUS } from 'lib/constants'

const slugDictionary = {
  corporate_code: 'Corporate Code',
  corporate_name: 'Corporate Name',
  corporate_type: 'Corporate Type',
  corporate_npwp: 'NPWP',
  corporate_email: 'Email',
  corporate_phone: 'Phone',
  country: 'Country'
}

const endpoint = "/master/agent-corporates"
const GeneralInfomation = ({
  history,
  backUrl,
  corporateId,
  handleChangeTabKey,
  data
}) => {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, setFieldValue, setValues, validateField, isSubmitting} = useFormik({
    initialValues: {
      corporate_code: '',
      corporate_name: '',
      general_information: {
        parent_company: '',
        corporate_type: {
          value: '',
        },
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
        country: {
          value: ''
        },
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
        country: {
          value: ''
        },
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
        logo: {
          img: '',
          data: {}
        }
      }
    },
    validationSchema: Yup.object({
      corporate_code: Yup.string().required(errorMessage(slugDictionary['corporate_code'])).test('uniqueCorporateCode', '', async function(val) {
        try {
          if (val !== undefined && val) {
            const { status, data } = await api.get(`${endpoint}?filters=${encodeURIComponent(JSON.stringify(['corporate_code','=',`${val}`]))}`)

            if ([200, 201].includes(status)) {
              if (data.items && data.items.length) {
                return this.createError({message: 'Corporate Code already exists!'})
              }
            }
          }
        } catch (error) {
          dispatch(
            setAlert({
              message: 'Failed to checking this record.',
            }),
          )
        }

        return true
      }),
      corporate_name: Yup.string().required(errorMessage(slugDictionary['corporate_name'])).test('uniqueCorporateName', '', async function(val) {
        try {
          if (val !== undefined && val) {
            const { status, data } = await api.get(`${endpoint}?filters=${encodeURIComponent(JSON.stringify(['corporate_name','=',`${val}`]))}`)

            if ([200, 201].includes(status)) {
              if (data.items && data.items.length) {
                return this.createError({message: 'Corporate Name already exists!'})
              }
            }
          }
        } catch (error) {
          dispatch(
            setAlert({
              message: 'Failed to checking this record.',
            }),
          )
        }
        return true
      }),
      general_information: Yup.object({
        corporate_type: Yup.object({
          value: Yup.string().required(errorMessage(slugDictionary['corporate_type']))
        }),
        corporate_npwp: Yup.string().required(errorMessage(slugDictionary['corporate_npwp'])),
      }),
      contact_information: Yup.object({
        corporate_email: Yup.string().required(errorMessage(slugDictionary['corporate_email'])).email('Email is not valid.'),
        corporate_phone: Yup.string().required(errorMessage(slugDictionary['corporate_phone'])),
      }),
      correspondence_address: Yup.object({
        country: Yup.object({
          value: Yup.string().required(errorMessage(slugDictionary['country']))
        })
      }),
      billing_address: Yup.object({
        country: Yup.object({
          value: Yup.string().required(errorMessage(slugDictionary['country']))
        })
      }),
    }),
    validateOnChange: false,
    //! dont put async here, causing re-render formik
    onSubmit: (val) => {
      const payload = {
        corporate: {
          corporate_code: val.corporate_code,
          corporate_name: val.corporate_name,
          parent_corporate_id: val.general_information.parent_company?.value || "00000000-0000-0000-0000-000000000000",
          corporate_asset : {
            multimedia_description_id : val.other_information.logo.data?.id || "00000000-0000-0000-0000-000000000000"
          },
        },
        contact: {
          email: val.contact_information.corporate_email,
          phone_number: val.contact_information.corporate_phone,
          fax: val.contact_information.corporate_fax,
        },
        correspondence_address: {
          address_line: val.correspondence_address.address,
          country_id: val.correspondence_address.country.value || "00000000-0000-0000-0000-000000000000",
          state_province_id: val.correspondence_address.province?.value || "00000000-0000-0000-0000-000000000000",
          city_id: val.correspondence_address.city?.value || "00000000-0000-0000-0000-000000000000",
          postal_code: val.correspondence_address.zipcode,
          latitude: Number(val.correspondence_address.geo_location.lat),
          longitude: Number(val.correspondence_address.geo_location.lng)
        },
        billing_address: {
          address_line: val.billing_address.address,
          country_id: val.billing_address.country.value || "00000000-0000-0000-0000-000000000000",
          state_province_id: val.billing_address.province?.value || "00000000-0000-0000-0000-000000000000",
          city_id: val.billing_address.city?.value || "00000000-0000-0000-0000-000000000000",
          postal_code: val.billing_address.zipcode,
          latitude: Number(val.billing_address.geo_location.lat),
          longitude: Number(val.billing_address.geo_location.lng)
        },
        effective_date: val.general_information.corporate_contract.date_start, // "2003-09-13T18:03:43.295Z",
        expire_date: val.general_information.corporate_contract.date_end, //"1992-06-25T14:37:11.733Z",
        industry_id: val.general_information.corporate_type.value || "00000000-0000-0000-0000-000000000000", //! corporate type
        internal_remark: val.other_information.internal_remark,
        npwp: val.general_information.corporate_npwp,
        website: val.other_information.website,
        corporate_id: "00000000-0000-0000-0000-000000000000",
      }
      // !please ask mas firman agam still got caught in 502 response
      console.log(payload)
      postCorporateGeneralInformation(payload)
    }
  })

  const postCorporateGeneralInformation = async (payload) => {
    setIsLoading(true)

    try {
      let { status, data } = await api.putOrPost(endpoint, corporateId, payload)
      console.log(data);

      if (SUCCESS_RESPONSE_STATUS.includes(status)) {
        setIsLoading(false)
        dispatch(
          setAlert({
            message: `Record 'Corporate: {${payload.corporate.corporate_name}}' has been successfully updated.`,
          }),
        )
        handleChangeTabKey('handleChangeTabKey', 1)
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(
        setAlert({
          message: 'Failed to save this record.',
        }),
      )
    }
  }

  const getCountry = async (value) => {
    try {
      let { status, data: { items } } = await api.get(
        `master/countries`,
      )

      if (SUCCESS_RESPONSE_STATUS.includes(status)) {
        const filteredCountry = items.find(res => res.id === value ) || {}
        if (Object.keys(filteredCountry).length) {
          return {
            value,
            label: filteredCountry.country_name
          }
        }

        return {
          value: '',
        }
      }
    } catch (error) {

    }
  }

  useEffect(async () => {
    if (data && Object.keys(data).length) {
      const { agent_corporate, billing_address, corporate, correspondence_address } = data
      setValues({
        corporate_code: agent_corporate.corporate_code || '',
        corporate_name: agent_corporate.corporate_name || '',
        general_information: {
          parent_company: '', //??
          corporate_type: {
            value: '', //??
          },
          corporate_npwp: '', //??
          corporate_contract: {
            date_start: '', //??
            date_end: '' //??
          }
        },
        contact_information: {
          corporate_email: '', //??
          corporate_phone: '', //??
          corporate_fax: '' //??
        },
        correspondence_address: {
          address: correspondence_address.address_line || '',
          country: await getCountry(correspondence_address.country_id),
          province: correspondence_address.state_province_id || '',
          city: correspondence_address.city_id || '',
          zipcode: correspondence_address.postal_code || '',
          geo_location: {
            lat: '', //??
            lng: '' //??
          }
        },
        billing_address: {
          address: billing_address.address_line || '',
          country: await getCountry(billing_address.country_id),
          province: billing_address.state_province_id || '',
          city: billing_address.city_id || '',
          zipcode: billing_address.postal_code || '',
          geo_location: {
            lat: '',
            lng: ''
          }
        },
        other_information: {
          website: '',
          internal_remark: '',
          logo: {
            img: Object.keys(corporate.corporate_asset).length ? corporate.corporate_asset : '',
            data: corporate.corporate_asset || {}
          }
        }
      })
    }
  }, [data])

  const [optionProvince, setOptionProvince] = useState({
    correspondence: [],
    billing: []
  })
  const [optionCity, setOptionCity] = useState({
    correspondence: [],
    billing: []
  })

  const uploadRef = useRef(null)

  // Permanent Country state
  const handleChangeCountry = async (type, v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )

      let options = []

      if (!res.data.items.length) {
        setOptionProvince({
          correspondence: [],
          billing: []
        })
      }

      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })

          if (type === 'correspondence') {
            setOptionProvince({
              correspondence: options,
              billing: []
            })
          } else {
            setOptionProvince({
              correspondence: [],
              billing: options
            })
          }
        })
      }

      let res2 = await api.get(
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )

      let optionsCity = []

      if (!res2.data.items.length) {
        setOptionCity({
          correspondence: [],
          billing: []
        })
      }

      if(res2.data.items.length > 0){
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })

          if (type === 'correspondence') {
            setOptionCity({
              correspondence: optionsCity,
              billing: []
            })
          } else {
            setOptionCity({
              correspondence: [],
              billing: optionsCity
            })
          }
        })
      }

    } catch (e) {}
  }

  // Current Province state
  const handleChangeProvince = async (type, province_id, country_id) => {
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
        if(type === "correspondence") {
          setOptionCity({
            ...optionCity,
            correspondence: options
          })
        } else {
          setOptionCity({
            ...optionCity,
            billing: options
          })
        }
      }

      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          if(type === "correspondence") {
            setOptionCity({
              ...optionCity,
              correspondence: options
            })
          } else {
            setOptionCity({
              ...optionCity,
              billing: options
            })
          }
        })
      }
    } catch (e) {}
  }

  const handleUpload = async (e) => {
    try {
      var files = e.target.files[0];
      if(files){
        var filesize = ((files.size/1024)/1024).toFixed(4);
        if(filesize > 4){
          alert("Logo size is more than 4MB.");
          return;
        }
        setFieldValue('other_information.logo', URL.createObjectURL(files))
      }
      let payload = new FormData()
      payload.append("files", e.target.files[0])

      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setFieldValue('other_information.logo.img', URL.createObjectURL(files))
        setFieldValue('other_information.logo.data', res.data)
      }
    } catch (error) {}
  }

  const handleYears = (numOfYears, date = new Date(), type) => {
    const dateCopy = new Date(date.getTime());

    if (type === 'add') {
      dateCopy.setFullYear(dateCopy.getFullYear() + numOfYears);
    } else {
      dateCopy.setFullYear(dateCopy.getFullYear() - numOfYears);
    }


    return dateCopy;
  }

  const debouncedValidateCode = useMemo(
    () => debounce(() => validateField('corporate_code'), 2000),
    [validateField],
  );
  const debouncedValidateName = useMemo(
    () => debounce(() => validateField('corporate_name'), 1000),
    [validateField],
  );

  useEffect(() => {
    if (values.corporate_code !== undefined && values.corporate_code) {
      debouncedValidateCode(values)
    }
  }, [values.corporate_code, debouncedValidateCode]);

  useEffect(() => {
    if (values.corporate_name !== undefined && values.corporate_name) {
      debouncedValidateName(values)
    }
  }, [values.corporate_name, debouncedValidateName]);

  const ref = useRef(null);
  const goTo=(id)=>{
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    ref.current.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (errors && isSubmitting) {
      goTo()
    }
  }, [errors])

  const generateArrayOfYears = () => {
    const yearNow = moment().year()
    const max = yearNow + 10
    const min = yearNow - 10
    const years = []

    for (let i = max; i >= min; i--) {
      years.push(i)
    }

    return years
  }

  const calendarStartRef= useRef(null)
  const calendarEndRef= useRef(null)

  return (
    <Form onSubmit={handleSubmit} ref={ref} className='general_information'>
      <Card style={{marginBotton: 0}}>
        <Card.Body>
          {/* general information */}
          <h3 className="card-heading">General Information</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Corporate Code <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.corporate_code}
                      name="corporate_code"
                      id="corporate_code"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={128}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 150 }}
                      className={errors?.corporate_code && 'is-invalid'}
                    />
                    {errors?.corporate_code && (
                      <TextError>
                        {errors.corporate_code}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Corporate Name <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.corporate_name}
                      name="corporate_name"
                      id="corporate_name"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={256}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 400 }}
                      className={errors?.corporate_name && 'is-invalid'}
                    />
                    {errors?.corporate_name && (
                      <TextError>
                        {errors.corporate_name}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>

                  <Form.Label column sm={3} className='mb-2'>
                    Parent Company
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <div style={{ maxWidth: 300 }}>
                      <SelectAsync
                        isClearable
                        name="general_information.parent_company"
                        url={"master/agent-corporates"}
                        id='general_information.parent_company'
                        value={values.general_information.parent_company}
                        placeholder="Please choose"
                        fieldName="agent_corporate.corporate.corporate_name"
                        sort={""}
                        className={`react-select ${
                          touched?.correspondence_address?.country &&
                          errors?.correspondence_address?.country
                            ? "is-invalid"
                            : null
                        }`}
                        onChange={(v) => {
                          setFieldValue('general_information.parent_company', v)
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
                        invalid={touched?.correspondence_address?.country?.value && errors?.correspondence_address?.country?.value}
                      />
                      {touched?.correspondence_address?.country?.value && errors?.correspondence_address?.country?.value && (
                        <TextError>
                          {errors.correspondence_address?.country?.value}
                        </TextError>
                      )}
                    </div>
                    {touched?.general_information?.parent_company && errors?.general_information?.parent_company && (
                      <TextError>
                        {errors.general_information.parent_company}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Type <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Select
                      isClearable
                      placeholder="Please choose type company"
                      options={[
                        {
                          value: 'ed627a99-c679-41c2-95bb-6b31c2b6562e',
                          label: 'Agriculture'
                        },
                        {
                          value: '1ad5c67d-d2ea-4625-b311-7f8e47fa7d12',
                          label: 'Chemical'
                        },
                        {
                          value: 'dc93441c-6d7f-4b1a-9de8-aaf2bdd8c455',
                          label: 'Manufacturing'
                        },
                        {
                          value: 'af469874-49d1-4e06-9e5a-ece7b2dfb525',
                          label: 'Oil and Gas'
                        },
                        {
                          value: '227fec57-34fb-4eed-b2bd-c92672240130',
                          label: 'Technology'
                        }
                      ]}
                      width={'400px'}
                      name='general_information.corporate_type'
                      id='general_information.corporate_type'
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
                      isDisabled={isLoading || isView}
                      invalid={touched?.general_information?.corporate_type?.value && errors?.general_information?.corporate_type?.value}
                    />
                    {touched?.general_information?.corporate_type?.value && errors?.general_information?.corporate_type?.value && (
                      <TextError>
                        {errors.general_information.corporate_type?.value}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    NPWP <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.general_information.corporate_npwp}
                      name="general_information.corporate_npwp"
                      id="general_information.corporate_npwp"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={36}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 320 }}
                      className={touched?.general_information?.corporate_npwp && errors?.general_information?.corporate_npwp && 'is-invalid'}
                    />
                    {touched?.general_information?.corporate_npwp && errors?.general_information?.corporate_npwp && (
                      <TextError>
                        {errors.general_information.corporate_npwp}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Contract Period
                  </Form.Label>
                  <Col md={3} lg={9} className='row d-flex align-items-center'>
                    <Col lg={4}>
                      <DatePicker
                        ref={calendarStartRef}
                        className="form-control text-center"
                        dateFormat="dd MMMM yyyy"
                        onChange={(date) => {
                          setFieldValue('general_information.corporate_contract.date_start', date)
                        }}
                        disabled={isLoading}
                        readOnly={isView}
                        selected={values.general_information.corporate_contract.date_start}
                        startDate={values.general_information.corporate_contract.date_start}
                        endDate={values.general_information.corporate_contract.date_end}
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
                          console.log({e,calendarEndRef})
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
                                {generateArrayOfYears().map((option) => (
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
                              console.log(e, 'button');
                              calendarStartRef.current.setSelected(values.general_information.corporate_contract.date_start)
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
                          setFieldValue('general_information.corporate_contract.date_end', date)
                        }}
                        disabled={isLoading}
                        readOnly={isView}
                        selected={values.general_information.corporate_contract.date_end}
                        ref={calendarEndRef}
                        selectsEnd
                        startDate={values.general_information.corporate_contract.date_start}
                        endDate={values.general_information.corporate_contract.date_end}
                        minDate={values.general_information.corporate_contract.date_start}
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
                                {generateArrayOfYears().map((option) => (
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
                              console.log(e, 'button');
                              calendarEndRef.current.setSelected(values.general_information.corporate_contract.date_end)
                              calendarEndRef.current.setOpen(false)
                            }}
                          >
                            APPLY
                          </Button>
                        </div>
                      </DatePicker>
                    </Col>
                    {/* {touched?.general_information?.corporate_npwp && errors?.general_information?.corporate_npwp && (
                      <TextError>
                        {errors.general_information.corporate_npwp}
                      </TextError>
                    )} */}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* contact information */}
          <h3 className="card-heading">Contacts Information</h3>
          <div style={{ padding: "0 15px 15px 15px" }}>
            <Row>
              <Col sm={9} md={9} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Email <span className="form-label-required">*</span>
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.contact_information.corporate_email}
                      name="contact_information.corporate_email"
                      id="contact_information.corporate_email"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={256}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 300 }}
                      className={touched?.contact_information?.corporate_email && errors?.contact_information?.corporate_email && 'is-invalid'}
                    />
                    {touched?.contact_information?.corporate_email && errors?.contact_information?.corporate_email && (
                      <TextError>
                        {errors.contact_information.corporate_email}
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
                      value={values.contact_information.corporate_phone}
                      name="contact_information.corporate_phone"
                      id="contact_information.corporate_phone"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={36}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 200 }}
                      className={touched?.contact_information?.corporate_phone && errors?.contact_information?.corporate_phone && 'is-invalid'}
                    />
                    {touched?.contact_information?.corporate_phone && errors?.contact_information?.corporate_phone && (
                      <TextError>
                        {errors.contact_information.corporate_phone}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Fax
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.contact_information.corporate_fax}
                      name="contact_information.corporate_fax"
                      id="contact_information.corporate_fax"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={36}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 200 }}
                      className={touched?.contact_information?.corporate_fax && errors?.contact_information?.corporate_fax && 'is-invalid'}
                    />
                    {touched?.contact_information?.corporate_fax && errors?.contact_information?.corporate_fax && (
                      <TextError>
                        {errors.contact_information.corporate_fax}
                      </TextError>
                    )}
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
                  <Form.Label column sm={3} className='mb-2'>
                    Address
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <textarea
                      value={values.correspondence_address.address}
                      name="correspondence_address.address"
                      id="correspondence_address.address"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={512}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ resize: 'none', maxWidth: 400 }}
                      className={`form-control mb-2 ${touched?.correspondence_address?.address && errors?.correspondence_address?.address && 'is-invalid'}`}
                    />
                    {touched?.correspondence_address?.address && errors?.correspondence_address?.address && (
                      <TextError>
                        {errors.correspondence_address.address}
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
                        name="correspondence_address.country"
                        url={`master/countries`}
                        value={!values.correspondence_address.country.value ? null : values.correspondence_address.country}
                        placeholder="Please choose"
                        fieldName="country_name"
                        className={`react-select ${
                          touched?.correspondence_address?.country &&
                          errors?.correspondence_address?.country
                            ? "is-invalid"
                            : null
                        }`}
                        onChange={(v) => {
                          if (v) handleChangeCountry('correspondence', v.value)
                          setValues({
                            ...values,
                            correspondence_address: {
                              ...values.correspondence_address,
                              country: {
                                value: v.value,
                                label: v.label
                              },
                              province: null,
                              city: null
                            }
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
                        invalid={touched?.correspondence_address?.country?.value && errors?.correspondence_address?.country?.value}
                      />
                      {touched?.correspondence_address?.country?.value && errors?.correspondence_address?.country?.value && (
                        <TextError>
                          {errors.correspondence_address?.country?.value}
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
                        name="correspondence_address.province"
                        value={values.correspondence_address.province}
                        placeholder="Please choose"
                        options={!values.correspondence_address.country ? [] : optionProvince.correspondence}
                        onChange={(v) => {
                          setFieldValue('correspondence_address.province', v)
                          setFieldValue('correspondence_address.city', null)
                          handleChangeProvince("correspondence", v?.value, values.correspondence_address.country?.value)
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
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
                        options={!values.correspondence_address.country ? [] : optionCity.correspondence}
                        onChange={(v) => {
                          setFieldValue("correspondence_address.city", v)
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
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
                      value={values.correspondence_address.zipcode}
                      name="correspondence_address.zipcode"
                      id="correspondence_address.zipcode"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 100 }}
                      className={touched?.correspondence_address?.zipcode && errors?.correspondence_address?.zipcode && 'is-invalid'}
                    />
                    {touched?.correspondence_address?.zipcode && errors?.correspondence_address?.zipcode && (
                      <TextError>
                        {errors.correspondence_address.zipcode}
                      </TextError>
                    )}
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
                        disabled={isLoading}
                        readOnly={isView}
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
                        disabled={isLoading}
                        readOnly={isView}
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
                  <Form.Label column sm={3} className='mb-2'>
                    Address
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <textarea
                      value={values.billing_address.address}
                      name="billing_address.address"
                      id="billing_address.address"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={512}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ resize: 'none', maxWidth: 400 }}
                      className={`form-control mb-2 ${touched?.correspondence_address?.address && errors?.correspondence_address?.address && 'is-invalid'}`}
                    />
                    {touched?.correspondence_address?.address && errors?.correspondence_address?.address && (
                      <TextError>
                        {errors.correspondence_address.address}
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
                        name="billing_address.country"
                        url={`master/countries`}
                        value={!values.billing_address.country.value ? null : values.billing_address.country}
                        placeholder="Please choose"
                        fieldName="country_name"
                        className={`react-select ${
                          touched?.billing_address?.country &&
                          errors?.billing_address?.country
                            ? "is-invalid"
                            : null
                        }`}
                        onChange={(v) => {
                          if (v) handleChangeCountry('billing', v.value)
                          setValues({
                            ...values,
                            billing_address: {
                              ...values.billing_address,
                              country: {
                                value: v.value,
                                label: v.label
                              },
                              province: null,
                              city: null
                            }
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
                        invalid={touched?.billing_address?.country?.value && errors?.billing_address?.country?.value}
                      />
                      {touched?.billing_address?.country?.value && errors?.billing_address?.country?.value && (
                        <TextError>
                          {errors.billing_address.country?.value}
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
                        name="billing_address.province"
                        value={values.billing_address.province}
                        placeholder="Please choose"
                        options={!values.billing_address.country ? [] : optionProvince.billing}
                        onChange={(v) => {
                          setFieldValue('billing_address.province', v)
                          setFieldValue('billing_address.city', null)
                          handleChangeProvince("billing", v?.value, values.billing_address.country?.value)
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
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
                        options={!values.billing_address.country ? [] : optionCity.billing}
                        onChange={(v) => {
                          setFieldValue("billing_address.city", v)
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
                        isDisabled={isLoading || isView}
                        readOnly={isView}
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
                      value={values.billing_address.zipcode}
                      name="billing_address.zipcode"
                      id="billing_address.zipcode"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={16}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 100 }}
                      className={touched?.billing_address?.zipcode && errors?.billing_address?.zipcode && 'is-invalid'}
                    />
                    {touched?.billing_address?.zipcode && errors?.billing_address?.zipcode && (
                      <TextError>
                        {errors.billing_address.zipcode}
                      </TextError>
                    )}
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
                        disabled={isLoading}
                        readOnly={isView}
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
                        disabled={isLoading}
                        readOnly={isView}
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
          <div style={{ padding: "0 15px 15px 15px" }} className='other_information'>
            <Row>
              <Col sm={9} md={12} lg={9}>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Website
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <Form.Control
                      value={values.other_information.website}
                      name="other_information.website"
                      id="other_information.website"
                      onChange={handleChange}
                      type="text"
                      minLength={1}
                      maxLength={256}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ maxWidth: 300 }}
                      className={touched?.other_information?.website && errors?.other_information?.website && 'is-invalid'}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={3} className='mb-2'>
                    Internal Remark
                  </Form.Label>
                  <Col md={3} lg={9}>
                    <textarea
                      value={values.other_information.internal_remark}
                      name="other_information.internal_remark"
                      id="other_information.internal_remark"
                      onChange={handleChange}
                      minLength={1}
                      maxLength={4000}
                      placeholder=""
                      disabled={isLoading}
                      readOnly={isView}
                      style={{ resize: 'none', maxWidth: 400 }}
                      className={`form-control mb-2 ${touched?.other_information?.internal_remark && errors?.other_information?.internal_remark && 'is-invalid'}`}
                    />
                    {touched?.other_information?.internal_remark && errors?.other_information?.internal_remark && (
                      <TextError>
                        {errors.other_information.internal_remark}
                      </TextError>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='form-group d-flex align-items-start'>
                  <Form.Label column sm={3} className='mb-2'>
                    Logo
                  </Form.Label>
                  <Col lg={9} md={3} className='d-flex align-items-start'>
                    <input
                      name="other_information.logo"
                      id='other_information.logo'
                      type="file"
                      onChange={(e) => handleUpload(e)}
                      className="form-control input-image"
                      accept="image/jpeg,image/jpg,image/png"
                      data-rule-required="true"
                      data-msg-accept="Only .png, .jpg, .jpeg file supported"
                      ref={uploadRef}
                      disabled={isView}
                    />
                    {values.other_information.logo.img ? (
                      <img src={values.other_information.logo.img || NoImage} className="image_wrapper" alt="up-img" />
                    ) : (
                      <div className='wrapper d-flex justify-content-center align-items-center cursor-pointer' onClick={() => uploadRef.current.click()}>
                        <img src={ImageDefault} className='default' alt='noimage' />
                      </div>
                    )}
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
                        cursor: 'pointer',
                        visibility: isView && 'hidden'
                      }}
                      className='button'
                      disabled={isLoading}
                      readOnly={isView}
                      onClick={() => uploadRef.current.click()}
                    >
                      UPLOAD PHOTO
                    </Button>
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
          type={isView ? 'button' : 'submit'}
          style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
          disabled={isLoading}
          readOnly={isView}
          onClick={() => {
            if (!isView) return

            handleChangeTabKey()
          }}
        >
          SAVE & NEXT
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            history.goBack()
          }}
          style={{ padding: '0 21px' }}
          disabled={isLoading}
          readOnly={isView}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

GeneralInfomation.propTypes = {
  history: PropTypes.object.isRequired,
  backUrl: PropTypes.string.isRequired,
  handleChangeTabKey: PropTypes.func.isRequired,
  corporateId: PropTypes.string,
  data: PropTypes.object
}

export default GeneralInfomation