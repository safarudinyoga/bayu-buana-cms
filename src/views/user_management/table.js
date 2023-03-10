import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { useWindowSize } from "rooks"
import DateRangePicker from 'components/form/date-range-picker'
import FormInputSelectAjax from "components/form/input-select-ajax"
import moment from "moment"

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
  let [selectedOffice, setSelectedOffice] = useState([])
  let [selectedOfficeIds, setSelectedOfficeIds] = useState([])
  const [selectedLastLogin, setSelectedLastLogin] = useState([])
  const { innerWidth } = useWindowSize()

  const convertTZ = (date) => {
    let formatDate = new Date(date)
    return moment(formatDate).format("YYYY-MM-DD")
  }
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

  const onChangeLastLogin = (date) => {
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "last_login")
      : []

    if(date.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["last_login","like",`${convertTZ(date[0])}`]]
      })
    }
    setSelectedLastLogin(date)
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
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div className="col-xs-4">
                  <label className="text-label-filter font-weight-bold">Last Login</label>
                  <div className="row mb-3 mb-sm-0 align-items-center">
                    <DateRangePicker 
                      minDate={1} 
                      maxDate={1} 
                      value={selectedLastLogin}
                      placeholder={"dd/mm/yyyy"}
                      onChange={(date) => onChangeLastLogin(date)}
                    />
                  </div>
                </div>
              </div>
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
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div className="col-xs-4">
                  <label className="text-label-filter font-weight-bold">Last Login</label>
                  <div className="row mb-3 mb-sm-0 align-items-center">
                    <DateRangePicker 
                      minDate={1} 
                      maxDate={1} 
                      value={selectedLastLogin}
                      placeholder={"dd/mm/yyyy"}
                      onChange={(date) => onChangeLastLogin(date)}
                    />
                  </div>
                </div>
              </div>
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
    setSelectedOffice([])
    setSelectedOfficeIds([])
    setSelectedLastLogin([])
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
        data: "photo_url",
        render: (data) => {
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
        data: "given_name"
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
        title: "",
        data: "employee_number",
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
        data: "last_login",
        render: (data, type) => {
          if (data === null) {
            return ""
          } else {
            var now = moment(new Date())
            var end = moment(data);
            var duration = moment.duration(now.diff(end));
            var minutes = duration.asMinutes();
            var hours = Math.round(minutes / 60)
            var days = Math.round(hours / 24)
            let date = moment(data).format("DD MMMM YYYY")
            if(minutes < 60){
              if(minutes <2){
                date = '1 minute ago'
              }else{
                date = minutes + ' minutes ago'
              }
            }else if(minutes < 1440){
              if(hours <2){
                date = hours + ' hour ago'
              }else{
                date = hours + ' hours ago'
              }
            }else if(minutes < 10080){
              if(days <2){
                date = days + ' day ago'
              }else{
                date = days + ' days ago'
              }
            }
            return date
          }
        },
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],
    emptyTable: "No user found",
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
