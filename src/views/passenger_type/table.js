import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function PassengerTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Passenger Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Passenger Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Passenger Types",
    titleModal: "Passenger Type",
    baseRoute: "/master/passenger-types/form",
    endpoint: "/master/passenger-types",
    deleteEndpoint: "/master/batch-actions/delete/passenger-types",
    activationEndpoint: "/master/batch-actions/activate/passenger-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/passenger-types",
    columns: [
      {
        title: "Passenger Type Code",
        data: "passenger_type_code",
      },
      {
        title: "Passenger Type Name",
        data: "passenger_type_name",
        render: renderColumn("passenger_type", "passenger_type_name"),
      },
      {
        title: "Alpha 3 Code",
        data: "passenger_alpha_3_code",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Passenger Type Name",
        data: "passenger_type_translation.passenger_type_name",
        visible: false,
      },
    ],
    emptyTable: "No passenger types found",
    recordName: ["passenger_type_code", "passenger_type_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Passenger Type Code", recordName: "passenger_type_code"}, 
      {title: "Passenger Type Name", recordName: "passenger_type_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
