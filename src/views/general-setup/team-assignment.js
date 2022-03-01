import { Formik } from 'formik';
import React from 'react';
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import Api from "config/api"

const TeamAssignment = (props) => {
  let api = new Api()

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
                <h3 className="card-heading">Team Assignment</h3>
                <div style={{ padding: "0 15px 40px 0" }}>
                
                </div>
              </Card.Body>
            </Card>
          </Form>
        
      {/* }} */}
    {/* </Formik> */}
    </>
  )
}

export default TeamAssignment;
