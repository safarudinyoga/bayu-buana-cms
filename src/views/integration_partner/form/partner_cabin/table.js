import BBDataTable from "components/table/bb-data-table"
import React, { useState } from "react"
import DeleteModal from "./form/form-delete"
import { Card} from "react-bootstrap"

export default function IntegrationPartnerCabinTypesTable(props) {
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
    btnDownload: ".buttons-csv",
    module:"integration-partner-cabins",
    recordName: ["cabin_type.cabin_type_name", "cabin_type_code", "cabin_type_name"],
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Partner Cabins</h3>
          <BBDataTable {...params} modalContent={DeleteModal} />
        </Card.Body>
      </Card>
    </>
  )
}
