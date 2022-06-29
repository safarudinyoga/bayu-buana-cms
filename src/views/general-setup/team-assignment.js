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
    baseRoute: "",
    endpoint: "/master/configurations/team-assignments",
    deleteEndpoint: "",
    columns: [
      {
        title: "Team Name",
        data: "team_name",
      },
      {
        title: "Team Leader",
        data: "team_leader",
      },
      {
        title: "Number of Members",
        data: "number_of_members",
      },
    ],
    emptyTable: "No Teams found",
    recordName: ["team_name", "team_leader", "number_of_members"],
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
