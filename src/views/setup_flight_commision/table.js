import React, { useEffect, useState } from 'react'
import BBDataTable from "components/table/bb-data-table"
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './style.css'
import DateRangePicker from 'components/form/date-range-picker'

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
            text: "Setup Flight Commission",
          },
        ]
      })
    )
  }, [])

  const [selectedIssue, setSelectedIssue] = useState([])

  const [selectedDeparture, setSelectedDeparture] = useState([])

  const onChangeIssue = (date) => {
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "commission_claim_issue_date.start_date" && v[0] !== "commission_claim_issue_date.end_date")
      : []

    if(date.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["commission_claim_issue_date.start_date","like",`${convertTZ(date[0])}`],["commission_claim_issue_date.end_date","like",`${convertTZ(date[1])}`]]
      })
    }
    setSelectedIssue(date)
  }

  const onChangeDeparture = (date) => {
    let findFilter = params.filters
      ? params.filters.filter((v) => v[0] !== "commission_claim_departure_date.start_date" && v[0] !== "commission_claim_departure_date.end_date")
      : []

    if(date.length > 0) {
      setParams({
        ...params,
        filters: [...findFilter, ["commission_claim_departure_date.start_date","like",`${convertTZ(date[0])}`],["commission_claim_departure_date.end_date","like",`${convertTZ(date[1])}`]]
      })
    }
    setSelectedDeparture(date)
  }

  const convertTZ = (date) => {
    let formatDate = new Date(date)
    return moment(formatDate).format("YYYY-MM-DD")
  }

  const extraFilter = () => {
    return (
      <>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
          <div className="col-xs-4">
            <label className="text-label-filter font-weight-bold">Period of Issue</label>
            <div className="row mb-3 mb-sm-0 align-items-center">
              <DateRangePicker 
                minDate={1} 
                maxDate={1} 
                value={selectedIssue}
                placeholder={"dd/mm/yyyy"}
                onChange={(date) => onChangeIssue(date)}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
          <div className="col-xs-4">
            <label className="text-label-filter font-weight-bold">Period of Departure</label>
            <div className="row mb-3 mb-sm-0 align-items-center">
              <DateRangePicker
                minDate={1} 
                maxDate={1} 
                value={selectedDeparture}
                placeholder={"dd/mm/yyyy"}
                onChange={(date) => onChangeDeparture(date)}
              />
            </div>
          </div>
        </div>
      </>
      
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedDeparture([])
    setSelectedIssue([])
  }

  const dateFormat = (v) => moment(v).format('D MMM YYYY')

  const routesFormat = (row) => {
    let origin = row.departure_city?.city_name || row.departure_airport_location?.airport_name
    let destination = row.arrival_city?.city_name || row.arrival_airport_location?.airport_name
    if(!origin && !destination) {
      return "Any routes"
    }
    if(!origin) {
      return `From any origin to ${destination}`
    }
    if(!destination) {
      return `From ${origin} to any destinations`
    }

   return `${origin} - ${destination}`
  }

  let [params, setParams] = useState({
    title: "Setup Flight Commision",
    baseRoute: "/master/setup-flight-commission/form",
    endpoint: "/master/commission-claims",
    deleteEndpoint: "/master/batch-actions/delete/commission-claims",
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
    emptyTable: "No Commissions found",
    btnDownload: ".buttons-csv",
    isCheckbox: false,
    isShowStatus: false,
    hideDetail: true,
    searchText: "Search"
  })


  return <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset}/>
}
