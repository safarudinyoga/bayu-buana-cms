import React, { useEffect, useState } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import FormInputSelectAjax from 'components/form/input-select-ajax'

export default function HotelAmenityTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Hotel Amenity Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Hotel Amenity Types",
          },
        ],
      }),
    )
  }, [])

  const onFilterChangeHotelAmenityCategories = (e, values) => {
    let ids = []
    let columns = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
        columns.push(
          ["hotel_amenity_category_names", "like", values[i].hotel_amenity_category_name],
        )

        if(parseInt(i)+1 !== values.length) {
          columns.push(["OR"])
        }
      }
    }
    if (columns.length > 0) {
      setParams({...params, filters: [columns]})
    } else {
      setParams({...params, filters: []})
    }
    setSelectedHotelAmenityCategories(values)
    setSelectedHotelAmenityCategoriesIds(ids)

    console.log(params);
  }


  let [selectedHotelAmenityCategories, setSelectedHotelAmenityCategories] = useState([])
  let [selectedHotelAmenityCategoriesIds, setSelectedHotelAmenityCategoriesIds] = useState([])

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Hotel Amenity Category"
        onChange={onFilterChangeHotelAmenityCategories}
        endpoint="/master/hotel-amenity-categories"
        column="hotel_amenity_category_name"
        value={selectedHotelAmenityCategoriesIds}
        data={selectedHotelAmenityCategories}
        filter={`["status", "=", 1]`}
        placeholder="Hotel Amenity Category"
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }
  let [params, setParams] = useState({
    title: "Hotel Amenity Types",
    titleModal: "Hotel Amenity Type",
    baseRoute: "/master/hotel-amenity-types/form",
    endpoint: "/master/hotel-amenity-types",
    deleteEndpoint: "/master/batch-actions/delete/hotel-amenity-types",
    activationEndpoint: "/master/batch-actions/activate/hotel-amenity-types",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/hotel-amenity-types",
    columns: [
      {
        title: "Hotel Amenity Code",
        data: "hotel_amenity_type_code",
      },
      {
        title: "Hotel Amenity Name",
        data: "hotel_amenity_type_name",
        render: renderColumn("hotel_amenity_type", "hotel_amenity_type_name"),
      },
      {
        title: "Icon",
        data: "hotel_amenity_type_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          if (type === "myExport") {
            return val
          }
          if (val) {
            return '<img src="' + val + '" class="table-image"/>'
          }

          return ""
        },
      },
      {
        title: "Hotel Amenity Category",
        data: "hotel_amenity_category_names",
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Hotel Amenity Name",
        data: "hotel_amenity_type_translation.hotel_amenity_type_name",
        visible: false,
      },
    ],
    emptyTable: "No hotel amenity types found",
    recordName: ["hotel_amenity_type_code", "hotel_amenity_type_name"],
  })

  const onReset = () => {
    setParams({...params, filters: []})
    setSelectedHotelAmenityCategories([])
    setSelectedHotelAmenityCategoriesIds([])

  }
  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
}
