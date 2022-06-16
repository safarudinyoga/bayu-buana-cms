import { withRouter, useHistory } from "react-router"
import React, { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import Api from "config/api"

import UserAccessTypeInformation from "./user-access-type-information"
import ModuleAccess from "./module-access"

const backUrl = "/master/user-access-type"
const endpoint = "/user/user-types"
const options = {
  position: "bottom-right",
}

const UserAccessTypeForm = (props) => {
  let dispatch = useDispatch()
  const [tabKey, setTabKey] = useState("user-access-type-information")
  const history = useHistory()
  const isView = useQuery().get("action") === "view"
  const [finishStep, setStep] = useState(0)
  const [Data, setData] = useState(null)
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userTypeId, setUserTypeId] = useState(null)
  const api = new Api()

  const [openSnackbar] = useSnackbar(options)
  
  useEffect(async () => {
    let api = new Api()
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
            text: "Setup & Configuration",
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
    try {
      if(formId){
        let {data} = await api.get(endpoint + "/" + formId)
        setData(data)
      }
      
    } catch (e) {
      openSnackbar(`error => ${e}`)
    }
    finally{
      setLoading(false)
    }
  }, [])

  // Select tabs
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  useEffect(() => {
  }, [props.match.params.id])

  // const onSave = async(values) => {
  //   try {
  //     let formId = props.match.params.id

  //     values ={
  //       ...values,
  //       job_title_id: values.job_title_id ? values.job_title_id : values.job_title.id,
  //       office_id: values.office_id ? values.office_id : values.office?.id ? values.office.id : "00000000-0000-0000-0000-000000000000",
  //       division_id: values.division_id ? values.division_id : values.division?.id ? values.division.id : "00000000-0000-0000-0000-000000000000",
  //     }

  //     if (!formId) {
  //       //ProsesCreateData
  //         let res = await api.post("/user/user-types", values)
  //         history.goBack()
  //     } else {
  //       //ProsesUpdateData
  //         let res = await api.put(`/user/user-types/${formId}`, values)
  //         setForm({...res.data})
  //         if(tabKey === "employment") history.goBack()
  //     }
  //   } catch(e) {
  //     openSnackbar(`error: ${e}`)
  //   }
  // }

  // const onSubmit = async(values) => {
  //   try {
  //     let formId = props.match.params.id

  //     if(formId) {
  //       await onSave({...Data, ...form, ...values})
  //     } else {
  //       if(tabKey === "user-access-type-information") {
  //         setTabKey("module-access")
  //         setForm({...Data, ...form, ...values})
  //         if(finishStep < 1) setStep(1)
  //       } else {
  //         setForm({...Data, ...form, ...values})
  //         await onSave({...Data, ...form, ...values})
  //       }
  //     }
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }



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
              <Nav.Link eventKey="module-access" disabled={finishStep < 1 && !Data?.id}>
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
