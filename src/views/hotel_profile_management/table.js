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
        title: "Hotel Profile Management",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Profile Management",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Hotel Profile Management",
    baseRoute: "/master/hotel-profile-management/form",
    endpoint: "/master/hotel-profile-management",
    deleteEndpoint: "/master/batch-actions/delete/hotel-profile-management",
    activationEndpoint:
      "/master/batch-actions/activate/hotel-profile-management",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/hotel-profile-management",
    columns: [
      {
        title: "Hotel Name",
        data: "hotel_name",
      },
      {
        title: "Location",
        data: "location",
      },
      {
        title: "Chain/Brand",
        data: "chain_brand",
      },
    ],
    emptyTable: "No hotels found",
    recordName: "hotel_name",
  }
  return <BBDataTable {...params} />
}
