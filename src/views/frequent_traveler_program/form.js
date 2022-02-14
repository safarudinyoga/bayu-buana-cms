import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputSelectAjax from "components/form/input-select-ajax"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/loyalty-programs"
const backUrl = "/master/frequent-traveler-program"

function FrequentTravelerProgramForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [productTypeData, setProductTypeData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    loyalty_program_name: "",
    product_type_id: "",
    description: ""
  })
  const translationFields = [
    {
      label: "Loyalty Name",
      name: "loyalty_program_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      maxLength: 4000
    },
  ]

  const validationRules = {
    loyalty_program_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
    product_type_id: {
      required: true,
    }
  }

  const validationMessages = {
    loyalty_program_name: {
      required: "Loyalty Name is required",
    },
    product_type_id: {
      required: "Type is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Frequent Traveler Program"
    if (!formId) {
      docTitle = "Create Frequent Traveler Program"
    } else if (isView) {
      docTitle = "Frequent Traveler Program Details"
    }

    dispatch(
      setUIParams({
        title: isView ? "Frequent Traveler Program Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: backUrl,
            text: "Frequent Traveler Program",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
        
        if (res.data.product_type) {
          setProductTypeData([{...res.data.product_type, text: res.data.product_type.product_type_name}])
        }
        if (res.data) {
          let currentName = res.data.loyalty_program_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/loyalty-programs?filters=["loyalty_program_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName === element.value){
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
            "Loyalty Name already exists",
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
            url: `${env.API_URL}/master/loyalty-programs?filters=["loyalty_program_name","=","${element.value}"]`,
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
        "Loyalty Name already exists",
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
      if (!form.product_type_id) {
        form.product_type_id = null
      }

      if (!form.description) {
        form.description = null
      }
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
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record ${form.loyalty_program_name} has been successfully ${formId ? "updated" : "saved"}.`,
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
          label="Loyalty Name"
          required={true}
          value={form.loyalty_program_name}
          name="loyalty_program_name"
          cl="4"          
          onChange={(e) => setForm({...form, loyalty_program_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {
        !loading &&
          <FormInputSelectAjax
            label="Type"
            required={true}
            value={form.product_type_id}
            name="product_type_id"
            data={productTypeData}
            endpoint="/master/product-types"
            column="product_type_name"
            onChange={(e) => {
              setForm({...form, product_type_id: e.target.value || null})
            }}
            filter={`["status", "=", 1]`}
            disabled={isView || loading}
            type="select"
          />
        }
        {
          !loading &&
          <FormInputControl
          label="Description"
          value={form.description}
          name="description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />
        }
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(FrequentTravelerProgramForm)
