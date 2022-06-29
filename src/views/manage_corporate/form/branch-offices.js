import React, { useEffect, useState } from 'react'
import { Form, Card, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

// components
import BbDataTable from 'components/table/bb-data-table'
import FormModal from './branch-offices/index'
import './_form.sass'

// utils
import rowStatus from "lib/row-status"
import Api from "config/api"

const BranchOffices = ({
  isMobile
}) => {
  let api = new Api()

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const [params, setParams] = useState({
    title: "Branch Offices",
    titleModal: "Company/ Branch Office",
    createOnModal: true,
    modalSize: 'lg',
    modalClassName: 'corporate_branch_office_modal',
    showAdvancedOptions: false,
    responsiveTablet: true,
    isOpenNewTab: false,
    isHideSearch: true,
    isHidePrintLogo: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    isCheckbox: false,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/branch-offices",
    columns: [
      {
        title: "Company/Branch Name",
        data: ""
      },
      {
        title: "Address",
        data: ""
      },
      {
        title: "Phone Number",
        data: ""
      },
      {
        title: "Geo Location",
        data: ""
      },
    ],
    emptyTable: "No Corporates found",
  })

  const onReset = () => {
    setParams({...params, filters: []})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Card style={{marginBotton: 0}}>
        <Card.Body>
          <h3 className="card-heading">Branch Offices</h3>
          <div style={{ padding: "15px" }}>
            <BbDataTable {...params} onReset={onReset} modalContent={FormModal} />
          </div>
        </Card.Body>
      </Card>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
        >
          SAVE & NEXT
        </Button>
        <Button
          variant="secondary"
          // onClick={() => props.history.goBack()}
          style={{ padding: '0 21px' }}
        >
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default BranchOffices