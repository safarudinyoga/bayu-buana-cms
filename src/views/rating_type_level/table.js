import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import { useParams } from "react-router-dom"

export default function RatingTypeLevelTable(props) {
  let routeParams = useParams()
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Rating Type Levels",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Rating Types",
          },
          {
            text: routeParams.id_rating_type,
          },
          {
            text: "Rating Type Levels",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Rating Type Levels",
    titleModal: "Rating Type Level",
    baseRoute: `/master/rating-types/${routeParams.id_rating_type}/rating-type-levels/form`,
    endpoint: "/master/rating-type-levels",
    deleteEndpoint: "/master/batch-actions/delete/rating-type-levels",
    activationEndpoint: "/master/batch-actions/activate/rating-type-levels",
    deactivationEndpoint: "/master/batch-actions/deactivate/rating-type-levels",
    columns: [
      {
        title: "Rating Types Code",
        data: "rating_type_code",
      },
      {
        title: "Rating Types Name",
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
  }
  return <BBDataTable {...params} />
}
