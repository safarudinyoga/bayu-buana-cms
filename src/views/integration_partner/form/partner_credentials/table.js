import BBDataTable from "components/table/bb-data-table"
import React, { useEffect, useState } from 'react'
import Form from "./form"
import { Tabs, TabPane, Row, Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import SelfServices from "./self-services"

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
      deleteEndpoint: `/master/integration-partners/${param.id}/credentials`,
      columns: [
        {
          title: "Company/Branch Name",
          data: "corporate_group_name",
        },
        {
          title: "Address",
          data: "address.address_line",
        },
        {
          title: "PCC",
          data: "pcc",
        },
        {
          title: "IPCC",
          data: "ipcc",
        },
      ],
      emptyTable: "No Partner Credentials found",
      recordName: ["Company/ Branch Name", "corporate_group_name"],
      btnDownload: ".buttons-csv",
      module: "partner_credentials",
      searchText: "Search",
      isOpenNewTab: false,
      customSort: ["id"],
      showModalHeader: false,
      infoDelete: [
        {title: "Company/ Branch Name", recordName: "corporate_group_name"}, 
      ],
      isPartner: true,
      extraText: "credentials for"
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
                <SelfServices integration_partner_code={props.integration_partner_code} />
              </TabPane>
            </Tabs>
          </Card.Body>
      </Card>
    )
  }

  export default function IntegrationPartnerCredentialsTable(props) {
    return <ControlledTabs {...props}/>
  }
