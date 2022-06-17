import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const Director = (props) => {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setUIParams({
                title: "Director",
                breadcrumbs: [
                    {
                        text: "Corporate Management",
                    },
                    {
                        text: "Director",
                    },
                ],
            }),
        )
        }, [])
    
    let params = {
        title: "Director",
        titleModal: "Director",
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
        <div>
            Director
        </div>
    )
}
export default Director