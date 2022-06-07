import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectMultiAjax from "components/form/input-select-multi-ajax"
import { ReactSVG } from "react-svg"
import "./style.scss"

const PreferredHotelChain = (props) => {

    const [form, setForm] = useState({
        prefered_hotel_type: "",
    })
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setUIParams({
                title: "Preferred Hotel Chains",
                breadcrumbs: [
                    {
                        text: "Corporate Management",
                    },
                    {
                        text: "Preferred Hotel Chains",
                    },
                ],
            }),
        )
        }, [])
    
    let params = {
        title: "Preferred Hotel Chains",
        titleModal: "Preferred Hotel Chains",
        baseRoute: "/master/corporate-management/form",
        endpoint: "/master/configurations/identity-rules",
        deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
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
        <Card.Body className="px-1 px-md-4">
            <h3 className="preferred-hotel-title">Preferred Hotel Chains</h3>
            <div className="preferred-hotel-body">
                <ReactSVG src="/img/icons/corporate-preferred-hotel.svg" />
                <h5>PREFERRED HOTEL CHAINS</h5>
                <FormInputSelectMultiAjax 
                    label=""
                />
                </div>
        </Card.Body>
        </Card>
    )
}
export default PreferredHotelChain