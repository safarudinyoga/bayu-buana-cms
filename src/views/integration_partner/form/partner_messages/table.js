import React, { useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import Form from "./form"

export default function IntegrationMessageTable() {
  const param = useParams()

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Message",
    titleModal: "Partner Message",
    baseRoute: "/master/integration-partner-messages/form",
    endpoint: `/master/integration-partners/${param.id}/messages`,
    deleteEndpoint: `/master/integration-partners/${param.id}/messages/`,
    columns: [
      {
        title: "Messages",
        data: "message_name",
      },
      {
        title: "Partner Messages Code",
        data: "message_id",
      },
      {
        title: "Partner Messages Name",
        data: "message_name",
      },
    ],
    emptyTable: "No Messages found",
    recordName: ["message_name", "message_id", "message_name"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Messages</h3>
          <BBDataTable {...params} modalContent={Form} />
          {/* test */}
        </Card.Body>
      </Card>
    </>
  )
}
