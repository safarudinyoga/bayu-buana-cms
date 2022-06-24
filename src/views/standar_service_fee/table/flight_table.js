import React from "react"
import BBDataTable from "components/table/bb-data-table"

export default function FlightTable() {
  let params = {
    title: "Standard Service Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    hideDetail: true,
    baseRoute: "/master/standard-service-fee/form/flight-form",
    endpoint: "/master/agent-service-fee-categories/1",
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
        data: "domestic_flight_service.amount",
      },
      {
        title: "International Service Fee",
        data: "international_flight_service.amount",
      },
      {
        title: "Number of Override",
        data: "Currency.Currency Code",
      },
    ],
    emptyTable: "No Service Fees found",
    recordName: "service_fee_category_name",
  }

  return <BBDataTable {...params} />
}
