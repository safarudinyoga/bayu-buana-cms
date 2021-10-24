import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function FlightTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Flight Type",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Flight Type",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Flight Type",
    baseRoute: "/master/flight-types/form",
    endpoint: "/master/flight-types",
    deleteEndpoint: "/master/batch-actions/delete/flight-types",
    activationEndpoint: "/master/batch-actions/activate/flight-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/flight-types",
    columns: [
      {
        title: "Flight Type Code",
        data: "flight_type_code",
      },
      {
        title: "Flight Type Name",
        data: "flight_type_name",
        render: renderColumn("flight_type", "flight_type_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Flight Type Name",
        data: "flight_type_translation.flight_type_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
