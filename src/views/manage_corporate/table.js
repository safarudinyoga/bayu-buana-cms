import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import rowStatus from "lib/row-status"
import BbDataTable from 'components/table/bb-data-table'
import './manage_corporate.css'


export default function ManageCorporateTable() {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Manage Corporate",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: 'Manage Corporate'
          },
        ],
      }),
    )
  }, [])

  const params = {
    isCheckbox: false,
    title: "Manage Corporate",
    titleModal: "Manage Corporate",
    module: 'manage-corporate',
    showAdvancedOptions: false,
    responsiveTablet: true,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/agent-corporates",
    columns: [
      {
        title: "Corporate Code",
        data: "agent_corporate.corporate.corporate_code"
      },
      {
        title: "Corporate Name",
        data: "agent_corporate",
        render: (data) => {
          return (
            `
              <h5 class="font-default size-15" style='margin-bottom: 3px;'>${data.corporate.corporate_name}</h5>
              <h5 class="font-default size-14 margin-0">Group&nbsp;&nbsp;: ${data.corporate.corporate_code}</h5>
              <div class="Stars" style="--rating: 2.3;">
            `
          )
        }
      },
      {
        title: "Travel Consultant",
        data: ""
      },
      {
        searchable: false,
        title: "Status",
        data: "agent_corporate.corporate.status",
        render: rowStatus,
      },
    ],
    emptyTable: "No Corporates found",
    recordName: ["agent_corporate.corporate.corporate_code", "agent_corporate.corporate.corporate_name"],
    switchStatus: true,
    customFilterStatus: {
      value: "",
      options: [
        { value: "1", label: "Active" },
        { value: "3", label: "Inactive" },
      ],
    },
    showInfoDelete: true,
    infoDelete: [
      {title: "Corporate Code", recordName: "agent_corporate.corporate.corporate_code"},
      {title: "Corporate Name", recordName: "agent_corporate.corporate.corporate_name"},
    ],
    id: 'agent_corporate.id'
  }

  return <BbDataTable {...params} />
}
