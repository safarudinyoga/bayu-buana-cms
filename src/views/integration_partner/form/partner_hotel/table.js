import PartnerHotelForm from "./form"
import BBDataTable from "components/table/bb-data-table"
import React, {useState} from "react"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function IntegrasiPartnerHotels() {
  const { id } = useParams()
  const [isReplaceTable, setIsReplaceTable] = useState(false)

  const handleReplaceTable = async (key) => {
    console.log('isReplaceTable', isReplaceTable)
    setIsReplaceTable(!key)
  }
  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Partner Hotels",
    titleModal: "Partner Hotels",
    baseRoute: "/master/integration-partner-hotels/form",
    endpoint: `/master/integration-partners/${id}/hotels`,
    deleteEndpoint: "/master/batch-actions/delete/integration-partner-hotels",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-hotels",
    btnDownload: ".buttons-csv",
    showAdvancedOptions: false,
    searchText:"Search",
    isOpenNewTab: false,
    columns: [
      {
        title: "Hotel",
        data: "hotel_name",
      },
      {
        title: "Address",
        data: "address",
      },
      {
        title: "Partner Hotel Code",
        data: "hotel_code",
      },
      {
        title: "Partner Hotel Name",
        data: "hotel_name",
      },
    ],
    emptyTable: "No partner hotels found",
    recordName: ["hotel_code", "hotel_name"],
    isReplaceTable: true,
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
    <Card>
      <Card.Body>
        <h3 className="card-heading">Partner Hotels</h3>
        {
          isReplaceTable ? <PartnerHotelForm isReplaceTable={isReplaceTable} handleReplaceTable={handleReplaceTable} /> :
          <BBDataTable {...params} handleReplaceTable={handleReplaceTable}/>
        }
      </Card.Body>
    </Card>
  )
}
