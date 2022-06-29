import React, {useReducer} from 'react'
import removeIcon from "assets/icons/remove.svg"
import FormInputControl from "components/form/input-control"
import { Form, Button} from "react-bootstrap"
import { useSnackbar } from "react-simple-snackbar"
import Hints from "assets/icons/hint.svg"
// import Form from "./form";

const options = {
    position: "bottom-right",
}

export default function BookingSetting(props) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [limitOffset, setLimitOffset] = React.useState(180)
  const [limitPeriod, setLimitPeriod] = React.useState(240)
  const [openSnackbar] = useSnackbar(options);
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
                    value: true,
                },
                {
                    label: "Tue",
                    value: true,
                },
                {
                    label: "Wed",
                    value: true,
                },
                {
                    label: "Thu",
                    value: true,
                },
                {
                    label: "Fri",
                    value: true,
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
    }

    const handleDelete = (index, idx) => {
        data.field.splice(index)
        forceUpdate()
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

    const onSubmit = (e) => {
        console.log(e, 'onsubmit');
        openSnackbar(
            // `Ancillary Fee has been successfully ${id ? "updated" : "saved"}.`,
          )
          props.handleSelectTab("invoice-settings")
    }

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
                            {/* <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >180</p> */}
                            <FormInputControl
                                // label="Age Qualifying Type Code"
                                // required={true}
                                value={limitOffset}
                                name="age_qualifying_type_code"
                                cl={{md:"8"}}
                                style={{width: 70}}
                                cr="10"
                                onChange={(e) =>
                                    setLimitOffset(e.target.value)
                                }
                                // disabled={isView || loading}
                                type="number"
                            />
                        </div>
                        <p style={{paddingLeft: 15, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div style={{width: 100, height: 30, borderRadius: 8, marginLeft: -38}} >
                            {/* <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >240</p>
                             */}
                             <FormInputControl
                                // label="Age Qualifying Type Code"
                                // required={true}
                                value={limitPeriod}
                                name="age_qualifying_type_code"
                                cl={{md:"8"}}
                                style={{width: 70}}
                                cr="10"
                                onChange={(e) =>
                                    setLimitPeriod(e.target.value)
                                }
                                // disabled={isView || loading}
                                type="number"
                            />
                        </div>
                        <p style={{paddingLeft: 15, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div>
                        {
                            data.field.map((el, idx) => {
                                console.log(el);
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
                                                          <img onClick={() => handleDelete(idx, index)} src={removeIcon} style={{color: '#ebebeb', width: 15, height: 17, marginLeft: 10, marginTop: 6, cursor: 'pointer'}} />
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
                        <p onClick={() => handleAdd()} style={{color: '#1103C4', fontSize: 14, textAlign: 'end', cursor: 'pointer'}}>Add After Office Hours</p>
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
            // onClick={() => props.history.push(props.backUrl)}
          >
            CANCEL
          </Button>
        </div>
      </div>
  )
}
