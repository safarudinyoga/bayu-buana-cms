import React, { useEffect, useState } from 'react'
// import Calendar from 'react-awesome-calendar';
import Calendar from "rc-year-calendar";
import CalendarMonthView from 'react-calendar-month-view';
import moment from 'moment'
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Select from 'components/form/select';
import Api from "config/api"

import 'react-big-calendar/lib/css/react-big-calendar.css'
import Year from './components/year';
import { event } from 'jquery';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const backUrl = "/master/special-date"

function SpecialDateCalendar() {
  const [mode, setMode] = useState({label: "Yearly", value: "year"})
  const [events, setEvents] = useState([])
  const [monthEvents, setMonthEvents] = useState([])

  let dispatch = useDispatch()
  useEffect(async () => {
    let api = new Api()

    dispatch(
      setUIParams({
        title: "Calendar",
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: backUrl,
            text: "Special Date",
          },
          {
            text: "Calendar"
          },
        ],
      }),
    )
    
    try {
      let res = await api.get("/master/agent-special-dates?size=-1")
      let apiEvents = []
      console.log(res.data.items)

      res.data.items.map((item, i) => {
        let eventData = {}
        let colorArray = ['#fd3153', '#1ccb9e', '#3694DF', ]

        eventData = {
          id: item.id,
          // color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          startDate: new Date(item.start_date),
          endDate: new Date(item.end_date),
          name: item.special_date_name
        }
        apiEvents.push(eventData)
      })
      setEvents(apiEvents)

    } catch (error) {
      
    }


  }, [])

  const _renderDay = (day) => {
    const date = new Date(day)
    console.log("EVENTS", events)
    let eventDay = events.find((v) => moment(v.startDate).isSame(moment(date), 'day'))
    console.log(eventDay)
    if(eventDay){
      return (
        <div className='event-title-box'>
          <span className='event-title'>{eventDay.name}</span>
        </div>)
    }
  }

  const currentYear = new Date().getFullYear();

  const handleDayEnter = (e) => {

    if (e.events.length > 0) {
      let tooltipContent = '';
      
      for(var i in e.events){
        tooltipContent = 
          <div>{e.events[i].name}</div>
      }
    }
  }

  const renderTooltip = (props) => {
    <Tooltip {...props}>
      Hello World Tooltip
    </Tooltip>
  }

  const handleCustomRender = (e, date) => {
    
    console.log("DATE", date)
  }

  return (
    <>
      <div className="row">
        <Select 
          className="col-2 offset-10 mb-4"
          value={mode}
          options={[
            { label: "Yearly", value: "year"},
            { label: "Monthly", value: "month"}
          ]}
          onChange={(v) => {
            setMode(v)
          }}
        />  
      </div>
      
      <div className='calendar-container'>
        {/* <BigCalendar
          localizer={localizer}
          events={[]}
          toolbar={true}
          views={{
            month: true,
            year: (<div>Hello Year</div>)
          }}
          style={{ height: 500 }}
          messages={{ year: 'Year' }}
        /> */}
        {
          mode.value === "year" ? (
            <Calendar dataSource={events} onDayEnter={handleDayEnter} customDayRenderer={handleCustomRender} style="custom" />
          ) : (
            <CalendarMonthView width="100%" renderDay={_renderDay}/>
          )
        }
      </div>
      <div className='mt-4 d-flex'>
        <div className='special-date-color-box mr-2'></div>
        <span>Special Date</span>
      </div>
    </>
  )
}

export default SpecialDateCalendar