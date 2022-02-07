import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

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

  let [selectedCities, setSelectedCities] = useState([])
  let [selectedCityIds, setSelectedCityIds] = useState([])
  let [selectedCountries, setSelectedCountries] = useState([])
  let [selectedCountryIds, setSelectedCountryIds] = useState([])

  const onFilterChangeCountries = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    let findFilter = params.filters ? params.filters.filter(v => v[0] !== "country.id") : []
    if (ids.length > 0) {
      setParams({...params, filters: [...findFilter, ["country.id", "in", ids]]})
    } else {
      setParams({...params, filters: [...findFilter]})
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
    let findFilter = params.filters ? params.filters.filter(v => v[0] !== "destination_city_id") : []
    if (ids.length > 0) {
      setParams({...params, filters: [...findFilter, ["destination_city_id", "in", ids]]})
    } else {
      setParams({...params, filters: [...findFilter]})
    }
    setSelectedCities(values)
    setSelectedCityIds(ids)
  }

  const extraFilter = () => {
    return (
      <>
        <FormInputSelectAjax
          label="City"
          onChange={onFilterChangeCities}
          endpoint="/master/destinations"
          column="destination_city.city_name"
          sort="destination_city_id"
          isGrouping={true}
          fieldGroup="destination_city_id"
          value={selectedCityIds}
          data={selectedCities}
          filter={`[["destination_city_id", "is not", null],["AND"],["status", "=", 1]]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="City"
        />
        <FormInputSelectAjax
          label="Country"
          onChange={onFilterChangeCountries}
          endpoint="/master/destinations"
          column="country.country_name"
          sort="country_id"
          isGrouping={true}
          fieldGroup="country_id"
          value={selectedCountryIds}
          data={selectedCountries}
          filter={`[["country_id", "is not", null],["AND"],["status", "=", 1]]`}
          placeholder="Country"
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
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

  let [params, setParams] = useState({
    title: "Destinations",
    titleModal: "Destination",
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
        render: renderColumn("destination", "destination_name"),
      },
      {
        title: "Country",
        data: "country.country_name",
      },
      {
        title: "City",
        data: "destination_city.city_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Destination Name",
        data: "destination_translation.destination_name",
        visible: false,
      },
    ],
    emptyTable: "No destinations found",
    recordName: ["destination_code", "destination_name"],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
