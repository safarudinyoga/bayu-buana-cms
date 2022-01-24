import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function FrequentTravelerProgramTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Frequent Traveler Program",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Frequent Traveler Program",
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
        label="Program Type"
        onChange={onFilterChange}
        endpoint="/master/hotels"
        column="type"
        value={selectedCountryIds}
        data={selectedCountries}
        filter={`["status", "=", 1]`}
        placeholder="Type"
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
    title: "Frequent Traveler Program",
    titleModal: "Frequent Traveler Program",
    baseRoute: "/master/frequent-traveler-program/form",
    endpoint: "/master/hotels",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Loyalty Name",
        data: "loyalty_name",
      },
      {
        title: "Type",
        data: "type",        
      },
      {
        title: "Description",
        data: "description",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },      
    ],
    emptyTable: "No frequent traveler program found",
    recordName: ["loyalty_name"],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
