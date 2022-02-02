import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"

export default function IntegrationPartnerTable() {
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

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    title: "Integration Partner",
    titleModal: "Integration Partner",
    baseRoute: "/master/integration-partner/form",
    endpoint: "/master/hotels",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Partner Code",
        data: "integration-partner-code"
      },
      {
        title: "Partner Name",
        data: "integration-partner-name"
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      }, 
    ],
    emptyTable: "No Integration Partner found",
    recordName: ["integration-partner-code", "integration-partner-name"],
  })

  return <BBDataTable {...params} onReset={onReset} />
}