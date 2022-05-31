import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"

export default function OtherTable() { 
  let [selectedCities, setSelectedCities] = useState([])
  let [selectedCityIds, setSelectedCityIds] = useState([])
  let [selectedCountries, setSelectedCountries] = useState([])
  let [selectedCountryIds, setSelectedCountryIds] = useState([])

  let [params, setParams] = useState({
    title: "Standard Markup",
    baseRoute: "/master/standard-markup/form/other-form",
    endpoint: "/master/standard-markup/",
    deleteEndpoint: "/master/standard-markup/",
    activationEndpoint: "/master/standard-markup/",
    deactivationEndpoint: "/master/standard-markup/",
    columns: [
      {
        title: "Hotel Name",
        data: "hotel_name",
      },
      
    ],
    emptyTable: "No other found",
    recordName: "hotel_name",
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

  return <BBDataTable {...params}  />
}
