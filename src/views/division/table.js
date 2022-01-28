import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function DivisionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Division",
        breadcrumbs: [
          {
            text: "Employee Management",
          },
          {
            text: "Division",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
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
        title: "Division Name",
        data: "division_name",
      },
      {
        title: "Parent Division",
        data: "parent_division.parent_division_name",
      },
      {
        title: "Manager",
        data: "manager.manager_name",
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
  })

  return <BBDataTable {...params} {...params} />
}
