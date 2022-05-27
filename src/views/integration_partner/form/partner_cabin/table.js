import BBDataTable from "components/table/bb-data-table"
import React, { useState } from "react"
import DeleteModal from "./form/form-delete"
import { Card} from "react-bootstrap"
import PartnerCabins from "./form/form"

export default function IntegrationPartnerCabinTypesTable(props) {
  const [isReplaceTable, setIsReplaceTable] = useState(false)
  const [partnerCabinId, setPartnerCabinId] = useState(null)

  const handleReplaceTable = async (key) => {
    setIsReplaceTable(!key)
  }

  const setId = async (id) => {
    setPartnerCabinId(id)
  }
  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Integration Partner",
    modalDelete: true,
    titleModal: "Integration Partner",
    showAdvancedOptions: false,
    baseRoute: "/master/integration-partner-cabin-types/form",
    endpoint: "/master/integration-partner-cabin-types",
    deleteEndpoint: "/master/batch-actions/delete/master/integration-partner-cabin-types",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-cabin-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-cabin-types",
    btnDownload: ".buttons-csv",
    isReplaceTable: true,
    columns: [
      {
        title: "Cabin",
        data: "cabin_type.cabin_type_name",

      },
      {
        title: "Partner Cabin Code",
        data: "cabin_type_code"
      },
      {
        title: "Partner Cabin Name",
        data: "cabin_type_name"
      },

    ],
    emptyTable: "No Partner Cabins found",
    showInfoDelete: true,
    isOpenNewTab: false,
    module:"integration-partner-cabins",
    recordName: ["cabin_type.cabin_type_name", "cabin_type_code", "cabin_type_name"],
    searchText: "Search"
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Cabins</h3>
          {
          isReplaceTable ? <PartnerCabins isReplaceTable={isReplaceTable} handleReplaceTable={handleReplaceTable} partnerCabinId={partnerCabinId}/> :
          <BBDataTable {...params} modalContent={DeleteModal} handleReplaceTable={handleReplaceTable} setId={setId}/>
          }
          </Card.Body>
      </Card>
    </>
  )
}
