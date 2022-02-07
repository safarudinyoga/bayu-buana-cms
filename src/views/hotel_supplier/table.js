import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function HotelSupplierTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Suppliers",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Suppliers",
          },
        ],
      }),
    )
  }, [])

  let [SelectedSupplierTypes, setSelectedSupplierTypes] = React.useState([])
  let [SelectedSupplierTypeIds, setSelectedSupplierTypeIds] = React.useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({...params, filters: [["supplier_type_id", "in", ids]]})
    } else {
      setParams({...params, filters: []})
    }
    setSelectedSupplierTypes(values)
    setSelectedSupplierTypeIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Supplier Type"
        onChange={onFilterChange}
        endpoint="/master/hotel-suppliers"
        column="supplier_type.supplier_type_name"
        sort="supplier_type_id"
        isGrouping={true}
        fieldGroup="supplier_type_id"
        value={SelectedSupplierTypeIds}
        data={SelectedSupplierTypes}
        filter={`[["supplier_type_id", "is not", null],["AND"],["status", "=", 1]]`}
        placeholder="Supplier Type"
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }

  const onReset = () => {
    setParams({...params, filters: []})
    setSelectedSupplierTypes([])
    setSelectedSupplierTypeIds([])
  }

  let [params, setParams] = useState({
    title: "Hotel Suppliers",
    titleModal: "Hotel Supplier",
    baseRoute: "/master/hotel-suppliers/form",
    endpoint: "/master/hotel-suppliers",
    deleteEndpoint: "/master/batch-actions/delete/hotel-suppliers",
    activationEndpoint: "/master/batch-actions/activate/hotel-suppliers",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotel-suppliers",
    columns: [
      {
        title: "Hotel Supplier Code",
        data: "hotel_supplier_code",
      },
      {
        title: "Hotel Supplier Name",
        data: "hotel_supplier_name",
        render: renderColumn("hotel_supplier", "hotel_supplier_name"),
      },
      {
        title: "Supplier Type",
        data: "supplier_type.supplier_type_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Hotel Supplier Name",
        data: "hotel_supplier_translation.hotel_supplier_name",
        visible: false,
      },
    ],
    emptyTable: "No hotel suppliers found",
    recordName: ["hotel_supplier_code", "hotel_supplier_name"],
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} {...params} />
}
