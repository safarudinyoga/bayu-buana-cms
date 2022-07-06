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
    deleteEndpoint: "/master/agent-markup-categories/1",
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
          if (val.amount !== 0) {
            if (val.charge_type_id === "c93288b6-29d3-4e20-aa83-5ee6261f64ff") {
              return `IDR ${val.amount}/Ticket`
            } else if (
              val.charge_type_id === "de03bf84-4bd8-4cdf-9348-00246f04bcad"
            ) {
              return `IDR ${val.amount}/Person`
            } else if (
              val.charge_type_id === "5123b121-4f6a-4871-bef1-65408d663e19"
            ) {
              return `IDR ${val.amount}/Transaction`
            }
          } else {
            if (val.is_tax_inclusive) {
              return `${val.percent}% Include Tax `
            } else {
              return `${val.percent}% Not Include Tax `
            }
          }
        },
      },
      {
        title: "International Mark Up",
        data: "international_flight_markup",
        render: (val) => {
          if (val.amount !== 0) {
            if (val.charge_type_id === "c93288b6-29d3-4e20-aa83-5ee6261f64ff") {
              return `IDR ${val.amount}/Ticket`
            } else if (
              val.charge_type_id === "de03bf84-4bd8-4cdf-9348-00246f04bcad"
            ) {
              return `IDR ${val.amount}/Person`
            } else if (
              val.charge_type_id === "5123b121-4f6a-4871-bef1-65408d663e19"
            ) {
              return `IDR ${val.amount}/Transaction`
            }
          } else {
            if (val.is_tax_inclusive) {
              return `${val.percent}% Include Tax `
            } else {
              return `${val.percent}% Not Include Tax `
            }
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
