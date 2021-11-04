import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function LocationCategoryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Location Categories",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Location Categories",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Location Categories",
    baseRoute: "/master/location-categories/form",
    endpoint: "/master/location-categories",
    deleteEndpoint: "/master/batch-actions/delete/location-categories",
    activationEndpoint: "/master/batch-actions/activate/location-categories",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/location-categories",
    columns: [
      {
        title: "Location Category Code",
        data: "location_category_code",
      },
      {
        title: "Location Category Name",
        data: "location_category_name",
        render: renderColumn("location_category", "location_category_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Location Category Name",
        data: "location_category_translation.location_category_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
