import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import FormInputSelectAjax from "components/form/input-select-ajax"

export default function BranchOfficeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Branch Offices",
        breadcrumbs: [
          {
            text: "Employment Management",
          },
          {
            text: "Branch Offices",
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
    title: "Branch Offices",
    baseRoute: "/master/branch-offices/form",
    endpoint: "/master/branch-offices",
    deleteEndpoint: "/master/batch-actions/delete/branch-offices",
    activationEndpoint: "/master/batch-actions/activate/branch-offices",
    deactivationEndpoint: "/master/batch-actions/deactivate/branch-offices",
    columns: [
      {
        title: "Company/Branch Name",
        data: "branch_office_name",
      },
      {
        title: "Address",
        data: "branch_office_address",
      },
      {
        title: "Phone Number",
        data: "branch_office_phone",
      },
      {
        title: "Operational Hour",
        data: "branch_office_operational_hours",
      },
    ],
    emptyTable: "No Branch Offices found",
    recordName: ["branch_office_code", "branch_office_name"],
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

  const extraFilter = () => {
    return (
      <>
        <FormInputSelectAjax
          label="City"
          onChange={onFilterChangeCities}
          endpoint="/master/cities"
          column="city_name"
          value={selectedCityIds}
          data={selectedCities}
          filter={`["status", "=", 1]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="Please choose"
        />
        <FormInputSelectAjax
          label="Country"
          onChange={onFilterChangeCountries}
          endpoint="/master/countries"
          column="country_name"
          value={selectedCountryIds}
          data={selectedCountries}
          filter={`["status", "=", 1]`}
          placeholder="Please choose"
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

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
