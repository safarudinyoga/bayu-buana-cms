import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function IntegrationPartnerPaymentGatewayTable() {
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
    isCheckbox: false,
    title: "Integration Partner",
    titleModal: "Integration Partner",
    baseRoute: "/master/integration-partner-meal-plans",
    endpoint: "/master/payment-types",
    deleteEndpoint:
      "/master/batch-actions/delete/master/payment-types",
    activationEndpoint:
      "/master/batch-actions/activate/payment-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/payment-types",
    columns: [
      {
        title: "Payment Gateway Code",
        data: "payment_type_code",
      },
      {
        title: "Payment Gateway Name",
        data: "payment_type_name",
      },
    ],
    emptyTable: "No Payment Gateways found",
    recordName: [
      "meal_plan_type.meal_plan_type_name",
      "meal_plan_type_code",
      "meal_plan_type_name",
    ],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Payment Gateways</h3>
          <BBDataTable {...params} onReset={onReset} />
        </Card.Body>
      </Card>
    </>
  )
}
