import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function UserAccessTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "User Access Type",
        breadcrumbs: [
          {
            text: "User & Access Management",
          },
          {
            text: "User Access Type",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "User Access Type",
    titleModal: "User Access Type",
    baseRoute: "/master/user-access-type/form",
    endpoint: "/user/access-types",
    // deleteEndpoint: "/user/batch-actions/delete/access-types",
    // activationEndpoint: "/user/batch-actions/activate/access-types",
    // deactivationEndpoint: "/user/batch-actions/deactivate/access-types",
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
        title: "Number of assigned modules",
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
  })


  return <BBDataTable {...params} />
}
