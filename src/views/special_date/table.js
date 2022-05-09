import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import { format } from "date-fns"

export default function SpecialDateTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Special Dates",
        breadcrumbs: [
          {
            text: "Setup & Configurations",
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
    responsiveTablet: true,
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
        data: "start_date",
        render: (val) => {
          if(val){
            return format(new Date(val), "d MMMM yyyy")
          }
        }
      },
      {
        title: "End Date",
        data: "end_date",
        render: (val) => {
          if(val){
            return format(new Date(val), "d MMMM yyyy")
          }
        }
      },
    ],
    emptyTable: "No Special Date found",
    recordName: ["special_date_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Special Date Name", recordName: "special_date_name"},
    ],
    btnDownload: ".buttons-csv",
    isOpenNewTab: false,
    isShowStatus: false,
    isShowYear: true,
    isCheckbox: false,
    hideDetail: true,
    showCalendar: true,
  }
  return <BBDataTable {...params} />
}
