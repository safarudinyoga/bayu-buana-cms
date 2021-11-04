import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function PropertyCategoryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Property Categories",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Property Categories",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Property Categories",
    baseRoute: "/master/property-categories/form",
    endpoint: "/master/property-categories",
    deleteEndpoint: "/master/batch-actions/delete/property-categories",
    activationEndpoint: "/master/batch-actions/activate/property-categories",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/property-categories",
    columns: [
      {
        title: "Property Category Code",
        data: "property_category_code",
      },
      {
        title: "Property Category Name",
        data: "property_category_name",
        render: renderColumn("property_category", "property_category_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Property Category Name",
        data: "property_category_translation.property_category_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
