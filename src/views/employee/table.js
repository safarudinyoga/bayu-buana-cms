import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function EmployeeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Master Employee",
        breadcrumbs: [
          {
            text: "Employee Management",
          },
          {
            text: "Master Employee",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Employee",
    baseRoute: "/master/employee/form",
    endpoint: "/master/employees",
    deleteEndpoint: "/master/batch-actions/delete/employees",
    activationEndpoint: "/master/batch-actions/activate/employees",
    deactivationEndpoint: "/master/batch-actions/deactivate/employees",
    columns: [
      {
        title: "Employee ID",
        data: "employee_id",
      },
      {
        title: "Full Name",
        data: "full_name",
        render: renderColumn("aircraft", "aircraft_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Aircraft Name",
        data: "aircraft_translation.aircraft_name",
        visible: false,
      },
    ],
    emptyTable: "No employees found",
    btnDownload: ".buttons-csv",
  }
  return <BBDataTable {...params} />
}
