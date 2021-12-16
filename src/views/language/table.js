import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function LanguageTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Languages",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Languages",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Languages",
    baseRoute: "/master/languages/form",
    endpoint: "/master/languages",
    deleteEndpoint: "/master/batch-actions/delete/languages",
    activationEndpoint: "/master/batch-actions/activate/languages",
    deactivationEndpoint: "/master/batch-actions/deactivate/languages",
    columns: [
      {
        title: "Language Code",
        data: "language_code",
      },
      {
        title: "Language Name",
        data: "language_name",
        render: renderColumn("language", "language_name"),
      },
      {
        title: "Flag",
        data: "language_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          if (type === 'myExport') {
            return val
          }
          if (val) {
            return '<img src="' + val + '" class="table-image"/>'
          }

          return ""
        },
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Language Name",
        data: "language_translation.language_name",
        visible: false,
      },
    ],
    recordName: ["language_code", "language_name"],
  }
  return <BBDataTable {...params} />
}
