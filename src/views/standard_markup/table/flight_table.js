import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function FlightTable() {
  let [selectedCities, setSelectedCities] = useState([])
  let [selectedCityIds, setSelectedCityIds] = useState([])
  let [selectedCountries, setSelectedCountries] = useState([])
  let [selectedCountryIds, setSelectedCountryIds] = useState([])

  let [params, setParams] = useState({
    title: "Standard Markup",
    hideDetail: true,
    baseRoute: "/master/standard-markup/form/flight-form",
    endpoint: `/master/agent-markup-categories/1`,
    deleteEndpoint: "/master/standard-markup",
    activationEndpoint: "/master/standard-markup",
    deactivationEndpoint: "/master/standard-markup",
    columns: [
      {
        title: "Preset Name",
        data: "markup_category_name",
      },
      {
        title: "Domestic Mark Up",
        data: "domestic_flight_markup",
        render: (val) => {
          if (val.is_tax_inclusive) {
            return `${val.percent}% Include Tax `
          } else {
            return `IDR ${val.amount}/Ticket`
          }
        },
      },
      {
        title: "International Mark Up",
        data: "international_flight_markup",
        render: (val) => {
          if (val.is_tax_inclusive) {
            return `${val.percent}% Include Tax `
          } else {
            return `IDR ${val.amount}/Ticket`
          }
        },
      },
      {
        title: "Number Of Override",
        data: "sort",
      },
    ],
    emptyTable: "No flight found",
    recordName: [
      "markup_category_name",
      "domestic_flight_markup.amount",
      "international_flight_markup.amount",
      "sort",
    ],
  })

  const onFilterChangeCountries = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "country.id")
      : []
    if (ids.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["country.id", "in", ids]],
      })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedCountries(values)
    setSelectedCountryIds(ids)
  }

  const onFilterChangeCities = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "city_id")
      : []
    if (ids.length > 0) {
      setParams({ ...params, filters: [...findFilter, ["city_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedCities(values)
    setSelectedCityIds(ids)
  }
  return <BBDataTable {...params} />
}
