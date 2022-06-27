import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import React, {  useState } from 'react'
import Form from "./form"
import { useParams } from "react-router-dom";

export default function IntegrationPartnerCountriesTable() {

  const param = useParams()

  let [params, setParams] = useState({
    isCheckbox: false,
    createOnModal: true,
    showAdvancedOptions: false,
    hideDetail: true,
    title: "Integration Partner",
    titleModal: "Integration Partner Countries",
    baseRoute: `/master/integration-partners/${param.id}/countries`,
    endpoint: `/master/integration-partners/${param.id}/countries`,
    deleteEndpoint: `/master/integration-partners/${param.id}/countries`,
    activationEndpoint: "/master/batch-actions/activate/integration-partner-countries",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-countries",
    btnDownload: ".buttons-csv",
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
    emptyTable: "No partner countries found",
    recordName: ["country.country_name", "integration_partner_country.country_code", "integration-partner-country.country_name"],
    showInfoDelete: true,
    isOpenNewTab: false,
    searchText: "Search",
    infoDelete: [
      {title: "Partner Country Name", recordName: "country_name"}, 
    ],
    showModalHeader: false,
  })

  return <><Card>
      <Card.Body>
      <h3 className="card-heading">Partner Countries</h3>
      <BBDataTable {...params} modalContent={Form} />
      </Card.Body>
      </Card></>
  
  
}