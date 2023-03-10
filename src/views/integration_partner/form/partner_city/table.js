import React from "react"
import BBDataTable from "components/table/bb-data-table"
import Form from "./form"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
// import FormDelete from "./form-delete"

export default function PartnerCityTable(props) {

  const { id } = useParams()
  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "",
    titleModal: "",
    // modalDelete: true,
    baseRoute: "/master/integration-partner-cities/form",
    endpoint: `/master/integration-partners/${id}/cities`,
    deleteEndpoint: `/master/integration-partners/${id}/cities`,
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
        data: "city_code",
      },
      {
        title: "Partner City Name",
        data: "city_name",
      }
    ],
    emptyTable: "No partner cities found",
    recordName: ["city_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Partner City Name", recordName: "city_name"}, 
    ],
    isOpenNewTab: false,
    module: "partner-city",
    searchText: "Search",
    showModalHeader: false,
    isPartner: true
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
