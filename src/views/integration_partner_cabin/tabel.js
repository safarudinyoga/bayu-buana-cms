import BBDataTable from "components/table/bb-data-table"
import Api from "config/api"
import React, { useEffect, useState } from "react"
import DeleteModal from "./form/form-delete"
import { Row, Col, Tab, Card, Nav} from "react-bootstrap"
import { ReactSVG } from "react-svg"
import { useDispatch } from 'react-redux';
import useQuery from "lib/query"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/integration-partner-cabin-types"

const backUrl = "/master/integration-partner"


export default function IntegrationPartnerCabinTypesTable(props) {
  const dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("partner-cabins")

  useEffect(async () => {
    dispatch(
      setUIParams({
        title: "Sabre" ,
        breadcrumbs: [
          {
            text: "Setup and Configuration",
          },
          {
            link: backUrl,
            text: "Integration Partner",
          },
          {
            text: "Sabre",
          },
        ],
      }),
    )
  }, [])
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
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

  return <>
   <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col sm={3}>
        <Nav variant="pills" className="flex-column nav-side">
                  <Nav.Item>
                    <Nav.Link eventKey="partner-information">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Information</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-credential">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Credential</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-corporates">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Corporates</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                  <Nav.Link eventKey="partner-cabins">
                      <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner Cabins</span>
                      </div>
                    </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="partner-meal-plans">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Meal Plans</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-fee-taxes">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Fee Taxes</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partner-messages">
                      <div>
                        <ReactSVG src="/img/icons/users.svg" />
                        <span>Partner Messages</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  
                  {/* <Nav.Link href={`/master/integration-partner-cities/${formId}/cities`}>
                    <div>
                        <ReactSVG src="/img/icons/employment.svg" />
                        <span>Partner City</span>
                      </div>
                    </Nav.Link> */}
                   
                  
                </Nav>
        </Col>
        <Col sm={9}>
        <Card>
                <Card.Body>
                  <h3 className="card-heading">Partner Cabins</h3>
                  <BBDataTable {...params} onReset={onReset} modalContent={DeleteModal} />
                </Card.Body>
              </Card>
        </Col>
      </Row>

    </Tab.Container>
              
           
  </>


}
