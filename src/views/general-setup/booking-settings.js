import React, {useState} from 'react'
import removeIcon from "assets/icons/remove.svg"
import { Form, Button} from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
// import Form from "./form";

export default function BookingSetting() {
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

const [countId, setCountId] = useState(1)

const [afterOfficeHoursData, setAfterOfficeHoursData] = useState([
    {
        id: 1,
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
    console.log("Values", values)
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
                timeStart: 0
            },
            {
                timeEnd: 0
            },
        ]
    };
    setAfterOfficeHoursData([...afterOfficeHoursData, obj])
};

  return (
      <Formik initialValues={afterOfficeHoursData} onSubmit={onSubmit} validationSchem={validationSchema} >
        {({setFieldValue, values, handleSubmit}) =>(
      <Form onSsubmit={handleSubmit} className="">
        <div className="border" style={borderFeeTax}>
            <h1 style={titleText}>Booking Settings</h1>
            <hr />
            <div className="row">
                <div style={{width: 300, marginLeft: 20}}>
                    <p>Ticketing Time Limit Offset</p>
                    <p style={{paddingTop: 5}}>Ticketing Time Limit Notice Period</p>
                    <p>After Office Hours</p>
                </div>
                <div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >180</p>
                            <Form.Control 
                                type="text"
                                minLength={0}
                                maxLength={4}
                                onChange={(value) => {
                                    let pattern = /^\d+$/
                                    if (pattern.text(value.target.value)) {
                                        if (value.target.value <= 9999) {
                                            setFieldValue("ticketingTimeLimitOffset", value.target.value)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >240</p>
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
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
                                                          <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                                                              <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >{item.timeStart}</p>
                                                          </div> 
                                                        </div> 
                                                        :null
                                                      }
                                                      {
                                                        index === 1 ?
                                                        <div style={{display: 'flex'}}>
                                                          <div className="border" style={{width: 60, height: 34, borderRadius: 8, marginLeft: 10}} >
                                                              <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >{item.timeEnd}</p>
                                                          </div>
                                                          <img src={removeIcon} style={{color: '#ebebeb', width: 15, height: 17, marginLeft: 10, marginTop: 6}} />
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
