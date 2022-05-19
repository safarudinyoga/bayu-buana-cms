import React, { useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function FlightTable() { 
  let [params, setParams] = useState({
    title: "Standard Ancillary Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    baseRoute: "/master/standard-ancillary-fee/form/flight-form",
    endpoint: "/master/processing-fee-categories",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
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
  })
  return <BBDataTable {...params}  />
}
