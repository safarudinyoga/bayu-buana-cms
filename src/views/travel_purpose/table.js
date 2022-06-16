import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function TravelPurposeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Travel Purposes",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Travel Purposes",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Travel Purposes",
    titleModal: "Travel Purpose",
    baseRoute: "/master/travel-purposes/form",
    endpoint: "/master/travel-purposes",
    deleteEndpoint: "/master/batch-actions/delete/travel-purposes",
    activationEndpoint: "/master/batch-actions/activate/travel-purposes",
    deactivationEndpoint: "/master/batch-actions/deactivate/travel-purposes",
    columns: [
      {
        title: "Travel Purpose Code",
        data: "travel_purpose_code",
      },
      {
        title: "Travel Purpose Name",
        data: "travel_purpose_name",
        render: renderColumn("travel_purpose", "travel_purpose_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Travel Purpose Name",
        data: "travel_purpose_translation.travel_purpose_name",
        visible: false,
      },
    ],
    emptyTable: "No travel purposes found",
    recordName: ["travel_purpose_code", "travel_purpose_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Travel Purpose Name", recordName: "travel_purpose_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
