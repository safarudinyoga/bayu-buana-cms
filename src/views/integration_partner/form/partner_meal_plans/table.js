import React, { useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import Form from "./form"
import FormDelete from "./form-delete"

export default function IntegrationPartnerMealPlansTable() {
  const param = useParams()
  const { id } = useParams()
  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    modalDelete: true,
    title: "Partner Meal Plans",
    titleModal: "Partner Meal Plans",
    baseRoute: "/master/integration-partner-meal-plans/form",
    endpoint: `/master/integration-partners/${id}/meal-plans`,
    deleteEndpoint: "master/batch-actions/delete/master/integration-partner-meal-plan-types",
    btnDownload: ".buttons-csv",
    columns: [
      {
        title: "Meal Plan",
        data: "meal_plan_type.meal_plan_type_name",
      },
      {
        title: "Partner Meal Plan Code",
        data: "integration_partner_meal_plan_type.meal_plan_type_code",
      },
      {
        title: "Partner Meal Plan Name",
        data: "integration_partner_meal_plan_type.meal_plan_type_name",
      },
    ],
    emptyTable: "No Partner Meal Plans found",
    recordName: ["meal_plan_type_name"],
    searchText: "Search",
    module: "partner-meal-plan",
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Meal Plans</h3>
          <BBDataTable {...params} modalContent={Form} modalDeleteContent={FormDelete} />
          {/* test */}
        </Card.Body>
      </Card>
    </>
  )
}
