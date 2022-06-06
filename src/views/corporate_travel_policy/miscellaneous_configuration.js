import React, { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormikControl from "../../components/formik/formikControl"
import "./style.scss"

const MiscellaneousConfiguration = (props) => {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setUIParams({
                title: "Miscellaneous Configuration",
                breadcrumbs: [
                    {
                        text: "Corporate Management",
                    },
                    {
                        text: "Miscellaneous Configuration",
                    },
                ],
            }),
        )
        }, [])
    
    let params = {
        title: "Miscellaneous Configuration",
        titleModal: "Miscellaneous Configuration",
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
            <h3 className="misc-title">Miscellaneous Configuration</h3>
            <div className="misc-wrapper"><h5>BOOKING LEAD TIME</h5><p>&ensp;-&ensp;require to book in advance</p></div>
            <div className="misc-body">
                <div className="misc-text"><h5>FLIGHT</h5> <span>&ensp;-&ensp;Minimum Booking days before departure</span>
                <FormikControl
                    control="Input"
                    required="label-required"
                    label="Specified Airline"
                    name="airline_id"
                    placeholder="Please Choose"
                    
                /></div>
                <div className="misc-text"><h5>HOTEL</h5> <span>&ensp;-&ensp;Minimum Booking days before check-in</span></div>
            </div>
        </Card.Body>
        </Card>
    )
}
export default MiscellaneousConfiguration