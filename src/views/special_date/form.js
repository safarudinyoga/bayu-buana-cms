import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
// import DatePicker from "react-datepicker"
import DatePicker from 'react-multi-date-picker'
import { DateObject } from 'react-multi-date-picker'
import InputIcon from "react-multi-date-picker/components/input_icon"
import FormInputWrapper from "components/form/input-date-period";
import FormInputDatePeriod from "components/form/input-date-period";
import { ReactSVG } from "react-svg"
import "./special-date.css"

const endpoint = "/master/agent-special-dates"
const backUrl = "/master/special-date"

function SpecialDateForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [cityData, setCityData] = useState([])
  const [repeat, setRepeat] = useState(false)
  const [form, setForm] = useState({
    special_date_name: "",
    start_date: new Date(),
    end_date: new Date(),
    fixed: repeat,
  })

  
  const translationFields = [
    {
      label: "Special Date Name",
      name: "special_date_name",
      type: "text",
    },
  ]

  const validationRules = {
    special_date_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true
    },
    start_date: {
      required: true,
      checkDate: true,
    }
  }

  const validationMessages = {
    special_date_name: {
      required: "Special Date Name is required",
      minlength: "Special Date Name must be at least 1 characters",
      maxlength: "Special Date Name cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()

    let bcTitle = "Edit Special Date"
    let docTitle = bcTitle
    if(!formId) {
      bcTitle = "Create Special Date"
      docTitle = bcTitle
    } else if(isView) {
      bcTitle = "Special Date Details"
      docTitle = bcTitle
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Setup & Configurations",
          },
          {
            link: backUrl,
            text: "Special Dates",
          },
          {
            text: bcTitle
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        console.log(res);
        setForm(res.data)
        if(res.data) {
          let currentName = res.data.special_date_name
          setRepeat(res.data.fixed)

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/agent-special-dates?filters=["special_date_name","=","${element.value.trim()}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName.toUpperCase() === element.value.toUpperCase()){
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })

              return req
            },

            "Special Date Name already exists"
          )
        }
      } catch (e) { }

      try {
        let res = await api.get(endpoint + "/" + formId)
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/agent-special-dates?filters=["special_date_name","=","${element.value.trim()}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Special Date Name already exists",
      )
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    let translated = formBuilder.getTranslations()
    setLoading(true)
    let api = new Api()
    try {
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      console.log(res);
     
    } catch (e) {
      dispatch(
        setAlert({
          message: `Failed to ${formId ? "update" : "save"} this record.`,
        }),
      )
    } finally {
      setLoading(false)
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record '${form.special_date_name}' has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
  }

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  function RenderDatepicker({ openCalendar, value, handleValueChange }) {
    return (
      <div className="position-relative datepicker-special-date">
        <ReactSVG src='/img/icons/date-range.svg' className="special-date-icon" onClick={openCalendar} />
        <input type="text"
          className="form-control" 
          onFocus={openCalendar} 
          value={value} 
          onChange={handleValueChange}
        />
      </div>
    )
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      translations={translations}
      translationFields={translationFields}
      alertMessage={"Incomplete data"}
      isValid={false}
      rules={validationRules}
      validationMessages={validationMessages}
    >
      <FormHorizontal style={{height: 350}}>
        <FormInputControl
          label="Special Date Name"
          required={true}
          value={form.special_date_name}
          name="special_date_name"
          onChange={(e) => setForm({...form, special_date_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
          cl={{md: 3}}
          cr={{md: 7}}
        />
        
        {/* <FormInputDatePeriod 
          label="Periode"
          required={true}
          dateStart={form.start_date}
          dateEnd={form.end_date}
          dateStartOnChange={(date) => setForm({...form, start_date: date})}
          dateEndOnChange={(date) => setForm({...form, end_date: date})}
          recurring={true}
        /> */}
      
        <div className="row d-flex align-items-center">
          <div className="col-sm-6 col-md-3 col-lg-4 form-group required">
            <span className="text-label-input">
              Periode
            </span>
            <span className='label-required'></span> 
          </div>
          <div className="col-sm-2 col-md-4 col-lg-3 datepicker-special-date-container">
            <DatePicker
              render={<RenderDatepicker />}
              numberOfMonths={2}
              fixMainPosition={true}
              format="DD MMMM YYYY"
              minDate={new DateObject().subtract(10, "years")}
              maxDate={new DateObject().add(10, "years") && form.end_date}
              value={form.start_date}
              onChange={(date) => setForm({...form, start_date: new Date(date)})} 
            />
            </div>
            
          <span className="text-center">to</span>
          <div className="col-sm-2 col-md-4 col-lg-3 datepicker-special-date-container">
            <DatePicker
              render={<RenderDatepicker />} 
              numberOfMonths={2}
              fixMainPosition={true}
              format="DD MMMM YYYY"
              minDate={new DateObject().subtract(10, "years") && form.start_date}
              maxDate={new DateObject().add(10, "years")}
              value={form.end_date}
              onChange={(date) => setForm({...form, end_date: new Date(date)})} 
            />
          </div>
        </div>
        
            
            
    
        <div className="form-check col-sm-6 col-md-6 col-lg-5 offset-sm-4 offset-md-3 offset-lg-4 mt-2">
          <input 
            className="form-check-input" 
            type="checkbox"
            id="flexCheckDefault" 
            onChange={() => setRepeat(!repeat)}  
            checked={repeat}
          />
          <label className="form-check-label" for="flexCheckDefault">
            Occurs on the same date every year?
          </label>
        </div>
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(SpecialDateForm)
