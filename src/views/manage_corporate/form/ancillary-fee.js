import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components
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
                  placeholder="Choose Flight Ancillary Fee"
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
            <div className='divider' />
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
                  placeholder="Choose Flight Ancillary Fee"
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
          </div>
        </Card.Body>
      </Card>
    </Form>
  )
}

AncillaryFee.propTypes = {}

export default AncillaryFee