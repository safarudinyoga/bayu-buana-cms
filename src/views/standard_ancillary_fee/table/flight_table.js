import React, { useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function FlightTable() { 
  let [params, setParams] = useState({
    title: "Standard Ancillary Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    baseRoute: "/master/standard-ancillary-fee/form/flight-form",
    endpoint: "/master/agent-processing-fee-categories/1",
    deleteEndpoint: "/master/agent-processing-fee-categories/1",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    hideDetail: true,
    columns: [
      {
        title: "Preset Name",
        data: "processing_fee_category_name",
      },
    ],
    emptyTable: "No Ancillary Fees found",
    recordName: "processing_fee_category_name",
    module: "standard-ancillary-fee",
    showInfoDelete: true,
    infoDelete: [
      {title: "Standard Ancillary Fee", recordName: "processing_fee_category_name"}, 
    ],
    searchText: "Search",
  })
  return <BBDataTable {...params}  />
}
