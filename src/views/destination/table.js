import BBDataTable from "components/table/bb-data-table"
import TableDropdownFilter from "components/table/table-dropdown-filter"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function DestinationTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Destinations",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Destinations",
          },
        ],
      }),
    )
  }, [])

  let [selectedCountries, setSelectedCountries] = useState([])
  let [selectedCountryIds, setSelectedCountryIds] = useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({...params, filters: [["country_id", "in", ids]]})
    } else {
      setParams({...params, filters: []})
    }
    setSelectedCountries(values)
    setSelectedCountryIds(ids)
  }

  const extraFilter = () => {
    return (
      <TableDropdownFilter
        label="Country"
        onChange={onFilterChange}
        endpoint="/master/countries"
        column="country_name"
        value={selectedCountryIds}
        data={selectedCountries}
      />
    )
  }

  const onReset = () => {
    setParams({...params, filters: []})
    setSelectedCountries([])
    setSelectedCountryIds([])
  }

  let [params, setParams] = useState({
    title: "Zones",
    baseRoute: "/master/destinations/form",
    endpoint: "/master/destinations",
    deleteEndpoint: "/master/batch-actions/delete/destinations",
    activationEndpoint: "/master/batch-actions/activate/destinations",
    deactivationEndpoint: "/master/batch-actions/deactivate/destinations",
    columns: [
      {
        title: "Destination Code",
        data: "destination_code",
      },
      {
        title: "Destination Name",
        data: "destination_name",
        render: renderColumn("destination", "destination_name")
      },
      {
        title: "Country",
        data: "country.country_name",
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
        title: "Translated Destination Name",
        data: "zone_translation.destination_name",
        visible: false,
      },
    ],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
