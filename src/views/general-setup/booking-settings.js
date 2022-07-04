import React, {useEffect, useReducer, useState} from 'react'
import removeIcon from "assets/icons/remove.svg"
import FormInputControl from "components/form/input-control"
import { Form, Button} from "react-bootstrap"
import { useSnackbar } from "react-simple-snackbar"
import Hints from "assets/icons/hint.svg"
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Api from 'config/api'
// import Form from "./form";

const options = {
    position: "bottom-right",
}

export default function BookingSetting(props) {
  let api = new Api()
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [limitOffset, setLimitOffset] = React.useState(0)
  const [limitPeriod, setLimitPeriod] = React.useState(0)
  const [cancelLimitOffset, setCancelLimitOffset] = useState(0)
  const [cancelLimitPeriod, setCancelLimitPeriod] = useState(0)
  const [countBtnOfficeHour, setCountBtnOfficeHour] = useState(0)
  const [hideBtnOfficeHour, setHideBtnOfficeHour] = useState(false)
  const [openSnackbar] = useSnackbar(options);
  const [valuesTimeStart, setValuesTimeStart] = useState(
    [1].map((number) =>
      new DateObject().set({
        hour: number,
        minute: number,
      })
    )
  );
  const [valuesTimeEnd, setValuesTimeEnd] = useState(
    [1].map((number) =>
      new DateObject().set({
        hour: number,
        minute: number,
      })
    )
  );
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

  const [data, setData] = React.useState({
    field: [
        {
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
                    timeStart: "17:00",
                },
                {
                    timeEnd: "07:00"
                },
            ]
        }]
    });

