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
            link: "/master/rating-types",
            text: "Rating Types",
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
    endpoint: `/master/rating-types/${routeParams.id_rating_type}/levels`,
    deleteEndpoint: "/master/batch-actions/delete/rating-type-levels",
    activationEndpoint: "/master/batch-actions/activate/rating-type-levels",
    deactivationEndpoint: "/master/batch-actions/deactivate/rating-type-levels",
    columns: [
      {
        title: "Rating Type Level Code",
        data: "rating_type_level_code",
      },
      {
        title: "Rating Type Level Name",
        data: "rating_type_level_name",
        render: renderColumn("rating_type_level", "rating_type_level_name"),
      },
      {
        title: "Rating",
        data: "rating",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Rating Types Name",
        data: "rating_type_level_translation.rating_type_level_name",
        visible: false,
      },
    ],
    emptyTable: "No rating types found",
    recordName: ["rating_type_level_code", "rating_type_level_name"],
  }
  return <BBDataTable {...params} />
}
