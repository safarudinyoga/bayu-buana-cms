import React, { useState } from "react"
import { Card, Form, Tabs, TabPane } from "react-bootstrap"
import SharedTabel from "./tabel/shared-tabel"

const StandardService = (props) => {
  const [key, setKey] = useState("shared")

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
            <h3 className="card-heading">Standard Service</h3>
            <div style={{ padding: "0 15px 40px 0" }}>
              <Tabs
                id="standard-service"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-4"
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <TabPane
                  className="m-3"
                  eventKey="shared"
                  title={
                    <div className="d-md-flex flex-row bd-highlight">
                      <span className="ml-md-2 tabs-text">Shared</span>
                    </div>
                  }
                >
                  <SharedTabel />
                </TabPane>
                <TabPane
                  className="m-3"
                  eventKey="dedicated-offsite"
                  title={
                    <div className="d-md-flex flex-row">
                      <span className="ml-md-2 tabs-text">
                        Dedicated Offsite
                      </span>
                    </div>
                  }
                >
                  <SharedTabel />
                </TabPane>
                <TabPane
                  className="m-3"
                  eventKey="Dedicated-onsite"
                  title={
                    <div className="d-md-flex flex-row">
                      <span className="ml-md-2 tabs-text">
                        Dedicated Onsite
                      </span>
                    </div>
                  }
                >
                  <SharedTabel />
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

export default StandardService
