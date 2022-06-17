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
        title: "Aircrafts",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Aircrafts",
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
        title: "Aircraft Code",
        data: "aircraft_code",
      },
      {
        title: "Aircraft Name",
        data: "aircraft_name",
        render: renderColumn("aircraft", "aircraft_name"),
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
    emptyTable: "No aircrafts found",
    recordName: ["aircraft_code", "aircraft_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Aircraft COde", recordName: "aircraft_code"}, 
      {title: "Aircraft Name", recordName: "aircraft_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
