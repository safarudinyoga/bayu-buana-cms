import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function HotelTable() {   

  let [params, setParams] = useState({
    title: "Standard Ancillary Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    baseRoute: "/master/standard-ancillary-fee/form/hotel-form",
    endpoint: "/master/agent-processing-fee-categories/2",
    deleteEndpoint: "/master/agent-processing-fee-categories/2",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    hideDetail: true,
    columns: [
      {
        title: "Preset Name",
        data: "processing_fee_category_name",
      },
    ],
    emptyTable: "No Hotel fees found",
    recordName: "processing_fee_category_name",
    module: "standard-ancillary-fee",
    infoDelete: [
      {title: "Standard Ancillary Fee", recordName: "processing_fee_category_name"}, 
    ],
  }) 

  return <BBDataTable {...params}  />
}
