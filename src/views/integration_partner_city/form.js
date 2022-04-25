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
        let res = await API.get(endpoint + "/" + formId)
        setFormValues(res.data)
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

  
	const validationSchema =  Yup.object().shape({
    city: Yup.object()
      .required("City is required.."),
    city_code: Yup.string()
      .required("Partner City Code is required"),
    city_name: Yup.string()
      .required("Partner City Name is required"),
  })

	const onSubmit = async (values, a) => {
		try {
      let form = {
       
        city_name: values.city_name.value,
        city_code: values.city_code.value,
       
      }
      let res = await API.putOrPost("/master/integration-partner-cities", id, form)
      
      dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Record 'From Currency: ${form.city_code} and To Currency: ${form.city_name}' has been successfully saved.`,
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
              {/* <FormikControl
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
              /> */}

              <FormikControl
                control="input"
                required="label-required"
                label="Partner City Code"
                name="city_code"
                // onChange={(e) =>
                //   setFieldValue({
                //     ...formValues,
                //     city_code: e.target.value,
                //   })
                // }
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