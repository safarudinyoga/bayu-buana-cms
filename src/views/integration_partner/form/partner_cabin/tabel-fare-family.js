import BBDataTable from "components/table/bb-data-table"
import { Card} from "react-bootstrap"
import React, { useState } from 'react'
import DeleteModal from "./form/form-delete"



export default function IntegrationPartnerCabinTypesTable() {

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Integration Partner",
    modalDelete: true,
    titleModal: "Integration Partner",
    showAdvancedOptions: false,
    baseRoute: "/master/form",
    endpoint: "/master/fare-types",
    deleteEndpoint: "/master/batch-actions/delete/fare-types",
    activationEndpoint: "/master/batch-actions/activate/fare-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/fare-types",
    columns: [
      {
        title: "Fare Family",
        data: "fare_type_name",

      },
      {
        title: "Booking Class",
        // data: "fare_type_code"
      },

    ],
    emptyTable: "No Partner Fare Family found",
    
    showInfoDelete: true,
    isOpenNewTab: false,
    hideDetail: true,
    btnDownload: ".buttons-csv",
    module:"fare-types",
    recordName: ["fare_type_name"],
  })

  return <>
                  <BBDataTable {...params} onReset={onReset} modalContent={DeleteModal} />
  </>


}
