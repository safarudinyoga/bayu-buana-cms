import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax';

export default function CityTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Cities",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Cities",
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
        endpoint="/master/cities"
        column="country.country_name"
        sort="country_id"
        isGrouping={true}
        fieldGroup="country_id"
        value={selectedCountryIds}
        data={selectedCountries}
        filter={`["country_id", "is not", null]`}
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
    title: "Cities",
    titleModal: "City",
    baseRoute: "/master/cities/form",
    endpoint: "/master/cities",
    deleteEndpoint: "/master/batch-actions/delete/cities",
    activationEndpoint: "/master/batch-actions/activate/cities",
    deactivationEndpoint: "/master/batch-actions/deactivate/cities",
    columns: [
      {
        title: "City Code",
        data: "city_code",
      },
      {
        title: "City Name",
        data: "city_name",
        render: renderColumn("city", "city_name"),
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
        title: "Translated City Name",
        data: "city_translation.city_name",
        visible: false,
      },
    ],
    emptyTable: "No cities found",
    recordName: ["city_code", "city_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "City Name", recordName: "city_name"}, 
    ],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
