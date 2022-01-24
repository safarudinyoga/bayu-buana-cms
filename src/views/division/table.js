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
    title: "Division",
    titleModal: "Division",
    baseRoute: "/master/division/form",
    endpoint: "/master/division",
    deleteEndpoint: "/master/batch-actions/delete/division",
    activationEndpoint: "/master/batch-actions/activate/division",
    deactivationEndpoint: "/master/batch-actions/deactivate/division",
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
        data: "parent.parent_name",
      },
      {
        title: "Manager",
        data: "manager.manager_manager",
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
    emptyTable: "No Division found",
    recordName: ["division_code", "division_name"],
  })

  return <BBDataTable {...params} {...params} />
}
