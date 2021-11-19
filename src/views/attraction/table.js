import BBDataTable from "components/table/bb-data-table"
import TableDropdownFilter from "components/table/table-dropdown-filter"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function AttractionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Attractions",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Attractions",
          },
        ],
      }),
    )
  }, [])

  let [selectedCities, setSelectedCities] = useState([])
  let [selectedCityIds, setSelectedCityIds] = useState([])
  let [selectedCountries, setSelectedCountries] = useState([])
  let [selectedCountryIds, setSelectedCountryIds] = useState([])
  let [selectedAttractionCategories, setSelectedAttractionCategories] = useState([])
  let [selectedAttractionCategoryIds, setSelectedAttractionCategoryIds] = useState([])

  let [params, setParams] = useState({
    title: "Attractions",
    baseRoute: "/master/attractions/form",
    endpoint: "/master/attractions",
    deleteEndpoint: "/master/batch-actions/delete/attractions",
    activationEndpoint: "/master/batch-actions/activate/attractions",
    deactivationEndpoint: "/master/batch-actions/deactivate/attractions",
    columns: [
      {
        title: "Attraction Name",
        data: "attraction_name",
      },
      {
        title: "City",
        data: "city.city_name",
      },
      {
        title: "Country",
        data: "country.country_name",
      },
      {
        title: "Attraction Category",
        data: "attraction_category.attraction_category_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Attraction Name",
        data: "attraction_translation.attraction_name",
        visible: false,
      },
    ],
  })

  const onFilterChangeAttractionCategories = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({...params, filters: [["attraction_category_id", "in", ids]]})
    } else {
      setParams({...params, filters: []})
    }
    setSelectedAttractionCategories(values)
    setSelectedAttractionCategoryIds(ids)
  }

  const onFilterChangeCountries = (e, values) => {
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

  const onFilterChangeCities = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({...params, filters: [["city_id", "in", ids]]})
    } else {
      setParams({...params, filters: []})
    }
    setSelectedCities(values)
    setSelectedCityIds(ids)
  }

  const extraFilter = () => {
    return (
      <>
        <TableDropdownFilter
          label="City"
          onChange={onFilterChangeCities}
          endpoint="/master/cities"
          column="city_name"
          value={selectedCityIds}
          data={selectedCities}
        />
        <TableDropdownFilter
          label="Country"
          onChange={onFilterChangeCountries}
          endpoint="/master/countries"
          column="country_name"
          value={selectedCountryIds}
          data={selectedCountries}
        />
        <TableDropdownFilter
          label="Attraction Category"
          onChange={onFilterChangeAttractionCategories}
          endpoint="/master/attraction-categories"
          column="attraction_category_name"
          value={selectedAttractionCategoryIds}
          data={selectedAttractionCategories}
        />
      </>
    )
  }

  const onReset = () => {
    setParams({...params, filters: []})
    setSelectedCities([])
    setSelectedCityIds([])
    setSelectedCountries([])
    setSelectedCountryIds([])
    setSelectedAttractionCategories([])
    setSelectedAttractionCategoryIds([])

  }

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
