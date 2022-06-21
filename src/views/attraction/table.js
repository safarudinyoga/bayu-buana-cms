import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import { renderColumn } from "lib/translation"
import FormInputSelectAjax from 'components/form/input-select-ajax'

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
    titleModal: "Attraction",
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
        render: (val) => !val ? "" : val,
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
    emptyTable: "No attractions found",
    recordName: "attraction_name",
    showInfoDelete: true,
    infoDelete: [
      {title: "Attraction Name", recordName: "attraction_name"}, 
    ],
  })

  const onFilterChangeAttractionCategories = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(
          ["attraction_category_names", "like", values[i].text],
        )

        if(parseInt(i)+1 !== values.length) {
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
        <FormInputSelectAjax
          label="Country"
          onChange={onFilterChangeCountries}
          endpoint="/master/attractions"
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
        <FormInputSelectAjax
          label="City"
          onChange={onFilterChangeCities}
          endpoint="/master/attractions"
          column="city.city_name"
          sort="city_id"
          isGrouping={true}
          fieldGroup="city_id"
          value={selectedCityIds}       
          data={selectedCities}
          filter={`["city_id", "is not", null]`}
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
          placeholder="City"
        />
        <FormInputSelectAjax
          label="Attraction Category"
          onChange={onFilterChangeAttractionCategories}
          endpoint="/master/attractions"
          column="attraction_category.attraction_category_name"
          sort="attraction_category_names"
          isGrouping={true}
          fieldGroup="attraction_category_id"
          isArray={true}
          fieldArray="attraction_category_attraction"
          value={selectedAttractionCategoryIds}
          data={selectedAttractionCategories}
          filter={`["attraction_category_names", "is not", null]`}
          placeholder="Attraction Category"
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
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
