import React from 'react'
import { Form, Row, Col, Card, Button} from "react-bootstrap"
import Select from "components/form/select"
import createIcon from "assets/icons/create.svg"
import FormInputControl from 'components/form/input-control'
import FormInputDatePeriod from 'components/form/input-date-period'

const CreditLimitByProject = ({ isThereProject, setisThereProject, setisModalVisible, formikState }) => {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue, setFieldTouched } = formikState

  return (
    <>
     {isThereProject ? (
      <Form>
        <Card style={{ boxShadow: 'none' }} className='mb-5'>
          <Card.Body className='pl-4 pr-4 pb-0 pt-0'>
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
          <Card.Body className='pl-4 pr-4 pb-0 pt-0'>
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