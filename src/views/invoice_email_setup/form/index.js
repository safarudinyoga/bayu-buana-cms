import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap"
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

    const [content, setContent] = useState(['Email Content', 'Push Notification'])

    // api https://bbdev.monstercode.net/api/v1/master/agent-languages?size=-1&sort=sort,language_name
    const [languages, setLanguages] = useState([])
    const [firstLanguage, setFirstLanguage] = useState({})
    useEffect(async () => {
        let api = new Api()
        api.get("/master/agent-languages?size=-1&sort=sort,language_name").then(res => {
            setLanguages(res.data.items)
        })
    }, []);

    const borderStyle = {
        border: "1px solid #ddd",
        borderRadius: "4px",
    }

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
                <div style={borderStyle}>
                    <Tabs defaultActiveKey={languages[0]?.language_code} className="mb-3">
                        {languages.map((item, index) => {
                            return (
                                <Tab eventKey={item.language_code} title={item.language_name} key={index} >
                                    <Row className="p-3" style={{border: 1, borderColor: '#ccc'}}>
                                        <Col md={12}>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Label column sm={3}>
                                                    Invoice Email Name{" "}
                                                    <span className="form-label-required">*</span>
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="Invoice Per Transactional Email"></Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Label column sm={3}>
                                                    Email Type{" "}
                                                    <span className="form-label-required">*</span>
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="Invoice Per Transactional"></Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="form-group">
                                                <Form.Label column sm={3}>
                                                    Email Subject{" "}
                                                    <span className="form-label-required">*</span>
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="{{invoice_number}} Bayu Buana Invoice For {{corporate_name}}"></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div style={borderStyle} className="m-3">
                                        <Row>
                                            <Col md={12}>
                                                <Tabs defaultActiveKey={'Email Content'} className="mb-3">
                                                    {content.map((item, index) => {
                                                        return (
                                                            <Tab eventKey={item} title={item} key={index}>
                                                                <Row className="p-3">
                                                                    <Form.Control as="textarea" rows={3}></Form.Control>
                                                                </Row>
                                                                <Row className="p-3">
                                                                    <Button className={'mr-1'} variant="secondary">PREVIEW</Button>
                                                                    <Button variant="primary">SEND TEST</Button>
                                                                </Row>
                                                            </Tab>
                                                        )
                                                    })}
                                                </Tabs>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                            )
                        })}
                    </Tabs>
                </div>
            </Col>
        </Row >
    )
}

export default withRouter(InvoiceEmailSetupForm)
