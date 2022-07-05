import React from 'react'
import { Form, Col, Card } from "react-bootstrap"
import Select from "components/form/select"
import createIcon from "assets/icons/create.svg"
import { formatRupiah } from 'lib/formatRupiah'
import TextError from 'components/formik/textError'
import { components } from "react-select"
import BbDataTable from 'components/table/bb-data-table'
import CostCenterModal from 'views/manage_corporate/form/credit-limit/cost-center'

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <div className='d-flex justify-content-start align-items-center'>
          <Form.Check
            type='checkbox'
            name='workingDays'
            id='workingDays'
            label={props.label}
            // onChange={(e) => console.log(e)}
            checked={props.isSelected}
          />
        </div>
      </components.Option>
    </div>
  );
};

const MasterCreditLimit = ({ formikState, paramsCostCenter }) => {

  const { handleChange, values, errors, touched, setFieldValue, setFieldTouched } = formikState

  return (
    <>
      <Form className='master_credit_limit'>
        <Form.Group className='wrapper'>
          <Form.Label column lg={3} className='mr-5 pl-0'>Share Credit Limit with other company <div className='tooltips' /> <br /> (Petro XYZ)</Form.Label>
          <Col className='d-flex align-items-center' lg={9}>
            <Col lg={3}>
              <Form.Check
                name='is_share_credit_with_other_company_true'
                id='is_share_credit_with_other_company_true'
                type='radio'
                label="Yes"
                value='true'
                onChange={() => setFieldValue('is_share_credit_with_other_company', 'true')}
                checked={values.is_share_credit_with_other_company === 'true'}
              />
            </Col>
            <Col lg={9}>
              <Form.Check
                name='is_share_credit_with_other_company_false'
                id='is_share_credit_with_other_company_false'
                type='radio'
                label="No"
                value='false'
                onChange={() => setFieldValue('is_share_credit_with_other_company', 'false')}
                checked={values.is_share_credit_with_other_company === 'false'}
              />
            </Col>
          </Col>
        </Form.Group>
        <Form.Group className='wrapper'>
          <Form.Label column sm={3} className='mr-5 pl-0'>Total Limit Amount (IDR)</Form.Label>
          <Col md={3} lg={9}>
            <Form.Control
              value={formatRupiah(values.total_limit)}
              name="total_limit"
              id="total_limit"
              onChange={handleChange}
              type='text'
              minLength={0}
              maxLength={15}
              placeholder=''
              style={{ width: '150px' }}
              // disabled={isLoading}
              // readOnly={isView}
            />
          </Col>
        </Form.Group>
        {values.is_share_credit_with_other_company === 'true' && (
          <>
            <Form.Group className='wrapper'>
              <Form.Label column lg={3} className='mr-5 pl-0'>Sharing Option <div className='tooltips' /></Form.Label>
              <Col className='d-flex align-items-center' lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='sharing_option_shared'
                    id='sharing_option_shared'
                    type='radio'
                    label="Shared"
                    value='shared'
                    onChange={() => setFieldValue('sharingOption', 'shared')}
                    checked={values.sharing_option === 'shared'}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='sharing_option_fixed'
                    id='sharing_option_fixed'
                    type='radio'
                    label="Fixed"
                    value='fixed'
                    onChange={() => setFieldValue('sharing_option', 'fixed')}
                    checked={values.sharing_option === 'fixed'}
                  />
                </Col>
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5 pl-0'>Allocation (IDR) <span className="form-label-required">*</span></Form.Label>
              <Col md={3} lg={9}>
                <Form.Control
                  value={formatRupiah(values.allocation)}
                  name="allocation"
                  id="allocation"
                  onChange={handleChange}
                  type='text'
                  minLength={0}
                  maxLength={15}
                  placeholder=''
                  style={{ width: '150px' }}
                  // disabled={isLoading}
                  // readOnly={isView}
                  className={touched?.allocation && errors?.allocation && 'is-invalid'}
                />
                {touched?.allocation && errors?.allocation && (
                  <TextError>
                    {errors.allocation}
                  </TextError>
                )}
              </Col>
            </Form.Group>
          </>
        )}

        {/* credit tolerance */}
        <Card.Text className='mt-3 mb-3'>Credit Tolerance</Card.Text>
        <Card className='box'>
          <Card.Body style={{ padding: '12px 22px' }}>
            <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>TOLERANCE 1</Card.Text>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Amount (IDR)</Form.Label>
              <Col md={3} lg={9}>
                <Form.Control
                  value={formatRupiah(values.tolerance_one.amount)}
                  name="tolerance_one.amount"
                  id="tolerance_one.amount"
                  onChange={handleChange}
                  type='text'
                  minLength={1}
                  maxLength={16}
                  placeholder=''
                  style={{ width: '150px' }}
                  // disabled={isLoading}
                  // readOnly={isView}
                />
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Ask approval</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='tolerance_one.ask_approval_true'
                    id='tolerance_one.ask_approval_true'
                    type='radio'
                    label="Yes"
                    onChange={() => setFieldValue('tolerance_one.ask_approval', 'true')}
                    checked={values.tolerance_one.ask_approval === 'true'}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='tolerance_one.ask_approval_false'
                    id='tolerance_one.ask_approval_false'
                    type='radio'
                    label="No"
                    onChange={() => setFieldValue('tolerance_one.ask_approval', 'false')}
                    checked={values.tolerance_one.ask_approval === 'false'}
                  />
                </Col>
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Select approver</Form.Label>
              <Col md={3} lg={9}>
                <Select
                  isClearable
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option
                  }}
                  name="tolerance_one.approver"
                  value={values.tolerance_one.approver}
                  placeholder="Please choose"
                  options={[
                    {
                      label: 'jane doe',
                      value: 'doe_1'
                    },
                    {
                      label: 'jane doe',
                      value: 'doe_2'
                    },
                    {
                      label: 'jane doe',
                      value: 'doe_3'
                    },
                    {
                      label: 'jane doe',
                      value: 'doe_4'
                    },
                  ]}
                  onChange={(selected) => {
                    setFieldValue('tolerance_one.approver', selected)
                  }}
                  allowSelectAll
                  onBlur={setFieldTouched}
                  // isDisabled={isView}
                  width={'350px'}
                />
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Approval By</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='tolerance_one.approval_by_one'
                    id='tolerance_one.approval_by_one'
                    type='radio'
                    value='one'
                    label="Either One"
                    onChange={() => setFieldValue('tolerance_one.approval_by', 'one')}
                    checked={values.tolerance_one.approval_by === 'one'}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='tolerance_one.approval_by_all'
                    id='tolerance_one.approval_by_all'
                    type='radio'
                    label="All"
                    value='all'
                    onChange={() => setFieldValue('tolerance_one.approval_by', 'all')}
                    checked={values.tolerance_one.approval_by === 'all'}
                  />
                </Col>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className='box'>
          <Card.Body style={{ padding: '12px 22px' }}>
            <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>TOLERANCE 2</Card.Text>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Amount (IDR)</Form.Label>
              <Col md={3} lg={9}>
                <Form.Control
                  value={formatRupiah(values.tolerance_two.amount)}
                  name="tolerance_two.amount"
                  id="tolerance_two.amount"
                  onChange={handleChange}
                  type='text'
                  minLength={1}
                  maxLength={16}
                  placeholder=''
                  style={{ width: '150px' }}
                  // disabled={isLoading}
                  // readOnly={isView}
                />
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Ask approval</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='tolerance_two.ask_approval_true'
                    id='tolerance_two.ask_approval_true'
                    type='radio'
                    label="Yes"
                    onChange={() => setFieldValue('tolerance_two.ask_approval', 'true')}
                    checked={values.tolerance_two.ask_approval === 'true'}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='tolerance_two.ask_approval_false'
                    id='tolerance_two.ask_approval_false'
                    type='radio'
                    label="No"
                    onChange={() => setFieldValue('tolerance_two.ask_approval', 'false')}
                    checked={values.tolerance_two.ask_approval === 'false'}
                  />
                </Col>
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5'>Select approver</Form.Label>
              <Col md={3} lg={9}>
                <Select
                  isClearable
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option
                  }}
                  name="tolerance_two.approver"
                  value={values.tolerance_two.approver}
                  placeholder="Please choose"
                  options={[
                    {
                      label: 'jane doe',
                      value: 'doe_1'
                    },
                    {
                      label: 'jane doe',
                      value: 'doe_2'
                    },
                    {
                      label: 'jane doe',
                      value: 'doe_3'
                    },
                    {
                      label: 'jane doe',
                      value: 'doe_4'
                    },
                  ]}
                  onChange={(selected) => {
                    setFieldValue('tolerance_two.approver', selected)
                  }}
                  allowSelectAll
                  onBlur={setFieldTouched}
                  // isDisabled={isView}
                  width={'350px'}
                />
              </Col>
            </Form.Group>
            <Form.Group className='wrapper'>
              <Form.Label column sm={3} className='mr-5' style={{ maxWidth: '300px' }}>Approval By</Form.Label>
              <Col className='d-flex align-items-center' md={3} lg={9}>
                <Col lg={3}>
                  <Form.Check
                    name='tolerance_two.approval_by_one'
                    id='tolerance_two.approval_by_one'
                    type='radio'
                    value='one'
                    label="Either One"
                    onChange={() => setFieldValue('tolerance_two.approval_by', 'one')}
                    checked={values.tolerance_two.approval_by === 'one'}
                  />
                </Col>
                <Col lg={9}>
                  <Form.Check
                    name='tolerance_two.approval_by_all'
                    id='tolerance_two.approval_by_all'
                    type='radio'
                    label="All"
                    value='all'
                    onChange={() => setFieldValue('tolerance_two.approval_by', 'all')}
                    checked={values.tolerance_two.approval_by === 'all'}
                  />
                </Col>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
        <Card.Text className="uppercase card-heading mb-3" style={{ fontWeight: '500' }}>COST CENTER</Card.Text>
        <Card.Body style={{ padding: '0 0 30px' }}>
          <BbDataTable {...paramsCostCenter} modalContent={CostCenterModal} />
        </Card.Body>
      </Form>
    </>
  )
}

export default MasterCreditLimit