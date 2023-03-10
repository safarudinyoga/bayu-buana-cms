import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"
import ThousandSeparator from '../../lib/thousand-separator';

export default function ExchageRateTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Exchange Rate",
        breadcrumbs: [
          {
            text: "Exchange Rate",
          },
        ],
      }),
    )
  }, [])


  // const Form = () => {
  //   return <h1>Halo</h1>
  // }

  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    showHistory: true,
    title: "Exchange Rates",
    titleModal: "Exchange Rate",
    baseRoute: "/master/exchange-rate/form",
    routeHistory: "/master/exchange-rate/history",
    endpoint: "/master/currency-conversions",
    deleteEndpoint: "/master/batch-actions/delete/currency-conversions",
    activationEndpoint: "/master/batch-actions/activate/currency-conversions",
    deactivationEndpoint: "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "From Currency",
        data: "from_currency.currency_code",
      },
      {
        title: "To Currency",
        data: "to_currency.currency_code",
      },
      {
        title: "Multiply Rate",
        data: "multiply_rate",
        render: (val) => (
          ThousandSeparator(val)
        )
      },
    ],
    emptyTable: "No exchange rate found",
    recordName: ["from_currency.currency_code", "to_currency.currency_code"],
    btnDownload: ".buttons-csv",
    module: "exchange-rate"
  }
  return <BBDataTable {...params} modalContent={Form} />
}
