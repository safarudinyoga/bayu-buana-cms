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
            text: "Setup and Configurations",
          },
          {
            text: "Frequent Traveler Program",
          },
        ],
      }),
    )
  }, [])

  let [selectedProductTypes, setSelectedProductTypes] = useState([])
  let [selectedProductTypeIds, setSelectedProductTypeIds] = useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({ ...params, filters: [["product_type_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [] })
    }
    setSelectedProductTypes(values)
    setSelectedProductTypeIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Product Type"
        onChange={onFilterChange}
        endpoint="/master/loyalty-programs"
        column="product_type.product_type_name"
        sort="product_type_id"
        isGrouping={true}
        fieldGroup="product_type_id"
        value={selectedProductTypeIds}
        data={selectedProductTypes}
        filter={`[["product_type_id", "is not", null],["AND"],["status", "=", 1]]`}
        placeholder="Please choose"
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedProductTypes([])
    setSelectedProductTypeIds([])
  }

  let [params, setParams] = useState({
    title: "Frequent Traveler Program",
    titleModal: "Frequent Traveler Program",
    baseRoute: "/master/frequent-traveler-program/form",
    endpoint: "/master/loyalty-programs",
    deleteEndpoint: "/master/batch-actions/delete/loyalty-program",
    activationEndpoint: "/master/batch-actions/activate/loyalty-programs",
    deactivationEndpoint: "/master/batch-actions/deactivate/loyalty-programs",
    columns: [
      {
        title: "Loyalty Name",
        data: "loyalty_program_name",
        render: renderColumn("loyalty_program", "loyalty_program_name"),  
      },
      {
        title: "Type",
        data: "product_type.product_type_name",        
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
      {
        title: "Translated Frequent Traveler Program",
        data: "loyalty_program.loyalty_program_name",
        visible: false,
      },   
    ],
    emptyTable: "No frequent traveler program found",
    recordName: ["loyalty_program_name"],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
