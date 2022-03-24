import React, { useEffect, useState } from "react"
import Api from "config/api"
import { useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router';
import { ReactSVG } from "react-svg"
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

import GeneralInformation from "./general-information"
import EmergencyContacts from "./emergency-contacts"
import Employment from "./employee"
import "./employee-form.css"

import { useWindowSize } from "rooks"
import { Card } from "react-bootstrap";

const endpoint = "/master/employees"
const backUrl = "/master/employee"
const options = {
  position: "bottom-right",
}

const UserProfile = (props) => {
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  const dispatch = useDispatch()
  const api = new Api()
  const isView = useQuery().get("action") === "view"

  const [tabKey, setTabKey] = useState("general-information")
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [Data, setData] = useState(null)
  const [finishStep, setStep] = useState(0)
  const [photoData, setPhotoData] = useState(null)

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
            text: "Management",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if(formId) {
        let {data} = await api.get(endpoint + "/" + formId)
        setData(data)
        setPhotoData(data.employee_asset?.multimedia_description ? {
          id: data.employee_asset.multimedia_description_id,
          data_url: data.employee_asset.multimedia_description.url
        } : null)
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
    }
    finally{
      setLoading(false)
    }
  }, [])

  const fetchEmployee = async() => {
    let formId = props.match.params.id
    console.log(formId) 
    try {
      if(formId) {
        let {data} = await api.get(endpoint + "/" + formId)
        return data
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
    }
  }

  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const handleSelectAccordion = async (key) => {
    setTabKey(key === tabKey ? "" : key)
  }

  const doUpload = async (imageList) => {
    try {
      let payload = new FormData()
      payload.append("files", imageList[0].file)

      if(photoData || photoData !== null) await removeImage(photoData.id)

      let res = await api.post("/multimedia/files", payload)
      return res.data.id
    } catch(e) {

    }
  }
  const removeImage = async (id) => {
    try {
      let res = await api.delete("/multimedia/files/"+id)
      return null
    } catch(e) {

    }
  }

  const onSubmit = async(values) => {
    try {
      let formId = props.match.params.id

      if(formId) {
        setForm({...form, ...values})
        await onSave(values)
      } else {
        if(tabKey === "general-information") {
          setTabKey("emergency-contacts")
          setForm({...form, ...values})
          if(finishStep < 1) setStep(1)
        } else if(tabKey === "emergency-contacts") {
          setTabKey("employment")
          setForm({...form, ...values})
          if(finishStep < 2) setStep(2)
        } else {
          setForm({...form, ...values})
          await onSave(values)
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  const onSave = async() => {
    try {
      let formId = props.match.params.id

      let photo_id = null
      if(form.photoProfile.length > 0) {
        if( !photoData || photoData?.data_url !== form.photoProfile[0].data_url) {
          photo_id = await doUpload(form.photoProfile)
        } else {
          photo_id = form.photoProfile[0].data_url
        }
      }
      if(photoData && form.photoProfile.length === 0) photo_id = await removeImage(photoData?.id)

      if (!formId) {
        //ProsesCreateData
          let res = await api.post("master/employees", form)
          openSnackbar(
            `Record 'Employee Number: ${
              form.employee_number
            } Employee Name: ${
              form.given_name +
              " " +
              form?.middle_name +
              " " +
              form.surname
            }' has been successfully saved.`,
          )
          history.goBack()
      } else {
        //ProsesUpdateData
          let res = await api.put(`master/employees/${formId}`, form)
          openSnackbar(
            `Record 'Employee Number: ${
              form.employee_number
            } Employee Name: ${
              form.given_name +
              " " +
              form?.middle_name +
              " " +
              form.surname
            }' has been successfully update.`,
          )
          if(tabKey === "employment") history.goBack()
      }
    } catch(e) {
      openSnackbar(`error: ${e}`)
    }
  }

  return (
    <>
      {
        innerWidth > 480 ? (
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
                    <Nav.Link eventKey="emergency-contacts" disabled={finishStep < 1 && !Data?.id} >
                      <div>
                        <ReactSVG src="/img/icons/emergency-contacts.svg" />
                        <span>Emergency Contacts</span>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="employment" disabled={finishStep < 2 && !Data?.id}>
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
                      isMobile={false}
                      employeeData={Data}
                      onSubmit={onSubmit}
                      finishStep={finishStep}
                      formData={form}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="emergency-contacts">
                    <EmergencyContacts
                      history={props.history}
                      backUrl={backUrl}
                      handleSelectTab={(v) => handleSelectTab(v)}
                      isMobile={false}
                      employeeData={Data}
                      onSubmit={onSubmit}
                      finishStep={finishStep}
                      formData={form}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="employment">
                    <Employment
                      history={props.history}
                      backUrl={backUrl}
                      handleSelectTab={(v) => handleSelectTab(v)}
                      isMobile={false}
                      employeeData={Data}
                      onSubmit={onSubmit}
                      finishStep={finishStep}
                      formData={form}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        ) : 
        (
          <Accordion activeKey={tabKey}>
            <Card>
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="general-information"
                style={
                  tabKey === "general-information"
                    ? { backgroundColor: "#dddddd", color: "#038072" }
                    : null
                }
                onClick={() => {
                  handleSelectAccordion("general-information")
                }}
              >
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/general-information.svg" 
                    className={
                      tabKey === "general-information"
                        ? "icon-active"
                        : "icon-grey"
                    }
                  />
                  <span>General Information</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="general-information">
                <GeneralInformation
                  history={props.history}
                  backUrl={backUrl}
                  isMobile={true}
                  employeeData={Data}
                  onSubmit={onSubmit}
                  finishStep={finishStep}
                  formData={form}
                />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="emergency-contacts"
                style={
                  tabKey === "emergency-contacts"
                    ? { backgroundColor: "#dddddd", color: "#038072" }
                    : null
                }
                onClick={() => {
                  console.log(Data)
                  !(finishStep < 2 && !Data?.id) && handleSelectAccordion("emergency-contacts")
                }}
              >
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/emergency-contacts.svg" 
                    className={
                      tabKey === "emergency-contacts"
                        ? "icon-active"
                        : "icon-grey"
                    }
                  />
                  <span>Emergency Contacts</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="emergency-contacts">
                <EmergencyContacts
                  history={props.history}
                  backUrl={backUrl}
                  isMobile={true}
                  handleSelectAccordion={(v) => handleSelectAccordion(v)}
                  employeeData={Data}
                  onSubmit={onSubmit}
                  finishStep={finishStep}
                  formData={form}
                />
              </Accordion.Collapse> 
            </Card>
            <Card>
              <Accordion.Toggle 
                as={Card.Header} 
                eventKey="employment"
                style={
                  tabKey === "employment"
                    ? { backgroundColor: "#dddddd", color: "#038072" }
                    : null
                }
                onClick={() => {
                  !(finishStep < 2 && !Data?.id) && handleSelectAccordion("employment")
                }}
              >
                <div className="accordion-header">
                  <ReactSVG src="/img/icons/employment.svg" 
                      className={
                        tabKey === "employment"
                          ? "icon-active"
                          : "icon-grey"
                      }
                  />
                  <span>Employment</span>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="employment">
                <Employment
                  history={props.history}
                  backUrl={backUrl}
                  isMobile={true}
                  handleSelectAccordion={(v) => handleSelectAccordion(v)}
                  employeeData={Data}
                  onSubmit={onSubmit}
                  finishStep={finishStep}
                  formData={form}
                />
              </Accordion.Collapse> 
            </Card>
          </Accordion>
        )
      }
      
    </>
    
  );
}

export default withRouter(UserProfile);
