import React from "react"
import BBDataTable from "components/table/bb-data-table"
import Form from "../form/flight_override_service_form"

export default function FlightOverrideServiceFeeTable() {
  let params = {
    title: "Standard Service Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    hideDetail: true,
    isHidePrintLogo: true,
    hideCreate: true,
    isHideDownloadLogo: true,
    createOnModal: true,
    baseRoute: "/master/standard-service-fee/form/flight-form",
    endpoint: "/master/service-fee-categories",
    deleteEndpoint: "/master/batch-actions/delete/service-fee-categories",
    activationEndpoint: "/master/batch-actions/activate/service-fee-categories",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/service-fee-categories",
    columns: [
      {
        title: "Destination",
        data: "service_fee_category_name",
      },
      {
        title: "Airline Service Type",
        data: "Currency.Currency Code",
      },
      {
        title: "Apply Condition",
        data: "Currency.Currency Code",
      },
      {
        title: "Service Fee",
        data: "Currency.Currency Code",
      },
    ],
    emptyTable: "No override Service Fees found",
    recordName: "service_fee_category_name",
  }

  return (
    <>
      <BBDataTable {...params} modalContent={Form} />
    </>
  )
}
