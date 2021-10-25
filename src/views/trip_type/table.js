import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function TripTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Trip Type",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Trip Type",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Trip Type",
    baseRoute: "/master/trip-types/form",
    endpoint: "/master/trip-types",
    deleteEndpoint: "/master/batch-actions/delete/trip-types",
    activationEndpoint: "/master/batch-actions/activate/trip-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/trip-types",
    columns: [
      {
        title: "Trip Type Code",
        data: "trip_type_code",
      },
      {
        title: "Trip Type Name",
        data: "trip_type_name",
        render: renderColumn("trip_type", "trip_type_name"),
      },
      {
        title: "Is Default",
        data: "is_default",
        render: (a) => a ? "Yes" : "",
        searchable: false,
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Trip Type Name",
        data: "trip_type_translation.trip_type_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
