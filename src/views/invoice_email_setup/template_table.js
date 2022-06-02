import BBDataTable from "components/table/bb-data-table"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import { useParams } from "react-router-dom"
import {setUIParams} from "redux/ui-store"

const backUrl = "/master/invoice-email-setup"
export default function InvoiceEmailSetupTable() {
    let routeParams = useParams()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setUIParams({
                title: "Email Template 1",
                breadcrumbs: [
                    {
                        text: "Setup and Configurations",
                    },
                    {
                        text: "Invoice Email Setup",
                        link: backUrl,
                    },
                    {
                        text: "Email Template 1",
                    },
                ],
            }),
        )
    }, [])

    let params = {
        hideCreate: true,
        title: "Invoice Email Setup",
        titleModal: "Invoice Email Setup",
        baseRoute: `/master/invoice-email-setup/${routeParams.template_id}/form`,
        module: "email-setup-template",
        endpoint: "/master/languages",
        deleteEndpoint: "",
        activationEndpoint: "",
        deactivationEndpoint: "",
        columns: [
            {
                title: "Email Template",
                data: "Email Template",
            },
        ],
        emptyTable: "No Invoice Email found",
        recordName: ["hotel_brand_code", "hotel_brand_name"],
        showAdvancedOptions: false
    }
    return <BBDataTable {...params} />
}
