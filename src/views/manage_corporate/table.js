import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import BbDataTable from 'components/table/bb-data-table'


export default function ManageCorporateTable() {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Manage Corporate",
        breadcrumbs: [
          {
            // text: "Master Data Management", !old
            text: "Corporate Management",
          },
          {
            // text: "Intergration Partner", !old
            text: 'Manage Corporate'
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    title: "Manage Corporate",
    titleModal: "Manage Corporate",
    showAdvancedOptions: false,
    responsiveTablet: true,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/hotels",
    // deleteEndpoint: "/master/batch-actions/delete/hotels",
    // activationEndpoint: "/master/batch-actions/activate/hotels",
    // deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Corporate Code",
        data: "manage-corporate-code"
      },
      {
        title: "Corporate Name",
        data: "manage-corporate-name"
      },
      {
        title: "Travel Consultant",
        data: "manage-corporate-travel-consultant"
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],
    emptyTable: "No Corporate found",
    recordName: ["manage-corporate-code", "manage-corporate-name"],
  })

  const onReset = () => {
    setParams({...params, filters: []})
  }

  return <BbDataTable {...params} onReset={onReset} />
}
