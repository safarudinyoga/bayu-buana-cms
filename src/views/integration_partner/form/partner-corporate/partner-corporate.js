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
        title: "Partner Corporate",
        breadcrumbs: [
          {
            text: "Partner Corporate",
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
    title: "Partner Corporate",
    titleModal: "Partner Corporate",
    baseRoute: "/master/exchange-rate/form",
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
        title: "Partner Corporate Code",
        data: "to_currency.currency_code",
      },
      {
        title: "Partner Corporate Name",
        data: "from_currency.currency_code",
      },
    ],
    emptyTable: "No Partner Corporate found",
    recordName: ["from_currency.currency_code", "to_currency.currency_code"],
    btnDownload: ".buttons-csv",
    module: "exchange-rate"
  }
  return (
    <Card style={{marginBottom: 0}}>
        <Card.Body className="px-1 px-md-4">
          <h3 className="card-heading">Partner Corporate</h3>
          <BBDataTable {...params} modalContent={Form} />
        </Card.Body>
      </Card>
  ) 
}
