import BBDataTable from "components/table/bb-data-table"
import React, { useEffect, useState } from 'react'
import FareFamilyModal from "./form/form-fare-family"



export default function IntegrationPartnerCabinTypesTable(props) {

  const { partnerId, partnerCabinId, isView } = props
  const [showActions, setShowAction] = useState(true)

  useEffect(() => {
    setShowAction(isView)
  }, [isView])

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Integration Partner",
    titleModal: "Integration Partner",
    showAdvancedOptions: false,
    baseRoute: "/master/form",
    endpoint: `/master/integration-partners/${partnerId}/cabin-types/${partnerCabinId}/fare-families`,
    deleteEndpoint:`/master/integration-partners/${partnerId}/cabin-types/${partnerCabinId}/fare-families`,
    activationEndpoint: "/master/batch-actions/activate/fare-families",
    deactivationEndpoint: "/master/batch-actions/deactivate/fare-families",
    columns: [
      {
        title: "Fare Family",
        data: "fare_type.fare_type_name",

      },
      {
        title: "Booking Class",
        data: "booking_class_names"
      },

    ],
    emptyTable: "No Partner Fare Family found",
    customSort:['fare_type_id'],
    isOpenNewTab: false,
    btnDownload: ".buttons-csv",
    module:"fare-types",
    recordName: ["fare_type_name"],
    createOnModal: true,
    isShowColumnAction: showActions,
  })

  return <>
    <BBDataTable {...params} onReset={onReset} modalContent={FareFamilyModal} />
  </>


}
