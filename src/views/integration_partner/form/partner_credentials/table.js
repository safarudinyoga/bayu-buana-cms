import BBDataTable from "components/table/bb-data-table"
import React, { useEffect, useState } from 'react'
import Form from "./form"
import { Tabs, TabPane, Row, Card } from "react-bootstrap"
import { useParams } from "react-router-dom"

  const ControlledTabs = (props) => {
    const param = useParams()
    const [key, setKey] = useState("flight")
    let params = {
      isCheckbox: false,
      showAdvancedOptions: false,
      createOnModal: true,
      hideDetail: true,
      title: "Partner Corporates",
      titleModal: "Partner Corporates",
      baseRoute: "/master/integration-partner-corporates/form",
      endpoint: `/master/integration-partners/${param.id}/credentials`,
      deleteEndpoint: "/master/batch-actions/delete/integration-partner-corporates",
      columns: [
        {
          title: "Company/Branch Name",
          data: "corporate_id",
        },
        {
          title: "Address",
          data: "corporate_code",
        },
        {
          title: "PCC",
          data: "corporate_id",
        },
        {
          title: "IPCC",
          data: "corporate_id",
        },
      ],
      emptyTable: "No Partner Corporate found",
      recordName: ["corporate_code", "corporate_id"],
      btnDownload: ".buttons-csv",
      module: "partner_credentials",
      searchText: "Search",
      isOpenNewTab: false,
    }
  
    return (
      <Card style={{marginBottom: 0}}>
        <Card.Body className="px-1 px-md-4">
            <h3 className="card-heading">Partner Credentials</h3>
            <Tabs
              id="partner-credentials"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-4"
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <TabPane
                className="m-3"
                eventKey="flight"
                title={
                  <div className="d-md-flex flex-row bd-highlight">
                    <span className="ml-md-2 tabs-text">Partner Credentials</span>
                  </div>
                }
              >
                <BBDataTable {...params} modalContent={() => <Form integration_partner_code={props.integration_partner_code}/>} />
              </TabPane>
              <TabPane
                className="m-3"
                eventKey="hotel"
                title={
                  <div className="d-md-flex flex-row">
                    <span className="ml-md-2 tabs-text">Self Service Booking Tool</span>
                  </div>
                }
              >
                <BBDataTable {...params} modalContent={Form} />
              </TabPane>
            </Tabs>
          </Card.Body>
      </Card>
    )
  }

  export default function IntegrationPartnerCredentialsTable(props) {
    return <ControlledTabs {...props}/>
  }
