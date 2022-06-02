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
import CancelButton from "components/button/cancel"

const HandlerSetup = (props) => {
  let api = new Api()
  const [key, setKey] = useState("email")
  const initialValues = {  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
        return props.handleSelectTab("identity-rule")
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
      }) => {
      return (
      <Form onSubmit={handleSubmit}>
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
              <CancelButton onClick={() =>{ props.handleSelectTab("general-information")}}/>
            </div>
      </Form>
        )
      }}
      </Formik>
    </>
  )
}

export default HandlerSetup
