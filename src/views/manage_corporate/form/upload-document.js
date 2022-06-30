import React from 'react'
import { Form, Row, Card, Button, Col } from "react-bootstrap"
import { useFormik, FieldArray, FormikProvider } from "formik"
import * as Yup from "yup"
import { ReactSVG } from 'react-svg'

// components
import createIcon from "assets/icons/create.svg"
import useQuery from "lib/query"

class additionalFileState {
  constructor() {
    this.name = ''
    this.value = ''
  }
}

const UploadDocument = () => {
  const isView = useQuery().get("action") === "view"
  const formikValue = useFormik({
    initialValues: {
      additionalFile: [
        // {
        //   name: '',
        //   value: '',
        // }
      ]
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = formikValue

  return (
    <Form className='upload_document'>
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
                  <Button className='button_upload'>
                    <ReactSVG src="/img/icons/upload_manage_corporate.svg" className='mr-2' />
                    UPLOAD FILE
                  </Button>
                </Form.Group>
                <Form.Group as={Row} className='form-group'>
                  <Form.Label column sm={5} className='mb-1'>
                    Contract <div className='tooltips' />
                  </Form.Label>
                  <Button className='button_upload'>
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

export default UploadDocument