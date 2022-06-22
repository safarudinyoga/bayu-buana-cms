import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
// import BBDataTable from "components/table/bb-data-table"
import { Card, OverlayTrigger, Tooltip, Popover } from "react-bootstrap"
import { Link } from "react-router-dom"
// import FormFlight from "./form/flight-policy-for-staff-and-manager.js"
import FormHotel from "./form/hotel-policy-for-staff-and-manager.js"
// import Form from "./form/standart-service-form.js"
import FlightPolicyDataTable from "./data_table/flight_policy.js"
import HotelPolicyDataTable from "./data_table/hotel_policy.js"
import "./style.scss"

const StaffAndManager = (props) => {
    
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setUIParams({
                title: "Travel Policy",
                breadcrumbs: [
                    {
                        text: "Corporate Management",
                    },
                    {
                        text: "Travel Policy",
                    },
                ],
            }),
        )
        }, [])

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props} >
              <div className="staff-and-manager-tooltip">
                <ul>
                    <li>Procurement manager</li>
                    <li>Engineer</li>
                    <li>Finance Controller</li>
                    <li>IT Manager</li>
                    <li>Sales Manager</li>
                    <li>Engineer</li>
                    <li>System Analyst</li>
                    <li>Sales Supervisor</li>
                </ul>
                <ul>
                    <li>Procurement manager</li>
                    <li>Engineer</li>
                    <li>Finance Controller</li>
                    <li>IT Manager</li>
                    <li>Sales Manager</li>
                    <li>Engineer</li>
                    <li>System Analyst</li>
                    <li>Sales Supervisor</li>
                </ul>
              </div>
            </Tooltip>
        );

    return (
        <Card>
        <Card.Body>
            <div className="travel-policy-body"><h3>Staff and Manager</h3>
            <span><OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
            <u>16 Job Position</u>
            </OverlayTrigger>
            &nbsp;are under this policy class</span>
            </div>
            <Card>
                <Card.Body>
                <FlightPolicyDataTable />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <HotelPolicyDataTable />
                </Card.Body>
            </Card>
        </Card.Body>
        </Card>
    )
}
export default StaffAndManager