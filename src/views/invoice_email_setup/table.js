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
        endpoint: "/master/configurations/agent-email-categories",
        // endpoint: "/master/countries",
        deleteEndpoint: "",
        activationEndpoint: "",
        deactivationEndpoint: "",
        columns: [
            {
                title: "Email Template",
                // data: "country_code",
                render: (d, t, row) => {
                    if (row?.is_default) return "DEFAULT"
                    return row?.email_category_name
                }
            },
        ],
        emptyTable: "No Invoice Email found",
        recordName: ["email_category_code", "email_category_name"],
        showAdvancedOptions: false,
        showCopyAct: true,
        module: "email-setup",
        isCheckbox: false,
        isOpenNewTab: false,
    }
    return <BBDataTable {...params} modalContent={FormEmailCategory}/>
}
