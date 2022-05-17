import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from "components/form/input-select-ajax"

export default function FeeTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Fee Type",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Fee Type",
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
    title: "Fee Type",
    titleModal: "Fee Type",
    baseRoute: "/master/fee-type/form",
    endpoint: "/master/fee-tax-types",
    deleteEndpoint: "/master/batch-actions/delete/fee-tax-types",
    activationEndpoint: "/master/batch-actions/activate/fee-tax-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/fee-tax-types",
    columns: [
      {
        title: "Fee Type Code",
        data: "fee_tax_type_code",
      },
      {
        title: "Fee Type Name",
        data: "fee_tax_type_name",
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
    isOpenNewTab: false,
    btnDownload: ".buttons-csv",
    showInfoDelete: true,
    infoDelete: [{ title: "Fee Type Name", recordName: "fee_tax_type_name" }],
    emptyTable: "No Fee Type found",
    recordName: ["fee_tax_type_code", "fee_tax_type_name"],
  })

  return <BBDataTable {...params} onReset={onReset} />
}
