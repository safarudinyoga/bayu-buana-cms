import BBDataTable from "components/table/bb-data-table"
import React from 'react'
import Form from "./form"
import { Card } from "react-bootstrap"

export default function IntegrationPartnerCorporateTable() {
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Corporates",
    titleModal: "Partner Corporates",
    baseRoute: "/master/integration-partner-corporates/form",
    endpoint: "/master/integration-partner-corporates",
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-corporates",
    columns: [
      {
        title: "Corporate",
        data: "corporate.corporate_name",
      },
      {
        title: "Partner Corporate Code",
        data: "corporate_code",
      }
    ],
    emptyTable: "No Partner Corporate found",
    recordName: ["corporate_code", "corporate.corporate_name"],
    btnDownload: ".buttons-csv",
    module: "integration-partner-corporate",
    searchText: "Search"
  }

  return (
    <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Corporates</h3>
          <BBDataTable {...params} modalContent={Form} />
        </Card.Body>
      </Card>
  )
}