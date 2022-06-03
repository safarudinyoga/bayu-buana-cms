import React, { useEffect, useState } from 'react'
import Select from 'components/form/select';
import { Form } from 'react-bootstrap'
import { ReactSVG } from 'react-svg';

function TravelerSelect(props) {

  const { isGuest, count, handleTrip } = props

  const [travelerAsGuest, setTravelerAsGuest] = useState(isGuest)
  const [guestData, setGuestData] = useState({})

  const CustomMenu = ({ innerRef, innerProps, children }) => {
    return (
      <div ref={innerRef} {...innerProps} className="traveler-select-menu">
        {children}
        <div 
          className='new-guest-traveler' 
          role={"button"}
          onClick={(e) => {
            setTravelerAsGuest(true)
            let guest = {...guestData}
            guest["is_guest"] = true
            setGuestData(guest)
          }}
        >
          <ReactSVG src='/img/icons/user.svg' className='d-inline-block mr-2 mb-1' />
          <span>Add a Guest Traveler</span>
        </div>
        {/* <button
            className="btn btn-info btn-sm btn-block"
            onClick={() => console.log("NEW")}
        >Add New</button> */}
      </div>
    )
  }

  useEffect(() => {
    console.log("GuestData", guestData)
  }, [guestData])
  

  return (
    <div>
      <div className="row my-2">
        <div className="col-md-2">
          Traveler {count+1}{travelerAsGuest ? "/Guest" : ""}
        </div>
        <div className='col-md-6'>
          {travelerAsGuest ? (
            <div className='row'>
              <div className="col-2">
                <Select />
              </div>
              <div className="col-3">
                <Form.Control 
                  type="text" 
                  placeholder="Enter first name" 
                  onChange={(e) => {
                    let guest = {...guestData}
                    guest["first_name"] = e.target.value
                    setGuestData(guest)
                  }}
                />
              </div>
              <div className="col-3">
                <Form.Control 
                  type="text" 
                  placeholder="Enter middle name" 
                  onChange={(e) => {
                    let guest = {...guestData}
                    guest["middle_name"] = e.target.value
                    setGuestData(guest)
                  }}
                />
              </div>
              <div className="col-3">
                <Form.Control 
                  type="text" 
                  placeholder="Enter last name" 
                  onChange={(e) => {
                    let guest = {...guestData}
                    guest["last_name"] = e.target.value
                    setGuestData(guest)
                  }}
                />
              </div>
              <div className="col-1">
                <ReactSVG
                  src='/img/icons/replay.svg' 
                  role={"button"} 
                  onClick={() => {
                    setTravelerAsGuest(false)
                    let guest = {...guestData}
                    guest["is_guest"] = false
                    setGuestData(guest)
                  }}
                  />
              </div>
            </div>
          ) : (
            <Select 
              options={[
                {value: "Mr. Adam Smith (Procurement Manager)", label: "Mr. Adam Smith (Procurement Manager)"},
                {value: "Mr. Bobby White (Engineer)", label: "Mr. Bobby White (Engineer)"},
                {value: "Ms. Carina Wong (Finance Controller)", label: "Ms. Carina Wong (Finance Controller)"},
                {value: "Ms. Dina Dash (Sales Manager)", label: "Ms. Dina Dash (Sales Manager)"},
                {value: "Mr. Jonny Setiawan (Engineer)", label: "Mr. Jonny Setiawan (Engineer)"},
              ]}
              components={{ Menu: CustomMenu }}
            />
          )}
          
        </div>
      </div>
    </div>
  )
}

export default TravelerSelect