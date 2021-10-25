import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function AircraftTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Aircraft",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Aircraft",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Aircraft",
    baseRoute: "/master/aircraft/form",
    endpoint: "/master/aircraft",
    deleteEndpoint: "/master/batch-actions/delete/aircraft",
    activationEndpoint: "/master/batch-actions/activate/aircraft",
    deactivationEndpoint: "/master/batch-actions/deactivate/aircraft",
    columns: [
      {
        title: "Aircraft Code",
        data: "aircraft_code",
      },
      {
        title: "Aircraft Name",
        data: "aircraft_name",
        render: renderColumn("aircraft", "aircraft_name")
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Aircraft Name",
        data: "aircraft_translation.aircraft_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
