import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import Api from "config/api"
import CardAddOrRemove from "components/card/add-or-remove-list"
import CancelButton from "components/button/cancel"

const dummy1 = [
  {
    given_name: "Tiffany Young",
    category: "BCD",
    checked: false,
  },
  {
    given_name: "Dhani Doel",
    category: "BCD",
    checked: false,
  },
  {
    given_name: "Jhon Bill",
    category: "NCD",
    checked: false,
  },
]

const dummy2 = [
  {
    given_name: "Tamara Ling",
    category: "NCD",
  },
  {
    given_name: "Margot Roe",
    category: "NCD",
  },
  {
    given_name: "Betty Jhon",
    category: "NCD",
  },
  {
    given_name: "Miando Nael",
    category: "BCD",
  },
  {
    given_name: "Bel Nuts",
    category: "BCD",
  },
  {
    given_name: "Tamara Ling",
    category: "NCD",
  },
]


function TravelConsultantAssignment(props) {
  const [listEmployee, setListEmployee] = useState([])
  const [listTravelConsultant, setListTravelConsultant] = useState([])
  const [formValues, setFormValues] = useState(null)
  let api = new Api()

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
                    firstData={listEmployee}
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
