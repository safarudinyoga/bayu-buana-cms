import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function AgeQualifyingTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Age Qualifying Type",
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            text: "Age Qualifying Type",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Age Qualifying Type",
    baseRoute: "/master/age-qualifying-types/form",
    endpoint: "/master/age-qualifying-types",
    deleteEndpoint: "/master/batch-actions/delete/age-qualifying-types",
    activationEndpoint: "/master/batch-actions/activate/age-qualifying-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/age-qualifying-types",
    columns: [
      {
        title: "Age Qualifying Type Code",
        data: "age_qualifying_type_code",
      },
      {
        title: "Age Qualifying Type Name",
        data: "age_qualifying_type_name",
        render: renderColumn("age_qualifying_type", "age_qualifying_type_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Age Qualifying Type Name",
        data: "age_qualifying_type_translation.age_qualifying_type_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
