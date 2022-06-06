import BBDataTable from "components/table/bb-data-table"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
export default function CorporateRatingTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Corporate Ratings",
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            text: "Corporate Rating",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    hideDetail: true,
    title: "Corporate Rating",
    titleModal: "Corporate Rating",
    baseRoute: "/master/corporate-rating/form",
    endpoint: "/master/corporate-rating-type-levels",
    deleteEndpoint: "/master/batch-actions/delete/corporate-rating-type-level",
    activationEndpoint: "/master/batch-actions/activate/corporate-rating-type-level",
    deactivationEndpoint: "/master/batch-actions/deactivate/corporate-rating-type-level",
    columns: [
      {
        title: "Rating Code",
        data: "corporate_rating_type_level_code",
      },
      {
        title: "Rating Name",
        data: "corporate_rating_type_level_name", 
        render: renderColumn("corporate_rating_type_level", "corporate_rating_type_level_name"),       
      },
      {
        title: "Rating",
        data: "rating",
      },
      {
        title: "Translated Corporate Rating Type Level",
        data: "translation.corporate_rating_type_level_name",
        visible: false,
      },     
    ],
    emptyTable: "No Corporate Rating found",
    recordName: "corporate_rating_type_level_name",
    btnDownload: ".buttons-csv",
    showInfoDelete: true,
    infoDelete: [
      {title: "Rating Name", recordName: "corporate_rating_type_level_name"}, 
    ],
  })

  return <BBDataTable {...params}/>
}
