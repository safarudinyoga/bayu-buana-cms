import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"

import "./subscriptions.css"

const options = {
  position: "bottom-right",
}

const Subscriptions = (props) => {
  let api = new Api()
  const [openSnackbar] = useSnackbar(options)

  const [initialForm, setInitialForm] = useState({
    dealSubscription: false,
    newsletterSubscription: false,
  })

  useEffect(async () => {
    try {
      let res = await api.get("/user/profile")
      let data = res.data;
      console.log(data);
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

        try {
          let res = await api.put("user/profile", formatted)
          openSnackbar(
            `Subscriptions has been successfully updated.`
          )
        } catch(e) {}
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
                    <OverlayTrigger
                      key={"offers"}
                      placement="top"
                      overlay={
                        <Tooltip id="offers-top">
                          {
                            values.dealSubscription ? "Deactivate" : "Activate"
                          }
                        </Tooltip>
                      }
                    > 
                      {({ ref, ...triggerHandler }) => (
                        <Form.Switch
                          {...triggerHandler}
                          ref={ref}
                          id="deals-subscription"
                          name="deals-subscription"
                          checked={values.dealSubscription}
                          className="subscription-switch"
                          onChange={(e) => 
                            setFieldValue("dealSubscription", !values.dealSubscription)
                          }
                          
                        />
                      )}
                      
                    </OverlayTrigger>
                  
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                  <Form.Label column sm={6}>
                    Receive Newsletters
                  </Form.Label>
                  <Col sm={6}>
                    <OverlayTrigger
                      key={"newsletter"}
                      placement="top"
                      overlay={
                        <Tooltip id="newsletter-top">
                          {
                            values.newsletterSubscription ? "Deactivate" : "Activate"
                          }
                        </Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <Form.Switch 
                          {...triggerHandler}
                          ref={ref}
                          id="newsletter-subscription"
                          name="newsletter-subscription"
                          checked={values.newsletterSubscription}
                          className="subscription-switch"
                          onChange={(e) => 
                            setFieldValue("newsletterSubscription", !values.newsletterSubscription)
                          }
                        />
                      )}
                    </OverlayTrigger>
                  
                  </Col>
                </Form.Group>
              </div>
              <div style={{ marginBottom: 30, marginTop: 30 }} className="mobile-button">
              <Button
                variant="primary"
                type="submit"
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
              {
                props.isMobile ? (
                  <div className="mb-5 ml-1 row justify-content-md-start justify-content-center">
                    <Button
                      variant="primary"
                      type="submit"
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
                ) : ""
              }
            </Card>
            {
              props.isMobile ? "" : (
                <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
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
              )
            }
          </Form>
        )
      }}
    </Formik>
  );
}

export default Subscriptions;
