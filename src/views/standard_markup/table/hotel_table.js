import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function HotelTable() {
  let [params, setParams] = useState({
    title: "Standard Markup",
    hideDetail: true,
    baseRoute: "/master/standard-markup/form/hotel-form",
    endpoint: `/master/agent-markup-categories/2`,
    deleteEndpoint: "/master/standard-markup/",
    activationEndpoint: "/master/standard-markup/",
    deactivationEndpoint: "/master/standard-markup/",
    columns: [
      {
        title: "Preset Name",
        data: "markup_category_name",
      },
      {
        title: "Domestic Mark Up",
        data: "domestic_hotel_markup.amount",
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
