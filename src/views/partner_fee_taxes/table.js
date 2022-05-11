import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { ReactSVG } from "react-svg"
import Form from "./form";

export default function IntegrationFeeTaxes() {
    console.log("here");
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Sabre",
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            text: "Intergration Partner",
          },
          {
            text: "Sabre",
          },
        ],
      }),
    )
  }, [])

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    createOnModal: true,
    showAdvancedOptions: false,
    isCheckbox: false,
    title: "Partner Fee Tax",
    titleModal: "Create Partner Fee Tax",
    title: "Integration Partner",
    titleModal: "Integration Partner",
    baseRoute: "/master/fee-tax-types",
    endpoint: "/master/fee-tax-types",
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
                <BBDataTable {...params} onReset={onReset} modalContent={Form} />
            </div>
        </div>
      </div>
  )
}
