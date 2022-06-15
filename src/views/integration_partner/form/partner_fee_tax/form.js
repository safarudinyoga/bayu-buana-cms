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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"
import _ from "lodash"

const endpoint = "/master/integration-partners";
const FeeTaxes = (props) => {
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  const [feeTaxId, setFeeTaxId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const isView = showCreateModal.disabled_form || props.isView;
  const [loading, setLoading] = useState(true);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/fee-taxes?" + `filters=${filters}`)

    if(feeTaxId){
      return res.data.items.length === 0 || value === formValues[fieldName] || formValues[fieldName].value
    } else {
      return res.data.items.length === 0
    }
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
    fee_tax_type_id: "",
    fee_tax_type_code: "",
    fee_tax_type_name: "", 
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    fee_tax_type_id: Yup.object()
    .required("Fee Tax is required.")
    .uniqueValueObject("fee_tax_type_id","Fee Tax already exists"),
    fee_tax_type_code: Yup.string()
    .required("Partner Fee Tax Code is required")
    .uniqueValueString('fee_tax_type_code', 'Partner Fee Tax Code already exists'),
    fee_tax_type_name: Yup.string()
    .required("Partner Fee Tax Name is required")
    .uniqueValueString('fee_tax_type_name', 'Partner Fee Tax Name already exists'),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Fee Taxes"
    if (!formId) {
      docTitle = "Create Partner Fee Taxes"
    }
    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/fee-taxes/" + formId);
        setFormValues({ 
          ...formValues,
          fee_tax_type_id: _.isEmpty(res.data.fee_tax_type) ? '' : {
            value: res.data.fee_tax_type.id,
            label: res.data.fee_tax_type.fee_tax_type_name,
          },
          fee_tax_type_code: res.data.fee_tax_type_code ? res.data.fee_tax_type_code : "",
          fee_tax_type_name: res.data.fee_tax_type_name ? res.data.fee_tax_type_name : "",
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      fee_tax_type_code: values.fee_tax_type_code,
      fee_tax_type_name: values.fee_tax_type_name,
      fee_tax_type_id: values.fee_tax_type_id.value,
      integration_partner_id: id
    }

    try {
      if(feeTaxId){
        let res = await api.put(endpoint + "/" + id + "/fee-taxes/" + feeTaxId, formatted);
      }else{
          let res = await api.post(endpoint + "/" + id + "/fee-taxes", formatted);
      }
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
      dispatch(
        setAlert({
            message: `Record 'Partner Fee Tax Name: ${values.fee_tax_type_name}' has been successfully saved.`,
        })
      );

      
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
    setFeeTaxId(showCreateModal.id)
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

  return (
    <div>
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Fee Tax"
                        name="fee_tax_type_id"
                        placeholder={values.fee_tax_type_id || "Please Choose."}
                        url={`master/fee-tax-types`}
                        fieldName={"fee_tax_type_name"}
                        urlFilter={`["fee_category","in",["AX","HX"]]`}
                        onChange={(v) => {
                            setFieldValue("fee_tax_type_id", v);
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
                        label="Partner Fee Tax Code"
                        name="fee_tax_type_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("fee_tax_type_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Fee Tax Name"
                        name="fee_tax_type_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("fee_tax_type_name", e.target.value);
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

export default FeeTaxes
