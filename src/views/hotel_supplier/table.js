import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function HotelSupplierTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Supplier",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Hotel Supplier",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Hotel Supplier",
    baseRoute: "/master/hotel-suppliers/form",
    endpoint: "/master/hotel-suppliers",
    deleteEndpoint: "/master/batch-actions/delete/hotel-suppliers",
    activationEndpoint: "/master/batch-actions/activate/hotel-suppliers",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotel-suppliers",
    columns: [
      {
        title: "Hotel Supplier Code",
        data: "hotel_supplier_code",
      },
      {
        title: "Hotel Supplier Name",
        data: "hotel_supplier_name",
        render: renderColumn("hotel_supplier", "hotel_supplier_name"),
      },
      {
        title: "Supplier Type",
        data: "supplier_type.supplier_type_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Hotel Supplier Name",
        data: "hotel_supplier_translation.hotel_supplier_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
