import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Card } from "react-bootstrap"
import Form from "../form/partner-corporate/form"

export default function PartnerCorporates() {

    const onReset = () => {
        setParams({ ...params, filters: [] })
      }

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Partner Corporates",
        breadcrumbs: [
          {
            text: "Partner Corporates",
          },
        ],
      }),
    )
  }, [])


  let [params, setParams] = useState ({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    hideDetail: true,
    modalDelete: false,
    title: "Partner Corporates",
    titleModal: "Partner Corporates",
    baseRoute: "/master/integration-partner/partner-corporates/form",
    // routeHistory: "/master/exchange-rate/history",
    endpoint: "/master/integration-partner-corporates",
    deleteEndpoint: "/master/batch-actions/delete/currency-conversions",
    // activationEndpoint: "/master/batch-actions/activate/currency-conversions",
    // deactivationEndpoint: "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "Corporate",
        data: "corporate",
      },
      {
        title: "Partner Corporate Code",
        data: "corporate_code",
      },
      {
        title: "Partner Corporate Name",
        data: "corporate",
      },
    ],
    emptyTable: "No Partner Corporates found",
    recordName: ["corporate", "corporate_code"],
    btnDownload: ".buttons-csv",
    module: "exchange-rate"
  })
  
  return (
    <Card style={{marginBottom: 0}}>
        <Card.Body className="px-1 px-md-4">
          <h3 className="card-heading">Partner Corporates</h3>
          <BBDataTable {...params} modalContent={Form} onReset={onReset}  />
        </Card.Body>
      </Card>
  ) 
}
