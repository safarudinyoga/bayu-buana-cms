import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation" 

export default function CabinTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Cabin Type",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Cabin Type",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Cabin Type",
    baseRoute: "/master/cabin-types/form",
    endpoint: "/master/cabin-types",
    deleteEndpoint: "/master/batch-actions/delete/cabin-types",
    activationEndpoint: "/master/batch-actions/activate/cabin-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/cabin-types",
    columns: [
      {
  "title": "Cabin Type Code",
  "data": "cabin_type_code"
},
{
  "title": "Cabin Type Name",
  "data": "cabin_type_name",
  "render": renderColumn('cabin_type','cabin_type_name')
},
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
  "title": "Translated Cabin Type Name",
  "data": "cabin_type_translation.cabin_type_name",
  "visible": false
}
    ],
  }
  return <BBDataTable {...params} />
}
