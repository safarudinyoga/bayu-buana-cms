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
import FormikControl from "components/formik/formikControl"

const endpoint = "/master/currency-conversions"
function FormEmailCategory(props) {
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

    let docTitle = "create email category"

    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let {data} = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...data,
          email_category_name: {
            value: data.email_category.id,
            label: data.email_category.email_category_name,
          },
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
		category_name: "",
		description: "",
		email_category_name: "",
	}


	const validationSchema =  Yup.object().shape({
    category_name: Yup.string()
      .required("Email Template Name is required."),
    description: Yup.string(),
    email_category_name: Yup.object()
      .required("Copy Email Template From is required."),
  })

	const onSubmit = async (values, a) => {
		try {
      let form = {
        category_name: values.category_name.value,
        email_category_name: values.email_category_name.value || "00000000-0000-0000-0000-000000000000",
        description: values.description,
      }
      let res = await API.putOrPost("/master/configurations/agent-email-categories", id, form)
      
      dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Invoice Email Category has been successfully saved.`,
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
                control="input"
                required="label-required"
                label="Email Category Name"
                name="category_name"
                style={{ maxWidth: 250 }}
                size={formSize}
                maxLength={256}
                // disabled={isView || loading}
              />


              <FormikControl
                control="textarea"
                required="label-required"
                label="Description"
                name="description"
                style={{ maxWidth: 250 }}
                size={formSize}
                maxLength={4000}
                // disabled={isView || loading}
              />
              <FormikControl
                control="selectAsync"
                required="label-required"
                label="Copy Email Template From"
                name="category_name"
                placeholder={"Please choose"}
                url={`/master/configurations/agent-email-categories`}
                fieldName={"currency_name"}
                onChange={(v) => {
                  setFieldValue("category_name", v)
                }}
                style={{ maxWidth: 250 }}
                size={formSize}
                // isDisabled={isView || loading}
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

export default withRouter(FormEmailCategory) 