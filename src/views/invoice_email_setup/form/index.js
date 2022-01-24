import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {Button, Card, Col, Nav, Row, Tab, TabContent} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"


const endpoint = "/master/employees"
const backUrl = "/master/employee"

const InvoiceEmailSetupForm = (props) => {
    let dispatch = useDispatch()
    let api = new Api()
    const [tabKey, setTabKey] = useState("general-information")

    const isView = useQuery().get("action") === "view"
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(null)
    const [form, setForm] = useState({

    })

    useEffect(async () => {
        let api = new Api()
        let formId = props.match.params.id

        let docTitle = "Email Template 1 - Edit Invoice Per Transaction Email"
        if (!formId) {
            docTitle = "Edit Invoice Email Setup"
        } else if (isView) {
            docTitle = "Invoice Email Setup Details"
        }

        dispatch(
            setUIParams({
                title: docTitle,
                breadcrumbs: [
                    {
                        text: "Setup and Configuration",
                    },
                    {
                        link: backUrl,
                        text: "Invoice Email Setup",
                    },
                    {
                        link: backUrl,
                        text: "Email Template 1",
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
            } catch (e) { }
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!props.match.params.id) {
            setLoading(false)
        }
        setId(props.match.params.id)
    }, [props.match.params.id])

    return (
        <Row>
            <Col md={1}>
                <div style={{width: 70, backgroundColor: '#ccc', height: 70, borderRadius: 15, padding: 10, alignContent: 'center', textAlign: 'center', marginBottom: 10}}>
                    <img src="/img/icons/users.svg" alt="icon users"></img>
                    <p>Variable</p>
                </div>
                <div style={{width: 70, backgroundColor: '#ccc', height: 70, borderRadius: 15, padding: 10, alignContent: 'center', textAlign: 'center'}}>
                    <img src="/img/icons/users.svg" alt="icon users"></img>
                    <p>Widget</p>
                </div>
            </Col>
            <Col md={11}>
                <Nav variant="tabs" defaultActiveKey="english">
                    <Nav.Item>
                        <Nav.Link
                            eventKey="english"
                            onClick={function noRefCheck() { }}
                        >
                            Default (English)
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="chinese"
                            onClick={function noRefCheck() { }}
                        >
                            Chinese Simplified
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="chinese-traditional"
                            onClick={function noRefCheck() { }}
                        >
                            Chinese Traditional
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent activeTab="1">
                    <Tab.Pane eventKey="english">
                        <Row>
                            <Col sm="12">
                                <h4>
                                    Tab 1 Contents
                                </h4>
                            </Col>
                        </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="chinese">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <Card.Title>
                                        Special Title Treatment
                                    </Card.Title>
                                    <Card.Text>
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                    <Button>
                                        Go somewhere
                                    </Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <Card.Title>
                                        Special Title Treatment
                                    </Card.Title>
                                    <Card.Text>
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                    <Button>
                                        Go somewhere
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </Tab.Pane>
                </TabContent>
            </Col>
        </Row >
    )
}

export default withRouter(InvoiceEmailSetupForm)
