import BBDataTable from "components/table/bb-data-table"
import React, {useState} from "react"
import HotelSuppliers from "./form"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function IntegrasiPartnerHotelSupplier() {
  
  const { id } = useParams()

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "",
    titleModal: "",
    baseRoute: `/master/integration-partners/${id}/hotel-suppliers/form`,
    endpoint: `/master/integration-partners/${id}/hotel-suppliers`,
    deleteEndpoint: `/master/batch-actions/delete/integration-partner-hotel-suppliers`,
    activationEndpoint: "/master/batch-actions/activate/integration-partner-hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-hotels",
    btnDownload: ".buttons-csv",
    showAdvancedOptions: false,
    hideDetail: true,
    createOnModal: true,
    columns: [
      {
        title: "Hotel Suppliers",
        data: "hotel_supplier.hotel_supplier_name",
      },
      {
        title: "Partner Hotel Suppliers Code",
        data: "hotel_supplier_code",
      },
      {
        title: "Partner Hotel Suppliers Name",
        data: "hotel_supplier_name",
      },
    ],
    emptyTable: "No partner hotel suppliers found",
    recordName: ["hotel_supplier_code", "hotel_supplier_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Partner Hotel Supplier", recordName: "hotel_supplier_name"}, 
    ],
    showModalHeader: false,
    customFilterStatus: {
      value: "",
      options: [
        {value: "1", label: "Active"},
        {value: "3", label: "Inactive"},
      ]
    },
    statusLabel: "Status",
    isOpenNewTab: false,
    module: "partner-hotel-suppliers",
    isPartner: true
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
      <h3 className="card-heading">Partner Hotel Suppliers</h3>
      <BBDataTable {...params} modalContent={HotelSuppliers}/>
    </Card.Body>
  </Card>

  )
}
