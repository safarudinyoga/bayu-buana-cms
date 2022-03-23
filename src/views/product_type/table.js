import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import rowDefault from "lib/row-isdefault"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function ProductTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Product Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Product Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Product Types",
    titleModal: "Product Type",
    baseRoute: "/master/product-types/form",
    endpoint: "/master/product-types",
    deleteEndpoint: "/master/batch-actions/delete/product-types",
    activationEndpoint: "/master/batch-actions/activate/product-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/product-types",
    columns: [
      {
        title: "Product Type Code",
        data: "product_type_code",
      },
      {
        title: "Product Type Name",
        data: "product_type_name",
        render: renderColumn("product_type", "product_type_name"),
      },
      {
        title: "Is Default",
        data: "is_default",
        render: rowDefault,
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Product Type Name",
        data: "product_type_translation.product_type_name",
        visible: false,
      },
    ],
    recordName: ["product_type_code", "product_type_name"],
  }
  return <BBDataTable {...params} />
}
