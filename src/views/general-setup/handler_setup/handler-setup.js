import { Formik } from "formik"
import React, { useState, useEffect } from "react"
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Image,
  Tabs,
  TabPane,
} from "react-bootstrap"
import Api from "config/api"
import { ReactSVG } from "react-svg"
import EmailSender from "./tabel/tabel-email-sender"
import EmailReceipt from "./tabel/tabel-email-receipt"

const HandlerSetup = (props) => {
  let api = new Api()
  const [key, setKey] = useState("email")

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
            <h3 className="card-heading">Handler Setup</h3>
            <div style={{ padding: "0 15px 40px 0" }}>
              <Tabs
                id="handler-setup"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-4"
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <TabPane
                  className="m-3"
                  eventKey="email"
                  title={
                    <div className="d-md-flex flex-row bd-highlight">
                      <span className="ml-md-2 tabs-text">Email Sender</span>
                    </div>
                  }
                >
                  <EmailSender />
                </TabPane>
                <TabPane
                  className="m-3"
                  eventKey="email-recepient"
                  title={
                    <div className="d-md-flex flex-row">
                      <span className="ml-md-2 tabs-text">
                        Additional Email Recipient
                      </span>
                    </div>
                  }
                >
                  <EmailReceipt />
                </TabPane>
              </Tabs>
            </div>
          </Card.Body>
        </Card>
      </Form>

      {/* }} */}
      {/* </Formik> */}
    </>
  )
}

export default HandlerSetup
