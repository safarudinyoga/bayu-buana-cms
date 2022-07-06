import React, { useEffect } from 'react'
import { Form, Row, Card, Button } from "react-bootstrap"
import { useFormik, FieldArray, FormikProvider } from "formik"
import { ReactSVG } from 'react-svg'
import * as Yup from "yup"

// components
import createIcon from "assets/icons/create.svg"
import Select from "components/form/select"
import useQuery from "lib/query"
import './_form.sass'

class additionalInformationState {
  constructor() {
    this.text = ''
    this.type = ''
    this.inputType = 'mandatory'
  }
}

const Settings = () => {
  const isView = useQuery().get("action") === "view"
  const formikValue = useFormik({
    initialValues: {
      additionalInformation: [
        // {
        //   text: '',
        //   type: '',
        //   inputType: ''
        // }
      ],
      prefix_code: ''
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = formikValue

  return (
    <Form>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Settings</h3>
          <div className='settings manage_corporate_card pl-2 pr-2'>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>RFP NUMBER</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Prefix Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={32}
                    value={values.prefix_code}
                    placeholder=""
                    style={{ width: '100px' }}
                    className='mr-2'
                  />
                  <Card.Text className='m-0 helper_text'><span className="form-label-required">*</span> 3 to 5 characters</Card.Text>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>SELF BOOKING</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Enable Corporate Self Booking Tool
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Allow to Issue Flight Ticket
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Able to Hold Flight Ticket (book only & issue ticket later)
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>TRAVEL CONSULTANT ASSISTANCE</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0 mb-2'>
                  <Form.Label column lg={5}>
                    Service Level <span className="form-label-required">*</span>
                  </Form.Label>
                  <Select
                    isClearable
                    placeholder="Please Choose"
                    options={[
                      {
                        value: 'shared',
                        label: 'Shared (static)'
                      },
                      {
                        value: 'dedicated_offside',
                        label: 'Dedicated Offside (static)'
                      },
                      {
                        value: 'dedicated_onside',
                        label: 'Dedicated Onside (static)'
                      },
                    ]}
                    onChange={() => {}}
                    width={'200px'}
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
                  <Form.Label column lg={5}>
                    Require Travel Request
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
                <Form.Group as={Row} className='align-items-start form-group m-0 mb-2'>
                  <Form.Label column lg={5}>
                    Remark for Travel Request Verification
                  </Form.Label>
                  <textarea
                    // value={values.address_line}
                    // name="address_line"
                    // id="address_line"
                    onChange={handleChange}
                    minLength={1}
                    maxLength={512}
                    placeholder=""
                    disabled={isView}
                    // disabled={isView || loading}
                    style={{ width: 400, resize: 'none', height: '80px', borderRadius: '8px', border: '1px solid #ced4da' }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>TRAVEL PURPOSE</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Require Travel Purpose
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>PERSONAL TRAVEL</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Allow Booking for Personal Travel
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>NON-GDS PROCESSING</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Non-GDS Flight Processing
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group m-0'>
                  <Form.Label column lg={5}>
                    Non-GDS Hotel Processing
                  </Form.Label>
                  <Form.Check
                    // name
                    // id
                    type="switch"
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>SHARING PERCENT</Card.Header>
              <Card.Body>
                <Form.Group as={Row} className='align-items-center form-group m-0 mb-2'>
                  <Form.Label column lg={5}>
                    Travel Consultant Assistance <span className="form-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={16}
                    placeholder=""
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                  <Card.Text className='m-0'>%</Card.Text>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group m-0 mb-2'>
                  <Form.Label column lg={5}>
                    Self Booking <span className="form-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={16}
                    placeholder=""
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                  <Card.Text className='m-0'>%</Card.Text>
                </Form.Group>
                <Form.Group as={Row} className='align-items-center form-group m-0 mb-2'>
                  <Form.Label column lg={5}>
                    Personal Travel <span className="form-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    minLength={1}
                    maxLength={16}
                    placeholder=""
                    style={{ width: '55px' }}
                    className='mr-2'
                  />
                  <Card.Text className='m-0'>%</Card.Text>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>ADDITIONAL BOOKING INFORMATION</Card.Header>
              <Card.Body>
                <FormikProvider value={formikValue}>
                  <FieldArray
                    name='additionalInformation'
                    render={({ push, remove }) => (
                      <>
                        {values.additionalInformation.map(({ text, type, inputType }, i) =>
                          <div key={i}>
                            <Form.Group as={Row} className='align-items-center form-group m-0 position-relative'>
                              <Form.Control
                                value={text}
                                name={`additionalInformation.${i}.text`}
                                id={`additionalInformation.${i}.text`}
                                onChange={handleChange}
                                type="text"
                                minLength={1}
                                maxLength={256}
                                placeholder=""
                                disabled={isView}
                                // disabled={isView || loading}
                                style={{ maxWidth: 400, marginRight: '15px' }}
                              />
                              <Select
                                isClearable
                                placeholder="Select Field Type"
                                options={[
                                  {
                                    value: 'short_text',
                                    label: 'Short Text (static)'
                                  },
                                  {
                                    value: 'long_text',
                                    label: 'Long Text (static)'
                                  },
                                  {
                                    value: 'single_choice',
                                    label: 'Single Choice (static)'
                                  },
                                  {
                                    value: 'multiple_choice',
                                    label: 'Multiple Choice (static)'
                                  },
                                  {
                                    value: 'rating',
                                    label: 'Rating (static)'
                                  },
                                ]}
                                onChange={(e) => {
                                  setFieldValue(`additionalInformation.${i}.type`, e.value)
                                }}
                                width={'200px'}
                                name={`additionalInformation.${i}.type`}
                                id={`additionalInformation.${i}.type`}
                                value={type}
                                components={
                                  isView
                                    ? {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                      }
                                    : null
                                }
                                isDisabled={isView}
                                className='mr-4'
                              />
                              <Form.Group className='d-flex flex-column align-items-start m-0'>
                                <Form.Check
                                  name={`additionalInformation.${i}.inputType`}
                                  id={`additionalInformation.${i}.inputType`}
                                  checked={values.additionalInformation[i].inputType === 'mandatory'}
                                  onChange={(e) => {
                                    const { checked } = e.target

                                    if (checked) {
                                      setFieldValue(`additionalInformation.${i}.inputType`, 'mandatory')
                                    }
                                  }}
                                  label='Mandatory'
                                  type="radio"
                                  className='mb-2'
                                />
                                <Form.Check
                                  name={`additionalInformation.${i}.inputType`}
                                  id={`additionalInformation.${i}.inputType`}
                                  checked={values.additionalInformation[i].inputType === 'opsional'}
                                  onChange={(e) => {
                                    console.log(e)
                                    const { checked } = e.target

                                    if (checked) {
                                      setFieldValue(`additionalInformation.${i}.inputType`, 'opsional')
                                    }
                                  }}
                                  label='Optional'
                                  type="radio"
                                  className='mb-2'
                                />
                              </Form.Group>
                              <div className='trash_icon' onClick={() => remove(i)}><ReactSVG src='/img/icons/bin.svg' /></div>
                            </Form.Group>
                            <div className='divider' />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => push({ text: new additionalInformationState().text, type: new additionalInformationState().type, inputType: new additionalInformationState().inputType })}
                          className="btn btn-warning float-right button-new"
                        >
                          <img src={createIcon} className="mr-1" alt="new" />
                          Add Custom Field
                        </button>
                      </>
                    )}
                  />
                </FormikProvider>
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
          SAVE & NEXT
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            // console.log(props.history);
          }}
          style={{ padding: '0 21px' }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default Settings