import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import { Card } from "react-bootstrap"
// import Form from "../form/branch-office"
import Form from '../../corporate_branch_office/forms/branch_offices'

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
    isHideSearch: true,
    createOnModal: true,
    customSort: ["sort", "office_name"],
    module: "branch-office",
    showAdvancedOptions: false,
    responsiveTablet: true,
    title: "Branch Offices",
    titleModal: "Company/ Branch Office",
    baseRoute: "/master/branch-offices/form",
    endpoint: "/master/officess",
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
        title: "Phone Number",
        data: "phone_number",
      },
      {
        title: "Geo Location",
        data: "latitude",
      },
    ],
    emptyTable: "No offices found",
    recordName: "office_name",
    showInfoDelete: true,
    infoDelete: [
      { title: "Company/ Branch Office Name", recordName: "office_name" },
    ],
    isOpenNewTab: false,
    // actionWidthClass: "custom-action",
  })

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h4>Branch Offices</h4>
          <BBDataTable {...params} onReset={onReset} modalContent={Form} />
        </Card.Body>
      </Card>
    </>
  )
}
