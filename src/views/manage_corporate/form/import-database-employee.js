import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ReactSVG } from 'react-svg'

// components & styles

// utils

const ImportDatabaseEmployee = props => {

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  return (
    <Form className='import_database_employee'>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Import Database Employee</h3>
          <Row className='mb-3 ml-2 d-flex align-items-center'>
            <Card.Text className='m-0 mr-4'>Download Employee Database Template</Card.Text>
            <ReactSVG src="/img/icons/download-with-arrow.svg" />
          </Row>
          <Row className='d-flex mb-3 ml-2 align-items-center'>
            <Card.Text className='m-0 mr-4'>Select a CSV file and upload the employee data that you would like to import</Card.Text>
            <Button
              variant="primary"
              type="submit"
              disabled={false}
              style={{ minWidth: '150px' }}
            >
              <ReactSVG src="/img/icons/upload_manage_corporate.svg" className='mr-2' />
              UPLOAD FILE
            </Button>
          </Row>
          <Card.Text className='ml-2 font-italic' style={{ fontSize: '13px' }}>Note: Person in charge of the respective corporate MUST VERIFY the imported employee database in order to make it available/ready to use.</Card.Text>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
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

ImportDatabaseEmployee.propTypes = {}

export default ImportDatabaseEmployee