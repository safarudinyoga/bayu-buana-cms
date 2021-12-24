import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function RoomAmenityCategoryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Room Amenity Categories",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Room Amenity Categories",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Room Amenity Categories",
    baseRoute: "/master/room-amenity-categories/form",
    endpoint: "/master/room-amenity-categories",
    deleteEndpoint: "/master/batch-actions/delete/room-amenity-categories",
    activationEndpoint: "/master/batch-actions/activate/room-amenity-categories",
    deactivationEndpoint: "/master/batch-actions/deactivate/room-amenity-categories",
    columns: [
      {
        title: "Room Amenity Category Name",
        data: "room_amenity_category_name",
        render: renderColumn("amenity_category", "room_amenity_category_name"),
      },
      {
        title: "Icon",
        data: "room_amenity_category_asset.multimedia_description.url",
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
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Room Amenity Name",
        data: "room_amenity_category_translation.room_amenity_type_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
