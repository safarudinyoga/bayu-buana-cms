import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { Card, Form, Row, Col, Button, Image, Tab, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ReactSVG } from "react-svg"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function IntegrationPartnerCabinTypesTable() {
  const [tabKey, setTabKey] = useState("partner-cabin")
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

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
    baseRoute: "/master/integration-partner-cabin-types/form",
    endpoint: "/master/integration-partner-cabin-types",
    deleteEndpoint:
      "/master/batch-actions/delete/master/integration-partner-cabin-types",
    activationEndpoint:
      "/master/batch-actions/activate/integration-partner-cabin-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/integration-partner-cabin-types",
    columns: [
      {
        title: "Cabin",
        data: "cabin_type.cabin_type_name",
      },
      {
        title: "Partner Cabin Code",
        data: "cabin_type_code",
      },
      {
        title: "Partner Cabin Name",
        data: "cabin_type_name",
      },
    ],
    emptyTable: "No Partner Cabins found",
    recordName: [
      "cabin_type.cabin_type_name",
      "cabin_type_code",
      "cabin_type_name",
    ],
  })

  return (
    <>
      
                <Card>
                  <Card.Body>
                    <h3 className="card-heading">Partner Cabins</h3>
                    <BBDataTable {...params} onReset={onReset} />
                  </Card.Body>
                </Card>
          
    </>
  )
}
