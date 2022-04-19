import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function IntegrationPartnerMessagesTable() {
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
    endpoint: "/master/message-types",
    deleteEndpoint:
      "/master/batch-actions/delete/master/message-types",
    activationEndpoint:
      "/master/batch-actions/activate/message-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/message-types",
    columns: [
      {
        title: "Messages",
        data: "message_type_name",
      },
      {
        title: "Partner Messages Code",
        data: "message_type_code",
      },
      {
        title: "Partner Messages Name",
        data: "message_type_name",
      },
    ],
    emptyTable: "No Meal Plans found",
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
          <h3 className="card-heading">Partner Messages</h3>
          <BBDataTable {...params} onReset={onReset} />
        </Card.Body>
      </Card>
    </>
  )
}
