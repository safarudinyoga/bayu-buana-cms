import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Card, Button, Modal, ModalBody } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ReactSVG } from 'react-svg'
import Dropzone from "react-dropzone-uploader"

// components & styles

// utils

const ImportDatabaseEmployee = ({
  history,
  backUrl,
  handleChangeTabKey,
  corporateId,
  endpoint
}) => {
  const [isShow, setisShow] = useState(false)

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmitFile = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <div>
      <Form className='import_database_employee'>
        <Card>
          <Card.Body>
            <h3 className="card-heading">Import Database Employee</h3>
            <Row className='mb-3 ml-2 d-flex align-items-center'>
              <Card.Text className='m-0 mr-4'>Download Employee Database Template</Card.Text>
              <ReactSVG src="/img/icons/download-with-arrow.svg" style={{ cursor: 'pointer' }} />
            </Row>
            <Row className='d-flex mb-3 ml-2 align-items-center'>
              <Card.Text className='m-0 mr-4'>Select a CSV file and upload the employee data that you would like to import</Card.Text>
              <Button
                variant="primary"
                disabled={false}
                style={{ minWidth: '150px' }}
                onClick={() => setisShow(true)}
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
            variant="secondary"
            onClick={() => {
              handleChangeTabKey('upload-document', 12)
            }}
            style={{ padding: '0 21px' }}
          >
            CANCEL
          </Button>
        </div>
      </Form>

      <Modal
        centered
        show={isShow}
        onHide={() => setisShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName='bb-modal-dialog'
        className='upload_document'
      >
        <Modal.Header closeButton className="bb-modal-header" />
        <ModalBody className='bb-modal-body'>
          <p className="upload_title">upload your file</p>
          <p className='upload_desc'>File should be PDF (max 2MB)</p>
          <Dropzone
            classNames={{
              dropzone: 'upload_file_wrapper',
              submitButtonContainer: 'd-none',
            }}
            getUploadParams={(e) => console.log(e)}
            onChangeStatus={(e) => console.log(e)}
            onSubmit={(e) => console.log(e)}
            accept="application/pdf"
            maxSizeBytes={2097152}
            maxFiles={1}
            submitButtonContent={null}
            inputContent={
              <div className="form-uploader">
                <ReactSVG src="/img/icons/upload.svg" />
                <p className="upload_form_desc d-flex">Drag your file here, or <p style={{ color: '#1743BE', marginLeft: '4px' }}>browse</p></p>
              </div>
            }
          />
          <Button className='upload_button'>done</Button>
        </ModalBody>
      </Modal>
    </div>
  )
}

ImportDatabaseEmployee.propTypes = {
  history: PropTypes.object.isRequired,
  backUrl: PropTypes.string.isRequired,
  handleChangeTabKey: PropTypes.func.isRequired,
  corporateId: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}

export default ImportDatabaseEmployee