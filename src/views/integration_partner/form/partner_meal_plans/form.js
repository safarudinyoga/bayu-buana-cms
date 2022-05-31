import React, { useEffect, useState } from "react"
import {
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalTitle, setCreateModal } from "redux/ui-store"
import Api from "config/api"
import _ from "lodash"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"

const endpoint = "/master/integration-partners";
const MealPlans = (props) => {
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  const [mealPlanId, setMealPlanId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const isView = showCreateModal.disabled_form || props.isView;
  const [loading, setLoading] = useState(true);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/meal-plans?" + `filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === mealPlanId)
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
  // Initialize form
  const initialValues = {
    meal_plan_type_id: "",
    meal_plan_type_code: "",
    meal_plan_type_name: ""
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    meal_plan_type_id: Yup.object()
    .required("Meal Plan is required.")
    .uniqueValueObject("meal_plan_type_id","Meal Plan already exists"),
    meal_plan_type_code: Yup.string()
    .required("Partner Meal Plan Code is required")
    .uniqueValueString('meal_plan_type_code', 'Partner Meal Plan Code already exists'),
    meal_plan_type_name: Yup.string()
    .required("Partner Meal Plan Name is required")
    .uniqueValueString('meal_plan_type_name', 'Partner Meal Plan Name already exists'),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Meal Plans"
    if (!formId) {
      docTitle = "Create Partner Meal Plans"
    }
    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/meal-plans/" + formId);
        setFormValues({ 
          ...formValues,
          meal_plan_type_id: _.isEmpty(res.data.meal_plan_type) ? '' : {
            value: res.data.meal_plan_type.id,
            label: res.data.meal_plan_type.meal_plan_type_name,
          },
          meal_plan_type_code: res.data.meal_plan_type_code ? res.data.meal_plan_type_code : "",
          meal_plan_type_name: res.data.meal_plan_type_name ? res.data.meal_plan_type_name : ""
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      meal_plan_type_code: values.meal_plan_type_code,
      meal_plan_type_name: values.meal_plan_type_name,
      meal_plan_type_id: values.meal_plan_type_id.value,
      integration_partner_id: id
    }

    try {
      if(mealPlanId){
        let res = await api.put(endpoint + "/" + id + "/meal-plans/" + mealPlanId, formatted);
      }else{
          let res = await api.post(endpoint + "/" + id + "/meal-plans", formatted);
      }
      dispatch(
        setAlert({
            message: `Record 'Partner Meal Plan Name: ${values.meal_plan_type_name}' has been successfully saved.`,
        })
      );
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
      
    } catch (e) {
      dispatch(
        setAlert({
            message: "Failed to save this record.",
        })
    );
    }
};
  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false);
  }

  if (formValues) {
      setLoading(false);
  }
    setMealPlanId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const formSize = {
    label: {
        md: 5,
        lg: 5,
    },
    value: {
        md: 7,
        lg: 7,
    },
  };

  console.log('formValues', formValues)
  return (
    <div>
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Meal Plan"
                        name="meal_plan_type_id"
                        placeholder={"Please Choose."}
                        url={`master/meal-plan-types`}
                        fieldName={"meal_plan_type_name"}
                        onChange={(v) => {
                            setFieldValue("meal_plan_type_id", v);
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
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("meal_plan_type_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Meal Plan Name"
                        name="meal_plan_type_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("meal_plan_type_name", e.target.value);
                        }}
                        maxLength={256}
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
                                <Button variant="primary" type="submit" disabled={isSubmitting} style={{ marginRight: 15 }}>
                                    SAVE
                                </Button>
                            )}
                            <CancelButton onClick={() => dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))} />
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default MealPlans
