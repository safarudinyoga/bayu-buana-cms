import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function SpecialDateTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Special Dates",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Special Dates",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Special Dates",
    titleModal: "Special Date",
    baseRoute: "/master/special-date/form",
    endpoint: "/master/agent-special-dates",
    deleteEndpoint: "/master/batch-actions/delete/agent-special-dates",
    activationEndpoint: "/master/batch-actions/activate/agent-special-dates",
    deactivationEndpoint: "/master/batch-actions/deactivate/agent-special-dates",
    columns: [
      {
        title: "Name",
        data: "special_date_name",
      },
      {
        title: "Start Date",
        data: "special_date_start",
      },
      {
        title: "End Date",
        data: "special_date_end",
      },
      {
        title: "Translated Region Name",
        data: "region_translation.region_name",
        visible: false,
      },
    ],
    emptyTable: "No special dates found",
    recordName: ["special_date_name"],
  }
  return <BBDataTable {...params} />
}
