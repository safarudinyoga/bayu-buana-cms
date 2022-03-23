import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const NearbyAttractions = (props) => {
  let params = {
    title: "Nearby Attractions",
    baseRoute: "/master/hotel-profile-management/nearby-attractions/form",
    endpoint: "/master/attractions",
    deleteEndpoint: "/master/batch-actions/delete/hotel-profile-management",
    activationEndpoint:
      "/master/batch-actions/activate/hotel-profile-management",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/hotel-profile-management",
    columns: [
      {
        title: "Nearby Attraction",
        data: "attraction_name",
      },
      {
        title: "Categories",
        data: "attraction_category_names",
      },
      {
        title: "Distance (km)",
        data: "attraction_distance",
      },
    ],
    emptyTable: "No nearby attractions found",
    recordName: "hotel_name",
  }

  return (
    <Card>
      <Card.Body>
        <h3 className="card-heading">Nearby Attractions</h3>
        <div style={{ padding: "0 10px 10px" }}>
          {props.history.location.hash == "#nearby-attractions" && (
            <BBDataTable {...params} />
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default NearbyAttractions
