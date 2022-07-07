import React, { useState } from 'react'
import { Form, Row, Card, Button, Col, Modal, ModalBody } from "react-bootstrap"
import { useFormik, FieldArray, FormikProvider } from "formik"
import * as Yup from "yup"
import { ReactSVG } from 'react-svg'
import Dropzone from "react-dropzone-uploader"
import PropTypes from 'prop-types'

// components
import createIcon from "assets/icons/create.svg"
import useQuery from "lib/query"
import './_form.sass'

class additionalFileState {
  constructor() {
    this.name = ''
    this.value = ''
  }
}

const UploadDocument = ({
  history,
  backUrl,
  handleChangeTabKey,
  corporateId,
  endpoint
}) => {
  const isView = useQuery().get("action") === "view"
  const [isShow, setisShow] = useState(false)

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

  const formikValue = useFormik({
    initialValues: {
      company_profile: '',
      contract: '',
      additionalFile: []
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {
      console.log(val);
      handleChangeTabKey()
    }
  })
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = formikValue

  return (
    <div className='upload_document'>
      <Form >
        <Card>
          <Card.Body>
            <h3 className="card-heading">Upload Document</h3>
            <div>
              <Row>
                <Col lg={12}>
                  <Form.Group as={Row} className='form-group'>
                    <Form.Label column sm={5} className='mb-1'>
                      Company Profile <div className='tooltips' />
                    </Form.Label>
                    <Button className='button_upload' onClick={() => setisShow(true)}>
                      <ReactSVG src="/img/icons/upload_manage_corporate.svg" className='mr-2' />
                      UPLOAD FILE
                    </Button>
                  </Form.Group>
                  <Form.Group as={Row} className='form-group'>
                    <Form.Label column sm={5} className='mb-1'>
                      Contract <div className='tooltips' />
                    </Form.Label>
                    <Button className='button_upload' onClick={() => setisShow(true)}>
                      <ReactSVG src="/img/icons/upload_manage_corporate.svg" className='mr-2' />
                      UPLOAD FILE
                    </Button>
                  </Form.Group>
                  <FormikProvider value={formikValue}>
                    <FieldArray
                      name='additionalFile'
                      render={({ push }) => (
                        <>
                          {values.additionalFile.map(({ name, value }, i) =>
                            <div key={i}>
                              <Form.Group as={Row} className='form-group d-flex align-items-center'>
                                <Form.Label column sm={5} className='p-0'>
                                  <Form.Control
                                    value={name}
                                    name={`additionalFile.${i}.name`}
                                    id={`additionalFile.${i}.name`}
                                    onChange={handleChange}
                                    type="text"
                                    minLength={1}
                                    maxLength={256}
                                    placeholder="Enter document name"
                                    disabled={isView}
                                    // disabled={isView || loading}
                                    style={{ maxWidth: 300 }}
                                  />
                                </Form.Label>
                                <Button className='button_upload'>
                                  <ReactSVG src="/img/icons/upload_manage_corporate.svg" className='mr-2' />
                                  UPLOAD FILE
                                </Button>
                              </Form.Group>
                            </div>
                          )}
                          <button
                            className="btn btn-warning float-left button-new mt-5" type='button'
                            onClick={() => push({ name: new additionalFileState().name, value: new additionalFileState().value })}
                          >
                            <img src={createIcon} className="mr-1" alt="new" />
                            Add Other File
                          </button>
                        </>
                      )}
                    />
                  </FormikProvider>
                </Col>
              </Row>
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
              handleChangeTabKey('corporate-fare', 11)
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

UploadDocument.propTypes = {
  history: PropTypes.object.isRequired,
  backUrl: PropTypes.string.isRequired,
  handleChangeTabKey: PropTypes.func.isRequired,
  corporateId: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}

export default UploadDocument