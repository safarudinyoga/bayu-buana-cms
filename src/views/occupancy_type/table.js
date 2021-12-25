import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import rowDefault from "lib/row-isdefault"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function OccupancyTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Occupancy Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Occupancy Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Occupancy Types",
    titleModal: "Occupancy Type",
    baseRoute: "/master/occupancy-types/form",
    endpoint: "/master/occupancy-types",
    deleteEndpoint: "/master/batch-actions/delete/occupancy-types",
    activationEndpoint: "/master/batch-actions/activate/occupancy-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/occupancy-types",
    columns: [
      {
        title: "Occupancy Type Code",
        data: "occupancy_type_code",
      },
      {
        title: "Occupancy Type Name",
        data: "occupancy_type_name",
        render: renderColumn("occupancy_type", "occupancy_type_name"),
      },
      {
        title: "Occupancy",
        data: "occupancy",
      },
      {
        title: "Is Default",
        data: "is_default",
        render: rowDefault,
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Occupancy Type Name",
        data: "occupancy_type_translation.occupancy_type_name",
        visible: false,
      },
    ],
    emptyTable: "No occupancy types found",
    recordName: ["occupancy_type_code", "occupancy_type_name"],
  }
  return <BBDataTable {...params} />
}
