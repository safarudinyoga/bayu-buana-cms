import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import { renderColumn } from 'lib/translation';

export default function JobTitleTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Job Title",
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            text: "Job Title",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Job Title",
    titleModal: "Job Title",
    baseRoute: "/master/corporate-job-titles/form",
    endpoint: "/master/corporate-job-titles",
    deleteEndpoint: "/master/batch-actions/delete/corporate-job-titles",
    activationEndpoint: "/master/batch-actions/activate/corporate-job-titles",
    deactivationEndpoint: "/master/batch-actions/deactivate/corporate-job-titles",
    columns: [
      {
        title: "Code",
        data: "corporate_job_title_code",
      },
      {
        title: "Name",
        data: "corporate_job_title_name",
        render: renderColumn("job_title", "corporate_job_title_name"),
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Job Title Name",
        data: "job_title_translation.job_title_name",
        visible: false,
      },
    ],
    emptyTable: "No job title found",
    recordName: ["corporate_job_title_code", "corporate_job_title_name"],
    showInfoDelete: true,
    btnDownload: ".buttons-csv",
    infoDelete: [
      {title: "Job Title Code", recordName: "corporate_job_title_code"}, 
      {title: "Job Title Name", recordName: "corporate_job_title_name"}
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
