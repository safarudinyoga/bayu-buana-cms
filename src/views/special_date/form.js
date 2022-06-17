import { withRouter } from "react-router"
import React, { useEffect, useRef, useState } from "react"
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import $ from "jquery"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
import DatePicker, { DateObject }  from 'react-multi-date-picker'
import Icon from "react-multi-date-picker/components/icon"
import "./special-date.css"
import DateRangePicker from "../../components/form/date_range_picker"

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

  const [startDateClose, setStartDateClose] = useStateWithCallbackLazy(false)
  const [endDateClose, setEndDateClose] = useStateWithCallbackLazy(false)

  const startDatePickerRef = useRef()
  const endDatePickerRef = useRef()

  const [initStartDate, setInitStartDate] = useState(null)
  const [initEndDate, setInitEndDate] = useState(null)

  const [form, setForm] = useState({
    special_date_name: "",
    start_date: new Date(),
    end_date: new Date(),
    fixed: false,
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
            text: "Setup and Configurations",
          },
          {
            link: backUrl,
            text: "Special Date",
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
        setInitStartDate(res.data.start_date);
        setInitEndDate(res.data.end_date);
        if(res.data) {
          let currentName = res.data.special_date_name
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
      console.log('form', form)
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
          message: `Record '${form.special_date_name}' has been successfully saved.`,
        }),
      )
    }
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
      
        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-3 col-lg-4 form-group required">
            <span className="text-label-input">
              Period
            </span>
            <span className='label-required'></span> 
          </div>
          <div className="col-8 col-md-9 col-lg-7 mb-2 datepicker-special-date-container">
            <DateRangePicker
              minDate={10}
              maxDate={10}
              value={[form.start_date, form.end_date]}
              onChange={(date) => {
                if(date.length > 0) {
                  setForm({
                    ...form,
                    start_date: new Date(date[0]),
                    end_date: new Date(date[1])
                  })
                } else {
                  setForm({
                    ...form,
                    start_date: null,
                    end_date: null
                  })
                }
              }}
            />
          </div>
        </div>
        
        <div className="form-check col-sm-6 col-md-6 col-lg-6 offset-sm-4 offset-md-3 offset-lg-4 mt-2">
          <input 
            className="form-check-input" 
            type="checkbox"
            id="flexCheckDefault" 
            onChange={(repeat) => setForm({...form, fixed: repeat.target.checked})}  
            checked={form.fixed}
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
