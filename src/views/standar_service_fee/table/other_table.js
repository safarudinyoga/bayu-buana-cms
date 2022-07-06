import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import './other_table.css'

export default function OtherTable() {
  let [params, setParams] = useState({
    title: "Standard Service Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    hideDetail: true,
    baseRoute: "/master/standard-service-fee/form/other-form",
    endpoint: "/master/agent-service-fee-categories/3",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Preset Name",
        data: "service_fee_category_name",
      },
      // {
      //   title: "Preset Name",
      //   data: "service_fee_category_name",
      // },
    ],
    emptyTable: "No Service Fees found",
    recordName: "preset_name",
    module: "standard-fee-other",
  })

  return <div className="s-s-f-other-table"><BBDataTable {...params} /></div>
}
