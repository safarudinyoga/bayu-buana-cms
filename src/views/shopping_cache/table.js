import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import { Tabs, TabPane, Row } from "react-bootstrap"
import { ReactSVG } from "react-svg"
import FormInputSelectAjax from 'components/form/input-select-ajax'
import FormCreate from "./form"
import FormCreateHotel from "./hotel_form"

export default function ShoppingCache() {
  const [key, setKey] = useState("CORPORATE CLIENT");

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Shopping Cache",
        breadcrumbs: [
          {
            text: "Internal",
          },
          {
            text: "Shopping Cache",
          },
        ],
      }),
    )
  }, [])

  let [SelectedSupplierTypes, setSelectedSupplierTypes] = React.useState([])
  let [SelectedSupplierTypeIds, setSelectedSupplierTypeIds] = React.useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({...params, filters: [["supplier_type_id", "in", ids]]})
    } else {
      setParams({...params, filters: []})
    }
    setSelectedSupplierTypes(values)
    setSelectedSupplierTypeIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Supplier Type"
        onChange={onFilterChange}
        endpoint="/master/hotel-suppliers"
        column="supplier_type.supplier_type_name"
        sort="supplier_type_id"
        isGrouping={true}
        fieldGroup="supplier_type_id"
        value={SelectedSupplierTypeIds}
        data={SelectedSupplierTypes}
        filter={`["supplier_type_id", "is not", null]`}
        placeholder="Supplier Type"
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }

  const onReset = () => {
    setParams({...params, filters: []})
    setSelectedSupplierTypes([])
    setSelectedSupplierTypeIds([])
  }

  let [params, setParams] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    modalTitle: "test",
    hideDetail: true,
    title: "Team Assignment",
    titleModal: "Team Assignment",
    baseRoute: "/master/general-team-assignment/form",
    endpoint: "/master/cache-criterias",
    deleteEndpoint: "",
    columns: [
      {
        title: "Trip Type",
        data: "hotel_supplier_code",
      },
      {
        title: "From",
        data: "hotel_supplier_name",
        render: renderColumn("hotel_supplier", "hotel_supplier_name"),
      },
      {
        title: "To",
        data: "supplier_type.supplier_type_name",
        render: (val) => !val ? "" : val,
      },
      {
        title: "Depart",
        data: "hotel_supplier_code",
      },
      {
        title: "Return",
        data: "hotel_supplier_code",
      },
      {
        title: "Travelers",
        data: "hotel_supplier_code",
      },
      {
        title: "Flight Class",
        data: "hotel_supplier_code",
      },
      {
        title: "Corporate",
        data: "hotel_supplier_code",
      },
      {
        title: "Translated Hotel Supplier Name",
        data: "hotel_supplier_translation.hotel_supplier_name",
        visible: false,
      },
    ],
    emptyTable: "No Shopping Cache found",
    recordName: ["hotel_supplier_code", "hotel_supplier_name"],
  })
  let [paramsHotels, setParamsHotels] = useState({
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: true,
    modalTitle: "test",
    hideDetail: true,
    title: "Team Assignment",
    titleModal: "Team Assignment",
    baseRoute: "/master/general-team-assignment/form",
    endpoint: "/master/cache-criterias",
    deleteEndpoint: "",
    columns: [
      {
        title: "Trip Type",
        data: "hotel_supplier_code",
      },
      {
        title: "Check-in",
        data: "hotel_supplier_name",
        render: renderColumn("hotel_supplier", "hotel_supplier_name"),
      },
      {
        title: "Check-out",
        data: "supplier_type.supplier_type_name",
        render: (val) => !val ? "" : val,
      },
      {
        title: "Room",
        data: "hotel_supplier_code",
      },
      {
        title: "Guest",
        data: "hotel_supplier_code",
      },
      {
        title: "Corporate",
        data: "hotel_supplier_code",
      },
      {
        title: "Translated Hotel Supplier Name",
        data: "hotel_supplier_translation.hotel_supplier_name",
        visible: false,
      },
    ],
    emptyTable: "No Shopping Cache found",
    recordName: ["hotel_supplier_code", "hotel_supplier_name"],
  })

  return (
      <div>
        <Tabs
            // id={props.id}
            // activeKey={key}
            // onSelect={(k) => setKey(k)}
            className={`mb-2`}
            mountOnEnter={true}
            unmountOnExit={true}
        >
            <TabPane
            className="m-3"
            eventKey="CORPORATE CLIENT"
            title={
                <div className="d-md-flex flex-row bd-highlight">
                    <ReactSVG className="tabs-icon" src="/img/icons/tabs/plane.svg" />
                    <span className="ml-md-2 tabs-text">FLIGHT</span>
                </div>
            }
            >
                <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} {...params} modalContent={FormCreate} modalSize={"xl"} />
            </TabPane>
            <TabPane
            className="m-3"
            eventKey="MEMBER"
            title={
                <div className="d-md-flex flex-row">
                    <ReactSVG className="tabs-icon" src="/img/icons/tabs/hotel.svg" />
                    <span className="ml-md-2 tabs-text">HOTEL</span>
                </div>
            }
            >
                <BBDataTable {...paramsHotels}  onReset={onReset} {...paramsHotels} modalContent={FormCreateHotel} modalSize={"xl"} />
            </TabPane>
        </Tabs>
      </div>
  )
}
