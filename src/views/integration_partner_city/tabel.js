import React, { useEffect} from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Form from "./form"
import { Row, Col, Tab, Card } from "react-bootstrap"


const backUrl = "/master/integration-partner"

export default function PartnerCityTable(props) {
 
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


  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    title: "Partner Cities",
    titleModal: "Partner Cities",
    baseRoute: "/master/integration-partner-cities/form",
    routeHistory: "/master/integration-partner-cities/history",
    endpoint: "/master/integration-partner-cities",
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-cities",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-cities",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-cities",
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
        title: "Partner City name",
        data: "city_name",

      },
    ],
    emptyTable: "No partner cities found",
    recordName: ["city_city_name"],
    btnDownload: ".buttons-csv",
    module: "integration-partner-cities"
  }
  return <>
    <Tab.Container>
      <Row>
        <Col sm={3}>
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
