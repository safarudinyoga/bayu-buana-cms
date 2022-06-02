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
const Currencies = (props) => {
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  const [currencyId, setCurrencyId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const isView = showCreateModal.disabled_form || props.isView;
  const [loading, setLoading] = useState(true);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/currencies?" + `filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === currencyId)
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
    currency_id: "",
    currency_code: "",
    currency_name: ""
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    currency_id: Yup.object()
    .required("Currency is required.")
    .uniqueValueObject("currency_id","Currency already exists"),
    currency_code: Yup.string()
    .required("Partner Currency Code is required")
    .uniqueValueString('currency_code', 'Partner Currency Code already exists'),
    currency_name: Yup.string()
    .required("Partner Currency Name is required")
    .uniqueValueString('currency_name', 'Partner Currency Name already exists'),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Currencies"
    if (!formId) {
      docTitle = "Create Partner Currencies"
    }
    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/currencies/" + formId);
        setFormValues({ 
          ...formValues,
          currency_id: _.isEmpty(res.data.currency) ? '' : {
            value: res.data.currency.id,
            label: res.data.currency.currency_name,
          },
          currency_code: res.data.currency_code ? res.data.currency_code : "",
          currency_name: res.data.currency_name ? res.data.currency_name : ""
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      currency_code: values.currency_code,
      currency_name: values.currency_name,
      currency_id: values.currency_id.value,
      integration_partner_id: id
    }

    try {
      if(currencyId){
        let res = await api.put(endpoint + "/" + id + "/currencies/" + currencyId, formatted);
      }else{
          let res = await api.post(endpoint + "/" + id + "/currencies", formatted);
      }
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
      dispatch(
        setAlert({
            message: `Record 'Partner Currency Name: ${values.currency_name}' has been successfully saved.`,
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
    setCurrencyId(showCreateModal.id)
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
                        label="Currency"
                        name="currency_id"
                        placeholder={"Please Choose."}
                        url={`master/currencies`}
                        fieldName={"currency_name"}
                        onChange={(v) => {
                            setFieldValue("currency_id", v);
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
                        label="Partner Currency Code"
                        name="currency_code"
                        style={{ maxWidth: 100 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("currency_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Currency Name"
                        name="currency_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("currency_name", e.target.value);
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

export default Currencies
