import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"

export default function IntegrationMessageTable() {
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
    title: "Partner Message",
    titleModal: "Partner Message",
    baseRoute: "/master/integration-partner-messages/form",
    endpoint: `/master/integration-partners/${param.id}/messages`,
    deleteEndpoint: `/master/integration-partners/${param.id}/messages/`,
    columns: [
      {
        title: "Messages",
        data: "message_name",
      },
      {
        title: "Partner Messages Code",
        data: "message_id",
      },
      {
        title: "Partner Messages Name",
        data: "message_name",
      },
    ],
    emptyTable: "No Meal Plans found",
    recordName: ["message_name", "message_id", "message_name"],
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
