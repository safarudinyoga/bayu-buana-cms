import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import { Card } from "react-bootstrap"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { ReactSVG } from "react-svg"
import showIcon from "assets/icons/show.svg"
import removeIcon from "assets/icons/remove.svg"
import editIcon from "assets/icons/edit.svg"

// import Form from "./form/identity-rule"

const TravelPolicyDocument = () => {
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
    isCheckbox: false,
    title: "Travel Policy Document",
    titleModal: "Travel Policy Document",
    baseRoute: "/master/identity-rules/form",
    endpoint: "/master/configurations/identity-rules",
    deleteEndpoint: "/master/batch-actions/delete/configurations/identity-rules",
    columns: [

      {
        title: "Code",
        data: "user_type_code",
      },
      {
        title: "Name",
        data: "user_type_name",
      },
      {
        title: "Number of assigned modules345",
        data: "user_type_name",
      },
      {
        title: "Number of assigned users",
        data: "user_type_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
    ],
    emptyTable: "No user access type found",
    recordName: ["user_type_code", "user_type_name"],
    switchStatus: true,
    customFilterStatus: {
      value: "",
      options: [
        { value: "1", label: "Active" },
        { value: "3", label: "Inactive" },
      ],
    },
  }


  return  (
    <Card style={{marginBottom: 0}}>
    <Card.Body className="px-1 px-md-4 travel-policy-title">
      <h3 className="">Travel Policy Document</h3>
      <p>Travel Policy Guideline</p>
      <div>
        <ReactSVG src="/img/icons/docupload.svg" />
        <img src={showIcon} alt="" />
        <span>Petro_XYZ-Global-Travel-Policy.PDF</span>
      </div>
      <img src={removeIcon} alt="" />
      <img src={editIcon} alt="" />

      
      <span>Supported files: PDF or Microsoft World (.pdf, .doc, .docx)</span>
    </Card.Body>
  </Card>
  )
}

export default TravelPolicyDocument