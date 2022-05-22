import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap"
import Api from "config/api"
import BBDataTable from "components/table/bb-data-table"
import TeamAssignmentForm from "./form/team-assignment-form"

const TravelAdvice = (props) => {
  let api = new Api()

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    modalTitle: "test",
    hideDetail: true,
    isHideDownloadLogo: true,
    title: "Team Assignment",
    titleModal: "Team Assignment",
    baseRoute: "/master/general-team-assignment/form",
    endpoint: "",
    deleteEndpoint: "",
    columns: [
      {
        title: "Team Name",
        data: "",
      },
      {
        title: "Team Leader",
        data: "",
      },
      {
        title: "Number of Members",
        data: "",
      },
    ],
    emptyTable: "No Payment Gateways found",
    recordName: ["channel_code", "channel_code"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Team Assignment</h3>
          <BBDataTable
            {...params}
            onReset={onReset}
            modalContent={TeamAssignmentForm}
            modalSize="xl"
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default TravelAdvice
