import BBDataTable from "components/table/bb-data-table"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import Form from "./form"
import { Card } from "react-bootstrap"

export default function IdentityRuleTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "General Setup",
        breadcrumbs: [
          {
            text: "Setup and Configuration",
          },
          {
            text: "Identity Rule",
          },
        ],
      }),
    )
  }, [])

  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Identity Rule",
    titleModal: "Identity Rule",
    baseRoute: "/master/identity-rules/form",
    endpoint: "/master/configurations/identity-rules",
    deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
    columns: [
      {
        title: "Type",
        data: "identity_name",
      },
      {
        title: "Prefix",
        data: "prefix",
      },
      {
        title: "Dynamic Prefix",
        data: "dynamic_prefix",
      },
      {
        title: "Next Number",
        data: "next_number",
      },
    ],
    emptyTable: "No Identity Rule found",
    recordName: ["identity_code", "identity_name"],
    btnDownload: ".buttons-csv",
    module: "identity-rules"
  }

  return (
    <Card style={{marginBottom: 0}}>
        <Card.Body className="px-1 px-md-4">
          <h3 className="card-heading">Identity Rule</h3>
          <BBDataTable {...params} modalContent={Form} modalSize="lg" />
        </Card.Body>
      </Card>
  )
}
