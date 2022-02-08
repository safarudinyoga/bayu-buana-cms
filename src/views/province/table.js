import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function ProvinceTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "States / Provinces",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "States / Provinces",
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
      setParams({ ...params, filters: [["country_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [] })
    }
    setSelectedCountries(values)
    setSelectedCountryIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Country"
        onChange={onFilterChange}
        endpoint="/master/state-provinces"
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
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedCountries([])
    setSelectedCountryIds([])
  }

  let [params, setParams] = useState({
    title: "State / Provinces",
    titleModal: "State / Province",
    baseRoute: "/master/provinces/form",
    endpoint: "/master/state-provinces",
    deleteEndpoint: "/master/batch-actions/delete/state-provinces",
    activationEndpoint: "/master/batch-actions/activate/state-provinces",
    deactivationEndpoint: "/master/batch-actions/deactivate/state-provinces",
    columns: [
      {
        title: "State / Province Code",
        data: "state_province_code",
      },
      {
        title: "State / Province Name",
        data: "state_province_name",
        render: renderColumn("province", "state_province_name"),
      },
      {
        title: "Country",
        data: "country.country_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated State / Province Name",
        data: "state_province_translation.state_province_name",
        visible: false,
      },
    ],
    emptyTable: "No state / provinces found",
    recordName: ["state_province_code", "state_province_name"],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
