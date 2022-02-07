import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

import FormInputSelectAjax from "components/form/input-select-ajax"

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

  let [selectedJobTitle, setSelectedJobTitle] = useState([])
  let [selectedJobTitleIds, setSelectedJobTitleIds] = useState([])
  let [selectedDivision, setSelectedDivision] = useState([])
  let [selectedDivisionIds, setSelectedDivisionIds] = useState([])
  let [selectedOffice, setSelectedOffice] = useState([])
  let [selectedOfficeIds, setSelectedOfficeIds] = useState([])

  let [params, setParams] = useState({
    title: "Employee",
    baseRoute: "/master/employee/form",
    endpoint: "/master/employees",
    deleteEndpoint: "/master/batch-actions/delete/employees",
    activationEndpoint: "/master/batch-actions/activate/employees",
    deactivationEndpoint: "/master/batch-actions/deactivate/employees",
    columns: [
      {
        title: "Employee ID",
        data: "employee_number",
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
    switchStatus: true,
  })

  const onFilterChangeJobTitle = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(["job_title_name", "like", values[i].job_title_name])

        if (parseInt(i) + 1 !== values.length) {
          columns.push(["OR"])
        }
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0][0] !== "job_title_name")
      : []
    if (columns.length > 0) {
      setParams({ ...params, filters: [...findFilter, columns] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedJobTitle(values)
    setSelectedJobTitleIds(ids)
  }

  const onFilterChangeDivision = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(["division_name", "like", values[i].division_name])

        if (parseInt(i) + 1 !== values.length) {
          columns.push(["OR"])
        }
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0][0] !== "division_name")
      : []
    if (columns.length > 0) {
      setParams({ ...params, filters: [...findFilter, columns] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedDivision(values)
    setSelectedDivisionIds(ids)
  }

  const onFilterChangeOffice = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(["office_name", "like", values[i].office_name])

        if (parseInt(i) + 1 !== values.length) {
          columns.push(["OR"])
        }
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0][0] !== "office_name")
      : []
    if (columns.length > 0) {
      setParams({ ...params, filters: [...findFilter, columns] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedOffice(values)
    setSelectedOfficeIds(ids)
  }

  const extraFilter = () => {
    return (
      <>
        <FormInputSelectAjax
          label="Job Title"
          onChange={onFilterChangeJobTitle}
          endpoint="/master/job-titles"
          column="job_title_name"
          value={selectedJobTitleIds}
          data={selectedJobTitle}
          filter={`["status", "=", 1]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />
        <FormInputSelectAjax
          label="Division"
          onChange={onFilterChangeDivision}
          endpoint="/master/divisions"
          column="division_name"
          value={selectedDivisionIds}
          data={selectedDivision}
          filter={`["status", "=", 1]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />
        <FormInputSelectAjax
          label="Branch Office"
          onChange={onFilterChangeOffice}
          endpoint="/master/offices"
          column="office_name"
          value={selectedOfficeIds}
          data={selectedOffice}
          filter={`["status", "=", 1]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />
      </>
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedJobTitle([])
    setSelectedJobTitleIds([])
  }

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
