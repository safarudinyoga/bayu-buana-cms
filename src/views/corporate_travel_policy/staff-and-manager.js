import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
// import BBDataTable from "components/table/bb-data-table"
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
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

    return (
        <Card>
        <Card.Body>
            <div className="travel-policy-body"><h3>Staff and Manager</h3><u data-toggle="tooltip" data-placement="bottom" title="Procurement manager
            Engineer
            Finance Controller
            IT Manager
            Sales Manager
            Engineer
            System Analyst
            Sales Supervisor">16 Job Position</u>
            <span> are under this policy class</span></div> 
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