import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const PointofReferences = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Profile Management",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Profile Management",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Hotel Profile Management",
    baseRoute: "/master/hotel-profile-management/form",
    endpoint: "/master/hotel-profile-management",
    deleteEndpoint: "/master/batch-actions/delete/hotel-profile-management",
    activationEndpoint:
      "/master/batch-actions/activate/hotel-profile-management",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/hotel-profile-management",
    columns: [
      {
        title: "Hotel Name",
        data: "hotel_name",
      },
      {
        title: "Location",
        data: "location",
      },
      {
        title: "Chain/Brand",
        data: "chain_brand",
      },
    ],
    emptyTable: "No hotels found",
    recordName: "hotel_name",
  }

  return (
    <Card>
      <Card.Body>
        <h3 className="card-heading">Point of References</h3>
        <div style={{ padding: "0 10px 10px" }}>
          <BBDataTable {...params} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default PointofReferences
