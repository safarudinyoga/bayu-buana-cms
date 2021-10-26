import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function ProvinceTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "States / Provinces",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "States / Provinces",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "States / Provinces",
    baseRoute: "/master/provinces/form",
    endpoint: "/master/state-provinces",
    deleteEndpoint: "/master/batch-actions/delete/provinces",
    activationEndpoint: "/master/batch-actions/activate/provinces",
    deactivationEndpoint: "/master/batch-actions/deactivate/provinces",
    columns: [
      {
        title: "State / Province Code",
        data: "state_province_code",
      },
      {
        title: "State / Province Name",
        data: "state_province_name",
        render: renderColumn("province", "state_province_name"),
      },
      {
        title: "Country",
        data: "country.country_name"
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated State / Province Name",
        data: "airline_translation.airline_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
