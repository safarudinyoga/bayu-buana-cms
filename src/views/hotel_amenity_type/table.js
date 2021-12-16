import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function HotelAmenityTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Amenity Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Amenity Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Hotel Amenity Type",
    baseRoute: "/master/hotel-amenity-types/form",
    endpoint: "/master/hotel-amenity-types",
    deleteEndpoint: "/master/batch-actions/delete/hotel-amenity-types",
    activationEndpoint: "/master/batch-actions/activate/hotel-amenity-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/hotel-amenity-types",
    columns: [
      {
        title: "Hotel Amenity Code",
        data: "hotel_amenity_type_code",
      },
      {
        title: "Hotel Amenity Name",
        data: "hotel_amenity_type_name",
        render: renderColumn("hotel_amenity_type", "hotel_amenity_type_name"),
      },
      {
        title: "Icon",
        data: "hotel_amenity_type_asset.multimedia_description.url",
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
        title: "Translated Hotel Amenity Name",
        data: "hotel_amenity_type_translation.hotel_amenity_type_name",
        visible: false,
      },
    ],
    recordName: ["hotel_amenity_type_code", "hotel_amenity_type_name"],
  }
  return <BBDataTable {...params} />
}
