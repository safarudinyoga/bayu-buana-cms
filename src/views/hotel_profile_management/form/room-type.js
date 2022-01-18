import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const RoomType = (props) => {
  let params = {
    title: "Hotel Profile Management",
    baseRoute: "/master/room-types/form",
    endpoint: "/master/room-types",
    deleteEndpoint: "/master/batch-actions/delete/room-types",
    activationEndpoint: "/master/batch-actions/activate/room-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/room-types",
    columns: [
      {
        title: "Room Type",
        data: "room_type",
      },
      {
        title: "Max Occupancy",
        data: "max_occupancy",
      },
      {
        title: "Room Size",
        data: "room_size",
      },
      {
        title: "Number of Room",
        data: "number_of_room",
      },
    ],
    emptyTable: "No room types found",
    recordName: "hotel_name",
  }

  return (
    <Card>
      <Card.Body>
        <h3 className="card-heading">Room Types</h3>
        <div style={{ padding: "0 10px 10px" }}>
          <BBDataTable {...params} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default RoomType
