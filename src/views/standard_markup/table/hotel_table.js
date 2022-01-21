import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function HotelTable() {   

  let [params, setParams] = useState({
    title: "Standard Markup",
    baseRoute: "/master/standard-markup/form/hotel-form",
    endpoint: "/master/hotels",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
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
