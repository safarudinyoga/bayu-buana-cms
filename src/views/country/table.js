import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function CountryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Countries",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Countries",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Countries",
    baseRoute: "/master/countries/form",
    endpoint: "/master/countries",
    deleteEndpoint: "/master/batch-actions/delete/countries",
    activationEndpoint: "/master/batch-actions/activate/countries",
    deactivationEndpoint: "/master/batch-actions/deactivate/countries",
    columns: [
      {
        title: "Country Code",
        data: "country_code",
      },
      {
        title: "Country Name",
        data: "country_name",
        render: renderColumn("country", "country_name"),
      },
      {
        title: "Region",
        data: "region.region_name"
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Country Name",
        data: "country_translation.country_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
