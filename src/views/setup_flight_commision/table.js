import React, { useEffect, useState } from 'react'
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import DatePicker from 'react-datepicker'

export default function SetupFlightCommisionTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Setup Flight Commission",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Setup Flight Commision",
          },
        ]
      })
    )
  }, [])

  const [selectedIssueStart, setSelectedIssueStart] = useState(new Date())
  const [selectedIssueEnd, setSelectedIssueEnd] = useState(new Date())

  const [selectedDepartureStart, setSelectedDepartureStart] = useState(new Date())
  const [selectedDepartureEnd, setSelectedDepartureEnd] = useState(new Date())

  // const onFilterChange = (e, values) => {
  //   let ids = []
  //   if (values && values.length > 0) {
  //     for (let i in values) {
  //       ids.push(values[i].id)
  //     }
  //   }
  //   if (ids.length > 0) {
  //     setParams({ ...params, filters: [["country_id", "in", ids]] })
  //   } else {
  //     setParams({ ...params, filters: [] })
  //   }
  //   setSelectedCountries(values)
  //   setSelectedCountryIds(ids)
  // }

  const extraFilter = () => {
    return (
      <>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
          <div className="col-xs-4">
            <label className="text-label-filter font-weight-bold">Period of Issue</label>
            <div className="row mb-3 mb-sm-0 align-items-center">
              <div className="col-md-5">
                <DatePicker 
                  className="form-control"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedIssueStart}
                  onChange={(date) => {
                    setSelectedIssueStart(date)
                  }}
                />
              </div>
              <span className="col-md-1"> to </span>
              <div className="col-md-5">
                <DatePicker 
                  className="form-control"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedIssueStart}
                  onChange={(date) => {
                    setSelectedIssueStart(date)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
          <div className="col-xs-4">
            <label className="text-label-filter font-weight-bold">Period of Departure</label>
            <div className="row mb-3 mb-sm-0 align-items-center">
              <div className="col-md-5">
                <DatePicker 
                  className="form-control"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedIssueStart}
                  onChange={(date) => {
                    setSelectedIssueStart(date)
                  }}
                />
              </div>
              <span className="col-md-1"> to </span>
              <div className="col-md-5">
                <DatePicker 
                  className="form-control"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedIssueStart}
                  onChange={(date) => {
                    setSelectedIssueStart(date)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
      
    )
  }

  // const onReset = () => {
  //   setParams({ ...params, filters: [] })
  //   setSelectedCountries([])
  //   setSelectedCountryIds([])
  // }

  let params = {
    title: "Setup Flight Commision",
    baseRoute: "/master/setup-flight-commission/form",
    endpoint: "/master/commission-claims",
    deleteEndpoint: "/master/batch-actions/delete/setup-flight-commisions",
    activationEndpoint: "/master/batch-actions/activate/setup-flight-commisions",
    deactivationEndpoint: "/master/batch-actions/deactivate/setup-flight-commisions",
    columns: [
      {
        title: "Airline",
        data: "airline.airline_name",
        render: (val) => {
          if (val === undefined) {
            return " "
          } else {
            return val;
          }
        }
      },
      {
        title: "Route(s)",
        data: "commission_claim_original_destination",
        render: (val) => {
          return val.departure_city_code + " - " + val.arrival_city_code
        }
      },
      {
        title: "Period of Issue",
        data: "commission_claim_issue_date",
        render: (val) => {
          if(val.start_date === undefined && val.end_date === undefined){
            return "Not Specified"
          }else{
            return val.start_date + " - " + val.end_date
          }
        }
      },
      {
        title: "Period of Departure",
        data: "commission_claim_departure_date",
        render: (val) => {
          if(val.start_date === undefined && val.end_date === undefined){
            return "Not Specified"
          }else{
            return val.start_date + " - " + val.end_date
          }
        }
      },
      {
        title: "Commission",
        data: "percent",
        render: (val) => {
          return val + '%'
        }
      }
    ],
    emptyTable: "No setup flight commisions found",
    btnDownload: ".buttons-csv",
    isCheckbox: false,
    isShowStatus: false,
    hideDetail: true
  }


  return <BBDataTable {...params} extraFilter={extraFilter}/>
}
