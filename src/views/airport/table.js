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

  let [params, setParams] = useState({
    filters: [],
    title: "Airports",
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
  })

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({ ...params, filters: [["city_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [] })
    }
    setSelectedCities(values)
    setSelectedCityIds(ids)
  }

  const extraFilter = () => {
    return (
      <TableDropdownFilter
        label="City"
        onChange={onFilterChange}
        endpoint="/master/cities"
        column="city_name"
        value={selectedCityIds}
        data={selectedCities}
      />
    )
  }

  const onReset = () => {
      setParams({...params, filters: []})
      setSelectedCities([])
      setSelectedCityIds([])
  }

  return <BBDataTable extraFilter={extraFilter} onReset={onReset} {...params} />
}
