import { withRouter, useHistory } from 'react-router';
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
import AssignTeam from "views/manage_corporate/form/assign-team"
import Settings from "views/manage_corporate/form/settings"
import CorporateRating from "views/manage_corporate/form/corporate-rating"
import UploadDocument from "views/manage_corporate/form/upload-document"
import Api from "config/api"
import '../manage_corporate.css'
import { SUCCESS_RESPONSE_STATUS } from 'lib/constants';

const staticWarding = {
  main: 'Corporate Management',
  mainSub: 'Manage Corporate',
  create: 'Create Corporate',
  edit: 'Edit Corporate',
  detail: 'Corporate Details',
  linkSub: '/master/manage-corporate'
}
const endpoint = '/master/agent-corporates'
const backUrl = "/master/manage-corporate"
const options = {
  position: "bottom-right",
}

const Spinner = () => <div className="spinner"></div>

const ManageCorporateForm = ({ match }) => {
  let dispatch = useDispatch()
  const history = useHistory()
  const api = new Api()
  const formId = match?.params?.id
  const [openSnackbar] = useSnackbar(options)

  const isView = useQuery().get("action") === "view"

  const [tabKey, setTabKey] = useState("general-information")
  const [finishStep, setStep] = useState(0)
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
        if (SUCCESS_RESPONSE_STATUS.includes(status)) {
          setData(data)
          setIsLoading(false)
        }
      }
    } catch (error) {
      openSnackbar(`error => ${error}`)
    }
  }, [])

  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const handleChangeTabKey = (key, step) => {
    /*
      ! onSubmit post API better on file itself
      * here just to change the active tab key
    */

    if (formId && isView) {
      if(tabKey === "general-information") {
        setTabKey("branch-office")
        setStep(1)
      } else if(tabKey === "branch-office") {
        setTabKey("system-administrator")
        setStep(2)
      } else if(tabKey === "system-administrator") {
        setTabKey("setting")
        setStep(3)
      }else if(tabKey === "setting") {
        setTabKey("mark-up")
        setStep(4)
      }else if(tabKey === "mark-up") {
        setTabKey("service-fee")
        setStep(5)
      }else if(tabKey === "service-fee") {
        setTabKey("ancillary-fee")
        setStep(6)
      }else if(tabKey === "ancillary-fee") {
        setTabKey("assign-team")
        setStep(7)
      }else if(tabKey === "assign-team") {
        setTabKey("credit-limit")
        setStep(8)
      }else if(tabKey === "credit-limit") {
        setTabKey("invoice-settings")
        setStep(9)
      }else if(tabKey === "invoice-settings") {
        setTabKey("corporate-rating")
        setStep(10)
      }else if(tabKey === "corporate-rating") {
        setTabKey("corporate-fare")
        setStep(11)
      }else if(tabKey === "corporate-fare") {
        setTabKey("upload-document")
        setStep(12)
      }else if(tabKey === "upload-document") {
        setTabKey('import-database-employee')
        setStep(13)
        // ! what should do if end form ???
      }
    }

    if (!formId) {
      setTabKey(key)
      setStep(step)
    }
  }

  const handleDisabledMenu = (key) => {
    if (isView) return false

    switch (key) {
      case 'branch-office':
        if (finishStep < 1) return true
        return false

      case 'system-administrator':
        if (finishStep < 2) return true
        return false

      case 'setting':
        if (finishStep < 3) return true
        return false

      case 'mark-up':
        if (finishStep < 4) return true
        return false

      case 'service-fee':
        if (finishStep < 5) return true
        return false

      case 'ancillary-fee':
        if (finishStep < 6) return true
        return false

      case 'assign-team':
        if (finishStep < 7) return true
        return false

      case 'credit-limit':
        if (finishStep < 8) return true
        return false

      case 'invoice-settings':
        if (finishStep < 9) return true
        return false

      case 'corporate-rating':
        if (finishStep < 10) return true
        return false

      case 'corporate-fare':
        if (finishStep < 11) return true
        return false

      case 'upload-document':
        if (finishStep < 12) return true
        return false

      case 'import-database-employee':
        if (finishStep < 13) return true
        return false

      default:
        return false
    }
  }

  return (
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
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
                    {/* <Nav.Link eventKey="branch-office" disabled={finishStep < 1 && !data?.id}> */}
                    <Nav.Link eventKey="branch-office" disabled={handleDisabledMenu('branch-office')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-branch-office.svg" />
                        <span>Branch Offices</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="system-administrator" disabled={handleDisabledMenu('system-administrator')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-system-administrator.svg" />
                        <span>System Administrator</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="setting" disabled={handleDisabledMenu('setting')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-setting.svg" />
                        <span>Settings</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="mark-up" disabled={handleDisabledMenu('mark-up')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-markup.svg" />
                        <span>Mark Up</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="service-fee" disabled={handleDisabledMenu('service-fee')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-service-fee.svg" />
                        <span>Service Fee</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ancillary-fee" disabled={handleDisabledMenu('ancillary-fee')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-ancillary-fee.svg" />
                        <span>Ancillary Fee</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assign-team" disabled={handleDisabledMenu('assign-team')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-assign-team.svg" />
                        <span>Assign Team</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="credit-limit" disabled={handleDisabledMenu('credit-limit')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-credit-limit.svg" />
                        <span>Credit Limit</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="invoice-settings" disabled={handleDisabledMenu('invoice-settings')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-invoice-setting.svg" />
                        <span>Invoice Settings</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="corporate-rating" disabled={handleDisabledMenu('corporate-rating')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-corporate-rating.svg" />
                        <span>Corporate Rating</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="corporate-fare" disabled={handleDisabledMenu('corporate-fare')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-corporate-fare.svg" />
                        <span>Corporate Fare</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="upload-document" disabled={handleDisabledMenu('upload-document')}>
                      <div>
                        <ReactSVG src="/img/icons/corporate-upload-document.svg" />
                        <span>Upload Document</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="import-database-employee" disabled={handleDisabledMenu('import-database-employee')}>
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
                    {tabKey === 'general-information' &&
                      <GeneralInformation
                        history={history}
                        backUrl={backUrl}
                        handleChangeTabKey={handleChangeTabKey}
                        corporateId={formId}
                        data={data}
                      />
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="branch-office">
                    {tabKey === 'branch-office' &&
                      <BranchOffice
                        handleChangeTabKey={handleChangeTabKey}
                      />
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="system-administrator">
                    {tabKey === 'system-administrator' && <SystemAdministrator />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="setting">
                    {tabKey === 'setting' && <Settings />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="mark-up">
                    {tabKey === 'mark-up' && <MarkUp />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="service-fee">
                    {tabKey === 'service-fee' && <ServiceFee />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="ancillary-fee">
                    {tabKey === 'ancillary-fee' && <AncillaryFee />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="assign-team">
                    {tabKey === 'assign-team' && <AssignTeam />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="credit-limit">
                    {tabKey === 'credit-limit' && <CreditLimit />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="invoice-settings">
                    {tabKey === 'invoice-settings' && <InvoiceSettings />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="corporate-rating">
                    {tabKey === 'corporate-rating' && <CorporateRating />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="corporate-fare">
                    {tabKey === 'corporate-fare' && <CorporateFare />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="upload-document">
                    {tabKey === 'upload-document' && <UploadDocument />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="import-database-employee">
                    {tabKey === 'import-database-employee' && <ImportDatabaseEmployee />}
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
