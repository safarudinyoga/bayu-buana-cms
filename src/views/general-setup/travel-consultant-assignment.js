import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import Api from "config/api"
import CardAddOrRemove from "components/card/add-or-remove-list"
import CancelButton from "components/button/cancel"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"

function TravelConsultantAssignment(props) {
  const dispatch = useDispatch()
  const [listEmployee, setListEmployee] = useState([])
  const [listTravelConsultant, setListTravelConsultant] = useState([])
  const [formValues, setFormValues] = useState(null)
  let api = new Api()
  const endpoint = `/master/configurations/travel-consultants`

  const getEmployee = async () => {
    try {
      let res = await api.get(
        `/master/employees?filters=[["status","=",1]]&sort=given_name`,
      )
      setListEmployee(res.data.items)
    } catch (e) {
      console.log(e)
    }
  }

  const getLisTravelConsultant = async () => {
    try {
      let res = await api.get(`/master/configurations/travel-consultants`)
      setListTravelConsultant(res.data.items)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    getLisTravelConsultant()
    getEmployee()
  }, [])

  const onSubmit = async (values, a) => {
    console.log("submit: ", values)
    try {
      for (let i in values) {
        let tc = values[i]
        await api.putOrPost(endpoint, false, tc)
      }
      dispatch(
        setAlert({
          message: `Travel Consultant has been successfully updated.`,
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
                <h3 className="card-heading">Travel Consultant Assignment</h3>
                <div style={{ padding: "0 15px 40px 0" }}>
                  <CardAddOrRemove
                    firstData={[]}
                    secondData={listEmployee}
                    firstCardTitle="list of travel consultant"
                    secondCardTitle="employee name"
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
export default TravelConsultantAssignment
