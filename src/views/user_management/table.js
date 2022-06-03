import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { useWindowSize } from "rooks"

import FormInputSelectAjax from "components/form/input-select-ajax"

export default function EmployeeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "User Management",
        breadcrumbs: [
          {
            text: "User & Access Management",
          },
          {
            text: "User Management",
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
  const { innerWidth } = useWindowSize()

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
          endpoint="/user/user-type-users"
          column="job_title_name"
          sort="job_title_name"
          isGrouping={true}
          fieldGroup="id"
          value={selectedJobTitleIds}
          data={selectedJobTitle}
          filter={`["user_account_id", "is not", null]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />

        {
          // Tablet
          innerWidth > 480 && innerWidth <= 768 ? (
            <>
              <FormInputSelectAjax
                label="User Type"
                onChange={onFilterChangeOffice}
                endpoint="/user/user-type-users"
                column="user_type_name"
                sort="user_type_name"
                isGrouping={true}
                fieldGroup="id"
                value={selectedOfficeIds}
                data={selectedOffice}
                filter={`["user_account_id", "is not", null]`}
                type="selectmultiple"
                isFilter={true}
                allowClear={false}
                placeholder="Please choose"
              />
              <FormInputSelectAjax
                label="Last Login"
                onChange={onFilterChangeOffice}
                endpoint="/master/employees"
                column="office.office_name"
                sort="office.office_name"
                isGrouping={true}
                fieldGroup="office.id"
                value={selectedOfficeIds}
                data={selectedOffice}
                filter={`["office.id", "is not", null]`}
                type="selectmultiple"
                isFilter={true}
                allowClear={false}
                placeholder="Please choose"
              />
            </>
          ) : (
            <>
              <FormInputSelectAjax
                label="User Type"
                onChange={onFilterChangeOffice}
                endpoint="/user/user-type-users"
                column="user_type_name"
                sort="user_type_name"
                isGrouping={true}
                fieldGroup="id"
                value={selectedOfficeIds}
                data={selectedOffice}
                filter={`["user_account_id", "is not", null]`}
                type="selectmultiple"
                isFilter={true}
                allowClear={false}
                placeholder="Please choose"
              />
              <FormInputSelectAjax
                label="Last Login"
                onChange={onFilterChangeOffice}
                endpoint="/master/employees"
                column="office.office_name"
                sort="office.office_name"
                isGrouping={true}
                fieldGroup="office.id"
                value={selectedOfficeIds}
                data={selectedOffice}
                filter={`["office.id", "is not", null]`}
                type="selectmultiple"
                isFilter={true}
                allowClear={false}
                placeholder="Please choose"
              />
            </>
          )
        }
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
  let [params, setParams] = useState({
    isCheckbox: false,
    title: "User Management",
    titleModal: "User Management",
    baseRoute: "/master/user-management/form",
    endpoint: "/user/user-type-users",
    customSort: ["given_name"],
    deleteEndpoint: "/master/batch-actions/delete/user-type-users",
    activationEndpoint: "/master/batch-actions/activate/user-type-users",
    deactivationEndpoint: "/master/batch-actions/deactivate/user-type-users",
    columns: [
      {
        title: "",
        data: "employee_asset.multimedia_description.url",
        render: (data, type) => {
          if (type === "myExport") {
            return data || ""
          }
          if (data === undefined) {
            return (
              `<img class="image-profile-tabel mr-2" src="https://bbdev.monstercode.net/files/b3986414-5c5f-45a3-be6f-4fedcce2d022.png"/>` +
              " "
            )
          } else {
            return `<img class="image-profile-tabel mr-2" src="${data}"/>` + " "
          }
        },
        sortable: false,
        searchable: false,
      },
      {
        title: "Name",
        data: "given_name",
      },
      {
        title: "",
        data: "middle_name",
        visible: false,
      },
      {
        title: "",
        data: "surname",
        visible: false,
      },

      {
        title: "Job title",
        data: "job_title_name",
        render: (data) => {
          if (data === undefined) {
            return ""
          } else {
            return data
          }
        },
      },
      {
        title: "User Access Type",
        data: "user_type_name",
      },
      {
        title: "Last Login",
        data: "",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],
    emptyTable: "No user management found",
    btnDownload: ".buttons-csv",
    module: "user-management",
    showInfoDelete: true,
    switchStatus: true,
    infoDelete: [
      {
        title: "Name",
        recordName: ["given_name", "middle_name", "surname"],
      },
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

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
