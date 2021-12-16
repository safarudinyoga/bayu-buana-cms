import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function HotelBrandTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Brands",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Brands",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Hotel Brands",
    titleModal: "Hotel Brand",
    baseRoute: "/master/hotel-brands/form",
    endpoint: "/master/hotel-brands",
    deleteEndpoint: "/master/batch-actions/delete/hotel-brands",
    activationEndpoint: "/master/batch-actions/activate/hotel-brands",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotel-brands",
    columns: [
      {
        title: "Hotel Brand Code",
        data: "hotel_brand_code",
      },
      {
        title: "Hotel Brand Name",
        data: "hotel_brand_name",
        render: renderColumn("hotel_brand", "hotel_brand_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Hotel Brand Name",
        data: "hotel_brand_translation.hotel_brand_name",
        visible: false,
      },
    ],
    recordName: "hotel_brand_name",
  }
  return <BBDataTable {...params} />
}
