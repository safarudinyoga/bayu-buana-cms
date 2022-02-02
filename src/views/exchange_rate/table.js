import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function ExchageRateTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Exchage Rate",
        breadcrumbs: [
          {
            text: "Exchange Rate",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Aircrafts",
    titleModal: "Aircraft",
    baseRoute: "/master/aircrafts/form",
    endpoint: "/master/aircraft",
    deleteEndpoint: "/master/batch-actions/delete/aircrafts",
    activationEndpoint: "/master/batch-actions/activate/aircrafts",
    deactivationEndpoint: "/master/batch-actions/deactivate/aircrafts",
    columns: [
      {
        title: "From Currency",
        data: "aircraft_code",
      },
      {
        title: "To Currency",
        data: "aircraft_name",
        // render: renderColumn("aircraft", "aircraft_name"),
      },
      {
        title: "Multiply Rate",
        data: "aircraft_name",
        // render: renderColumn("aircraft", "aircraft_name"),
      },
      {
        title: "Translated Aircraft Name",
        data: "aircraft_translation.aircraft_name",
        visible: false,
      },
    ],
    emptyTable: "No exchange rate found",
    recordName: ["aircraft_code", "aircraft_name"],
  }
  return <BBDataTable {...params} />
}
