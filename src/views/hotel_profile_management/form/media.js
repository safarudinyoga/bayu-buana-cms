import React from "react"
import { Card, Form, Button, Row, Col, Accordion } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"

const Media = (props) => {
  // Initialize form
  const initialForm = {}

  // Schema for yup
  const validationSchema = Yup.object().shape({})

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values)
          console.log(props)
          // setSubmitting(true)

          // try {
          //   let res = await api.post("master/persons", {
          //     birth_date: "2021-11-13T04:31:17.022Z",
          //     business_entity_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     citizen_country_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     gender_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     given_name: "string",
          //     marital_status_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     middle_name: "string",
          //     name_prefix_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     name_suffix: "string",
          //     name_title: "string",
          //     religion_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //     surname: "string",
          //     surname_prefix: "string",
          //   })
          //   console.log(res)
          //   resetForm()
          //   setSubmitting(false)
          // } catch (e) {}
        }}
      >
        {({
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <h3 className="card-heading">Media</h3>
                <div style={{ padding: "0 15px 15px" }}>
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        Click me!
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        Click me!
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE & NEXT
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push(props.backUrl)}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Media
