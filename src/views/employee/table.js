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
        render: renderColumn("full_name", "full_name"),
      },
      {
        title: "Email",
        data: "email",
        render: renderColumn("email", "email"),
      },
      {
        title: "Job Title",
        data: "job_title",
        render: renderColumn("job_title", "job_title"),
      },
      {
        title: "Branch Office",
        data: "branch_office",
        render: renderColumn("branch_office", "branch_office"),
      },
      {
        title: "Hire Date",
        data: "hire_date",
        render: renderColumn("hire_date", "hire_date"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],
    emptyTable: "No employees found",
    btnDownload: ".buttons-csv",
  }
  return <BBDataTable {...params} />
}
