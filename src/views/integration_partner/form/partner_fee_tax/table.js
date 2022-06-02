import BBDataTable from "components/table/bb-data-table"
import React, { useState } from 'react'
import Form from "./form";
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom";
import FormDelete from "./form-delete"

export default function IntegrationFeeTaxes() {

  const { id } = useParams()

  let [params, setParams] = useState({
    createOnModal: true,
    showAdvancedOptions: false,
    isCheckbox: false,
    title: "",
    titleModal: "",
    modalDelete: true,
    baseRoute: `/master/integration-partners/${id}/fee-taxes`,
    endpoint: `/master/integration-partners/${id}/fee-taxes`,
    deleteEndpoint: "/master/batch-actions/delete/fee-tax-types",
    hideDetail: true,
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    btnDownload: ".buttons-csv",
    columns: [
      {
        title: "Fee Tax",
        data: "fee_tax_type.fee_tax_type_name"
      },
      {
        title: "Partner Fee Tax Code",
        data: "fee_tax_type_code"
      },
      {
        title: "Partner Fee Tax Name",
        data: "fee_tax_type_name"
      },
    ],
    emptyTable: "No partner fee taxes found",
    recordName: ["fee_tax_type_code", "fee_tax_type_name"],
    searchText: "Search",
    module: "partner-fee-taxes",
    isOpenNewTab:false
  });

  return (
    <Card>
      <Card.Body>
        <h3 className="card-heading">Partner Fee Taxes</h3>
        <BBDataTable {...params} modalContent={Form} modalDeleteContent={FormDelete} />
      </Card.Body>
    </Card>
  )
}
