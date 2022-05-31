import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form/identity-rule"

const UserAccessType = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "User Access Type",
        breadcrumbs: [
          {
            text: "User & Access Management123",
          },
          {
            text: "User Access Type",
          },
        ],
      }),
    )
  }, [])

  let [params] = {
    isCheckbox: false,
    title: "User Access Type",
    titleModal: "User Access Type",
    baseRoute: "/master/user-access-type/form",
    endpoint: "/user/user-types",
    deleteEndpoint: "/user/batch-actions/delete/user-types",
    activationEndpoint: "/master/batch-actions/activate/user-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/user-types",
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
      <h3 className="card-heading">Identity Rule</h3>
      <BBDataTable {...params} modalContent={Form} modalSize="lg"  />
    </Card.Body>
  </Card>
  )
}

export default UserAccessType