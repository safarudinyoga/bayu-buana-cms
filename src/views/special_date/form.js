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
import FormInputDatePeriod from "components/form/input-date-period";

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
  const [form, setForm] = useState({
    special_date_name: "",
    start_date: new Date(),
    end_date: new Date(),
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
            text: "Master Data Management",
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
        setForm(res.data)
        if(res.data) {
          let currentName = res.data.special_date_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/agent-special-dates?filters=["special_date_name","=","${element.value}"]`,
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
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
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
            url: `${env.API_URL}/master/agent-special-dates?filters=["special_date_name","like","${element.value}"]`,
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
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }
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
          message: `Record ${form.special_date_name} - has been successfully ${formId ? "updated" : "saved"}.`,
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
        />
        
        <FormInputDatePeriod 
          label="Periode"
          required={true}
          dateStart={form.start_date}
          dateEnd={form.end_date}
          dateStartOnChange={(date) => setForm({...form, start_date: date})}
          dateEndOnChange={(date) => setForm({...form, end_date: date})}
          recurring={true}
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(SpecialDateForm)
