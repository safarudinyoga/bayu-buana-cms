import BBDataTable from "components/table/bb-data-table"
import { Card} from "react-bootstrap"
import React, { useState } from 'react'
import DeleteModal from "./form/form-delete"



export default function IntegrationPartnerCabinTypesTable(props) {

  const { partnerId, partnerCabinId } = props
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
    endpoint: `/master/integration-partners/${partnerId}/cabin-types/${partnerCabinId}/fare-families`,
    deleteEndpoint: "/master/batch-actions/delete/fare-families",
    activationEndpoint: "/master/batch-actions/activate/fare-families",
    deactivationEndpoint: "/master/batch-actions/deactivate/fare-families",
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
    customSort:['fare_type_id'],
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
