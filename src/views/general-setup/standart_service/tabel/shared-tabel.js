import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"

import FormTabel from "../form/shared-form"

export default function SharedTable() {
  // const Form = () => {
  //   return <h1>Halo</h1>
  // }

  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    showHistory: true,
    title: "Standard Service",
    titleModal: "Standard Service",
    baseRoute: "/master/standard-services/form",
    endpoint: "/master/configurations/standard-services",
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
        data: "service_level_objective.amount",
      },
    ],
    emptyTable: "No Record",
    recordName: ["task_type.task_type_name", "service_level_objective.amount"],
    btnDownload: ".buttons-csv",
    module: "standard-service",
  }
  return <BBDataTable {...params} modalContent={FormTabel} />
}
