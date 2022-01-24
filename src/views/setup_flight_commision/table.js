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
    baseRoute: "/master/employee/form",
    endpoint: "/master/employees",
    deleteEndpoint: "/master/batch-actions/delete/employees",
    activationEndpoint: "/master/batch-actions/activate/employees",
    deactivationEndpoint: "/master/batch-actions/deactivate/employees",
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
