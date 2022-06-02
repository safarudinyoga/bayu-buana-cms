import BBDataTable from "components/table/bb-data-table"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"

import FormEmailCategory from "./form/email_category"

export default function InvoiceEmailSetupTable() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            setUIParams({
                title: "Invoice Email Setup",
                breadcrumbs: [
                    {
                        text: "Setup and Configurations",
                    },
                    {
                        text: "Invoice Email Setup",
                    },
                ],
            }),
        )
    }, [])

    let params = {
        hideCreate: true,
        title: "Invoice Email Setup",
        titleModal: "Invoice Email Setup",
        baseRoute: "/master/invoice-email-setup",
        // endpoint: "/master/invoice_email_setup",
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
        showAdvancedOptions: false,
        showCopyAct: true,
        module: "email-setup",
        isCheckbox: false
    }
    return <BBDataTable {...params} modalContent={FormEmailCategory}/>
}
