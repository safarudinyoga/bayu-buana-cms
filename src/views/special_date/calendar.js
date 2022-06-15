import React, { useEffect, useState } from 'react'
import Calendar from 'react-awesome-calendar';
import BCalendar from "rc-year-calendar";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Select from 'components/form/select';
import Api from "config/api"

import 'react-big-calendar/lib/css/react-big-calendar.css'
import Year from './components/year';

const backUrl = "/master/special-date"

function SpecialDateCalendar() {
  const [mode, setMode] = useState({label: "Yearly", value: "year"})
  const [events, setEvents] = useState([])

  const localizer = momentLocalizer(moment)
  localizer.formats.yearHeaderFormat = 'YYYY'
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
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          from: item.start_date,
          to: item.end_date,
          title: item.special_date_name
        }
        apiEvents.push(eventData)
      })
      setEvents(apiEvents)

    } catch (error) {
      
    }


  }, [])

  return (
    <>
      {/* <div className="row">
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
      </div> */}
      
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
        <Calendar
          events={events}
        />
      </div>
    </>
  )
}

export default SpecialDateCalendar