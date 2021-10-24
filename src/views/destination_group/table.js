import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function DestinationGroupTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Destination Group",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Destination Group",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Destination Group",
    baseRoute: "/master/destination-groups/form",
    endpoint: "/master/destination-groups",
    deleteEndpoint: "/master/batch-actions/delete/destination-groups",
    activationEndpoint: "/master/batch-actions/activate/destination-groups",
    deactivationEndpoint: "/master/batch-actions/deactivate/destination-groups",
    columns: [
      {
        title: "Destination Group Code",
        data: "destination_group_code",
      },
      {
        title: "Destination Group Name",
        data: "destination_group_name",
        render: renderColumn("destination_group", "destination_group_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Destination Group Name",
        data: "destination_group_translation.destination_group_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
