import React, { useEffect, useState } from 'react'
import Calendar from 'react-awesome-calendar';
import BCalendar from "rc-year-calendar";
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Select from 'components/form/select';

const backUrl = "/master/special-date"

function SpecialDateCalendar() {
  const [mode, setMode] = useState({label: "Yearly", value: "year"})

  let dispatch = useDispatch()
  useEffect(() => {
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
        <Calendar />
        {/* {
          mode.value == "year" ? <BCalendar /> : <Calendar />
        } */}
      </div>
    </>
  )
}

export default SpecialDateCalendar