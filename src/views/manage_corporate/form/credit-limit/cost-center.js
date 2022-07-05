import React, { useEffect, useState } from 'react'
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
import { setModalTitle, setCreateModal, setAlert } from "redux/ui-store"
import { errorMessage } from 'lib/errorMessageHandler'
import { SUCCESS_RESPONSE_STATUS } from 'lib/constants'

const slugDictionary = {
  name: 'Cost Center Name',
  limit: 'Limit',
  allocationType: 'Allocation Type'
}

const endpoint = '/master/agent-corporates'

const CostCenterModal = ({ match }) => {
  let api = new Api()
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)

  const [isLoading, setisLoading] = useState(false)
  let formId = showCreateModal.id || match?.params?.id

  useEffect(async() => {

    let docTitle = "Edit Cost Center"
    if (!formId) {
      docTitle = "New Cost Center"
    } else if (isView) {
      docTitle = "Cost Center Details"
    }

    dispatch(setModalTitle(docTitle))


  }, [])


  const { handleChange, values, errors, touched, setFieldValue, handleSubmit }  = useFormik({
    initialValues: {
      name: '',
      limit: '',
      allocationType: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(errorMessage(slugDictionary['name'])),
      limit: Yup.string().required(errorMessage(slugDictionary['limit'])),
      allocationType: Yup.string().required(errorMessage(slugDictionary['allocationType']))
    }),
    onSubmit: (val) => {
      const payload = {

      }

      postCostCenter()
    }
  })

  const postCostCenter = async (payload) => {
    setisLoading(true)

    try {
      const { status, ...res } = await api.post(`${endpoint}/${formId}/credit-limit/cost-center`)
      console.log(res);
      if (SUCCESS_RESPONSE_STATUS.includes(status)) {
        setisLoading(false)
        dispatch(setAlert({
          message: `Record 'Cost Center Name: {${payload.name}}' has been successfully saved.`,
        }),)
        dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
      }
    } catch (error) {
      setisLoading(false)
      dispatch(
        setAlert({
          message: 'Failed to save this record.',
        }),
      )
    }
  }

  return (
    <Form style={{ backgroundColor: 'transparent', padding: '0 30px 0px 20px' }} onSubmit={handleSubmit}>
      <Row>
        <Col sm={12}>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4}>
              Name <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={8}>
              <Form.Control
                name="name"
                id="name"
                value={values.name}
                type="text"
                minLength={1}
                maxLength={128}
                placeholder=""
                style={{ width: '100%' }}
                onChange={handleChange}
                // disabled={isLoading}
                readOnly={isView}
                className={touched?.name && errors?.name && 'is-invalid'}
              />
              {touched?.name && errors?.name && (
                <TextError>
                  {errors.name}
                </TextError>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4}>
              Limit (IDR) <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={8}>
              <Form.Control
                name="name"
                id="name"
                value={values.name}
                type="text"
                minLength={0}
                maxLength={15}
                placeholder=""
                onChange={handleChange}
                style={{ width: 150 }}
                readOnly={isView}
                className={touched?.name && errors?.name && 'is-invalid'}
              />
              {touched?.name && errors?.name && (
                <TextError>
                  {errors.name}
                </TextError>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4}>
              Allocation Type <span className="form-label-required">*</span>
            </Form.Label>
            <Col lg={8} className='d-flex flex-column justify-content-center'>
              <div className='d-flex align-items-center'>
                <Col lg={5} className='p-0'>
                  <Form.Check
                    name='allocationType_shared'
                    id='allocationType_shared'
                    type='radio'
                    value='shared'
                    label="Shared"
                    onChange={() => setFieldValue('allocationType', 'shared')}
                    checked={values.allocationType === 'shared'}
                  />
                </Col>
                <Col lg={7} className='p-0'>
                  <Form.Check
                    name='allocationType_fixed'
                    id='allocationType_fixed'
                    type='radio'
                    value='fixed'
                    label="Fixed"
                    onChange={() => setFieldValue('allocationType', 'fixed')}
                    checked={values.allocationType === 'fixed'}
                  />
                </Col>
              </div>
              {touched?.allocationType && errors?.allocationType && (
                <TextError>
                  {errors.allocationType}
                </TextError>
              )}
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
            dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
          }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default withRouter(CostCenterModal)