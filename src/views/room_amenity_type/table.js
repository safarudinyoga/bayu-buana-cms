import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function RoomAmenityTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Room Amenity Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Room Amenity Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Room Amenity Types",
    titleModal: "Room Amenity Types",
    baseRoute: "/master/room-amenity-types/form",
    endpoint: "/master/room-amenity-types",
    deleteEndpoint: "/master/batch-actions/delete/room-amenity-types",
    activationEndpoint: "/master/batch-actions/activate/room-amenity-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/room-amenity-types",
    columns: [
      {
        title: "Room Amenity Code",
        data: "room_amenity_code",
      },
      {
        title: "Room Amenity Name",
        data: "room_amenity_name",
        render: renderColumn("airline", "airline_name"),
      },
      {
        title: "Icon",
        data: "room_amenity_type_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          if (type === 'myExport') {
            return val
          }
          if (val) {
            return '<img src="' + val + '" class="table-image"/>'
          }

          return ""
        },
      },
      {
        title: "Room Amenity Category",
        data: "room_amenity_category",
        render: renderColumn("room_amenity_category", "room_amenity_category_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Room Amenity Name",
        data: "room_amenity_type_translation.room_amenity_type_name",
        visible: false,
      },
    ],
    emptyTable: "No room amenity types found",
    recordName: "room_amenity_name",
  }
  return <BBDataTable {...params} />
}
