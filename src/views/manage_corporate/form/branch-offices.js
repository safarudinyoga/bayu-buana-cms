import React, { useState } from 'react'
import { Form, Card, Button } from "react-bootstrap"

// components
import BbDataTable from 'components/table/bb-data-table'
import FormModal from './branch-offices/index'
import useQuery from "lib/query"
import './_form.sass'

// utils

const BranchOffices = ({
  handleChangeTabKey
}) => {
  const isView = useQuery().get("action") === "view"

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
    <Form>
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
          type={isView ? 'button' : 'submit'}
          style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
          onClick={() => {
            if (!isView) return

            handleChangeTabKey()
            // ! for OnSubmit
            // handleChangeTabKey('system-administrator', 2)
          }}
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