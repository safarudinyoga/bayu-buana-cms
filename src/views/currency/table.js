import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function CurrencyTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Currencies",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Currencies",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Currencies",
    baseRoute: "/master/currencies/form",
    endpoint: "/master/currencies",
    deleteEndpoint: "/master/batch-actions/delete/currencies",
    activationEndpoint: "/master/batch-actions/activate/currencies",
    deactivationEndpoint: "/master/batch-actions/deactivate/currencies",
    columns: [
      {
        title: "Currency Code",
        data: "currency_code",
      },
      {
        title: "Currency Name",
        data: "currency_name",
        render: renderColumn("currency", "currency_name"),
      },
      {
        title: "Currency Symbol",
        data: "currency_symbol",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Currency Name",
        data: "currency_translation.currency_name",
        visible: false,
      },
    ],
    recordName: "currency_name",
  }
  return <BBDataTable {...params} />
}
