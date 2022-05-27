import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function HotelTable() {   

  let [params, setParams] = useState({
    title: "Standard Markup",
    baseRoute: "/master/markup-categories",
    endpoint: "/master/",
    deleteEndpoint: "/master/markup-categories",
    activationEndpoint: "/master/markup-categories",
    deactivationEndpoint: "/master/markup-categories",
    columns: [
      {
        title: "Preset Name",
        data: "preset_name",
      },
      {
        title: "Domestic Mark Up",
        data: "domestic_markup",
      },
      {
        title: "International Mark Up",
        data: "international_markup",
      },
      {
        title: "Number Of Override",
        data: "number_of_override",
      },
    ],
    emptyTable: "No hotel found",
    recordName: "hotel_name",
  }) 

  return <BBDataTable {...params}  />
}
