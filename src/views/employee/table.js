import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import moment from "moment"

import FormInputSelectAjax from "components/form/input-select-ajax"

export default function EmployeeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Master Employee",
        breadcrumbs: [
          {
            text: "Employment Management",
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
  console.log("division", selectedDivisionIds)
  console.log("office", selectedOfficeIds)

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
      {
        title: "Employee ID",
        data: { employee_number: "employee_number", employee_asset: "url" },
        render: (data) => {
          if (data.employee_asset.multimedia_description === undefined) {
            return (
              `<img class="image-profile-tabel mr-2" src="https://bbdev.monstercode.net/files/b3986414-5c5f-45a3-be6f-4fedcce2d022.png"/>` +
              " " +
              data?.employee_number
            )
          } else {
            return (
              `<img class="image-profile-tabel mr-2" src="${data?.employee_asset?.multimedia_description?.url}"/>` +
              " " +
              data?.employee_number
            )
          }
        },
      },
      {
        title: "Full Name",
        data: {
          given_name: "given_name",
          middle_name: "middle_name",
          surname: "surName",
        },
        render: (data) => {
          if (data.given_name === undefined) {
            return null
          } else {
            return (
              data?.given_name + " " + data?.middle_name + " " + data?.surname
            )
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
        render: function (data, type, row) {
          if (type === "sort" || type === "type") {
            return data
          }
          return moment(data).format("D MMM YYYY")
        },
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
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "job_title.id")
      : []
    if (ids.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["job_title.id", "in", ids]],
      })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedJobTitle(values)
    setSelectedJobTitleIds(ids)
  }

  const onFilterChangeDivision = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "division.id")
      : []
    if (ids.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["division.id", "in", ids]],
      })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedDivision(values)
    setSelectedDivisionIds(ids)
  }

  const onFilterChangeOffice = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "office.id")
      : []
    if (ids.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["office.id", "in", ids]],
      })
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
          endpoint="/master/employees"
          column="job_title.job_title_name"
          sort="job_title.id"
          isGrouping={true}
          fieldGroup="job_title.id"
          value={selectedJobTitleIds}
          data={selectedJobTitle}
          filter={`[["job_title.id", "is not", null],["AND"],["status", "=", 1]]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />
        <FormInputSelectAjax
          label="Division"
          onChange={onFilterChangeDivision}
          endpoint="/master/employees"
          column="division.division_name"
          sort="division.id"
          isGrouping={true}
          fieldGroup="division.id"
          value={selectedDivisionIds}
          data={selectedDivision}
          filter={`[["division.id", "is not", null],["AND"],["status", "=", 1]]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />
        <FormInputSelectAjax
          label="Branch Office"
          onChange={onFilterChangeOffice}
          endpoint="/master/employees"
          column="office.office_name"
          sort="office.id"
          isGrouping={true}
          fieldGroup="office.id"
          value={selectedOfficeIds}
          data={selectedOffice}
          filter={`[["office.id", "is not", null],["AND"],["status", "=", 1]]`}
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
    setSelectedDivision([])
    setSelectedDivisionIds([])
    setSelectedOffice([])
    setSelectedOfficeIds([])
  }

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
