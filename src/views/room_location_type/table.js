import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function RoomLocationTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Room Location Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Room Location Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Room Location Types",
    titleModal: "Room Location Type",
    baseRoute: "/master/room-location-types/form",
    endpoint: "/master/room-location-types",
    deleteEndpoint: "/master/batch-actions/delete/room-location-types",
    activationEndpoint: "/master/batch-actions/activate/room-location-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/room-location-types",
    columns: [
      {
        title: "Room Location Type Code",
        data: "room_location_type_code",
      },
      {
        title: "Room Location Type Name",
        data: "room_location_type_name",
        render: renderColumn("room_location_type", "room_location_type_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Room Location Type Name",
        data: "room_location_type_translation.room_location_type_name",
        visible: false,
      },
    ],
    recordName: ["room_location_type_code", "room_location_type_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Room Location Type Code", recordName: "room_location_type_code"}, 
      {title: "Room Location Type Name", recordName: "room_location_type_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
