import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import {renderColumn} from "lib/translation"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setUIParams} from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function RoomAmenityTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Room Amenity Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Room Amenity Types",
          },
        ],
      }),
    )
  }, [])

  let [selectedCategories, setSelectedCategories] = useState([])
  let [selectedCategoryIds, setSelectedCategoryIds] = useState([])

  let [params, setParams] = useState({
    title: "Room Amenity Types",
    titleModal: "Room Amenity Type",
    baseRoute: "/master/room-amenity-types/form",
    endpoint: "/master/room-amenity-types",
    deleteEndpoint: "/master/batch-actions/delete/room-amenity-types",
    activationEndpoint: "/master/batch-actions/activate/room-amenity-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/room-amenity-types",
    columns: [
      {
        title: "Room Amenity Code",
        data: "room_amenity_type_code",
      },
      {
        title: "Room Amenity Name",
        data: "room_amenity_type_name",
        render: renderColumn("room_amenity_type", "room_amenity_type_name"),
      },
      {
        title: "Icon",
        data: "room_amenity_type_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          if (type === 'myExport') {
            return val
          }
          if (val) {
            return '<img src="' + val + '" class="table-image"/>'
          }

          return ""
        },
      },
      {
        title: "Room Amenity Category",
        data: "room_amenity_category_names",
        render: renderColumn("room_amenity_category", "room_amenity_category_names"),
        // render: (val) => !val ? "" : val,
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Room Amenity Name",
        data: "room_amenity_type_translation.room_amenity_type_name",
        visible: false,
      },
    ],
    emptyTable: "No room amenity types found",
    recordName: ["room_amenity_type_code", "room_amenity_type_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Room Amenity Type Code", recordName: "room_amenity_type_code"}, 
      {title: "Room Amenity Type Name", recordName: "room_amenity_type_name"}, 
    ],
  })

  useEffect(() => {

  }, [params])

  const onFilterChangeCategories = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(
          ["room_amenity_category_names", "like", values[i].room_amenity_category_name]
        )

        if(parseInt(i)+1 !== values.length) {
          columns.push(["OR"])
        }
      }
    }
    let findFilter = params.filters ? params.filters.filter(v => v[0][0] !== "room_amenity_category_names") : []
    if (columns.length > 0) {
      setParams({ ...params, filters: [...findFilter, columns] })
    } else {
      setParams({ ...params, filters: [...findFilter] })
    }
    setSelectedCategories(values)
    setSelectedCategoryIds(ids)
  }

  const extraFilter = () => {
    return (
      <>
        <FormInputSelectAjax
          label="Room Amenity Category"
          onChange={onFilterChangeCategories}
          endpoint="/master/room-amenity-categories"
          column="room_amenity_category_name"
          value={selectedCategoryIds}
          data={selectedCategories}
          placeholder="Room Amenity Category"
          type="selectmultiple"
          isFilter={true}
          allowClear={false}
        />
      </>
    )
  }

  const onReset = () => {
    setParams({...params, filters:[]})
    setSelectedCategories([])
    setSelectedCategoryIds([])
  }

  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
