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
    btnDownload: ".buttons-csv",
    columns: [
      {
        title: "Message",
        data: "event.event_name",
      },
      {
        title: "Partner Message Code",
        data: "event_code",
      },
      {
        title: "Partner Message Name",
        data: "event_name",
      },
    ],
    emptyTable: "No Messages found",
    recordName: ["event_name", "event_code"],
    searchText: "Search",
    customSort: ["event_name"],
    showModalHeader: false,
    isPartner: true,
    module: "partner-message",
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
