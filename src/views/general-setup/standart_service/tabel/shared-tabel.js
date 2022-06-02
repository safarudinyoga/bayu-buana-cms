import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"

import FormTabel from "../form/standart-service-form.js"

export default function SharedTable(props) {
  let serviceLevelCode = props.serviceLevelCode;
  const endpoint = `/master/configurations/standard-services?filters=["service_level.service_level_code","=","${serviceLevelCode}"]`
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    showHistory: true,
    isHideDownloadLogo: true,
    title: "Standard Service",
    titleModal: "Standard Service",
    baseRoute: "/master/standard-services/form",
    endpoint: endpoint,
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
      },
    ],
    emptyTable: "No Record",
    recordName: ["task_type.task_type_name", "amount"],
    btnDownload: ".buttons-csv",
    module: "standard-service",
  }
  return <BBDataTable {...params} modalContent={FormTabel} />
}
