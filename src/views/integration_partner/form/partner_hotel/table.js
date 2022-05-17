import BBDataTable from "components/table/bb-data-table"
import React, {useState} from "react"

export default function IntegrasiPartnerHotels() {
  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Division",
    titleModal: "Division",
    baseRoute: "/master/integration-partner-hotels/form",
    endpoint: "/master/integration-partner-hotels",
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-hotels",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-hotels",
    showAdvancedOptions: false,
    columns: [
      {
        title: "Hotel",
        data: "hotel_name",
      },
      {
        title: "Address",
        // data: "division_name",
      },
      {
        title: "Partner Hotel Code",
        data: "hotel_code",
      },
      {
        title: "Partner Hotel Name",
        data: "hotel_name",
      },
      {
        title: "Translated Division Name",
        data: "division_translation.division_name",
        visible: false,
      },
    ],
    emptyTable: "No division found",
    recordName: ["division_code", "division_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Partner Hotel Name", recordName: "hotel_name"}, 
    ],
    customFilterStatus: {
      value: "",
      options: [
        {value: "1", label: "Active"},
        {value: "3", label: "Inactive"},
      ]
    },
    statusLabel: "Status",
    isOpenNewTab: false
  })
  const borderFeeTax = {
    borderRadius: 10,
    };
    const titleText = {
        fontSize: 16,
        color: '#333333',
        paddingTop: 20,
        fontWeight: 800
    };
    const tableTax = {
        paddingLeft: 20
    }

//   return <BBDataTable {...params}/>
  return(
    <div className="row">
    <div className="col-md-4">

    </div>
    <div className="col-lg-8 border" style={borderFeeTax}>
        <h1 style={titleText}>Partner Hotels</h1>
        <hr />
        <div style={tableTax}>
            <BBDataTable {...params} />
        </div>
    </div>
  </div>
  )
}