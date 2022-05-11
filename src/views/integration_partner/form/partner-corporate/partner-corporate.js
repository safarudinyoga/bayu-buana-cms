import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"
import { Card } from "react-bootstrap"

export default function PartnerCorporate() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Partner Corporatessss",
        breadcrumbs: [
          {
            text: "Partner Corporatessss",
          },
        ],
      }),
    )
  }, [])


  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Corporatessss",
    titleModal: "Partner Corporatessss",
    baseRoute: "/master/integration-partner/form/partner-corporate/form",
    // routeHistory: "/master/exchange-rate/history",
    endpoint: "/master/currency-conversions",
    deleteEndpoint: "/master/batch-actions/delete/currency-conversions",
    // activationEndpoint: "/master/batch-actions/activate/currency-conversions",
    // deactivationEndpoint: "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "Corporate",
        data: "from_currency.currency_code",
      },
      {
        title: "Partner Corporatessss Code",
        data: "to_currency.currency_code",
      },
      {
        title: "Partner Corporatessss Name",
        data: "from_currency.currency_code",
      },
    ],
    emptyTable: "No Partner Corporatessss found",
    recordName: ["from_currency.currency_code", "to_currency.currency_code"],
    btnDownload: ".buttons-csv",
    module: "exchange-rate"
  }
  return (
    <Card style={{marginBottom: 0}}>
        <Card.Body className="px-1 px-md-4">
          <h3 className="card-heading">Partner Corporatessss</h3>
          <BBDataTable {...params} />
        </Card.Body>
      </Card>
  ) 
}
