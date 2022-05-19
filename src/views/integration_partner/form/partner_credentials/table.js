import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form/partner_credentials"
import { Card } from "react-bootstrap"

export default function IntegrationPartnerCredentialsTable() {
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Currencies",
    titleModal: "Partner Currencies",
    baseRoute: "/master/integration-partner-currencies/form",
    endpoint: "/master/integration-partner-currencies",
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-currencies",
    columns: [
      {
        title: "Currency",
        data: "currency_symbol",
      },
      {
        title: "Partner Currency Code",
        data: "currency_code",
      },
      {
        title: "Partner Currency Name",
        data: "currency_name",
      },
    ],
    emptyTable: "No Partner Currency found",
    recordName: ["currency.currency_name", "currency_code", "currency_name"],
    btnDownload: ".buttons-csv",
    module: "integration-partner-currencies"
  }
  return (
    <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Credentials</h3>
          <BBDataTable {...params} modalContent={Form} />
        </Card.Body>
      </Card>
  ) 
}
