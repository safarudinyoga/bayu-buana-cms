import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
// import moment from "moment"
import { useWindowSize } from "rooks"

import FormInputSelectAjax from "components/form/input-select-ajax"
// import { findLastIndex } from "lodash"

export default function EmployeeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Master Employee",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: "Master Employee",
          },
        ],
      }),
    )
  }, [])

  // let [selectedJobTitle, setSelectedJobTitle] = useState([])
  // let [selectedJobTitleIds, setSelectedJobTitleIds] = useState([])
  // let [selectedDivision, setSelectedDivision] = useState([])
  // let [selectedDivisionIds, setSelectedDivisionIds] = useState([])
  // let [selectedOffice, setSelectedOffice] = useState([])
  // let [selectedOfficeIds, setSelectedOfficeIds] = useState([])
  // const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  // const onFilterChangeJobTitle = (e, values) => {
  //   let ids = []
  //   if (values && values.length > 0) {
  //     for (let i in values) {
  //       ids.push(values[i].id)
  //     }
  //   }
  //   let findFilter = params.filters
  //     ? params.filters.filter((v) => v[0] !== "job_title.id")
  //     : []
  //   if (ids.length > 0) {
  //     setParams({
  //       ...params,
  //       filters: [...findFilter, ["job_title.id", "in", ids]],
  //     })
  //   } else {
  //     setParams({ ...params, filters: [...findFilter] })
  //   }
  //   setSelectedJobTitle(values)
  //   setSelectedJobTitleIds(ids)
  // }

  // const onFilterChangeDivision = (e, values) => {
  //   let ids = []
  //   if (values && values.length > 0) {
  //     for (let i in values) {
  //       ids.push(values[i].id)
  //     }
  //   }
  //   let findFilter = params.filters
  //     ? params.filters.filter((v) => v[0] !== "division.id")
  //     : []
  //   if (ids.length > 0) {
  //     setParams({
  //       ...params,
  //       filters: [...findFilter, ["division.id", "in", ids]],
  //     })
  //   } else {
  //     setParams({ ...params, filters: [...findFilter] })
  //   }
  //   setSelectedDivision(values)
  //   setSelectedDivisionIds(ids)
  // }

  // const onFilterChangeOffice = (e, values) => {
  //   let ids = []
  //   if (values && values.length > 0) {
  //     for (let i in values) {
  //       ids.push(values[i].id)
  //     }
  //   }
  //   let findFilter = params.filters
  //     ? params.filters.filter((v) => v[0] !== "office.id")
  //     : []
  //   if (ids.length > 0) {
  //     setParams({
  //       ...params,
  //       filters: [...findFilter, ["office.id", "in", ids]],
  //     })
  //   } else {
  //     setParams({ ...params, filters: [...findFilter] })
  //   }
  //   setSelectedOffice(values)
  //   setSelectedOfficeIds(ids)
  // }

  // const extraFilter = () => {
  //   return (
  //     <>
  //       <FormInputSelectAjax
  //         label="Job Title"
  //         onChange={onFilterChangeJobTitle}
  //         endpoint="/master/employees"
  //         column="job_title.job_title_name"
  //         sort="job_title.job_title_name"
  //         isGrouping={true}
  //         fieldGroup="job_title.id"
  //         value={selectedJobTitleIds}
  //         data={selectedJobTitle}
  //         filter={`["job_title.id", "is not", null]`}
  //         type="selectmultiple"
  //         isFilter={true}
  //         allowClear={false}
  //         placeholder="Please choose"
  //       />
        
  //       {
  //         // Tablet
  //         innerWidth > 480 && innerWidth <= 768 ? (
  //           <>
  //           <FormInputSelectAjax
  //             label="Branch Office"
  //             onChange={onFilterChangeOffice}
  //             endpoint="/master/employees"
  //             column="office.office_name"
  //             sort="office.office_name"
  //             isGrouping={true}
  //             fieldGroup="office.id"
  //             value={selectedOfficeIds}
  //             data={selectedOffice}
  //             filter={`["office.id", "is not", null]`}
  //             type="selectmultiple"
  //             isFilter={true}
  //             allowClear={false}
  //             placeholder="Please choose"
  //           />
  //           <FormInputSelectAjax
  //             label="Division"
  //             onChange={onFilterChangeDivision}
  //             endpoint="/master/employees"
  //             column="division.division_name"
  //             sort="division.division_name"
  //             isGrouping={true}
  //             fieldGroup="division.id"
  //             value={selectedDivisionIds}
  //             data={selectedDivision}
  //             filter={`["division.id", "is not", null]`}
  //             type="selectmultiple"
  //             isFilter={true}
  //             allowClear={false}
  //             placeholder="Please choose"
  //           />
  //           </>
  //               ) : 
  //               <>
               
  //             <FormInputSelectAjax
  //               label="Division"
  //               onChange={onFilterChangeDivision}
  //               endpoint="/master/employees"
  //               column="division.division_name"
  //               sort="division.division_name"
  //               isGrouping={true}
  //               fieldGroup="division.id"
  //               value={selectedDivisionIds}
  //               data={selectedDivision}
  //               filter={`["division.id", "is not", null]`}
  //               type="selectmultiple"
  //               isFilter={true}
  //               allowClear={false}
  //               placeholder="Please choose"
  //             />
  //              <FormInputSelectAjax
  //               label="Branch Office"
  //               onChange={onFilterChangeOffice}
  //               endpoint="/master/employees"
  //               column="office.office_name"
  //               sort="office.office_name"
  //               isGrouping={true}
  //               fieldGroup="office.id"
  //               value={selectedOfficeIds}
  //               data={selectedOffice}
  //               filter={`["office.id", "is not", null]`}
  //               type="selectmultiple"
  //               isFilter={true}
  //               allowClear={false}
  //               placeholder="Please choose"
  //             />
              
  //             </>

  //       }
  //       </>
  //   )
  // }

  // const onReset = () => {
  //   setParams({ ...params, filters: [] })
  //   setSelectedJobTitle([])
  //   setSelectedJobTitleIds([])
  //   setSelectedDivision([])
  //   setSelectedDivisionIds([])
  //   setSelectedOffice([])
  //   setSelectedOfficeIds([])
  // }
  let [params, setParams] = useState({
    isCheckbox: false,    
    title: "Employee",
    titleModal: "Employee",
    baseRoute: "/master/corporate-employee/form",
    endpoint: "/master/corporate-employee",
    deleteEndpoint: "/master/batch-actions/delete/corporate-employee",
    activationEndpoint: "/master/batch-actions/activate/corporate-employee",
    deactivationEndpoint: "/master/batch-actions/deactivate/corporate-employee",
    columns: [
     {
        title: "Employee",
        data: "employee",
      },
      {
        title: "Job Title",
        data: "job_title",
      },
      {
        title: "Email",
        data: "email",
      },
      {
        title: "Mobile Phone",
        data: "mobile_phone",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],   
    emptyTable: "No employees found",    
    // recordName: ["employee_number", "given_name",],
    btnDownload: ".buttons-csv",
    module: "corporate-employee",    
    showInfoDelete: true,
    switchStatus: true,
    infoDelete: [
      // { title: "Employee Number", recordName: "employee_number" },
      // { title: "Employee Name", recordName: ["given_name", "middle_name", "surname"] },
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
    // customSort:["sort", "given_name"]
    
  })
  return <BBDataTable {...params} />
  // return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
