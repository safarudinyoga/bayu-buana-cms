import React, { useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import Form from "./form"

export default function IntegrationPartnerMealPlansTable() {
  const param = useParams()

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Meal Plans",
    titleModal: "Partner Meal Plans",
    baseRoute: "/master/integration-partner-meal-plans/form",
    endpoint: `/master/integration-partner-meal-plan-types`,
    deleteEndpoint: "master/batch-actions/delete/master/integration-partner-meal-plan-types",
    columns: [
      {
        title: "Meal Plans",
        data: "meal_plan_type.meal_plan_type_name",
      },
      {
        title: "Partner Meal Plans Code",
        data: "meal_plan_type_code",
      },
      {
        title: "Partner Meal Plans Name",
        data: "meal_plan_type_name",
      },
    ],
    emptyTable: "No partner meal plans found",
    recordName: ["meal_plan_type_name"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Meal Plans</h3>
          <BBDataTable {...params} modalContent={Form} />
          {/* test */}
        </Card.Body>
      </Card>
    </>
  )
}
