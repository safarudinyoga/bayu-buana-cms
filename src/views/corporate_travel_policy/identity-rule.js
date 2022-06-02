import rowStatus from 'lib/row-status'
import React, { useEffect } from 'react'
import { Card } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import BBDataTable from "../../components/table/bb-data-table"
import Form from "./form/identity-rule"

const IdentityRule = (props) => {

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Travel Policy",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: "Travel Policy",
          },
        ],
      }),
    )
  }, [])

  let params = {
    showAdvancedOptions: false,
    title: "Identity Rule",
    titleModal: "Destinations Restrictions",
    baseRoute: "/master/identity-rules/form",
    endpoint: "/master/configurations/identity-rules",
    deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
    columns: [
      {
        title: "Restriction Base On",
        data: "restriction_base_on",
      },
      {
        title: "Destination Name",
        data: "destination_name",
      },
      {
        title: "Type of Restriction",
        data: "type_of_restriction",
      },
      {
        title: "Document(s)",
        data: "document_name",
      },
      {
        title: "Status",
        data: "status",
        render: rowStatus,
      }
    ],
    emptyTable: "No Identity Rule found",
    recordName: ["identity_code", "identity_name"],
    btnDownload: ".buttons-csv",
    module: "identity-rules",
    isCheckbox: false,
    switchStatus: true,
  }

  return (
    <Card style={{marginBottom: 0}}>
        <Card.Body className="px-1 px-md-4">
          <h3 className="card-heading">Identity Rule</h3>
          <BBDataTable {...params} modalContent={Form} modalSize="lg"  />
        </Card.Body>
      </Card>
  )

}

export default IdentityRule;
