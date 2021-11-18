import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

import GeneralInformation from "./general-information"
import EmergencyContacts from "./emergency-contacts"
import Employment from "./employment"

const endpoint = "/master/employees"
const backUrl = "/master/employee"

const EmployeeForm = (props) => {
  let dispatch = useDispatch()

  let api = new Api()

  const [tabKey, setTabKey] = useState("general-information")
  const [selectJobTitle, setSelectJobTitle] = useState([])
  const [selectDivision, setSelectDivision] = useState([])
  const [selectBranchOffice, setSelectBranchOffice] = useState([])

  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    aircraft_name: "",
    model: "",
    icao_code: "",
    aircraft_code: "",
  })

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Employee"
    if (!formId) {
      docTitle = "Create Employee"
    } else if (isView) {
      docTitle = "Employee Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employee Management",
          },
          {
            link: backUrl,
            text: "Master Employee",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
      } catch (e) {}
      setLoading(false)
    }
  }, [])

  // Select tabs
  const handleSelectTab = async (key) => {
    setTabKey(key)

    if (key == "employment") {
      try {
        let res = await api.get("/master/job-titles")
        const options = []
        res.data.items.forEach((data) => {
          options.push({
            label: data.job_title_name,
            value: data.id,
          })
          setSelectJobTitle(options)
        })
      } catch (e) {}
      try {
        let res = await api.get("/master/divisions")
        const options = []
        res.data.items.forEach((data) => {
          options.push({
            label: data.division_name,
            value: data.id,
          })
          setSelectDivision(options)
        })
      } catch (e) {}
      try {
        let res = await api.get("/master/divisions")
        const options = []
        res.data.items.forEach((data) => {
          options.push({
            label: data.division_name,
            value: data.id,
          })
          setSelectBranchOffice(options)
        })
      } catch (e) {}
    }
  }

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  return (
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-side">
            <Nav.Item>
              <Nav.Link eventKey="general-information">
                <div>
                  <ReactSVG src="/img/icons/general-information.svg" />
                  <span>General Information</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="emergency-contacts">
                <div>
                  <ReactSVG src="/img/icons/emergency-contacts.svg" />
                  <span>Emergency Contacts</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="employment">
                <div>
                  <ReactSVG src="/img/icons/employment.svg" />
                  <span>Employment</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="general-information">
              <GeneralInformation
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="emergency-contacts">
              <EmergencyContacts
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="employment">
              <Employment
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
                selectJobTitle={selectJobTitle}
                selectDivision={selectDivision}
                selectBranchOffice={selectBranchOffice}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(EmployeeForm)
