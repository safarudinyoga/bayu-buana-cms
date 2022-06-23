import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, ListGroup, Button, Image } from "react-bootstrap"
import Api from "config/api"
import CardAddOrRemove from "components/card/add-or-remove-list"
import CancelButton from "components/button/cancel"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"

const OverCreditApproverAssignment = (props) => {
  const dispatch = useDispatch()
  const [listEmployee, setListEmployee] = useState([])
  const [listOverCredit, setListOverCredit] = useState([])
  const [formValues, setFormValues] = useState([])
  const endpoint = `/master/configurations/over-credit-approvers`
  let api = new Api()

  console.log("listEmp: ", listEmployee)

  const getListEmployee = async () => {
    try {
      let res = await api.get(
        `/master/employees?filters=[["status","=",1]]&sort=given_name`,
      )
      setListEmployee([
        ...res.data.items.map((item) => ({
          agent_id: item?.agent_employee.agent_id,
          employee_id: item.employee_id,
          given_name: item.given_name,
          middle_name: item.middle_name,
          surname: item.surname,
          office_name: item.office.office_name,
        })),
      ])
    } catch (e) {
      console.log(e)
    }
  }

  const getListOverCredit = async () => {
    try {
      let res = await api.get(`/master/configurations/over-credit-approvers`)
      setListOverCredit(
        res.data.items.map((item) => ({
          agent_id: item?.agent_employee?.agent_id,
          employee_id: item?.employee_id,
          given_name: item.person.given_name,
          middle_name: item.person.middle_name,
          surname: item.person.surname,
          office_name: item.office.office_name,
        })),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    getListOverCredit()
    getListEmployee()
    console.log("formValues: ", formValues)
  }, [])

  const onSubmit = async (values, a) => {
    console.log("submit: ", values)
    try {
      for (let i in values) {
        let oca = values[i]
        await api.putOrPost(endpoint, false, oca)
      }
      dispatch(
        setAlert({
          message: `Over Credit Approver has been successfully updated.`,
        }),
      )
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }

  const initialValues = {
    employee: [],
  }

  console.log("formValues: ", formValues)

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
      >
        {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <h3 className="card-heading">
                  Over Credit Approver Assignment
                </h3>
                <div style={{ padding: "0 15px 40px 0" }}>
                  <CardAddOrRemove
                    firstData={listOverCredit}
                    secondData={listEmployee}
                    firstCardTitle="list of over credit approvers"
                    secondCardTitle="employee name"
                    canRemoveIndex
                    setFormValues={setFormValues}
                  />
                </div>
              </Card.Body>
            </Card>
            <div
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
              }}
            >
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 15 }}
              >
                SAVE & NEXT
              </Button>
              <CancelButton />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default OverCreditApproverAssignment
