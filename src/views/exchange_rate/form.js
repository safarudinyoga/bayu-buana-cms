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

const endpoint = "/master/currency-conversions"
function ExchangeRateCreate(props) {
  console.log(props);
	const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Exchange Rate"
    if (!formId) {
      docTitle = "Add Exchange Rate"
    } else if (isView) {
      docTitle = "Exchange Rate Details"
    }

    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let {data} = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          from_currency_id: {
            value: data.from_currency.id,
            label: data.from_currency.currency_name,
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
		from_currency_id: "",
		to_currency_id: "",
		multiply_rate: "",
		is_automatic: false,
	}

  const checkExchangeRate = async (to_currency_id, from_currency_id) => {
    let filter = encodeURIComponent(JSON.stringify([["to_currency_id","=",to_currency_id], ["AND"], ["from_currency_id", "=", from_currency_id]]))
    let res = await API.get(`/master/currency-conversions?filters=${filter}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if(!sameId) return res.data.items.length === 0 

    return true
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
  // Yup.addMethod(Yup.string, 'validateNumber', function(message) {
  //   return this.test('unique', message, function(field) {
  //       return !(parseFloat(field) === 0)
  //   })
  // })

	const validationSchema =  Yup.object().shape({
    from_currency_id: Yup.object()
      .required("From Currency is required.")
      .pairCurrency('to_currency_id', 'From Currency and To Currency must be different.')
      .uniqueExchangeRate('Exchange rate already exists')
      ,
    to_currency_id: Yup.object()
      .required("To Currency is required.")
      .pairCurrency('from_currency_id', 'From Currency and To Currency must be different.')
      .uniqueExchangeRate('Exchange rate already exists.')
      ,
    multiply_rate: Yup.number()
      // .matches(/^\d{0,15}(\.\d{0,8})?$/, "maximum value: 15 digits with 8 decimal digits")
      .required("Multiply Rate is required."),
      // .validateNumber('multiply rate must be greater than 0'),
  })

  const isValidateNumber = (num) => {
    let checkNumber = /^\d{0,15}(\.\d{0,8})?$/.test(num)
    return checkNumber
  }

	const onSubmit = async (values, a) => {
		try {
      let form = {
        conversion_rate_type: "C",
        from_currency_id: values.from_currency_id.value,
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
                label="From Currency"
                name="from_currency_id"
                placeholder={"Please choose"}
                url={`master/currencies`}
                fieldName={"currency_name"}
                onChange={(v) => {
                  setFieldValue("from_currency_id", v)
                }}
                style={{ maxWidth: 250 }}
                size={formSize}
                isDisabled={isView || loading}
              />

							<FormikControl
                control="selectAsync"
                required="label-required"
                label="To Currency"
                name="to_currency_id"
                placeholder={"Please choose"}
                url={`master/currencies`}
                fieldName={"currency_name"}
                onChange={(v) => {
                  setFieldValue("to_currency_id", v)
                }}
                style={{ maxWidth: 250 }}
                size={formSize}
                isDisabled={isView || loading}
              />

              <FormikControl
                control="input"
                required="label-required"
                label="Multiply Rate"
                name="multiply_rate"
                style={{ maxWidth: 250 }}
                size={formSize}
                disabled={isView || loading}
                onChange={e => {
                  if (isValidateNumber(e.target.value)) {
                    setFieldValue("multiply_rate", e.target.value)
                  }
                }}
              />

              <FormikControl
                control="switch"
                label="Disabled Automatic Update"
                name="is_automatic"
                value={values.is_automatic}
                onChange={(v) => setFieldValue("is_automatic", v)}
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