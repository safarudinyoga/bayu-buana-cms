import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import Api from "config/api"

const Subscriptions = (props) => {
  let api = new Api()

  const [initialForm, setInitialForm] = useState({
    dealSubscription: false,
    newsletterSubscription: false,
  })

  useEffect(async () => {
    try {
      let res = await api.get("/user/profile")
      let data = res.data;
      setInitialForm({
        ...initialForm,
        dealSubscription: data.user_setting.receive_travel_deals,
        newsletterSubscription: data.user_setting.receive_other_information
      })
    } catch(e) {}
  }, [])

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)

        let formatted = {
          user_setting: {
            receive_travel_deals: values.dealSubscription,
            receive_other_information: values.newsletterSubscription
          }
        }

        let res = await api.put("user/profile", formatted)
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
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
              <h3 className="card-heading">Subscriptions</h3>
              <div style={{ padding: "0 15px 15px" }}>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={6}>
                    Receive Travel Deals and Special Offers
                  </Form.Label>
                  <Col sm={6}>
                  <Form.Check 
                    type="switch"
                    id="deals-subscription"
                    name="deals-subscription"
                    checked={values.dealSubscription}
                    onChange={(e) => 
                      setFieldValue("dealSubscription", !values.dealSubscription)
                    }
                  />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={6}>
                    Receive Newsletters
                  </Form.Label>
                  <Col sm={6}>
                  <Form.Check 
                    type="switch"
                    id="newsletter-subscription"
                    name="newsletter-subscription"
                    checked={values.newsletterSubscription}
                    onChange={(e) => 
                      setFieldValue("newsletterSubscription", !values.newsletterSubscription)
                    }
                  />
                  </Col>
                </Form.Group>
              </div>
              <div style={{ marginBottom: 30, marginTop: 30 }} className="mobile-button">
              <Button
                variant="primary"
                type="submit"
                disabled={!dirty || !isValid}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push("/")}
              >
                CANCEL
              </Button>
            </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }} className="user-profile-button">
              <Button
                variant="primary"
                type="submit"
                disabled={!dirty || !isValid}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push("/")}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
}

export default Subscriptions;
