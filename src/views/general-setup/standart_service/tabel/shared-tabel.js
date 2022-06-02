import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"

import FormTabel from "../form/standart-service-form.js"

export default function SharedTable(props) {
  let serviceLevelCode = props.serviceLevelCode;
  const endpoint = `/master/configurations/standard-services`
  const extraFilter = `["service_level.service_level_code","=","${serviceLevelCode}"]`
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail:true,
    showHistory: false,
    isHideDownloadLogo: true,
    title: "Standard Service",
    titleModal: "Standard Service",
    baseRoute: "/master/standard-services/form",
    endpoint: endpoint,
    filterData: extraFilter,
    deleteEndpoint:
      "/master/batch-actions/delete/configurations/standard-services",
    activationEndpoint:
      "/master/batch-actions/activate/configurations/standard-services",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/configurations/standard-services",
    columns: [
      {
        title: "Task Type",
        data: "task_type.task_type_name",
      },
      {
        title: "Response Time",
        data: "amount",
        render: (data) => {
          let day = Math.round(data/1440)
          let hour = Math.round((data % 1440)/60)
          let minute = (data % 1440) % 60
          
          let days = ""
          if(day > 0){
            days = day + (day > 1 ? " Days" : " Day")
          }

          let hours = ""
          if(hour > 0){
            hours = hour + (hour > 1 ? " Hours" : " Hour")
          }

          let minutes = ""
          if(minute > 0){
            minutes = minute + (minute > 1 ? " Minutes" : " Minute")
          }
          return days + " " + hours + " " + minutes
        }
      },
    ],
    emptyTable: "No Record",
    btnDownload: ".buttons-csv",
    module: "standard-service",
    showInfoDelete: true,
    infoDelete: [
      {title: "Task Type", recordName: "task_type_name"}
    ],
  }
  return <BBDataTable {...params} modalContent={FormTabel} serviceLevelCode={serviceLevelCode}/>
}
