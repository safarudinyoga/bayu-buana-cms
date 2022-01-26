import React, { useEffect } from 'react'
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function SetupFlightCommisionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Setup Flight Commision",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Setup Flight Commision",
          },
        ]
      })
    )
  }, [])

  let params = {
    title: "Setup Flight Commision",
    baseRoute: "/master/setup-flight-commision/form",
    endpoint: "/master/setup-flight-commisions",
    deleteEndpoint: "/master/batch-actions/delete/setup-flight-commisions",
    activationEndpoint: "/master/batch-actions/activate/setup-flight-commisions",
    deactivationEndpoint: "/master/batch-actions/deactivate/setup-flight-commisions",
    columns: [
      {
        title: "Airline",
        data: "airline_name"
      },
      {
        title: "Route(s)",
        data: "route"
      },
      {
        title: "Period of Issue",
        data: "period_issue"
      },
      {
        title: "Period of Departure",
        data: "period_departure"
      },
      {
        title: "Commission",
        data: "commision"
      }
    ],
    emptyTable: "No setup flight commisions found",
    btnDownload: ".buttons-csv",
  }


  return <BBDataTable {...params} />
}
