import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function IntegrationPartnerCurrenciesTable() {
  const param = useParams()
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Currencies",
    titleModal: "Partner Currencies",
    baseRoute: "/master/integration-partner-currencies/form",
    endpoint: `/master/integration-partners/${param.id}/currencies`,
    deleteEndpoint: `/master/integration-partners/${param.id}/currencies`,
    btnDownload: ".buttons-csv",
    columns: [
      {
        title: "Currency",
        data: "currency.currency_name",
      },
      {
        title: "Payment Currency Code",
        data: "currency_code",
      },
      {
        title: "Payment Currency Name",
        data: "currency_name",
      },
    ],
    emptyTable: "No Partner Currency found",
    recordName: ["currency_code", "currency_name"],
    btnDownload: ".buttons-csv",
    module: "integration-partner-currencies",
    showInfoDelete: true,
    infoDelete: [
      {title: "Partner Currency Name", recordName: "currency_name"}, 
    ],
    searchText: "Search",
    isOpenNewTab: false,
  }
  return (
    <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Currencies</h3>
          <BBDataTable {...params} modalContent={Form} />
        </Card.Body>
      </Card>
  ) 
}
