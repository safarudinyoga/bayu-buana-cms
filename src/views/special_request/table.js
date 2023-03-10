import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function SpecialRequestTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Special Requests",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Special Requests",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Special Requests",
    titleModal: "Special Request",
    baseRoute: "/master/special-requests/form",
    endpoint: "/master/special-requests",
    deleteEndpoint: "/master/batch-actions/delete/special-requests",
    activationEndpoint: "/master/batch-actions/activate/special-requests",
    deactivationEndpoint: "/master/batch-actions/deactivate/special-requests",
    columns: [
      {
        title: "Special Request Code",
        data: "special_request_code",
      },
      {
        title: "Special Request Name",
        data: "special_request_name",
        render: renderColumn("special_request", "special_request_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Special Request Name",
        data: "special_request_translation.special_request_name",
        visible: false,
      },
    ],
    emptyTable: "No special requests found",
    recordName: ["special_request_code", "special_request_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Special Request Code", recordName: "special_request_code"}, 
      {title: "Special Request Name", recordName: "special_request_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
