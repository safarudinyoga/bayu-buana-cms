import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function TravelPolicyClass() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Travel Policy Class",
        breadcrumbs: [
          {
            text: "Setup & Configuration",
          },
          {
            text: "Travel Policy Class",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Travel Policy Class",
    titleModal: "Travel Policy Class",
    baseRoute: "/master/travel-policy-class/form",
    endpoint: "/master/corporate-travel-policy-classes",
    deleteEndpoint:
      "/master/batch-actions/delete/corporate-travel-policy-classes",
    activationEndpoint:
      "/master/batch-actions/activate/corporate-travel-policy-classes",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/corporate-travel-policy-classes",
    columns: [
      {
        title: "Code",
        data: "travel_policy_class_code",
      },
      {
        title: "Name",
        data: "travel_policy_class_name",
        render: renderColumn(
          "travel_policy_class_code",
          "travel_policy_class_name",
        ),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      // {
      //   title: "Translated Job Title Name",
      //   data: "job_title_translation.job_title_name",
      //   visible: false,
      // },
    ],
    emptyTable: "No Travel Policy Class Found",
    recordName: ["travel_policy_class_code", "travel_policy_class_name"],
    showInfoDelete: true,
    btnDownload: ".buttons-csv",
    infoDelete: [
      {
        title: "Travel Policy Class Code",
        recordName: "travel_policy_class_code",
      },
      {
        title: "Travel Policy Class Name",
        recordName: "travel_policy_class_name",
      },
    ],
    switchStatus: true,
    customFilterStatus: {
      value: "",
      options: [
        { value: "1", label: "Active" },
        { value: "3", label: "Inactive" },
      ],
    },
    isOpenNewTab: false,
    actionWidthClass: "custom-action",
  })

  return <BBDataTable {...params} {...params} />
}
