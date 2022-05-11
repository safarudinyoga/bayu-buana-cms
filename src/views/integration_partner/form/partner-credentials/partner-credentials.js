import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Tabs, TabPane, Row, Card } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import FormPartner from "./form/partner_credentials"

let params = {
  isCheckbox: false,
  showAdvancedOptions: false,
  createOnModal: true,
  hideDetail: true,
  title: "Partner Credentials",
  titleModal: "Partner Credentials",
  baseRoute: "/master/integration-partner/form",
  // routeHistory: "/master/exchange-rate/history",
  endpoint: "/master/currency-conversions",
  deleteEndpoint: "/master/batch-actions/delete/currency-conversions",
  // activationEndpoint: "/master/batch-actions/activate/currency-conversions",
  // deactivationEndpoint: "/master/batch-actions/deactivate/currency-conversions",
  columns: [
    {
      title: "Credentials",
      data: "from_currency.currency_code",
    },
    {
      title: "Partner Credentials Code",
      data: "to_currency.currency_code",
    },
    {
      title: "Partner Credentials Name",
      data: "from_currency.currency_code",
    },
  ],
  emptyTable: "No Partner Credentials found",
  recordName: ["from_currency.currency_code", "to_currency.currency_code"],
  btnDownload: ".buttons-csv",
  module: "exchange-rate"
}

const ControlledTabs = () => {
  const [key, setKey] = useState("flight")

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
              <BBDataTable {...params} modalContent={FormPartner} />
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
              <BBDataTable {...params} modalContent={FormPartner} />
            </TabPane>
          </Tabs>
        </Card.Body>
    </Card>
  )
}
export default function PartnerCredentials() {
  let dispatch = useDispatch()
  useEffect(() => {
    ;<ControlledTabs />
    dispatch(
      setUIParams({
        title: "Partner Credentials",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Partner Credentials",
          },
        ],
      }),
    )
  }, [])

  return <ControlledTabs />
}
