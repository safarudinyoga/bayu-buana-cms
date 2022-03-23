import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"


export default function ManageCorporateTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Integration Partner",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Intergration Partner",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    title: "Manage Corporate",
    titleModal: "Manage Corporate",
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/hotels",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
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
  return (
    <div>
      
    </div>
  )
}
