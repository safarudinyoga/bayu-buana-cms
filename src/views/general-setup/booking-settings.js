import React, { useState, useEffect } from 'react'
import removeIcon from "assets/icons/remove.svg"
import { Form, Button} from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { ReactSVG } from "react-svg"
import Api from 'config/api'
import "./style.scss"


// import Form from "./form";

export default function BookingSetting() {
let api = new Api()

  const borderFeeTax = {
      borderRadius: 10,
      width: '100%'
  };
  const titleText = {
      fontSize: 16,
      color: '#333333',
      paddingTop: 20,
      fontWeight: 600,
      paddingLeft: 10
  };
  const tableTax = {
      paddingLeft: 20
  };

const [initialForm, setForm] = useState({
    ticketing_time_limit_notice_period: "",
    ticketing_time_limit_offset: "",
    afterOfficeHoursData: {}
})

const [countId, setCountId] = useState(1)
const [timeStart, setTimeStart] = useState('00:00');
const [timeEnd, setTimeEnd] = useState('00:00')

const [afterOfficeHoursData, setAfterOfficeHoursData] = useState([
    {
        id: countId,
        day: [
            {
                label: "Mon",
                value: false,
            },
            {
                label: "Tue",
                value: false,
            },
            {
                label: "Wed",
                value: false,
            },
            {
                label: "Thu",
                value: false,
            },
            {
                label: "Fri",
                value: false,
            },
            {
                label: "Sat",
                value: false,
            },
            {
                label: "Sun",
                value: false,
            },
        ],
        time: [
            {
                timeStart: "00:00",
            },
            {
                timeEnd: "00:00"
            },
        ]
    }
])

  const validationSchema = Yup.object().shape({
    trips: Yup.array().of(
      Yup.object().shape({
        depart_time: Yup.string().required("Depart Time is required"),
        departure_data: Yup.object().required("Departing from city or airport is required."),
        arrival_data: Yup.object().required("Arriving to city or airport is required."),
      })
    )
  })

  const onSubmit = async (values, a) => {
    // console.log("Values", values)
  }

  const handleAddOfficeHour = () => {
    setCountId(countId + 1)
    let obj = {
        id: countId,
        day: [
            {
                label: "Mon",
                value: false,
            },
            {
                label: "Tue",
                value: false,
            },
            {
                label: "Wed",
                value: false,
            },
            {
                label: "Thu",
                value: false,
            },
            {
                label: "Fri",
                value: false,
            },
            {
                label: "Sat",
                value: false,
            },
            {
                label: "Sun",
                value: false,
            },
        ],
        time: [
            {
                timeStart: "00:00"
            },
            {
                timeEnd: "00:00"
            },
        ]
    };
    setAfterOfficeHoursData([...afterOfficeHoursData, obj])

};

const handleDeleteOfficeHour = () => {
    setCountId(countId - 1)
}

const getBookingSetting = async(code, setData, setId) => {
    try {
      let res = await api.get(`/master/configurations/booking`)
      let data = res.data.items[0];
    //   console.log(data, 'cek data')
      setData(data)
      setId(data.id)
    } catch(e) {
      console.log(e)
    }
  }

useEffect(() => {
    getBookingSetting()
}, [])

// console.log(afterOfficeHoursData, 'cek afterOfficeHoursData')

  return (
      <Formik initialValues={setForm} onSubmit={onSubmit} validationSchem={validationSchema} >
        {({setFieldValue, values, handleSubmit}) =>(
      <Form onSsubmit={handleSubmit} className="">
        <div className="border" style={borderFeeTax}>
            <h1 style={titleText}>Booking Settings</h1>
            <hr />
            <div className="row">
                <div lg={12} className="ml-4">
                    <div className="booking-wrapper"><p>Ticketing Time Limit Offset</p><span className="form-label-required">*</span><ReactSVG src="/img/icons/info.svg" className="booking-icon-info" /></div>
                    <div className="booking-wrapper"><p>Ticketing Time Limit Notice Period</p><span className="form-label-required">*</span><ReactSVG src="/img/icons/info.svg" className="booking-icon-info" /></div>
                    <div className="booking-wrapper"><p>Cancellation Deadline Offset</p><span className="form-label-required">*</span><ReactSVG src="/img/icons/info.svg" className="booking-icon-info" /></div>
                    <div className="booking-wrapper"><p>Cancellation Deadline Notice Period</p><span className="form-label-required">*</span><ReactSVG src="/img/icons/info.svg" className="booking-icon-info" /></div>
                    <div className="booking-wrapper"><p>After Office Hours</p><ReactSVG src="/img/icons/info.svg" className="booking-icon-info" /></div>
                </div>
                <div className="ml-4">
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <Form.Control 
                                type="text"
                                minLength={0}
                                maxLength={4}
                                onChange={(values) => {
                                    let pattern = /^\d+$/
                                    if (pattern.text(values.target.values)) {
                                        if (values.target.values <= 9999) {
                                            setFieldValue("ticketingTimeLimitOffset", values.target.value)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <Form.Control 
                                type="text"
                                minLength={0}
                                maxLength={4}
                                onInput={(value) => {
                                    let pattern = /^\d+$/
                                    if (pattern.text(value.target.value)) {
                                        if (value.target.value <= 9999) {
                                            // {console.log(value.target.value,'cek value')}
                                            // setFieldValue("ticketingTimeLimitOffset", value.target.value)
                                        }
                                    }
                                }}
                            />
                        </div>

                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <Form.Control 
                                type="text"
                                minLength={0}
                                maxLength={4}
                                onChange={(values) => {
                                    let pattern = /^\d+$/
                                    if (pattern.text(values.target.values)) {
                                        if (values.target.values <= 9999) {
                                            setFieldValue("ticketingTimeLimitOffset", values.target.value)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <Form.Control 
                                type="text"
                                minLength={0}
                                maxLength={4}
                                onChange={(values) => {
                                    let pattern = /^\d+$/
                                    if (pattern.text(values.target.values)) {
                                        if (values.target.values <= 9999) {
                                            setFieldValue("ticketingTimeLimitOffset", values.target.value)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    {/* {console.log(timeStart, 'cek timeStart')} */}
                    <div>
                        {
                            afterOfficeHoursData.map((el, idx) => {
                                return (
                                    <div key={idx} className="row" style={{borderBottom: '1px solid #D3D3D3', marginBottom: 10}} >
                                        {
                                            el.day.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Form>
                                                            <Form.Group>
                                                                <Form.Label style={{fontSize: 13, width: 31}} >{item.label}</Form.Label>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    checked={item.value}
                                                                />
                                                            </Form.Group>
                                                        </Form>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div style={{display: 'flex', }}>
                                        {
                                            el.time.map((item, index) => {
                                                return (
                                                    <div key={index} style={{justifyContent: 'space-between', display: 'flex'}} >
                                                      {
                                                        index === 0 ?
                                                        <div style={{}}>
                                                            <DatePicker
                                                                value={timeStart}
                                                                onChange={setTimeStart}
                                                                format="HH:mm"
                                                                disableDayPicker
                                                                style={{width: 60, height: 34, borderRadius: 8, marginLeft: 10}}
                                                                plugins={[
                                                                    <TimePicker hideSeconds />,
                                                                ]}
                                                            />
                                                        </div> 
                                                        :null
                                                      }
                                                      {
                                                        index === 1 ?
                                                        <div style={{display:"flex"}}>
                                                            <DatePicker
                                                                value={timeEnd}
                                                                onChange={setTimeEnd}
                                                                format="HH:mm"
                                                                disableDayPicker
                                                                style={{width: 60, height: 34, borderRadius: 8, marginLeft: 10}}
                                                                plugins={[
                                                                    <TimePicker hideSeconds />,
                                                                ]}
                                                            />
                                                          <img src={removeIcon} style={{color: '#ebebeb', width: 15, height: 17, marginLeft: 10, marginTop: 6}} onClick={handleDeleteOfficeHour} alt="" />
                                                        </div>
                                                         :null
                                                      }
                                                      
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {afterOfficeHoursData.id}
                        <p style={{color: '#1103C4', fontSize: 14, textAlign: 'end'}} onClick={handleAddOfficeHour}>Add After Office Hours</p>
                    </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop: 10}}>
                <Button
                    variant="primary"
                    type="submit"
                    // disabled={isSubmitting || !dirty}
                    style={{ marginRight: 15, marginLeft: 10 }}
                >
                    SAVE & NEXT
                </Button>
                <Button
                    variant="secondary"
                    // onClick={() => props.history.push(props.backUrl)}
                >
                    CANCEL
                </Button>
                </div>
            </Form>
            )}
    </Formik>
  )
}
