import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import { renderColumn } from 'lib/translation';

export default function ViolationReasonTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Violation Reason",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: "Violation Reason",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Job Title",
    titleModal: "Job Title",
    baseRoute: "/master/violation-reason/form",
    endpoint: "/master/job-titles",
    deleteEndpoint: "/master/batch-actions/delete/job-titles",
    activationEndpoint: "/master/batch-actions/activate/job-titles",
    deactivationEndpoint: "/master/batch-actions/deactivate/job-titles",
    columns: [
      {
        title: "Code",
        data: "job_title_code",
      },
      {
        title: "Name",
        data: "job_title_name",
        render: renderColumn("job_title", "job_title_name"),
      },
      {
        title: "Description",
        data: "job_title_name",
        render: renderColumn("job_title", "job_title_name"),
      },
      {
        title: "Type",
        data: "job_title_code",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Name",
        data: "job_title_translation.job_title_name",
        visible: false,
      },
      {
        title: "Translated Description",
        data: "job_title_translation.job_title_name",
        visible: false,
      },
    ],
    emptyTable: "No violation reason found",
    recordName: ["job_title_code", "job_title_name"],
    showInfoDelete: true,
    btnDownload: ".buttons-csv",
    infoDelete: [
      {title: "Job Title Code", recordName: "job_title_code"}, 
      {title: "Job Title Name", recordName: "job_title_name"}
    ],
    switchStatus: true,
    customFilterStatus: {
      value: "",
      options: [
        {value: "1", label: "Active"},
        {value: "3", label: "Inactive"},
      ]
    },
    isOpenNewTab: false,
    actionWidthClass: "custom-action",
  })

  return <BBDataTable {...params} {...params} />
}
