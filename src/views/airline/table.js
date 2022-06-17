import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function AirlineTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Airlines",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Airlines",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Airlines",
    titleModal: "Airline",
    baseRoute: "/master/airlines/form",
    endpoint: "/master/airlines",
    deleteEndpoint: "/master/batch-actions/delete/airlines",
    activationEndpoint: "/master/batch-actions/activate/airlines",
    deactivationEndpoint: "/master/batch-actions/deactivate/airlines",
    columns: [
      {
        title: "Airline Code",
        data: "airline_code",
      },
      {
        title: "Airline Name",
        data: "airline_name",
        render: renderColumn("airline", "airline_name"),
      },
      {
        title: "Logo",
        data: "airline_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          if (type === "myExport") {
            return val
          }
          if (val) {
            return '<img src="' + val + '" class="table-image"/>'
          }

          return ""
        },
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Airline Name",
        data: "airline_translation.airline_name",
        visible: false,
      },
    ],
    emptyTable: "No airlines found",
    recordName: ["airline_code", "airline_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Airline Name", recordName: "airline_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
