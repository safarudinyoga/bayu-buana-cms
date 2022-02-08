import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function CountryTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Countries",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Countries",
          },
        ],
      }),
    )
  }, [])

  let [selectedRegions, setSelectedRegions] = useState([])
  let [selectedRegionIds, setSelectedRegionIds] = useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({ ...params, filters: [["region_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [] })
    }
    setSelectedRegions(values)
    setSelectedRegionIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Region"
        onChange={onFilterChange}
        endpoint="/master/countries"
        column="region.region_name"
        sort="region_id"
        isGrouping={true}
        fieldGroup="region_id"
        value={selectedRegionIds}
        data={selectedRegions}
        placeholder="Region"
        filter={`[["region_id", "is not", null],["AND"],["status", "=", 1]]`}
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedRegions([])
    setSelectedRegionIds([])
  }

  let [params, setParams] = useState({
    title: "Countries",
    titleModal: "Country",
    baseRoute: "/master/countries/form",
    endpoint: "/master/countries",
    deleteEndpoint: "/master/batch-actions/delete/countries",
    activationEndpoint: "/master/batch-actions/activate/countries",
    deactivationEndpoint: "/master/batch-actions/deactivate/countries",
    columns: [
      {
        title: "Country Code",
        data: "country_code",
      },
      {
        title: "Country Name",
        data: "country_name",
        render: renderColumn("country", "country_name"),
      },
      {
        title: "Region",
        data: "region.region_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Country Name",
        data: "country_translation.country_name",
        visible: false,
      },
    ],
    emptyTable: "No countries found",
    recordName: ["country_code", "country_name"],
  })
  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
