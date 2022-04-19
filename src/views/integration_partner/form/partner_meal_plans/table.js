import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function IntegrationPartnerMealPlansTable() {
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
    endpoint: "/master/integration-partner-meal-plan-types",
    deleteEndpoint:
      "/master/batch-actions/delete/master/integration-partner-meal-plan-types",
    activationEndpoint:
      "/master/batch-actions/activate/integration-partner-meal-plan-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/integration-partner-meal-plan-types",
    columns: [
      {
        title: "Meal Plan",
        data: "meal_plan_type.cabin_type_name",
      },
      {
        title: "Partner Meal Plan Code",
        data: "meal_plan_type_code",
      },
      {
        title: "Partner Meal Plan Name",
        data: "meal_plan_type_name",
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
          <h3 className="card-heading">Partner Meal Plans</h3>
          <BBDataTable {...params} onReset={onReset} />
        </Card.Body>
      </Card>
    </>
  )
}
