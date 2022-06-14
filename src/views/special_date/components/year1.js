import React, { useEffect, useState } from 'react'
import moment from 'moment'

import dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'

function createCalendar(currentDate) {
  if (!currentDate) {
    currentDate = moment()
  } else {
    currentDate = moment(currentDate)
  }

  const first = currentDate.clone().startOf('month')
  const last = currentDate.clone().endOf('month')
  const weeksCount = Math.ceil((first.day() + last.date()) / 7)
  const calendar = Object.assign([], { currentDate, first, last })

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    const week = []
    calendar.push(week)
    calendar.year = currentDate.year()
    calendar.month = currentDate.month()

    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
      const date = currentDate.clone().set('date', day + 1 - first.day())
      date.calendar = calendar
      week.push(date)
    }
  }

  return calendar
}

function CalendarDate(props) {
  const { dateToRender, dateOfMonth } = props
  const today =
    dateToRender.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')
      ? 'today'
      : ''

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled={true} className="date prev-month">
        {dateToRender.date()}
      </button>
    )
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled={true} className="date next-month">
        {dateToRender.date()}
      </button>
    )
  }

  return (
    <button
      className={`date in-month ${today}`}
      onClick={() => props.onClick(dateToRender)}>
      {dateToRender.date()}
    </button>
  )
}

const Calendar = (props) => {
  const [calendar, setCalendar] = useState()

  useEffect(() => {
    setCalendar(createCalendar(props.date))
  }, [])
  

  return (
    <div className="month">
      <div className="month-name">
        {calendar.currentDate.format('MMMM').toUpperCase()}
      </div>
      {
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={index} className="day">
            {day}
          </span>
        ))
      }
      {
        calendar.map((week, index) => (
          <div key={index}>
            {week.map(date => (
              <CalendarDate 
                key={date.date()}
                dateToRender={date}
                dateOfMonth={calendar.currentDate}
                onClick={date =>
                  alert(`Will go to daily-view of ${date.format('DD-MM-YYYY')}`)
                }
              />
            ))}
          </div>
        ))
      }
    </div>
  )
  
}


export default function YearView(props) {
  const { date, ...rest} = props
  const months = []
  const firstMonth = dates.startOf(date, 'year')

  for(let i = 0; i<12; i++){
    months.push(
      <Calendar key ={i+1} date={dates.add(firstMonth, i, 'month')} />
    )
  }

  return (
    <div>year1</div>
  )
}

