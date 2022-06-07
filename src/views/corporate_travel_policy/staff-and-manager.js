import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import Form from "./form/identity-rule"

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
        infoDelete: [
            {title: "Destination", recordName: "destination"}, 
            {title: "Highest Cabin Class", recordName: "highest_cabin_class"},
          ],
    }

    return (
        <Card>
        <Card.Body>
            <div>
                Staff and Manager
                <BBDataTable {...params} modalContent={Form} modalSize="lg" />
            </div>
        </Card.Body>
        </Card>
    )
}
export default StaffAndManager