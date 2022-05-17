import React, { useEffect, useState } from 'react'
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './style.css'

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

  const NextDay = (date = new Date()) => {
    date.setDate(date.getDate() + 1)
    return date
  }

  const MinDate = (date = new Date()) => { 
    date.setFullYear(date.getFullYear() - 1)

    return date
  }

  const MaxDate = (date = new Date()) => {
    date.setFullYear(date.getFullYear() + 1)

    return date
  }

  const [selectedIssueStart, setSelectedIssueStart] = useState(new Date())
  const [selectedIssueEnd, setSelectedIssueEnd] = useState(NextDay)

  const [selectedDepartureStart, setSelectedDepartureStart] = useState(new Date())
  const [selectedDepartureEnd, setSelectedDepartureEnd] = useState(NextDay)


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
              <div className="col-md-5 col-5">
                <DatePicker 
                  className="form-control date-picker"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedIssueStart}
                  onChange={(date) => {
                    setSelectedIssueStart(date)
                  }}
                  minDate={MinDate}
                />
                <div className="wrapper">
                    <img
                      src="/img/icons/date-range.svg"
                      className="calendar"
                    ></img>
                </div>
              </div>
              <span className="col-md-1 col-2" align="center"> to </span>
              <div className="col-md-5 col-5">
                <DatePicker 
                  className="form-control date-picker"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedIssueEnd}
                  onChange={(date) => {
                    setSelectedIssueEnd(date)
                  }}
                  maxDate={MaxDate}
                />
                 <div className="wrapper">
                    <img
                      src="/img/icons/date-range.svg"
                      className="calendar"
                    ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
          <div className="col-xs-4">
            <label className="text-label-filter font-weight-bold">Period of Departure</label>
            <div className="row mb-3 mb-sm-0 align-items-center">
              <div className="col-md-5 col-5">
                <DatePicker 
                  className="form-control date-picker"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedDepartureStart}
                  onChange={(date) => {
                    setSelectedDepartureStart(date)
                  }}
                  minDate={MinDate}
                />
                <div className="wrapper">
                    <img
                      src="/img/icons/date-range.svg"
                      className="calendar"
                    ></img>
                </div>
              </div>
              <span className="col-md-1 col-2" align="center"> to </span>
              <div className="col-md-5 col-5">
                <DatePicker 
                  className="form-control date-picker"
                  dateFormat="dd MMMM yyyy"
                  selected={selectedDepartureEnd}
                  onChange={(date) => {
                    setSelectedDepartureEnd(date)
                  }}
                  maxDate={MaxDate}
                />
                <div className="wrapper">
                    <img
                      src="/img/icons/date-range.svg"
                      className="calendar"
                    ></img>
                </div>
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

  const dateFormat = (v) => moment(v).format('D MMM YYYY')

  const routesFormat = (row) => {
    if(!row.departure_city.city_name) {
      return `From any origin to ${row.arrival_city.city_name}`
    }
    if(!row.arrival_city.city_name) {
      return `From ${row.departure_city.city_name} to any destinations`
    }
    if(!row.arrival_city.city_name && !row.departure_city.city_name) {
      return "Any routes"
    }

   return `${row.departure_city.city_name} - ${row.arrival_city.city_name}`
  }

  let params = {
    title: "Setup Flight Commision",
    baseRoute: "/master/setup-flight-commission/form",
    endpoint: "/master/setup-flight-commission",
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
        data: "departure_city.city_name",
        render: (val, type, row) => {
          return routesFormat(row)
        }
      },
      {
        title: "Period of Issue",
        data: "commission_claim_issue_date.start_date",
        render: (val, d, row) => {
          if(row.commission_claim_issue_date.start_date === undefined && row.commission_claim_issue_date.end_date === undefined){
            return "Not Specified"
          }else{
            return dateFormat(row.commission_claim_issue_date.start_date) + " - " + dateFormat(row.commission_claim_issue_date.end_date)
          }
        }
      },
      {
        title: "Period of Departure",
        data: "commission_claim_departure_date.start_date",
        render: (val, d, row) => {
          if(row.commission_claim_departure_date.start_date === undefined && row.commission_claim_departure_date.end_date === undefined){
            return "Not Specified"
          }else{
            return dateFormat(row.commission_claim_departure_date.start_date) + " - " + dateFormat(row.commission_claim_departure_date.end_date)
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
    emptyTable: "No Commisions found",
    btnDownload: ".buttons-csv",
    isCheckbox: false,
    isShowStatus: false,
    hideDetail: true
  }


  return <BBDataTable {...params} extraFilter={extraFilter}/>
}
