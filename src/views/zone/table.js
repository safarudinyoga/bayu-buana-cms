import BBDataTable from "components/table/bb-data-table"
import TableDropdownFilter from "components/table/table-dropdown-filter"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function ZoneTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Zones",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Zones",
          },
        ],
      }),
    )
  }, [])

  let [selectedDestinations, setSelectedDestinations] = useState([])
  let [selectedDestinationIds, setSelectedDestinationIds] = useState([])

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
    setSelectedDestinations(values)
    setSelectedDestinationIds(ids)
  }

  const extraFilter = () => {
    return (
      <TableDropdownFilter
        label="Destination"
        onChange={onFilterChange}
        endpoint="/master/destinations"
        column="destination_name"
        value={selectedDestinationIds}
        data={selectedDestinations}
      />
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedDestinations([])
    setSelectedDestinationIds([])
  }

  let [params, setParams] = useState({
    title: "Zones",
    baseRoute: "/master/zones/form",
    endpoint: "/master/zones",
    deleteEndpoint: "/master/batch-actions/delete/zones",
    activationEndpoint: "/master/batch-actions/activate/zones",
    deactivationEndpoint: "/master/batch-actions/deactivate/zones",
    columns: [
      {
        title: "Zone Code",
        data: "zone_code",
      },
      {
        title: "Zone Name",
        data: "zone_name",
        render: renderColumn("zone", "zone_name"),
      },
      {
        title: "Destination",
        data: "destination.destination_name",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Zone Name",
        data: "zone_translation.zone_name",
        visible: false,
      },
    ],
    recordName: "zone_code",
    recordName2: "zone_name",
  })

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
