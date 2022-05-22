import React, { useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import Form from "./form"

export default function IntegrationPartnerPaymentGatewayTable() {
  const param = useParams()

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Payment Gateway",
    titleModal: "Partner Payment Gateway",
    baseRoute: "/master/integration-payment-gateway/form",
    endpoint: `/master/integration-partners/${param.id}/payment-gateways`,
    deleteEndpoint: `/master/integration-partners/${param.id}/payment-gateways`,
    btnDownload: ".buttons-csv",
    columns: [
      {
        title: "Payment Gateway Code",
        data: "channel_code",
      },
      {
        title: "Payment Gateway Name",
        data: "channel_code",
      },
    ],
    emptyTable: "No Partner Payment Gateways Found",
    recordName: ["channel_code", "channel_code"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Payment Gateways</h3>
          <BBDataTable {...params} modalContent={Form} />
        </Card.Body>
      </Card>
    </>
  )
}
