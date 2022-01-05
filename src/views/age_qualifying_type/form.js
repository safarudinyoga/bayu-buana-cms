import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import CheckDuplicateVal from '../../lib/validateForm'

const endpoint = "/master/age-qualifying-types"
const backUrl = "/master/age-qualifying-types"

function AgeQualifyingTypeForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    age_qualifying_type_code: "",
    age_qualifying_type_name: "",
  })
  const translationFields = [
    {
      label: "Age Qualifying Type Name",
      name: "age_qualifying_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    age_qualifying_type_code: {
      required: true,
      min: 0,
      max: 99,
      checkCode: true,
      noSpace: true,
      number:true
    },
    age_qualifying_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
  }

  const validationMessages = {
    age_qualifying_type_code: {
      required: "Age Qualifying Type Code is required.",
      minlength: "Age Qualifying Type Code must be at least 0 characters",
      maxlength: "Age Qualifying Type Code cannot be more than 99 characters",
    },
    age_qualifying_type_name: {
      required: "Age Qualifying Type Name is required",
      minlength: "Age Qualifying Type Name must be at least 1 characters",
      maxlength: "Age Qualifying Type Name cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Age Qualifying Type"
    let breadcrumbTitle = "Edit Age Qualifying Type"
    if (!formId) {
      docTitle = "Create Age Qualifying Type"
      breadcrumbTitle = "Create Age Qualifying Type"
    } else if (isView) {
      docTitle = "Age Qualifying Type Details"
      breadcrumbTitle = "View Age Qualifying Type"
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
            text: "Age Qualifying Types",
          },
          {
            text: breadcrumbTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

        if(res.data) {

          CheckDuplicateVal({
            name: "checkName", 
            route: "age-qualifying-types", 
            key: "age_qualifying_type_name", 
            label: "Age Qualifying Type Name",
            currentValue: res.data.age_qualifying_type_name,
          })
          CheckDuplicateVal({
            name: "checkCode", 
            route: "age-qualifying-types", 
            key: "age_qualifying_type_code", 
            label: "Code",
            currentValue: res.data.age_qualifying_type_code,
            isNumber: true,
          })
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
      CheckDuplicateVal({
        name: "checkName", 
        route: "age-qualifying-types", 
        key: "age_qualifying_type_name", 
        label: "Age Qualifying Type Name",
      })
      CheckDuplicateVal({
        name: "checkCode", 
        route: "age-qualifying-types", 
        key: "age_qualifying_type_code", 
        label: "Code",
      })
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
      props.history.push(backUrl)
      dispatch(
        setAlert({
          message: `Record ${form.age_qualifying_type_code} - ${
            form.age_qualifying_type_name
          } has been successfully ${formId ? "updated" : "saved"}.`,
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
      <FormHorizontal>
        <FormInputControl
          label="Age Qualifying Type Name"
          required={true}
          value={form.age_qualifying_type_name}
          name="age_qualifying_type_name"
          onChange={(e) =>
            setForm({...form, age_qualifying_type_name: e.target.value})
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Age Qualifying Type Code"
          required={true}
          value={form.age_qualifying_type_code}
          name="age_qualifying_type_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, age_qualifying_type_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
          hint="Numeric value"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(AgeQualifyingTypeForm)
