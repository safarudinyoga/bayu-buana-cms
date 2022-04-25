import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"

export default function IntegrationPartnerPaymentGatewayTable() {
  let dispatch = useDispatch()
  const param = useParams()

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
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Payment Gateway",
    titleModal: "Partner Payment Gateway",
    baseRoute: "/master/integration-payment-gateway/form",
    endpoint: `/master/integration-partners/${param.id}/payment-gateways`,
    deleteEndpoint: `/master/integration-partners/${param.id}/payment-gateways`,
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
    emptyTable: "No Payment Gateways found",
    recordName: ["channel_code", "channel_code"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Payment Gateways</h3>
          <BBDataTable {...params} onReset={onReset} modalContent={Form} />
        </Card.Body>
      </Card>
    </>
  )
}
