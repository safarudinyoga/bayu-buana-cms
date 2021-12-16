import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

const imageBase64 = (url) => {
  console.log(url)
  var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      var reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function() {
        var base64data = reader.result;     
        console.log(base64data) 
      }
    }
}

export default function AirlineTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Airlines",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Airlines",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Airlines",
    baseRoute: "/master/airlines/form",
    endpoint: "/master/airlines",
    deleteEndpoint: "/master/batch-actions/delete/airlines",
    activationEndpoint: "/master/batch-actions/activate/airlines",
    deactivationEndpoint: "/master/batch-actions/deactivate/airlines",
    columns: [
      {
        title: "Airline Code",
        data: "airline_code",
      },
      {
        title: "Airline Name",
        data: "airline_name",
        render: renderColumn("airline", "airline_name"),
      },
      {
        title: "Logo",
        data: "airline_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          imageBase64(val) // testt convert image to base64
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
        title: "Translated Airline Name",
        data: "airline_translation.airline_name",
        visible: false,
      },
    ],
    recordName: ["airline_code", "airline_name"],
  }
  return <BBDataTable {...params} />
}
