import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function RegionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Regions",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Regions",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Regions",
    titleModal: "Region",
    baseRoute: "/master/regions/form",
    endpoint: "/master/regions",
    deleteEndpoint: "/master/batch-actions/delete/regions",
    activationEndpoint: "/master/batch-actions/activate/regions",
    deactivationEndpoint: "/master/batch-actions/deactivate/regions",
    columns: [
      {
        title: "Region Code",
        data: "region_code",
      },
      {
        title: "Region Name",
        data: "region_name",
        render: renderColumn("region", "region_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Region Name",
        data: "region_translation.region_name",
        visible: false,
      },
    ],
    emptyTable: "No regions found",
    recordName: ["region_code", "region_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Region Name", recordName: "region_name"}, 
    ],
  }
  return <BBDataTable {...params} />
}
