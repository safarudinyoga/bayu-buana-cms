import React, { useEffect } from 'react'
import { withRouter } from "react-router"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// compoenents & styles
import Select from "components/form/select"
import { components } from "react-select"
import useQuery from "lib/query"
import { useDispatch, useSelector } from "react-redux"
import { setModalTitle } from "redux/ui-store"

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
            onChange={(e) => console.log(e)}
            checked={props.isSelected}
          />
        </div>
      </components.Option>
    </div>
  );
};

const AssignTeamModal = ({ match }) => {
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, setFieldValue } = useFormik({
    initialValues: {
      team: ''
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  useEffect(async () => {
    let formId = showCreateModal.id || match?.params?.id
    let docTitle = "SELECT TRAVEL CONSULTANT TEAM"

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        // let { data } = await api.get(staticWarding.endpoint + "/" + formId)
        // setFormValues({
        //   ...data,
        //   from_currency_id: {modalContent
        //     value: data.from_currency.id,
        //     label: data.from_currency.currency_name,
        //   },
        //   to_currency_id: {
        //     value: data.to_currency.id,
        //     label: data.to_currency.currency_name,
        //   },
        // })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  return (
    <Form style={{ padding: '0 32px 25px' }}>
      <Row>
        <Col lg={12} style={{ padding: '0 0 25px' }}>
          <Form.Group as={Row} className='form-group'>
            <Form.Label column sm={4} className='mb-1'>
              Select Team
            </Form.Label>
            <Col md={3} lg={8}>
              <Select
                isClearable
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                name="team"
                value={values.team}
                placeholder="Please choose"
                options={[
                  {
                    label: 'Team EQTY (this is static)',
                    value: 'eqty'
                  },
                  {
                    label: 'Team NDC (this is static)',
                    value: 'ndc'
                  },
                  {
                    label: 'Team MNC Corp (this is static)',
                    value: 'mnc_corp'
                  },
                ]}
                onChange={(selected) => {
                  console.log({selected});
                  setFieldValue('team', selected)
                }}
                allowSelectAll
                onBlur={setFieldTouched}
                isDisabled={isView}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3 row justify-content-md-start justify-content-center" style={{ position: 'absolute', bottom: '30px' }}>
        <Button
          variant="primary"
          type="submit"
          // disabled={
          //   props.finishStep > 0 || props.employeeData?.id
          //     ? !isValid || isSubmitting
          //     : !dirty || isSubmitting
          // }
          style={{ marginRight: 15, padding: '0 24px' }}
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

export default withRouter(AssignTeamModal)