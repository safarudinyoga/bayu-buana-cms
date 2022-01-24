import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {Col, Nav, Row, Tab} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {ReactSVG} from "react-svg"
import {setUIParams} from "redux/ui-store"


const endpoint = "/master/employees"
const backUrl = "/master/employee"

const InvoiceEmailSetupForm = (props) => {
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
            docTitle = "Create Hotel Profile"
        } else if (isView) {
            docTitle = "Employee Details"
        }

        dispatch(
            setUIParams({
                title: docTitle,
                breadcrumbs: [
                    {
                        text: "Master Data Management",
                    },
                    {
                        link: backUrl,
                        text: "Hotel Profile Management",
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
            } catch (e) { }
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
            } catch (e) { }
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
            } catch (e) { }
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
                            <Nav.Link eventKey="room-type">
                                <div>
                                    <ReactSVG src="/img/icons/emergency-contacts.svg" />
                                    <span>Room Type</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="hotel-facilities">
                                <div>
                                    <ReactSVG src="/img/icons/emergency-contacts.svg" />
                                    <span>Hotel Facilities</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="media">
                                <div>
                                    <ReactSVG src="/img/icons/emergency-contacts.svg" />
                                    <span>Media</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="nearby-attractions">
                                <div>
                                    <ReactSVG src="/img/icons/emergency-contacts.svg" />
                                    <span>Nearby Attractions</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="point-of-references">
                                <div>
                                    <ReactSVG src="/img/icons/emergency-contacts.svg" />
                                    <span>Point of References</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="general-information">
                            <p>Hello</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="room-type">
                            <p>Hello</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="hotel-facilities">
                            <p>Hello</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="media">
                            <p>Hello</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="nearby-attractions">
                            <p>Hello</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="point-of-references">
                            <p>Hello</p>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default withRouter(InvoiceEmailSetupForm)
