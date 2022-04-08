import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import FormInputSelectAjax from "components/form/input-select-ajax"

export default function HotelBrandTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Profile Management",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Profile Management",
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
    title: "Hotel Profile Management",
    baseRoute: "/master/hotel-profile-management/form#general-information",
    endpoint: "/master/hotels",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Hotel Name",
        data: "hotel_name",
      },
      {
        title: "Hotel Rating",
        data: "hotel_rating",
      },
      {
        title: "Location",
        data: "location",
      },
      {
        title: "Chain/Brand",
        data: "hotel_brand_id",
      },
    ],
    emptyTable: "No hotels found",
    recordName: "hotel_name",
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
