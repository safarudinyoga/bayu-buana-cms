import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'
export default function ZoneTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Corporate Airline Fare",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: "Corporate Airline Fare",
          },
        ],
      }),
    )
  }, [])

  let [selectedDestinations, setSelectedAirlines] = useState([])
  let [selectedDestinationIds, setSelectedAirlineIds] = useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({ ...params, filters: [["destination_id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [] })
    }
    setSelectedAirlines(values)
    setSelectedAirlineIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Airlines"
        onChange={onFilterChange}
        endpoint="/master/zones"
        column="destination.destination_name"
        sort="destination_id"
        isGrouping={true}
        fieldGroup="destination_id"
        value={selectedDestinationIds}
        data={selectedDestinations}
        filter={`["destination_id", "is not", null]`}
        placeholder="Airlines"
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedAirlines([])
    setSelectedAirlineIds([])
  }

  let [params, setParams] = useState({
    title: "Zones",
    titleModal: "Zone",
    baseRoute: "/master/corporate-airline-fare/form",
    endpoint: "",
    deleteEndpoint: "",
    activationEndpoint: "",
    deactivationEndpoint: "",
    columns: [
      {
        title: "Airlines",
        data: "zone_code",
      },
      {
        title: "Account Code",
        data: "zone_name",
        render: renderColumn("zone", "zone_name"),
      },
      {
        title: "Negotiated Fare Code",
        data: "destination.destination_name",
      },
      {
        title: "Period",
        data: "destination.destination_name",
      },
    ],
    emptyTable: "No airline fare found",
    recordName: ["zone_code", "zone_name"],
    isShowStatus: false,
    isCheckbox: false,
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
