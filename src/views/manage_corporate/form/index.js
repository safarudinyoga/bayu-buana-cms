import { withRouter } from "react-router"
import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { ReactSVG } from "react-svg"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

// components & styles
import GeneralInformation from './general-information'
import BranchOffice from './branch-offices'
import CorporateFare from './corporate-fare'
import AncillaryFee from './ancillary-fee'
import CreditLimit from './credit-limit'
import ImportDatabaseEmployee from "views/manage_corporate/form/import-database-employee"
import InvoiceSettings from "views/manage_corporate/form/invoice-settings"
import MarkUp from "views/manage_corporate/form/mark-up"
import ServiceFee from "views/manage_corporate/form/service-fee"
import SystemAdministrator from "views/manage_corporate/form/system-administrator"
import Api from "config/api"
import '../manage_corporate.css'

const staticWarding = {
  main: 'Corporate Management',
  mainSub: 'Manage Corporate',
  create: 'Create Corporate',
  edit: 'Edit Corporate',
  detail: 'Corporate Details',
  linkSub: '/master/manage-corporate'
}
const endpoint = '/master/agent-corporates'
const options = {
  position: "bottom-right",
}

const Spinner = () => <div className="spinner"></div>

const ManageCorporateForm = ({ match }) => {
  let dispatch = useDispatch()
  const api = new Api()
  const formId = match?.params?.id
  const [openSnackbar] = useSnackbar(options)

  const isView = useQuery().get("action") === "view"

  const [tabKey, setTabKey] = useState("general-information")
  // const [tabKey, setTabKey] = useState("system-administrator")
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const wardingGenerator = () => {
    if (!formId) {
      return staticWarding.create
    }

    if (formId && isView) {
      return staticWarding.detail
    }

    return staticWarding.edit
  }

  useEffect(() => {

    const { main, mainSub, linkSub } = staticWarding
    dispatch(
      setUIParams({
        title: wardingGenerator(formId),
        breadcrumbs: [
          {
            text: main,
          },
          {
            link: linkSub,
            text: mainSub,
          },
          {
            text: wardingGenerator(),
          },
        ],
      }),
    )
  }, [])

  useEffect(async() => {
    try {
      if (formId) {
        setIsLoading(true)
        const { data, status } = await api.get(`${endpoint}/${formId}`)
        if ([200].includes(status)) {
          setData(data)
          setIsLoading(false)
        }
      }
    } catch (error) {
      openSnackbar(`error => ${error}`)
    }
  }, [])


  return (
    <Tab.Container activeKey={tabKey} onSelect={(key) => setTabKey(key)}>
      <Row>
        {isLoading ? <Spinner />
          :
          (
            <>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column nav-side">
                  <Nav.Item>
                    <Nav.Link eventKey="general-information">
                      <div>
                        <ReactSVG src="/img/icons/corporate-general-information.svg" />
                        <span>General Information</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="branch-office">
                      <div>
                        <ReactSVG src="/img/icons/corporate-branch-office.svg" />
                        <span>Branch Offices</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="system-administrator">
                      <div>
                        <ReactSVG src="/img/icons/corporate-system-administrator.svg" />
                        <span>System Administrator</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="setting">
                      <div>
                        <ReactSVG src="/img/icons/corporate-setting.svg" />
                        <span>Settings</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="mark-up">
                      <div>
                        <ReactSVG src="/img/icons/corporate-markup.svg" />
                        <span>Mark Up</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="service-fee">
                      <div>
                        <ReactSVG src="/img/icons/corporate-service-fee.svg" />
                        <span>Service Fee</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ancillary-fee">
                      <div>
                        <ReactSVG src="/img/icons/corporate-ancillary-fee.svg" />
                        <span>Ancillary Fee</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assign-team">
                      <div>
                        <ReactSVG src="/img/icons/corporate-assign-team.svg" />
                        <span>Assign Team</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="credit-limit">
                      <div>
                        <ReactSVG src="/img/icons/corporate-credit-limit.svg" />
                        <span>Credit Limit</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="invoice-settings">
                      <div>
                        <ReactSVG src="/img/icons/corporate-invoice-setting.svg" />
                        <span>Invoice Settings</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="corporate-rating">
                      <div>
                        <ReactSVG src="/img/icons/corporate-corporate-rating.svg" />
                        <span>Corporate Rating</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="corporate-fare">
                      <div>
                        <ReactSVG src="/img/icons/corporate-corporate-fare.svg" />
                        <span>Corporate Fare</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="upload-document">
                      <div>
                        <ReactSVG src="/img/icons/corporate-upload-document.svg" />
                        <span>Upload Document</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="import-database-employee">
                      <div>
                        <ReactSVG src="/img/icons/corporate-import-db.svg" />
                        <span>Import Database Employee</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="general-information">
                    <GeneralInformation data={data != null ? data.general_information : ""} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="branch-office">
                    <BranchOffice />
                  </Tab.Pane>
                  <Tab.Pane eventKey="system-administrator">
                    <SystemAdministrator />
                  </Tab.Pane>
                  <Tab.Pane eventKey="mark-up">
                    <MarkUp />
                  </Tab.Pane>
                  <Tab.Pane eventKey="service-fee">
                    <ServiceFee />
                  </Tab.Pane>
                  <Tab.Pane eventKey="ancillary-fee">
                    <AncillaryFee />
                  </Tab.Pane>
                  <Tab.Pane eventKey="credit-limit">
                    <CreditLimit />
                  </Tab.Pane>
                  <Tab.Pane eventKey="invoice-settings">
                    <InvoiceSettings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="corporate-fare">
                    <CorporateFare />
                  </Tab.Pane>
                  <Tab.Pane eventKey="import-database-employee">
                    <ImportDatabaseEmployee />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </>
          )
        }
      </Row>
    </Tab.Container>
  )
}

export default withRouter(ManageCorporateForm)
