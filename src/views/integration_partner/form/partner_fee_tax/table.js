import BBDataTable from "components/table/bb-data-table"
import React, { useState } from 'react'
import Form from "./form";

export default function IntegrationFeeTaxes() {
  let [params, setParams] = useState({
    createOnModal: true,
    showAdvancedOptions: false,
    isCheckbox: false,
    title: "Partner Fee Tax",
    titleModal: "Create Partner Fee Tax",
    title: "Integration Partner",
    titleModal: "Integration Partner",
    baseRoute: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/fee-taxes",
    endpoint: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/fee-taxes",
    deleteEndpoint: "/master/batch-actions/delete/fee-tax-types",
    hideDetail: true,
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Fee Tax",
        data: "fee_tax_type_name"
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
    emptyTable: "No Integration Partner Fee Tax found",
    recordName: ["integration-partner-code", "integration-partner-name"],
  });

  const borderFeeTax = {
      borderRadius: 10,
  };
  const titleText = {
      fontSize: 16,
      color: '#333333',
      paddingTop: 20
  };
  const tableTax = {
      paddingLeft: 20
  }

  return (
      <div className="row">
        <div className="col-xl border" style={borderFeeTax}>
            <h1 style={titleText}>Partner Fee Taxes</h1>
            <hr />
            <div style={tableTax}>
                <BBDataTable {...params}  modalContent={Form} />
            </div>
        </div>
      </div>
  )
}
