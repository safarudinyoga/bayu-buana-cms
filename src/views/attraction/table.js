import BBDataTable from "components/table/bb-data-table"
import TableDropdownFilter from "components/table/table-dropdown-filter"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import { renderColumn } from "lib/translation"

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
        render: renderColumn("attraction", "attraction_name"),
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
        data: "attraction_category_names",
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
    recordName: "attraction_name",
  })

  const onFilterChangeAttractionCategories = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(
          ["attraction_category_names", "like", values[i].attraction_category_name],
        )

        if(parseInt(i)+1 != values.length) {
          columns.push(["OR"])
        }
      }
    }
    let findFilter = params.filters ? params.filters.filter(v => v[0][0] !== "attraction_category_names") : []
    if (columns.length > 0) {
      setParams({...params, filters: [...findFilter, columns]})
    } else {
      setParams({...params, filters: [...findFilter]})
    }
    setSelectedAttractionCategories(values)
    setSelectedAttractionCategoryIds(ids)

    console.log(params);
  }

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
    let findFilter = params.filters ? params.filters.filter(v => v[0] !== "city_id") : []
    if (ids.length > 0) {
      setParams({...params, filters: [...findFilter, ["city_id", "in", ids]]})
    } else {
      setParams({...params, filters: [...findFilter]})
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
