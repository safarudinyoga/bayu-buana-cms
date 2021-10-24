import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function RoomViewTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Room View Type",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Room View Type",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Room View Type",
    baseRoute: "/master/room-view-types/form",
    endpoint: "/master/room-view-types",
    deleteEndpoint: "/master/batch-actions/delete/room-view-types",
    activationEndpoint: "/master/batch-actions/activate/room-view-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/room-view-types",
    columns: [
      {
        title: "Room View Type Code",
        data: "room_view_type_code",
      },
      {
        title: "Room View Type Name",
        data: "room_view_type_name",
        render: renderColumn("room_view_type", "room_view_type_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Room View Type Name",
        data: "room_view_type_translation.room_view_type_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
