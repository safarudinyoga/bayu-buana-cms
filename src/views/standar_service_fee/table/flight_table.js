import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function FlightTable() {
  let [params, setParams] = useState({
    title: "Standard Service Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    hideDetail: true,
    baseRoute: "/master/standard-service-fee/form/flight-form",
    endpoint: "/master/service-fee-categories",
    deleteEndpoint: "/master/batch-actions/delete/service-fee-categories",
    activationEndpoint: "/master/batch-actions/activate/service-fee-categories",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/service-fee-categories",
    columns: [
      {
        title: "Preset Name",
        data: "service_fee_category_name",
      },
      {
        title: "Domestic Service Fee",
        data: "Currency.Currency Code",
      },
      {
        title: "International Service Fee",
        data: "Currency.Currency Code",
      },
    ],
    emptyTable: "No Service Fees found",
    recordName: "service_fee_category_name",
  })

  return <BBDataTable {...params} />
}
