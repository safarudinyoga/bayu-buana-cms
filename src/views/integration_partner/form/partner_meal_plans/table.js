import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"

export default function IntegrationPartnerMealPlansTable() {
  const dispatch = useDispatch()
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
    title: "Partner Meal Plans",
    titleModal: "Partner Meal Plans",
    baseRoute: "/master/integration-partner-meal-plans/form",
    endpoint: `/master/integration-partners/${param.id}/meal-plans`,
    deleteEndpoint: `/master/integration-partners/${param.id}/meal-plans/`,
    columns: [
      {
        title: "Meal Plans",
        data: "id",
      },
      {
        title: "Partner Meal Plans Code",
        data: "agent_id",
      },
      {
        title: "Partner Meal Plans Name",
        data: "agent",
      },
    ],
    emptyTable: "No Meal Plans found",
    recordName: ["id", "agent_id", "agent"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Meal Plans</h3>
          <BBDataTable {...params} onReset={onReset} modalContent={Form} />
          {/* test */}
        </Card.Body>
      </Card>
    </>
  )
}