//   const [data, setData] = React.useState([
//     {
//         day: [
//             {
//                 label: "Mon",
//                 value: true,
//             },
//             {
//                 label: "Tue",
//                 value: true,
//             },
//             {
//                 label: "Wed",
//                 value: true,
//             },
//             {
//                 label: "Thu",
//                 value: true,
//             },
//             {
//                 label: "Fri",
//                 value: true,
//             },
//             {
//                 label: "Sat",
//                 value: false,
//             },
//             {
//                 label: "Sun",
//                 value: false,
//             },
//         ],
//         time: [
//             {
//                 timeStart: "17:00",
//             },
//             {
//                 timeEnd: "07:00"
//             },
//         ]
//     },
//   ])

    const handleAdd = () => {
        data.field.push({
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
                    timeStart: "17:00",
                },
                {
                    timeEnd: "07:00"
                },
            ]
        })
        forceUpdate()
        setCountBtnOfficeHour(countBtnOfficeHour + 1)
        handleHideBtnOfficeHours()
    }

    const handleDelete = (index, idx) => {
        data.field.splice(index )
        forceUpdate()
        handleHideBtnOfficeHours()
        setCountBtnOfficeHour(countBtnOfficeHour === index)
    }

    const handleUpdate = (idx, index) => {
        // console.log(data.field[idx].day[index].value);
        if (data.field[idx].day[index].value === true) {
            data.field[idx].day[index].value = false
        } else {
            data.field[idx].day[index].value = true
        }
        forceUpdate()
    }

    const handleHideBtnOfficeHours = () => {
        if (countBtnOfficeHour === 9) {
            setHideBtnOfficeHour(true);
        } else {
            setHideBtnOfficeHour(false)
        }
    }

    const getBookingSetting = async() => {
        try {
          let res = await api.get(`/master/configurations/booking`)
          let data = res.data.items[0];
          setLimitOffset(data.ticketing_time_limit_offset)
          setLimitPeriod(data.ticketing_time_limit_notice_period)
          setCancelLimitOffset(data.cancellation_deadline_offset)
          setCancelLimitPeriod(data.cancellation_deadline_notice_period)
        //   console.log(data)
        } catch(e) {
        //   console.log(e)
        }
      }

    const onSubmit = (e) => {
        let payload = {
            "ticketing_time_limit_offset": Number(limitOffset),
            "ticketing_time_limit_notice_period": Number(limitPeriod),
            "cancellation_deadline_offset": Number(cancelLimitOffset),
            "cancellation_deadline_notice_period": Number(cancelLimitPeriod),
            "operation_time": [
                {...data.field}
            ]
        }
        submit(payload)
        openSnackbar(
            // `Ancillary Fee has been successfully ${id ? "updated" : "saved"}.`,
          )
        props.handleSelectTab("invoice-settings")
    }

    const submit = async (payload) => {
        // console.log(payload);
        try {
            const res = await api.put('/master/configurations/booking', payload)
            // console.log(res,'cek res post')
        } catch (error) {
            // console.log(error)
        }
      }

    useEffect(() => {
        getBookingSetting();
    }, [])

  return (
      <div className="">
        <div className="border" style={borderFeeTax}>
            <h1 style={titleText}>Booking Settings</h1>
            <hr />
            <div className="row">
                <div style={{width: 300, marginLeft: 20}}>
                    <p>Ticketing Time Limit Offset 
                        <span className={"text-label-input label-required"} style={{color: 'red', marginLeft: 3}}>*</span>  
                        <span>
                            <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                        </span> 
                    </p>
                    <p style={{paddingTop: 5}}>Ticketing Time Limit Notice Period
                        <span className={"text-label-input label-required"} style={{color: 'red', marginLeft: 3}}>*</span>  
                        <span>
                            <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                        </span> 
                    </p>
                    <p style={{paddingTop: 5}}>Cancellation Deadline Offset
                        <span className={"text-label-input label-required"} style={{color: 'red', marginLeft: 3}}>*</span>  
                        <span>
                            <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                        </span> 
                    </p>
                    <p style={{paddingTop: 5}}>Cancellation Deadline Notice
                        <span className={"text-label-input label-required"} style={{color: 'red', marginLeft: 3}}>*</span>  
                        <span>
                            <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                        </span> 
                    </p>
                    <p>After Office Hours
                        <span className={"text-label-input label-required"} style={{color: 'red', marginLeft: 3}}>*</span>  
                        <span>
                            <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                        </span> 
                    </p>
                </div>
                <div>
                    <div className="row">
                        <div style={{width: 100, height: 30, borderRadius: 8, marginLeft: -38}} >
                            <FormInputControl
                                // label="Age Qualifying Type Code"
                                // required={true}
                                value={limitOffset}
                                name="age_qualifying_type_code"
                                cl={{md:"8"}}
                                style={{width: 80}}
                                cr="10"
                                onChange={(e) => {
                                    let pattern = /^\d+$/
                                    if (pattern.test(e.target.value)) {
                                        if (e.target.value <= 9999) {
                                            setLimitOffset(e.target.value)
                                        }
                                    }
                                }}
                                // disabled={isView || loading}
                                type="number"
                            />
                        </div>
                        <p style={{paddingLeft: 22, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div style={{width: 100, height: 30, borderRadius: 8, marginLeft: -38}} >
                             <FormInputControl
                                // label="Age Qualifying Type Code"
                                // required={true}
                                value={limitPeriod}
                                name="age_qualifying_type_code"
                                cl={{md:"8"}}
                                style={{width: 80}}
                                cr="10"
                                onChange={(e) => {
                                    let pattern = /^\d+$/
                                    if (pattern.test(e.target.value)) {
                                        if (e.target.value <= 9999) {
                                            setLimitPeriod(e.target.value)
                                        }
                                    }
                                }}
                                // disabled={isView || loading}
                                type="number"
                            />
                        </div>
                        <p style={{paddingLeft: 22, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div style={{width: 100, height: 30, borderRadius: 8, marginLeft: -38}} >
                             <FormInputControl
                                // label="Age Qualifying Type Code"
                                // required={true}
                                value={cancelLimitOffset}
                                name="age_qualifying_type_code"
                                cl={{md:"8"}}
                                style={{width: 80}}
                                cr="10"
                                onChange={(e) => {
                                    let pattern = /^\d+$/
                                    if (pattern.test(e.target.value)) {
                                        if (e.target.value <= 9999) {
                                            setCancelLimitOffset(e.target.value)
                                        }
                                    }
                                }}
                                // disabled={isView || loading}
                                type="number"
                            />
                        </div>
                        <p style={{paddingLeft: 22, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div style={{width: 100, height: 30, borderRadius: 8, marginLeft: -38}} >
                             <FormInputControl
                                // label="Age Qualifying Type Code"
                                // required={true}
                                value={cancelLimitPeriod}
                                name="age_qualifying_type_code"
                                cl={{md:"8"}}
                                style={{width: 80}}
                                cr="10"
                                onChange={(e) => {
                                    let pattern = /^\d+$/
                                    if (pattern.test(e.target.value)) {
                                        if (e.target.value <= 9999) {
                                            setCancelLimitPeriod(e.target.value)
                                        }
                                    }
                                }}
                                // disabled={isView || loading}
                                type="number"
                            />
                        </div>
                        <p style={{paddingLeft: 22, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div>
                        {
                            data.field.map((el, idx) => {
                                // console.log(el);
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
                                                                    onChange={() => handleUpdate(idx, index)}
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
                                                                value={valuesTimeStart}
                                                                onChange={setValuesTimeStart}
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
                                                        <div style={{display: 'flex'}}>
                                                            <DatePicker
                                                                value={valuesTimeEnd}
                                                                onChange={setValuesTimeEnd}
                                                                format="HH:mm"
                                                                disableDayPicker
                                                                style={{width: 60, height: 34, borderRadius: 8, marginLeft: 10}}
                                                                plugins={[
                                                                    <TimePicker hideSeconds />,
                                                                ]}
                                                                />
                                                                {idx >= 1 &&
                                                                    <img onClick={() => handleDelete(idx, index)} src={removeIcon} style={{color: '#ebebeb', width: 15, height: 17, marginLeft: 10, marginTop: 6, cursor: 'pointer'}} alt="" />
                                                                 }
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
                        { !hideBtnOfficeHour && 
                            <p onClick={() => handleAdd()} style={{color: '#1103C4', fontSize: 14, textAlign: 'end', cursor: 'pointer'}}>Add After Office Hours</p>
                        }
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
            onClick={(e) => onSubmit(e)}
          >
            SAVE & NEXT
          </Button>
          <Button
            variant="secondary"
            onClick={() => props.history.push(props.handleSelectTab("general-information"))}
          >
            CANCEL
          </Button>
        </div>
      </div>
  )
}
