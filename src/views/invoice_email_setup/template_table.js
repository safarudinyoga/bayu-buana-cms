import BBDataTable from "components/table/bb-data-table"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import { useParams } from "react-router-dom"
import {setUIParams} from "redux/ui-store"
import Api from "config/api"

const backUrl = "/master/invoice-email-setup"
export default function InvoiceEmailSetupTable() {
    let routeParams = useParams()
    let dispatch = useDispatch()

  const API = new Api()
    useEffect(async() => {
        let {data} = await API.get("/master/configurations/agent-email-categories/" + routeParams.template_id)
        dispatch(
            setUIParams({
                title: data?.email_category_name || "Email Template 1",
                breadcrumbs: [
                    {
                        text: "Setup and Configurations",
                    },
                    {
                        text: "Invoice Email Setup",
                        link: backUrl,
                    },
                    {
                        text: data?.email_category_name || "Email Template 1",
                    },
                ],
            }),
        )
    }, [])

    let params = {
        hideCreate: true,
        isCheckbox: false,
        title: "Invoice Email Setup",
        titleModal: "Invoice Email Setup",
        baseRoute: `/master/invoice-email-setup/${routeParams.template_id}/form`,
        module: "email-setup-template",
        endpoint: `/master/configurations/agent-email-categories/${routeParams.template_id}`,
        deleteEndpoint: "",
        activationEndpoint: "",
        deactivationEndpoint: "",
        columns: [
            {
                title: "Email Name",
                data: "email_category_name",
            },
            {
                title: "Type",
                data: "message_category_name",
            },
        ],
        emptyTable: "No Email Template found",
        recordName: ["email_template_code", "email_template_name"],
        showAdvancedOptions: false,
        isOpenNewTab: false,
    }
    return <BBDataTable {...params} />
}
