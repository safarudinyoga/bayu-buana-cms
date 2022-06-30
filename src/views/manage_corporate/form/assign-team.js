import React, { useState } from 'react'
import { Form, Card, Button } from "react-bootstrap"

// components & styles
import AssignTeamModal from './assign-team/index'
import BbDataTable from 'components/table/bb-data-table'
import './_form.sass'

const AssignTeam = () => {

  const [params, setParams] = useState({
    title: "Assign Team",
    titleModal: "SELECT TRAVEL CONSULTANT TEAM",
    createOnModal: true,
    modalSize: 'lg',
    modalClassName: 'assign_team_modal',
    showAdvancedOptions: false,
    responsiveTablet: true,
    isHidePrintLogo: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    isOpenNewTab: false,
    isHideSearch: true,
    isCheckbox: false,
    baseRoute: "/master/manage-corporate/form",
    endpoint: "/master/assign-team",
    columns: [
      {
        title: "Team Name",
        data: ""
      },
      {
        title: "Number of Travel Consultants",
        data: ""
      },
    ],
    emptyTable: "No Team found",
    module: 'corporate_assign_team'
  })

  return (
    <Form>
      <Card>
        <Card.Body>
          <h3 className="card-heading">Assign Team</h3>
          <div className='assign-team manage_corporate_card pl-2 pr-2'>
            <Card>
              <Card.Header className='header_card_corporate uppercase title'>BY TEAM</Card.Header>
              <Card.Body>
                <div style={{ padding: "15px" }}>
                  <BbDataTable {...params} modalContent={AssignTeamModal} />
                </div>
              </Card.Body>
            </Card>
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

export default AssignTeam