import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

export default function JobTitleTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Job Title",
        breadcrumbs: [
          {
            text: "Employment Management",
          },
          {
            text: "Job Title",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    title: "Job Title",
    titleModal: "Job Title",
    baseRoute: "/master/job-title/form",
    endpoint: "/master/job-title",
    deleteEndpoint: "/master/batch-actions/delete/job-title",
    activationEndpoint: "/master/batch-actions/activate/job-title",
    deactivationEndpoint: "/master/batch-actions/deactivate/job-title",
    columns: [
      {
        title: "Job Title Code",
        data: "job_title_code",
      },
      {
        title: "Job Title Name",
        data: "job_title_name",
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
    emptyTable: "No Job Title found",
    recordName: ["job_title_code", "job_title_name"],
  })

  return <BBDataTable {...params} {...params} />
}