import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function CityTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "City",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "City",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "City",
    baseRoute: "/master/cities/form",
    endpoint: "/master/cities",
    deleteEndpoint: "/master/batch-actions/delete/cities",
    activationEndpoint: "/master/batch-actions/activate/cities",
    deactivationEndpoint: "/master/batch-actions/deactivate/cities",
    columns: [
      {
        title: "City Code",
        data: "city_code",
      },
      {
        title: "City Name",
        data: "city_name",
        render: renderColumn("city", "city_name"),
      },
      {
        title: "Country",
        data: "country_id",
        render: renderColumn("country", "country_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated City Name",
        data: "city_translation.city_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
