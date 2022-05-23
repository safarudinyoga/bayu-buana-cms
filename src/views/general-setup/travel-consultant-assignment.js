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

const TravelConsultantAssignment = (props) => {
  const [listEmployee, SetListEmployee] = useState([])
  let api = new Api()

  const getEmployee = async () => {
    try {
      let res = await api.get(
        `/master/employees?filters=[["status","=",1]]&sort=given_name`,
      )
      SetListEmployee(res.data.items)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    getEmployee()
  }, [])

  return (
    <>
      {/* <Formik
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)

        let res = await api.put("user/profile", formatted)

        return props.handleSelectTab("subscriptions")
      }}
    > */}
      {/* {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return ( */}
      <Form onSubmit="">
        <Card>
          <Card.Body>
            <h3 className="card-heading">Travel Consultant Assignment</h3>
            <div style={{ padding: "0 15px 40px 0" }}>
              <CardAddOrRemove
                firstData={dummy1}
                secondData={listEmployee}
                firstCardTitle="list of travel consultant"
                secondCardTitle="employee name"
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
          <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
            SAVE & NEXT
          </Button>
          <CancelButton />
        </div>
      </Form>

      {/* }} */}
      {/* </Formik> */}
    </>
  )
}

export default TravelConsultantAssignment
