import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function HotelTable() {
  let [params, setParams] = useState({
    title: "Standard Markup",
    hideDetail: true,
    baseRoute: "/master/standard-markup/form/hotel-form",
    endpoint: `/master/agent-markup-categories/2`,
    deleteEndpoint: "/master/agent-markup-categories/2",
    activationEndpoint: "/master/standard-markup/",
    deactivationEndpoint: "/master/standard-markup/",
    columns: [
      {
        title: "Preset Name",
        data: "markup_category_name",
      },
      {
        title: "Domestic Mark Up",
        data: "domestic_hotel_markup",
        render: (val) => {
          if (val.charge_type_id === "c93288b6-29d3-4e20-aa83-5ee6261f64ff") {
            return `IDR ${val.amount}/Ticket`
          } else if (
            val.charge_type_id === "de03bf84-4bd8-4cdf-9348-00246f04bcad"
          ) {
            return `IDR ${val.amount}/Person`
          } else if (
            val.charge_type_id === "5123b121-4f6a-4871-bef1-65408d663e19"
          ) {
            return `IDR ${val.amount}/Person`
          } else {
            return `${val.percent}% Include Tax `
          }
        },
      },
      {
        title: "International Mark Up",
        data: "international_hotel_markup.amount",
      },
      {
        title: "Number Of Override",
        data: "sort",
      },
    ],
    emptyTable: "No hotel found",
    recordName: [
      "markup_category_name",
      "domestic_hotel_markup.amount",
      "international_hotel_markup.amount",
      "sort",
    ],
  })

  return <BBDataTable {...params} />
}
