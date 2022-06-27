import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import _ from "lodash"
import Api from "config/api"
import FormTabel from "../form/standart-service-form.js"

const endpoint = "/master/configurations/email-senders"
export default function SharedTable(props) {
  let serviceLevelCode = props.serviceLevelCode
  const API = new Api()
  const [initialForm, setInitialForm] = useState({
    message_type: "",
  })

  useEffect(async () => {
    try {
      let { data } = await API.get(endpoint)

      console.log("tes", data)
      setInitialForm({
        ...initialForm,
        message_type: _.isEmpty(data.message_type)
          ? ""
          : {
              value: data.message_type.id,
              label: data.message_type.message_type_name,
            },
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  const endpoint = `/master/configurations/standard-services`
  const extraFilter = `["service_level.service_level_code","=","${serviceLevelCode}"]`
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    showHistory: false,
    isHideDownloadLogo: true,
    title: "Standard Service",
    titleModal: "Standard Service",
    baseRoute: "/master/standard-services/form",
    endpoint: endpoint,
    filterData: extraFilter,
    deleteEndpoint:
      "/master/batch-actions/delete/configurations/standard-services",
    activationEndpoint:
      "/master/batch-actions/activate/configurations/standard-services",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/configurations/standard-services",
    columns: [
      {
        title: "Task Type",
        data: "task_type.task_type_name",
      },
      {
        title: "Response Time",
        data: "amount",
        render: (data) => {
          let day = Math.floor(data / 1440)
          let hour = Math.floor((data % 1440) / 60)
          let minute = (data % 1440) % 60

          let days = ""
          if (day > 0) {
            days = day + (day > 1 ? " Days" : " Day")
          }

          let hours = ""
          if (hour > 0) {
            hours = hour + (hour > 1 ? " Hours" : " Hour")
          }

          let minutes = ""
          if (minute > 0) {
            minutes = minute + (minute > 1 ? " Minutes" : " Minute")
          }
          return days + " " + hours + " " + minutes
        },
      },
    ],
    emptyTable: "No Record",
    btnDownload: ".buttons-csv",
    module: "standard-service",
    showInfoDelete: true,
    infoDelete: [
      { title: `Task Type`, recordName: "task_type.task_type_name" },
    ],
  }
  return (
    <BBDataTable
      {...params}
      modalContent={FormTabel}
      serviceLevelCode={serviceLevelCode}
    />
  )
}
