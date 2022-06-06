import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
// import Form from "./form/identity-rule"

const TravelPolicyDocument = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Travel Policy Document",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: "Travel Policy Document",
          },
        ],
      }),
    )
  }, [])

  let params = {
    isCheckbox: false,
    title: "User Access Type",
    titleModal: "User Access Type",
    baseRoute: "/master/identity-rules/form",
    endpoint: "/master/configurations/identity-rules",
    deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
    columns: [

      {
        title: "Code",
        data: "user_type_code",
      },
      {
        title: "Name",
        data: "user_type_name",
      },
      {
        title: "Number of assigned modules345",
        data: "user_type_name",
      },
      {
        title: "Number of assigned users",
        data: "user_type_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],
    emptyTable: "No user access type found",
    recordName: ["user_type_code", "user_type_name"],
    switchStatus: true,
    customFilterStatus: {
      value: "",
      options: [
        { value: "1", label: "Active" },
        { value: "3", label: "Inactive" },
      ],
    },
  }


  return  (
    <Card style={{marginBottom: 0}}>
    <Card.Body className="px-1 px-md-4">
      <h3 className="card-heading">Travel Policy Document</h3>
      <BBDataTable {...params} modalSize="lg"  />
    </Card.Body>
  </Card>
  )
}

export default TravelPolicyDocument