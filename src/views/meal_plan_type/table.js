import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function MealPlanTypeTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Meal Plan Types",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Meal Plan Types",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Meal Plan Types",
    baseRoute: "/master/meal-plan-types/form",
    endpoint: "/master/meal-plan-types",
    deleteEndpoint: "/master/batch-actions/delete/meal-plan-types",
    activationEndpoint: "/master/batch-actions/activate/meal-plan-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/meal-plan-types",
    columns: [
      {
        title: "Meal Plan Type Code",
        data: "meal_plan_type_code",
      },
      {
        title: "Meal Plan Type Name",
        data: "meal_plan_type_name",
        render: renderColumn("meal_plan_type", "meal_plan_type_name"),
      },
      {
        title: "Icon",
        data: "meal_plan_type_asset.multimedia_description.url",
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
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Meal Plan Type Name",
        data: "meal_plan_type_translation.meal_plan_type_name",
        visible: false,
      },
    ],
  }
  return <BBDataTable {...params} />
}
