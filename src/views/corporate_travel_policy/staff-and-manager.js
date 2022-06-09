import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import BBDataTable from "components/table/bb-data-table"
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link } from "react-router-dom"
// import FormFlight from "./form/flight-policy-for-staff-and-manager.js"
import FormHotel from "./form/hotel-policy-for-staff-and-manager.js"
import Form from "./form/standart-service-form.js"
import FlightPolicyDataTable from "./data_table/flight_policy.js"
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
    
    let paramsFlight = {
        title: "Staff and Manager",
        titleModal: "Staff and Manager",
        baseRoute: "/master/corporate-management/form",
        endpoint: "/master/configurations/identity-rules",
        deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
        columns: [
        {
            title: "Destination",
            data: "destination",
        },
        {
            title: "Highest Cabin Class",
            data: "highest_cabin_class",
        },
        {
            title: "Preferred Airlines",
            data: "preferred_airlines",
        },
        {
            title: "Restrict Airlines",
            data: "restrict_airlines",
        },
        {
            title: "Status",
            data: "status",
        }
        ],
        emptyTable: "No Identity Rule found",
        recordName: ["identity_code", "identity_name"],
        btnDownload: ".buttons-csv",
        module: "identity-rules",
        isCheckbox: false,
        switchStatus: true,   
        showAdvancedOptions: false,
        isHideSearch: true,
        showInfoDelete: true,
        createOnModal: true,
        infoDelete: [
            {title: "Destination", recordName: "destination"}, 
            {title: "Highest Cabin Class", recordName: "highest_cabin_class"},
          ],
    }
    let paramsHotel = {
        title: "Staff and Manager",
        titleModal: "Staff and Manager",
        baseRoute: "/master/corporate-management/form",
        endpoint: "/master/configurations/identity-rules",
        deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
        columns: [
        {
            title: "Destination",
            data: "destination",
        },
        {
            title: "Highest Cabin Class",
            data: "highest_cabin_class",
        },
        {
            title: "Preferred Airlines",
            data: "preferred_airlines",
        },
        {
            title: "Restrict Airlines",
            data: "restrict_airlines",
        },
        {
            title: "Status",
            data: "status",
        }
        ],
        emptyTable: "No Identity Rule found",
        recordName: ["identity_code", "identity_name"],
        btnDownload: ".buttons-csv",
        module: "identity-rules",
        isCheckbox: false,
        switchStatus: true,   
        showAdvancedOptions: false,
        isHideSearch: true,
        showInfoDelete: true,
        createOnModal: true,
        infoDelete: [
            {title: "Destination", recordName: "destination"}, 
            {title: "Highest Cabin Class", recordName: "highest_cabin_class"},
          ],
    }

    function data() {
        return (
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
        )
    }

    let obj = {
        "test price type ty dynamic ": 10, 
        "test": 7, 
        "pricetype1u": 0, 
        "Price type 3": 0, 
        "Price type 2": 0  
      }

    function convertObjTooltip(obj) {
        const results = [];
        Object.keys(obj).reduce((sum, key) => {
            sum.push(`${key}: ${obj[key]}`);
            return sum;
        }, results);
        return results.join('\n');
    }

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
                    {/* <div ><h5>FLIGHT POLICY 123</h5></div>
                    <BBDataTable {...paramsFlight} modalContent={FormFlight} modalSize="lg" /> */}
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <div><h5>HOTELS</h5></div>
                    <BBDataTable {...paramsHotel} modalContent={FormHotel} modalSize="lg" />
                </Card.Body>
            </Card>
        </Card.Body>
        </Card>
    )
}
export default StaffAndManager