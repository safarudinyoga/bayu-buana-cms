import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import FormInputSelectAjax from 'components/form/input-select-ajax'

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
    emptyTable: "No airports found",
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

  
  const extraFilter = () => {
    return (
      <>
        <FormInputSelectAjax
            label="City"
            onChange={onFilterChangeCities}
            endpoint="/master/airports"
            column="city.city_name"
            sort="city_id"
            isGrouping={true}
            fieldGroup="city_id"
            value={selectedCityIds}       
            data={selectedCities}
            filter={`[["city_id", "is not", null],["AND"],["status", "=", 1]]`}
            type="selectmultiple"
            isFilter={true}
            placeholder="City"
            allowClear={false}
          />
      </>
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedCities([])
    setSelectedCityIds([])
  }

  return <BBDataTable extraFilter={extraFilter} onReset={onReset} {...params} />
}
