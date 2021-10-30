import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function DestinationTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Zones",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Zones",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Zones",
    baseRoute: "/master/zones/form",
    endpoint: "/master/zones",
    deleteEndpoint: "/master/batch-actions/delete/zones",
    activationEndpoint: "/master/batch-actions/activate/zones",
    deactivationEndpoint: "/master/batch-actions/deactivate/zones",
    columns: [
      {
        title: "Zone Code",
        data: "zone_code",
      },
      {
        title: "Zone Name",
        data: "zone_name",
        render: renderColumn("zone", "zone_name")
      },
      {
        title: "Destination",
        data: "destination",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Zone Name",
        data: "zone_translation.zone_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
