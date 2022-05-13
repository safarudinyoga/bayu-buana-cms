import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import HotelSuppliers from "./form"

export default function IntegrasiPartnerHotelSupplier() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "iTank",
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            text: "Intergration Partner",
          },
        ],
      }),
    )
  }, [])

  let [params, setParams] = useState({
    isCheckbox: false,
    title: "Division",
    titleModal: "Division",
    baseRoute: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/hotel-suppliers/form",
    endpoint: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/hotel-suppliers",
    deleteEndpoint: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/hotel-suppliers",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-hotels",
    showAdvancedOptions: false,
    hideDetail: true,
    createOnModal: true,
    columns: [
      {
        title: "Hotel Suppliers",
        data: "hotel_supplier_name",
      },
      {
        title: "Partner Hotel Suppliers Code",
        data: "hotel_supplier_code",
      },
      {
        title: "Partner Hotel Suppliers Name",
        data: "hotel_supplier_name",
      },
    //   {
    //     title: "Manager",
    //     data: "manager.given_name",
    //     render: (data, d, row) => {
    //       if(row.manager) {
    //         return `${row.manager.given_name || ""} ${row.manager.middle_name || ""} ${row.manager.surname || ""}`
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     searchable: false,
    //     title: "Status",
    //     data: "status",
    //     render: rowStatus,
    //   },
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
      {title: "Partner Hotel Supplier", recordName: "hotel_supplier_name"}, 
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
        <h1 style={titleText}>Partner Hotel Suppliers</h1>
        <hr />
        <div style={tableTax}>
            <BBDataTable {...params} modalContent={HotelSuppliers} />
        </div>
    </div>
  </div>
  )
}
