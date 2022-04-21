import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import useQuery from "lib/query"
import * as Yup from "yup"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../components/formik/formikControl"

const endpoint = "/master/integration-partner-cities"
function ExchangeRateCreate(props) {
	const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "EDIT PARTNER CITIES"
    if (!formId) {
      docTitle = "CREATE PARTNER CITIES"
    } else if (isView) {
      docTitle = "Exchange Rate Details"
    }

    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let {data} = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          city_name: {
            value: data.city_name,
            label: data.city_name,
          },
          to_currency_id: {
            value: data.to_currency.id,
            label: data.to_currency.currency_name,
          }
        })
      } catch(e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if(formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const initialValues = {
		city: "",
		city_code:"",
    city_name:""
	}

  const checkExchangeRate = async (to_currency_id, from_currency_id) => {
    let filter = encodeURIComponent(JSON.stringify([["to_currency_id","=",to_currency_id], ["AND"], ["from_currency_id", "=", from_currency_id]]))
    let res = await API.get(`/master/currency-conversions?filters=${filter}`)
    return res.data.items.length === 0
  }

  Yup.addMethod(Yup.object, 'pairCurrency', function(propertyPath, message) {
    return this.test('unique', message, function(field) {
      if (field && this.parent[propertyPath]) {
        return field.value !== this.parent[propertyPath]?.value
      } else {
        return true
      }
    })
  })
  Yup.addMethod(Yup.object, 'uniqueExchangeRate', function(message) {
    return this.test('unique', message, function(field, ctx) {
      let parent = ctx.parent
      if(parent.to_currency_id?.value && parent.from_currency_id?.value) {
        return checkExchangeRate(parent.to_currency_id.value, parent.from_currency_id.value)
      } else {
        return true
      }
    })
  })
	const validationSchema =  Yup.object().shape({
    city: Yup.object()
      .required("City is required..")
      .pairCurrency('to_currency_id', 'From Currency and To Currency must be different.')
      .uniqueExchangeRate('City  already exists')
      ,
    city_code: Yup.string()
      .required("Partner City Code is required"),
    city_name: Yup.string()
      .required("Partner City Name is required"),
  })

	const onSubmit = async (values, a) => {
		try {
      let form = {
        conversion_rate_type: "C",
        city_name: values.city_name.value,
        is_automatic: values.is_automatic,
        multiply_rate: parseFloat(values.multiply_rate),
        to_currency_id: values.to_currency_id.value,
        valid_from: new Date(),
        valid_to: new Date(),
      }
      let res = await API.putOrPost("/master/currency-conversions", id, form)
      
      dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Record 'From Currency: ${form.from_currency_id} and To Currency: ${form.to_currency_id}' has been successfully saved.`,
				}),
      )
		} catch(e) {
			dispatch(
				setAlert({
				  message: "Failed to save this record.",
				}),
      )
		}
	}
  const formSize = {
    label: {
      md: 5,
      lg: 5
    },
    value: {
      md: 7,
      lg: 7
    }
  }
	return (
			<Formik
				initialValues={formValues || initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
			>
				{
					({
						dirty,
						handleSubmit,
						isSubmitting,
            setFieldValue,
            values,
					}) => (
						<Form onSubmit={handleSubmit} className="ml-2">
              <FormikControl
                control="selectAsync"
                required="label-required"
                label="City"
                name="city"
                placeholder={"Please choose"}
                url={`master/cities`}
                fieldName={"city_name"}
                onChange={(v) => {
                  setFieldValue("city_name", v)
                }}
                style={{ maxWidth: 250 }}
                size={formSize}
                isDisabled={isView || loading}
              />

              <FormikControl
                control="input"
                required="label-required"
                label="Partner City Code"
                name="city_code"
                style={{ maxWidth: 250 }}
                size={formSize}
                disabled={isView || loading}
              />
              <FormikControl
                control="input"
                required="label-required"
                label="Partner City Name"
                name="city_name"
                style={{ maxWidth: 250 }}
                size={formSize}
                disabled={isView || loading}
              />
             
              
              {!props.hideButton && <div
                style={{
                  marginBottom: 30,
                  marginTop: 30,
                  display: "flex",
                }}
              >
                {!isView && <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>}
                <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
              </div>}
						</Form>
					)
				}
				
			</Formik>
	)
}

export default withRouter(ExchangeRateCreate) 