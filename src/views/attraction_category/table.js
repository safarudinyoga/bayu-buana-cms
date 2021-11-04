import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function AttractionCategoryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Attraction Categories",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Attraction Categories",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Attraction Category",
    baseRoute: "/master/attraction-category/form",
    endpoint: "/master/attraction-categories",
    deleteEndpoint: "/master/batch-actions/delete/attraction-categories",
    activationEndpoint: "/master/batch-actions/activate/attraction-categories",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/attraction-categories",
    columns: [
      {
        title: "Attraction Category Name",
        data: "attraction_category_name",
        render: renderColumn("attraction_category", "attraction_category_name"),
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
        title: "Translated Attraction Category Name",
        data: "attraction_category_translation.attraction_category_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
