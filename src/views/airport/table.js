import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import TableDropdownFilter from "components/table/table-dropdown-filter"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function AirportTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Airports",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Airports",
          },
        ],
      }),
    )
  }, [])

  let [selectedCities, setSelectedCities] = useState([])
  let [selectedCityIds, setSelectedCityIds] = useState([])
  let [selectedCountries, setSelectedCountries] = useState([])
  let [selectedCountryIds, setSelectedCountryIds] = useState([])

  let [params, setParams] = useState({
    filters: [],
    title: "Airports",
    titleModal: "Airport",
    baseRoute: "/master/airports/form",
    endpoint: "/master/airports",
    deleteEndpoint: "/master/batch-actions/delete/airports",
    activationEndpoint: "/master/batch-actions/activate/airports",
    deactivationEndpoint: "/master/batch-actions/deactivate/airports",
    columns: [
      {
        title: "Airport Code",
        data: "airport_code",
      },
      {
        title: "Airport Name",
        data: "airport_name",
        render: renderColumn("airport", "airport_name"),
      },
      {
        title: "City",
        data: "city.city_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Airport Name",
        data: "airport_translation.airport_name",
        visible: false,
      },
    ],
    recordName: ["airport_code", "airport_name"],
  })

  useEffect(() => {
    console.log(params.filters)
  }, [params])

  const onFilterChangeCities = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters ? params.filters.filter(v => v[0] !== "city_id") : []
    if (ids.length > 0) {
      setParams({ ...params, filters: [...findFilter, ["city_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedCities(values)
    setSelectedCityIds(ids)
  }

  const onFilterChangeCountries = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters ? params.filters.filter(v => v[0] !== "city.country_id") : []
    if (ids.length > 0) {
      setParams({ ...params, filters: [...findFilter, ["city.country_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedCountries(values)
    setSelectedCountryIds(ids)
  }

  const extraFilter = () => {
    return (
      <>
        <TableDropdownFilter
          label="City"
          onChange={onFilterChangeCities}
          endpoint="/master/cities"
          column="city_name"
          value={selectedCityIds}
          data={selectedCities}
        />
        <TableDropdownFilter
          label="Country"
          onChange={onFilterChangeCountries}
          endpoint="/master/countries"
          column="country_name"
          value={selectedCountryIds}
          data={selectedCountries}
        />
      </>
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedCities([])
    setSelectedCityIds([])
    setSelectedCountries([])
    setSelectedCountryIds([])
  }

  return <BBDataTable extraFilter={extraFilter} onReset={onReset} {...params} />
}
