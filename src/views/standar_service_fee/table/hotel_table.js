import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function HotelTable() {
  let [params, setParams] = useState({
    title: "Standard Service Fee",
    isCheckbox: false,
    showAdvancedOptions: false,
    hideDetail: true,
    baseRoute: "/master/standard-service-fee/form/hotel-form",
    endpoint: "/master/agent-service-fee-categories/2",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
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
    recordName: "hotel_name",
  })

  return <BBDataTable {...params} />
}
