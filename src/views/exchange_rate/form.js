import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import useQuery from "lib/query"
import * as Yup from "yup"
import Api from "config/api"
import { useDispatch } from "react-redux"
import { setAlert, setCreateModal } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../components/formik/formikControl"

function ExchangeRateCreate(props) {
	const dispatch = useDispatch()
  const API = new Api()
  const isView = useQuery().get("action") === "view"

	let form = {
		from_currency: "",
		to_currency: "",
		multiply_rate: "",
		is_automatic: false,
	}
	const [initialForm, setForm] = useState(form)
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)

  console.log(props.history)

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const checkExchangeRate = async () => {
    let res = await API.get("/master/currency-conversion", {
      size: 50,
    })
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
    return this.test('unique', message, function(field) {
      if(this.parent.to_currency && this.parent.from_currency) {
        return checkExchangeRate(this.parent.to_currency && this.parent.from_currency)
      } else {
        return true
      }
    })
  })
	const validationSchema =  Yup.object().shape({
    from_currency: Yup.object()
      .required("From Currency is required.")
      .pairCurrency('to_currency', 'From Currency and To Currency must be different.')
      // .uniqueExchangeRate('Exchange rate already exists')
      ,
    to_currency: Yup.object()
      .required("To Currency is required.")
      .pairCurrency('from_currency', 'From Currency and To Currency must be different.')
      // .uniqueExchangeRate('Exchange rate already exists.')
      ,
    multiply_rate: Yup.number().required("Multiply Rate is required."),
  })

	const onSubmit = async (values, a) => {
		try {
      let form = {
        conversion_rate_type: "C",
        from_currency_id: values.from_currency.value,
        is_automatic: values.is_automatic,
        multiply_rate: parseFloat(values.multiply_rate),
        to_currency_id: values.to_currency.value,
        valid_from: new Date(),
        valid_to: new Date(),
      }
      let res = await API.putOrPost("/master/currency-conversions", id, form)
			console.log(res)
      dispatch(setCreateModal(false))
      dispatch(
				setAlert({
				  message: `Record 'From Currency: ${form.from_currency} and To Currency: ${form.to_currency}' has been successfully saved.`,
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
				initialValues={initialForm}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{
					({
						dirty,
						handleSubmit,
						isSubmitting,
            setFieldValue,
            values,
					}) => (
						<Form onSubmit={handleSubmit}>
              <FormikControl
                control="selectAsync"
                required="label-required"
                label="From Currency"
                name="from_currency"
                placeholder={values.from_currency || "Please choose"}
                url={`master/currencies`}
                fieldName={"currency_name"}
                onChange={(v) => {
                  setFieldValue("from_currency", v)
                }}
                style={{ maxWidth: 250 }}
                size={formSize}
                isDisabled={isView || loading}
              />

							<FormikControl
                control="selectAsync"
                required="label-required"
                label="To Currency"
                name="to_currency"
                placeholder={values.to_currency || "Please choose"}
                url={`master/currencies`}
                fieldName={"currency_name"}
                onChange={(v) => {
                  setFieldValue("to_currency", v)
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

              <div
                style={{
                  marginBottom: 30,
                  marginTop: 30,
                  display: "flex",
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>
                <CancelButton onClick={() => dispatch(setCreateModal(false))}/>
              </div>
						</Form>
					)
				}
				
			</Formik>
	)
}

export default withRouter(ExchangeRateCreate) 