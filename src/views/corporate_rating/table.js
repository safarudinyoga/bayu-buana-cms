import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function CorporateRatingTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Corporate Rating",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Corporate Rating",
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

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedCountries([])
    setSelectedCountryIds([])
  }

  let [params, setParams] = useState({
    title: "Corporate Rating",
    titleModal: "Corporate Rating",
    baseRoute: "/master/corporate-rating/form",
    endpoint: "/master/hotels",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Rating Code",
        data: "rating-code",
      },
      {
        title: "Rating Name",
        data: "rating-name",        
      },
      {
        title: "Rating",
        data: "rating",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },      
    ],
    emptyTable: "No Corporate Rating found",
    recordName: ["rating-code", "rating-name"],
  })

  return <BBDataTable {...params} onReset={onReset} />
}
