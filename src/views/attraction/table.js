import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function AttractionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Attractions",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Attractions",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Attractions",
    baseRoute: "/master/attractions/form",
    endpoint: "/master/attractions",
    deleteEndpoint: "/master/batch-actions/delete/attractions",
    activationEndpoint: "/master/batch-actions/activate/attractions",
    deactivationEndpoint: "/master/batch-actions/deactivate/attractions",
    columns: [
      {
        title: "Attraction Name",
        data: "attraction_name",
      },
      {
        title: "City",
        data: "city_name",
      },
      {
        title: "Country",
        data: "country_name",
      },
      {
        title: "Attraction Category",
        data: "country_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Attraction Name",
        data: "attraction_translation.attraction_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
