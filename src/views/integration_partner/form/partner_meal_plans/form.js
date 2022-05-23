import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { Form, Button } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { useParams } from "react-router-dom"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../../../components/formik/formikControl"

const endpoint =
  "/master/integration-partner-meal-plan-types"
function MealPlansCreate(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const param = useParams()
  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Meal Plans"
    if (!formId) {
      docTitle = "Create Partner Meal Plans"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let { data } = await API.get(endpoint + "/" + formId)
        setFormValues({
          ...formValues,
          meal_plan_type_id: data.meal_plan_type_id,
          meal_plan_type: {
            value: data.meal_plan_type.id,
            label: data.meal_plan_type.meal_plan_type_name,
          },
          meal_plan_type_name: data.meal_plan_type_name,
          meal_plan_type_code: data.meal_plan_type_code,
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",props.match.params.id],["AND"],["status",1]]))
    let res = await API.get(endpoint + "?" + `filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if(!sameId) return res.data.items.length === 0 

    return true
  }
  
  Yup.addMethod(Yup.object, 'uniqueValueObject', function (fieldName, message) {
      return this.test('unique', message, function(field) {
          if(field) return duplicateValue(fieldName, field.value)
          return true
      })
  })

  Yup.addMethod(Yup.string, 'uniqueValueString', function (fieldName, message) {
      return this.test('unique', message, function(field) {
          if(field) return duplicateValue(fieldName, field)
          return true
      })
  })

  const initialValues = {
    meal_plan_type: "",
    meal_plan_type_id: "",
    meal_plan_type_code: "",
    meal_plan_type_name: "",
    integration_partner_id: props.match.params.id || "00000000-0000-0000-0000-000000000000"
  }

  const validationSchema = Yup.object().shape({
    meal_plan_type: Yup.object().required("Meal Plan is required.")
    .uniqueValueObject('meal_plan_type', 'Meal Plan already exists'),
    meal_plan_type_code: Yup.string().required("Meal Plan Code is required.")
    .uniqueValueString('meal_plan_type_code', 'Partner Meal Plan Code already exists'),
    meal_plan_type_name: Yup.string().required("Meal Plan Name is required.")
    .uniqueValueString('meal_plan_type_name', 'Partner Meal Plan Name already exists'),
  })

  const onSubmit = async (values, a) => {
    console.log('values',values)
    try {
        let form = {
            meal_plan_type_id: values.meal_plan_type.value,
            meal_plan_type_code: values.meal_plan_type_code,
            meal_plan_type_name: values.meal_plan_type_name,
            integration_partner_id: values.integration_partner_id
        };
        let res = await API.putOrPost(endpoint, id, form);
        console.log("hihi", res)

        dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
        dispatch(
            setAlert({
                message: `Record 'From Integration Partner Meal Plan: ${values.meal_plan_type_code} - ${values.meal_plan_type_name}' has been successfully saved.`,
            })
        );
    } catch (e) {
        dispatch(
            setAlert({
                message: "Failed to save this record.",
            })
        );
    }
  }

  const formSize = {
    label: {
      md: 5,
      lg: 5,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit} className="ml-2">
          <FormikControl
            control="selectAsync"
            required={isView ? "" : "label-required"}
            label="Meal Plan"
            name="meal_plan_type"
            placeholder={"Please Choose."}
            url={`master/meal-plan-types`}
            fieldName={"meal_plan_type_name"}
            onChange={(v) => {
                setFieldValue("meal_plan_type", v);
            }}
            style={{ maxWidth: 250 }}
            size={formSize}
            components={
                isView
                    ? {
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                      }
                    : null
            }
            isDisabled={isView}
        />
          <FormikControl
            control="input"
            required="label-required"
            label="Partner Meal Plan Code"
            name="meal_plan_type_code"
            style={{ maxWidth: 250 / 2 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
            onChange={(e) => {
                setFieldValue("meal_plan_type_code", e.target.value);
            }}
          />
          <FormikControl
            control="input"
            required="label-required"
            label="Partner Meal Plan Name"
            name="meal_plan_type_name"
            style={{ maxWidth: 250 }}
            size={formSize}
            disabled={isView || loading}
            maxLength={36}
            onChange={(e) => {
              setFieldValue("meal_plan_type_name", e.target.value);
            }}
          />

          {!props.hideButton && (
            <div
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
              }}
            >
              {!isView && (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>
              )}
              <CancelButton
                onClick={() =>
                  dispatch(
                    setCreateModal({
                      show: false,
                      id: null,
                      disabled_form: false,
                    }),
                  )
                }
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}
export default withRouter(MealPlansCreate)
