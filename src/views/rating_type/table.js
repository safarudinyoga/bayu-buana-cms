import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function RatingTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Rating Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Rating Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Rating Types",
    titleModal: "Rating Type",
    baseRoute: "/master/rating-types/form",
    endpoint: "/master/rating-types",
    deleteEndpoint: "/master/batch-actions/delete/rating-types",
    activationEndpoint: "/master/batch-actions/activate/rating-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/rating-types",
    columns: [
      {
        title: "Rating Type Code",
        data: "rating_type_code",
      },
      {
        title: "Rating Type Name",
        data: "rating_type_name",
        render: renderColumn("rating_type", "rating_type_name"),
      },
      {
        title: "Rating Symbol",
        data: "rating_symbol",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Rating Types Name",
        data: "rating_type_translation.rating_type_name",
        visible: false,
      },
    ],
    emptyTable: "No rating types found",
    recordName: ["rating_type_code", "rating_type_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Rating Type Code", recordName: "rating_type_code"}, 
      {title: "Rating Type Name", recordName: "rating_type_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
