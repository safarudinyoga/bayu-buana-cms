// import { Formik } from 'formik';
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, ListGroup, Button, Image } from "react-bootstrap"
import Api from "config/api"
import CardAddOrRemove from "components/card/add-or-remove-list"
import CancelButton from "components/button/cancel"

const dummy1 = [
  {
    name: "Tiffany Young",
    category: "BCD",
  },
  {
    name: "Dhani Doel",
    category: "BCD",
  },
  {
    name: "Jhon Bill",
    category: "NCD",
  },
]

const dummy2 = [
  {
    name: "Tamara Ling",
    category: "NCD",
  },
  {
    name: "Margot Roe",
    category: "NCD",
  },
  {
    name: "Betty Jhon",
    category: "NCD",
  },
  {
    name: "Miando Nael",
    category: "BCD",
  },
  {
    name: "Bel Nuts",
    category: "BCD",
  },
  {
    name: "Tamara Ling",
    category: "NCD",
  },
]
const listEmployee = []
const OverCreditApproverAssignment = (props) => {
  let api = new Api()

  const getEmployee = async () => {
    try {
      let res = await api.get(
        `/master/employees?filters=[["status","=",1]]&sort=given_name`,
      )
      
      if (res.data.items.length > 0) {
        res.data.items.forEach((data) => {
          listEmployee.push({
            name: data.given_name + " " + data.middle_name,
            category: data.job_title.job_title_code,
          })
        })
      }
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
            <h3 className="card-heading">Over Credit Approver Assignment</h3>
            <div style={{ padding: "0 15px 40px 0" }}>
              <CardAddOrRemove
                firstData={dummy1}
                secondData={listEmployee}
                firstCardTitle="list of over credit approvers"
                secondCardTitle="employee name"
                canRemoveIndex
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

export default OverCreditApproverAssignment
