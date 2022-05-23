import React from "react"
import BBDataTable from "components/table/bb-data-table"
import Form from "./form"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
export default function PartnerCityTable(props) {

  const { id } = useParams()
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Cities",
    titleModal: "Partner Cities",
    baseRoute: "/master/integration-partner-cities/form",
    endpoint: `/master/integration-partners/${id}/cities`,
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-cities",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-cities",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-cities",
    btnDownload: ".buttons-csv",
    columns: [
      {
        title: "City",
        data: "city.city_name",
      },
      {
        title: "Partner City Code",
        data: "integration_partner_city.city_code",
      },
      {
        title: "Partner City Name",
        data: "integration_partner_city.city_name",
      }
    ],
    emptyTable: "No partner cities found",
    recordName: ["city_name"],
    isOpenNewTab: false,
    module: "partner-city",
    searchText: "Search"
  }
  return <>
    <Card>
      <Card.Body>
        <h3 className="card-heading">Partner Cities</h3>
        <BBDataTable {...params} modalContent={Form} />
      </Card.Body>
    </Card>
  </>


}
