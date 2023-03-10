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
            text: "Setup And Configurations",
          },
          {
            text: "Integration Partner",
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
    isCheckbox: false,
    customSort:["integration_partner_code"],
    titleModal: "Integration Partner",
    baseRoute: "/master/integration-partner/form",
    endpoint: "/master/integration-partners",
    deleteEndpoint: "/master/batch-actions/delete/hotels",
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Partner Code",
        data: "integration_partner_code"
      },
      {
        title: "Partner Name",
        data: "integration_partner_name"
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      }, 
    ],
    btnDownload: ".buttons-csv",
    isOpenNewTab: false,
    emptyTable: "No integration partners found",
    recordName: ["integration-partner-code", "integration-partner-name"],
    module:"integration-partner",
    advancedOptionsText: "Advanced options",
    customFilterStatus: {
      value: "",
      options: [
        {value: "1", label: "Active"},
        {value: "3", label: "Inactive"},
      ]
    }
  })

  return <BBDataTable {...params} onReset={onReset} />
}
