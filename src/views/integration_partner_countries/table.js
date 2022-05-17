import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { Card,  Row, Col, Button, Image } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import Form from "./form"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"

export default function IntegrationPartnerCountriesTable() {
  

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    isCheckbox: false,
    createOnModal: true,
    showAdvancedOptions: false,
    hideDetail: true,
    title: "Integration Partner",
    titleModal: "Integration Partner Countries",
    baseRoute: "/master/integration-partner-countries/form",
    endpoint: "/master/integration-partner-countries",
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-countries",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-countries",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-countries",
    columns: [
      {
        title: "Country",
        data: "country.country_name"
      },
      {
        title: "Partner Country Code",
        data: "country_code"
      },
      {
        title: "Partner Country Name",
        data: "country_name"
      },
      {
        title: "Nationality",
        data: "nationality"
      },
       
    ],
    emptyTable: "No partner country found",
    recordName: ["country.country_name", "integration_partner_country.country_code", "integration-partner-country.country_name"],
  })

  return <><Card>
      <Card.Body>
      <h3 className="card-heading">Partner Countries</h3>
      <BBDataTable {...params} onReset={onReset} modalContent={Form} />
      </Card.Body>
      </Card></>
  
  
}