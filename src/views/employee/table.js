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
    isCheckbox: false,
    title: "Employee",
    titleModal: "Employee",
    baseRoute: "/master/employee/form",
    endpoint: "/master/employees",
    deleteEndpoint: "/master/batch-actions/delete/employees",
    activationEndpoint: "/master/batch-actions/activate/employee",
    deactivationEndpoint: "/master/batch-actions/deactivate/employee",
    columns: [
      // {
      //   mData: "IMAGE",
      //   aTargets: [0],
      //   render: function (data) {
      //     return '<img src="https://bbdev.monstercode.net/files/b3986414-5c5f-45a3-be6f-4fedcce2d022.png"/>'
      //   },
      // },

      {
        title: "Employee ID",
        data: "employee_number",
      },
      {
        title: "Full Name",
        data: {given_name: "given_name", middle_name: "middle_name", surname: "surName"},
        render: (data) => {     
          if (data.given_name === undefined) {
            return null
          }else{     
          return data?.given_name + " " + data?.middle_name + " " + data?.surname
          }
        },
      },
      {
        title: "Email",
        data: "contact.email",
      },
      {
        title: "Job Title",
        data: { job_title: "job_title", division: "division" },
        render: (data) => {
          {
            if (data?.job_title?.job_title_name === undefined) {
              return null
            } else {
              return (
                data?.job_title?.job_title_name +
                "<br/> " +
                data?.division?.division_name
              )
            }
          }
        },
      },
      {
        title: "Branch Office",
        data: "office.office_name",
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
    recordName: ["employee_number", "person.given_name"],
    switchStatus: true,
    customFilterStatus: {
      value: "",
      options: [
        { value: "1", label: "Active" },
        { value: "3", label: "Inactive" },
      ],
    },
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
