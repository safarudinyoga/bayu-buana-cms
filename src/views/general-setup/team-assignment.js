import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import Api from "config/api"
import BBDataTable from "components/table/bb-data-table"

const TeamAssignment = (props) => {
  let api = new Api()

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Payment Gateway",
    titleModal: "Partner Payment Gateway",
    baseRoute: "/master/integration-payment-gateway/form",
    endpoint: `/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/payment-gateways`,
    deleteEndpoint: `/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/payment-gateways`,
    columns: [
      {
        title: "Team Name",
        data: "channel_code",
      },
      {
        title: "Team Leader",
        data: "channel_code",
      },
      {
        title: "Number of Members",
        data: "channel_code",
      },
    ],
    emptyTable: "No Payment Gateways found",
    recordName: ["channel_code", "channel_code"],
  })

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
              <BBDataTable {...params} onReset={onReset} modalContent={Form} />
            </div>
          </Card.Body>
        </Card>
      </Form>

      {/* }} */}
      {/* </Formik> */}
    </>
  )
}

export default TeamAssignment
