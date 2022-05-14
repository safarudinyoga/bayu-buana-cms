import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components & styles
import Select from "components/form/select"
import BbDataTable from 'components/table/bb-data-table'
import './_form.sass'

// utils
import Api from "config/api"

const AncillaryFee = ({
  isMobile
}) => {
  let api = new Api()

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const [key, setKey] = useState('domestic')
  const [params, setParams] = useState({
    title: "Ancillary Fee",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideSearch: true,
    isHideDownloadLogo: true,
    isHideCreateButton: true,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/ancillary-fee",
    columns: [
      {
        title: "Fee Type",
        data: ""
      },
      {
        title: "Processing Fee",
        data: ""
      },
    ],
    emptyTable: "No Corporate Fare found",
  })

  const onReset = () => {
    setParams({...params, filters: []})
  }

  const Domestic = () => (
    <>
      <Card.Text className='mb-2 pl-1 mt-4'>Modify Hotel Fee</Card.Text>
      <div className='pl-5'>
        <Card.Text className='mb-2'>Fixed Amount</Card.Text>
        <div className='d-flex align-items-center justify-content-start'>
          <Card.Text className='uppercase mb-0'>idr</Card.Text>
          <Form.Control
            type='text'
            minLength={1}
            maxLength={16}
            placeholder=''
            style={{ width: '120px', margin: '0 11px' }}
          />
          <Card.Text className='mb-0'>/Room</Card.Text>
        </div>
      </div>
      <div className='divider mb-4 mt-4' />
      <Card.Text className='mb-2 pl-1 mt-4'>Hotel Refund Fee</Card.Text>
      <div className='pl-5'>
        <Card.Text className='mb-2'>Percentage</Card.Text>
        <div className='d-flex align-items-center justify-content-start'>
          <Form.Control
            type='text'
            minLength={1}
            maxLength={16}
            placeholder=''
            style={{ width: '50px', margin: '0 10px 0 0' }}
          />
          <Card.Text className='m-0 mr-2'>%</Card.Text>
          <Card.Text className='m-0'>Include Taxes</Card.Text>
        </div>
      </div>
      <div className='divider mb-4 mt-4' />
      <Card.Text className='mb-2 pl-1 mt-4'>Non-GDS Hotel Booking Process Fee</Card.Text>
      <div className='pl-5'>
        <Card.Text className='mb-2'>Fixed Amount</Card.Text>
        <div className='d-flex align-items-center justify-content-start'>
          <Card.Text className='uppercase mb-0'>idr</Card.Text>
          <Form.Control
            type='text'
            minLength={1}
            maxLength={16}
            placeholder=''
            style={{ width: '120px', margin: '0 11px' }}
          />
          <Card.Text className='mb-0'>/Room</Card.Text>
        </div>
      </div>
      <div className='divider mb-4 mt-4' />
    </>
  )

  const International = () => (
    <>
      <Card.Text className='mb-2 pl-1'>Modify Hotel Fee</Card.Text>
      <div className='pl-5'>
        <Card.Text className='mb-1'>Fixed Amount</Card.Text>
        <div className='d-flex align-items-center justify-content-start'>
          <Card.Text className='uppercase mb-0'>idr</Card.Text>
          <Form.Control
            type='text'
            minLength={1}
            maxLength={16}
            placeholder='Hotel Fee'
            style={{ width: '120px', margin: '0 11px' }}
          />
          <Card.Text className='mb-0'>/Room</Card.Text>
        </div>
      </div>
    </>
  )

  const Other = () => (
    <>
      <Card.Text className='mb-2 pl-1'>Modify Hotel Fee</Card.Text>
      <div className='pl-5'>
        <Card.Text className='mb-1'>Fixed Amount</Card.Text>
        <div className='d-flex align-items-center justify-content-start'>
          <Card.Text className='uppercase mb-0'>idr</Card.Text>
          <Form.Control
            type='text'
            minLength={1}
            maxLength={16}
            placeholder='Hotel Fee'
            style={{ width: '120px', margin: '0 11px' }}
          />
          <Card.Text className='mb-0'>/Room</Card.Text>
        </div>
      </div>
    </>
  )

  const tabList = [
    {
      key: 'domestic',
      children: (<Domestic />),
    },
    {
      key: 'international',
      children: (<International />),
    },
    {
      key: 'other',
      children: (<Other />),
    },
  ]

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{marginBotton: 0}}>
        <Card.Body>
          {isMobile ? "" : <h3 className="card-heading">Ancillary Fee</h3>}
          <div className='ancillary_fee'>
            <div className='wrapper_header'>
              <Card.Text className='uppercase margin-0'>
                flight
              </Card.Text>
              <div className='wrapper_select'>
                <Card.Text className='margin-0'>Select Flight Ancillary Fee</Card.Text>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  className='select'
                  options={[
                    {
                      value: 'silver',
                      label: 'label'
                    },
                    {
                      value: 'silver',
                      label: 'label'
                    },
                  ]}
                />
              </div>
            </div>
            <div className='divider mb-2 mt-2' />
            <div className='mb-3'>
              <BbDataTable {...params} onReset={onReset} />
            </div>
            <div className='wrapper_header'>
              <Card.Text className='uppercase margin-0'>
                Hotel
              </Card.Text>
              <div className='wrapper_select'>
                <Card.Text className='margin-0'>Select Hotel Ancillary Fee</Card.Text>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  className='select'
                  options={[
                    {
                      value: 'silver',
                      label: 'label'
                    },
                    {
                      value: 'silver',
                      label: 'label'
                    },
                  ]}
                />
              </div>
            </div>
            <div className='divider mb-4 mt-2' />
            <div className='card mt-4'>
              <Tabs
                id='ancillary-fee'
                activeKey={key}
                onSelect={(key) => setKey(key)}
                className='tabs mb-2'
                mountOnEnter
                unmountOnExit
              >
                {tabList.map((res, i) =>
                  <TabPane
                    key={i}
                    className="m-3 pl-2 pr-2"
                    eventKey={res.key}
                    title={
                      <div className="d-md-flex flex-row bd-highlight">
                        <span className="tabs-text uppercase">{res.key}</span>
                      </div>
                    }
                  >
                    {res.children}
                  </TabPane>
                )}
              </Tabs>
            </div>
            <div className='wrapper_header'>
              <Card.Text className='uppercase margin-0'>
                Other
              </Card.Text>
              <div className='wrapper_select'>
                <Card.Text className='margin-0'>Select Other Ancillary Fee</Card.Text>
                <Select
                  isClearable
                  placeholder="Please Choose"
                  className='select'
                  options={[
                    {
                      value: 'silver',
                      label: 'label'
                    },
                    {
                      value: 'silver',
                      label: 'label'
                    },
                  ]}
                />
              </div>
            </div>
            <div className='divider mb-4 mt-2' />
          </div>
        </Card.Body>
      </Card>
    </Form>
  )
}

AncillaryFee.propTypes = {}

export default AncillaryFee