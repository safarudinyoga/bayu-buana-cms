import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
// import Form from "./form/identity-rule"

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
    
    let params = {
        title: "Staff and Manager",
        titleModal: "Staff and Manager",
        // baseRoute: "/master/corporate-management/form",
        // endpoint: "/master/configurations/identity-rules",
        // deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
        columns: [
        {
            title: "Restriction Base On",
            data: "restriction_base_on",
        },
        {
            title: "Destination Name",
            data: "destination_name",
        },
        {
            title: "Type of Restriction",
            data: "type_of_restriction",
        },
        {
            title: "Document(s)",
            data: "document_name",
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
    }

    return (
        <Card>
        <Card.Body>
            <div>
                Staff and Manager
                {/* <BBDataTable {...params} /> */}
            </div>
        </Card.Body>
        </Card>
    )
}
export default StaffAndManager