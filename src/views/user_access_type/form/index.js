import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

import UserAccessTypeInformation from "./user-access-type-information"
import ModuleAccess from "./module-access"

const backUrl = "/master/user-access-type"

const UserAccessTypeForm = (props) => {
  let dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("user-access-type-information")
  const isView = useQuery().get("action") === "view"
  
  useEffect(async () => {
    let formId = props.match.params.id

    let docTitle = "Edit User Access Type"
    if (!formId) {
      docTitle = "Create User Access Type"
    } else if (isView) {
      docTitle = "User Access Type Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "User & Access Management",
          },
          {
            link: backUrl,
            text: "User Access Type",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  }, [])

  // Select tabs
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  useEffect(() => {
  }, [props.match.params.id])

  return (
    <Tab.Container activeKey={tabKey} onSelect={handleSelectTab}>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-side">
            <Nav.Item>
              <Nav.Link eventKey="user-access-type-information">
                <div>
                  <ReactSVG src="/img/icons/user-access-type.svg" />
                  <span>User Access Type Information</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="module-access">
                <div>
                  <ReactSVG src="/img/icons/module-access.svg" />
                  <span>Module Access</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="user-access-type-information">
              <UserAccessTypeInformation
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="module-access">
              <ModuleAccess
                history={props.history}
                backUrl={backUrl}
                handleSelectTab={(v) => handleSelectTab(v)}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(UserAccessTypeForm)
