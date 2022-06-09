import React from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import FormFlight from "../form/flight-policy-for-staff-and-manager.js"
import "../style.scss"

const FlightPolicyDataTable = () => {
    let params = {
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

    return (
        <Card>
            <Card.Body>
                <div ><h5>FLIGHT POLICY 123</h5></div>
                <BBDataTable {...params} modalContent={FormFlight} modalSize="lg" />
            </Card.Body>
        <div>
            For BB data table view
        </div>
        </Card>
    )
}
export default FlightPolicyDataTable