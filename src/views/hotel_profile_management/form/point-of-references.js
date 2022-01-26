import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const PointofReferences = (props) => {
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
    title: "Point of Reference",
    baseRoute: "/master/hotel-profile-management/point-of-references/form",
    endpoint: "/master/reference-points",
    deleteEndpoint: "/master/batch-actions/delete/reference-points",
    activationEndpoint: "/master/batch-actions/activate/reference-points",
    deactivationEndpoint: "/master/batch-actions/deactivate/reference-points",
    columns: [
      {
        title: "Point of Reference",
        data: "reference_point_name",
      },
      {
        title: "Categories",
        data: "reference_point_category.reference_point_category_name",
      },
      {
        title: "Distance",
        data: "reference_point_category_distance",
      },
    ],
    emptyTable: "No point of references found",
    recordName: "reference_point_name",
  }

  return (
    <Card>
      <Card.Body>
        <h3 className="card-heading">Point of References</h3>
        <div style={{ padding: "0 10px 10px" }}>
          {props.history.location.hash == "#point-of-references" && (
            <BBDataTable {...params} />
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default PointofReferences
