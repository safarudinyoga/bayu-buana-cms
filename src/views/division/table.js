import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function DivisionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Division",
        breadcrumbs: [
          {
            text: "Employment Management",
          },
          {
            text: "Division",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Division",
    titleModal: "Division",
    baseRoute: "/master/divisions/form",
    endpoint: "/master/divisions",
    deleteEndpoint: "/master/batch-actions/delete/divisions",
    activationEndpoint: "/master/batch-actions/activate/divisions",
    deactivationEndpoint: "/master/batch-actions/deactivate/divisions",
    columns: [
      {
        title: "Code",
        data: "division_code",
      },
      {
        title: "Name",
        data: "division_name",
      },
      {
        title: "Parent Division",
        data: "parent_division.division_name",
      },
      {
        title: "Manager",
        data: "manager.given_name",
        render: (data, d, row) => {
          if (row.manager) {
            return `${row.manager.given_name || ""} ${
              row.manager.middle_name || ""
            } ${row.manager.surname || ""}`
          } else {
            return ""
          }
        },
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Division Name",
        data: "division_translation.division_name",
        visible: false,
      },
    ],
    emptyTable: "No division found",
    recordName: ["division_code", "division_name"],
    showInfoDelete: true,
    switchStatus: true,
    infoDelete: [
      { title: "Division Code", recordName: "division_code" },
      { title: "Division Name", recordName: "division_name" },
    ],
    customFilterStatus: {
      value: "",
      options: [
        { value: "1", label: "Active" },
        { value: "3", label: "Inactive" },
      ],
    },
    statusLabel: "Status",
    isOpenNewTab: false,
  })

  return <BBDataTable {...params} />
}
