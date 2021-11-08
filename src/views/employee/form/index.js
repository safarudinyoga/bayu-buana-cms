import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
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

function EmployeeForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    aircraft_name: "",
    model: "",
    icao_code: "",
    aircraft_code: "",
  })
  const translationFields = [
    {
      label: "Aircraft Name",
      name: "aircraft_name",
      type: "text",
    },
  ]

  const validationRules = {
    aircraft_name: {
      required: true,
      min: 1,
      max: 64,
    },
    model: {
      required: false,
      min: 1,
      max: 64,
    },
    icao_code: {
      required: true,
      min: 4,
      max: 4,
    },
    aircraft_code: {
      required: true,
      min: 4,
      max: 4,
    },
  }

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

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    let translated = formBuilder.getTranslations()
    setLoading(true)
    let api = new Api()
    try {
      if (!form.model) {
        form.model = null
      }
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }
    } catch (e) {
    } finally {
      setLoading(false)
      props.history.push(backUrl)
    }
  }

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="general-information"
    >
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
              <GeneralInformation />
            </Tab.Pane>
            <Tab.Pane eventKey="emergency-contacts">
              <EmergencyContacts />
            </Tab.Pane>
            <Tab.Pane eventKey="employment">
              <Employment />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(EmployeeForm)
