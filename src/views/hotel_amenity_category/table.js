import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function HotelAmenityCategoryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Amenity Category",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Amenity Category",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Hotel Amenity Category",
    baseRoute: "/master/hotel-amenity-categories/form",
    endpoint: "/master/hotel-amenity-categories",
    deleteEndpoint: "/master/batch-actions/delete/hotel-amenity-categories",
    activationEndpoint:
      "/master/batch-actions/activate/hotel-amenity-categories",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/hotel-amenity-categories",
    columns: [
      {
        title: "Hotel Amenity Category Name",
        data: "hotel_amenity_category_name",
        render: renderColumn(
          "hotel_amenity_category",
          "hotel_amenity_category_name",
        ),
      },
      {
        title: "Icon",
        data: "attraction_category_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val) => {
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
        title: "Translated Hotel Amenity Category Name",
        data: "hotel_amenity_category_translation.hotel_amenity_category_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
