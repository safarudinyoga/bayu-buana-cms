import BBDataTable from "components/table/bb-data-table"
import { Card,  Col,  Tab, Nav, Row} from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import Form from "./form"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"

const backUrl = "/master/integration-partner"

export default function IntegrationPartnerCitiesTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "iTank",
        breadcrumbs: [
          {
            text: "Setup And Configuration",
          },
          {
            link: backUrl,
            text: "Integration Partner",
          },
          {
            text: "iTank",
          },
          
          
        ],
      }),
    )
  }, [])



  let [params, setParams] = useState({
    isCheckbox: false,
    createOnModal: true,
    showAdvancedOptions: false,
    hideDetail: true,
    title: "Integration Partner",
    titleModal: "Integration Partner Cities",
    baseRoute: "/master/integration-partner-cities/form",
    endpoint: "/master/integration-partner-cities",
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-cities",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-cities",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-cities",
    columns: [
      {
        title: "City",
        data: "city.city_name"
      },
      {
        title: "Partner City Code",
        data: "city_code"
      },
      {
        title: "Partner City Name",
        data: "city_name"
      },
       
    ],
    emptyTable: "No partner cities found",
    recordName: ["city.city_name", "integration_partner_city.city_code", "integration-partner-city.city_name"],
  })

  return <>
  <Tab.Container>
    <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-colum nav-side">

      </Nav>
    </Col>
    <Col sm={9}>
    <Card>
      <Card.Body>
      <h3 className="card-heading">Partner Cities</h3>
      <BBDataTable {...params} modalContent={Form} />
      </Card.Body>
      </Card>
    </Col>
    </Row>
    
  
  </Tab.Container>
  </>
  
  
}