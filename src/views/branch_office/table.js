import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function OfficeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Manage Branch Office",
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

  let [params, setParams] = useState({
    isCheckbox: false,
    customSort:["sort", "office_name"],
    module: "branch-office",
    showAdvancedOptions: false,
    responsiveTablet: true,
    title: "Branch Offices",
    titleModal: "Company/ Branch Office",
    baseRoute: "/master/branch-offices/form",
    endpoint: "/master/offices",
    deleteEndpoint: "/master/batch-actions/delete/offices",
    activationEndpoint: "/master/batch-actions/activate/offices",
    deactivationEndpoint: "/master/batch-actions/deactivate/offices",
    columns: [
      {
        title: "Company/ Branch Name",
        data: "office_name",
        render: renderColumn("office", "office_name"),
      },
      {
        title: "Address",
        data: "address_line",
      },
      {
        title: "",
        data: "city.city_name",
        visible: false
      },
      {
        title: "",
        data: "postal_code",
        visible: false
      },
      {
        title: "",
        data: "state_province.state_province_name",
        visible: false
      },
      {
        title: "",
        data: "country.country_name",
        visible: false
      },
      {
        title: "Phone Number",
        data: "phone_number",
      },
      {
        title: "Operational Hour",
        data: "operation_hours",
      },
      {
        title: "Translated Company/ Branch Office Name",
        data: "office_translation.office_name",
        visible: false,
      },
    ],
    emptyTable: "No offices found",
    recordName: "office_name",
    showInfoDelete: true,
    switchStatus: true,
    infoDelete: [
      {title: "Company/ Branch Office Name", recordName: "office_name"}, 
    ],
    isOpenNewTab: false,
    isPartner:true,
    btnDownload: ".buttons-csv",
    // actionWidthClass: "custom-action",
  })

  

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  return <BBDataTable {...params} onReset={onReset} />
}
