import React, { useEffect, useState } from "react"
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components
import BbDataTable from "components/table/bb-data-table"
import "./_form.sass"
import CorporateFareModal from "./corporate-fare/index"

// utils
import rowStatus from "lib/row-status"
import Api from "config/api"

const CorporateFare = ({ isMobile }) => {
  let api = new Api()

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: (val) => {
      console.log(val)
    },
  })

  const [params, setParams] = useState({
    title: "Corporate Fare",
    titleModal: "NEW FARE",
    createOnModal: true,
    modalSize: "lg",
    modalClassName: "assign_team_modal",
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    isCheckbox: false,
    baseRoute: "/master/manage-corporate/form",
    // endpoint: "/master/corporate-fare",
    columns: [
      {
        title: "Specified Airlines",
        data: "",
      },
      {
        title: "Account Code",
        data: "",
      },
      {
        title: "Negotiated Fare Code",
        data: "",
      },
      {
        title: "Period",
        data: "",
      },
    ],
    emptyTable: "No Corporate Fare found",
  })

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{ marginBotton: 0 }}>
        <Card.Body>
          {isMobile ? "" : <h3 className="card-heading">Corporate Fare</h3>}
          <div style={isMobile ? { padding: "0" } : { padding: "15px" }}>
            {/* <BbDataTable {...params} onReset={onReset} /> */}
            <BbDataTable {...params} modalContent={CorporateFareModal} />
          </div>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: 15, marginBottom: 50, padding: "0 24px" }}
        >
          SAVE & NEXT
        </Button>
        <Button
          variant="secondary"
          // onClick={() => props.history.goBack()}
          style={{ padding: "0 21px" }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default CorporateFare
