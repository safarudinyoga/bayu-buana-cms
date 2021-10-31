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
        title: "Destinations",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Destinations",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Zones",
    baseRoute: "/master/destinations/form",
    endpoint: "/master/destinations",
    deleteEndpoint: "/master/batch-actions/delete/destinations",
    activationEndpoint: "/master/batch-actions/activate/destinations",
    deactivationEndpoint: "/master/batch-actions/deactivate/destinations",
    columns: [
      {
        title: "Destination Code",
        data: "destination_code",
      },
      {
        title: "Destination Name",
        data: "destination_name",
        render: renderColumn("destination", "destination_name")
      },
      {
        title: "Country",
        data: "country",
      },
      {
        title: "City",
        data: "city",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Destination Name",
        data: "zone_translation.destination_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
