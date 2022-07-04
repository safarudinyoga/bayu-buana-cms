import React, { useEffect } from 'react'
import { withRouter } from "react-router"
import { Form, Row, Col, Button, Modal, ModalBody } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components & styles
import TextError from 'components/formik/textError'

// utils
import Api from "config/api"
import useQuery from "lib/query"
import { useDispatch, useSelector } from "react-redux"
import { setModalTitle } from "redux/ui-store"

const CostCenterModal = ({ match }) => {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)

  useEffect(async() => {
    let formId = showCreateModal.id || match?.params?.id

    let docTitle = "Edit Cost Center"
    if (!formId) {
      docTitle = "New Cost Center"
    } else if (isView) {
      docTitle = "Cost Center Details"
    }

    dispatch(setModalTitle(docTitle))


  }, [])


  const { handleChange, values, errors, touched, setFieldValue, setFieldTouched }  = useFormik({
    initialValues: {

    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  return (
    <Form style={{ backgroundColor: 'transparent', padding: '0 30px 0px 20px' }}>
      <Row>
        <Col sm={12}>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4}>
              Name <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={8}>
              <Form.Control
                type="text"
                minLength={1}
                maxLength={16}
                placeholder=""
                style={{ width: '100%' }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4}>
              Limit (IDR) <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={8}>
              <Form.Control
                type="text"
                minLength={1}
                maxLength={16}
                placeholder=""
                style={{ width: 150 }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4}>
              Allocation Type <span className="form-label-required">*</span>
            </Form.Label>
            <Col className='d-flex align-items-center' md={3} lg={8}>
              <Col lg={5}>
                <Form.Check
                  name='approval'
                  checked
                  type='radio'
                  label="Shared"
                  onChange={(e) => {}}
                />
              </Col>
              <Col lg={7}>
                <Form.Check
                  name='approval'
                  checked
                  type='radio'
                  label="Fixed"
                  onChange={(e) => {}}
                />
              </Col>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
        <Button
          variant="primary"
          type="submit"
          // disabled={isSubmitting || !dirty}
          style={{ marginRight: 15, padding: '0 25px' }}
        >
          SAVE
        </Button>
        <Button
          variant="secondary"
          onClick={() => {

          }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default withRouter(CostCenterModal)